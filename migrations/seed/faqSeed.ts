export interface FaqSourceSeed {
  label: string;
  url: string;
}

export interface FaqItemSeed {
  question: string;
  answer: string;
  sources: FaqSourceSeed[];
}

export interface FaqSeed {
  slug: string;
  heading: string;
  items: FaqItemSeed[];
}

export const faqSeed: FaqSeed[] = [
  {
    slug: "douche-senior-blois",
    heading: "Questions fréquentes sur la douche senior à Blois",
    items: [
      {
        question: "Dans quels quartiers de Blois et quelles communes de l'agglomération intervenez-vous ?",
        answer: "Nous intervenons dans tous les quartiers de Blois et dans les communes voisines. Cette page cite le centre-ville, Les Grouets, Vienne, La Croix Chevalier et Bas-Rivière, ainsi que Vineuil, La Chaussée-Saint-Victor, Saint-Gervais-la-Forêt, Villebarou et Saint-Denis-sur-Loire. Notre siège est à Selles-sur-Cher, dans le Loir-et-Cher (41), le département dont Blois est la préfecture.",
        sources: [],
      },
      {
        question: "Comment obtenir un devis pour une douche sécurisée à Blois ?",
        answer: "Le devis est gratuit et vous recevez une réponse sous 24 h. Vous faites votre demande avec le formulaire du site ou par téléphone au 02 54 97 53 23. Nous venons ensuite chez vous, à Blois ou dans l'agglomération, pour voir votre salle de bain. Chaque douche est fabriquée sur mesure : le devis tient compte de vos dimensions et des options choisies.",
        sources: [],
      },
      {
        question: "Combien de temps dure le remplacement d'une baignoire par une douche à Blois ?",
        answer: "L'installation se fait en 1 journée : la baignoire est déposée le matin et la douche sécurisée est utilisable le soir. Dans cette journée, nous posons le receveur extra-plat antidérapant, les parois, les barres d'appui, le siège si besoin et la robinetterie thermostatique.",
        sources: [],
      },
      {
        question: "Le crédit d'impôt de 25 % pour une douche senior existe-t-il encore en 2026 ?",
        answer: "Non. Le crédit d'impôt pour l'adaptation du logement est supprimé pour les dépenses payées à partir du 1er janvier 2026. Il ne concerne plus que les travaux réalisés et facturés avant le 31 décembre 2025. En 2026, l'aide de l'État pour financer une douche sécurisée à Blois est MaPrimeAdapt'.",
        sources: [
          { label: "service-public.gouv.fr, fiche F10752 vérifiée le 15 avril 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10752" },
        ],
      },
    ],
  },
  {
    slug: "douche-senior-tours",
    heading: "Questions fréquentes sur la douche senior à Tours",
    items: [
      {
        question: "Intervenez-vous à Tours et dans quelles communes de l'agglomération ?",
        answer: "Oui, nous installons des douches sécurisées à Tours et dans toute l'agglomération : Joué-lès-Tours, Saint-Cyr-sur-Loire, Saint-Pierre-des-Corps, Chambray-lès-Tours, Ballan-Miré, La Riche, Saint-Avertin, Fondettes et Montlouis-sur-Loire. Notre équipe part de Selles-sur-Cher, dans le Loir-et-Cher, le département voisin de l'Indre-et-Loire. Le Cher, la rivière qui traverse Selles, passe aussi à Tours.",
        sources: [],
      },
      {
        question: "Qui vient poser la douche chez moi à Tours ?",
        answer: "Ce sont nos propres installateurs qui posent votre douche : les travaux sont réalisés sans sous-traitance. Douche Senior France fabrique ses douches en France et les installe elle-même, sans intermédiaire. Du devis à la pose, vous avez un seul interlocuteur. L'entreprise est labellisée Handibat et Silverbat pour l'adaptation des salles de bain.",
        sources: [],
      },
      {
        question: "Sous quel délai les travaux peuvent-ils commencer à Tours ?",
        answer: "Comptez 1 à 4 semaines avant le début des travaux, selon l'urgence de votre situation. La pose elle-même dure 1 journée en moyenne. Si vous demandez une aide financière, l'installation a lieu une fois les accords obtenus, car certaines aides se demandent avant les travaux.",
        sources: [],
      },
      {
        question: "Quelle part des travaux MaPrimeAdapt' finance-t-elle pour une douche à Tours ?",
        answer: "MaPrimeAdapt' finance 50 % des travaux d'adaptation pour les revenus modestes et 70 % pour les revenus très modestes, dans la limite d'un plafond de 22 000 € hors taxes. Le remplacement d'une baignoire par une douche fait partie des exemples cités par la fiche officielle.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
        ],
      },
    ],
  },
  {
    slug: "douche-senior-orleans",
    heading: "Questions fréquentes sur la douche senior à Orléans",
    items: [
      {
        question: "Vous déplacez-vous jusqu'à Orléans pour installer une douche senior ?",
        answer: "Oui. Le Loiret fait partie des 5 départements où nous intervenons, et il touche le Loir-et-Cher, où se trouve notre siège de Selles-sur-Cher. À Orléans, nous intervenons dans le centre-ville et à La Source, ainsi qu'à Olivet, Fleury-les-Aubrais, Saran, Saint-Jean-de-Braye, La Chapelle-Saint-Mesmin et Saint-Jean-de-la-Ruelle.",
        sources: [],
      },
      {
        question: "Quel est le prix d'une douche sécurisée à Orléans ?",
        answer: "Une douche sécurisée Douche Senior France coûte entre 4 000 € et 8 000 €, selon les options. Chaque salle de bain est différente et chaque douche est fabriquée sur mesure : seul un devis donne votre prix exact. Il est gratuit et sans engagement, avec une réponse sous 24 h.",
        sources: [],
      },
      {
        question: "Je suis locataire à Orléans, puis-je obtenir une aide pour remplacer ma baignoire par une douche ?",
        answer: "Oui, un locataire du parc privé peut demander MaPrimeAdapt', à condition d'avoir l'accord de son bailleur. L'aide finance 50 % ou 70 % des travaux d'adaptation selon vos revenus, dans la limite de 22 000 € hors taxes. Les autres conditions sont détaillées sur la fiche officielle.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
        ],
      },
      {
        question: "Peut-on choisir la couleur et les dimensions de sa douche ?",
        answer: "Oui, nos douches sont fabriquées sur mesure, aux dimensions de votre salle de bain. Vous choisissez parmi 300 couleurs pour accorder la douche à l'existant, et vous pouvez ajouter un bandeau de mosaïque. Le receveur extra-plat mesure 21 mm d'épaisseur et il est antidérapant (PN 24).",
        sources: [],
      },
    ],
  },
  {
    slug: "douche-senior-chateauroux",
    heading: "Questions fréquentes sur la douche senior à Châteauroux",
    items: [
      {
        question: "Intervenez-vous à Châteauroux et dans les environs ?",
        answer: "Oui, nous intervenons à Châteauroux et autour. Cette page cite le centre-ville, Déols, Saint-Maur, La Martinerie, Saint-Christophe, Touvent, Belle-Isle et Ozans. Notre siège de Selles-sur-Cher se trouve dans le sud du Loir-et-Cher, le département qui touche l'Indre par le nord. Notre usine de fabrication est dans l'Indre, le département de Châteauroux.",
        sources: [],
      },
      {
        question: "Pouvez-vous adapter aussi les WC et le lavabo, en plus de la douche ?",
        answer: "Oui. En plus de la douche sécurisée, nous adaptons le reste de la salle de bain : lavabo à hauteur adaptée avec passage pour un fauteuil, WC surélevés avec barres de maintien, éclairage renforcé, sol antidérapant et porte élargie sans seuil. Le détail figure sur notre page Aménagement salle de bain senior.",
        sources: [],
      },
      {
        question: "À partir de quel âge peut-on demander MaPrimeAdapt' ?",
        answer: "Un propriétaire occupant de 70 ans ou plus peut demander MaPrimeAdapt' sans condition de perte d'autonomie. Les autres cas d'éligibilité sont détaillés sur la fiche officielle. Le montant dépend ensuite de vos revenus : 50 % des travaux pour des revenus modestes, 70 % pour des revenus très modestes.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
        ],
      },
      {
        question: "La douche est-elle utilisable le jour même de la pose ?",
        answer: "Oui. L'installation dure 1 journée et la douche est prête le soir même. Le chantier suit 4 étapes : dépose de la baignoire et évacuation des gravats, pose du receveur extra-plat antidérapant, installation des parois et des équipements de sécurité, puis finitions, raccordements et nettoyage. Votre logement est protégé pendant les travaux.",
        sources: [],
      },
    ],
  },
  {
    slug: "douche-senior-bourges",
    heading: "Questions fréquentes sur la douche senior à Bourges",
    items: [
      {
        question: "Intervenez-vous à Bourges et dans le reste du Cher ?",
        answer: "Oui. À Bourges, nous intervenons dans le centre-ville et dans les secteurs cités sur cette page : Les Gibjoncs, Val d'Auron, Asnières-lès-Bourges, Pignoux, Lahitolle et Mazières, ainsi qu'à Saint-Doulchard. Nous couvrons aussi tout le département du Cher. Deux témoignages publiés sur notre page d'accueil viennent de clients de Bourges et de Vierzon.",
        sources: [],
      },
      {
        question: "Ma douche actuelle est trop étroite, pouvez-vous la remplacer ?",
        answer: "Oui, nous transformons les baignoires, mais aussi les douches existantes, en douche sécurisée. Chaque douche est fabriquée sur mesure, donc à la taille de l'emplacement. Elle reçoit un receveur extra-plat antidérapant, des barres d'appui, une robinetterie thermostatique et un siège si vous le souhaitez.",
        sources: [],
      },
      {
        question: "Faut-il demander les aides avant de commencer les travaux ?",
        answer: "Oui pour certaines aides : la demande doit être déposée avant les travaux. Nous procédons dans cet ordre : devis gratuit détaillé, identification des aides auxquelles vous avez droit, montage et dépôt des dossiers, puis installation une fois les accords obtenus. Cet accompagnement est gratuit.",
        sources: [],
      },
      {
        question: "Les travaux sont-ils couverts par une garantie ?",
        answer: "Oui, notre page d'accueil indique que nos installations sont couvertes par la garantie décennale. Les travaux sont réalisés par nos équipes, sans sous-traitance. L'habillage mural, épais de 13 mm, est posé avec une étanchéité garantie. Douche Senior France est aussi labellisée Handibat et Silverbat.",
        sources: [],
      },
    ],
  },
  {
    slug: "douche-senior-romorantin",
    heading: "Questions fréquentes sur la douche senior à Romorantin et en Sologne",
    items: [
      {
        question: "Votre entreprise est-elle proche de Romorantin ?",
        answer: "Oui. Notre siège est au 147 rue de Romorantin, à Selles-sur-Cher, une commune qui fait partie de notre zone d'intervention en Sologne. Nous intervenons aussi à Romorantin-Lanthenay, Pruniers-en-Sologne, Gièvres, Mennetou-sur-Cher, Villefranche-sur-Cher, Millançay et La Ferté-Beauharnais. Toutes ces communes sont dans le Loir-et-Cher (41), comme notre siège.",
        sources: [],
      },
      {
        question: "Combien d'heures faut-il pour installer une douche sécurisée ?",
        answer: "Il faut 1 journée en moyenne. Dans un témoignage publié sur notre page d'accueil, Mme Moreaux, 76 ans, cliente à Selles-sur-Cher, indique que sa douche sur mesure a été installée en 6 heures. Elle remplaçait une douche devenue trop étroite pour elle.",
        sources: [],
      },
      {
        question: "Ma caisse de retraite peut-elle m'aider à financer une douche ?",
        answer: "Peut-être : certaines caisses de retraite peuvent proposer des aides, il faut vous renseigner auprès de la vôtre. Les anciennes aides de la Cnav pour adapter le logement ont été remplacées par MaPrimeAdapt', l'aide de l'État.",
        sources: [
          { label: "service-public.gouv.fr, fiche F1613 vérifiée le 9 juillet 2025", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1613" },
        ],
      },
      {
        question: "Faut-il prévoir de gros travaux dans la salle de bain ?",
        answer: "Non, la douche est installée en 1 journée, sans gros travaux. Si les murs le demandent, nous posons un habillage mural de 13 mm d'épaisseur, dont l'étanchéité est garantie et que vous pouvez personnaliser. Les gravats sont évacués et la salle de bain est nettoyée en fin de chantier.",
        sources: [],
      },
    ],
  },
  {
    slug: "loir-et-cher",
    heading: "Questions fréquentes sur la douche senior dans le Loir-et-Cher",
    items: [
      {
        question: "Où se trouve Douche Senior France dans le Loir-et-Cher ?",
        answer: "Le siège de Douche Senior France est au 147 rue de Romorantin, 41130 Selles-sur-Cher, dans le sud du département, à deux pas du Zoo de Beauval. L'entreprise répond au 02 54 97 53 23. De là, nous intervenons dans tout le Loir-et-Cher : Blois, Romorantin-Lanthenay, Vendôme, Mer, Saint-Aignan, Vineuil, Lamotte-Beuvron, Contres, Montrichard et les autres communes.",
        sources: [],
      },
      {
        question: "Quel pourcentage des travaux MaPrimeAdapt' prend-elle en charge ?",
        answer: "MaPrimeAdapt' prend en charge 50 % des travaux d'adaptation pour les revenus modestes et 70 % pour les revenus très modestes. Le montant des travaux retenu est plafonné à 22 000 € hors taxes. Le reste est à votre charge.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
        ],
      },
      {
        question: "Douche Senior France fabrique-t-elle ses douches ?",
        answer: "Oui, Douche Senior France est fabricant et installateur. Les douches sont fabriquées en France, dans l'usine de l'entreprise située dans l'Indre, puis posées par ses équipes, sans sous-traitance et sans intermédiaire. Vous avez un seul interlocuteur, du devis à l'installation.",
        sources: [],
      },
      {
        question: "Combien coûte une douche sécurisée dans le Loir-et-Cher ?",
        answer: "La fourchette de prix va de 4 000 € à 8 000 €, selon les options. La douche est fabriquée sur mesure pour votre salle de bain, avec un choix de 300 couleurs. Le devis est gratuit et sans engagement.",
        sources: [],
      },
    ],
  },
  {
    slug: "indre-et-loire",
    heading: "Questions fréquentes sur la douche senior en Indre-et-Loire",
    items: [
      {
        question: "Dans quelles villes d'Indre-et-Loire installez-vous des douches seniors ?",
        answer: "Nous intervenons dans tout le département d'Indre-et-Loire (37). Cette page cite Tours, Joué-lès-Tours, Saint-Cyr-sur-Loire, Saint-Pierre-des-Corps, Amboise, Chinon, Loches, Montlouis-sur-Loire, Chambray-lès-Tours et Ballan-Miré. Notre siège est à Selles-sur-Cher, dans le Loir-et-Cher, le département qui borde l'Indre-et-Loire à l'est. Un témoignage publié sur notre page d'accueil vient d'un client de Tours.",
        sources: [],
      },
      {
        question: "Que garantissent les labels Handibat et Silverbat ?",
        answer: "Le label Handibat indique que l'artisan maîtrise les normes d'accessibilité pour les personnes à mobilité réduite et qu'il a suivi une formation spécialisée dans l'adaptation du logement. Douche Senior France est labellisée Handibat et Silverbat pour les travaux d'adaptation des salles de bain des seniors et des personnes handicapées.",
        sources: [],
      },
      {
        question: "Quels équipements sont compris dans une douche sécurisée ?",
        answer: "Une douche sécurisée comprend un receveur extra-plat antidérapant, des parois en verre trempé ou en acrylique, des barres d'appui murales à fixation renforcée et une robinetterie thermostatique qui évite les brûlures. Le siège de douche, rabattable ou fixe, est en option. Tous ces équipements sont fabriqués en France.",
        sources: [],
      },
      {
        question: "Le devis est-il payant ?",
        answer: "Non, le devis est gratuit et sans engagement. Vous le demandez avec le formulaire du site ou par téléphone au 02 54 97 53 23, et vous recevez une réponse sous 24 h. Il s'appuie sur une étude personnalisée de votre salle de bain.",
        sources: [],
      },
    ],
  },
  {
    slug: "loiret",
    heading: "Questions fréquentes sur la douche senior dans le Loiret",
    items: [
      {
        question: "Intervenez-vous dans tout le Loiret ?",
        answer: "Oui, nous intervenons dans toutes les communes du Loiret (45). Cette page cite Orléans, Montargis, Olivet, Fleury-les-Aubrais, Saran, Gien, Pithiviers, Saint-Jean-de-Braye, Châlette-sur-Loing et La Chapelle-Saint-Mesmin. Un témoignage publié sur notre page d'accueil vient de clients de Beaugency. Notre siège est à Selles-sur-Cher, dans le Loir-et-Cher, département voisin du Loiret.",
        sources: [],
      },
      {
        question: "MaPrimeAdapt' finance-t-elle le remplacement d'une baignoire par une douche ?",
        answer: "Oui. Le remplacement d'une baignoire par une douche est l'exemple de travaux d'adaptation cité par la fiche officielle de MaPrimeAdapt'. L'aide couvre 50 % ou 70 % des travaux selon vos revenus, avec un plafond de 22 000 € hors taxes.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
        ],
      },
      {
        question: "Combien de temps reste-t-on sans salle de bain pendant les travaux ?",
        answer: "Une journée. Votre baignoire est remplacée par une douche de plain-pied sécurisée en une seule journée, et vous pouvez l'utiliser dès le soir même. Dans cette journée, nous déposons la baignoire, nous évacuons les gravats, nous posons le receveur, les parois et les équipements de sécurité, puis nous nettoyons.",
        sources: [],
      },
      {
        question: "Installez-vous des douches accessibles en fauteuil roulant ?",
        answer: "Oui, nous installons des douches PMR, conçues pour les personnes en fauteuil roulant ou qui se déplacent difficilement. L'accès est de plain-pied, avec un seuil de 2 cm au maximum, et la surface prévue est d'au moins 150 x 150 cm pour circuler en fauteuil. Le détail figure sur notre page Installation douche PMR.",
        sources: [],
      },
    ],
  },
  {
    slug: "indre",
    heading: "Questions fréquentes sur la douche senior dans l'Indre",
    items: [
      {
        question: "Dans quelles communes de l'Indre intervenez-vous ?",
        answer: "Nous intervenons dans toutes les communes de l'Indre (36). Cette page cite Châteauroux, Issoudun, Le Blanc, La Châtre, Argenton-sur-Creuse, Buzançais, Déols, Levroux, Valençay et Saint-Maur. Notre siège de Selles-sur-Cher est dans le sud du Loir-et-Cher, près de la limite avec l'Indre.",
        sources: [],
      },
      {
        question: "Où sont fabriquées les douches Douche Senior France ?",
        answer: "Nos douches sont fabriquées en France, dans notre usine située dans l'Indre. Douche Senior France est à la fois fabricant et installateur : il n'y a pas d'intermédiaire entre l'usine et votre salle de bain. Tous les équipements que nous posons sont fabriqués en France.",
        sources: [],
      },
      {
        question: "Combien de temps faut-il attendre entre le devis et la pose ?",
        answer: "Comptez 1 à 4 semaines avant le début des travaux, selon l'urgence. Le devis, gratuit, reçoit une réponse sous 24 h. La pose dure ensuite 1 journée en moyenne. Si vous demandez une aide financière, comptez le temps d'obtenir les accords : l'installation a lieu après.",
        sources: [],
      },
      {
        question: "Peut-on encore déduire une douche senior de ses impôts ?",
        answer: "Non pour des travaux payés en 2026. Le crédit d'impôt de 25 % pour l'adaptation du logement est supprimé pour les dépenses payées à partir du 1er janvier 2026. Seuls les travaux réalisés et facturés avant le 31 décembre 2025 y ouvrent encore droit.",
        sources: [
          { label: "service-public.gouv.fr, fiche F10752 vérifiée le 15 avril 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10752" },
        ],
      },
    ],
  },
  {
    slug: "cher",
    heading: "Questions fréquentes sur la douche senior dans le Cher",
    items: [
      {
        question: "Dans quelles villes du Cher intervenez-vous ?",
        answer: "Nous intervenons dans tout le département du Cher (18). Cette page cite Bourges, Vierzon, Saint-Amand-Montrond, Mehun-sur-Yèvre, Saint-Doulchard, Aubigny-sur-Nère, Saint-Florent-sur-Cher, Dun-sur-Auron, Sancoins et Avord. Notre siège est à Selles-sur-Cher, dans le Loir-et-Cher voisin, sur la rivière qui donne son nom au département du Cher.",
        sources: [],
      },
      {
        question: "Le plafond de MaPrimeAdapt' suffit-il pour une douche sécurisée ?",
        answer: "Oui. MaPrimeAdapt' retient jusqu'à 22 000 € hors taxes de travaux d'adaptation, alors que nos douches sécurisées coûtent entre 4 000 € et 8 000 € selon les options. L'aide finance 50 % ou 70 % de ces travaux selon vos revenus.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
        ],
      },
      {
        question: "Quels sièges et barres d'appui installez-vous dans la douche ?",
        answer: "Nous posons des sièges de douche AKW, rabattables, fixes ou amovibles. Les barres de maintien et les mains courantes sont ergonomiques et fixées de façon renforcée. Leur emplacement est choisi selon vos besoins. La robinetterie est thermostatique, avec une sécurité contre les brûlures.",
        sources: [],
      },
      {
        question: "Une douche à l'italienne se pose-t-elle vraiment en une journée ?",
        answer: "Oui. Dans un témoignage publié sur notre page d'accueil, M. et Mme Callaut, de Vierzon, expliquent que leur douche à l'italienne a été posée en 1 journée, à la place d'une baignoire que Madame ne pouvait plus enjamber. C'est la durée moyenne de nos chantiers.",
        sources: [],
      },
    ],
  },
  {
    slug: "remplacement-baignoire-par-douche",
    heading: "Questions fréquentes sur le remplacement d'une baignoire par une douche",
    items: [
      {
        question: "Combien de temps faut-il pour remplacer une baignoire par une douche ?",
        answer: "Il faut 1 journée. La baignoire est déposée le matin et la douche est prête à utiliser le soir même. Dans cette journée, nous posons le receveur, les parois, les barres d'appui et la robinetterie, puis nous faisons les finitions et le nettoyage.",
        sources: [],
      },
      {
        question: "Combien coûte le remplacement d'une baignoire par une douche sécurisée ?",
        answer: "Le prix se situe entre 4 000 € et 8 000 €, selon les options. Chaque salle de bain est différente et la douche est fabriquée sur mesure : le devis, gratuit, fixe votre prix exact après une visite à domicile.",
        sources: [],
      },
      {
        question: "Le chantier fait-il beaucoup de saleté ?",
        answer: "Votre logement est protégé pendant les travaux. Le chantier se déroule en 4 étapes : dépose complète de la baignoire avec évacuation de tous les gravats, pose du receveur, installation des équipements de sécurité, puis finitions et raccordements de plomberie. Il se termine par un nettoyage complet.",
        sources: [],
      },
      {
        question: "Reste-t-il une marche pour entrer dans la douche ?",
        answer: "L'accès est de plain-pied, sans ressaut, ou avec un ressaut très bas selon la configuration de votre salle de bain. Vous n'avez plus de rebord haut à enjamber. Le receveur extra-plat mesure 21 mm d'épaisseur et sa surface est antidérapante (PN 24).",
        sources: [],
      },
      {
        question: "Quels équipements sont installés avec la douche ?",
        answer: "La douche comprend un receveur extra-plat antidérapant, des parois en verre trempé ou en acrylique, des barres d'appui murales et une robinetterie thermostatique, qui garde une température constante. Un siège rabattable ou fixe peut être ajouté en option. Tous ces équipements sont fabriqués en France.",
        sources: [],
      },
      {
        question: "Quelles aides existent en 2026 pour remplacer une baignoire par une douche ?",
        answer: "L'aide de l'État est MaPrimeAdapt' : elle finance 50 % ou 70 % des travaux selon vos revenus, dans la limite de 22 000 € hors taxes. Le crédit d'impôt de 25 % est supprimé pour les dépenses payées depuis le 1er janvier 2026.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
          { label: "service-public.gouv.fr, fiche F10752 vérifiée le 15 avril 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10752" },
        ],
      },
    ],
  },
  {
    slug: "installation-douche-pmr",
    heading: "Questions fréquentes sur la douche PMR",
    items: [
      {
        question: "Qu'est-ce qu'une douche PMR ?",
        answer: "Une douche PMR (personnes à mobilité réduite) est une douche conçue pour être utilisée par une personne en fauteuil roulant ou qui a du mal à se déplacer. Elle a un accès de plain-pied, une surface assez grande pour manœuvrer un fauteuil, des barres d'appui et un siège de douche.",
        sources: [],
      },
      {
        question: "Quelles sont les dimensions d'une douche accessible en fauteuil roulant ?",
        answer: "Nous prévoyons une surface d'au moins 150 x 150 cm pour qu'un fauteuil roulant puisse circuler. L'accès se fait de plain-pied : aucun ressaut, ou un seuil de 2 cm au maximum. Nos douches PMR sont fabriquées sur mesure, aux dimensions de votre salle de bain et de votre fauteuil.",
        sources: [],
      },
      {
        question: "À quelle hauteur poser le siège de douche et les barres d'appui ?",
        answer: "Le siège de douche, rabattable ou fixe, se pose entre 45 et 50 cm de hauteur. Les barres d'appui sont placées à la position et à la hauteur prévues par les normes PMR, et elles résistent à 150 kg au minimum.",
        sources: [],
      },
      {
        question: "Pourquoi choisir un artisan labellisé Handibat pour une douche PMR ?",
        answer: "Le label Handibat indique que l'artisan maîtrise les normes d'accessibilité PMR et qu'il a suivi une formation spécialisée dans l'adaptation du logement. Il peut donc réaliser des travaux conformes. Douche Senior France est labellisée Handibat et Silverbat, et spécialisée dans les salles de bain des personnes âgées ou handicapées.",
        sources: [],
      },
      {
        question: "MaPrimeAdapt' peut-elle financer une douche PMR ?",
        answer: "Oui, MaPrimeAdapt' finance les travaux d'adaptation du logement : 50 % pour les revenus modestes, 70 % pour les revenus très modestes, dans la limite de 22 000 € hors taxes. Un propriétaire occupant de 70 ans ou plus y a accès sans condition de perte d'autonomie. Les autres cas sont détaillés sur la fiche officielle.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
        ],
      },
    ],
  },
  {
    slug: "amenagement-salle-bain-senior",
    heading: "Questions fréquentes sur l'aménagement d'une salle de bain senior",
    items: [
      {
        question: "Quels aménagements rendent une salle de bain plus sûre pour un senior ?",
        answer: "Six aménagements sont possibles : une douche sécurisée de plain-pied à la place de la baignoire, un lavabo à hauteur adaptée, des WC surélevés, un éclairage renforcé, un sol antidérapant et une porte élargie sans seuil. Des barres d'appui et un siège complètent la douche.",
        sources: [],
      },
      {
        question: "Comment adapter les WC et le lavabo pour une personne âgée ?",
        answer: "Pour les WC, nous posons une cuvette surélevée avec des barres de maintien et un abattant à frein de chute, en gardant un espace de circulation. Pour le lavabo, nous choisissons une hauteur adaptée, un passage pour le fauteuil et une robinetterie ergonomique.",
        sources: [],
      },
      {
        question: "Peut-on élargir la porte, sécuriser le sol et améliorer l'éclairage de la salle de bain ?",
        answer: "Oui. La porte peut être élargie, équipée d'une poignée ergonomique, et son seuil supprimé. Pour l'éclairage, nous posons des spots LED puissants, des interrupteurs accessibles et une veilleuse automatique. Le sol reçoit un revêtement antidérapant, avec une évacuation de l'eau optimisée.",
        sources: [],
      },
      {
        question: "Quelles aides financent l'aménagement d'une salle de bain senior en 2026 ?",
        answer: "MaPrimeAdapt' finance 50 % ou 70 % des travaux d'adaptation selon vos revenus, dans la limite de 22 000 € hors taxes. Le crédit d'impôt de 25 % ne s'applique plus aux dépenses payées depuis le 1er janvier 2026.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
          { label: "service-public.gouv.fr, fiche F10752 vérifiée le 15 avril 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10752" },
        ],
      },
      {
        question: "Comment se passe la visite à domicile et le devis ?",
        answer: "La visite à domicile est gratuite. Nous regardons votre salle de bain et vos besoins, puis vous recevez un devis personnalisé sous 24 h. Vous pouvez la demander avec le formulaire du site ou par téléphone au 02 54 97 53 23. Du devis à l'installation, vous avez un seul interlocuteur.",
        sources: [],
      },
    ],
  },
  {
    slug: "aides-financieres",
    heading: "Questions fréquentes sur les aides pour une douche senior en 2026",
    items: [
      {
        question: "Quelles aides existent en 2026 pour financer une douche senior ?",
        answer: "L'aide principale est MaPrimeAdapt', l'aide de l'État pour adapter son logement. Elle a remplacé les aides de la Cnav. Certaines caisses de retraite peuvent proposer des aides en plus : renseignez-vous auprès de la vôtre.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
          { label: "service-public.gouv.fr, fiche F1613 vérifiée le 9 juillet 2025", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1613" },
        ],
      },
      {
        question: "Quel est le montant de MaPrimeAdapt' pour une douche ?",
        answer: "MaPrimeAdapt' finance 50 % des travaux pour les revenus modestes et 70 % pour les revenus très modestes, dans la limite de 22 000 € hors taxes de travaux. Pour 8 000 € hors taxes de travaux, cela représente 4 000 € ou 5 600 € d'aide.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
        ],
      },
      {
        question: "Qui peut bénéficier de MaPrimeAdapt' ?",
        answer: "Un propriétaire occupant de 70 ans ou plus peut en bénéficier sans condition de perte d'autonomie, si ses revenus sont modestes ou très modestes. Un locataire du parc privé y a droit aussi, avec l'accord de son bailleur. Les autres cas d'éligibilité sont détaillés sur la fiche officielle.",
        sources: [
          { label: "service-public.gouv.fr, fiche F37501 vérifiée le 1er janvier 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37501" },
        ],
      },
      {
        question: "Le crédit d'impôt de 25 % pour l'adaptation du logement existe-t-il encore en 2026 ?",
        answer: "Non. Le crédit d'impôt est supprimé pour les dépenses payées à partir du 1er janvier 2026. Des travaux de douche sécurisée payés en 2026 n'y ouvrent donc plus droit.",
        sources: [
          { label: "service-public.gouv.fr, fiche F10752 vérifiée le 15 avril 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10752" },
        ],
      },
      {
        question: "J'ai fait installer ma douche en 2025, ai-je encore droit au crédit d'impôt ?",
        answer: "Oui, si les travaux ont été réalisés et facturés avant le 31 décembre 2025. Le crédit d'impôt est alors de 25 % des dépenses, dans une limite sur 5 ans de 5 000 € pour une personne seule et de 10 000 € pour un couple.",
        sources: [
          { label: "service-public.gouv.fr, fiche F10752 vérifiée le 15 avril 2026", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10752" },
        ],
      },
      {
        question: "Douche Senior France s'occupe-t-elle des dossiers d'aides ?",
        answer: "Oui, cet accompagnement est gratuit. Nous établissons d'abord un devis détaillé. Nous vous aidons ensuite à identifier les aides auxquelles vous avez droit et à monter vos dossiers, puis nous les transmettons aux organismes. Certaines aides se demandent avant les travaux : la douche est installée une fois les accords obtenus.",
        sources: [],
      },
    ],
  },
];
