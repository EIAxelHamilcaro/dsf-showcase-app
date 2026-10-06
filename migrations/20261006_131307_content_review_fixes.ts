import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import type { Page } from "../payload-types";
import { reviewFixes } from "./seed/reviewFixesSeed";
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

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const notes: string[] = [];
  const slugs = [...new Set(reviewFixes.map((fix) => fix.slug))];

  for (const slug of slugs) {
    const fixes = reviewFixes.filter((fix) => fix.slug === slug);
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

  for (const note of notes) {
    payload.logger.info(`content_review_fixes: ${note}`);
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The content_review_fixes migration cannot be reverted: its corrected texts cannot be told apart from what editors changed since. Restore the database from a backup instead",
  );
}
