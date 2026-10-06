begin;
update city_template set
  hero_intro = 'Introduction saisie par le client à {ville}',
  seo_title = 'Titre saisi par le client pour {ville}',
  cta_phone_label = null,
  cta_text = 'Texte saisi par le client',
  feature_cards_heading = null,
  aid_cards_heading = 'Aides saisies par le client à {ville}';
update city_template_feature_cards_cards set title = 'Titre saisi par le client'
where _order = 1;
update cities set
  name = 'Nom saisi par le client',
  location_line = 'Ligne saisie par le client',
  seo_description = 'Description saisie par le client'
where slug = 'douche-senior-tours';
update cities set seo_title = null, seo_description = null, area_name = null
where slug = 'douche-senior-romorantin';
update cities_zones set name = 'Commune saisie par le client' where _order = 1;
update cities_faq_items set answer = 'Réponse saisie par le client' where _order = 1;
update cities_local_section_paragraphs set text = 'Paragraphe saisi par le client'
where _order = 2;
update cities_blocks_testimonial set rating = null;
update cities set seo_title = 'Titre saisi par le client' where slug = 'douche-senior-orleans';
update city_template_service_cards_cards set title = 'Prestation saisie par le client' where _order = 1;
delete from city_template_aid_cards_cards where _order = 2;
delete from cities where slug = 'douche-senior-bourges';
delete from payload_migrations
where name like '%\_city\_pages\_from\_template' or name like '%\_city\_pages\_share\_one\_model';
commit;
select 'editor changes applied, city migration records left: ' || count(*) from payload_migrations
where name like '%\_city\_pages\_from\_template' or name like '%\_city\_pages\_share\_one\_model';
