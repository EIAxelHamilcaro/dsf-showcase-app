export interface AcceptedAddition {
  after: string;
  text: string;
}

export const ignoredNavLabels: string[] = [
  "Fil d'Ariane",
  "Pages liées",
  "Villes desservies",
];

export const acceptedAdditions: Record<string, AcceptedAddition[]> = {
  home: [
    {
      after: "Pourquoi opter pour une douche Senior ?",
      text: "Les douches Sécurisées Séniors sont spécialement fabriquées pour transformer une baignoire en douche sécurisée sans ressaut. Il devient beaucoup plus difficile d'enjamber ou de sortir d'une baignoire quand on prend de l'âge, et le risque de chute est élevé.",
    },
    {
      after: "Quelle est le délai pour obtenir un devis et est-il gratuit ?",
      text: "Tout nos devis sont gratuit et sans engagement. Nous traitons toutes nos demandes de devis sous 12h et nous faisons votre étude de faisabilité sous 1 semaine.",
    },
    {
      after: "Quelle est le prix d'une douche sécurisée ?",
      text: "Chaque salle de bain est différente, et nos douches sont fabriquées sur mesure et nous avons un choix parmi 300 couleurs, pour vous proposer une douche qui s'adapte parfaitement aux couleurs existante de votre salle de bain. La fourchette de prix se situe entre 4000€ et 8000€ (selon les Options)",
    },
    {
      after: "Vous déplacez vous sur toute la France ?",
      text: "Malheureusement non, Nous avons notre usine de fabrication dans l'Indre et notre siège social est basée dans le Loir et Cher. Nous privilégions notre région et la proximité de nos clients. Nous rayonnons sur tous les départements de la région Centre Val de Loir, c'est à dire les départements de l'Indre, L'indre et Loir, Le Loir et Cher, Le Loiret et le Cher.",
    },
  ],
};

export function applyAcceptedAdditions(
  golden: string,
  additions: AcceptedAddition[],
): string {
  return additions.reduce((text, addition) => {
    const occurrences = text.split(addition.after).length - 1;

    if (occurrences !== 1) {
      throw new Error(
        `The anchor "${addition.after}" must appear exactly once in the golden text, found ${occurrences}`,
      );
    }

    return text.replace(
      addition.after,
      () => `${addition.after} ${addition.text}`,
    );
  }, golden);
}
