import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";
import { pagesSeed } from "./seed/pagesSeed";
import { menuServicesSeed, siteIdentitySeed } from "./seed/siteSeed";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const pageIds = new Map<string, number>();
  const parentsFirst = [...pagesSeed].sort(
    (a, b) => Number(Boolean(a.parentSlug)) - Number(Boolean(b.parentSlug)),
  );

  for (const seed of parentsFirst) {
    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: seed.slug } },
      limit: 1,
      depth: 0,
      req,
    });
    const found = existing.docs[0];

    if (found) {
      pageIds.set(seed.slug, found.id);
      continue;
    }

    const parentId = seed.parentSlug ? pageIds.get(seed.parentSlug) : undefined;

    if (seed.parentSlug && parentId === undefined) {
      throw new Error(
        `Parent page ${seed.parentSlug} is missing for ${seed.slug}`,
      );
    }

    const created = await payload.create({
      collection: "pages",
      data: {
        slug: seed.slug,
        navLabel: seed.navLabel,
        pageType: seed.pageType,
        parent: parentId,
        areaName: seed.areaName,
        departmentCode: seed.departmentCode,
        seo: seed.seo,
        layout: seed.layout,
      },
      depth: 0,
      req,
      context: { disableRevalidate: true },
    });

    pageIds.set(seed.slug, created.id);
  }

  const identity = siteIdentitySeed;

  await db.execute(sql`
    update config set
      legal_section_legal_name = case when coalesce(btrim(legal_section_legal_name), '') = '' then ${identity.legalName} else legal_section_legal_name end,
      legal_section_legal_form = case when coalesce(btrim(legal_section_legal_form), '') = '' then ${identity.legalForm} else legal_section_legal_form end,
      legal_section_siren = case when coalesce(btrim(legal_section_siren), '') = '' then ${identity.siren} else legal_section_siren end,
      legal_section_street_address = case when coalesce(btrim(legal_section_street_address), '') = '' then ${identity.streetAddress} else legal_section_street_address end,
      legal_section_postal_code = case when coalesce(btrim(legal_section_postal_code), '') = '' then ${identity.postalCode} else legal_section_postal_code end,
      legal_section_locality = case when coalesce(btrim(legal_section_locality), '') = '' then ${identity.locality} else legal_section_locality end
    where id = 1
  `);

  const configRows = await db.execute(
    sql`select count(*)::int as total from config where id = 1`,
  );
  const menuRows = await db.execute(
    sql`select count(*)::int as total from config_menu_services where _parent_id = 1`,
  );
  const hasConfig = Number(configRows.rows[0]?.total ?? 0) > 0;
  const hasMenu = Number(menuRows.rows[0]?.total ?? 0) > 0;

  if (!hasConfig || hasMenu) {
    return;
  }

  for (const [index, item] of menuServicesSeed.entries()) {
    await db.execute(sql`
      insert into config_menu_services (_order, _parent_id, id, label, href, description)
      values (${index + 1}, 1, substr(md5(random()::text || clock_timestamp()::text), 1, 24), ${item.label}, ${item.href}, ${item.description})
    `);
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The seed_pages_and_site_identity migration cannot be reverted: it would erase the 15 pages and whatever editors changed in them since, while their hard-coded versions no longer exist. Restore the database from a backup instead",
  );
}
