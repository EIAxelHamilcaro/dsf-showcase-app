import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/pages/getPage";
import { getSiteConfig } from "@/lib/pages/getSiteConfig";
import { siteUrl } from "@/lib/site";

export const revalidate = 43200;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, config] = await Promise.all([getAllPages(), getSiteConfig()]);

  const home = {
    url: siteUrl,
    lastModified: new Date(config.updatedAt),
  };

  const cmsPages = pages.map((page) => ({
    url: `${siteUrl}/${page.slug}`,
    lastModified: new Date(page.updatedAt),
  }));

  return [home, ...cmsPages];
}
