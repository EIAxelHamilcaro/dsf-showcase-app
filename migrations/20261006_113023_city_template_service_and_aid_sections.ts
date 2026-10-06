import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_city_template_aid_cards_cards_icon" AS ENUM('none', 'mapPin', 'clock', 'shield', 'euro', 'checkCircle', 'fileText');
  CREATE TYPE "public"."enum_city_template_service_cards_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_city_template_service_cards_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_city_template_aid_cards_background" AS ENUM('default', 'muted');
  CREATE TYPE "public"."enum_city_template_aid_cards_variant" AS ENUM('compact', 'detailed');
  CREATE TABLE "city_template_service_cards_cards_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "city_template_service_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link_label" varchar,
  	"link_href" varchar
  );
  
  CREATE TABLE "city_template_aid_cards_cards_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "city_template_aid_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_city_template_aid_cards_cards_icon" DEFAULT 'none' NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" varchar,
  	"note" varchar
  );
  
  ALTER TABLE "city_template" ADD COLUMN "service_cards_background" "enum_city_template_service_cards_background" DEFAULT 'default';
  ALTER TABLE "city_template" ADD COLUMN "service_cards_heading" varchar;
  ALTER TABLE "city_template" ADD COLUMN "service_cards_columns" "enum_city_template_service_cards_columns" DEFAULT '2';
  ALTER TABLE "city_template" ADD COLUMN "aid_cards_background" "enum_city_template_aid_cards_background" DEFAULT 'default';
  ALTER TABLE "city_template" ADD COLUMN "aid_cards_variant" "enum_city_template_aid_cards_variant" DEFAULT 'compact';
  ALTER TABLE "city_template" ADD COLUMN "aid_cards_heading" varchar;
  ALTER TABLE "city_template" ADD COLUMN "aid_cards_intro" varchar;
  ALTER TABLE "city_template" ADD COLUMN "aid_cards_button_label" varchar;
  ALTER TABLE "city_template" ADD COLUMN "aid_cards_button_href" varchar;
  ALTER TABLE "city_template_service_cards_cards_bullets" ADD CONSTRAINT "city_template_service_cards_cards_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."city_template_service_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "city_template_service_cards_cards" ADD CONSTRAINT "city_template_service_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."city_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "city_template_aid_cards_cards_details" ADD CONSTRAINT "city_template_aid_cards_cards_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."city_template_aid_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "city_template_aid_cards_cards" ADD CONSTRAINT "city_template_aid_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."city_template"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "city_template_service_cards_cards_bullets_order_idx" ON "city_template_service_cards_cards_bullets" USING btree ("_order");
  CREATE INDEX "city_template_service_cards_cards_bullets_parent_id_idx" ON "city_template_service_cards_cards_bullets" USING btree ("_parent_id");
  CREATE INDEX "city_template_service_cards_cards_order_idx" ON "city_template_service_cards_cards" USING btree ("_order");
  CREATE INDEX "city_template_service_cards_cards_parent_id_idx" ON "city_template_service_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "city_template_aid_cards_cards_details_order_idx" ON "city_template_aid_cards_cards_details" USING btree ("_order");
  CREATE INDEX "city_template_aid_cards_cards_details_parent_id_idx" ON "city_template_aid_cards_cards_details" USING btree ("_parent_id");
  CREATE INDEX "city_template_aid_cards_cards_order_idx" ON "city_template_aid_cards_cards" USING btree ("_order");
  CREATE INDEX "city_template_aid_cards_cards_parent_id_idx" ON "city_template_aid_cards_cards" USING btree ("_parent_id");`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    "The city_template_service_and_aid_sections migration cannot be reverted: it would erase the services and aids sections of the city page template. Restore the database from a backup instead",
  );
}
