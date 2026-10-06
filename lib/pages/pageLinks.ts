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

export function getServiceLinks(all: Page[]): PageLink[] {
  return toLinks(all.filter((page) => page.pageType === "service"));
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
  const ofType = (pageType: Page["pageType"]) =>
    others.filter((candidate) => candidate.pageType === pageType);
  const services = ofType("service");
  const departments = ofType("department");
  const cities = ofType("city");

  if (page.pageType === "city") {
    const parent = parentOf(page, all);
    const isSibling = (city: Page) =>
      parent !== undefined && parentOf(city, all)?.id === parent.id;

    return toLinks([
      ...(parent ? [parent] : []),
      ...cities.filter(isSibling),
      ...services,
      ...cities.filter((city) => !isSibling(city)),
    ]);
  }

  if (page.pageType === "department") {
    const isOwnCity = (city: Page) => parentOf(city, all)?.id === page.id;

    return toLinks([...cities.filter(isOwnCity), ...services, ...departments]);
  }

  return toLinks([...services, ...departments, ...cities]);
}
