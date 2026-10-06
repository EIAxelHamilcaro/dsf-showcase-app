import type { City, CityTemplate, Page } from "../../payload-types";
import { fillAllPlaceholders } from "./placeholders";

export interface CityPageInput {
  template: CityTemplate;
  city: City;
  department: Page | undefined;
}

const slugOrder = new Intl.Collator("fr", { ignorePunctuation: true });

const filled = (value: string | null | undefined): string | undefined =>
  value?.trim() ? value : undefined;

const latest = (first: string, second: string | null | undefined): string =>
  second && second > first ? second : first;

export function composeCityPage({
  template,
  city,
  department,
}: CityPageInput): Page | undefined {
  if (!(department && template.hero?.titleBefore)) {
    return undefined;
  }

  const { navLabel, seo, hero, featureCards, zoneList, cta, ...sections } =
    fillAllPlaceholders(template, {
      ville: city.name,
      departement: department.areaName ?? "",
      code: department.departmentCode ?? "",
      communes: city.zones
        .slice(1, 3)
        .map((zone) => zone.name)
        .join(", "),
    });
  const { serviceCards, aidCards } = sections;

  return {
    id: city.id,
    slug: city.slug,
    navLabel,
    pageType: "city",
    parent: department.id,
    areaName: filled(city.areaName) ?? city.name,
    seo: {
      title: filled(city.seo?.title) ?? seo.title,
      description: filled(city.seo?.description) ?? seo.description,
    },
    layout: [
      { ...hero, blockType: "hero" },
      { ...featureCards, blockType: "featureCards" },
      { ...zoneList, items: city.zones, blockType: "zoneList" },
      ...(city.extraSections ?? []),
      ...(serviceCards?.heading && serviceCards.cards?.length
        ? [
            {
              ...serviceCards,
              background: serviceCards.background ?? "default",
              columns: serviceCards.columns ?? "2",
              heading: serviceCards.heading,
              cards: serviceCards.cards,
              blockType: "serviceCards" as const,
            },
          ]
        : []),
      ...(aidCards?.heading
        ? [
            {
              ...aidCards,
              background: aidCards.background ?? "default",
              heading: aidCards.heading,
              blockType: "aidCards" as const,
            },
          ]
        : []),
      { ...city.localSection, blockType: "textSection" },
      { ...city.faq, blockType: "faq" },
      { ...cta, blockType: "cta" },
    ],
    updatedAt: latest(city.updatedAt, template.updatedAt),
    createdAt: city.createdAt,
  };
}

export function mergeSitePages(pages: Page[], cityPages: Page[]): Page[] {
  const pageSlugs = new Set(pages.map((page) => page.slug));
  const unshadowed = cityPages.filter((city) => !pageSlugs.has(city.slug));

  return [...pages, ...unshadowed].sort((first, second) =>
    slugOrder.compare(first.slug, second.slug),
  );
}
