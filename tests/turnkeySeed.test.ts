import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { faqSeed } from "../migrations/seed/faqSeed";
import { legalPagesSeed } from "../migrations/seed/legalPagesSeed";
import { localTextSeed } from "../migrations/seed/localTextSeed";
import { mediaAltSeed } from "../migrations/seed/mediaAltSeed";
import { pagesSeed } from "../migrations/seed/pagesSeed";
import {
  faqFixes,
  legalFixes,
  pageTextFixes,
  reviewFixes,
} from "../migrations/seed/reviewFixesSeed";
import {
  gallerySwap,
  googleProfileUrl,
} from "../migrations/seed/siteFixesSeed";
import {
  homeCorrections,
  menuCorrections,
  pageDetailRemovals,
  pageFieldCorrections,
  seoDescriptionCorrections,
} from "../migrations/seed/taxCreditCorrections";

const dashes = /[\u2013\u2014]/;
const rating = /\d[.,]\d\s*\/\s*5|\/\s*5\b|\bavis\b|étoile|★/i;
const placeholder = /[[\]]|à confirmer|à renseigner|à revérifier/i;
const vatNumber = /\bFR\s?\d{2}\s?\d{9}\b/;
const longNumber = /\d(?:[ \u00a0\u202f]?\d){8,}/g;
const taxCredit = /crédit d'impôt/i;
const taxCreditEnded = /supprimé|ne s'applique plus/i;
const taxCreditEndDate = /1er janvier 2026/;
const knownNumbers = new Set(["800339673", "80033967300017", "0254975323"]);

const reviewed = (slug: string, field: string, text: string) =>
  reviewFixes.find(
    (fix) => fix.slug === slug && fix.field === field && fix.from === text,
  )?.to ?? text;

const legalTexts = legalPagesSeed.flatMap((page) => [
  page.navLabel,
  page.title,
  page.seo.title,
  page.seo.description,
  ...page.sections.flatMap((section) => [
    reviewed(page.slug, "heading", section.heading ?? ""),
    ...[
      ...(section.paragraphs ?? []),
      ...(section.items ?? []),
      ...(section.rows ?? []).flat(),
    ].map((text) => reviewed(page.slug, "text", text)),
    ...(section.headers ?? []),
  ]),
]);

const faqTexts = faqSeed.flatMap((page) => [
  page.heading,
  ...page.items.flatMap((item) => [
    `${reviewed(page.slug, "question", item.question)} ${reviewed(page.slug, "answer", item.answer)}`,
    ...item.sources.map((source) => source.label),
  ]),
]);

const localTexts = localTextSeed.flatMap((page) => [
  `${page.heading} ${page.paragraphs.join(" ")}`,
]);

const correctionTexts = [
  ...pageFieldCorrections.map((correction) =>
    reviewed(correction.slug, correction.field, correction.to),
  ),
  ...[...seoDescriptionCorrections, ...homeCorrections, ...menuCorrections].map(
    (correction) => correction.to,
  ),
  ...pageTextFixes.map((fix) => fix.to),
];

const pageTexts = [
  ...legalTexts,
  ...faqTexts,
  ...localTexts,
  ...correctionTexts,
];

const publishedTexts = [
  ...pageTexts,
  ...mediaAltSeed.map((media) => media.alt),
];

const countOf = (texts: string[], text: string) =>
  texts.filter((candidate) => candidate === text).length;

const slugsOfType = (types: string[]) =>
  pagesSeed
    .filter((page) => types.includes(page.pageType))
    .map((page) => page.slug)
    .sort();

describe("turnkey content seed", () => {
  it("gives a FAQ to each of the 15 pages and a local text to each city and department", () => {
    assert.deepEqual(
      faqSeed.map((page) => page.slug).sort(),
      pagesSeed.map((page) => page.slug).sort(),
    );
    assert.equal(
      faqSeed.reduce((total, page) => total + page.items.length, 0),
      66,
    );
    assert.deepEqual(
      localTextSeed.map((page) => page.slug).sort(),
      slugsOfType(["city", "department"]),
    );
  });

  it("holds complete answers, with their source moved out of the sentence", () => {
    for (const page of faqSeed) {
      assert.ok(page.heading.trim(), page.slug);
      assert.ok(page.items.length > 0, page.slug);

      for (const item of page.items) {
        assert.ok(item.question.trim().endsWith("?"), item.question);
        assert.ok(item.answer.trim().length > 40, item.question);
        assert.equal(item.answer, item.answer.trim(), item.question);
        assert.ok(!/Sources? :|https?:/.test(item.answer), item.question);
      }
    }

    for (const page of localTextSeed) {
      assert.ok(page.heading.trim(), page.slug);
      assert.ok(page.paragraphs.length > 0, page.slug);

      for (const paragraph of page.paragraphs) {
        assert.ok(paragraph.trim().length > 40, page.slug);
      }
    }
  });

  it("only cites official pages of service-public.gouv.fr, over https, with their check date", () => {
    const sources = faqSeed.flatMap((page) =>
      page.items.flatMap((item) => item.sources),
    );

    assert.ok(sources.length > 0);

    for (const source of sources) {
      const url = new URL(source.url);

      assert.equal(url.protocol, "https:", source.url);
      assert.equal(url.hostname, "www.service-public.gouv.fr", source.url);
      assert.match(
        source.label,
        /^service-public\.gouv\.fr, fiche F\d+ vérifiée le /,
      );
    }
  });

  it("answers every regulatory question with at least one official source", () => {
    for (const page of faqSeed) {
      for (const item of page.items) {
        const isRegulatory =
          /MaPrimeAdapt'? (finance|prend|retient)|crédit d'impôt/i.test(
            item.answer,
          );

        assert.ok(!isRegulatory || item.sources.length > 0, item.question);
      }
    }
  });

  it("never presents the abolished tax credit as available", () => {
    for (const text of pageTexts) {
      const saysItEnded =
        taxCreditEnded.test(text) && taxCreditEndDate.test(text);

      assert.ok(!taxCredit.test(text) || saysItEnded, text);
    }
  });

  it("holds no dash, no rating, no review count and no placeholder", () => {
    for (const text of [...publishedTexts, googleProfileUrl]) {
      assert.ok(!dashes.test(text), text);
      assert.ok(!rating.test(text), text);
      assert.ok(!placeholder.test(text), text);
    }
  });

  it("holds no identifier beyond the verified SIREN, SIRET and phone number", () => {
    for (const text of publishedTexts) {
      assert.ok(!vatNumber.test(text), text);

      for (const match of text.match(longNumber) ?? []) {
        assert.ok(
          knownNumbers.has(match.replace(/\D/g, "")),
          `${match} in ${text}`,
        );
      }
    }
  });

  it("describes the two legal pages within the SEO limits", () => {
    assert.deepEqual(
      legalPagesSeed.map((page) => page.slug),
      ["mentions-legales", "politique-de-confidentialite"],
    );

    for (const page of legalPagesSeed) {
      assert.ok(page.seo.title.length <= 60, page.slug);
      assert.ok(
        page.seo.description.length >= 100 &&
          page.seo.description.length <= 160,
        `${page.slug} description ${page.seo.description.length}`,
      );
      assert.ok(page.sections.length > 0, page.slug);

      for (const section of page.sections) {
        const width = section.headers?.length ?? 0;

        for (const row of section.rows ?? []) {
          assert.equal(row.length, width, `${page.slug} ${section.heading}`);
        }
      }
    }
  });

  it("keeps every corrected SEO description within 160 characters", () => {
    for (const correction of seoDescriptionCorrections) {
      assert.ok(correction.to.length <= 160, correction.ref);
    }
  });

  it("corrects only texts that the page seed really wrote", () => {
    for (const correction of pageFieldCorrections) {
      const page = pagesSeed.find((seed) => seed.slug === correction.slug);
      const occurrences = JSON.stringify(page?.layout ?? []).split(
        `${JSON.stringify(correction.field)}:${JSON.stringify(correction.from)}`,
      ).length;

      assert.equal(occurrences - 1, 1, correction.ref);
    }

    for (const correction of seoDescriptionCorrections) {
      const page = pagesSeed.find((seed) => seed.slug === correction.slug);

      assert.equal(page?.seo.description, correction.from, correction.ref);
    }

    for (const removal of pageDetailRemovals) {
      const page = pagesSeed.find((seed) => seed.slug === removal.slug);

      assert.ok(
        JSON.stringify(page?.layout ?? []).includes(
          JSON.stringify({ label: removal.label, text: removal.text }),
        ),
        removal.ref,
      );
    }
  });

  it("fixes after review only texts that the earlier seeds wrote exactly once", () => {
    for (const fix of pageTextFixes) {
      const page = pagesSeed.find((seed) => seed.slug === fix.slug);
      const seeded =
        JSON.stringify(page?.layout ?? []).split(
          `${JSON.stringify(fix.field)}:${JSON.stringify(fix.from)}`,
        ).length - 1;
      const corrected = pageFieldCorrections.filter(
        (correction) =>
          correction.slug === fix.slug &&
          correction.field === fix.field &&
          correction.to === fix.from,
      ).length;

      assert.equal(seeded + corrected, 1, fix.ref);
    }

    for (const fix of faqFixes) {
      const items = faqSeed.find((seed) => seed.slug === fix.slug)?.items ?? [];
      const written = items.map((item) =>
        fix.field === "question" ? item.question : item.answer,
      );

      assert.equal(countOf(written, fix.from), 1, fix.ref);
    }

    for (const fix of legalFixes) {
      const sections =
        legalPagesSeed.find((seed) => seed.slug === fix.slug)?.sections ?? [];
      const written = sections.flatMap((section) =>
        fix.field === "heading"
          ? [section.heading ?? ""]
          : [
              ...(section.paragraphs ?? []),
              ...(section.items ?? []),
              ...(section.rows ?? []).flat(),
            ],
      );

      assert.equal(countOf(written, fix.from), 1, fix.ref);
    }
  });

  it("publishes no share capital and no claim that data stays in the European Union", () => {
    for (const text of publishedTexts) {
      assert.ok(!/capital/i.test(text), text);
      assert.ok(
        !/hébergée dans l'Union européenne|région Europe/.test(text),
        text,
      );
    }
  });

  it("describes each of the 34 media once", () => {
    assert.equal(mediaAltSeed.length, 34);
    assert.equal(new Set(mediaAltSeed.map((media) => media.id)).size, 34);

    for (const media of mediaAltSeed) {
      assert.ok(media.alt.trim().length > 10, media.filename);
      assert.ok(media.filename.trim(), String(media.id));
    }
  });

  it("links the verified Google profile and swaps one gallery pair only", () => {
    const url = new URL(googleProfileUrl);

    assert.equal(url.protocol, "https:");
    assert.equal(url.hostname, "www.google.com");
    assert.deepEqual(gallerySwap, { order: 2, before: 12, after: 13 });
  });
});
