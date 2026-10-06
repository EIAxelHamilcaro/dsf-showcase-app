select 'leads' as table_name, count(*) as row_count,
  md5(coalesce(string_agg(to_jsonb(t)::text, '|' order by id), '')) as checksum
from leads t
union all
select 'users', count(*),
  md5(coalesce(string_agg(to_jsonb(t)::text, '|' order by id), ''))
from users t
union all
select 'users_sessions', count(*),
  md5(coalesce(string_agg(to_jsonb(t)::text, '|' order by id), ''))
from users_sessions t
union all
select 'media', count(*),
  md5(coalesce(string_agg((to_jsonb(t) - 'alt')::text, '|' order by id), ''))
from media t
union all
select 'config', count(*),
  md5(coalesce(string_agg((to_jsonb(t) - array[
    'legal_section_legal_name',
    'legal_section_legal_form',
    'legal_section_siren',
    'legal_section_street_address',
    'legal_section_postal_code',
    'legal_section_locality',
    'google_rating',
    'google_review_count',
    'google_profile_url'
  ])::text, '|' order by id), ''))
from config t
union all
select 'config_faq_section_faq', count(*),
  md5(coalesce(string_agg(to_jsonb(t)::text, '|' order by id), ''))
from config_faq_section_faq t
union all
select 'config_caroussel_section', count(*),
  md5(coalesce(string_agg(to_jsonb(t)::text, '|' order by id), ''))
from config_caroussel_section t
union all
select 'config_testimonials_section', count(*),
  md5(coalesce(string_agg(
    (to_jsonb(t) - array['rating', 'date', 'source'])::text, '|' order by id
  ), ''))
from config_testimonials_section t
order by 1;
