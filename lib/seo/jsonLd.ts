import type { Config1, Page } from "../../payload-types";
import { getPageHeading } from "../pages/pageHeading";
import { getBreadcrumb } from "../pages/pageLinks";
import { businessFacts, homeSeo, siteName, siteRegion, siteUrl } from "../site";
import { toE164 } from "./phone";
import { computeAggregateRating, getRatedReviews } from "./reviews";

type Node = Record<string, unknown>;

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": Node[];
}

export interface HomeGraphInput {
  all: Page[];
  config: Config1;
}

export interface PageGraphInput {
  page: Page;
  all: Page[];
  config: Config1;
}

const businessId = `${siteUrl}/#business`;
const websiteId = `${siteUrl}/#website`;
const language = "fr-FR";

const clean = (value: string | null | undefined): string | undefined => {
  const normalized = value?.replace(/\s+/g, " ").trim();

  return normalized ? normalized : undefined;
};

const compact = (node: Node): Node =>
  Object.fromEntries(
    Object.entries(node).filter(([, value]) => value !== undefined),
  );

const isNode = (node: Node | undefined): node is Node => node !== undefined;

const absolute = (href: string) => `${siteUrl}${href}`;

const regionArea = (): Node => ({
  "@type": "AdministrativeArea",
  name: siteRegion,
});

function departmentArea(page: Page): Node | undefined {
  const name = clean(page.areaName);

  if (!name) {
    return undefined;
  }

  return compact({
    "@type": "AdministrativeArea",
    name,
    identifier: clean(page.departmentCode),
  });
}

function buildAddress(config: Config1): Node | undefined {
  const legal = config.legal_section;
  const streetAddress = clean(legal?.street_address);
  const postalCode = clean(legal?.postal_code);
  const addressLocality = clean(legal?.locality);

  if (!(streetAddress && postalCode && addressLocality)) {
    return undefined;
  }

  return {
    "@type": "PostalAddress",
    streetAddress,
    postalCode,
    addressLocality,
    addressRegion: siteRegion,
    addressCountry: "FR",
  };
}

function buildRatingNodes(config: Config1): Node {
  const aggregate = computeAggregateRating(config);
  const reviews = getRatedReviews(config);

  return {
    aggregateRating: aggregate
      ? {
          "@type": "AggregateRating",
          ratingValue: aggregate.ratingValue,
          reviewCount: aggregate.reviewCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    review:
      reviews.length > 0
        ? reviews.map((review) =>
            compact({
              "@type": "Review",
              author: { "@type": "Person", name: clean(review.author) },
              reviewBody: clean(review.text),
              datePublished: review.date,
              reviewRating: {
                "@type": "Rating",
                ratingValue: review.rating,
                bestRating: 5,
                worstRating: 1,
              },
            }),
          )
        : undefined,
  };
}

function buildBusiness(
  config: Config1,
  all: Page[],
  withRatings: boolean,
): Node {
  const legal = config.legal_section;
  const siren = clean(legal?.siren);
  const address = buildAddress(config);
  const sameAs = [
    businessFacts.facebookUrl,
    clean(config.google_profile_url),
  ].filter((url): url is string => url !== undefined);
  const departments = all
    .filter((page) => page.pageType === "department")
    .map(departmentArea)
    .filter(isNode);

  return compact({
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": businessId,
    name: siteName,
    legalName: clean(legal?.legal_name),
    taxID: siren,
    identifier: siren
      ? { "@type": "PropertyValue", propertyID: "SIREN", value: siren }
      : undefined,
    url: absolute("/"),
    description: businessFacts.description,
    logo: absolute(businessFacts.logoPath),
    image: absolute(businessFacts.logoPath),
    telephone: toE164(config.phone),
    email: clean(config.email),
    address,
    geo: address
      ? {
          "@type": "GeoCoordinates",
          latitude: businessFacts.latitude,
          longitude: businessFacts.longitude,
        }
      : undefined,
    areaServed: [regionArea(), ...departments],
    sameAs,
    ...(withRatings ? buildRatingNodes(config) : {}),
  });
}

function buildWebsite(): Node {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: absolute("/"),
    name: siteName,
    inLanguage: language,
    publisher: { "@id": businessId },
  };
}

interface FaqEntry {
  question?: string | null;
  answer?: string | null;
  sources?: { label?: string | null }[] | null;
}

function buildFaq(entries: FaqEntry[], url: string): Node | undefined {
  const questions = entries.flatMap((entry) => {
    const name = clean(entry.question);
    const answer = clean(entry.answer);

    if (!(name && answer)) {
      return [];
    }

    const sources = (entry.sources ?? []).flatMap((source) => {
      const label = clean(source.label);

      return label ? [`Source : ${label}`] : [];
    });

    return [
      {
        "@type": "Question",
        name,
        acceptedAnswer: {
          "@type": "Answer",
          text: [answer, ...sources].join(" "),
        },
      },
    ];
  });

  if (questions.length === 0) {
    return undefined;
  }

  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: language,
    isPartOf: { "@id": `${url}#webpage` },
    mainEntity: questions,
  };
}

function areaServedOf(page: Page): Node | undefined {
  if (page.pageType === "service") {
    return regionArea();
  }

  if (page.pageType === "department") {
    return departmentArea(page);
  }

  const name = clean(page.areaName);

  if (page.pageType !== "city" || !name) {
    return undefined;
  }

  return { "@type": "City", name };
}

export function buildHomeGraph({ all, config }: HomeGraphInput): JsonLdGraph {
  const url = absolute("/");
  const latest = all
    .map((page) => page.updatedAt)
    .sort()
    .at(-1);

  const webPage: Node = compact({
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: homeSeo.title,
    description: homeSeo.description,
    inLanguage: language,
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    dateModified: config.updatedAt ?? latest,
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBusiness(config, all, true),
      buildWebsite(),
      webPage,
      buildFaq(config.faq_section?.faq ?? [], url),
    ].filter(isNode),
  };
}

export function buildPageGraph({
  page,
  all,
  config,
}: PageGraphInput): JsonLdGraph {
  const url = absolute(`/${page.slug}`);
  const trail = getBreadcrumb(page, all);

  const breadcrumb: Node = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: trail.map((link, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: link.label,
      item: absolute(link.href),
    })),
  };

  const webPage: Node = compact({
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: clean(page.seo.title),
    description: clean(page.seo.description),
    inLanguage: language,
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    dateModified: page.updatedAt,
  });

  const service: Node | undefined =
    page.pageType === "legal"
      ? undefined
      : compact({
          "@type": "Service",
          "@id": `${url}#service`,
          name: clean(getPageHeading(page)),
          serviceType: businessFacts.serviceTypeName,
          description: clean(page.seo.description),
          provider: { "@id": businessId },
          areaServed: areaServedOf(page),
          url,
        });

  const faqEntries = page.layout.flatMap((block) =>
    block.blockType === "faq" ? block.items : [],
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBusiness(config, all, false),
      buildWebsite(),
      webPage,
      breadcrumb,
      service,
      buildFaq(faqEntries, url),
    ].filter(isNode),
  };
}
