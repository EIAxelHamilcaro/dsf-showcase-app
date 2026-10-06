import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import {
  type ContactDeps,
  handleContact,
  type Lead,
  type LeadMail,
} from "../lib/contact/handleContact";
import type { TurnstileOutcome } from "../lib/contact/turnstile";

const request = {
  name: "Marie Dupont",
  phone: "06.12.34.56.78",
  email: "marie@example.test",
  adress: "12 rue des Lilas, 41000 Blois",
  message: "Bonjour",
  step3: "baignoire",
  turnstileToken: "token",
};

interface Scenario {
  outcome?: TurnstileOutcome;
  saveError?: Error;
  mailError?: Error;
}

function makeDeps({ outcome = "valid", saveError, mailError }: Scenario = {}) {
  return {
    verifyToken: mock.fn(async (_token: string) => outcome),
    saveLead: mock.fn(async (_lead: Lead) => {
      if (saveError) {
        throw saveError;
      }

      return 42;
    }),
    sendMail: mock.fn(async (_mail: LeadMail) => {
      if (mailError) {
        throw mailError;
      }
    }),
    logError: mock.fn(
      (_message: string, _context: Record<string, unknown>) => undefined,
    ),
  } satisfies ContactDeps;
}

describe("handleContact", () => {
  it("saves the lead and emails it to the company for a valid request", async () => {
    const deps = makeDeps();

    const result = await handleContact(request, deps);
    const saved = deps.saveLead.mock.calls[0]?.arguments[0];
    const mail = deps.sendMail.mock.calls[0]?.arguments[0];

    assert.deepEqual(result, { status: 200, body: { success: true } });
    assert.equal(deps.verifyToken.mock.calls[0]?.arguments[0], "token");
    assert.deepEqual(saved, {
      name: "Marie Dupont",
      phone: "06.12.34.56.78",
      email: "marie@example.test",
      adress: "12 rue des Lilas, 41000 Blois",
      message: "Bonjour",
      step3: "baignoire",
    });
    assert.equal(mail?.subject, "Nouveau contact : Marie Dupont");
    assert.match(mail?.text ?? "", /Téléphone : 06\.12\.34\.56\.78/);
    assert.match(mail?.text ?? "", /Type Salle de bain: baignoire/);
    assert.equal(deps.logError.mock.callCount(), 0);
  });

  it("keeps the lead and reports success when the email fails, logging which lead to follow up", async () => {
    const deps = makeDeps({ mailError: new Error("smtp down") });

    const result = await handleContact(request, deps);

    assert.deepEqual(result, { status: 200, body: { success: true } });
    assert.equal(deps.saveLead.mock.callCount(), 1);
    assert.equal(deps.logError.mock.callCount(), 1);
    assert.equal(deps.logError.mock.calls[0]?.arguments[1].leadId, 42);
  });

  it("still succeeds when only the database fails, because the company got the email", async () => {
    const deps = makeDeps({ saveError: new Error("database down") });

    const result = await handleContact(request, deps);

    assert.equal(result.status, 200);
    assert.equal(deps.sendMail.mock.callCount(), 1);
    assert.equal(deps.logError.mock.callCount(), 1);
  });

  it("returns an explicit error without internals when the lead could be neither saved nor emailed", async () => {
    const deps = makeDeps({
      saveError: new Error("database down"),
      mailError: new Error("smtp down"),
    });

    const result = await handleContact(request, deps);

    assert.deepEqual(result, {
      status: 500,
      body: {
        success: false,
        code: "LEAD_SAVE_FAILED",
        error:
          "Votre demande n'a pas pu être enregistrée, réessayez ou appelez-nous.",
      },
    });
  });

  it("saves and sends nothing when Turnstile rejects the token", async () => {
    const deps = makeDeps({ outcome: "rejected" });

    const result = await handleContact(request, deps);

    assert.equal(result.status, 403);
    assert.equal(
      result.body.success === false && result.body.code,
      "TURNSTILE_REJECTED",
    );
    assert.equal(deps.saveLead.mock.callCount(), 0);
    assert.equal(deps.sendMail.mock.callCount(), 0);
  });

  it("saves and sends nothing when Turnstile is unavailable (fail closed)", async () => {
    const deps = makeDeps({ outcome: "unavailable" });

    const result = await handleContact(request, deps);

    assert.equal(result.status, 503);
    assert.equal(
      result.body.success === false && result.body.code,
      "TURNSTILE_UNAVAILABLE",
    );
    assert.equal(deps.saveLead.mock.callCount(), 0);
    assert.equal(deps.sendMail.mock.callCount(), 0);
  });

  it("answers 400 with one message per field and does not call Turnstile", async () => {
    const deps = makeDeps();

    const result = await handleContact(
      { ...request, email: "nope", name: "" },
      deps,
    );

    assert.equal(result.status, 400);
    assert.equal(
      result.body.success === false && result.body.code,
      "VALIDATION_FAILED",
    );
    assert.deepEqual(result.body.success === false && result.body.fieldErrors, {
      name: "Le nom est requis",
      email: "Le format de l'email est invalide",
    });
    assert.equal(deps.verifyToken.mock.callCount(), 0);
    assert.equal(deps.saveLead.mock.callCount(), 0);
  });

  it("never logs what the visitor typed, even when the database and mail errors quote it", async () => {
    const quoting = (label: string) =>
      Object.assign(
        new Error(
          `${label} failed, params: Marie Dupont,06.12.34.56.78,marie@example.test,12 rue des Lilas, 41000 Blois,Bonjour`,
          {
            cause: Object.assign(new Error("duplicate key"), { code: "23505" }),
          },
        ),
        { name: "DrizzleQueryError" },
      );
    const deps = makeDeps({
      saveError: quoting("insert"),
      mailError: quoting("smtp"),
    });

    await handleContact(request, deps);
    const logged = JSON.stringify(
      deps.logError.mock.calls.map((call) => call.arguments),
    );

    assert.equal(deps.logError.mock.callCount(), 2);
    assert.deepEqual(deps.logError.mock.calls[0]?.arguments[1], {
      errorName: "DrizzleQueryError",
      errorCode: "23505",
    });

    for (const typed of [
      "Marie",
      "06.12.34.56.78",
      "marie@example.test",
      "Lilas",
      "Bonjour",
    ]) {
      assert.equal(logged.includes(typed), false, typed);
    }
  });

  it("ignores a key it does not know, such as the former honeypot, and saves the lead", async () => {
    const deps = makeDeps();

    const result = await handleContact(
      { ...request, website: "http://spam.test" },
      deps,
    );
    const saved = deps.saveLead.mock.calls[0]?.arguments[0] ?? {};

    assert.equal(result.status, 200);
    assert.equal("website" in saved, false);
  });

  it("answers 400 in French, without parser internals, to a body that is not an object or carries wrong types", async () => {
    const unreadable = await handleContact(undefined, makeDeps());
    const wrongTypes = await handleContact(
      { ...request, message: 12, consentMain: "yes" },
      makeDeps(),
    );

    assert.deepEqual(unreadable, {
      status: 400,
      body: {
        success: false,
        code: "VALIDATION_FAILED",
        error:
          "Votre demande n'a pas pu être lue, rechargez la page puis réessayez.",
      },
    });
    assert.deepEqual(
      wrongTypes.body.success === false && wrongTypes.body.fieldErrors,
      {
        message: "Cette valeur n'est pas valide",
        consentMain: "Cette valeur n'est pas valide",
      },
    );
  });
});
