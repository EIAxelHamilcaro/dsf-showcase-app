export interface LegalSectionSeed {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface LegalPageSeed {
  slug: string;
  navLabel: string;
  seo: { title: string; description: string };
  title: string;
  sections: LegalSectionSeed[];
}

const mentionsLegales: LegalPageSeed = {
  slug: "mentions-legales",
  navLabel: "Mentions légales",
  seo: {
    title: "Mentions légales | Douche Senior France",
    description:
      "Mentions légales du site douche-senior-france.com : éditeur DOUCHE SENIOR FRANCE, directeur de la publication, hébergeur et propriété intellectuelle.",
  },
  title: "Mentions légales",
  sections: [
    {
      heading: "Éditeur du site",
      paragraphs: [
        "Le site https://www.douche-senior-france.com est édité par :",
        [
          "DOUCHE SENIOR FRANCE",
          "Société par actions simplifiée (SAS) au capital de 4 000 €",
          "Siège social : 147 rue de Romorantin, 41130 Selles-sur-Cher, France",
          "SIREN : 800 339 673",
          "SIRET du siège : 800 339 673 00017",
          "Téléphone : 02 54 97 53 23",
          "Email : douche.senior.france@gmail.com",
        ].join("\n"),
      ],
    },
    {
      heading: "Directeur de la publication",
      paragraphs: ["Dominique Bertone, président de DOUCHE SENIOR FRANCE."],
    },
    {
      heading: "Hébergeur",
      paragraphs: [
        "Le site est hébergé par :",
        [
          "Vercel Inc.",
          "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
          "https://vercel.com",
        ].join("\n"),
      ],
    },
    {
      heading: "Activité, assurance et qualifications",
      paragraphs: [
        "DOUCHE SENIOR FRANCE fabrique et installe des douches sécurisées pour les seniors et les personnes à mobilité réduite. L'entreprise intervient dans 5 départements de la région Centre-Val de Loire : le Loir-et-Cher (41), l'Indre-et-Loire (37), le Loiret (45), l'Indre (36) et le Cher (18).",
        "Labels : Handibat et Silverbat.",
      ],
    },
    {
      heading: "Propriété intellectuelle",
      paragraphs: [
        "Les textes, photographies, logos et documents présents sur ce site appartiennent à DOUCHE SENIOR FRANCE ou sont utilisés avec l'accord de leurs auteurs. Toute reproduction, même partielle, sans autorisation écrite est interdite. Les logos Handibat et Silverbat appartiennent à leurs titulaires respectifs.",
      ],
    },
    {
      heading: "Informations publiées sur le site",
      paragraphs: [
        "Les informations de ce site sont données à titre indicatif. Les prix, les délais et les montants des aides financières dépendent de chaque situation : seul un devis établi par DOUCHE SENIOR FRANCE engage l'entreprise. Les règles des aides publiques évoluent, la source officielle reste le site https://www.service-public.gouv.fr.",
      ],
    },
    {
      heading: "Liens vers d'autres sites",
      paragraphs: [
        "Ce site contient des liens vers des sites tiers, par exemple service-public.gouv.fr. DOUCHE SENIOR FRANCE n'a pas la maîtrise de leur contenu et ne peut pas en être tenue responsable.",
      ],
    },
    {
      heading: "Données personnelles",
      paragraphs: [
        "Les données transmises par les formulaires du site servent à répondre aux demandes de devis. Le détail des traitements, de vos droits et des traceurs utilisés figure dans la politique de confidentialité.",
      ],
    },
    {
      heading: "Médiation de la consommation",
      paragraphs: [
        "Conformément à l'article L612-1 du Code de la consommation, tout consommateur peut recourir gratuitement à un médiateur de la consommation en cas de litige qui n'a pas pu être réglé directement avec l'entreprise.",
      ],
    },
    {
      heading: "Droit applicable",
      paragraphs: [
        "Ce site et ces mentions légales sont soumis au droit français.",
      ],
    },
  ],
};

const politiqueDeConfidentialite: LegalPageSeed = {
  slug: "politique-de-confidentialite",
  navLabel: "Politique de confidentialité",
  seo: {
    title: "Politique de confidentialité | Douche Senior France",
    description:
      "Données personnelles collectées par les formulaires de devis du site douche-senior-france.com : finalités, durées de conservation, cookies et vos droits.",
  },
  title: "Politique de confidentialité",
  sections: [
    {
      paragraphs: [
        "Cette page explique quelles données personnelles le site https://www.douche-senior-france.com collecte, pourquoi, pendant combien de temps, et comment exercer vos droits. Elle applique le règlement général sur la protection des données (RGPD) et la loi Informatique et Libertés.",
      ],
    },
    {
      heading: "1. Responsable du traitement",
      paragraphs: [
        [
          "DOUCHE SENIOR FRANCE, SAS au capital de 4 000 €, SIREN 800 339 673",
          "147 rue de Romorantin, 41130 Selles-sur-Cher",
          "Téléphone : 02 54 97 53 23",
          "Contact pour vos données : douche.senior.france@gmail.com",
        ].join("\n"),
        "L'entreprise n'a pas désigné de délégué à la protection des données.",
      ],
    },
    {
      heading: "2. Données collectées",
      paragraphs: [
        "Le site collecte uniquement les données que vous saisissez dans ses formulaires de demande de devis.",
      ],
      headers: ["Donnée", "Obligatoire", "Formulaire"],
      rows: [
        ["Nom complet", "Oui", "Formulaire de contact et formulaire par étapes"],
        ["Téléphone", "Oui", "Les deux"],
        ["Email", "Oui", "Les deux"],
        ["Adresse postale", "Oui", "Les deux"],
        ["Message libre (« Votre projet »)", "Non", "Les deux"],
        ["Propriétaire ou locataire", "Non", "Formulaire par étapes"],
        ["Maison ou appartement", "Non", "Formulaire par étapes"],
        ["Baignoire ou douche actuelle", "Non", "Formulaire par étapes"],
        ["Tranche d'âge (plus ou moins de 70 ans)", "Non", "Formulaire par étapes"],
        ["Vos choix de consentement", "Oui", "Formulaire par étapes"],
      ],
    },
    {
      paragraphs: [
        "Le site ne vous demande aucune donnée de santé. Merci de ne pas en indiquer dans le message libre : décrivez seulement votre salle de bain et votre besoin.",
        "Le site ne crée pas de compte utilisateur et ne collecte aucune donnée de paiement.",
      ],
    },
    {
      heading: "3. Finalités",
      paragraphs: ["Vos données servent à :"],
      items: [
        "répondre à votre demande de devis et vous recontacter par téléphone ou par email ;",
        "préparer la visite à domicile et l'étude de votre salle de bain ;",
        "vous orienter vers les aides financières qui correspondent à votre situation (c'est la raison des questions sur le logement et la tranche d'âge) ;",
        "assurer le suivi de la relation commerciale qui peut en découler ;",
        "protéger les formulaires contre les envois automatisés ;",
        "mesurer la fréquentation et la rapidité du site, de façon agrégée.",
      ],
    },
    {
      paragraphs: [
        "Vos données ne sont ni vendues ni utilisées pour de la publicité ciblée.",
      ],
    },
    {
      heading: "4. Bases légales",
      headers: ["Finalité", "Base légale (article 6 du RGPD)"],
      rows: [
        [
          "Réponse à la demande de devis, visite, orientation vers les aides",
          "Mesures précontractuelles prises à votre demande (article 6.1.b)",
        ],
        [
          "Suivi de la relation commerciale",
          "Intérêt légitime de l'entreprise à suivre ses demandes et ses clients (article 6.1.f)",
        ],
        [
          "Protection contre les envois automatisés",
          "Intérêt légitime à sécuriser le site (article 6.1.f)",
        ],
        [
          "Mesure d'audience et de performance agrégée",
          "Intérêt légitime à améliorer le site (article 6.1.f)",
        ],
        [
          "Transmission à des partenaires",
          "Votre consentement (article 6.1.a), voir le point 5",
        ],
      ],
    },
    {
      heading: "5. Destinataires et sous-traitants",
      paragraphs: [
        "Vos données sont lues par le personnel de DOUCHE SENIOR FRANCE chargé des devis et des chantiers.",
        "Elles sont traitées, pour le compte de l'entreprise, par les prestataires techniques suivants :",
      ],
      headers: ["Prestataire", "Rôle", "Localisation"],
      rows: [
        [
          "Vercel Inc.",
          "Hébergement du site, mesure d'audience (Vercel Analytics), mesure de performance (Speed Insights), stockage des images et documents du site (Vercel Blob)",
          "États-Unis",
        ],
        [
          "Neon",
          "Base de données où chaque demande de devis est enregistrée",
          "Union européenne (région Europe centrale)",
        ],
        [
          "Google (Gmail)",
          "Messagerie : chaque demande est envoyée par email à l'entreprise",
          "Union européenne et États-Unis",
        ],
        [
          "Cloudflare (Turnstile)",
          "Vérification que le formulaire est rempli par une personne et non par un robot",
          "Union européenne et États-Unis",
        ],
      ],
    },
    {
      paragraphs: [
        "Partenaires. Le formulaire par étapes comporte une case de consentement à la transmission de vos données aux partenaires de DOUCHE SENIOR FRANCE.",
        "Vos données peuvent aussi être communiquées aux autorités quand la loi l'impose.",
      ],
    },
    {
      heading: "6. Transferts hors de l'Union européenne",
      paragraphs: [
        "Vercel, Google et Cloudflare sont des sociétés américaines : des données peuvent être traitées aux États-Unis. Ces transferts sont encadrés par les garanties prévues par le RGPD : décision d'adéquation de la Commission européenne pour les entreprises adhérentes au Data Privacy Framework, ou clauses contractuelles types.",
        "La base de données des demandes de devis est hébergée dans l'Union européenne.",
      ],
    },
    {
      heading: "7. Durée de conservation",
      headers: ["Donnée", "Durée"],
      rows: [
        [
          "Demande de devis sans suite",
          "3 ans après le dernier contact de votre part",
        ],
        [
          "Demande suivie d'un contrat",
          "Durée de la relation, puis durées légales de conservation des documents commerciaux et comptables",
        ],
        [
          "Statistiques d'audience",
          "Données agrégées, sans identification des visiteurs",
        ],
      ],
    },
    {
      paragraphs: [
        "À la fin de ces durées, les données sont supprimées ou rendues anonymes.",
      ],
    },
    {
      heading: "8. Vos droits",
      paragraphs: ["Vous disposez des droits suivants sur vos données :"],
      items: [
        "droit d'accès : obtenir une copie des données qui vous concernent ;",
        "droit de rectification : faire corriger une donnée inexacte ;",
        "droit à l'effacement : faire supprimer vos données ;",
        "droit à la limitation du traitement ;",
        "droit d'opposition au traitement fondé sur l'intérêt légitime, et à tout moment à la prospection commerciale ;",
        "droit à la portabilité des données que vous avez fournies ;",
        "droit de retirer votre consentement à tout moment, sans effet sur ce qui a été fait avant ;",
        "droit de donner des consignes sur le sort de vos données après votre décès.",
      ],
    },
    {
      paragraphs: [
        "Comment les exercer. Écrivez à douche.senior.france@gmail.com ou par courrier à DOUCHE SENIOR FRANCE, 147 rue de Romorantin, 41130 Selles-sur-Cher. Vous pouvez aussi appeler le 02 54 97 53 23. Nous répondons dans un délai d'1 mois. Une preuve d'identité peut vous être demandée en cas de doute.",
      ],
    },
    {
      heading: "9. Réclamation auprès de la CNIL",
      paragraphs: [
        "Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL) : https://www.cnil.fr/fr/plaintes ou CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.",
      ],
    },
    {
      heading: "10. Cookies et traceurs",
      paragraphs: [
        "Le site n'utilise aucun cookie publicitaire et aucun traceur de réseau social.",
      ],
      headers: ["Outil", "Ce qu'il fait", "Cookie déposé"],
      rows: [
        ["Vercel Analytics", "Compte les visites de façon agrégée", "Aucun"],
        [
          "Vercel Speed Insights",
          "Mesure la vitesse d'affichage des pages",
          "Aucun",
        ],
        [
          "Cloudflare Turnstile",
          "Protège les formulaires contre les robots",
          "Traceur strictement nécessaire à la sécurité, sans finalité publicitaire",
        ],
      ],
    },
    {
      paragraphs: [
        "Ces outils ne servent ni à vous identifier ni à vous suivre d'un site à l'autre. Ils ne demandent donc pas de bandeau de consentement.",
        "Les polices de caractères et les images sont servies par le site lui-même ou par son hébergeur, sans appel à un service publicitaire.",
      ],
    },
    {
      heading: "11. Sécurité",
      paragraphs: [
        "Le site est servi uniquement en HTTPS. L'accès aux demandes de devis enregistrées est réservé aux personnes autorisées de l'entreprise, par un compte protégé par mot de passe. Les visiteurs du site ne peuvent ni lire ni modifier ces demandes.",
      ],
    },
    {
      heading: "12. Modification de cette politique",
      paragraphs: [
        "Cette politique peut évoluer si le site ou la réglementation change. La date de mise à jour figure en haut de la page.",
      ],
    },
  ],
};

export const legalPagesSeed: LegalPageSeed[] = [
  mentionsLegales,
  politiqueDeConfidentialite,
];
