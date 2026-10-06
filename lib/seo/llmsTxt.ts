import type { Config1, Page } from "../../payload-types";
import { getPageHeading } from "../pages/pageHeading";
import { businessFacts, siteName, siteRegion, siteUrl } from "../site";
import { getHomeSeo } from "./homeSeo";

interface LlmsTxtInput {
  pages: Page[];
  config: Config1;
}

interface Section {
  title: string;
  pageType: Page["pageType"];
}

const sections: readonly Section[] = [
  { title: "Services", pageType: "service" },
  { title: "Départements", pageType: "department" },
  { title: "Villes", pageType: "city" },
  { title: "Informations légales", pageType: "legal" },
];

const oneLine = (text: string | null | undefined): string =>
  (text ?? "").replace(/\s+/g, " ").trim();

const link = (label: string, url: string, description: string): string =>
  `- [${oneLine(label)}](${url}): ${oneLine(description)}`;

const pageLine = (page: Page): string =>
  link(getPageHeading(page), `${siteUrl}/${page.slug}`, page.seo.description);

const labelled = (label: string, value: string): string[] =>
  value ? [`- ${label} : ${value}`] : [];

function contactLines(config: Config1): string[] {
  const legal = config.legal_section;
  const legalName = oneLine(legal?.legal_name);
  const legalForm = oneLine(legal?.legal_form);
  const company =
    legalName && legalForm ? `${legalName} (${legalForm})` : legalName;
  const address = [legal?.street_address, legal?.postal_code, legal?.locality]
    .map(oneLine)
    .filter(Boolean)
    .join(" ");

  return [
    ...labelled("Raison sociale", company),
    ...labelled("SIREN", oneLine(legal?.siren)),
    ...labelled("Adresse", address),
    ...labelled("Téléphone", oneLine(config.phone)),
    ...labelled("Email", oneLine(config.email)),
  ];
}

export function buildLlmsTxt({ pages, config }: LlmsTxtInput): string {
  const pageSections = sections.flatMap(({ title, pageType }) => {
    const lines = pages
      .filter((page) => page.pageType === pageType)
      .map(pageLine);

    return lines.length > 0 ? [`## ${title}`, "", ...lines, ""] : [];
  });
  const contact = contactLines(config);
  const home = getHomeSeo(config);

  const lines = [
    `# ${siteName}`,
    "",
    `> ${businessFacts.description} en ${siteRegion}.`,
    "",
    "## Accueil",
    "",
    link(home.title, siteUrl, home.description),
    "",
    ...pageSections,
    ...(contact.length > 0 ? ["## Contact", "", ...contact, ""] : []),
  ];

  return `${lines.join("\n").trimEnd()}\n`;
}
