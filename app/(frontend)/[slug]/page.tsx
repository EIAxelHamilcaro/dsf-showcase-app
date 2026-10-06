import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/app/_components/blocks/blockRenderer";
import { JsonLdScript } from "@/app/_components/jsonLdScript";
import { PageBreadcrumb } from "@/app/_components/pageBreadcrumb";
import { RefreshRouteOnSave } from "@/app/_components/refreshRouteOnSave";
import { RelatedLinks } from "@/app/_components/relatedLinks";
import { getAllPages, getPageBySlug } from "@/lib/pages/getPage";
import { getSiteConfig } from "@/lib/pages/getSiteConfig";
import {
  createMentionLinker,
  getMentionTargets,
} from "@/lib/pages/mentionLinks";
import { getBreadcrumb, getRelatedLinks } from "@/lib/pages/pageLinks";
import { buildMetadata, seoImageUrl } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/jsonLd";

interface CmsPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";
export const revalidate = 43200;

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: CmsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: `/${page.slug}`,
    imageUrl: seoImageUrl(page),
  });
}

export default async function CmsPage({ params }: CmsPageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const [config, all] = await Promise.all([getSiteConfig(), getAllPages()]);
  const trail = getBreadcrumb(page, all);
  const mentions = createMentionLinker(getMentionTargets(all), `/${page.slug}`);
  return (
    <>
      <RefreshRouteOnSave />
      <JsonLdScript graph={buildPageGraph({ page, all, config })} />
      <PageBreadcrumb trail={trail} />
      <BlockRenderer
        blocks={page.layout}
        mentions={mentions}
        phone={config.phone ?? ""}
        updatedAt={page.updatedAt}
      />
      <RelatedLinks links={getRelatedLinks(page, all)} />
    </>
  );
}
