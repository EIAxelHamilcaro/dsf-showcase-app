import { faqSeed } from "../migrations/seed/faqSeed";
import { localTextSeed } from "../migrations/seed/localTextSeed";
import { pagesSeed } from "../migrations/seed/pagesSeed";
import { faqFixes } from "../migrations/seed/reviewFixesSeed";

export type AcceptedAddition =
  | { after: string; text: string }
  | { before: string; text: string };

export const ignoredNavLabels: string[] = [
  "Fil d'Ariane",
  "Pages liées",
  "Villes desservies",
];

function reviewedFaqText(slug: string, field: string, text: string): string {
  const fix = faqFixes.find(
    (candidate) =>
      candidate.slug === slug &&
      candidate.field === field &&
      candidate.from === text,
  );

  return fix?.to ?? text;
}

function turnkeyAdditions(): Record<string, AcceptedAddition[]> {
  return Object.fromEntries(
    faqSeed.map((faq) => {
      const page = pagesSeed.find((seed) => seed.slug === faq.slug);
      const closing = page?.layout.at(-1);

      if (closing?.blockType !== "cta") {
        throw new Error(`No closing call to action seeded for ${faq.slug}`);
      }

      const local = localTextSeed.find((seed) => seed.slug === faq.slug);
      const localTexts = local ? [local.heading, ...local.paragraphs] : [];
      const faqTexts = faq.items.flatMap((item) => [
        reviewedFaqText(faq.slug, "question", item.question),
        reviewedFaqText(faq.slug, "answer", item.answer),
        ...item.sources.map((source) => `Source : ${source.label}`),
      ]);

      return [
        faq.slug,
        [
          {
            before: `${closing.heading} ${closing.text}`,
            text: [...localTexts, faq.heading, ...faqTexts].join(" "),
          },
        ],
      ];
    }),
  );
}

export const acceptedAdditions: Record<string, AcceptedAddition[]> = {
  ...turnkeyAdditions(),
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
    const anchor = "after" in addition ? addition.after : addition.before;
    const occurrences = text.split(anchor).length - 1;

    if (occurrences !== 1) {
      throw new Error(
        `The anchor "${anchor}" must appear exactly once in the golden text, found ${occurrences}`,
      );
    }

    return text.replace(anchor, () =>
      "after" in addition
        ? `${anchor} ${addition.text}`
        : `${addition.text} ${anchor}`,
    );
  }, golden);
}
