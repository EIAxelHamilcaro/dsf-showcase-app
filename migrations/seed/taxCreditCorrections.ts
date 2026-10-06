export interface PageFieldCorrection {
  ref: string;
  slug: string;
  field: string;
  from: string;
  to: string;
}

export interface PageDetailRemoval {
  ref: string;
  slug: string;
  label: string;
  text: string;
}

export interface SeoDescriptionCorrection {
  ref: string;
  slug: string;
  from: string;
  to: string;
}

export interface HomeCorrection {
  ref: string;
  column: string;
  from: string;
  to: string;
}

export interface MenuCorrection {
  ref: string;
  href: string;
  from: string;
  to: string;
}

export const pageFieldCorrections: PageFieldCorrection[] = [
  {
    ref: "A1",
    slug: "aides-financieres",
    field: "title",
    from: "Crédit d'impôt 25%",
    to: "Crédit d'impôt 25 % (supprimé depuis le 1er janvier 2026)",
  },
  {
    ref: "A2",
    slug: "aides-financieres",
    field: "text",
    from: "Crédit d'impôt sur le revenu pour l'installation d'équipements d'accessibilité.",
    to: "Crédit d'impôt sur le revenu pour l'installation d'équipements d'accessibilité. Supprimé pour les dépenses payées depuis le 1er janvier 2026. Il ne concerne plus que les travaux réalisés et facturés avant le 31/12/2025 (source : service-public.gouv.fr, fiche F10752, vérifiée le 15/04/2026).",
  },
  {
    ref: "A3",
    slug: "aides-financieres",
    field: "text",
    from: "25% des dépenses d'équipements",
    to: "25 % des dépenses, pour les travaux facturés avant le 31/12/2025",
  },
  {
    ref: "A6",
    slug: "aides-financieres",
    field: "note",
    from: "Exemple : 10 000 € de travaux = 2 500 € de crédit d'impôt",
    to: "Pour des travaux facturés avant le 31/12/2025 : 10 000 € de travaux = 2 500 € de crédit d'impôt",
  },
  {
    ref: "A8",
    slug: "aides-financieres",
    field: "intro",
    from: "Ne payez pas le prix fort ! Plusieurs aides cumulables existent pour financer l'installation de votre douche sécurisée.",
    to: "Ne payez pas le prix fort ! Plusieurs aides existent pour financer l'installation de votre douche sécurisée.",
  },
  {
    ref: "D1",
    slug: "remplacement-baignoire-par-douche",
    field: "highlight",
    from: "Jusqu'à 5 000 € par personne",
    to: "Supprimé depuis le 1er janvier 2026",
  },
  {
    ref: "D2",
    slug: "remplacement-baignoire-par-douche",
    field: "intro",
    from: "Ne payez pas le prix fort ! Vous pouvez bénéficier de plusieurs aides cumulables :",
    to: "Ne payez pas le prix fort ! Vous pouvez bénéficier de plusieurs aides :",
  },
  {
    ref: "D3",
    slug: "douche-senior-blois",
    field: "text",
    from: "25% de crédit d'impôt sur les équipements d'accessibilité",
    to: "25% de crédit d'impôt sur les équipements d'accessibilité. Supprimé pour les dépenses payées depuis le 1er janvier 2026 (source : service-public.gouv.fr)",
  },
  {
    ref: "D4",
    slug: "amenagement-salle-bain-senior",
    field: "intro",
    from: "Un aménagement complet peut être financé par plusieurs aides cumulables : MaPrimeAdapt et crédit d'impôt.",
    to: "Un aménagement complet peut être financé par MaPrimeAdapt'. Le crédit d'impôt est supprimé depuis le 1er janvier 2026.",
  },
];

export const pageDetailRemovals: PageDetailRemoval[] = [
  {
    ref: "A5",
    slug: "aides-financieres",
    label: "Cumulable :",
    text: "Avec MaPrimeAdapt",
  },
];

export const seoDescriptionCorrections: SeoDescriptionCorrection[] = [
  {
    ref: "A7",
    slug: "aides-financieres",
    from: "Toutes les aides pour financer votre douche senior : MaPrimeAdapt et crédit d'impôt. On vous accompagne dans vos démarches.",
    to: "Les aides pour financer votre douche senior : MaPrimeAdapt'. Le crédit d'impôt est supprimé depuis le 1er janvier 2026. On vous accompagne dans vos démarches.",
  },
];

export const homeCorrections: HomeCorrection[] = [
  {
    ref: "B1",
    column: "financial_section_financial_help_1_icon_text",
    from: "25%*",
    to: "Fin 2025",
  },
  {
    ref: "B2",
    column: "financial_section_financial_help_1_title",
    from: "Crédit d'impôt",
    to: "Crédit d'impôt (supprimé depuis le 1er janvier 2026)",
  },
  {
    ref: "B3",
    column: "financial_section_financial_help_1_description",
    from: "*sous conditions (service publics) plafonnés",
    to: "Supprimé pour les dépenses payées depuis le 1er janvier 2026 (source : service-public.gouv.fr, fiche F10752)",
  },
];

export const menuCorrections: MenuCorrection[] = [
  {
    ref: "C1",
    href: "/aides-financieres",
    from: "MaPrimeAdapt et crédit d'impôt",
    to: "MaPrimeAdapt' et aides des caisses de retraite",
  },
];
