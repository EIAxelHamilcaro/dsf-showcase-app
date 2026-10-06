import type { Metadata } from "next";
import { getPayload } from "payload";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { homeSeo } from "@/lib/site";
import payloadConfig from "@/payload.config";
import { AboutSection } from "../_components/aboutSection";
import { ContactSection } from "../_components/contactSection";
import { FAQSection } from "../_components/faqSection";
import { GallerySection } from "../_components/gallerySection";
import HeroSection from "../_components/heroSection";
import { RefreshRouteOnSave } from "../_components/refreshRouteOnSave";
import { RegionalNavSection } from "../_components/regionalNav";
import { ServicesSection } from "../_components/serviceSection";

export const dynamic = "force-static";
export const revalidate = 43200;

export const metadata: Metadata = buildMetadata({
  title: homeSeo.title,
  description: homeSeo.description,
  path: "/",
});

export default async function Home() {
  const payload = await getPayload({ config: payloadConfig });
  const config = await payload.findByID({
    collection: "config",
    id: 1,
    depth: 1,
  });

  return (
    <>
      <RefreshRouteOnSave />
      <HeroSection config={config} />
      <AboutSection config={config} />
      <GallerySection config={config} />
      <ServicesSection config={config} />
      <RegionalNavSection />
      <ContactSection config={config} />
      <FAQSection config={config} />
    </>
  );
}
