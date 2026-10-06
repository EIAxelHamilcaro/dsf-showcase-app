import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import { validateSlugUnusedBy } from "../collections/validateSharedSlug";
import { composeCityPage, mergeSitePages } from "../lib/pages/cityPage";
import { getBreadcrumb, getRelatedLinks } from "../lib/pages/pageLinks";
import { buildPageGraph } from "../lib/seo/jsonLd";
import { buildLlmsTxt } from "../lib/seo/llmsTxt";
import { cityTemplateSeed } from "../migrations/seed/cityTemplateSeed";
import type { City, CityTemplate, Config1, Page } from "../payload-types";

const template: CityTemplate = {
  id: 1,
  ...cityTemplateSeed,
  updatedAt: "2026-05-01T10:00:00.000Z",
};

const department = {
  id: 7,
  slug: "indre-et-loire",
  navLabel: "Indre-et-Loire (37)",
  pageType: "department",
  areaName: "Indre-et-Loire",
  departmentCode: "37",
  seo: { title: "Titre département", description: "Description département" },
  layout: [],
  updatedAt: "2026-02-01T10:00:00.000Z",
  createdAt: "2026-02-01T10:00:00.000Z",
} as Page;

const tours: City = {
  id: 7,
  name: "Tours",
  slug: "douche-senior-tours",
  department: 7,
  zones: [{ name: "Centre-ville Tours" }, { name: "Joué-lès-Tours" }],
  localSection: {
    background: "default",
    heading: "Comment se passe une installation à Tours",
    paragraphs: [{ text: "Texte local de Tours." }],
  },
  faq: {
    background: "default",
    heading: "Questions fréquentes à Tours",
    items: [
      {
        question: "Intervenez-vous à Tours ?",
        answer: "Oui.",
        sources: [{ label: "service-public.gouv.fr", url: "https://a.test" }],
      },
    ],
  },
  updatedAt: "2026-03-01T10:00:00.000Z",
  createdAt: "2026-03-01T10:00:00.000Z",
};

const compose = (city: City) => {
  const page = composeCityPage({ template, city, department });

  assert.ok(page);

  return page;
};

const blockTypes = (page: Page) =>
  page.layout.map((block) => block.blockType).join(" ");

describe("composeCityPage", () => {
  it("builds a standard city page from the template and the city record", () => {
    const page = compose(tours);
    const [hero, , zoneList, , , cta] = page.layout;

    assert.equal(
      blockTypes(page),
      "hero featureCards zoneList textSection faq cta",
    );
    assert.equal(page.slug, "douche-senior-tours");
    assert.equal(page.navLabel, "Douche Senior Tours");
    assert.equal(
      page.seo.title,
      "Douche Senior Tours | Artisan Certifié | Devis Gratuit",
    );
    assert.equal(
      hero?.blockType === "hero" && hero.location,
      "Tours et agglomération - Indre-et-Loire (37)",
    );
    assert.equal(
      hero?.blockType === "hero" && hero.titleAfter,
      "pour Seniors à Tours",
    );
    assert.deepEqual(
      zoneList?.blockType === "zoneList" && [zoneList.heading, zoneList.items],
      ["Zones d'intervention à Tours", tours.zones],
    );
    assert.equal(
      cta?.blockType === "cta" && cta.heading,
      "Vous habitez Tours ?",
    );
    assert.doesNotMatch(JSON.stringify(page), /\{(ville|departement|code)\}/);
  });

  it("places the optional sections of a city between its communes and its local text", () => {
    const page = compose({
      ...tours,
      extraSections: [
        {
          blockType: "testimonial",
          background: "default",
          quote: "Avis",
          author: "Client",
          rating: 5,
        },
        {
          blockType: "serviceCards",
          background: "muted",
          heading: "Nos prestations",
          columns: "2",
          cards: [{ title: "Prestation" }],
        },
        {
          blockType: "aidCards",
          background: "default",
          heading: "Aides",
        },
      ],
    });

    assert.equal(
      blockTypes(page),
      "hero featureCards zoneList testimonial serviceCards aidCards textSection faq cta",
    );
  });

  it("lets a city keep its own location line, zone heading, official name and search texts", () => {
    const page = compose({
      ...tours,
      areaName: "Tours Métropole",
      locationLine: "Tours et Val de Loire - Indre-et-Loire (37)",
      zonesHeading: "Zones d'intervention en Touraine",
      seo: { title: "Titre propre", description: "" },
    });
    const [hero, , zoneList] = page.layout;

    assert.equal(page.areaName, "Tours Métropole");
    assert.equal(page.seo.title, "Titre propre");
    assert.equal(
      page.seo.description,
      "Installation douche sécurisée à Tours et agglo. Artisan certifié. Installation 1 jour.",
    );
    assert.equal(
      hero?.blockType === "hero" && hero.location,
      "Tours et Val de Loire - Indre-et-Loire (37)",
    );
    assert.equal(
      zoneList?.blockType === "zoneList" && zoneList.heading,
      "Zones d'intervention en Touraine",
    );
  });

  it("dates the page from the later of the city record and the template", () => {
    assert.equal(compose(tours).updatedAt, "2026-05-01T10:00:00.000Z");
    assert.equal(
      compose({ ...tours, updatedAt: "2026-06-01T10:00:00.000Z" }).updatedAt,
      "2026-06-01T10:00:00.000Z",
    );
  });

  it("publishes nothing without a department or before the template exists", () => {
    const empty = { hero: {}, cta: {} } as unknown as CityTemplate;

    assert.equal(
      composeCityPage({ template, city: tours, department: undefined }),
      undefined,
    );
    assert.equal(
      composeCityPage({ template: empty, city: tours, department }),
      undefined,
    );
  });
});

describe("a composed city page in the site lists", () => {
  const service = {
    id: 3,
    slug: "installation-douche-pmr",
    navLabel: "Installation Douche PMR",
    pageType: "service",
    seo: { title: "Titre PMR", description: "Description PMR" },
    layout: [],
    updatedAt: "2026-03-05T10:00:00.000Z",
  } as unknown as Page;
  const cityPage = compose(tours);
  const all = mergeSitePages([department, service], [cityPage]);
  const config = { phone: "02 54 97 53 23" } as Config1;

  it("lets a page document win over a city that uses the same address", () => {
    const shadowing = { ...service, id: 9, slug: tours.slug } as Page;
    const merged = mergeSitePages([department, shadowing], [cityPage]);

    assert.deepEqual(
      merged.filter((page) => page.slug === tours.slug),
      [shadowing],
    );
  });

  it("lists the city with the pages, in address order", () => {
    assert.deepEqual(
      all.map((page) => page.slug),
      ["douche-senior-tours", "indre-et-loire", "installation-douche-pmr"],
    );
  });

  it("keeps the city apart from the department that has the same record number", () => {
    const hrefs = (links: { href: string }[]) => links.map((link) => link.href);

    assert.deepEqual(hrefs(getBreadcrumb(cityPage, all)), [
      "/",
      "/indre-et-loire",
      "/douche-senior-tours",
    ]);
    assert.deepEqual(hrefs(getRelatedLinks(department, all)), [
      "/douche-senior-tours",
      "/installation-douche-pmr",
    ]);
    assert.deepEqual(hrefs(getRelatedLinks(cityPage, all)), [
      "/indre-et-loire",
      "/installation-douche-pmr",
    ]);
  });

  it("lists the city in llms.txt under its h1 and description", () => {
    assert.ok(
      buildLlmsTxt({ pages: all, config }).includes(
        "## Villes\n\n- [Installation Douche Sécurisée pour Seniors à Tours](https://www.douche-senior-france.com/douche-senior-tours): Installation douche sécurisée à Tours et agglo. Artisan certifié. Installation 1 jour.",
      ),
    );
  });

  it("describes the city service, its breadcrumb and its visible FAQ as structured data", () => {
    const graph = buildPageGraph({ page: cityPage, all, config })["@graph"];
    const typed = (type: string) =>
      graph.find((node) => node["@type"] === type);
    const faq = typed("FAQPage") as { mainEntity: unknown[] };
    const breadcrumb = typed("BreadcrumbList") as {
      itemListElement: { name: string }[];
    };

    assert.equal(
      typed("Service")?.name,
      "Installation Douche Sécurisée pour Seniors à Tours",
    );
    assert.deepEqual(typed("Service")?.areaServed, {
      "@type": "City",
      name: "Tours",
    });
    assert.equal(typed("WebPage")?.dateModified, "2026-05-01T10:00:00.000Z");
    assert.deepEqual(
      breadcrumb.itemListElement.map((item) => item.name),
      ["Accueil", "Indre-et-Loire (37)", "Douche Senior Tours"],
    );
    assert.deepEqual(faq.mainEntity, [
      {
        "@type": "Question",
        name: "Intervenez-vous à Tours ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. Source : service-public.gouv.fr",
        },
      },
    ]);
  });
});

describe("validateSlugUnusedBy", () => {
  const validate = validateSlugUnusedBy("pages", "Adresse déjà prise");
  const optionsWith = (totalDocs: number, context = {}) => {
    const count = mock.fn(async () => ({ totalDocs }));
    const options = {
      event: "submit",
      req: { context, payload: { count } },
    } as unknown as Parameters<typeof validate>[1];

    return { count, options };
  };

  it("refuses an address already used by the other collection", async () => {
    const { count, options } = optionsWith(1);

    assert.equal(
      await validate("douche-senior-tours", options),
      "Adresse déjà prise",
    );
    assert.deepEqual(count.mock.calls[0]?.arguments, [
      {
        collection: "pages",
        where: { slug: { equals: "douche-senior-tours" } },
        req: options.req,
      },
    ]);
  });

  it("accepts a free address and still refuses a malformed or reserved one", async () => {
    const { count, options } = optionsWith(0);

    assert.equal(await validate("douche-senior-vendome", options), true);
    assert.notEqual(await validate("Douche Vendôme", options), true);
    assert.notEqual(await validate("admin", options), true);
    assert.equal(count.mock.callCount(), 1);
  });

  it("lets the migration write a city while its page document still exists", async () => {
    const { options } = optionsWith(1, { allowSharedSlug: true });

    assert.equal(await validate("douche-senior-tours", options), true);
  });
});
