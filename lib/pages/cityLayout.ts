import type { City, CityTemplate, Page } from "../../payload-types";
import { fillAllPlaceholders } from "./placeholders";

export interface CityPageInput {
  template: CityTemplate;
  city: City;
  department: Page | undefined;
}

export type CityOwnSection = NonNullable<City["extraSections"]>[number];

const filled = (value: string | null | undefined): string | undefined =>
  value?.trim() ? value : undefined;

const latest = (first: string, second: string | null | undefined): string =>
  second && second > first ? second : first;

export function assembleCityPage(
  { template, city, department }: CityPageInput,
  ownSections: CityOwnSection[],
): Page | undefined {
  if (!(department && template.hero?.titleBefore)) {
    return undefined;
  }

  const { navLabel, seo, hero, featureCards, zoneList, cta, ...sections } =
    fillAllPlaceholders(template, {
      ville: city.name,
      departement: department.areaName ?? "",
      code: department.departmentCode ?? "",
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
      ...ownSections,
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
