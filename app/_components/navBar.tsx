import Image from "next/image";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import type { Config1 } from "@/payload-types";
import Logo from "../../public/logo.png";
import NavBarInteractive from "./navBarInteractive";

export default function NavBar({ config }: { config: Config1 }) {
  const items = [
    {
      label: "Accueil",
      href: "#accueil",
    },
    {
      label: "A propos",
      href: "#a-propos",
    },
    {
      label: "Réalisation",
      href: "#realisations",
    },
    {
      label: "Services",
      href: "#services",
    },
    {
      label: "Contact",
      href: "#contact",
    },
    {
      label: "Questions",
      href: "#faq",
    },
  ];

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full px-5 py-3">
      <NavigationMenu className="max-w-full flex justify-between flex-col lg:flex-row">
        <Image
          alt="Logo de Douche Senior France"
          className="hidden lg:block"
          src={Logo}
          width={185}
        />

        <NavBarInteractive config={config} items={items} />
      </NavigationMenu>
    </header>
  );
}
