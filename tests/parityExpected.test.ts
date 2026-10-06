import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { faqSeed } from "../migrations/seed/faqSeed";
import {
  applyCorrections,
  textCorrections,
} from "../scripts/parityCorrections";
import { buildExpectedText } from "../scripts/parityExpected";
import { parityPages } from "../scripts/parityPages";

const readGolden = (slug: string) =>
  readFileSync(
    new URL(`./fixtures/mainText/${slug}.txt`, import.meta.url),
    "utf8",
  ).trim();

describe("applyCorrections", () => {
  it("replaces the listed text and nothing else", () => {
    const corrected = applyCorrections("Avant ancien texte après", [
      { ref: "X1", page: "p", from: "ancien texte", to: "nouveau" },
    ]);

    assert.equal(corrected, "Avant nouveau après");
  });

  it("closes the gap left by a removed line", () => {
    const corrected = applyCorrections("Avant ligne retirée après", [
      { ref: "X2", page: "p", from: "ligne retirée", to: "" },
    ]);

    assert.equal(corrected, "Avant après");
  });

  it("refuses a correction whose original text is missing or ambiguous", () => {
    const correction = { ref: "X3", page: "p", from: "absent", to: "x" };

    assert.throws(
      () => applyCorrections("Texte d'origine", [correction]),
      /X3/,
    );
    assert.throws(
      () => applyCorrections("absent puis absent", [correction]),
      /X3/,
    );
  });
});

describe("expected text of the 16 captured pages", () => {
  it("finds every listed correction exactly once in the captured text of its page", () => {
    assert.ok(textCorrections.length > 0);

    for (const correction of textCorrections) {
      assert.ok(parityPages.includes(correction.page), correction.ref);
      assert.doesNotThrow(
        () => applyCorrections(readGolden(correction.page), [correction]),
        correction.ref,
      );
    }
  });

  it("keeps every captured word outside the listed corrections and the listed additions", () => {
    for (const slug of parityPages) {
      const golden = readGolden(slug);
      const expected = buildExpectedText(slug, golden);
      const corrections = textCorrections.filter(
        (correction) => correction.page === slug,
      );
      const keptWords = corrections
        .reduce(
          (text, correction) => text.split(correction.from).join(" "),
          golden,
        )
        .split(/\s+/)
        .filter(Boolean);
      const expectedWords = expected.split(/\s+/);

      let cursor = 0;

      for (const word of keptWords) {
        const at = expectedWords.indexOf(word, cursor);

        assert.ok(at >= cursor, `${slug} lost "${word}" after word ${cursor}`);
        cursor = at + 1;
      }

      for (const correction of corrections) {
        assert.ok(expected.includes(correction.to), correction.ref);
      }
    }
  });

  it("places the FAQ of each page right before its closing call to action", () => {
    for (const faq of faqSeed) {
      const expected = buildExpectedText(faq.slug, readGolden(faq.slug));
      const lastQuestion = faq.items.at(-1)?.question ?? "";

      assert.ok(expected.includes(faq.heading), faq.slug);
      assert.ok(
        expected.indexOf(lastQuestion) > expected.indexOf(faq.heading),
        faq.slug,
      );
    }
  });
});
