import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { toE164, toTelHref } from "../lib/seo/phone";

describe("toE164", () => {
  it("converts every common French format", () => {
    for (const value of [
      "02 54 97 53 23",
      "02.54.97.53.23",
      "0254975323",
      "+33 2 54 97 53 23",
      "+33254975323",
      "0033254975323",
    ]) {
      assert.equal(toE164(value), "+33254975323", value);
    }
  });

  it("returns undefined for something that is not a phone number", () => {
    for (const value of ["", "abc", "12 34", null, undefined]) {
      assert.equal(toE164(value), undefined, String(value));
    }
  });
});

describe("toTelHref", () => {
  it("uses E.164 when possible and strips spaces otherwise", () => {
    assert.equal(toTelHref("02 54 97 53 23"), "tel:+33254975323");
    assert.equal(toTelHref("poste 12"), "tel:poste12");
  });
});
