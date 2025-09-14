import { AboutSection } from "./_components/aboutSection";
import { ContactSection } from "./_components/contactSection";
import { Footer } from "./_components/footer";
import { GallerySection } from "./_components/gallerySection";
import HeroSection from "./_components/heroSection";
import NavBar from "./_components/navBar";
import { ServicesSection } from "./_components/serviceSection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
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
