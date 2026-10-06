import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"adress" varchar,
  	"message" varchar,
  	"step1" varchar,
  	"step2" varchar,
  	"step3" varchar,
  	"step4" varchar,
  	"consent_main" boolean,
  	"consent_partners" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "config_caroussel_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"before_id" integer,
  	"after_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "config_testimonials_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"age" varchar,
  	"text" varchar,
  	"location" varchar
  );
  
  CREATE TABLE "config_faq_section_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "config" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"email" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"hero_image_label_hero_image_label_1" varchar,
  	"hero_image_label_hero_image_label_2" varchar,
  	"main_title" jsonb NOT NULL,
  	"sub_main_title" varchar,
  	"main_tags_main_tag_1" varchar,
  	"main_tags_main_tag_2" varchar,
  	"main_tags_main_tag_3" varchar,
  	"main_button_main_button_1" varchar,
  	"main_button_main_button_2" varchar,
  	"main_button_guide_pdf_id" integer NOT NULL,
  	"main_button_doc_pdf_id" integer,
  	"about_title" varchar,
  	"about_text" varchar,
  	"about_features_about_feature_1_about_feature_title_1" varchar NOT NULL,
  	"about_features_about_feature_1_about_feature_text_1" varchar NOT NULL,
  	"about_features_about_feature_2_about_feature_title_2" varchar NOT NULL,
  	"about_features_about_feature_2_about_feature_text_2" varchar NOT NULL,
  	"about_features_about_feature_3_about_feature_title_3" varchar NOT NULL,
  	"about_features_about_feature_3_about_feature_text_3" varchar NOT NULL,
  	"about_features_about_feature_4_about_feature_title_4" varchar NOT NULL,
  	"about_features_about_feature_4_about_feature_text_4" varchar NOT NULL,
  	"about_image_id" integer,
  	"about_section_about_heading" varchar NOT NULL,
  	"about_section_about_paragraphs_para_1" varchar,
  	"about_section_about_paragraphs_para_2" varchar,
  	"about_section_about_paragraphs_para_3" varchar,
  	"services_section_title" varchar,
  	"services_section_description" varchar,
  	"services_section_about_feature_1_about_feature_title_1" varchar,
  	"services_section_about_feature_1_about_feature_text_1" varchar,
  	"services_section_about_feature_2_about_feature_title_2" varchar,
  	"services_section_about_feature_2_about_feature_text_2" varchar,
  	"services_section_about_feature_3_about_feature_title_3" varchar,
  	"services_section_about_feature_3_about_feature_text_3" varchar,
  	"services_section_about_feature_4_about_feature_title_4" varchar,
  	"services_section_about_feature_4_about_feature_text_4" varchar,
  	"services_section_about_feature_5_about_feature_title_5" varchar,
  	"services_section_about_feature_5_about_feature_text_5" varchar,
  	"services_section_about_feature_6_about_feature_title_6" varchar,
  	"services_section_about_feature_6_about_feature_text_6" varchar,
  	"financial_section_title" varchar,
  	"financial_section_description" varchar,
  	"financial_section_sub_description" varchar,
  	"financial_section_financial_help_1_icon_text" varchar,
  	"financial_section_financial_help_1_title" varchar,
  	"financial_section_financial_help_1_description" varchar,
  	"financial_section_financial_help_1_impot_pdf_id" integer,
  	"financial_section_financial_help_2_icon_text" varchar,
  	"financial_section_financial_help_2_title" varchar,
  	"financial_section_financial_help_2_description" varchar,
  	"financial_section_financial_help_3_icon_text" varchar,
  	"financial_section_financial_help_3_title" varchar,
  	"financial_section_financial_help_3_description" varchar,
  	"financial_section_financial_help_4_icon_text" varchar,
  	"financial_section_financial_help_4_title" varchar,
  	"financial_section_financial_help_4_description" varchar,
  	"form_section_title" varchar,
  	"form_section_description" varchar,
  	"form_section_disponibility" varchar,
  	"form_section_work_zone_title" varchar,
  	"form_section_work_zone_region" varchar,
  	"form_section_work_zone_radius" varchar,
  	"form_section_time_section_title" varchar,
  	"form_section_time_section_list_devis" varchar,
  	"form_section_time_section_list_travaux" varchar,
  	"form_section_time_section_list_total" varchar,
  	"faq_section_title" varchar,
  	"faq_section_description" varchar,
  	"footer_section_title" varchar,
  	"footer_section_description" varchar,
  	"footer_section_region" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"leads_id" integer,
  	"config_id" integer,
  	"users_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "config_caroussel_section" ADD CONSTRAINT "config_caroussel_section_before_id_media_id_fk" FOREIGN KEY ("before_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "config_caroussel_section" ADD CONSTRAINT "config_caroussel_section_after_id_media_id_fk" FOREIGN KEY ("after_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "config_caroussel_section" ADD CONSTRAINT "config_caroussel_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "config_testimonials_section" ADD CONSTRAINT "config_testimonials_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "config_faq_section_faq" ADD CONSTRAINT "config_faq_section_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "config" ADD CONSTRAINT "config_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "config" ADD CONSTRAINT "config_main_button_guide_pdf_id_media_id_fk" FOREIGN KEY ("main_button_guide_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "config" ADD CONSTRAINT "config_main_button_doc_pdf_id_media_id_fk" FOREIGN KEY ("main_button_doc_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "config" ADD CONSTRAINT "config_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "config" ADD CONSTRAINT "config_financial_section_financial_help_1_impot_pdf_id_media_id_fk" FOREIGN KEY ("financial_section_financial_help_1_impot_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_config_fk" FOREIGN KEY ("config_id") REFERENCES "public"."config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "config_caroussel_section_order_idx" ON "config_caroussel_section" USING btree ("_order");
  CREATE INDEX "config_caroussel_section_parent_id_idx" ON "config_caroussel_section" USING btree ("_parent_id");
  CREATE INDEX "config_caroussel_section_before_idx" ON "config_caroussel_section" USING btree ("before_id");
  CREATE INDEX "config_caroussel_section_after_idx" ON "config_caroussel_section" USING btree ("after_id");
  CREATE INDEX "config_testimonials_section_order_idx" ON "config_testimonials_section" USING btree ("_order");
  CREATE INDEX "config_testimonials_section_parent_id_idx" ON "config_testimonials_section" USING btree ("_parent_id");
  CREATE INDEX "config_faq_section_faq_order_idx" ON "config_faq_section_faq" USING btree ("_order");
  CREATE INDEX "config_faq_section_faq_parent_id_idx" ON "config_faq_section_faq" USING btree ("_parent_id");
  CREATE INDEX "config_hero_image_idx" ON "config" USING btree ("hero_image_id");
  CREATE INDEX "config_main_button_main_button_guide_pdf_idx" ON "config" USING btree ("main_button_guide_pdf_id");
  CREATE INDEX "config_main_button_main_button_doc_pdf_idx" ON "config" USING btree ("main_button_doc_pdf_id");
  CREATE INDEX "config_about_image_idx" ON "config" USING btree ("about_image_id");
  CREATE INDEX "config_financial_section_financial_help_1_financial_sect_idx" ON "config" USING btree ("financial_section_financial_help_1_impot_pdf_id");
  CREATE INDEX "config_updated_at_idx" ON "config" USING btree ("updated_at");
  CREATE INDEX "config_created_at_idx" ON "config" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_config_id_idx" ON "payload_locked_documents_rels" USING btree ("config_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error("The baseline migration cannot be reverted");
}
