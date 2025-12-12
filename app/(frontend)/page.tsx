import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { AboutSection } from "../_components/aboutSection";
import { ContactSection } from "../_components/contactSection";
import { FAQSection } from "../_components/faqSection";
import { Footer } from "../_components/footer";
import { GallerySection } from "../_components/gallerySection";
import HeroSection from "../_components/heroSection";
import NavBar from "../_components/navBar";
import { RefreshRouteOnSave } from "../_components/refreshRouteOnSave";
import { ServicesSection } from "../_components/serviceSection";

export const dynamic = "force-static";
export const revalidate = 43200;

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
      <NavBar config={config} />
      <main>
        <HeroSection config={config} />
        <AboutSection config={config} />
        <GallerySection config={config} />
        <ServicesSection config={config} />
        <ContactSection config={config} />
        <FAQSection config={config} />
      </main>
      <Footer config={config} />
    </>
  );
}
