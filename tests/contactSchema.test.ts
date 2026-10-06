import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  contactFieldsSchema,
  contactSchema,
  fieldErrorsOf,
} from "../lib/contact/contactSchema";

const valid = {
  name: "Marie Dupont",
  phone: "06 12 34 56 78",
  email: "marie@example.test",
  adress: "12 rue des Lilas, 41000 Blois",
  turnstileToken: "token",
};

const parse = (overrides: Record<string, unknown>) =>
  contactSchema.safeParse({ ...valid, ...overrides });

const firstMessage = (overrides: Record<string, unknown>) =>
  parse(overrides).error?.issues[0]?.message;

describe("contactSchema", () => {
  it("accepts a minimal valid request and trims the text", () => {
    const result = parse({ name: "  Marie Dupont  " });

    assert.equal(result.success, true);
    assert.equal(result.data?.name, "Marie Dupont");
  });

  it("accepts the French phone formats people really type", () => {
    for (const phone of [
      "06.12.34.56.78",
      "+33 6 12 34 56 78",
      "0612345678",
      "06-12-34-56-78",
      "(02) 54 97 53 23",
      "+33 (0)6 12 34 56 78",
      "0033612345678",
    ]) {
      assert.equal(parse({ phone }).success, true, phone);
    }
  });

  it("refuses what is not a phone number", () => {
    for (const phone of [
      "abc",
      "06 12 34",
      "..........",
      "++++++++++",
      "06 12 34 56 78 poste 4",
      "0612345678901234567890",
    ]) {
      assert.equal(
        firstMessage({ phone }),
        "Le format du téléphone est invalide",
        phone,
      );
    }
  });

  it("refuses a malformed email and empty required fields with a French message", () => {
    assert.equal(
      firstMessage({ email: "pas-un-email" }),
      "Le format de l'email est invalide",
    );
    assert.equal(firstMessage({ name: "   " }), "Le nom est requis");
    assert.equal(firstMessage({ phone: "" }), "Le téléphone est requis");
    assert.equal(firstMessage({ email: "" }), "L'email est requis");
    assert.equal(firstMessage({ adress: " " }), "L'adresse est requise");
  });

  it("refuses a request without a Turnstile token", () => {
    const result = contactSchema.safeParse({
      ...valid,
      turnstileToken: undefined,
    });

    assert.equal(result.success, false);
    assert.equal(result.error?.issues[0]?.path[0], "turnstileToken");
  });

  it("bounds free text so a bot cannot store a novel", () => {
    assert.equal(parse({ message: "a".repeat(2001) }).success, false);
    assert.equal(parse({ name: "a".repeat(121) }).success, false);
  });

  it("keeps one message per field, the first one", () => {
    const result = contactFieldsSchema.safeParse({
      ...valid,
      name: "",
      phone: "abc",
    });

    assert.deepEqual(result.error && fieldErrorsOf(result.error), {
      name: "Le nom est requis",
      phone: "Le format du téléphone est invalide",
    });
  });
});
