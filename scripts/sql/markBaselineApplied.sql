begin;
delete from payload_migrations where batch = -1;
insert into payload_migrations (name, batch)
select :'baseline', 1
where not exists (select 1 from payload_migrations where name = :'baseline');
commit;
select name, batch from payload_migrations order by id;
