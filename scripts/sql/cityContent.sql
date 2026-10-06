select format(
  'select %L || ''|'' || (to_jsonb(t) - array[''updated_at'', ''created_at''])::text from %I t order by 1',
  table_name, table_name)
from information_schema.tables
where table_schema = 'public' and table_type = 'BASE TABLE'
  and (table_name like 'cities%' or table_name like 'city\_template%')
order by table_name
\gexec
