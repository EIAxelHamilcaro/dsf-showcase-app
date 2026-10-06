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
select 'config_faq_section_faq', count(*),
  md5(coalesce(string_agg(to_jsonb(t)::text, '|' order by id), ''))
from config_faq_section_faq t
union all
select 'config_testimonials_section', count(*),
  md5(coalesce(string_agg(
    (to_jsonb(t) - array['rating', 'date', 'source'])::text, '|' order by id
  ), ''))
from config_testimonials_section t
order by 1;
