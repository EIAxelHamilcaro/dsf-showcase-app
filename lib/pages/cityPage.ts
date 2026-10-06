import type { Page } from "../../payload-types";
import { assembleCityPage, type CityPageInput } from "./cityLayout";

export { composeCityPage } from "../../migrations/seed/cityPageAsFirstConverted";

const slugOrder = new Intl.Collator("fr", { ignorePunctuation: true });

export function buildCityPage(input: CityPageInput): Page | undefined {
  const testimonials = (input.city.extraSections ?? []).filter(
    (section) => section.blockType === "testimonial",
  );

  return assembleCityPage(input, testimonials);
}

export function mergeSitePages(pages: Page[], cityPages: Page[]): Page[] {
  const pageSlugs = new Set(pages.map((page) => page.slug));
  const unshadowed = cityPages.filter((city) => !pageSlugs.has(city.slug));

  return [...pages, ...unshadowed].sort((first, second) =>
    slugOrder.compare(first.slug, second.slug),
  );
}
