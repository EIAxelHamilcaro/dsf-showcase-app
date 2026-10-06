import type { Page } from "../../payload-types";

const elisionPattern = /['’]$/;

export const followsElision = (titleBefore: string) =>
  elisionPattern.test(titleBefore);

export function getPageHeading(page: Page): string {
  const hero = page.layout.find((block) => block.blockType === "hero");

  if (!hero) {
    return page.navLabel.trim();
  }

  const gap = followsElision(hero.titleBefore) ? "" : " ";
  const after = hero.titleAfter ? ` ${hero.titleAfter}` : "";
  const heading = `${hero.titleBefore}${gap}${hero.titleHighlight}${after}`
    .replace(/\s+/g, " ")
    .trim();

  return heading || page.navLabel.trim();
}
