import { acceptedAdditions, applyAcceptedAdditions } from "./parityAdditions";
import {
  applyCorrections,
  removeRepeatedBlocks,
  repeatedBlocks,
  textCorrections,
} from "./parityCorrections";

export function buildExpectedText(slug: string, golden: string): string {
  const singleCopy = removeRepeatedBlocks(
    golden.trim(),
    repeatedBlocks.filter((block) => block.page === slug),
  );

  const corrected = applyCorrections(
    singleCopy,
    textCorrections.filter((correction) => correction.page === slug),
  );

  return applyAcceptedAdditions(corrected, acceptedAdditions[slug] ?? []);
}
