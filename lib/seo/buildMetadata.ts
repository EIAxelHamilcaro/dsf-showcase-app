import type { Metadata } from "next";
import type { Page } from "../../payload-types";
import { defaultOgImage, homeSeo, siteName } from "../site";

export interface MetadataInput {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
}

export function seoImageUrl(page: Page): string | undefined {
  const image = page.seo.image;

  if (typeof image !== "object" || image === null) {
    return undefined;
  }

  return image.url ?? undefined;
}

export function buildMetadata({
  title,
  description,
  path,
  imageUrl,
}: MetadataInput): Metadata {
  const pageTitle = title.trim() || homeSeo.title;
  const pageDescription = description.trim() || homeSeo.description;

  const image = imageUrl
    ? { url: imageUrl }
    : { url: defaultOgImage, width: 1200, height: 630 };

  return {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName,
      title: pageTitle,
      description: pageDescription,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image.url],
    },
  };
}
