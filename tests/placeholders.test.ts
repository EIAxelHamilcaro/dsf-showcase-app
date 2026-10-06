import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  fillAllPlaceholders,
  fillPlaceholders,
  findUnknownPlaceholders,
  listPlaceholderProblems,
} from "../lib/pages/placeholders";
import { templateWording } from "../migrations/seed/cityModelSeed";
import { cityTemplateSeed } from "../migrations/seed/cityTemplateSeed";

const tours = {
  ville: "Tours",
  departement: "Indre-et-Loire",
  code: "37",
  communes: "Joué-lès-Tours, Saint-Cyr-sur-Loire",
};

describe("city template placeholders", () => {
  it("replaces every known placeholder, as often as it appears", () => {
    assert.equal(
      fillPlaceholders(
        "{ville} et agglo ({communes}) - {departement} ({code}), {ville}",
        tours,
      ),
      "Tours et agglo (Joué-lès-Tours, Saint-Cyr-sur-Loire) - Indre-et-Loire (37), Tours",
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
    assert.deepEqual(listPlaceholderProblems(templateWording), []);
  });
});
