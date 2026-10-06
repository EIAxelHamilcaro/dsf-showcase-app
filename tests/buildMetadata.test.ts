import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildMetadata } from "../lib/seo/buildMetadata";
import { homeSeo } from "../lib/site";

describe("buildMetadata", () => {
  it("serves the page title and description as written, on the page and on the share card", () => {
    const metadata = buildMetadata({
      title: "Douche Senior Blois",
      description: "Installation à Blois.",
      path: "/douche-senior-blois",
    });

    assert.deepEqual(metadata.title, { absolute: "Douche Senior Blois" });
    assert.equal(metadata.description, "Installation à Blois.");
    assert.equal(metadata.openGraph?.title, "Douche Senior Blois");
    assert.equal(metadata.openGraph?.description, "Installation à Blois.");
    assert.equal(metadata.openGraph?.url, "/douche-senior-blois");
    assert.equal(metadata.alternates?.canonical, "/douche-senior-blois");
  });

  it("falls back to the site title and description when they are empty or only spaces", () => {
    for (const blank of ["", "   ", "\n\t "]) {
      const metadata = buildMetadata({
        title: blank,
        description: blank,
        path: "/cher",
      });

      assert.deepEqual(metadata.title, { absolute: homeSeo.title });
      assert.equal(metadata.description, homeSeo.description);
      assert.equal(metadata.openGraph?.title, homeSeo.title);
      assert.equal(metadata.openGraph?.description, homeSeo.description);
      assert.equal(metadata.twitter?.title, homeSeo.title);
      assert.equal(metadata.alternates?.canonical, "/cher");
    }
  });

  it("keeps the home title and description within the search result limits, without the unsupported 100% aid", () => {
    assert.ok(homeSeo.title.length <= 60, String(homeSeo.title.length));
    assert.ok(
      homeSeo.description.length <= 160,
      String(homeSeo.description.length),
    );
    assert.ok(!`${homeSeo.title} ${homeSeo.description}`.includes("100"));
  });
});
