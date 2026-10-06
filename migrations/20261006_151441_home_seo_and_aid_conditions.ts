import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";
import type { Page } from "../payload-types";
import {
  aidConditionFixes,
  homeSeoSeed,
  informationPageSlugs,
} from "./seed/finalFixesSeed";
import type { PageFieldCorrection } from "./seed/taxCreditCorrections";

type Layout = Page["layout"];

interface FieldMatch {
  holder: Record<string, unknown>;
  field: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function findFieldValues(
  value: unknown,
  field: string,
  expected: string,
  matches: FieldMatch[] = [],
): FieldMatch[] {
  if (Array.isArray(value)) {
    for (const item of value) {
      findFieldValues(item, field, expected, matches);
    }

    return matches;
  }

  if (!isRecord(value)) {
    return matches;
  }

  for (const [key, child] of Object.entries(value)) {
    if (key === field && child === expected) {
      matches.push({ holder: value, field });
      continue;
    }

    findFieldValues(child, field, expected, matches);
  }

  return matches;
}

function applyFix(
  fix: PageFieldCorrection,
  layout: Layout,
  notes: string[],
): boolean {
  const matches = findFieldValues(layout, fix.field, fix.from);
  const [match] = matches;

  if (matches.length === 1 && match) {
    match.holder[match.field] = fix.to;
    notes.push(`${fix.ref} corrected on ${fix.slug}`);

    return true;
  }

  if (matches.length > 1) {
    notes.push(
      `${fix.ref} left as is on ${fix.slug}: the expected text was found more than once (${matches.length} times)`,
    );

    return false;
  }

  const alreadyCorrected =
    findFieldValues(layout, fix.field, fix.to).length > 0;

  notes.push(
    alreadyCorrected
      ? `${fix.ref} already corrected on ${fix.slug}`
      : `${fix.ref} left as is on ${fix.slug}: the expected text was not found, it was edited or removed since`,
  );

  return false;
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const notes: string[] = [];
  const configRows = await db.execute(sql`select id from config order by id`);

  if (configRows.rows.length !== 1) {
    throw new Error(
      `Expected exactly one config row to receive the home title and description, found ${configRows.rows.length}. Nothing was written: fix the config collection, then run the migration again`,
    );
  }

  const configId = Number(configRows.rows[0]?.id);
  const slugs = [...new Set(aidConditionFixes.map((fix) => fix.slug))];

  for (const slug of slugs) {
    const fixes = aidConditionFixes.filter((fix) => fix.slug === slug);
    const found = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
      req,
    });
    const page = found.docs[0];

    if (!page) {
      notes.push(
        `${fixes.map((fix) => fix.ref).join(", ")} skipped: page ${slug} does not exist`,
      );
      continue;
    }

    const layout: Layout = structuredClone(page.layout);
    const corrected = fixes.filter((fix) => applyFix(fix, layout, notes));

    if (corrected.length === 0) {
      continue;
    }

    await payload.update({
      collection: "pages",
      id: page.id,
      data: { layout },
      depth: 0,
      req,
      context: { disableRevalidate: true },
    });
  }

  for (const slug of informationPageSlugs) {
    const marked = await db.execute(sql`
      update pages set seo_information_only = true
      where slug = ${slug} and seo_information_only is null
      returning id
    `);

    notes.push(
      marked.rows.length === 1
        ? `${slug} marked as an information page`
        : `${slug} left as is: the page does not exist or its information page box was already set`,
    );
  }

  const titled = await db.execute(sql`
    update config set seo_title = ${homeSeoSeed.title}
    where id = ${configId} and coalesce(btrim(seo_title), '') = ''
    returning id
  `);

  notes.push(
    titled.rows.length === 1
      ? "home title set"
      : "home title left as is: already filled",
  );

  const described = await db.execute(sql`
    update config set seo_description = ${homeSeoSeed.description}
    where id = ${configId} and coalesce(btrim(seo_description), '') = ''
    returning id
  `);

  notes.push(
    described.rows.length === 1
      ? "home description set"
      : "home description left as is: already filled",
  );

  if (titled.rows.length + described.rows.length > 0) {
    await db.execute(
      sql`update config set updated_at = now() where id = ${configId}`,
    );
  }

  for (const note of notes) {
    payload.logger.info(`home_seo_and_aid_conditions: ${note}`);
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The home_seo_and_aid_conditions migration cannot be reverted: its home title, home description, information page marker and corrected condition cannot be told apart from what editors changed since. Restore the database from a backup instead",
  );
}
