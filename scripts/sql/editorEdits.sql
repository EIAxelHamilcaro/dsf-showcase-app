begin;
update config set
  financial_section_financial_help_1_title = 'Titre saisi par le client',
  google_profile_url = 'https://example.test/fiche-saisie-par-le-client',
  seo_title = 'Titre saisi par le client';
update config_menu_services set description = 'Description saisie par le client'
where href = '/aides-financieres';
update media set alt = 'Description saisie par le client' where id = 41;
update pages_blocks_aid_cards_cards set title = 'Titre saisi par le client'
where title = 'Crédit d''impôt 25 % (supprimé depuis le 1er janvier 2026)';
update pages_blocks_aid_cards set intro = 'Introduction saisie par le client'
where intro = 'Ne payez pas le prix fort ! Vous pouvez bénéficier de plusieurs aides :';
update pages_blocks_faq_items set answer = 'Réponse saisie par le client'
where _order = 1;
update pages_blocks_text_section set heading = 'Titre saisi par le client';
update pages_blocks_legal_content set title = 'Titre saisi par le client';
update pages set seo_description = 'Description saisie par le client', seo_information_only = false
where slug = 'aides-financieres';
update pages_blocks_aid_cards_cards_details set text = 'Condition saisie par le client'
where text = 'Propriétaire occupant de 70 ans ou plus, sans condition de perte d''autonomie (autres cas sur la fiche officielle)';
delete from payload_migrations
where name like '%\_turnkey\_content' or name like '%\_content\_review\_fixes'
  or name like '%\_home\_seo\_and\_aid\_conditions';
commit;
select 'editor changes applied, content migration records left: ' || count(*) from payload_migrations
where name like '%\_turnkey\_content' or name like '%\_content\_review\_fixes'
  or name like '%\_home\_seo\_and\_aid\_conditions';
