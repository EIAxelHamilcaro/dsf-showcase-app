import { AboutSection } from "./_components/aboutSection";
import HeroSection from "./_components/heroSection";
import NavBar from "./_components/navBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
      <footer>footer</footer>
    </>
  );
}
