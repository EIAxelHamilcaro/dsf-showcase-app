import type { AcceptedAddition } from "./parityAdditions";
import type { TextCorrection } from "./parityCorrections";

const sharedSections =
  "Nos prestations à {ville} Remplacement baignoire → douche Dépose complète de votre ancienne baignoire Installation receveur extra-plat antidérapant Parois, barres d'appui, siège si besoin Robinetterie thermostatique sécurisée En savoir plus → Douche PMR sur-mesure Accès plain-pied sans ressaut Dimensions adaptées fauteuil roulant Équipements certifiés normes PMR Éligible aides financières maximales En savoir plus → Aides financières disponibles à {ville} Ne payez pas le prix fort ! Plusieurs aides existent pour financer votre douche sécurisée : MaPrimeAdapt Aide de l'État pour l'adaptation du logement. Prise en charge importante selon vos revenus. Crédit d'impôt (supprimé depuis le 1er janvier 2026) 25% de crédit d'impôt sur les équipements d'accessibilité. Supprimé pour les dépenses payées depuis le 1er janvier 2026 (source : service-public.gouv.fr) Tout savoir sur les aides →";

const citiesGainingSharedSections: [string, string][] = [
  ["douche-senior-bourges", "Bourges"],
  ["douche-senior-chateauroux", "Châteauroux"],
  ["douche-senior-orleans", "Orléans"],
  ["douche-senior-romorantin", "Romorantin"],
  ["douche-senior-tours", "Tours"],
];

export const citySectionAdditions: Record<string, AcceptedAddition[]> =
  Object.fromEntries(
    citiesGainingSharedSections.map(([slug, ville]) => [
      slug,
      [
        {
          before: `Comment se passe une installation à ${ville} depuis Selles-sur-Cher`,
          text: sharedSections.replaceAll("{ville}", ville),
        },
      ],
    ]),
  );

export const cityWordingCorrections: TextCorrection[] = [
  {
    ref: "V1",
    page: "douche-senior-blois",
    from: "Artisan local certifié Handibat & Silverbat. Transformation de votre baignoire en douche plain-pied en 1 journée.",
    to: "Artisan certifié Handibat & Silverbat. Transformation de votre baignoire en douche plain-pied en 1 journée.",
  },
  {
    ref: "V2",
    page: "douche-senior-blois",
    from: "Pourquoi nous faire confiance à Blois ? Artisan local Basé à Selles-sur-Cher, intervention rapide sur Blois et toute l'agglo",
    to: "Votre artisan de confiance à Blois Proximité Intervention rapide sur Blois et toute l'agglomération",
  },
  {
    ref: "V3",
    page: "douche-senior-blois",
    from: "Installation 1 jour Le matin baignoire, le soir douche sécurisée utilisable",
    to: "1 journée Installation complète en une seule journée",
  },
  {
    ref: "V4",
    page: "douche-senior-blois",
    from: "Certifié Handibat Label officiel pour l'adaptation PMR et seniors",
    to: "Certifications Handibat & Silverbat pour adaptation PMR",
  },
  {
    ref: "V5",
    page: "douche-senior-blois",
    from: "Aides financières On vous accompagne pour MaPrimeAdapt et autres aides",
    to: "Aides Accompagnement MaPrimeAdapt et autres aides",
  },
  {
    ref: "V6",
    page: "douche-senior-blois",
    from: "Nous intervenons dans tous les quartiers de Blois et communes environnantes :",
    to: "",
  },
  {
    ref: "V7",
    page: "douche-senior-blois",
    from: "Vous habitez Blois ou l'agglomération ? Demandez votre devis gratuit maintenant. Visite à domicile et réponse sous 24h. Demander un devis gratuit 02 54 97 53 23",
    to: "Vous habitez Blois ou l'agglomération ? Demandez votre devis gratuit. Réponse sous 24h. Devis gratuit Appeler",
  },
  {
    ref: "V8",
    page: "douche-senior-bourges",
    from: "Artisan certifié Handibat & Silverbat. Transformation baignoire en douche sécurisée en 1 journée.",
    to: "Artisan certifié Handibat & Silverbat. Transformation de votre baignoire en douche plain-pied en 1 journée.",
  },
  {
    ref: "V9",
    page: "douche-senior-bourges",
    from: "Local Intervention Bourges et environs",
    to: "Votre artisan de confiance à Bourges Proximité Intervention rapide sur Bourges et toute l'agglomération",
  },
  {
    ref: "V10",
    page: "douche-senior-bourges",
    from: "Rapide Installation en 1 journée",
    to: "1 journée Installation complète en une seule journée",
  },
  {
    ref: "V11",
    page: "douche-senior-bourges",
    from: "Certifié Handibat & Silverbat",
    to: "Certifications Handibat & Silverbat pour adaptation PMR",
  },
  {
    ref: "V12",
    page: "douche-senior-bourges",
    from: "Aides MaPrimeAdapt",
    to: "Aides Accompagnement MaPrimeAdapt et autres aides",
  },
  {
    ref: "V13",
    page: "douche-senior-bourges",
    from: "Zones d'intervention à Bourges",
    to: "Intervention sur Bourges et toute l'agglomération",
  },
  {
    ref: "V14",
    page: "douche-senior-bourges",
    from: "Vous habitez Bourges ? Devis gratuit sous 24h Devis gratuit Appeler",
    to: "Vous habitez Bourges ou l'agglomération ? Demandez votre devis gratuit. Réponse sous 24h. Devis gratuit Appeler",
  },
  {
    ref: "V15",
    page: "douche-senior-chateauroux",
    from: "Artisan certifié pour la transformation de votre salle de bain en douche plain-pied sécurisée.",
    to: "Artisan certifié Handibat & Silverbat. Transformation de votre baignoire en douche plain-pied en 1 journée.",
  },
  {
    ref: "V16",
    page: "douche-senior-chateauroux",
    from: "Proximité Intervention sur Châteauroux et environs",
    to: "Votre artisan de confiance à Châteauroux Proximité Intervention rapide sur Châteauroux et toute l'agglomération",
  },
  {
    ref: "V17",
    page: "douche-senior-chateauroux",
    from: "1 jour Installation rapide en 1 journée",
    to: "1 journée Installation complète en une seule journée",
  },
  {
    ref: "V18",
    page: "douche-senior-chateauroux",
    from: "Certifié Handibat & Silverbat",
    to: "Certifications Handibat & Silverbat pour adaptation PMR",
  },
  {
    ref: "V19",
    page: "douche-senior-chateauroux",
    from: "Aides MaPrimeAdapt disponible",
    to: "Aides Accompagnement MaPrimeAdapt et autres aides",
  },
  {
    ref: "V20",
    page: "douche-senior-chateauroux",
    from: "Zones d'intervention à Châteauroux",
    to: "Intervention sur Châteauroux et toute l'agglomération",
  },
  {
    ref: "V21",
    page: "douche-senior-chateauroux",
    from: "Habitant de Châteauroux ? Devis gratuit sous 24h Demander un devis 02 54 97 53 23",
    to: "Vous habitez Châteauroux ou l'agglomération ? Demandez votre devis gratuit. Réponse sous 24h. Devis gratuit Appeler",
  },
  {
    ref: "V22",
    page: "douche-senior-orleans",
    from: "Artisan certifié Handibat & Silverbat. Transformation baignoire en douche plain-pied en 1 journée.",
    to: "Artisan certifié Handibat & Silverbat. Transformation de votre baignoire en douche plain-pied en 1 journée.",
  },
  {
    ref: "V23",
    page: "douche-senior-orleans",
    from: "Artisan local Intervention rapide sur Orléans et agglo",
    to: "Votre artisan de confiance à Orléans Proximité Intervention rapide sur Orléans et toute l'agglomération",
  },
  {
    ref: "V24",
    page: "douche-senior-orleans",
    from: "1 journée Installation complète en une journée",
    to: "1 journée Installation complète en une seule journée",
  },
  {
    ref: "V25",
    page: "douche-senior-orleans",
    from: "Certifié Handibat & Silverbat PMR",
    to: "Certifications Handibat & Silverbat pour adaptation PMR",
  },
  {
    ref: "V26",
    page: "douche-senior-orleans",
    from: "Aides MaPrimeAdapt et autres",
    to: "Aides Accompagnement MaPrimeAdapt et autres aides",
  },
  {
    ref: "V27",
    page: "douche-senior-orleans",
    from: "Zones d'intervention à Orléans",
    to: "Intervention sur Orléans et toute l'agglomération",
  },
  {
    ref: "V28",
    page: "douche-senior-orleans",
    from: "Vous habitez Orléans ? Demandez votre devis gratuit. Réponse sous 24h. Devis gratuit Appeler",
    to: "Vous habitez Orléans ou l'agglomération ? Demandez votre devis gratuit. Réponse sous 24h. Devis gratuit Appeler",
  },
  {
    ref: "V29",
    page: "douche-senior-romorantin",
    from: "Romorantin et Sologne - Loir-et-Cher (41)",
    to: "Romorantin et agglomération - Loir-et-Cher (41)",
  },
  {
    ref: "V30",
    page: "douche-senior-romorantin",
    from: "Artisan local basé en Sologne. Transformation de votre baignoire en douche sécurisée en 1 journée.",
    to: "Artisan certifié Handibat & Silverbat. Transformation de votre baignoire en douche plain-pied en 1 journée.",
  },
  {
    ref: "V31",
    page: "douche-senior-romorantin",
    from: "Très local Basé en Sologne, à proximité",
    to: "Votre artisan de confiance à Romorantin Proximité Intervention rapide sur Romorantin et toute l'agglomération",
  },
  {
    ref: "V32",
    page: "douche-senior-romorantin",
    from: "1 journée Installation ultra-rapide",
    to: "1 journée Installation complète en une seule journée",
  },
  {
    ref: "V33",
    page: "douche-senior-romorantin",
    from: "Certifié Handibat & Silverbat",
    to: "Certifications Handibat & Silverbat pour adaptation PMR",
  },
  {
    ref: "V34",
    page: "douche-senior-romorantin",
    from: "Aides MaPrimeAdapt",
    to: "Aides Accompagnement MaPrimeAdapt et autres aides",
  },
  {
    ref: "V35",
    page: "douche-senior-romorantin",
    from: "Zones d'intervention en Sologne",
    to: "Intervention sur Romorantin et toute l'agglomération",
  },
  {
    ref: "V36",
    page: "douche-senior-romorantin",
    from: "Vous habitez Romorantin ou la Sologne ? Devis gratuit sous 24h Devis gratuit Appeler",
    to: "Vous habitez Romorantin ou l'agglomération ? Demandez votre devis gratuit. Réponse sous 24h. Devis gratuit Appeler",
  },
];
