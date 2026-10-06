import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_zone_list_columns" AS ENUM('4', '5');
  CREATE TYPE "public"."enum_pages_blocks_aid_cards_variant" AS ENUM('compact', 'detailed');
  ALTER TABLE "pages_blocks_zone_list" ADD COLUMN "columns" "enum_pages_blocks_zone_list_columns" DEFAULT '5';
  ALTER TABLE "pages_blocks_aid_cards" ADD COLUMN "variant" "enum_pages_blocks_aid_cards_variant" DEFAULT 'compact';`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The block_display_options migration cannot be reverted: it would erase the column count of the zone lists and the presentation of the aid cards. Restore the database from a backup instead",
  );
}
