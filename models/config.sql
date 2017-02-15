show variables like 'max_connections';
show global status like 'max_used_connections';
set global max_connections = 300;
truncate tk_database.tm;
select * from tk_database.tm;