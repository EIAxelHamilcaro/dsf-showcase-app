import type { PageFieldCorrection } from "./taxCreditCorrections";

export const homeSeoSeed = {
  title: "Douche Senior Centre-Val de Loire | Installation en 1 Jour",
  description:
    "Douche sécurisée en 1 jour en Centre-Val de Loire. Artisan certifié Handibat. Aide MaPrimeAdapt' de 50 % ou 70 %. Devis gratuit au 02 54 97 53 23.",
};

export const informationPageSlugs: string[] = ["aides-financieres"];

export const aidConditionFixes: PageFieldCorrection[] = [
  {
    ref: "H1",
    slug: "aides-financieres",
    field: "text",
    from: "Propriétaire occupant ou locataire, + 60 ans ou situation handicap",
    to: "Propriétaire occupant de 70 ans ou plus, sans condition de perte d'autonomie (autres cas sur la fiche officielle)",
  },
];
