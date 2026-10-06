import type {
  AidCardsBlock,
  CtaBlock,
  FeatureCardsBlock,
  HeroBlock,
  LinkCardsBlock,
  Page,
  ServiceCardsBlock,
  StepsBlock,
  TestimonialBlock,
  ZoneListBlock,
} from "../../payload-types";

type Fields<T> = Omit<T, "id" | "blockName" | "blockType">;
type FeatureCard = FeatureCardsBlock["cards"][number];
type ServiceCard = ServiceCardsBlock["cards"][number];

export interface PageSeed {
  slug: string;
  navLabel: string;
  pageType: Page["pageType"];
  parentSlug?: string;
  areaName?: string;
  departmentCode?: string;
  seo: { title: string; description: string };
  layout: Page["layout"];
}

const hero = (fields: Fields<HeroBlock>): HeroBlock => ({ blockType: "hero", ...fields });
const featureCards = (fields: Fields<FeatureCardsBlock>): FeatureCardsBlock => ({ blockType: "featureCards", ...fields });
const zoneList = (fields: Fields<ZoneListBlock>): ZoneListBlock => ({ blockType: "zoneList", ...fields });
const testimonial = (fields: Fields<TestimonialBlock>): TestimonialBlock => ({ blockType: "testimonial", ...fields });
const serviceCards = (fields: Fields<ServiceCardsBlock>): ServiceCardsBlock => ({ blockType: "serviceCards", ...fields });
const aidCards = (fields: Fields<AidCardsBlock>): AidCardsBlock => ({ blockType: "aidCards", ...fields });
const steps = (fields: Fields<StepsBlock>): StepsBlock => ({ blockType: "steps", ...fields });
const linkCards = (fields: Fields<LinkCardsBlock>): LinkCardsBlock => ({ blockType: "linkCards", ...fields });
const cta = (fields: Fields<CtaBlock>): CtaBlock => ({ blockType: "cta", ...fields });

const card = (icon: FeatureCard["icon"], title: string, text: string): FeatureCard => ({ icon, title, text });
const names = (items: string[]) => items.map((name) => ({ name }));

const cityHero = (location: string, after: string, intro: string) =>
  hero({
    location,
    titleBefore: "Installation",
    titleHighlight: "Douche Sécurisée",
    titleAfter: after,
    intro,
    ctaLabel: "Devis gratuit 24h",
  });

const cityFeatures = (cards: FeatureCard[], heading?: string) =>
  featureCards({
    background: "default",
    heading,
    layout: "centered",
    columns: "4",
    spacing: "compact",
    cards,
  });

const cityZones = (
  heading: string,
  items: string[],
  columns: ZoneListBlock["columns"],
  intro?: string,
) =>
  zoneList({
    background: "muted",
    heading,
    intro,
    showMapIcon: false,
    columns,
    items: names(items),
  });

const cityPage = (
  slug: string,
  navLabel: string,
  areaName: string,
  parentSlug: string,
  seo: PageSeed["seo"],
  layout: Page["layout"],
): PageSeed => ({ slug, navLabel, pageType: "city", parentSlug, areaName, seo, layout });

const bloisPage = cityPage(
  "douche-senior-blois",
  "Douche Senior Blois",
  "Blois",
  "loir-et-cher",
  {
    title: "Douche Senior Blois | Artisan Certifié | Devis Gratuit 24h",
    description:
      "Installation douche sécurisée à Blois et agglo (Vineuil, La Chaussée-Saint-Victor). Artisan local certifié. Intervention en 1 jour.",
  },
  [
    cityHero(
      "Blois et agglomération - Loir-et-Cher (41)",
      "pour Seniors à Blois",
      "Artisan local certifié Handibat & Silverbat. Transformation de votre baignoire en douche plain-pied en 1 journée.",
    ),
    cityFeatures(
      [
        card("mapPin", "Artisan local", "Basé à Selles-sur-Cher, intervention rapide sur Blois et toute l'agglo"),
        card("clock", "Installation 1 jour", "Le matin baignoire, le soir douche sécurisée utilisable"),
        card("shield", "Certifié Handibat", "Label officiel pour l'adaptation PMR et seniors"),
        card("euro", "Aides financières", "On vous accompagne pour MaPrimeAdapt et autres aides"),
      ],
      "Pourquoi nous faire confiance à Blois ?",
    ),
    cityZones(
      "Intervention sur Blois et toute l'agglomération",
      [
        "Centre-ville Blois",
        "Vineuil",
        "La Chaussée-Saint-Victor",
        "Saint-Gervais-la-Forêt",
        "Villebarou",
        "Saint-Denis-sur-Loire",
        "Les Grouets",
        "Vienne",
        "La Croix Chevalier",
        "Bas-Rivière",
      ],
      "5",
      "Nous intervenons dans tous les quartiers de Blois et communes environnantes :",
    ),
    testimonial({
      background: "default",
      quote:
        "Installation rapide et soignée. L'équipe est arrivée à 8h, tout était terminé à 17h. Ma mère peut maintenant se doucher sans risque dans son appartement des Grouets. Merci !",
      author: "Marie L. - Blois (Les Grouets)",
      rating: 5,
    }),
    serviceCards({
      background: "muted",
      heading: "Nos prestations à Blois",
      columns: "2",
      cards: [
        {
          title: "Remplacement baignoire → douche",
          bullets: [
            { text: "Dépose complète de votre ancienne baignoire" },
            { text: "Installation receveur extra-plat antidérapant" },
            { text: "Parois, barres d'appui, siège si besoin" },
            { text: "Robinetterie thermostatique sécurisée" },
          ],
          linkLabel: "En savoir plus →",
          linkHref: "/remplacement-baignoire-par-douche",
        },
        {
          title: "Douche PMR sur-mesure",
          bullets: [
            { text: "Accès plain-pied sans ressaut" },
            { text: "Dimensions adaptées fauteuil roulant" },
            { text: "Équipements certifiés normes PMR" },
            { text: "Éligible aides financières maximales" },
          ],
          linkLabel: "En savoir plus →",
          linkHref: "/installation-douche-pmr",
        },
      ],
    }),
    aidCards({
      background: "default",
      heading: "Aides financières disponibles à Blois",
      intro: "Ne payez pas le prix fort ! Plusieurs aides existent pour financer votre douche sécurisée :",
      cards: [
        {
          icon: "none",
          title: "MaPrimeAdapt",
          text: "Aide de l'État pour l'adaptation du logement. Prise en charge importante selon vos revenus.",
        },
        {
          icon: "none",
          title: "Crédit d'impôt",
          text: "25% de crédit d'impôt sur les équipements d'accessibilité",
        },
      ],
      buttonLabel: "Tout savoir sur les aides →",
      buttonHref: "/aides-financieres",
    }),
    cta({
      heading: "Vous habitez Blois ou l'agglomération ?",
      text: "Demandez votre devis gratuit maintenant. Visite à domicile et réponse sous 24h.",
      ctaLabel: "Demander un devis gratuit",
    }),
  ],
);

const bourgesPage = cityPage(
  "douche-senior-bourges",
  "Douche Senior Bourges",
  "Bourges",
  "cher",
  {
    title: "Douche Senior Bourges | Artisan Certifié | Devis Gratuit",
    description:
      "Installation douche sécurisée à Bourges et agglo (Saint-Doulchard, Vierzon). Artisan certifié. Installation 1 jour.",
  },
  [
    cityHero(
      "Bourges et agglomération - Cher (18)",
      "pour Seniors à Bourges",
      "Artisan certifié Handibat & Silverbat. Transformation baignoire en douche sécurisée en 1 journée.",
    ),
    cityFeatures([
      card("mapPin", "Local", "Intervention Bourges et environs"),
      card("clock", "Rapide", "Installation en 1 journée"),
      card("shield", "Certifié", "Handibat & Silverbat"),
      card("euro", "Aides", "MaPrimeAdapt"),
    ]),
    cityZones("Zones d'intervention à Bourges", [
      "Centre-ville Bourges",
      "Saint-Doulchard",
      "Les Gibjoncs",
      "Val d'Auron",
      "Asnières-lès-Bourges",
      "Pignoux",
      "Lahitolle",
      "Mazières",
    ], "4"),
    cta({
      heading: "Vous habitez Bourges ?",
      text: "Devis gratuit sous 24h",
      ctaLabel: "Devis gratuit",
      phoneLabel: "Appeler",
    }),
  ],
);

const chateauroux = cityPage(
  "douche-senior-chateauroux",
  "Douche Senior Châteauroux",
  "Châteauroux",
  "indre",
  {
    title: "Douche Senior Châteauroux | Artisan Certifié | Devis Gratuit",
    description:
      "Installation douche sécurisée à Châteauroux et agglo (Déols, Saint-Maur). Artisan certifié. Installation 1 jour.",
  },
  [
    cityHero(
      "Châteauroux et agglomération - Indre (36)",
      "pour Seniors à Châteauroux",
      "Artisan certifié pour la transformation de votre salle de bain en douche plain-pied sécurisée.",
    ),
    cityFeatures([
      card("mapPin", "Proximité", "Intervention sur Châteauroux et environs"),
      card("clock", "1 jour", "Installation rapide en 1 journée"),
      card("shield", "Certifié", "Handibat & Silverbat"),
      card("euro", "Aides", "MaPrimeAdapt disponible"),
    ]),
    cityZones("Zones d'intervention à Châteauroux", [
      "Centre-ville Châteauroux",
      "Déols",
      "Saint-Maur",
      "La Martinerie",
      "Saint-Christophe",
      "Touvent",
      "Belle-Isle",
      "Ozans",
    ], "4"),
    cta({
      heading: "Habitant de Châteauroux ?",
      text: "Devis gratuit sous 24h",
      ctaLabel: "Demander un devis",
    }),
  ],
);

const orleans = cityPage(
  "douche-senior-orleans",
  "Douche Senior Orléans",
  "Orléans",
  "loiret",
  {
    title: "Douche Senior Orléans | Artisan Certifié | Devis Gratuit",
    description:
      "Installation douche sécurisée à Orléans et agglo (Olivet, Fleury-les-Aubrais). Artisan certifié. Installation 1 jour.",
  },
  [
    cityHero(
      "Orléans et agglomération - Loiret (45)",
      "pour Seniors à Orléans",
      "Artisan certifié Handibat & Silverbat. Transformation baignoire en douche plain-pied en 1 journée.",
    ),
    cityFeatures([
      card("mapPin", "Artisan local", "Intervention rapide sur Orléans et agglo"),
      card("clock", "1 journée", "Installation complète en une journée"),
      card("shield", "Certifié", "Handibat & Silverbat PMR"),
      card("euro", "Aides", "MaPrimeAdapt et autres"),
    ]),
    cityZones("Zones d'intervention à Orléans", [
      "Centre-ville Orléans",
      "Olivet",
      "Fleury-les-Aubrais",
      "Saran",
      "Saint-Jean-de-Braye",
      "La Chapelle-Saint-Mesmin",
      "Saint-Jean-de-la-Ruelle",
      "Orléans-La Source",
    ], "4"),
    cta({
      heading: "Vous habitez Orléans ?",
      text: "Demandez votre devis gratuit. Réponse sous 24h.",
      ctaLabel: "Devis gratuit",
      phoneLabel: "Appeler",
    }),
  ],
);

const romorantin = cityPage(
  "douche-senior-romorantin",
  "Douche Senior Romorantin",
  "Romorantin-Lanthenay",
  "loir-et-cher",
  {
    title: "Douche Senior Romorantin | Artisan Local | Devis Gratuit",
    description:
      "Installation douche sécurisée à Romorantin-Lanthenay et Sologne. Artisan local certifié. Installation 1 jour.",
  },
  [
    cityHero(
      "Romorantin et Sologne - Loir-et-Cher (41)",
      "pour Seniors à Romorantin",
      "Artisan local basé en Sologne. Transformation de votre baignoire en douche sécurisée en 1 journée.",
    ),
    cityFeatures([
      card("mapPin", "Très local", "Basé en Sologne, à proximité"),
      card("clock", "1 journée", "Installation ultra-rapide"),
      card("shield", "Certifié", "Handibat & Silverbat"),
      card("euro", "Aides", "MaPrimeAdapt"),
    ]),
    cityZones("Zones d'intervention en Sologne", [
      "Romorantin-Lanthenay",
      "Pruniers-en-Sologne",
      "Selles-sur-Cher",
      "Gièvres",
      "Mennetou-sur-Cher",
      "Villefranche-sur-Cher",
      "Millançay",
      "La Ferté-Beauharnais",
    ], "4"),
    cta({
      heading: "Vous habitez Romorantin ou la Sologne ?",
      text: "Devis gratuit sous 24h",
      ctaLabel: "Devis gratuit",
      phoneLabel: "Appeler",
    }),
  ],
);

const tours = cityPage(
  "douche-senior-tours",
  "Douche Senior Tours",
  "Tours",
  "indre-et-loire",
  {
    title: "Douche Senior Tours | Artisan Certifié | Devis Gratuit 24h",
    description:
      "Installation douche sécurisée à Tours et agglo (Joué-lès-Tours, Saint-Cyr). Artisan local certifié. Intervention en 1 jour.",
  },
  [
    cityHero(
      "Tours et agglomération - Indre-et-Loire (37)",
      "pour Seniors à Tours",
      "Artisan certifié Handibat & Silverbat. Transformation de votre baignoire en douche plain-pied en 1 journée.",
    ),
    cityFeatures(
      [
        card("mapPin", "Proximité", "Intervention rapide sur Tours et toute l'agglomération"),
        card("clock", "1 journée", "Installation complète en une seule journée"),
        card("shield", "Certifications", "Handibat & Silverbat pour adaptation PMR"),
        card("euro", "Aides", "Accompagnement MaPrimeAdapt et autres aides"),
      ],
      "Votre artisan de confiance à Tours",
    ),
    cityZones("Intervention sur Tours et toute l'agglomération", [
      "Centre-ville Tours",
      "Joué-lès-Tours",
      "Saint-Cyr-sur-Loire",
      "Saint-Pierre-des-Corps",
      "Chambray-lès-Tours",
      "Ballan-Miré",
      "La Riche",
      "Saint-Avertin",
      "Fondettes",
      "Montlouis-sur-Loire",
    ], "5"),
    cta({
      heading: "Vous habitez Tours ou l'agglomération ?",
      text: "Demandez votre devis gratuit. Réponse sous 24h.",
      ctaLabel: "Devis gratuit",
      phoneLabel: "Appeler",
    }),
  ],
);

interface DepartmentInput {
  slug: string;
  navLabel: string;
  areaName: string;
  departmentCode: string;
  title: string;
  description: string;
  heroBefore: string;
  heroHighlight: string;
  whyHeading: string;
  firstCard: { title: string; text: string };
  zonesIntro: string;
  zones: string[];
  servicesHeading: string;
  aidsText: string;
  ctaHeading: string;
}

const departmentServiceCards = (aidsText: string): ServiceCard[] => [
  {
    title: "Remplacement baignoire par douche",
    description:
      "Transformation complète de votre baignoire en douche italienne sécurisée avec sol antidérapant et barres d'appui.",
    linkLabel: "En savoir plus →",
    linkHref: "/remplacement-baignoire-par-douche",
  },
  {
    title: "Installation douche PMR",
    description:
      "Douche aux normes PMR (Personnes à Mobilité Réduite) avec accès plain-pied et équipements adaptés.",
    linkLabel: "En savoir plus →",
    linkHref: "/installation-douche-pmr",
  },
  {
    title: "Aménagement complet salle de bain",
    description:
      "Adaptation globale de votre salle de bain pour seniors : douche, lavabo, WC, éclairage, revêtements.",
    linkLabel: "En savoir plus →",
    linkHref: "/amenagement-salle-bain-senior",
  },
  {
    title: "Aides financières MaPrimeAdapt",
    description: aidsText,
    linkLabel: "En savoir plus →",
    linkHref: "/aides-financieres",
  },
];

const departmentPage = (input: DepartmentInput): PageSeed => ({
  slug: input.slug,
  navLabel: input.navLabel,
  pageType: "department",
  areaName: input.areaName,
  departmentCode: input.departmentCode,
  seo: { title: input.title, description: input.description },
  layout: [
    hero({
      titleBefore: input.heroBefore,
      titleHighlight: input.heroHighlight,
      intro:
        "Artisan certifié pour la transformation de votre salle de bain en douche sécurisée. Intervention rapide sur tout le département.",
      ctaLabel: "Devis gratuit immédiat",
    }),
    featureCards({
      background: "default",
      heading: input.whyHeading,
      layout: "left",
      columns: "3",
      cards: [
        card("checkCircle", input.firstCard.title, input.firstCard.text),
        card(
          "checkCircle",
          "Installation en 1 journée",
          "Votre baignoire est remplacée par une douche plain-pied sécurisée en une seule journée. Vous pouvez l'utiliser dès le soir même.",
        ),
        card(
          "checkCircle",
          "Certifications Handibat & Silverbat",
          "Artisan certifié pour les travaux d'adaptation PMR. Éligible aux aides financières (MaPrimeAdapt).",
        ),
      ],
    }),
    zoneList({
      background: "muted",
      heading: `Zones d'intervention dans le ${input.departmentCode}`,
      showMapIcon: true,
      columns: "5",
      intro: input.zonesIntro,
      items: names(input.zones),
      outro: "Et toutes les autres communes du département...",
    }),
    serviceCards({
      background: "default",
      heading: input.servicesHeading,
      columns: "2",
      cards: departmentServiceCards(input.aidsText),
    }),
    cta({
      heading: input.ctaHeading,
      text: "Demandez votre devis gratuit dès maintenant. Réponse sous 24h.",
      ctaLabel: "Demander un devis gratuit",
      phoneLabel: "Appeler maintenant",
    }),
  ],
});

const aidsTextImportant =
  "Accompagnement complet pour obtenir les aides financières : prise en charge importante possible.";

const loirEtCher = departmentPage({
  slug: "loir-et-cher",
  navLabel: "Loir-et-Cher (41)",
  areaName: "Loir-et-Cher",
  departmentCode: "41",
  title: "Douche Senior Loir-et-Cher (41) | Installation Rapide",
  description:
    "Artisan douche senior dans le Loir-et-Cher : Blois, Romorantin, Vendôme. Installation en 1 jour, aide financière disponible.",
  heroBefore: "Installation Douche Senior dans le",
  heroHighlight: "Loir-et-Cher (41)",
  whyHeading: "Pourquoi choisir un artisan local dans le Loir-et-Cher ?",
  firstCard: {
    title: "Intervention rapide",
    text: "Basé à Selles-sur-Cher, nous intervenons rapidement dans tout le département : Blois, Romorantin, Vendôme et alentours.",
  },
  zonesIntro:
    "Nous intervenons dans toutes les villes et communes du Loir-et-Cher pour l'installation de votre douche sécurisée :",
  zones: [
    "Blois",
    "Romorantin-Lanthenay",
    "Vendôme",
    "Mer",
    "Saint-Aignan",
    "Vineuil",
    "Lamotte-Beuvron",
    "Contres",
    "Montrichard",
    "Selles-sur-Cher",
  ],
  servicesHeading: "Nos services d'adaptation de salle de bain dans le Loir-et-Cher",
  aidsText:
    "Accompagnement complet pour obtenir les aides financières : jusqu'à 100% de prise en charge possible.",
  ctaHeading: "Prêt à sécuriser votre salle de bain dans le Loir-et-Cher ?",
});

const indreEtLoire = departmentPage({
  slug: "indre-et-loire",
  navLabel: "Indre-et-Loire (37)",
  areaName: "Indre-et-Loire",
  departmentCode: "37",
  title: "Douche Senior Indre-et-Loire (37) | Installation Rapide",
  description:
    "Artisan douche senior en Indre-et-Loire : Tours, Joué-lès-Tours, Saint-Cyr-sur-Loire. Installation en 1 jour, aide financière.",
  heroBefore: "Installation Douche Senior en",
  heroHighlight: "Indre-et-Loire (37)",
  whyHeading: "Pourquoi choisir un artisan local en Indre-et-Loire ?",
  firstCard: {
    title: "Proximité garantie",
    text: "Intervention rapide dans tout le département : Tours, Joué-lès-Tours, Amboise et toutes les communes d'Indre-et-Loire.",
  },
  zonesIntro:
    "Nous intervenons dans toutes les villes et communes d'Indre-et-Loire pour l'installation de votre douche sécurisée :",
  zones: [
    "Tours",
    "Joué-lès-Tours",
    "Saint-Cyr-sur-Loire",
    "Saint-Pierre-des-Corps",
    "Amboise",
    "Chinon",
    "Loches",
    "Montlouis-sur-Loire",
    "Chambray-lès-Tours",
    "Ballan-Miré",
  ],
  servicesHeading: "Nos services d'adaptation de salle de bain en Indre-et-Loire",
  aidsText: aidsTextImportant,
  ctaHeading: "Prêt à sécuriser votre salle de bain en Indre-et-Loire ?",
});

const loiret = departmentPage({
  slug: "loiret",
  navLabel: "Loiret (45)",
  areaName: "Loiret",
  departmentCode: "45",
  title: "Douche Senior Loiret (45) | Installation Rapide",
  description:
    "Artisan douche senior dans le Loiret : Orléans, Montargis, Olivet. Installation en 1 jour, aide financière disponible.",
  heroBefore: "Installation Douche Senior dans le",
  heroHighlight: "Loiret (45)",
  whyHeading: "Pourquoi choisir un artisan local dans le Loiret ?",
  firstCard: {
    title: "Proximité garantie",
    text: "Intervention rapide dans tout le département : Orléans, Montargis, Olivet et toutes les communes du Loiret.",
  },
  zonesIntro:
    "Nous intervenons dans toutes les villes et communes du Loiret pour l'installation de votre douche sécurisée :",
  zones: [
    "Orléans",
    "Montargis",
    "Olivet",
    "Fleury-les-Aubrais",
    "Saran",
    "Gien",
    "Pithiviers",
    "Saint-Jean-de-Braye",
    "Châlette-sur-Loing",
    "La Chapelle-Saint-Mesmin",
  ],
  servicesHeading: "Nos services d'adaptation de salle de bain dans le Loiret",
  aidsText: aidsTextImportant,
  ctaHeading: "Prêt à sécuriser votre salle de bain dans le Loiret ?",
});

const indre = departmentPage({
  slug: "indre",
  navLabel: "Indre (36)",
  areaName: "Indre",
  departmentCode: "36",
  title: "Douche Senior Indre (36) | Installation Rapide",
  description:
    "Artisan douche senior dans l'Indre : Châteauroux, Issoudun, Le Blanc. Installation en 1 jour, aide financière disponible.",
  heroBefore: "Installation Douche Senior dans l'",
  heroHighlight: "Indre (36)",
  whyHeading: "Pourquoi choisir un artisan local dans l'Indre ?",
  firstCard: {
    title: "Proximité garantie",
    text: "Intervention rapide dans tout le département : Châteauroux, Issoudun, Le Blanc et toutes les communes de l'Indre.",
  },
  zonesIntro:
    "Nous intervenons dans toutes les villes et communes de l'Indre pour l'installation de votre douche sécurisée :",
  zones: [
    "Châteauroux",
    "Issoudun",
    "Le Blanc",
    "La Châtre",
    "Argenton-sur-Creuse",
    "Buzançais",
    "Déols",
    "Levroux",
    "Valençay",
    "Saint-Maur",
  ],
  servicesHeading: "Nos services d'adaptation de salle de bain dans l'Indre",
  aidsText: aidsTextImportant,
  ctaHeading: "Prêt à sécuriser votre salle de bain dans l'Indre ?",
});

const cher = departmentPage({
  slug: "cher",
  navLabel: "Cher (18)",
  areaName: "Cher",
  departmentCode: "18",
  title: "Douche Senior Cher (18) | Installation Rapide",
  description:
    "Artisan douche senior dans le Cher : Bourges, Vierzon, Saint-Amand-Montrond. Installation en 1 jour, aide financière disponible.",
  heroBefore: "Installation Douche Senior dans le",
  heroHighlight: "Cher (18)",
  whyHeading: "Pourquoi choisir un artisan local dans le Cher ?",
  firstCard: {
    title: "Proximité garantie",
    text: "Intervention rapide dans tout le département : Bourges, Vierzon, Saint-Amand-Montrond et toutes les communes du Cher.",
  },
  zonesIntro:
    "Nous intervenons dans toutes les villes et communes du Cher pour l'installation de votre douche sécurisée :",
  zones: [
    "Bourges",
    "Vierzon",
    "Saint-Amand-Montrond",
    "Mehun-sur-Yèvre",
    "Saint-Doulchard",
    "Aubigny-sur-Nère",
    "Saint-Florent-sur-Cher",
    "Dun-sur-Auron",
    "Sancoins",
    "Avord",
  ],
  servicesHeading: "Nos services d'adaptation de salle de bain dans le Cher",
  aidsText: aidsTextImportant,
  ctaHeading: "Prêt à sécuriser votre salle de bain dans le Cher ?",
});

const remplacement: PageSeed = {
  slug: "remplacement-baignoire-par-douche",
  navLabel: "Remplacement Baignoire par Douche",
  pageType: "service",
  seo: {
    title: "Remplacement Baignoire par Douche Senior | 1 Jour",
    description:
      "Transformez votre baignoire en douche sécurisée en 1 journée. Artisan certifié Handibat. Aide financière disponible (MaPrimeAdapt).",
  },
  layout: [
    hero({
      titleBefore: "Remplacement de",
      titleHighlight: "Baignoire par Douche",
      titleAfter: "Sécurisée",
      intro:
        "Fini la peur de tomber en enjambant votre baignoire. Transformation complète en douche plain-pied en une seule journée.",
      ctaLabel: "Devis gratuit immédiat",
    }),
    featureCards({
      background: "default",
      heading: "Pourquoi remplacer votre baignoire par une douche ?",
      layout: "centered",
      columns: "4",
      spacing: "spacious",
      cards: [
        card("shield", "Sécurité", "Plus besoin d'enjamber un rebord haut. Accès plain-pied sans risque de chute."),
        card("checkCircle", "Autonomie", "Gardez votre indépendance. Douchez-vous seul(e) en toute sécurité."),
        card("clock", "Rapidité", "Installation complète en 1 journée. Le matin baignoire, le soir douche."),
        card("euro", "Aides financières", "Éligible MaPrimeAdapt et autres aides. Reste à charge réduit."),
      ],
    }),
    steps({
      background: "muted",
      heading: "Comment se passe le remplacement ?",
      withCards: false,
      items: [
        {
          title: "Dépose de la baignoire",
          text: "Démontage complet de votre ancienne baignoire. Évacuation de tous les gravats. Protection de votre logement pendant les travaux.",
        },
        {
          title: "Installation du receveur",
          text: "Pose d'un receveur extra-plat antidérapant. Parfaitement étanche. Accès plain-pied sans ressaut (ou très bas selon configuration).",
        },
        {
          title: "Équipements de sécurité",
          text: "Installation des parois, barres d'appui, siège rabattable si nécessaire. Robinetterie thermostatique pour éviter les brûlures.",
        },
        {
          title: "Finitions et nettoyage",
          text: "Habillage des murs si nécessaire. Raccordements plomberie. Nettoyage complet. Votre douche est prête à utiliser le soir même !",
        },
      ],
    }),
    featureCards({
      background: "default",
      heading: "Équipements inclus dans votre douche",
      layout: "inline",
      columns: "2",
      cards: [
        card("checkCircle", "Receveur extra-plat antidérapant", "Surface antidérapante pour éviter les glissades. Accès plain-pied ou ressaut minimal selon votre salle de bain."),
        card("checkCircle", "Parois de douche sécurisées", "Verre trempé ou acrylique résistant. Ouverture facile, système anti-éclaboussures."),
        card("checkCircle", "Barres d'appui murales", "Fixation renforcée pour un maintien sûr. Positionnement adapté à vos besoins."),
        card("checkCircle", "Robinetterie thermostatique", "Température constante, pas de risque de brûlure. Commandes faciles à manipuler."),
        card("checkCircle", "Siège de douche (option)", "Siège rabattable ou fixe selon vos préférences. Permet de se doucher assis confortablement."),
        card("checkCircle", "Fabrication 100% française", "Tous nos équipements sont fabriqués en France. Qualité et durabilité garanties."),
      ],
    }),
    aidCards({
      background: "muted",
      heading: "Financement : quelles aides pour remplacer votre baignoire ?",
      intro: "Ne payez pas le prix fort ! Vous pouvez bénéficier de plusieurs aides cumulables :",
      cards: [
        {
          icon: "none",
          title: "MaPrimeAdapt",
          text: "Aide de l'État pour l'adaptation du logement. Montant selon vos revenus.",
          highlight: "Prise en charge importante possible",
        },
        {
          icon: "none",
          title: "Crédit d'impôt 25%",
          text: "Crédit d'impôt sur les équipements d'accessibilité PMR",
          highlight: "Jusqu'à 5 000 € par personne",
        },
      ],
      buttonLabel: "Tout savoir sur les aides financières →",
      buttonHref: "/aides-financieres",
    }),
    linkCards({
      background: "default",
      heading: "Remplacement de baignoire en Centre-Val de Loire",
      intro: "Nous intervenons dans 5 départements pour transformer votre baignoire en douche sécurisée :",
      links: [
        { label: "Loir-et-Cher (41)", description: "Blois, Romorantin...", href: "/loir-et-cher" },
        { label: "Indre-et-Loire (37)", description: "Tours, Joué...", href: "/indre-et-loire" },
        { label: "Loiret (45)", description: "Orléans, Montargis...", href: "/loiret" },
        { label: "Indre (36)", description: "Châteauroux, Issoudun...", href: "/indre" },
        { label: "Cher (18)", description: "Bourges, Vierzon...", href: "/cher" },
      ],
    }),
    cta({
      heading: "Prêt à remplacer votre baignoire par une douche sécurisée ?",
      text: "Demandez votre devis gratuit. Visite à domicile et réponse sous 24h.",
      ctaLabel: "Demander un devis gratuit",
    }),
  ],
};

const installationPmr: PageSeed = {
  slug: "installation-douche-pmr",
  navLabel: "Installation Douche PMR",
  pageType: "service",
  seo: {
    title: "Installation Douche PMR | Normes Accessibilité",
    description:
      "Installation douche PMR (Personnes à Mobilité Réduite) aux normes. Artisan certifié Handibat. Accès plain-pied, aides financières.",
  },
  layout: [
    hero({
      titleBefore: "Installation",
      titleHighlight: "Douche PMR",
      titleAfter: "aux Normes",
      intro:
        "Douche adaptée aux Personnes à Mobilité Réduite. Artisan certifié Handibat & Silverbat. Respect strict des normes d'accessibilité.",
      ctaLabel: "Devis gratuit",
    }),
    featureCards({
      background: "default",
      heading: "Qu'est-ce qu'une douche PMR ?",
      intro:
        "Une douche PMR (Personnes à Mobilité Réduite) est une douche spécialement conçue pour être accessible aux personnes en fauteuil roulant ou ayant des difficultés de déplacement.",
      layout: "inline",
      columns: "2",
      cards: [
        card("checkCircle", "Accès plain-pied", "Aucun ressaut ou seuil maximum de 2 cm. Accessible en fauteuil roulant."),
        card("checkCircle", "Dimensions adaptées", "Surface minimale 150x150 cm pour circulation fauteuil."),
        card("checkCircle", "Barres d'appui normées", "Positionnement et hauteur selon normes PMR. Résistance 150 kg minimum."),
        card("checkCircle", "Siège de douche", "Siège rabattable ou fixe à hauteur normée (45-50 cm)."),
      ],
    }),
    featureCards({
      background: "muted",
      heading: "Pourquoi choisir un artisan certifié Handibat ?",
      intro:
        "Le label Handibat garantit que l'artisan maîtrise les normes d'accessibilité PMR et peut réaliser des travaux conformes.",
      layout: "inline",
      columns: "1",
      cards: [
        card("none", "✓ Conformité garantie aux normes", "Respect strict de la réglementation PMR et accessibilité."),
        card("none", "✓ Éligibilité aux aides maximales", "Certification obligatoire pour certaines aides (MaPrimeAdapt)."),
        card("none", "✓ Expertise reconnue", "Formation spécialisée adaptation du logement."),
      ],
    }),
    cta({
      heading: "Besoin d'une douche PMR conforme ?",
      text: "Devis gratuit par artisan certifié Handibat. Visite à domicile.",
      ctaLabel: "Demander un devis",
      phoneLabel: "Appeler",
    }),
  ],
};

const amenagement: PageSeed = {
  slug: "amenagement-salle-bain-senior",
  navLabel: "Aménagement Salle de Bain",
  pageType: "service",
  seo: {
    title: "Aménagement Salle de Bain Senior | Adaptation Complète",
    description:
      "Aménagement complet salle de bain pour seniors : douche, lavabo, WC, éclairage. Artisan certifié. Aides financières disponibles.",
  },
  layout: [
    hero({
      titleBefore: "Aménagement",
      titleHighlight: "Salle de Bain Senior",
      intro:
        "Adaptation complète de votre salle de bain pour plus de sécurité et de confort au quotidien.",
      ctaLabel: "Devis gratuit",
    }),
    featureCards({
      background: "default",
      heading: "Pourquoi aménager sa salle de bain après 70 ans ?",
      intro:
        "La salle de bain est la pièce où ont lieu 46% des chutes à domicile chez les seniors. Un aménagement adapté permet de :",
      layout: "left",
      columns: "2",
      cards: [
        card("checkCircle", "Réduire les risques de chute", "Sol antidérapant, barres d'appui, éclairage adapté."),
        card("checkCircle", "Garder son autonomie", "Continuer à vivre chez soi en toute sécurité."),
        card("checkCircle", "Faciliter les gestes quotidiens", "Équipements ergonomiques, hauteurs adaptées."),
        card("checkCircle", "Valoriser son logement", "Salle de bain moderne et accessible."),
      ],
    }),
    serviceCards({
      background: "muted",
      heading: "Les aménagements possibles",
      columns: "3",
      cards: [
        {
          title: "Douche sécurisée",
          description:
            "Remplacement baignoire par douche plain-pied, barres d'appui, siège, sol antidérapant.",
          linkLabel: "En savoir plus →",
          linkHref: "/remplacement-baignoire-par-douche",
        },
        {
          title: "Lavabo PMR",
          description:
            "Lavabo à hauteur adaptée, passage fauteuil, robinetterie ergonomique.",
        },
        {
          title: "WC surélevés",
          description:
            "Cuvette surélevée, barres de maintien, espace de circulation adapté.",
        },
        {
          title: "Éclairage renforcé",
          description:
            "Spots LED puissants, interrupteurs accessibles, veilleuse automatique.",
        },
        {
          title: "Sol antidérapant",
          description: "Revêtement sécurisé, évacuation eau optimisée.",
        },
        {
          title: "Porte adaptée",
          description:
            "Élargissement porte, poignée ergonomique, seuil supprimé.",
        },
      ],
    }),
    aidCards({
      background: "default",
      heading: "Financement de l'aménagement",
      intro:
        "Un aménagement complet peut être financé par plusieurs aides cumulables : MaPrimeAdapt et crédit d'impôt.",
      buttonLabel: "Découvrir les aides disponibles →",
      buttonHref: "/aides-financieres",
    }),
    cta({
      heading: "Projet d'aménagement salle de bain senior ?",
      text: "Visite gratuite à domicile. Devis personnalisé sous 24h.",
      ctaLabel: "Demander un devis",
    }),
  ],
};

const aidesFinancieres: PageSeed = {
  slug: "aides-financieres",
  navLabel: "Aides Financières",
  pageType: "service",
  seo: {
    title: "Aides Financières Douche Senior 2026 | MaPrimeAdapt",
    description:
      "Toutes les aides pour financer votre douche senior : MaPrimeAdapt et crédit d'impôt. On vous accompagne dans vos démarches.",
  },
  layout: [
    hero({
      titleBefore: "Aides Financières pour",
      titleHighlight: "Douche Senior",
      titleAfter: "en 2026",
      intro:
        "Ne payez pas le prix fort ! Plusieurs aides cumulables existent pour financer l'installation de votre douche sécurisée.",
      ctaLabel: "Simuler mes aides gratuitement",
    }),
    aidCards({
      background: "default",
      heading: "Les principales aides disponibles",
      variant: "detailed",
      cards: [
        {
          icon: "euro",
          title: "MaPrimeAdapt",
          text: "Aide de l'État pour l'adaptation du logement des personnes âgées ou en situation de handicap.",
          details: [
            { label: "Montant :", text: "Selon vos revenus (prise en charge importante possible)" },
            { label: "Conditions :", text: "Propriétaire occupant ou locataire, + 60 ans ou situation handicap" },
            { label: "Plafond travaux :", text: "22 000 €" },
          ],
          note: "⚠️ Artisan certifié Handibat OBLIGATOIRE (nous le sommes !)",
        },
        {
          icon: "fileText",
          title: "Crédit d'impôt 25%",
          text: "Crédit d'impôt sur le revenu pour l'installation d'équipements d'accessibilité.",
          details: [
            { label: "Montant :", text: "25% des dépenses d'équipements" },
            { label: "Plafond :", text: "5 000 € pour une personne seule, 10 000 € pour un couple" },
            { label: "Cumulable :", text: "Avec MaPrimeAdapt" },
          ],
          note: "Exemple : 10 000 € de travaux = 2 500 € de crédit d'impôt",
        },
      ],
    }),
    steps({
      background: "muted",
      heading: "Comment obtenir ces aides ?",
      withCards: true,
      items: [
        {
          title: "Contactez-nous pour un devis",
          text: "Nous établissons un devis gratuit détaillé de vos travaux.",
        },
        {
          title: "Nous vous accompagnons",
          text: "On vous aide à identifier les aides auxquelles vous avez droit et à monter vos dossiers.",
        },
        {
          title: "Dépôt des demandes d'aides",
          text: "Transmission des dossiers aux organismes. Certaines aides nécessitent une demande AVANT travaux.",
        },
        {
          title: "Installation de votre douche",
          text: "Une fois les accords obtenus, nous réalisons l'installation en 1 journée.",
        },
      ],
    }),
    cta({
      heading: "Besoin d'aide pour vos démarches ?",
      text: "Nous vous accompagnons gratuitement pour identifier et obtenir toutes les aides auxquelles vous avez droit.",
      ctaLabel: "Être accompagné gratuitement",
    }),
  ],
};

export const pagesSeed: PageSeed[] = [
  loirEtCher,
  indreEtLoire,
  loiret,
  indre,
  cher,
  bloisPage,
  bourgesPage,
  chateauroux,
  orleans,
  romorantin,
  tours,
  remplacement,
  installationPmr,
  amenagement,
  aidesFinancieres,
];
