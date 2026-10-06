import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { faqSeed } from "../migrations/seed/faqSeed";
import { faqFixes } from "../migrations/seed/reviewFixesSeed";
import {
  applyCorrections,
  removeRepeatedBlocks,
  repeatedBlocks,
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

describe("removeRepeatedBlocks", () => {
  const block = { ref: "X4", page: "p", firstWords: "Avis de" };

  it("keeps one copy of a block captured twice in a row", () => {
    const single = removeRepeatedBlocks(
      "Titre Avis de Paul. Avis de Paul. Suite",
      [block],
    );

    assert.equal(single, "Titre Avis de Paul. Suite");
  });

  it("refuses a block that is not captured exactly twice or whose copies differ", () => {
    assert.throws(
      () => removeRepeatedBlocks("Titre Avis de Paul. Suite", [block]),
      /X4/,
    );
    assert.throws(
      () =>
        removeRepeatedBlocks("Titre Avis de Paul. Avis de Jean. Suite", [
          block,
        ]),
      /X4/,
    );
  });
});

describe("expected text of the 16 captured pages", () => {
  it("drops only the reviewed repeated blocks, each listed by its reference", () => {
    assert.deepEqual(
      repeatedBlocks.map((block) => `${block.page} ${block.ref}`),
      ["home G2"],
    );
  });

  it("keeps the 8 home testimonials exactly once", () => {
    const expected = buildExpectedText("home", readGolden("home"));

    assert.equal(expected.split("M. et Mme Chevy").length - 1, 1);
  });

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

  it("applies only the reviewed corrections, each listed by its reference", () => {
    assert.deepEqual(
      textCorrections.map(
        (correction) => `${correction.page} ${correction.ref}`,
      ),
      [
        "aides-financieres A1",
        "aides-financieres A2",
        "aides-financieres A3",
        "aides-financieres A6+E4",
        "aides-financieres A8",
        "remplacement-baignoire-par-douche D1",
        "remplacement-baignoire-par-douche D2",
        "douche-senior-blois D3",
        "amenagement-salle-bain-senior D4",
        "loir-et-cher E1",
        "remplacement-baignoire-par-douche E2",
        "douche-senior-blois E3",
        "aides-financieres H1",
        "aides-financieres A5",
        "home B1",
        "home B2",
        "home B3",
        "home G1",
      ],
    );
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

  it("shows each reviewed FAQ wording in place of the one it replaces", () => {
    assert.deepEqual(
      faqFixes.map((fix) => `${fix.slug} ${fix.ref}`),
      ["aides-financieres F1", "indre-et-loire F2", "aides-financieres F3"],
    );

    for (const fix of faqFixes) {
      const expected = buildExpectedText(fix.slug, readGolden(fix.slug));

      const [before, ...after] = expected.split(fix.to);

      assert.equal(after.length, 1, fix.ref);
      assert.ok(![before, ...after].join(" ").includes(fix.from), fix.ref);
    }
  });
});
