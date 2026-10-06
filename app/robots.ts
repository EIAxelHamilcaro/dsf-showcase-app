import type { MetadataRoute } from "next";
import { aiCrawlers, privatePaths, siteUrl } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  const disallow = [...privatePaths];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: [...aiCrawlers], allow: "/", disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
