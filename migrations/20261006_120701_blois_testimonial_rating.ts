import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    update pages_blocks_testimonial as block
    set rating = 5
    from pages as page
    where page.id = block._parent_id
      and page.slug = 'douche-senior-blois'
      and block.author = 'Marie L. - Blois (Les Grouets)'
      and block.rating is null
  `);
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The blois_testimonial_rating migration cannot be reverted: the 5 stars of the Blois testimonial cannot be told apart from a rating an editor entered since. Restore the database from a backup instead",
  );
}
