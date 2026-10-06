import type { Page } from "../../payload-types";

export interface PageLink {
  label: string;
  href: string;
}

const toLinks = (pages: Page[]): PageLink[] =>
  pages.flatMap((page) => {
    const label = page.navLabel.replace(/\s+/g, " ").trim();

    return label ? [{ label, href: `/${page.slug}` }] : [];
  });

const parentOf = (page: Page, all: Page[]): Page | undefined => {
  const parent = page.parent;

  if (page.pageType !== "city" || parent === null || parent === undefined) {
    return undefined;
  }

  const parentId = typeof parent === "object" ? parent.id : parent;

  return all.find(
    (candidate) =>
      candidate.id === parentId && candidate.pageType === "department",
  );
};

export function getBreadcrumb(page: Page, all: Page[]): PageLink[] {
  const parent = parentOf(page, all);
  const trail = parent ? [parent, page] : [page];

  return [{ label: "Accueil", href: "/" }, ...toLinks(trail)];
}

export function getDepartmentLinks(all: Page[]): PageLink[] {
  return toLinks(all.filter((page) => page.pageType === "department"));
}

export function getCityLinks(all: Page[]): PageLink[] {
  return toLinks(all.filter((page) => page.pageType === "city"));
}

export function getLegalLinks(all: Page[]): PageLink[] {
  return toLinks(all.filter((page) => page.pageType === "legal"));
}

export function getRelatedLinks(page: Page, all: Page[]): PageLink[] {
  const others = all.filter((candidate) => candidate.slug !== page.slug);
  const parent = parentOf(page, all);

  if (page.pageType === "city") {
    const siblings = others.filter(
      (candidate) =>
        candidate.pageType === "city" &&
        parentOf(candidate, all)?.id === parent?.id,
    );
    const services = others.filter(
      (candidate) => candidate.pageType === "service",
    );

    return toLinks([...(parent ? [parent] : []), ...siblings, ...services]);
  }

  if (page.pageType === "department") {
    const cities = others.filter(
      (candidate) =>
        candidate.pageType === "city" &&
        parentOf(candidate, all)?.id === page.id,
    );
    const services = others.filter(
      (candidate) => candidate.pageType === "service",
    );

    return toLinks([...cities, ...services]);
  }

  const services = others.filter(
    (candidate) => candidate.pageType === "service",
  );
  const departments = others.filter(
    (candidate) => candidate.pageType === "department",
  );

  return toLinks([...services, ...departments]);
}
