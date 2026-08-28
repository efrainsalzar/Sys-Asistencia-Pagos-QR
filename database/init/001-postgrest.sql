DO $$
BEGIN
  CREATE ROLE anon NOLOGIN;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

CREATE SCHEMA IF NOT EXISTS app;
CREATE SCHEMA IF NOT EXISTS api;

ALTER SCHEMA app OWNER TO CURRENT_USER;
ALTER SCHEMA api OWNER TO CURRENT_USER;

REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM anon;

-- PostgREST starts with no exposed tables or functions.
-- Each object must receive an explicit grant in a later migration.
GRANT USAGE ON SCHEMA api TO anon;
