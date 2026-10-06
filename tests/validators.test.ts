import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  validateHttpsUrl,
  validateInternalPath,
  validateRequiredInternalPath,
  validateReviewCount,
  validateReviewRating,
  validateSiren,
  validateSlug,
} from "../lib/cms/validators";

describe("validateSlug", () => {
  it("accepts a kebab-case slug", () => {
    assert.equal(validateSlug("douche-senior-blois"), true);
    assert.equal(validateSlug("loiret"), true);
  });

  it("refuses slugs that would shadow the admin or the API", () => {
    assert.notEqual(validateSlug("admin"), true);
    assert.notEqual(validateSlug("api"), true);
  });

  it("refuses malformed slugs", () => {
    for (const value of [
      "",
      null,
      undefined,
      "Douche Blois",
      "a--b",
      "-a",
      "a-",
      "é",
      "a/b",
      "a.b",
    ]) {
      assert.notEqual(validateSlug(value), true, String(value));
    }
  });
});

describe("validateInternalPath", () => {
  it("accepts site relative paths and anchors", () => {
    for (const value of ["/", "/loiret", "/#contact", "/aides-financieres"]) {
      assert.equal(validateInternalPath(value), true, value);
    }
  });

  it("accepts an empty optional value", () => {
    assert.equal(validateInternalPath(""), true);
    assert.equal(validateInternalPath(undefined), true);
  });

  it("refuses absolute urls, protocol relative urls and spaces", () => {
    for (const value of [
      "loiret",
      "https://example.com",
      "//evil.example",
      "/\\evil.example",
      "/a\\b",
      "/a b",
    ]) {
      assert.notEqual(validateInternalPath(value), true, value);
    }
  });
});

describe("validateRequiredInternalPath", () => {
  it("accepts a site relative path", () => {
    assert.equal(validateRequiredInternalPath("/loiret"), true);
  });

  it("refuses a missing link and an external one", () => {
    for (const value of ["", null, undefined, "https://example.com"]) {
      assert.notEqual(validateRequiredInternalPath(value), true, String(value));
    }
  });
});

describe("validateReviewRating", () => {
  it("accepts whole ratings from 1 to 5 or nothing", () => {
    for (const value of [1, 2, 3, 4, 5, null, undefined]) {
      assert.equal(validateReviewRating(value), true, String(value));
    }
  });

  it("refuses everything else", () => {
    for (const value of [0, 6, 4.5, -1, Number.NaN]) {
      assert.notEqual(validateReviewRating(value), true, String(value));
    }
  });
});

describe("validateReviewCount", () => {
  it("accepts a whole number of reviews, zero or nothing", () => {
    for (const value of [0, 1, 128, null, undefined]) {
      assert.equal(validateReviewCount(value), true, String(value));
    }
  });

  it("refuses decimals and negative numbers", () => {
    for (const value of [12.5, -1, Number.NaN]) {
      assert.notEqual(validateReviewCount(value), true, String(value));
    }
  });
});

describe("validateHttpsUrl", () => {
  it("accepts an https url or nothing", () => {
    assert.equal(validateHttpsUrl("https://g.page/r/abc"), true);
    assert.equal(validateHttpsUrl(""), true);
    assert.equal(validateHttpsUrl(undefined), true);
  });

  it("refuses http, relative and malformed urls", () => {
    for (const value of [
      "http://g.page/r/abc",
      "/avis",
      "g.page",
      "https://",
    ]) {
      assert.notEqual(validateHttpsUrl(value), true, value);
    }
  });
});

describe("validateSiren", () => {
  it("accepts nine digits or nothing", () => {
    assert.equal(validateSiren("800339673"), true);
    assert.equal(validateSiren(""), true);
    assert.equal(validateSiren(null), true);
  });

  it("refuses anything else", () => {
    for (const value of [
      "80033967",
      "8003396730",
      "80033967a",
      "800 339 673",
    ]) {
      assert.notEqual(validateSiren(value), true, value);
    }
  });
});
