import type { CityTemplate } from "../../payload-types";

export const cityTemplateSeed: Omit<
  CityTemplate,
  "id" | "updatedAt" | "createdAt"
> = {
  navLabel: "Douche Senior {ville}",
  seo: {
    title: "Douche Senior {ville} | Artisan Certifié | Devis Gratuit",
    description:
      "Installation douche sécurisée à {ville} et agglo. Artisan certifié. Installation 1 jour.",
  },
  hero: {
    location: "{ville} et agglomération - {departement} ({code})",
    titleBefore: "Installation",
    titleHighlight: "Douche Sécurisée",
    titleAfter: "pour Seniors à {ville}",
    intro:
      "Artisan certifié Handibat & Silverbat. Transformation baignoire en douche plain-pied en 1 journée.",
    ctaLabel: "Devis gratuit 24h",
  },
  featureCards: {
    background: "default",
    layout: "centered",
    columns: "4",
    spacing: "compact",
    cards: [
      {
        icon: "mapPin",
        title: "Artisan local",
        text: "Intervention rapide sur {ville} et agglo",
      },
      {
        icon: "clock",
        title: "1 journée",
        text: "Installation complète en une journée",
      },
      { icon: "shield", title: "Certifié", text: "Handibat & Silverbat" },
      { icon: "euro", title: "Aides", text: "MaPrimeAdapt" },
    ],
  },
  zoneList: {
    background: "muted",
    heading: "Zones d'intervention à {ville}",
    showMapIcon: false,
  },
  cta: {
    heading: "Vous habitez {ville} ?",
    text: "Devis gratuit sous 24h",
    ctaLabel: "Devis gratuit",
    phoneLabel: "Appeler",
  },
};

export interface CitySeed {
  slug: string;
  name: string;
  keepsLocalWording: boolean;
}

export const citySeed: CitySeed[] = [
  { slug: "douche-senior-blois", name: "Blois", keepsLocalWording: false },
  { slug: "douche-senior-bourges", name: "Bourges", keepsLocalWording: false },
  {
    slug: "douche-senior-chateauroux",
    name: "Châteauroux",
    keepsLocalWording: false,
  },
  { slug: "douche-senior-orleans", name: "Orléans", keepsLocalWording: false },
  {
    slug: "douche-senior-romorantin",
    name: "Romorantin",
    keepsLocalWording: true,
  },
  { slug: "douche-senior-tours", name: "Tours", keepsLocalWording: false },
];
