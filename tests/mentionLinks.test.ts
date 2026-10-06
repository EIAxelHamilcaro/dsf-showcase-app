import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createMentionLinker,
  getMentionTargets,
} from "../lib/pages/mentionLinks";
import type { Page } from "../payload-types";

const page = (slug: string, pageType: Page["pageType"], areaName: string) =>
  ({ slug, pageType, areaName, navLabel: areaName }) as Page;

const all = [
  page("douche-senior-tours", "city", "Tours"),
  page("douche-senior-blois", "city", "Blois"),
  page("indre-et-loire", "department", "Indre-et-Loire"),
  page("loiret", "department", "Loiret"),
  page("indre", "department", "Indre"),
  page("cher", "department", "Cher"),
  page("aides-financieres", "service", "Aides"),
];

const targets = getMentionTargets(all);

describe("getMentionTargets", () => {
  it("keeps cities and departments, without the names that are also rivers", () => {
    assert.deepEqual(targets.map((target) => target.href).sort(), [
      "/douche-senior-blois",
      "/douche-senior-tours",
      "/indre-et-loire",
      "/loiret",
    ]);
  });
});

describe("createMentionLinker", () => {
  it("links the first mention of a place inside a sentence", () => {
    const linker = createMentionLinker(targets, "/loiret");

    assert.deepEqual(linker.link("Beaugency, entre Blois et Orléans."), [
      "Beaugency, entre ",
      { label: "Blois", href: "/douche-senior-blois" },
      " et Orléans.",
    ]);
  });

  it("links one mention per paragraph and each page once per document", () => {
    const linker = createMentionLinker(targets, "/cher");

    assert.deepEqual(linker.link("De Blois à Tours."), [
      "De ",
      { label: "Blois", href: "/douche-senior-blois" },
      " à Tours.",
    ]);
    assert.deepEqual(linker.link("Blois puis Tours."), [
      "Blois puis ",
      { label: "Tours", href: "/douche-senior-tours" },
      ".",
    ]);
    assert.deepEqual(linker.link("Encore Blois et Tours."), [
      "Encore Blois et Tours.",
    ]);
  });

  it("never links a page to itself", () => {
    const linker = createMentionLinker(targets, "/douche-senior-tours");

    assert.deepEqual(linker.link("Une douche à Tours."), [
      "Une douche à Tours.",
    ]);
  });

  it("leaves a name that is only part of a longer place name", () => {
    const linker = createMentionLinker(targets, "/cher");

    assert.deepEqual(linker.link("À Joué-lès-Tours et Saint-Cyr."), [
      "À Joué-lès-Tours et Saint-Cyr.",
    ]);
  });

  it("resolves a commune name to its city page", () => {
    const linker = createMentionLinker(targets, "/indre-et-loire");

    assert.equal(linker.hrefOf("Tours"), "/douche-senior-tours");
    assert.equal(linker.hrefOf("Amboise"), undefined);
  });
});
