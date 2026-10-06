import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_testimonial" ADD COLUMN "rating" numeric;`);
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The testimonial_block_rating migration cannot be reverted: it would erase the ratings entered on the testimonial blocks. Restore the database from a backup instead",
  );
}
