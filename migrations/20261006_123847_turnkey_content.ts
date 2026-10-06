import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";
import type {
  FaqBlock,
  LegalContentBlock,
  Page,
  TextSectionBlock,
} from "../payload-types";
import { type FaqSeed, faqSeed } from "./seed/faqSeed";
import { type LegalPageSeed, legalPagesSeed } from "./seed/legalPagesSeed";
import { type LocalTextSeed, localTextSeed } from "./seed/localTextSeed";
import { mediaAltSeed } from "./seed/mediaAltSeed";
import { gallerySwap, googleProfileUrl } from "./seed/siteFixesSeed";
import {
  homeCorrections,
  menuCorrections,
  pageDetailRemovals,
  pageFieldCorrections,
  seoDescriptionCorrections,
} from "./seed/taxCreditCorrections";

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

function correctFields(slug: string, layout: Layout, notes: string[]): boolean {
  let changed = false;

  for (const correction of pageFieldCorrections) {
    if (correction.slug !== slug) {
      continue;
    }

    const matches = findFieldValues(layout, correction.field, correction.from);
    const [match] = matches;

    if (matches.length === 1 && match) {
      match.holder[match.field] = correction.to;
      changed = true;
      notes.push(`${correction.ref} corrected on ${slug}`);
      continue;
    }

    const alreadyCorrected =
      findFieldValues(layout, correction.field, correction.to).length > 0;

    notes.push(
      alreadyCorrected
        ? `${correction.ref} already corrected on ${slug}`
        : `${correction.ref} left as is on ${slug}: the original text was found ${matches.length} times, it was edited since`,
    );
  }

  return changed;
}

function removeDetails(slug: string, layout: Layout, notes: string[]): boolean {
  let changed = false;

  for (const removal of pageDetailRemovals) {
    if (removal.slug !== slug) {
      continue;
    }

    let removed = 0;

    for (const block of layout) {
      if (block.blockType !== "aidCards") {
        continue;
      }

      for (const card of block.cards ?? []) {
        const kept = (card.details ?? []).filter(
          (detail) =>
            !(detail.label === removal.label && detail.text === removal.text),
        );

        removed += (card.details?.length ?? 0) - kept.length;
        card.details = kept;
      }
    }

    changed = changed || removed > 0;
    notes.push(
      removed > 0
        ? `${removal.ref} removed from ${slug}`
        : `${removal.ref} not found on ${slug}: already removed or edited since`,
    );
  }

  return changed;
}

function correctSeoDescription(page: Page, notes: string[]): string {
  const correction = seoDescriptionCorrections.find(
    (candidate) => candidate.slug === page.slug,
  );

  if (!correction) {
    return page.seo.description;
  }

  if (page.seo.description !== correction.from) {
    notes.push(
      page.seo.description === correction.to
        ? `${correction.ref} already corrected on ${page.slug}`
        : `${correction.ref} left as is on ${page.slug}: the description was edited since`,
    );

    return page.seo.description;
  }

  notes.push(`${correction.ref} corrected on ${page.slug}`);

  return correction.to;
}

const toTextSection = (seed: LocalTextSeed): TextSectionBlock => ({
  blockType: "textSection",
  background: "default",
  heading: seed.heading,
  paragraphs: seed.paragraphs.map((text) => ({ text })),
});

const toFaq = (seed: FaqSeed): FaqBlock => ({
  blockType: "faq",
  background: "default",
  heading: seed.heading,
  items: seed.items.map((item) => ({
    question: item.question,
    answer: item.answer,
    sources: item.sources.map((source) => ({
      label: source.label,
      url: source.url,
    })),
  })),
});

const toLegalContent = (seed: LegalPageSeed): LegalContentBlock => ({
  blockType: "legalContent",
  title: seed.title,
  sections: seed.sections.map((section) => ({
    heading: section.heading,
    paragraphs: (section.paragraphs ?? []).map((text) => ({ text })),
    items: (section.items ?? []).map((text) => ({ text })),
    headers: (section.headers ?? []).map((label) => ({ label })),
    rows: (section.rows ?? []).map((cells) => ({
      cells: cells.map((text) => ({ text })),
    })),
  })),
});

function withTurnkeyBlocks(slug: string, layout: Layout): Layout {
  const faq = faqSeed.find((seed) => seed.slug === slug);

  if (!faq) {
    return layout;
  }

  const local = localTextSeed.find((seed) => seed.slug === slug);
  const additions: Layout = [
    ...(local ? [toTextSection(local)] : []),
    toFaq(faq),
  ];
  const endsWithCta = layout.at(-1)?.blockType === "cta";

  return endsWithCta
    ? [...layout.slice(0, -1), ...additions, ...layout.slice(-1)]
    : [...layout, ...additions];
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const notes: string[] = [];
  const configRows = await db.execute(sql`select id from config order by id`);

  if (configRows.rows.length !== 1) {
    throw new Error(
      `Expected exactly one config row to receive the home corrections, found ${configRows.rows.length}. Nothing was written: fix the config collection, then run the migration again`,
    );
  }

  const configId = Number(configRows.rows[0]?.id);
  const pages = new Map<string, Page>();

  for (const seed of faqSeed) {
    const found = await payload.find({
      collection: "pages",
      where: { slug: { equals: seed.slug } },
      limit: 1,
      depth: 0,
      req,
    });
    const page = found.docs[0];

    if (!page) {
      throw new Error(
        `Page ${seed.slug} is missing, it should have been created by seed_pages_and_site_identity. Nothing was written: restore the page, then run the migration again`,
      );
    }

    pages.set(seed.slug, page);
  }

  for (const media of mediaAltSeed) {
    const found = await db.execute(
      sql`select id from media where id = ${media.id} and filename = ${media.filename}`,
    );

    if (found.rows.length !== 1) {
      throw new Error(
        `Media ${media.id} (${media.filename}) is missing, its description cannot be attached to another file. Nothing was written: update migrations/seed/mediaAltSeed.ts to the media library, then run the migration again`,
      );
    }
  }

  for (const [slug, page] of pages) {
    const layout: Layout = structuredClone(page.layout);
    const fieldsChanged = correctFields(slug, layout, notes);
    const detailsChanged = removeDetails(slug, layout, notes);
    const description = correctSeoDescription(page, notes);
    const hasFaq = layout.some((block) => block.blockType === "faq");

    if (hasFaq) {
      notes.push(`${slug} already has a FAQ, no block added`);
    }

    const isUnchanged =
      hasFaq &&
      !fieldsChanged &&
      !detailsChanged &&
      description === page.seo.description;

    if (isUnchanged) {
      continue;
    }

    await payload.update({
      collection: "pages",
      id: page.id,
      data: {
        seo: { ...page.seo, description },
        layout: hasFaq ? layout : withTurnkeyBlocks(slug, layout),
      },
      depth: 0,
      req,
      context: { disableRevalidate: true },
    });
  }

  for (const seed of legalPagesSeed) {
    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: seed.slug } },
      limit: 1,
      depth: 0,
      req,
    });

    if (existing.docs.length > 0) {
      notes.push(`${seed.slug} already exists, left as is`);
      continue;
    }

    await payload.create({
      collection: "pages",
      data: {
        slug: seed.slug,
        navLabel: seed.navLabel,
        pageType: "legal",
        seo: seed.seo,
        layout: [toLegalContent(seed)],
      },
      depth: 0,
      req,
      context: { disableRevalidate: true },
    });
  }

  let describedMedia = 0;

  for (const media of mediaAltSeed) {
    const updated = await db.execute(sql`
      update media set alt = ${media.alt}
      where id = ${media.id}
        and filename = ${media.filename}
        and coalesce(btrim(alt), '') = ''
      returning id
    `);

    describedMedia += updated.rows.length;
  }

  notes.push(
    `${describedMedia} media described, ${mediaAltSeed.length - describedMedia} already had a description`,
  );

  let configChanges = 0;

  const swapped = await db.execute(sql`
    update config_caroussel_section
    set before_id = ${gallerySwap.after}, after_id = ${gallerySwap.before}
    where _parent_id = ${configId}
      and _order = ${gallerySwap.order}
      and before_id = ${gallerySwap.before}
      and after_id = ${gallerySwap.after}
    returning id
  `);

  configChanges += swapped.rows.length;
  notes.push(
    swapped.rows.length === 1
      ? `gallery entry ${gallerySwap.order}: before and after photos swapped`
      : `gallery entry ${gallerySwap.order} left as is: it no longer holds media ${gallerySwap.before} then ${gallerySwap.after}`,
  );

  for (const correction of homeCorrections) {
    const column = sql.identifier(correction.column);
    const corrected = await db.execute(sql`
      update config set ${column} = ${correction.to}
      where id = ${configId} and ${column} = ${correction.from}
      returning id
    `);

    configChanges += corrected.rows.length;
    notes.push(
      corrected.rows.length === 1
        ? `${correction.ref} corrected on the home`
        : `${correction.ref} left as is on the home: already corrected or edited since`,
    );
  }

  for (const correction of menuCorrections) {
    const corrected = await db.execute(sql`
      update config_menu_services set description = ${correction.to}
      where _parent_id = ${configId}
        and href = ${correction.href}
        and description = ${correction.from}
      returning id
    `);

    configChanges += corrected.rows.length;
    notes.push(
      corrected.rows.length > 0
        ? `${correction.ref} corrected in the Services menu`
        : `${correction.ref} left as is in the Services menu: already corrected or edited since`,
    );
  }

  const profiled = await db.execute(sql`
    update config set google_profile_url = ${googleProfileUrl}
    where id = ${configId} and coalesce(btrim(google_profile_url), '') = ''
    returning id
  `);

  configChanges += profiled.rows.length;
  notes.push(
    profiled.rows.length === 1
      ? "Google profile link set"
      : "Google profile link left as is: already filled",
  );

  if (configChanges > 0) {
    await db.execute(
      sql`update config set updated_at = now() where id = ${configId}`,
    );
  }

  for (const note of notes) {
    payload.logger.info(`turnkey_content: ${note}`);
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The turnkey_content migration cannot be reverted: its FAQ, local texts, legal pages, corrections and media descriptions cannot be told apart from what editors changed since. Restore the database from a backup instead",
  );
}
