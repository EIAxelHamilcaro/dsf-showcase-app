import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";
import type { CityTemplate } from "../payload-types";
import {
  originalSearchTexts,
  sharedSectionsSource,
  templateWording,
} from "./seed/cityModelSeed";
import { cityTemplateSeed } from "./seed/cityTemplateSeed";

type SharedSection = "serviceCards" | "aidCards";

const sharedSections: SharedSection[] = ["serviceCards", "aidCards"];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isEmpty = (value: unknown) =>
  value === null || value === undefined || value === "";

const same = (first: unknown, second: unknown) =>
  first === second || (isEmpty(first) && isEmpty(second));

function holderOf(
  root: unknown,
  path: string,
): { holder: Record<string, unknown>; key: string } | undefined {
  const keys = path.split(".");
  const key = keys.pop() ?? "";
  const holder = keys.reduce<unknown>(
    (value, step) =>
      Array.isArray(value)
        ? value[Number(step)]
        : isRecord(value)
          ? value[step]
          : undefined,
    root,
  );

  return isRecord(holder) ? { holder, key } : undefined;
}

const valueAt = (root: unknown, path: string) => {
  const found = holderOf(root, path);

  return found?.holder[found.key];
};

function asTemplatePart<T>(value: T, cityName: string): T {
  if (typeof value === "string") {
    return value.replaceAll(cityName, "{ville}") as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => asTemplatePart(item, cityName)) as T;
  }

  if (!isRecord(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !["id", "blockName", "blockType"].includes(key))
      .map(([key, child]) => [key, asTemplatePart(child, cityName)]),
  ) as T;
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const notes: string[] = [];
  const context = { disableRevalidate: true };
  const templateRows = await db.execute(sql`select id from city_template`);

  if (templateRows.rows.length === 0) {
    throw new Error(
      "The city page template does not exist, it should have been created by city_pages_from_template. Nothing was written: run that migration first",
    );
  }

  const stored = await payload.findGlobal({
    slug: "cityTemplate",
    depth: 0,
    req,
  });
  const {
    id: _id,
    updatedAt: _updatedAt,
    createdAt: _createdAt,
    ...fields
  } = structuredClone(stored);
  const template: Omit<CityTemplate, "id" | "updatedAt" | "createdAt"> = fields;
  let templateChanged = false;

  const isUntouched = (path: string) =>
    same(valueAt(stored, path), valueAt(cityTemplateSeed, path));

  for (const { path, to, onlyWith } of templateWording) {
    const target = holderOf(template, path);
    const current = target?.holder[target.key];

    if (target && isUntouched(path) && isUntouched(onlyWith ?? path)) {
      target.holder[target.key] = to;
      templateChanged = true;
      notes.push(`template ${path} set to ${JSON.stringify(to)}`);
      continue;
    }

    notes.push(
      current === to
        ? `template ${path} already holds the shared wording`
        : `template ${path} left as is: it was edited since`,
    );
  }

  const sources = await payload.find({
    collection: "cities",
    where: { slug: { equals: sharedSectionsSource } },
    limit: 1,
    depth: 0,
    req,
  });
  const [source] = sources.docs;
  const moved: SharedSection[] = [];

  for (const section of sharedSections) {
    if (!isEmpty(template[section]?.heading)) {
      notes.push(`template ${section} already filled, left as is`);
      continue;
    }

    const block = source?.extraSections?.find(
      (candidate) => candidate.blockType === section,
    );

    if (!(source && block)) {
      notes.push(
        `template ${section} left empty: ${sharedSectionsSource} has no such section to share`,
      );
      continue;
    }

    Object.assign(template, {
      [section]: asTemplatePart(block, source.name),
    });
    moved.push(section);
    templateChanged = true;
    notes.push(
      `template ${section} filled from the section of ${sharedSectionsSource}, now shown on every city page`,
    );
  }

  if (templateChanged) {
    await payload.updateGlobal({
      slug: "cityTemplate",
      data: template,
      depth: 0,
      req,
      context,
    });
  }

  if (source && moved.length > 0) {
    const written = await payload.findGlobal({
      slug: "cityTemplate",
      depth: 0,
      req,
    });

    for (const section of moved) {
      const block = source.extraSections?.find(
        (candidate) => candidate.blockType === section,
      );
      const cards = block && "cards" in block ? (block.cards ?? []) : [];

      if (
        isEmpty(written[section]?.heading) ||
        (written[section]?.cards ?? []).length !== cards.length
      ) {
        throw new Error(
          `The template does not hold the ${section} section of ${sharedSectionsSource}. Nothing was written: check the city page template, then run the migration again`,
        );
      }
    }

    await payload.update({
      collection: "cities",
      id: source.id,
      data: {
        extraSections: (source.extraSections ?? []).filter(
          (block) => !moved.some((section) => section === block.blockType),
        ),
      },
      depth: 0,
      req,
      context,
    });
    notes.push(
      `${sharedSectionsSource} no longer carries its own ${moved.join(" and ")}: the template holds them`,
    );
  }

  for (const original of originalSearchTexts) {
    const found = await payload.find({
      collection: "cities",
      where: { slug: { equals: original.slug } },
      limit: 1,
      depth: 0,
      req,
    });
    const [city] = found.docs;

    if (!city) {
      notes.push(`${original.slug} skipped: there is no such city record`);
      continue;
    }

    const keepsTitle = city.seo?.title !== original.title;
    const keepsDescription = city.seo?.description !== original.description;

    for (const [label, value, kept] of [
      ["title", city.seo?.title, keepsTitle],
      ["description", city.seo?.description, keepsDescription],
    ] as const) {
      notes.push(
        isEmpty(value)
          ? `${original.slug} search ${label} already follows the template`
          : kept
            ? `${original.slug} search ${label} left as is: it was edited since`
            : `${original.slug} search ${label} emptied, the template pattern applies`,
      );
    }

    if (keepsTitle && keepsDescription) {
      continue;
    }

    await payload.update({
      collection: "cities",
      id: city.id,
      data: {
        seo: {
          title: keepsTitle ? city.seo?.title : null,
          description: keepsDescription ? city.seo?.description : null,
        },
      },
      depth: 0,
      req,
      context,
    });
  }

  for (const note of notes) {
    payload.logger.info(`city_pages_share_one_model: ${note}`);
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The city_pages_share_one_model migration cannot be reverted: the shared wording and sections cannot be told apart from what editors changed since. Restore the database from a backup instead",
  );
}
