import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_cities_blocks_testimonial_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_cities_blocks_service_cards_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_cities_blocks_service_cards_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_cities_blocks_aid_cards_cards_icon" AS ENUM('none', 'mapPin', 'clock', 'shield', 'euro', 'checkCircle', 'fileText');
  CREATE TYPE "public"."enum_cities_blocks_aid_cards_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_cities_blocks_aid_cards_variant" AS ENUM('compact', 'detailed');
  CREATE TYPE "public"."enum_cities_local_section_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_cities_faq_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_city_template_feature_cards_cards_icon" AS ENUM('none', 'mapPin', 'clock', 'shield', 'euro', 'checkCircle', 'fileText');
  CREATE TYPE "public"."enum_city_template_feature_cards_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_city_template_feature_cards_layout" AS ENUM('centered', 'left', 'inline');
  CREATE TYPE "public"."enum_city_template_feature_cards_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_city_template_feature_cards_spacing" AS ENUM('compact', 'spacious');
  CREATE TYPE "public"."enum_city_template_zone_list_background" AS ENUM('default', 'muted');
  CREATE TABLE "cities_zones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "cities_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_cities_blocks_testimonial_background" DEFAULT 'default' NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"rating" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "cities_blocks_service_cards_cards_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "cities_blocks_service_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link_label" varchar,
  	"link_href" varchar
  );
  
  CREATE TABLE "cities_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_cities_blocks_service_cards_background" DEFAULT 'default' NOT NULL,
  	"heading" varchar NOT NULL,
  	"columns" "enum_cities_blocks_service_cards_columns" DEFAULT '2' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "cities_blocks_aid_cards_cards_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "cities_blocks_aid_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_cities_blocks_aid_cards_cards_icon" DEFAULT 'none' NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "cities_blocks_aid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_cities_blocks_aid_cards_background" DEFAULT 'default' NOT NULL,
  	"variant" "enum_cities_blocks_aid_cards_variant" DEFAULT 'compact',
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "cities_local_section_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "cities_faq_items_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "cities_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "cities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"department_id" integer NOT NULL,
  	"area_name" varchar,
  	"location_line" varchar,
  	"zones_heading" varchar,
  	"local_section_background" "enum_cities_local_section_background" DEFAULT 'default' NOT NULL,
  	"local_section_heading" varchar NOT NULL,
  	"faq_background" "enum_cities_faq_background" DEFAULT 'default' NOT NULL,
  	"faq_heading" varchar NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "city_template_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_city_template_feature_cards_cards_icon" DEFAULT 'none' NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "city_template" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nav_label" varchar NOT NULL,
  	"seo_title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"hero_location" varchar,
  	"hero_title_before" varchar NOT NULL,
  	"hero_title_highlight" varchar NOT NULL,
  	"hero_title_after" varchar,
  	"hero_intro" varchar NOT NULL,
  	"hero_cta_label" varchar NOT NULL,
  	"feature_cards_background" "enum_city_template_feature_cards_background" DEFAULT 'default' NOT NULL,
  	"feature_cards_heading" varchar,
  	"feature_cards_intro" varchar,
  	"feature_cards_layout" "enum_city_template_feature_cards_layout" DEFAULT 'centered' NOT NULL,
  	"feature_cards_columns" "enum_city_template_feature_cards_columns" DEFAULT '4' NOT NULL,
  	"feature_cards_spacing" "enum_city_template_feature_cards_spacing" DEFAULT 'compact',
  	"zone_list_background" "enum_city_template_zone_list_background" DEFAULT 'default' NOT NULL,
  	"zone_list_heading" varchar NOT NULL,
  	"zone_list_show_map_icon" boolean DEFAULT false,
  	"zone_list_intro" varchar,
  	"zone_list_outro" varchar,
  	"cta_heading" varchar NOT NULL,
  	"cta_text" varchar NOT NULL,
  	"cta_cta_label" varchar NOT NULL,
  	"cta_phone_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cities_id" integer;
  ALTER TABLE "cities_zones" ADD CONSTRAINT "cities_zones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_blocks_testimonial" ADD CONSTRAINT "cities_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_blocks_service_cards_cards_bullets" ADD CONSTRAINT "cities_blocks_service_cards_cards_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities_blocks_service_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_blocks_service_cards_cards" ADD CONSTRAINT "cities_blocks_service_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_blocks_service_cards" ADD CONSTRAINT "cities_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_blocks_aid_cards_cards_details" ADD CONSTRAINT "cities_blocks_aid_cards_cards_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities_blocks_aid_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_blocks_aid_cards_cards" ADD CONSTRAINT "cities_blocks_aid_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities_blocks_aid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_blocks_aid_cards" ADD CONSTRAINT "cities_blocks_aid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_local_section_paragraphs" ADD CONSTRAINT "cities_local_section_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_faq_items_sources" ADD CONSTRAINT "cities_faq_items_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_faq_items" ADD CONSTRAINT "cities_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities" ADD CONSTRAINT "cities_department_id_pages_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "city_template_feature_cards_cards" ADD CONSTRAINT "city_template_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."city_template"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cities_zones_order_idx" ON "cities_zones" USING btree ("_order");
  CREATE INDEX "cities_zones_parent_id_idx" ON "cities_zones" USING btree ("_parent_id");
  CREATE INDEX "cities_blocks_testimonial_order_idx" ON "cities_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "cities_blocks_testimonial_parent_id_idx" ON "cities_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "cities_blocks_testimonial_path_idx" ON "cities_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "cities_blocks_service_cards_cards_bullets_order_idx" ON "cities_blocks_service_cards_cards_bullets" USING btree ("_order");
  CREATE INDEX "cities_blocks_service_cards_cards_bullets_parent_id_idx" ON "cities_blocks_service_cards_cards_bullets" USING btree ("_parent_id");
  CREATE INDEX "cities_blocks_service_cards_cards_order_idx" ON "cities_blocks_service_cards_cards" USING btree ("_order");
  CREATE INDEX "cities_blocks_service_cards_cards_parent_id_idx" ON "cities_blocks_service_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "cities_blocks_service_cards_order_idx" ON "cities_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "cities_blocks_service_cards_parent_id_idx" ON "cities_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "cities_blocks_service_cards_path_idx" ON "cities_blocks_service_cards" USING btree ("_path");
  CREATE INDEX "cities_blocks_aid_cards_cards_details_order_idx" ON "cities_blocks_aid_cards_cards_details" USING btree ("_order");
  CREATE INDEX "cities_blocks_aid_cards_cards_details_parent_id_idx" ON "cities_blocks_aid_cards_cards_details" USING btree ("_parent_id");
  CREATE INDEX "cities_blocks_aid_cards_cards_order_idx" ON "cities_blocks_aid_cards_cards" USING btree ("_order");
  CREATE INDEX "cities_blocks_aid_cards_cards_parent_id_idx" ON "cities_blocks_aid_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "cities_blocks_aid_cards_order_idx" ON "cities_blocks_aid_cards" USING btree ("_order");
  CREATE INDEX "cities_blocks_aid_cards_parent_id_idx" ON "cities_blocks_aid_cards" USING btree ("_parent_id");
  CREATE INDEX "cities_blocks_aid_cards_path_idx" ON "cities_blocks_aid_cards" USING btree ("_path");
  CREATE INDEX "cities_local_section_paragraphs_order_idx" ON "cities_local_section_paragraphs" USING btree ("_order");
  CREATE INDEX "cities_local_section_paragraphs_parent_id_idx" ON "cities_local_section_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "cities_faq_items_sources_order_idx" ON "cities_faq_items_sources" USING btree ("_order");
  CREATE INDEX "cities_faq_items_sources_parent_id_idx" ON "cities_faq_items_sources" USING btree ("_parent_id");
  CREATE INDEX "cities_faq_items_order_idx" ON "cities_faq_items" USING btree ("_order");
  CREATE INDEX "cities_faq_items_parent_id_idx" ON "cities_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "cities_slug_idx" ON "cities" USING btree ("slug");
  CREATE INDEX "cities_department_idx" ON "cities" USING btree ("department_id");
  CREATE INDEX "cities_updated_at_idx" ON "cities" USING btree ("updated_at");
  CREATE INDEX "cities_created_at_idx" ON "cities" USING btree ("created_at");
  CREATE INDEX "city_template_feature_cards_cards_order_idx" ON "city_template_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "city_template_feature_cards_cards_parent_id_idx" ON "city_template_feature_cards_cards" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_cities_id_idx" ON "payload_locked_documents_rels" USING btree ("cities_id");`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The cities_and_city_template migration cannot be reverted: it would erase the city records and the city page template entered in the CMS. Restore the database from a backup instead",
  );
}
