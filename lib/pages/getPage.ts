import { getPayload } from "payload";
import { cache } from "react";
import payloadConfig from "@/payload.config";
import type { Page } from "@/payload-types";

export const getPageBySlug = cache(
  async (slug: string): Promise<Page | null> => {
    const payload = await getPayload({ config: payloadConfig });
    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });

    return docs[0] ?? null;
  },
);

export const getAllPages = cache(async (): Promise<Page[]> => {
  const payload = await getPayload({ config: payloadConfig });
  const { docs } = await payload.find({
    collection: "pages",
    limit: 0,
    pagination: false,
    depth: 0,
    sort: "slug",
  });

  return docs;
});
