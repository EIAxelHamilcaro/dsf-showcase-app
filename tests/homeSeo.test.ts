import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getHomeSeo } from "../lib/seo/homeSeo";
import { buildHomeGraph } from "../lib/seo/jsonLd";
import { buildLlmsTxt } from "../lib/seo/llmsTxt";
import { homeSeo } from "../lib/site";
import type { Config1 } from "../payload-types";

const configWith = (seo: Config1["seo"]) =>
  ({ seo, faq_section: { faq: [] } }) as unknown as Config1;

describe("getHomeSeo", () => {
  it("uses the title and the description entered in the CMS", () => {
    const seo = { title: " Titre saisi ", description: "Description\nsaisie" };

    assert.deepEqual(getHomeSeo({ seo }), {
      title: "Titre saisi",
      description: "Description saisie",
    });
  });

  it("falls back to the site default for each field left empty or blank", () => {
    assert.deepEqual(getHomeSeo({}), homeSeo);
    assert.deepEqual(getHomeSeo({ seo: { title: null, description: "" } }), {
      title: homeSeo.title,
      description: homeSeo.description,
    });
    assert.deepEqual(
      getHomeSeo({ seo: { title: "   ", description: "Description saisie" } }),
      { title: homeSeo.title, description: "Description saisie" },
    );
  });

  it("feeds the home structured data and llms.txt with the same values", () => {
    const config = configWith({
      title: "Titre saisi",
      description: "Description saisie",
    });
    const webPage = buildHomeGraph({ all: [], config })["@graph"].find(
      (node) => node["@type"] === "WebPage",
    );

    assert.equal(webPage?.name, "Titre saisi");
    assert.equal(webPage?.description, "Description saisie");
    assert.ok(
      buildLlmsTxt({ pages: [], config }).includes(
        "- [Titre saisi](https://www.douche-senior-france.com): Description saisie\n",
      ),
    );
  });
});
