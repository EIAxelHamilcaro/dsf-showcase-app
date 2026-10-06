import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildLlmsTxt } from "../lib/seo/llmsTxt";
import type { Config1, Page } from "../payload-types";

const page = (
  slug: string,
  pageType: Page["pageType"],
  description: string,
): Page =>
  ({
    id: slug.length,
    slug,
    navLabel: `Label ${slug}`,
    pageType,
    seo: { title: `Title ${slug}`, description },
    layout: [],
    updatedAt: "2026-03-01T10:00:00.000Z",
  }) as unknown as Page;

const pages = [
  page("mentions-legales", "legal", "Description légale"),
  page("douche-senior-blois", "city", "Description\n  Blois"),
  page("loir-et-cher", "department", "Description département"),
  page("aides-financieres", "service", "Description aides"),
];

const config = {
  phone: "02 54 97 53 23",
  email: "contact@example.test",
  legal_section: {
    legal_name: "DOUCHE SENIOR FRANCE",
    legal_form: "SAS",
    siren: "800339673",
    street_address: "147 rue de Romorantin",
    postal_code: "41130",
    locality: "Selles-sur-Cher",
  },
  google_rating: 4.2,
  google_review_count: 137,
} as unknown as Config1;

describe("buildLlmsTxt", () => {
  it("given pages of every type, when the file is built, then each page is listed once under its type and legal pages come last", () => {
    const text = buildLlmsTxt({ pages, config });
    const headings = text.split("\n").filter((line) => line.startsWith("## "));

    assert.deepEqual(headings, [
      "## Accueil",
      "## Services",
      "## Départements",
      "## Villes",
      "## Informations légales",
      "## Contact",
    ]);
    assert.ok(
      text.includes(
        "- [Label douche-senior-blois](https://www.douche-senior-france.com/douche-senior-blois): Description Blois\n",
      ),
    );
    assert.equal(text.match(/^- \[/gm)?.length, pages.length + 1);
  });

  it("given a Google rating and a review count in the config, when the file is built, then neither figure is published", () => {
    const text = buildLlmsTxt({ pages, config });

    assert.ok(!text.includes("4.2"));
    assert.ok(!text.includes("4,2"));
    assert.ok(!text.includes("137"));
  });

  it("given an empty legal identity and no page, when the file is built, then no empty line or section is emitted", () => {
    const text = buildLlmsTxt({
      pages: [],
      config: {
        phone: " ",
        email: "contact@example.test",
        legal_section: { legal_form: "SAS" },
      } as unknown as Config1,
    });
    const headings = text.split("\n").filter((line) => line.startsWith("## "));

    assert.deepEqual(headings, ["## Accueil", "## Contact"]);
    assert.ok(text.endsWith("## Contact\n\n- Email : contact@example.test\n"));
  });
});
