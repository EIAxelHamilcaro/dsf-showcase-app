import Image from "next/image";
import Link from "next/link";
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
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-2 px-gutter py-2">
        <Link className="flex min-h-11 shrink-0 items-center" href="/">
          <Image
            alt="Logo de Douche Senior France"
            className="h-8 w-auto min-[400px]:h-10 sm:h-12"
            fetchPriority="low"
            loading="eager"
            sizes="160px"
            src={Logo}
          />
        </Link>

        <NavBarInteractive config={config} items={items} />
      </div>
    </header>
  );
}
