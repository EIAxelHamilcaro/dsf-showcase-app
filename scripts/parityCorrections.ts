import { pageTextFixes } from "../migrations/seed/reviewFixesSeed";
import {
  homeCorrections,
  type PageFieldCorrection,
  pageDetailRemovals,
  pageFieldCorrections,
} from "../migrations/seed/taxCreditCorrections";

export interface TextCorrection {
  ref: string;
  page: string;
  from: string;
  to: string;
}

const removedFormLabels: TextCorrection[] = [
  {
    ref: "G1",
    page: "home",
    from: "Formulaire de contact website",
    to: "Formulaire de contact",
  },
];

export interface RepeatedBlock {
  ref: string;
  page: string;
  firstWords: string;
}

export const repeatedBlocks: RepeatedBlock[] = [
  {
    ref: "G2",
    page: "home",
    firstWords: "M M. et Mme Chevy",
  },
];

const followUpOf = (correction: PageFieldCorrection) =>
  pageTextFixes.find(
    (fix) =>
      fix.slug === correction.slug &&
      fix.field === correction.field &&
      fix.from === correction.to,
  );

const followUps = pageFieldCorrections.flatMap(
  (correction) => followUpOf(correction) ?? [],
);

export const textCorrections: TextCorrection[] = [
  ...pageFieldCorrections.map((correction) => {
    const followUp = followUpOf(correction);

    return {
      ref: followUp ? `${correction.ref}+${followUp.ref}` : correction.ref,
      page: correction.slug,
      from: correction.from,
      to: followUp?.to ?? correction.to,
    };
  }),
  ...pageTextFixes
    .filter((fix) => !followUps.includes(fix))
    .map(({ ref, slug, from, to }) => ({ ref, page: slug, from, to })),
  ...pageDetailRemovals.map(({ ref, slug, label, text }) => ({
    ref,
    page: slug,
    from: `${label} ${text}`,
    to: "",
  })),
  ...homeCorrections.map(({ ref, from, to }) => ({
    ref,
    page: "home",
    from,
    to,
  })),
  ...removedFormLabels,
];

export function applyCorrections(
  golden: string,
  corrections: TextCorrection[],
): string {
  for (const correction of corrections) {
    const occurrences = golden.split(correction.from).length - 1;

    if (occurrences !== 1) {
      throw new Error(
        `Correction ${correction.ref}: "${correction.from}" must appear exactly once in the captured text of ${correction.page}, found ${occurrences}`,
      );
    }
  }

  return corrections
    .reduce(
      (text, correction) => text.replace(correction.from, () => correction.to),
      golden,
    )
    .replace(/\s+/g, " ")
    .trim();
}

export function removeRepeatedBlocks(
  golden: string,
  blocks: RepeatedBlock[],
): string {
  return blocks.reduce((text, block) => {
    const starts = text.split(block.firstWords).length - 1;

    if (starts !== 2) {
      throw new Error(
        `Repeated block ${block.ref}: "${block.firstWords}" must start exactly two copies in the captured text of ${block.page}, found ${starts}`,
      );
    }

    const first = text.indexOf(block.firstWords);
    const second = text.indexOf(block.firstWords, first + 1);
    const copy = text.slice(first, second);
    const afterSecond = second + copy.length;

    if (text.slice(second, afterSecond) !== copy) {
      throw new Error(
        `Repeated block ${block.ref}: the second copy differs from the first in the captured text of ${block.page}`,
      );
    }

    return text.slice(0, second) + text.slice(afterSecond);
  }, golden);
}
