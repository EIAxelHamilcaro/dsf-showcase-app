import type { Metadata } from "next";
import { getAllPages } from "@/lib/pages/getPage";
import { getSiteConfig } from "@/lib/pages/getSiteConfig";
import { getCityLinks, getDepartmentLinks } from "@/lib/pages/pageLinks";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { getHomeSeo } from "@/lib/seo/homeSeo";
import { buildHomeGraph } from "@/lib/seo/jsonLd";
import { AboutSection } from "../_components/aboutSection";
import { ContactSection } from "../_components/contactSection";
import { FAQSection } from "../_components/faqSection";
import { GallerySection } from "../_components/gallerySection";
import HeroSection from "../_components/heroSection";
import { JsonLdScript } from "../_components/jsonLdScript";
import { RefreshRouteOnSave } from "../_components/refreshRouteOnSave";
import { RegionalNavSection } from "../_components/regionalNav";
import { ServicesSection } from "../_components/serviceSection";

export const dynamic = "force-static";
export const revalidate = 43200;

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getHomeSeo(await getSiteConfig());

  return buildMetadata({ title, description, path: "/" });
}

export default async function Home() {
  const [config, all] = await Promise.all([getSiteConfig(), getAllPages()]);

  return (
    <>
      <RefreshRouteOnSave />
      <JsonLdScript graph={buildHomeGraph({ all, config })} />
      <HeroSection config={config} />
      <AboutSection config={config} />
      <GallerySection config={config} />
      <ServicesSection config={config} />
      <RegionalNavSection
        cities={getCityLinks(all)}
        departments={getDepartmentLinks(all)}
      />
      <ContactSection config={config} />
      <FAQSection config={config} />
    </>
  );
}
