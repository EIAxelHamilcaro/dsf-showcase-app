import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_text_section_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_faq_background" AS ENUM('default', 'muted');
  CREATE TABLE "pages_blocks_text_section_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_text_section_background" DEFAULT 'default' NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_faq_background" DEFAULT 'default' NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_legal_content_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_content_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_content_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_content_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_content_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "pages_blocks_legal_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_text_section_paragraphs" ADD CONSTRAINT "pages_blocks_text_section_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_section" ADD CONSTRAINT "pages_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_sources" ADD CONSTRAINT "pages_blocks_faq_items_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_content_sections_paragraphs" ADD CONSTRAINT "pages_blocks_legal_content_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_content_sections_items" ADD CONSTRAINT "pages_blocks_legal_content_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_content_sections_headers" ADD CONSTRAINT "pages_blocks_legal_content_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_content_sections_rows_cells" ADD CONSTRAINT "pages_blocks_legal_content_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_content_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_content_sections_rows" ADD CONSTRAINT "pages_blocks_legal_content_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_content_sections" ADD CONSTRAINT "pages_blocks_legal_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_content" ADD CONSTRAINT "pages_blocks_legal_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_text_section_paragraphs_order_idx" ON "pages_blocks_text_section_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_section_paragraphs_parent_id_idx" ON "pages_blocks_text_section_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_section_order_idx" ON "pages_blocks_text_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_section_parent_id_idx" ON "pages_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_section_path_idx" ON "pages_blocks_text_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_sources_order_idx" ON "pages_blocks_faq_items_sources" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_sources_parent_id_idx" ON "pages_blocks_faq_items_sources" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_legal_content_sections_paragraphs_order_idx" ON "pages_blocks_legal_content_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_content_sections_paragraphs_parent_id_idx" ON "pages_blocks_legal_content_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_content_sections_items_order_idx" ON "pages_blocks_legal_content_sections_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_content_sections_items_parent_id_idx" ON "pages_blocks_legal_content_sections_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_content_sections_headers_order_idx" ON "pages_blocks_legal_content_sections_headers" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_content_sections_headers_parent_id_idx" ON "pages_blocks_legal_content_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_content_sections_rows_cells_order_idx" ON "pages_blocks_legal_content_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_content_sections_rows_cells_parent_id_idx" ON "pages_blocks_legal_content_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_content_sections_rows_order_idx" ON "pages_blocks_legal_content_sections_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_content_sections_rows_parent_id_idx" ON "pages_blocks_legal_content_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_content_sections_order_idx" ON "pages_blocks_legal_content_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_content_sections_parent_id_idx" ON "pages_blocks_legal_content_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_content_order_idx" ON "pages_blocks_legal_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_content_parent_id_idx" ON "pages_blocks_legal_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_content_path_idx" ON "pages_blocks_legal_content" USING btree ("_path");`);
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The faq_text_and_legal_blocks migration cannot be reverted: it would erase the FAQ, the local texts and the legal pages stored in these tables. Restore the database from a backup instead",
  );
}
