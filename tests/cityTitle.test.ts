import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { listOverlongCityTitles } from "../lib/pages/cityTitle";
import {
  clientDescriptions,
  sharedDescription,
} from "../migrations/seed/cityDescriptionSeed";

const pattern = "Douche Senior {ville} | Artisan Certifié | Devis Gratuit";
const inCher = { departmentName: "Cher", departmentCode: "18" };

describe("search title composed from the template", () => {
  it("accepts a city whose composed title holds in 60 characters", () => {
    assert.deepEqual(
      listOverlongCityTitles(pattern, [
        { name: "Châteauroux", departmentName: "Indre", departmentCode: "36" },
      ]),
      [],
    );
  });

  it("reports Saint-Amand-Montrond, whose composed title is too long", () => {
    assert.deepEqual(
      listOverlongCityTitles(pattern, [
        { name: "Bourges", ...inCher },
        { name: "Saint-Amand-Montrond", ...inCher },
      ]),
      [
        {
          name: "Saint-Amand-Montrond",
          title:
            "Douche Senior Saint-Amand-Montrond | Artisan Certifié | Devis Gratuit",
          length: 69,
        },
      ],
    );
  });

  it("lets a city with its own title use any name", () => {
    assert.deepEqual(
      listOverlongCityTitles(pattern, [
        {
          name: "Saint-Amand-Montrond",
          ownTitle: "Douche Senior Saint-Amand-Montrond | Devis Gratuit",
          ...inCher,
        },
      ]),
      [],
    );
  });

  it("counts an own title made of spaces as no title", () => {
    const [overlong] = listOverlongCityTitles(pattern, [
      { name: "Saint-Amand-Montrond", ownTitle: "  ", ...inCher },
    ]);

    assert.equal(overlong?.length, 69);
  });

  it("counts the department name and number a pattern inserts", () => {
    const [overlong] = listOverlongCityTitles(
      "Douche Senior {ville} ({code}) | Artisan Certifié en {departement} | Devis Gratuit",
      [{ name: "Vierzon", ...inCher }],
    );

    assert.equal(
      overlong?.title,
      "Douche Senior Vierzon (18) | Artisan Certifié en Cher | Devis Gratuit",
    );
  });
});

describe("search descriptions restored for the six cities", () => {
  it("keeps every description within 160 characters and names no placeholder", () => {
    assert.equal(clientDescriptions.length, 6);

    for (const { description } of clientDescriptions) {
      assert.ok(description.length <= 160);
      assert.doesNotMatch(description, /[{}]/);
    }
  });

  it("gives new cities a shared description that names no commune", () => {
    assert.doesNotMatch(sharedDescription.to, /communes|\(/);
    assert.ok(
      sharedDescription.to.replace("{ville}", "Saint-Amand-Montrond").length <=
        160,
    );
  });
});
