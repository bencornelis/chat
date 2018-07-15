PGCMD="DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public; COMMENT ON SCHEMA public IS 'standard public schema';"
PGPASSWORD=test psql --username=chat_user --dbname=chat --host=localhost --port=6432 --command "$PGCMD"
