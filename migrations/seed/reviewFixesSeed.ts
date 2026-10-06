import type { PageFieldCorrection } from "./taxCreditCorrections";

export const pageTextFixes: PageFieldCorrection[] = [
  {
    ref: "E1",
    slug: "loir-et-cher",
    field: "description",
    from: "Accompagnement complet pour obtenir les aides financières : jusqu'à 100% de prise en charge possible.",
    to: "Accompagnement complet pour obtenir les aides financières : prise en charge importante possible.",
  },
  {
    ref: "E2",
    slug: "remplacement-baignoire-par-douche",
    field: "title",
    from: "Crédit d'impôt 25%",
    to: "Crédit d'impôt 25 % (supprimé depuis le 1er janvier 2026)",
  },
  {
    ref: "E3",
    slug: "douche-senior-blois",
    field: "title",
    from: "Crédit d'impôt",
    to: "Crédit d'impôt (supprimé depuis le 1er janvier 2026)",
  },
  {
    ref: "E4",
    slug: "aides-financieres",
    field: "note",
    from: "Pour des travaux facturés avant le 31/12/2025 : 10 000 € de travaux = 2 500 € de crédit d'impôt",
    to: "Supprimé pour les dépenses payées depuis le 1er janvier 2026 (source : service-public.gouv.fr, fiche F10752, vérifiée le 15/04/2026).",
  },
];

export const faqFixes: PageFieldCorrection[] = [
  {
    ref: "F1",
    slug: "aides-financieres",
    field: "answer",
    from: "Un propriétaire occupant de 70 ans ou plus peut en bénéficier sans condition de perte d'autonomie, si ses revenus sont modestes ou très modestes. Un locataire du parc privé y a droit aussi, avec l'accord de son bailleur. Les autres cas d'éligibilité sont détaillés sur la fiche officielle.",
    to: "Un propriétaire occupant de 70 ans ou plus peut en bénéficier sans condition de perte d'autonomie, si ses revenus sont modestes ou très modestes. Un locataire du parc privé peut demander MaPrimeAdapt', à condition d'avoir l'accord de son bailleur. Les autres cas d'éligibilité sont détaillés sur la fiche officielle.",
  },
  {
    ref: "F2",
    slug: "indre-et-loire",
    field: "question",
    from: "Que garantissent les labels Handibat et Silverbat ?",
    to: "Que garantit le label Handibat ?",
  },
  {
    ref: "F3",
    slug: "aides-financieres",
    field: "answer",
    from: "Oui, si les travaux ont été réalisés et facturés avant le 31 décembre 2025. Le crédit d'impôt est alors de 25 % des dépenses, dans une limite sur 5 ans de 5 000 € pour une personne seule et de 10 000 € pour un couple.",
    to: "Oui, si les travaux ont été réalisés et facturés avant le 31 décembre 2025. Le crédit d'impôt est alors de 25 % des dépenses, dans une limite sur 5 ans de 5 000 € pour une personne seule et de 10 000 € pour un couple. Il est supprimé pour les dépenses payées à partir du 1er janvier 2026.",
  },
];

export const legalFixes: PageFieldCorrection[] = [
  {
    ref: "L1",
    slug: "mentions-legales",
    field: "text",
    from: [
      "DOUCHE SENIOR FRANCE",
      "Société par actions simplifiée (SAS) au capital de 4 000 €",
      "Siège social : 147 rue de Romorantin, 41130 Selles-sur-Cher, France",
      "SIREN : 800 339 673",
      "SIRET du siège : 800 339 673 00017",
      "Téléphone : 02 54 97 53 23",
      "Email : douche.senior.france@gmail.com",
    ].join("\n"),
    to: [
      "DOUCHE SENIOR FRANCE",
      "Société par actions simplifiée (SAS)",
      "Siège social : 147 rue de Romorantin, 41130 Selles-sur-Cher, France",
      "SIREN : 800 339 673",
      "SIRET du siège : 800 339 673 00017",
      "Téléphone : 02 54 97 53 23",
      "Email : douche.senior.france@gmail.com",
    ].join("\n"),
  },
  {
    ref: "L2",
    slug: "mentions-legales",
    field: "heading",
    from: "Activité, assurance et qualifications",
    to: "Activité et qualifications",
  },
  {
    ref: "L3",
    slug: "mentions-legales",
    field: "text",
    from: "Conformément à l'article L612-1 du Code de la consommation, tout consommateur peut recourir gratuitement à un médiateur de la consommation en cas de litige qui n'a pas pu être réglé directement avec l'entreprise.",
    to: "Les coordonnées du médiateur de la consommation dont relève DOUCHE SENIOR FRANCE sont communiquées sur demande au 02 54 97 53 23 et seront publiées sur cette page.",
  },
  {
    ref: "L4",
    slug: "politique-de-confidentialite",
    field: "text",
    from: [
      "DOUCHE SENIOR FRANCE, SAS au capital de 4 000 €, SIREN 800 339 673",
      "147 rue de Romorantin, 41130 Selles-sur-Cher",
      "Téléphone : 02 54 97 53 23",
      "Contact pour vos données : douche.senior.france@gmail.com",
    ].join("\n"),
    to: [
      "DOUCHE SENIOR FRANCE, SAS, SIREN 800 339 673",
      "147 rue de Romorantin, 41130 Selles-sur-Cher",
      "Téléphone : 02 54 97 53 23",
      "Contact pour vos données : douche.senior.france@gmail.com",
    ].join("\n"),
  },
  {
    ref: "L5",
    slug: "politique-de-confidentialite",
    field: "text",
    from: "Union européenne (région Europe centrale)",
    to: "Communiquée sur demande",
  },
  {
    ref: "L6",
    slug: "politique-de-confidentialite",
    field: "text",
    from: "La base de données des demandes de devis est hébergée dans l'Union européenne.",
    to: "L'hébergeur du site est nommé dans les mentions légales, les autres prestataires dans le tableau du point 5.",
  },
  {
    ref: "L7",
    slug: "politique-de-confidentialite",
    field: "text",
    from: "À la fin de ces durées, les données sont supprimées ou rendues anonymes.",
    to: "Une demande de devis sans suite est conservée 3 ans au plus après le dernier contact, puis supprimée.",
  },
  {
    ref: "L8",
    slug: "politique-de-confidentialite",
    field: "text",
    from: "Ces outils ne servent ni à vous identifier ni à vous suivre d'un site à l'autre. Ils ne demandent donc pas de bandeau de consentement.",
    to: "Le site ne dépose aucun cookie publicitaire ni de mesure d'audience, seulement ce qui est strictement nécessaire à la sécurité (Cloudflare Turnstile sur les formulaires).",
  },
];

export const reviewFixes: PageFieldCorrection[] = [
  ...pageTextFixes,
  ...faqFixes,
  ...legalFixes,
];
