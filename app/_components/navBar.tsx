import Image from "next/image";
import Link from "next/link";
import type { Config1 } from "@/payload-types";
import Logo from "../../public/logo.png";
import NavBarInteractive, { type NavItem } from "./navBarInteractive";

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

export interface NavBarProps {
  config: Config1;
}

export default function NavBar({ config }: NavBarProps) {
  const configuredServices = (config.menu_services ?? []).map((item) => ({
    label: item.label,
    href: item.href,
    description: item.description ?? undefined,
  }));

  const items: NavItem[] = [
    { label: "Accueil", href: "/#accueil" },
    { label: "À propos", href: "/#a-propos" },
    { label: "Réalisations", href: "/#realisations" },
    {
      label: "Services",
      href: "/#services",
      children:
        configuredServices.length > 0 ? configuredServices : fallbackServices,
    },
    { label: "Contact", href: "/#contact" },
    { label: "Questions", href: "/#faq" },
  ];

  return (
    <header className="site-header flex min-h-(--header-height) flex-wrap items-center justify-between gap-x-grout">
      <Link aria-label="Douche Senior France, accueil" href="/">
        <Image
          alt=""
          className="h-8 w-auto md:h-12"
          fetchPriority="low"
          loading="eager"
          sizes="144px"
          src={Logo}
        />
      </Link>

      <NavBarInteractive items={items} phone={config.phone ?? ""} />
    </header>
  );
}
