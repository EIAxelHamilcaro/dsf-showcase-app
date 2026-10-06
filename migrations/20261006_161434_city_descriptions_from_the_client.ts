import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import {
  clientDescriptions,
  sharedDescription,
} from "./seed/cityDescriptionSeed";

const isEmpty = (value: unknown) =>
  value === null || value === undefined || value === "";

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const context = { disableRevalidate: true };
  const log = (note: string) =>
    payload.logger.info(`city_descriptions_from_the_client: ${note}`);
  const stored = await payload.findGlobal({
    slug: "cityTemplate",
    depth: 0,
    req,
  });

  if (stored.seo?.description === sharedDescription.from) {
    const {
      id: _id,
      updatedAt: _updatedAt,
      createdAt: _createdAt,
      ...template
    } = stored;

    await payload.updateGlobal({
      slug: "cityTemplate",
      data: {
        ...template,
        seo: { ...template.seo, description: sharedDescription.to },
      },
      depth: 0,
      req,
      context,
    });
    log(
      `template search description set to ${JSON.stringify(sharedDescription.to)}`,
    );
  } else {
    log(
      stored.seo?.description === sharedDescription.to
        ? "template search description already names no commune"
        : "template search description left as is: it was edited since",
    );
  }

  for (const { slug, description } of clientDescriptions) {
    const found = await payload.find({
      collection: "cities",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
      req,
    });
    const [city] = found.docs;

    if (!city) {
      log(`${slug} skipped: there is no such city record`);
      continue;
    }

    if (!isEmpty(city.seo?.description)) {
      log(`${slug} search description left as is: the city has one`);
      continue;
    }

    await payload.update({
      collection: "cities",
      id: city.id,
      data: { seo: { title: city.seo?.title, description } },
      depth: 0,
      req,
      context,
    });
    log(
      `${slug} search description set back to the client wording ${JSON.stringify(description)}`,
    );
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The city_descriptions_from_the_client migration cannot be reverted: the search descriptions cannot be told apart from what editors changed since. Restore the database from a backup instead",
  );
}
