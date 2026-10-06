import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { pagesSeed } from "../migrations/seed/pagesSeed";

const slugs = new Set(pagesSeed.map((page) => page.slug));
const emoji = /\p{Extended_Pictographic}/u;
const dashes = /[\u2013\u2014]/;

const hiddenKeys = new Set([
  "id",
  "blockName",
  "blockType",
  "background",
  "layout",
  "columns",
  "spacing",
  "variant",
  "icon",
  "href",
  "linkHref",
  "buttonHref",
]);

function collectVisibleTexts(value: unknown, texts: string[] = []): string[] {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectVisibleTexts(item, texts);
    }

    return texts;
  }

  if (typeof value !== "object" || value === null) {
    return texts;
  }

  for (const [key, child] of Object.entries(value)) {
    if (hiddenKeys.has(key)) {
      continue;
    }

    if (typeof child === "string") {
      texts.push(child);
      continue;
    }

    collectVisibleTexts(child, texts);
  }

  return texts;
}

function readGoldenText(slug: string): string {
  return readFileSync(
    new URL(`./fixtures/mainText/${slug}.txt`, import.meta.url),
    "utf8",
  );
}

function collectHrefs(value: unknown, hrefs: string[] = []): string[] {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectHrefs(item, hrefs);
    }

    return hrefs;
  }

  if (typeof value !== "object" || value === null) {
    return hrefs;
  }

  for (const [key, child] of Object.entries(value)) {
    if (
      (key === "href" || key === "linkHref" || key === "buttonHref") &&
      typeof child === "string"
    ) {
      hrefs.push(child);
    }

    collectHrefs(child, hrefs);
  }

  return hrefs;
}

describe("pagesSeed", () => {
  it("contains the 15 existing pages with unique slugs", () => {
    assert.equal(pagesSeed.length, 15);
    assert.equal(slugs.size, 15);
  });

  it("gives every city an existing department as parent", () => {
    const cities = pagesSeed.filter((page) => page.pageType === "city");
    assert.equal(cities.length, 6);

    for (const city of cities) {
      const parent = pagesSeed.find((page) => page.slug === city.parentSlug);
      assert.equal(parent?.pageType, "department", city.slug);
    }
  });

  it("describes the territory of every city and department", () => {
    for (const page of pagesSeed) {
      if (page.pageType === "city" || page.pageType === "department") {
        assert.ok(page.areaName, page.slug);
      }

      if (page.pageType === "department") {
        assert.match(page.departmentCode ?? "", /^\d{2}$/, page.slug);
      }
    }
  });

  it("respects the SEO limits and keeps emojis and dashes out of metadata", () => {
    for (const page of pagesSeed) {
      assert.ok(
        page.seo.title.length <= 60,
        `${page.slug} title ${page.seo.title.length}`,
      );
      assert.ok(
        page.seo.description.length >= 100 &&
          page.seo.description.length <= 160,
        `${page.slug} description ${page.seo.description.length}`,
      );
      assert.ok(!emoji.test(page.seo.title + page.seo.description), page.slug);
      assert.ok(!dashes.test(page.seo.title + page.seo.description), page.slug);
    }
  });

  it("starts every page with one hero and ends it with a call to action", () => {
    for (const page of pagesSeed) {
      const types = page.layout.map((block) => block.blockType);
      assert.equal(
        types.filter((type) => type === "hero").length,
        1,
        page.slug,
      );
      assert.equal(types[0], "hero", page.slug);
      assert.equal(types.at(-1), "cta", page.slug);
    }
  });

  it("only links to pages that exist", () => {
    for (const page of pagesSeed) {
      for (const href of collectHrefs(page.layout)) {
        assert.ok(
          slugs.has(href.replace(/^\//, "")),
          `${page.slug} links to ${href}`,
        );
      }
    }
  });

  it("only holds texts that appear in the captured text of the page", () => {
    for (const page of pagesSeed) {
      const golden = readGoldenText(page.slug);
      const texts = collectVisibleTexts(page.layout);

      assert.ok(texts.length > 0, page.slug);

      for (const text of texts) {
        assert.ok(golden.includes(text), `${page.slug} seeds "${text}"`);
      }
    }
  });
});
