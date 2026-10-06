import type { Page } from "../../payload-types";

export interface PageLink {
  label: string;
  href: string;
}

const toLink = (page: Page): PageLink => ({
  label: page.navLabel,
  href: `/${page.slug}`,
});

const parentOf = (page: Page, all: Page[]): Page | undefined => {
  const parent = page.parent;

  if (parent === null || parent === undefined) {
    return undefined;
  }

  const parentId = typeof parent === "object" ? parent.id : parent;

  return all.find((candidate) => candidate.id === parentId);
};

export function getBreadcrumb(page: Page, all: Page[]): PageLink[] {
  const parent = parentOf(page, all);
  const trail = parent ? [toLink(parent)] : [];

  return [{ label: "Accueil", href: "/" }, ...trail, toLink(page)];
}

export function getDepartmentLinks(all: Page[]): PageLink[] {
  return all.filter((page) => page.pageType === "department").map(toLink);
}

export function getCityLinks(all: Page[]): PageLink[] {
  return all.filter((page) => page.pageType === "city").map(toLink);
}

export function getRelatedLinks(page: Page, all: Page[]): PageLink[] {
  const others = all.filter((candidate) => candidate.id !== page.id);
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

    return [...(parent ? [parent] : []), ...siblings, ...services].map(toLink);
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

    return [...cities, ...services].map(toLink);
  }

  const services = others.filter(
    (candidate) => candidate.pageType === "service",
  );
  const departments = others.filter(
    (candidate) => candidate.pageType === "department",
  );

  return [...services, ...departments].map(toLink);
}
