import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "config" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "config" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_information_only" boolean;`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The home_seo_and_information_pages migration cannot be reverted: it would erase the home title and description entered in the CMS and the information page marker. Restore the database from a backup instead",
  );
}
