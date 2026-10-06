import { acceptedAdditions, applyAcceptedAdditions } from "./parityAdditions";
import { applyCorrections, textCorrections } from "./parityCorrections";

export function buildExpectedText(slug: string, golden: string): string {
  const corrected = applyCorrections(
    golden.trim(),
    textCorrections.filter((correction) => correction.page === slug),
  );

  return applyAcceptedAdditions(corrected, acceptedAdditions[slug] ?? []);
}
