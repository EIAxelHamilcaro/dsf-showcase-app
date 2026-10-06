import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_cards_spacing" AS ENUM('compact', 'spacious');
  ALTER TABLE "pages_blocks_feature_cards" ADD COLUMN "spacing" "enum_pages_blocks_feature_cards_spacing" DEFAULT 'compact';`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The feature_cards_spacing migration cannot be reverted: it would erase the card spacing chosen on the feature card blocks. Restore the database from a backup instead",
  );
}
