import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  fillAllPlaceholders,
  fillPlaceholders,
  findUnknownPlaceholders,
  listPlaceholderProblems,
  retiredPlaceholderNames,
} from "../lib/pages/placeholders";
import { sharedDescription } from "../migrations/seed/cityDescriptionSeed";
import { templateWording } from "../migrations/seed/cityModelSeed";
import { cityTemplateSeed } from "../migrations/seed/cityTemplateSeed";

const tours = {
  ville: "Tours",
  departement: "Indre-et-Loire",
  code: "37",
};

describe("city template placeholders", () => {
  it("replaces every known placeholder, as often as it appears", () => {
    assert.equal(
      fillPlaceholders(
        "{ville} et agglo - {departement} ({code}), {ville}",
        tours,
      ),
      "Tours et agglo - Indre-et-Loire (37), Tours",
    );
  });

  it("fills the texts of a whole template and leaves the other values alone", () => {
    const filled = fillAllPlaceholders(
      {
        heading: "Vous habitez {ville} ?",
        showMapIcon: false,
        cards: [{ icon: "mapPin", text: "Intervention sur {ville}" }],
        intro: null,
      },
      tours,
    );

    assert.deepEqual(filled, {
      heading: "Vous habitez Tours ?",
      showMapIcon: false,
      cards: [{ icon: "mapPin", text: "Intervention sur Tours" }],
      intro: null,
    });
  });

  it("reports a misspelled or unknown placeholder instead of publishing it", () => {
    assert.deepEqual(findUnknownPlaceholders("À {vile}, dans le {code}"), [
      "vile",
    ]);
    assert.deepEqual(findUnknownPlaceholders("{Ville} {} {ville}"), [
      "Ville",
      "",
    ]);
    assert.deepEqual(findUnknownPlaceholders("Sans repère"), []);
  });

  it("names the template field that holds the unknown placeholder", () => {
    const problems = listPlaceholderProblems({
      hero: { intro: "Artisan à {ville}" },
      featureCards: {
        cards: [{ title: "Ok" }, { title: "Près de {commune}" }],
      },
    });

    assert.deepEqual(problems, [
      { path: "featureCards.cards.1.title", names: ["commune"] },
    ]);
  });

  it("ships a template that only uses known placeholders", () => {
    assert.deepEqual(listPlaceholderProblems(cityTemplateSeed), []);
    assert.deepEqual(
      listPlaceholderProblems(
        templateWording.filter(({ path }) => path !== "seo.description"),
      ),
      [],
    );
    assert.deepEqual(listPlaceholderProblems(sharedDescription.to), []);
  });

  it("refuses the retired commune placeholder, except from the earlier migration that wrote it", () => {
    assert.deepEqual(listPlaceholderProblems({ seo: sharedDescription }), [
      { path: "seo.from", names: ["communes"] },
    ]);
    assert.deepEqual(
      listPlaceholderProblems(templateWording, retiredPlaceholderNames),
      [],
    );
  });
});
