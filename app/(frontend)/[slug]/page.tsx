import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/app/_components/blocks/blockRenderer";
import { RefreshRouteOnSave } from "@/app/_components/refreshRouteOnSave";
import { getAllPages, getPageBySlug } from "@/lib/pages/getPage";
import { getSiteConfig } from "@/lib/pages/getSiteConfig";

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

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function CmsPage({ params }: CmsPageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const config = await getSiteConfig();

  return (
    <>
      <RefreshRouteOnSave />
      <BlockRenderer blocks={page.layout} phone={config.phone ?? ""} />
    </>
  );
}
