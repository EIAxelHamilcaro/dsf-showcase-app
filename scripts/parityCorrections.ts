import {
  homeCorrections,
  pageDetailRemovals,
  pageFieldCorrections,
} from "../migrations/seed/taxCreditCorrections";

export interface TextCorrection {
  ref: string;
  page: string;
  from: string;
  to: string;
}

export const textCorrections: TextCorrection[] = [
  ...pageFieldCorrections.map(({ ref, slug, from, to }) => ({
    ref,
    page: slug,
    from,
    to,
  })),
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
