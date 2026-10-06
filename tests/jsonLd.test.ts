import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildHomeGraph, buildPageGraph } from "../lib/seo/jsonLd";
import type { Config1, Page } from "../payload-types";

const fullConfig = {
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
  testimonials_section: [],
  faq_section: {
    faq: [{ question: "Question visible ?", answer: "Réponse visible." }],
  },
} as unknown as Config1;

const emptyIdentityConfig = {
  phone: "02 54 97 53 23",
  legal_section: {},
  testimonials_section: [],
  faq_section: { faq: [] },
} as unknown as Config1;

const department = {
  id: 1,
  slug: "loir-et-cher",
  navLabel: "Loir-et-Cher (41)",
  pageType: "department",
  areaName: "Loir-et-Cher",
  departmentCode: "41",
  seo: { title: "Titre département", description: "Description département" },
  layout: [],
  updatedAt: "2026-02-01T10:00:00.000Z",
} as unknown as Page;

const city = {
  id: 2,
  slug: "douche-senior-blois",
  navLabel: "Douche Senior Blois",
  pageType: "city",
  parent: 1,
  areaName: "Blois",
  seo: { title: "Titre Blois", description: "Description Blois" },
  layout: [
    {
      blockType: "hero",
      titleBefore: "Installation ",
      titleHighlight: "Douche  Sécurisée",
      titleAfter: "pour Seniors à Blois",
      intro: "Intro",
      ctaLabel: "Devis",
    },
  ],
  updatedAt: "2026-03-01T10:00:00.000Z",
} as unknown as Page;

const service = {
  id: 3,
  slug: "installation-douche-pmr",
  navLabel: "Installation Douche PMR",
  pageType: "service",
  seo: { title: "Titre PMR", description: "Description PMR" },
  layout: [],
  updatedAt: "2026-03-05T10:00:00.000Z",
} as unknown as Page;

const all = [department, city, service];

const nodesOf = (
  graph: { "@graph": Record<string, unknown>[] },
  type: string,
) =>
  graph["@graph"].filter(
    (node) =>
      node["@type"] === type ||
      (Array.isArray(node["@type"]) && node["@type"].includes(type)),
  );

const findById = (graph: { "@graph": Record<string, unknown>[] }, id: string) =>
  graph["@graph"].find((node) => node["@id"] === id);

const collectReferences = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.flatMap(collectReferences);
  }

  if (typeof value !== "object" || value === null) {
    return [];
  }

  const entries = Object.entries(value);
  const [first] = entries;

  if (
    entries.length === 1 &&
    first?.[0] === "@id" &&
    typeof first[1] === "string"
  ) {
    return [first[1]];
  }

  return entries.flatMap(([, child]) => collectReferences(child));
};

const danglingReferences = (graph: { "@graph": Record<string, unknown>[] }) => {
  const declared = new Set(graph["@graph"].map((node) => node["@id"]));

  return collectReferences(graph["@graph"]).filter((id) => !declared.has(id));
};

describe("buildPageGraph", () => {
  it("builds a connected graph for a city page", () => {
    const graph = buildPageGraph({ page: city, all, config: fullConfig });
    const business = findById(
      graph,
      "https://www.douche-senior-france.com/#business",
    );

    assert.equal(graph["@context"], "https://schema.org");
    assert.ok(business);
    assert.equal(nodesOf(graph, "BreadcrumbList").length, 1);
    assert.equal(nodesOf(graph, "WebPage").length, 1);
    assert.equal(nodesOf(graph, "Service").length, 1);

    const webPage = nodesOf(graph, "WebPage")[0];
    assert.deepEqual(webPage?.about, {
      "@id": "https://www.douche-senior-france.com/#business",
    });

    const service = nodesOf(graph, "Service")[0];
    assert.deepEqual(service?.provider, {
      "@id": "https://www.douche-senior-france.com/#business",
    });
    assert.deepEqual(service?.areaServed, { "@type": "City", name: "Blois" });
  });

  it("names the service after the visible h1 and the web page after the SEO title", () => {
    const graph = buildPageGraph({ page: city, all, config: fullConfig });

    assert.equal(
      nodesOf(graph, "Service")[0]?.name,
      "Installation Douche Sécurisée pour Seniors à Blois",
    );
    assert.equal(nodesOf(graph, "WebPage")[0]?.name, "Titre Blois");
  });

  it("glues an elided article to the highlighted word like the h1 does", () => {
    const indre = {
      ...department,
      layout: [
        {
          blockType: "hero",
          titleBefore: "Installation Douche Senior dans l'",
          titleHighlight: "Indre (36)",
          intro: "Intro",
          ctaLabel: "Devis",
        },
      ],
    } as unknown as Page;
    const graph = buildPageGraph({ page: indre, all, config: fullConfig });

    assert.equal(
      nodesOf(graph, "Service")[0]?.name,
      "Installation Douche Senior dans l'Indre (36)",
    );
  });

  it("falls back to the navigation label when the page has no hero", () => {
    const graph = buildPageGraph({ page: service, all, config: fullConfig });

    assert.equal(nodesOf(graph, "Service")[0]?.name, "Installation Douche PMR");
  });

  it("emits a service without area for a city that has no area name", () => {
    const unnamed = { ...city, areaName: " " } as unknown as Page;
    const graph = buildPageGraph({ page: unnamed, all, config: fullConfig });
    const node = nodesOf(graph, "Service")[0];

    assert.ok(node);
    assert.equal("areaServed" in node, false);
    assert.ok(!JSON.stringify(graph).includes('""'));
  });

  it("describes a department without code by its name only, and skips one without name", () => {
    const noCode = { ...department, departmentCode: null } as unknown as Page;
    const noName = { ...department, areaName: null } as unknown as Page;
    const withoutCode = buildPageGraph({
      page: noCode,
      all: [noCode, city, service],
      config: fullConfig,
    });
    const withoutName = buildPageGraph({
      page: noName,
      all: [noName, city, service],
      config: fullConfig,
    });
    const business = findById(
      withoutName,
      "https://www.douche-senior-france.com/#business",
    );
    const unnamedService = nodesOf(withoutName, "Service")[0];

    assert.deepEqual(nodesOf(withoutCode, "Service")[0]?.areaServed, {
      "@type": "AdministrativeArea",
      name: "Loir-et-Cher",
    });
    assert.ok(unnamedService);
    assert.equal("areaServed" in unnamedService, false);
    assert.deepEqual(business?.areaServed, [
      { "@type": "AdministrativeArea", name: "Centre-Val de Loire" },
    ]);
  });

  it("survives a parent of the wrong type, a self parent and a missing parent", () => {
    const cases = [
      { ...city, parent: 3 },
      { ...city, parent: 2 },
      { ...city, parent: null },
    ] as unknown as Page[];

    for (const candidate of cases) {
      const pages = [department, candidate, service];
      const graph = buildPageGraph({
        page: candidate,
        all: pages,
        config: fullConfig,
      });
      const items = nodesOf(graph, "BreadcrumbList")[0]?.itemListElement as {
        position: number;
        name: string;
      }[];

      assert.deepEqual(
        items.map((item) => [item.position, item.name]),
        [
          [1, "Accueil"],
          [2, "Douche Senior Blois"],
        ],
      );
      assert.deepEqual(danglingReferences(graph), []);
    }
  });

  it("drops a breadcrumb item whose label is blank and renumbers the rest", () => {
    const blankParent = { ...department, navLabel: "  " } as unknown as Page;
    const graph = buildPageGraph({
      page: city,
      all: [blankParent, city, service],
      config: fullConfig,
    });
    const items = nodesOf(graph, "BreadcrumbList")[0]?.itemListElement as {
      position: number;
      name: string;
    }[];

    assert.deepEqual(
      items.map((item) => [item.position, item.name]),
      [
        [1, "Accueil"],
        [2, "Douche Senior Blois"],
      ],
    );
  });

  it("publishes no opening hours and no price range, which the site shows nowhere", () => {
    const serialized = JSON.stringify(
      buildPageGraph({ page: city, all, config: fullConfig }),
    );

    assert.ok(!serialized.includes("openingHoursSpecification"));
    assert.ok(!serialized.includes("priceRange"));
  });

  it("publishes the coordinates only with a complete address", () => {
    const withAddress = findById(
      buildPageGraph({ page: city, all, config: fullConfig }),
      "https://www.douche-senior-france.com/#business",
    );
    const withoutAddress = findById(
      buildPageGraph({ page: city, all, config: emptyIdentityConfig }),
      "https://www.douche-senior-france.com/#business",
    );

    assert.ok(withAddress && withoutAddress);
    assert.equal("geo" in withAddress, true);
    assert.equal("geo" in withoutAddress, false);
  });

  it("lists the trail Accueil, department, city in the breadcrumb", () => {
    const graph = buildPageGraph({ page: city, all, config: fullConfig });
    const breadcrumb = nodesOf(graph, "BreadcrumbList")[0];
    const items = breadcrumb?.itemListElement as {
      position: number;
      name: string;
      item: string;
    }[];

    assert.deepEqual(
      items.map((item) => [item.position, item.name, item.item]),
      [
        [1, "Accueil", "https://www.douche-senior-france.com/"],
        [
          2,
          "Loir-et-Cher (41)",
          "https://www.douche-senior-france.com/loir-et-cher",
        ],
        [
          3,
          "Douche Senior Blois",
          "https://www.douche-senior-france.com/douche-senior-blois",
        ],
      ],
    );
  });

  it("describes a department as an administrative area", () => {
    const graph = buildPageGraph({ page: department, all, config: fullConfig });
    const service = nodesOf(graph, "Service")[0];

    assert.deepEqual(service?.areaServed, {
      "@type": "AdministrativeArea",
      name: "Loir-et-Cher",
      identifier: "41",
    });
  });

  it("serves the whole region from a service page and emits no FAQ, no review, no rating", () => {
    const graph = buildPageGraph({ page: service, all, config: fullConfig });
    const serialized = JSON.stringify(graph);
    const serviceNode = nodesOf(graph, "Service")[0];

    assert.equal(nodesOf(graph, "Service").length, 1);
    assert.deepEqual(serviceNode?.areaServed, {
      "@type": "AdministrativeArea",
      name: "Centre-Val de Loire",
    });
    assert.equal(nodesOf(graph, "FAQPage").length, 0);
    assert.ok(!serialized.includes("aggregateRating"));
    assert.ok(!serialized.includes('"Review"'));
  });

  it("only references nodes that exist in the same graph", () => {
    for (const page of all) {
      assert.deepEqual(
        danglingReferences(buildPageGraph({ page, all, config: fullConfig })),
        [],
      );
    }

    assert.deepEqual(
      danglingReferences(buildHomeGraph({ all, config: fullConfig })),
      [],
    );
  });

  it("keeps the breadcrumb to Accueil and the page when the parent is unknown", () => {
    const orphan = { ...city, parent: 99 } as unknown as Page;
    const graph = buildPageGraph({ page: orphan, all, config: fullConfig });
    const breadcrumb = nodesOf(graph, "BreadcrumbList")[0];
    const items = breadcrumb?.itemListElement as { name: string }[];

    assert.deepEqual(
      items.map((item) => item.name),
      ["Accueil", "Douche Senior Blois"],
    );
  });

  it("emits the phone in E.164 only", () => {
    const graph = buildPageGraph({ page: city, all, config: fullConfig });
    const business = findById(
      graph,
      "https://www.douche-senior-france.com/#business",
    );

    assert.equal(business?.telephone, "+33254975323");
  });

  it("omits empty identity properties instead of emitting empty strings", () => {
    const graph = buildPageGraph({
      page: city,
      all,
      config: emptyIdentityConfig,
    });
    const business = findById(
      graph,
      "https://www.douche-senior-france.com/#business",
    );

    assert.ok(business);
    assert.equal("address" in business, false);
    assert.equal("legalName" in business, false);
    assert.equal("taxID" in business, false);
    assert.equal("identifier" in business, false);
    assert.ok(!JSON.stringify(graph).includes('""'));
  });
});

describe("buildHomeGraph", () => {
  it("emits the business identity from the CMS", () => {
    const graph = buildHomeGraph({ all, config: fullConfig });
    const business = findById(
      graph,
      "https://www.douche-senior-france.com/#business",
    );

    assert.equal(business?.legalName, "DOUCHE SENIOR FRANCE");
    assert.equal(business?.taxID, "800339673");
    assert.deepEqual(business?.address, {
      "@type": "PostalAddress",
      streetAddress: "147 rue de Romorantin",
      postalCode: "41130",
      addressLocality: "Selles-sur-Cher",
      addressRegion: "Centre-Val de Loire",
      addressCountry: "FR",
    });
    assert.deepEqual(business?.identifier, {
      "@type": "PropertyValue",
      propertyID: "SIREN",
      value: "800339673",
    });
  });

  it("lists the region and the departments of the CMS as the area served", () => {
    const graph = buildHomeGraph({ all, config: fullConfig });
    const business = findById(
      graph,
      "https://www.douche-senior-france.com/#business",
    );

    assert.deepEqual(business?.areaServed, [
      { "@type": "AdministrativeArea", name: "Centre-Val de Loire" },
      { "@type": "AdministrativeArea", name: "Loir-et-Cher", identifier: "41" },
    ]);
  });

  it("omits a half filled address", () => {
    const partial = {
      ...fullConfig,
      legal_section: {
        street_address: "147 rue de Romorantin",
        postal_code: " ",
      },
    } as unknown as Config1;
    const graph = buildHomeGraph({ all, config: partial });
    const business = findById(
      graph,
      "https://www.douche-senior-france.com/#business",
    );

    assert.ok(business);
    assert.equal("address" in business, false);
  });

  it("publishes the FAQ text without stray whitespace and skips incomplete questions", () => {
    const messy = {
      ...fullConfig,
      faq_section: {
        faq: [
          { question: " Une  question ? ", answer: "Ligne une.\nLigne deux. " },
          { question: "Sans réponse ?", answer: "  " },
        ],
      },
    } as unknown as Config1;
    const graph = buildHomeGraph({ all, config: messy });
    const faq = nodesOf(graph, "FAQPage")[0];

    assert.deepEqual(faq?.mainEntity, [
      {
        "@type": "Question",
        name: "Une question ?",
        acceptedAnswer: { "@type": "Answer", text: "Ligne une. Ligne deux." },
      },
    ]);
  });

  it("emits no FAQ node when the CMS has no question", () => {
    const graph = buildHomeGraph({ all, config: emptyIdentityConfig });

    assert.equal(nodesOf(graph, "FAQPage").length, 0);
    assert.ok(!JSON.stringify(graph).includes('""'));
  });

  it("builds the FAQ from the visible CMS questions", () => {
    const graph = buildHomeGraph({ all, config: fullConfig });
    const faq = nodesOf(graph, "FAQPage")[0];

    assert.deepEqual(faq?.mainEntity, [
      {
        "@type": "Question",
        name: "Question visible ?",
        acceptedAnswer: { "@type": "Answer", text: "Réponse visible." },
      },
    ]);
  });

  it("emits no aggregateRating and no Review when no rating is entered", () => {
    const graph = buildHomeGraph({ all, config: fullConfig });
    const serialized = JSON.stringify(graph);

    assert.ok(!serialized.includes("aggregateRating"));
    assert.ok(!serialized.includes('"Review"'));
  });

  it("emits the exact aggregateRating and one Review per rated testimonial", () => {
    const rated = {
      ...fullConfig,
      testimonials_section: [
        {
          title: "Marie",
          age: "70 ans",
          text: "Avis un",
          location: "Blois",
          rating: 5,
          source: "direct",
        },
        {
          title: "Paul",
          age: "75 ans",
          text: "Avis deux",
          location: "Tours",
          rating: 4,
          source: "google",
        },
        {
          title: "Anne",
          age: "80 ans",
          text: "Sans note",
          location: "Bourges",
        },
      ],
    } as unknown as Config1;

    const graph = buildHomeGraph({ all, config: rated });
    const business = findById(
      graph,
      "https://www.douche-senior-france.com/#business",
    );

    assert.deepEqual(business?.aggregateRating, {
      "@type": "AggregateRating",
      ratingValue: 4.5,
      reviewCount: 2,
      bestRating: 5,
      worstRating: 1,
    });

    const reviews = business?.review as {
      author: { name: string };
      reviewRating: { ratingValue: number };
    }[];
    assert.deepEqual(
      reviews.map((review) => [
        review.author.name,
        review.reviewRating.ratingValue,
      ]),
      [
        ["Marie", 5],
        ["Paul", 4],
      ],
    );
  });

  it("leaves out a rated testimonial that has no author name", () => {
    const rated = {
      ...fullConfig,
      testimonials_section: [
        { title: " ", text: "Avis anonyme", rating: 5 },
        { title: "Paul", text: "Avis deux", rating: 4 },
      ],
    } as unknown as Config1;
    const business = findById(
      buildHomeGraph({ all, config: rated }),
      "https://www.douche-senior-france.com/#business",
    );
    const reviews = business?.review as { author: { name: string } }[];

    assert.deepEqual(
      reviews.map((review) => review.author.name),
      ["Paul"],
    );
    assert.deepEqual(business?.aggregateRating, {
      "@type": "AggregateRating",
      ratingValue: 4,
      reviewCount: 1,
      bestRating: 5,
      worstRating: 1,
    });
  });

  it("uses the Google figures for the aggregate when both are entered", () => {
    const withGoogle = {
      ...fullConfig,
      google_rating: 4.8,
      google_review_count: 31,
    } as unknown as Config1;

    const graph = buildHomeGraph({ all, config: withGoogle });
    const business = findById(
      graph,
      "https://www.douche-senior-france.com/#business",
    );

    assert.deepEqual(business?.aggregateRating, {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 31,
      bestRating: 5,
      worstRating: 1,
    });
  });
});
