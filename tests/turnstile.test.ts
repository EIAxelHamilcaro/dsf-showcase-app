import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import {
  type VerifyTurnstileInput,
  verifyTurnstile,
} from "../lib/contact/turnstile";

const jsonResponse = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status }));

const verify = (overrides: Partial<VerifyTurnstileInput>) =>
  verifyTurnstile({
    token: "t",
    secret: "secret",
    siteKey: "site",
    isProduction: true,
    isDeployed: false,
    remoteIp: "203.0.113.7",
    logError: () => undefined,
    ...overrides,
  });

describe("verifyTurnstile", () => {
  it("is valid when Cloudflare confirms the token, sending secret, token and visitor address", async () => {
    const fetchFn = mock.fn((_url: unknown, _init?: RequestInit) =>
      jsonResponse({ success: true }),
    );

    const outcome = await verify({ fetchFn: fetchFn as typeof fetch });
    const call = fetchFn.mock.calls[0];
    const sent = new URLSearchParams(String(call?.arguments[1]?.body));

    assert.equal(outcome, "valid");
    assert.equal(
      call?.arguments[0],
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    );
    assert.deepEqual(Object.fromEntries(sent), {
      secret: "secret",
      response: "t",
      remoteip: "203.0.113.7",
    });
  });

  it("is rejected when Cloudflare refuses the token", async () => {
    const outcome = await verify({
      fetchFn: () =>
        jsonResponse({
          success: false,
          "error-codes": ["invalid-input-response"],
        }),
    });

    assert.equal(outcome, "rejected");
  });

  it("fails closed in production when the secret or the site key is missing, without calling Cloudflare, and logs it", async () => {
    for (const missing of [{ secret: undefined }, { siteKey: "" }]) {
      const fetchFn = mock.fn(() => jsonResponse({ success: true }));
      const logError = mock.fn();

      const outcome = await verify({
        ...missing,
        fetchFn: fetchFn as typeof fetch,
        logError,
      });

      assert.equal(outcome, "unavailable");
      assert.equal(fetchFn.mock.callCount(), 0);
      assert.equal(logError.mock.callCount(), 1);
    }
  });

  it("fails closed when Cloudflare cannot be reached or answers garbage, and logs it", async () => {
    const logError = mock.fn();

    const down = await verify({
      logError,
      fetchFn: () => Promise.reject(new Error("network")),
    });
    const serverError = await verify({
      logError,
      fetchFn: () => jsonResponse({}, 500),
    });
    const garbage = await verify({
      logError,
      fetchFn: () => Promise.resolve(new Response("not json", { status: 200 })),
    });

    assert.deepEqual(
      [down, serverError, garbage],
      ["unavailable", "unavailable", "unavailable"],
    );
    assert.equal(logError.mock.callCount(), 3);
  });

  it("refuses Cloudflare's test keys on a deployed environment without calling Cloudflare, and logs no key", async () => {
    const testKeys = [
      { secret: "1x0000000000000000000000000000000AA" },
      { secret: "2x0000000000000000000000000000000AA" },
      { siteKey: "1x00000000000000000000AA" },
      { siteKey: "3x00000000000000000000FF" },
      { secret: undefined, isProduction: false },
    ];

    for (const keys of testKeys) {
      const fetchFn = mock.fn(() => jsonResponse({ success: true }));
      const logError = mock.fn(
        (_message: string, _context: Record<string, unknown>) => undefined,
      );

      const outcome = await verify({
        ...keys,
        isDeployed: true,
        fetchFn: fetchFn as typeof fetch,
        logError,
      });
      const logged = JSON.stringify(logError.mock.calls[0]?.arguments);

      assert.equal(outcome, "unavailable", JSON.stringify(keys));
      assert.equal(fetchFn.mock.callCount(), 0);
      assert.equal(logError.mock.callCount(), 1);
      assert.doesNotMatch(logged, /[123]x0{10,}/);
    }
  });

  it("accepts the test keys on a local production build, which is not a deployed environment", async () => {
    const outcome = await verify({
      secret: "1x0000000000000000000000000000000AA",
      siteKey: "1x00000000000000000000AA",
      fetchFn: () => jsonResponse({ success: true }),
    });

    assert.equal(outcome, "valid");
  });

  it("uses Cloudflare's published test secret outside production when none is configured", async () => {
    let sentSecret = "";

    const outcome = await verify({
      secret: undefined,
      isProduction: false,
      fetchFn: async (_url, init) => {
        sentSecret =
          new URLSearchParams(String(init?.body)).get("secret") ?? "";

        return new Response(JSON.stringify({ success: true }));
      },
    });

    assert.equal(outcome, "valid");
    assert.equal(sentSecret, "1x0000000000000000000000000000000AA");
  });
});
