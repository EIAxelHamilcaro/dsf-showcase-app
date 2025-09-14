import Image from "next/image";
import { getPayload } from "payload";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import payloadConfig from "@/payload.config";
import Logo from "../../public/logo.png";
import NavBarInteractive from "./navBarInteractive";

export default async function NavBar() {
  const payload = await getPayload({ config: payloadConfig });
  const global = await payload.findGlobal({
    slug: "parameters",
  });

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
      href: "#",
    },
    {
      label: "Services",
      href: "#",
    },
    {
      label: "Contact",
      href: "#",
    },
  ];

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full px-5 py-3">
      <NavigationMenu className="max-w-full flex justify-between flex-col lg:flex-row">
        <Image
          alt="Logo de Douche Senior France"
          className="hidden lg:block"
          src={Logo}
          width={150}
        />

        <NavBarInteractive global={global} items={items} />
      </NavigationMenu>
    </header>
  );
}
