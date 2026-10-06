import Image from "next/image";
import type { Config1 } from "@/payload-types";
import Logo from "../../public/logo.png";
import NavBarInteractive from "./navBarInteractive";

const fallbackServices = [
  {
    label: "Remplacement Baignoire par Douche",
    href: "/remplacement-baignoire-par-douche",
    description: "Transformation de votre baignoire en douche sécurisée",
  },
  {
    label: "Installation Douche PMR",
    href: "/installation-douche-pmr",
    description: "Douche aux normes pour personnes à mobilité réduite",
  },
  {
    label: "Aménagement Salle de Bain",
    href: "/amenagement-salle-bain-senior",
    description: "Adaptation complète de votre salle de bain",
  },
  {
    label: "Aides Financières",
    href: "/aides-financieres",
    description: "MaPrimeAdapt' et aides des caisses de retraite",
  },
];

export default function NavBar({ config }: { config: Config1 }) {
  const configuredServices = (config.menu_services ?? []).map((item) => ({
    label: item.label,
    href: item.href,
    description: item.description ?? undefined,
  }));

  const items = [
    {
      label: "Accueil",
      href: "/#accueil",
    },
    {
      label: "A propos",
      href: "/#a-propos",
    },
    {
      label: "Réalisation",
      href: "/#realisations",
    },
    {
      label: "Services",
      href: "/#services",
      children:
        configuredServices.length > 0 ? configuredServices : fallbackServices,
    },
    {
      label: "Contact",
      href: "/#contact",
    },
    {
      label: "Questions",
      href: "/#faq",
    },
  ];

  return (
    <header className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full px-4 sm:px-6 py-3">
      <div className="w-full flex items-center justify-between">
        <Image
          alt="Logo de Douche Senior France"
          className="hidden lg:block shrink-0"
          src={Logo}
          width={185}
        />

        <NavBarInteractive config={config} items={items} />
      </div>
    </header>
  );
}
