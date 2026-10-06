import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getBreadcrumb,
  getCityLinks,
  getRelatedLinks,
} from "../lib/pages/pageLinks";
import type { Page } from "../payload-types";

const page = (
  id: number,
  slug: string,
  pageType: Page["pageType"],
  parent?: number,
) => ({ id, slug, navLabel: `Label ${slug}`, pageType, parent }) as Page;

const loirEtCher = page(1, "loir-et-cher", "department");
const cher = page(2, "cher", "department");
const blois = page(3, "douche-senior-blois", "city", 1);
const romorantin = page(4, "douche-senior-romorantin", "city", 1);
const bourges = page(5, "douche-senior-bourges", "city", 2);
const pmr = page(6, "installation-douche-pmr", "service");
const aids = page(7, "aides-financieres", "service");
const all = [loirEtCher, cher, blois, romorantin, bourges, pmr, aids];

const hrefs = (links: { href: string }[]) => links.map((link) => link.href);

describe("getRelatedLinks", () => {
  it("links a city to its department, its sibling cities and the services", () => {
    assert.deepEqual(hrefs(getRelatedLinks(blois, all)), [
      "/loir-et-cher",
      "/douche-senior-romorantin",
      "/installation-douche-pmr",
      "/aides-financieres",
    ]);
  });

  it("links a department to its own cities only, then the services", () => {
    assert.deepEqual(hrefs(getRelatedLinks(loirEtCher, all)), [
      "/douche-senior-blois",
      "/douche-senior-romorantin",
      "/installation-douche-pmr",
      "/aides-financieres",
    ]);
  });

  it("links a service to the other services and every department", () => {
    assert.deepEqual(hrefs(getRelatedLinks(pmr, all)), [
      "/aides-financieres",
      "/loir-et-cher",
      "/cher",
    ]);
  });
});

describe("getBreadcrumb", () => {
  it("resolves a parent given as an id or as a populated page", () => {
    const populated = { ...blois, parent: loirEtCher } as Page;
    const expected = ["/", "/loir-et-cher", "/douche-senior-blois"];

    assert.deepEqual(hrefs(getBreadcrumb(blois, all)), expected);
    assert.deepEqual(hrefs(getBreadcrumb(populated, all)), expected);
  });
});

describe("a parent that makes no sense", () => {
  const trail = (candidate: Page, pages: Page[]) =>
    hrefs(getBreadcrumb(candidate, pages));

  it("gives a city without parent the short trail and no department link", () => {
    const lonely = page(8, "douche-senior-vendome", "city");
    const pages = [...all, lonely];

    assert.deepEqual(trail(lonely, pages), ["/", "/douche-senior-vendome"]);
    assert.deepEqual(hrefs(getRelatedLinks(lonely, pages)), [
      "/installation-douche-pmr",
      "/aides-financieres",
    ]);
  });

  it("ignores a parent that is not a department", () => {
    const underService = page(8, "douche-senior-vendome", "city", 6);
    const underCity = page(9, "douche-senior-vierzon", "city", 3);
    const pages = [...all, underService, underCity];

    assert.deepEqual(trail(underService, pages), [
      "/",
      "/douche-senior-vendome",
    ]);
    assert.deepEqual(trail(underCity, pages), ["/", "/douche-senior-vierzon"]);
  });

  it("ignores a parent set on a page that is not a city", () => {
    const nested = page(8, "sologne", "department", 1);
    const service = page(9, "pose-receveur", "service", 1);
    const pages = [...all, nested, service];

    assert.deepEqual(trail(nested, pages), ["/", "/sologne"]);
    assert.deepEqual(trail(service, pages), ["/", "/pose-receveur"]);
  });

  it("ignores a page that is its own parent", () => {
    const loop = page(8, "douche-senior-vendome", "city", 8);
    const pages = [...all, loop];

    assert.deepEqual(trail(loop, pages), ["/", "/douche-senior-vendome"]);
    assert.doesNotThrow(() => getRelatedLinks(loop, pages));
  });

  it("drops a link whose label is empty or only spaces", () => {
    const blank = {
      ...page(8, "douche-senior-vendome", "city", 1),
      navLabel: "   ",
    } as Page;
    const pages = [...all, blank];

    assert.deepEqual(trail(blank, pages), ["/", "/loir-et-cher"]);
    assert.ok(!hrefs(getCityLinks(pages)).includes("/douche-senior-vendome"));
    assert.ok(
      !hrefs(getRelatedLinks(blois, pages)).includes("/douche-senior-vendome"),
    );
  });
});

describe("getCityLinks", () => {
  it("lists every city page for the home page", () => {
    assert.deepEqual(hrefs(getCityLinks(all)), [
      "/douche-senior-blois",
      "/douche-senior-romorantin",
      "/douche-senior-bourges",
    ]);
  });
});
