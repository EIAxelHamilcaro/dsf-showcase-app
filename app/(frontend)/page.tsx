import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { AboutSection } from "../_components/aboutSection";
import { ContactSection } from "../_components/contactSection";
import { Footer } from "../_components/footer";
import { GallerySection } from "../_components/gallerySection";
import HeroSection from "../_components/heroSection";
import NavBar from "../_components/navBar";
import { RefreshRouteOnSave } from "../_components/refreshRouteOnSave";
import { ServicesSection } from "../_components/serviceSection";

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
        <GallerySection />
        <ServicesSection />
        <ContactSection />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
