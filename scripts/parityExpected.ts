import { acceptedAdditions, applyAcceptedAdditions } from "./parityAdditions";
import {
  citySectionAdditions,
  cityWordingCorrections,
} from "./parityCityWording";
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

  const completed = applyAcceptedAdditions(
    corrected,
    acceptedAdditions[slug] ?? [],
  );

  const withSharedSections = applyAcceptedAdditions(
    completed,
    citySectionAdditions[slug] ?? [],
  );

  return applyCorrections(
    withSharedSections,
    cityWordingCorrections.filter((correction) => correction.page === slug),
  );
}
