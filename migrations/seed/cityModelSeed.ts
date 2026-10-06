export interface TemplateWording {
  path: string;
  to: string;
  onlyWith?: string;
}

export const templateWording: TemplateWording[] = [
  {
    path: "seo.description",
    to: "Installation douche sécurisée à {ville} et agglo ({communes}). Artisan certifié. Installation 1 jour.",
  },
  {
    path: "hero.intro",
    to: "Artisan certifié Handibat & Silverbat. Transformation de votre baignoire en douche plain-pied en 1 journée.",
  },
  {
    path: "featureCards.heading",
    to: "Votre artisan de confiance à {ville}",
    onlyWith: "featureCards.cards.0.text",
  },
  { path: "featureCards.cards.0.title", to: "Proximité" },
  {
    path: "featureCards.cards.0.text",
    to: "Intervention rapide sur {ville} et toute l'agglomération",
  },
  {
    path: "featureCards.cards.1.text",
    to: "Installation complète en une seule journée",
  },
  { path: "featureCards.cards.2.title", to: "Certifications" },
  {
    path: "featureCards.cards.2.text",
    to: "Handibat & Silverbat pour adaptation PMR",
  },
  {
    path: "featureCards.cards.3.text",
    to: "Accompagnement MaPrimeAdapt et autres aides",
  },
  {
    path: "zoneList.heading",
    to: "Intervention sur {ville} et toute l'agglomération",
  },
  { path: "cta.heading", to: "Vous habitez {ville} ou l'agglomération ?" },
  { path: "cta.text", to: "Demandez votre devis gratuit. Réponse sous 24h." },
];

export const sharedSectionsSource = "douche-senior-blois";

export interface OriginalSearchTexts {
  slug: string;
  title: string;
  description: string;
}

export const originalSearchTexts: OriginalSearchTexts[] = [
  {
    slug: "douche-senior-blois",
    title: "Douche Senior Blois | Artisan Certifié | Devis Gratuit 24h",
    description:
      "Installation douche sécurisée à Blois et agglo (Vineuil, La Chaussée-Saint-Victor). Artisan local certifié. Intervention en 1 jour.",
  },
  {
    slug: "douche-senior-bourges",
    title: "Douche Senior Bourges | Artisan Certifié | Devis Gratuit",
    description:
      "Installation douche sécurisée à Bourges et agglo (Saint-Doulchard, Vierzon). Artisan certifié. Installation 1 jour.",
  },
  {
    slug: "douche-senior-chateauroux",
    title: "Douche Senior Châteauroux | Artisan Certifié | Devis Gratuit",
    description:
      "Installation douche sécurisée à Châteauroux et agglo (Déols, Saint-Maur). Artisan certifié. Installation 1 jour.",
  },
  {
    slug: "douche-senior-orleans",
    title: "Douche Senior Orléans | Artisan Certifié | Devis Gratuit",
    description:
      "Installation douche sécurisée à Orléans et agglo (Olivet, Fleury-les-Aubrais). Artisan certifié. Installation 1 jour.",
  },
  {
    slug: "douche-senior-romorantin",
    title: "Douche Senior Romorantin | Artisan Local | Devis Gratuit",
    description:
      "Installation douche sécurisée à Romorantin-Lanthenay et Sologne. Artisan local certifié. Installation 1 jour.",
  },
  {
    slug: "douche-senior-tours",
    title: "Douche Senior Tours | Artisan Certifié | Devis Gratuit 24h",
    description:
      "Installation douche sécurisée à Tours et agglo (Joué-lès-Tours, Saint-Cyr). Artisan local certifié. Intervention en 1 jour.",
  },
];
