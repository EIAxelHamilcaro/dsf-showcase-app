select 'config' as table_name, t.id::text as row_key, cell.key, cell.value::text
from config t, lateral jsonb_each(to_jsonb(t)) cell
union all
select 'config_caroussel_section', t._order::text, cell.key, cell.value::text
from config_caroussel_section t, lateral jsonb_each(to_jsonb(t)) cell
union all
select 'media', t.id::text, cell.key, cell.value::text
from media t, lateral jsonb_each(to_jsonb(t)) cell
order by 1, 2, 3;
