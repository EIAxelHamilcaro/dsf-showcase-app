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
  saveFails?: boolean;
  mailFails?: boolean;
}

function makeDeps({
  outcome = "valid",
  saveFails = false,
  mailFails = false,
}: Scenario = {}) {
  return {
    verifyToken: mock.fn(async (_token: string) => outcome),
    saveLead: mock.fn(async (_lead: Lead) => {
      if (saveFails) {
        throw new Error("database down");
      }

      return 42;
    }),
    sendMail: mock.fn(async (_mail: LeadMail) => {
      if (mailFails) {
        throw new Error("smtp down");
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
    const deps = makeDeps({ mailFails: true });

    const result = await handleContact(request, deps);

    assert.deepEqual(result, { status: 200, body: { success: true } });
    assert.equal(deps.saveLead.mock.callCount(), 1);
    assert.equal(deps.logError.mock.callCount(), 1);
    assert.equal(deps.logError.mock.calls[0]?.arguments[1].leadId, 42);
  });

  it("still succeeds when only the database fails, because the company got the email", async () => {
    const deps = makeDeps({ saveFails: true });

    const result = await handleContact(request, deps);

    assert.equal(result.status, 200);
    assert.equal(deps.sendMail.mock.callCount(), 1);
    assert.equal(deps.logError.mock.callCount(), 1);
  });

  it("returns an explicit error without internals when the lead could be neither saved nor emailed", async () => {
    const deps = makeDeps({ saveFails: true, mailFails: true });

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

  it("treats a filled honeypot as a silent success without verifying, saving or sending", async () => {
    const deps = makeDeps();

    const result = await handleContact(
      { ...request, website: "http://spam.test" },
      deps,
    );

    assert.deepEqual(result, { status: 200, body: { success: true } });
    assert.equal(deps.verifyToken.mock.callCount(), 0);
    assert.equal(deps.saveLead.mock.callCount(), 0);
    assert.equal(deps.sendMail.mock.callCount(), 0);
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
