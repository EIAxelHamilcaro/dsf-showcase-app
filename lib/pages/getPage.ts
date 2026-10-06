import { getPayload } from "payload";
import { cache } from "react";
import { validateSlug } from "@/lib/cms/validators";
import { buildCityPage, mergeSitePages } from "@/lib/pages/cityPage";
import payloadConfig from "@/payload.config";
import type { Page } from "@/payload-types";

export const getAllPages = cache(async (): Promise<Page[]> => {
  const payload = await getPayload({ config: payloadConfig });
  const [pages, cities, template] = await Promise.all([
    payload.find({
      collection: "pages",
      limit: 0,
      pagination: false,
      depth: 0,
      sort: "slug",
    }),
    payload.find({
      collection: "cities",
      limit: 0,
      pagination: false,
      depth: 0,
    }),
    payload.findGlobal({ slug: "cityTemplate", depth: 0 }),
  ]);

  const cityPages = cities.docs.flatMap((city) => {
    const department = pages.docs.find(
      (page) => page.id === city.department && page.pageType === "department",
    );

    return buildCityPage({ template, city, department }) ?? [];
  });

  return mergeSitePages(pages.docs, cityPages);
});

export const getPageBySlug = cache(
  async (slug: string): Promise<Page | null> => {
    if (validateSlug(slug) !== true) {
      return null;
    }

    const payload = await getPayload({ config: payloadConfig });
    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    const [page] = docs;

    if (page) {
      return page;
    }

    const all = await getAllPages();

    return (
      all.find(
        (candidate) => candidate.slug === slug && candidate.pageType === "city",
      ) ?? null
    );
  },
);
