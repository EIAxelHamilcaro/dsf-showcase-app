import type { Page } from "../../payload-types";

export interface MentionTarget {
  term: string;
  href: string;
}

export interface MentionLink {
  label: string;
  href: string;
}

export type TextSegment = string | MentionLink;

export interface MentionLinker {
  link: (text: string) => TextSegment[];
  hrefOf: (name: string) => string | undefined;
}

const riverNames: readonly string[] = ["Cher", "Indre", "Loir", "Loire"];
const wordCharacter = /[\p{L}\p{N}-]/u;

const isWholeWord = (text: string, start: number, end: number) =>
  !wordCharacter.test(text.charAt(start - 1)) &&
  !wordCharacter.test(text.charAt(end));

export function getMentionTargets(all: Page[]): MentionTarget[] {
  return all
    .filter(
      (page) => page.pageType === "city" || page.pageType === "department",
    )
    .flatMap((page) => {
      const term = page.areaName?.trim();

      return term && !riverNames.includes(term)
        ? [{ term, href: `/${page.slug}` }]
        : [];
    })
    .sort((first, second) => second.term.length - first.term.length);
}

const findMention = (text: string, term: string, from: number) => {
  let start = text.indexOf(term, from);

  while (start !== -1 && !isWholeWord(text, start, start + term.length)) {
    start = text.indexOf(term, start + 1);
  }

  return start;
};

export function createMentionLinker(
  targets: MentionTarget[],
  currentHref: string,
): MentionLinker {
  const linkable = targets.filter((target) => target.href !== currentHref);
  const linked = new Set<string>();

  const link = (text: string): TextSegment[] => {
    const mention = linkable
      .filter((target) => !linked.has(target.href))
      .map((target) => ({ target, start: findMention(text, target.term, 0) }))
      .filter(({ start }) => start !== -1)
      .sort((first, second) => first.start - second.start)[0];

    if (!mention) {
      return [text];
    }

    const { target, start } = mention;
    const end = start + target.term.length;

    linked.add(target.href);

    return [
      text.slice(0, start),
      { label: target.term, href: target.href },
      text.slice(end),
    ].filter((segment) => segment !== "");
  };

  const hrefOf = (name: string) =>
    linkable.find((target) => target.term === name.trim())?.href;

  return { link, hrefOf };
}
