import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";
import { composeCityPage } from "../lib/pages/cityPage";
import { fillAllPlaceholders } from "../lib/pages/placeholders";
import type { City, CityTemplate, Page } from "../payload-types";
import {
  type CitySeed,
  citySeed,
  cityTemplateSeed,
} from "./seed/cityTemplateSeed";

type Block = Page["layout"][number];
type CityData = Omit<City, "id" | "updatedAt" | "createdAt">;

interface Difference {
  path: string;
  before: unknown;
  after: unknown;
}

const templateBlocks: Block["blockType"][] = ["hero", "featureCards", "cta"];
const templateZoneFields = [
  "background",
  "heading",
  "showMapIcon",
  "intro",
  "outro",
];
const technicalKeys = ["id", "blockName"];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isEmpty = (value: unknown) =>
  value === null || value === undefined || value === "";

function withoutIds<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(withoutIds) as T;
  }

  if (!isRecord(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== "id")
      .map(([key, child]) => [key, withoutIds(child)]),
  ) as T;
}

function listDifferences(
  before: unknown,
  after: unknown,
  path = "",
): Difference[] {
  if (Array.isArray(before) || Array.isArray(after)) {
    const first = Array.isArray(before) ? before : [];
    const second = Array.isArray(after) ? after : [];
    const length = Math.max(first.length, second.length);

    return Array.from({ length }).flatMap((_, index) =>
      listDifferences(first[index], second[index], `${path}.${index}`),
    );
  }

  if (isRecord(before) || isRecord(after)) {
    const first = isRecord(before) ? before : {};
    const second = isRecord(after) ? after : {};
    const keys = [...new Set([...Object.keys(first), ...Object.keys(second)])];

    return keys
      .filter((key) => !technicalKeys.includes(key))
      .flatMap((key) =>
        listDifferences(first[key], second[key], path ? `${path}.${key}` : key),
      );
  }

  if (before === after || (isEmpty(before) && isEmpty(after))) {
    return [];
  }

  return [{ path, before, after }];
}

function comesFromTemplate(path: string, page: Page): boolean {
  if (path === "navLabel") {
    return true;
  }

  const [root, index, field] = path.split(".");
  const block = root === "layout" ? page.layout[Number(index)] : undefined;

  if (!block) {
    return false;
  }

  if (block.blockType === "zoneList") {
    return templateZoneFields.includes(field ?? "");
  }

  return templateBlocks.includes(block.blockType);
}

const comparable = (page: Page) => ({
  slug: page.slug,
  navLabel: page.navLabel,
  pageType: page.pageType,
  parent: typeof page.parent === "object" ? page.parent?.id : page.parent,
  areaName: page.areaName,
  departmentCode: page.departmentCode,
  seo: page.seo,
  blockTypes: page.layout.map((block) => block.blockType).join(" "),
  layout: page.layout.map((block) =>
    block.blockType === "zoneList" ? { ...block, columns: undefined } : block,
  ),
});

const unlessSame = (
  value: string | null | undefined,
  pattern: string | null | undefined,
) => (value === pattern ? undefined : value);

function toCityData(
  page: Page,
  seed: CitySeed,
  department: Page,
  template: CityTemplate,
): CityData {
  const hero = page.layout.find((block) => block.blockType === "hero");
  const zoneList = page.layout.find((block) => block.blockType === "zoneList");
  const local = page.layout.find((block) => block.blockType === "textSection");
  const faq = page.layout.find((block) => block.blockType === "faq");

  if (!(hero && zoneList && local && faq)) {
    throw new Error(
      `Page ${page.slug} has no hero, zone list, local text or FAQ block, a city record cannot be built from it. Nothing was written: restore the block, then run the migration again`,
    );
  }

  const patterns = fillAllPlaceholders(template, {
    ville: seed.name,
    departement: department.areaName ?? "",
    code: department.departmentCode ?? "",
  });

  return withoutIds({
    name: seed.name,
    slug: page.slug,
    department: department.id,
    areaName: unlessSame(page.areaName, seed.name),
    locationLine: seed.keepsLocalWording
      ? unlessSame(hero.location, patterns.hero.location)
      : undefined,
    zonesHeading: seed.keepsLocalWording
      ? unlessSame(zoneList.heading, patterns.zoneList.heading)
      : undefined,
    zones: zoneList.items,
    extraSections: page.layout.filter(
      (block) =>
        block.blockType === "testimonial" ||
        block.blockType === "serviceCards" ||
        block.blockType === "aidCards",
    ),
    localSection: {
      background: local.background,
      heading: local.heading,
      paragraphs: local.paragraphs,
    },
    faq: { background: faq.background, heading: faq.heading, items: faq.items },
    seo: {
      title: unlessSame(page.seo.title, patterns.seo.title),
      description: unlessSame(page.seo.description, patterns.seo.description),
    },
  });
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const notes: string[] = [];
  const context = { disableRevalidate: true, allowSharedSlug: true };
  const templateRows = await db.execute(sql`select id from city_template`);

  if (templateRows.rows.length === 0) {
    await payload.updateGlobal({
      slug: "cityTemplate",
      data: cityTemplateSeed,
      depth: 0,
      req,
      context,
    });
    notes.push("city page template created");
  } else {
    notes.push("city page template already exists, left as is");
  }

  const template = await payload.findGlobal({
    slug: "cityTemplate",
    depth: 0,
    req,
  });
  const { docs: pages } = await payload.find({
    collection: "pages",
    limit: 0,
    pagination: false,
    depth: 0,
    req,
  });
  const unexpected = pages.filter(
    (page) =>
      page.pageType === "city" &&
      !citySeed.some((seed) => seed.slug === page.slug),
  );

  if (unexpected.length > 0) {
    throw new Error(
      `City page(s) ${unexpected.map((page) => page.slug).join(", ")} are not among the 6 this migration converts. Nothing was written: create their city record in the CMS and delete these pages, or add them to migrations/seed/cityTemplateSeed.ts, then run the migration again`,
    );
  }

  for (const seed of citySeed) {
    const page = pages.find((candidate) => candidate.slug === seed.slug);
    const existing = await payload.count({
      collection: "cities",
      where: { slug: { equals: seed.slug } },
      req,
    });

    if (existing.totalDocs > 0) {
      notes.push(
        page
          ? `${seed.slug} is already a city record, the page document of the same address was left as is`
          : `${seed.slug} is already a city record`,
      );
      continue;
    }

    if (!page) {
      notes.push(`${seed.slug} skipped: there is no page document to convert`);
      continue;
    }

    if (page.pageType !== "city") {
      notes.push(
        `${seed.slug} skipped: its page document is no longer a city page`,
      );
      continue;
    }

    const department = pages.find(
      (candidate) =>
        candidate.id === page.parent && candidate.pageType === "department",
    );

    if (!department) {
      throw new Error(
        `Page ${seed.slug} has no department page as parent, a city record cannot be built from it. Nothing was written: set its department, then run the migration again`,
      );
    }

    const created = await payload.create({
      collection: "cities",
      data: toCityData(page, seed, department, template),
      depth: 0,
      req,
      context,
    });
    const city = await payload.findByID({
      collection: "cities",
      id: created.id,
      depth: 0,
      req,
    });
    const composed = composeCityPage({ template, city, department });

    if (!composed) {
      throw new Error(
        `City record ${seed.slug} cannot be rendered with the template. Nothing was written: check the city page template, then run the migration again`,
      );
    }

    const differences = listDifferences(comparable(page), comparable(composed));
    const losses = differences.filter(
      ({ path }) => !comesFromTemplate(path, page),
    );

    if (losses.length > 0) {
      throw new Error(
        `City record ${seed.slug} does not hold everything its page document holds (${losses.map(({ path }) => path).join(", ")}). Nothing was written and no page was removed: the page was changed in a way a city record cannot store`,
      );
    }

    await payload.delete({
      collection: "pages",
      id: page.id,
      depth: 0,
      req,
      context,
    });

    notes.push(
      `${seed.slug} converted: city record written and checked against its page document, then the page document, created by this same release and holding no client data, was removed`,
    );

    for (const { path, before, after } of differences) {
      notes.push(
        `${seed.slug} now uses the template wording for ${path}: ${JSON.stringify(before ?? "")} becomes ${JSON.stringify(after ?? "")}`,
      );
    }
  }

  for (const note of notes) {
    payload.logger.info(`city_pages_from_template: ${note}`);
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The city_pages_from_template migration cannot be reverted: the city records and the template cannot be turned back into page documents without losing what editors changed since. Restore the database from a backup instead",
  );
}
