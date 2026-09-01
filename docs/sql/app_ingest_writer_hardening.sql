-- Role hardening script for app_ingest_writer
-- Run as a privileged role (e.g., admin) in PostgreSQL.
-- IMPORTANT: Replace the password placeholder before executing.

BEGIN;

-- 1) Set the role password (replace placeholder)
ALTER ROLE app_ingest_writer
	WITH PASSWORD 'QuartzWillow-FluxRaven-5829$Tide';

-- 2) Optional: Set password expiry (adjust date as needed)
ALTER ROLE app_ingest_writer
	VALID UNTIL '2027-06-26';

-- 3) Optional: Limit concurrent connections for this role
ALTER ROLE app_ingest_writer
	CONNECTION LIMIT 20;

COMMIT;

-- 4) Verify role settings
SELECT
	rolname,
	rolcanlogin,
	rolconnlimit,
	rolvaliduntil
FROM pg_roles
WHERE rolname = 'app_ingest_writer';
