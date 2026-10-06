import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_config_testimonials_section_source" AS ENUM('direct', 'google');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_cards_icon" AS ENUM('none', 'mapPin', 'clock', 'shield', 'euro', 'checkCircle', 'fileText');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_layout" AS ENUM('centered', 'left', 'inline');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_zone_list_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_testimonial_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pages_blocks_aid_cards_cards_icon" AS ENUM('none', 'mapPin', 'clock', 'shield', 'euro', 'checkCircle', 'fileText');
  CREATE TYPE "public"."enum_pages_blocks_aid_cards_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_steps_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_link_cards_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('city', 'department', 'service', 'legal');
  CREATE TABLE "config_menu_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"location" varchar,
  	"title_before" varchar NOT NULL,
  	"title_highlight" varchar NOT NULL,
  	"title_after" varchar,
  	"intro" varchar NOT NULL,
  	"cta_label" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_feature_cards_cards_icon" DEFAULT 'none' NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_feature_cards_background" DEFAULT 'default' NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum_pages_blocks_feature_cards_layout" DEFAULT 'centered' NOT NULL,
  	"columns" "enum_pages_blocks_feature_cards_columns" DEFAULT '4' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_zone_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_zone_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_zone_list_background" DEFAULT 'default' NOT NULL,
  	"heading" varchar NOT NULL,
  	"show_map_icon" boolean DEFAULT false,
  	"intro" varchar,
  	"outro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_testimonial_background" DEFAULT 'default' NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_cards_cards_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link_label" varchar,
  	"link_href" varchar
  );
  
  CREATE TABLE "pages_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_service_cards_background" DEFAULT 'default' NOT NULL,
  	"heading" varchar NOT NULL,
  	"columns" "enum_pages_blocks_service_cards_columns" DEFAULT '2' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_aid_cards_cards_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_aid_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_aid_cards_cards_icon" DEFAULT 'none' NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "pages_blocks_aid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_aid_cards_background" DEFAULT 'default' NOT NULL,
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_steps_background" DEFAULT 'default' NOT NULL,
  	"heading" varchar NOT NULL,
  	"with_cards" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_link_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_link_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_link_cards_background" DEFAULT 'default' NOT NULL,
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"cta_label" varchar NOT NULL,
  	"phone_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"nav_label" varchar NOT NULL,
  	"page_type" "enum_pages_page_type" NOT NULL,
  	"parent_id" integer,
  	"area_name" varchar,
  	"department_code" varchar,
  	"seo_title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "config_testimonials_section" ADD COLUMN "rating" numeric;
  ALTER TABLE "config_testimonials_section" ADD COLUMN "date" timestamp(3) with time zone;
  ALTER TABLE "config_testimonials_section" ADD COLUMN "source" "enum_config_testimonials_section_source";
  ALTER TABLE "config" ADD COLUMN "legal_section_legal_name" varchar;
  ALTER TABLE "config" ADD COLUMN "legal_section_legal_form" varchar;
  ALTER TABLE "config" ADD COLUMN "legal_section_siren" varchar;
  ALTER TABLE "config" ADD COLUMN "legal_section_street_address" varchar;
  ALTER TABLE "config" ADD COLUMN "legal_section_postal_code" varchar;
  ALTER TABLE "config" ADD COLUMN "legal_section_locality" varchar;
  ALTER TABLE "config" ADD COLUMN "google_rating" numeric;
  ALTER TABLE "config" ADD COLUMN "google_review_count" numeric;
  ALTER TABLE "config" ADD COLUMN "google_profile_url" varchar;
  ALTER TABLE "media" ADD COLUMN "alt" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "config_menu_services" ADD CONSTRAINT "config_menu_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD CONSTRAINT "pages_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards" ADD CONSTRAINT "pages_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_zone_list_items" ADD CONSTRAINT "pages_blocks_zone_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_zone_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_zone_list" ADD CONSTRAINT "pages_blocks_zone_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_cards_bullets" ADD CONSTRAINT "pages_blocks_service_cards_cards_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_cards" ADD CONSTRAINT "pages_blocks_service_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards" ADD CONSTRAINT "pages_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_aid_cards_cards_details" ADD CONSTRAINT "pages_blocks_aid_cards_cards_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_aid_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_aid_cards_cards" ADD CONSTRAINT "pages_blocks_aid_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_aid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_aid_cards" ADD CONSTRAINT "pages_blocks_aid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_items" ADD CONSTRAINT "pages_blocks_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps" ADD CONSTRAINT "pages_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_cards_links" ADD CONSTRAINT "pages_blocks_link_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_link_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_cards" ADD CONSTRAINT "pages_blocks_link_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "config_menu_services_order_idx" ON "config_menu_services" USING btree ("_order");
  CREATE INDEX "config_menu_services_parent_id_idx" ON "config_menu_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_cards_cards_order_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_cards_parent_id_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_order_idx" ON "pages_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_parent_id_idx" ON "pages_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_path_idx" ON "pages_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_zone_list_items_order_idx" ON "pages_blocks_zone_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_zone_list_items_parent_id_idx" ON "pages_blocks_zone_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_zone_list_order_idx" ON "pages_blocks_zone_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_zone_list_parent_id_idx" ON "pages_blocks_zone_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_zone_list_path_idx" ON "pages_blocks_zone_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_order_idx" ON "pages_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_parent_id_idx" ON "pages_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_path_idx" ON "pages_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_cards_cards_bullets_order_idx" ON "pages_blocks_service_cards_cards_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_cards_bullets_parent_id_idx" ON "pages_blocks_service_cards_cards_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_cards_order_idx" ON "pages_blocks_service_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_cards_parent_id_idx" ON "pages_blocks_service_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_order_idx" ON "pages_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_parent_id_idx" ON "pages_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_path_idx" ON "pages_blocks_service_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_aid_cards_cards_details_order_idx" ON "pages_blocks_aid_cards_cards_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_aid_cards_cards_details_parent_id_idx" ON "pages_blocks_aid_cards_cards_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_aid_cards_cards_order_idx" ON "pages_blocks_aid_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_aid_cards_cards_parent_id_idx" ON "pages_blocks_aid_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_aid_cards_order_idx" ON "pages_blocks_aid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_aid_cards_parent_id_idx" ON "pages_blocks_aid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_aid_cards_path_idx" ON "pages_blocks_aid_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_steps_items_order_idx" ON "pages_blocks_steps_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_items_parent_id_idx" ON "pages_blocks_steps_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_order_idx" ON "pages_blocks_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_parent_id_idx" ON "pages_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_path_idx" ON "pages_blocks_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_link_cards_links_order_idx" ON "pages_blocks_link_cards_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_cards_links_parent_id_idx" ON "pages_blocks_link_cards_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_cards_order_idx" ON "pages_blocks_link_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_cards_parent_id_idx" ON "pages_blocks_link_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_cards_path_idx" ON "pages_blocks_link_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The pages_and_site_settings migration cannot be reverted: it would erase the pages, the legal identity, the review fields and the media alt texts. Restore the database from a backup instead",
  );
}
