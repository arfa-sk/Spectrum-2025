-- ============================================================
-- SPECTRUM 2025 — REGISTRATION MIGRATION (SAFE)
-- Run ONLY after supabase-audit-registration.sql shows:
--   duplicate_groups = 0
--
-- What this does:
--   Adds ONE unique index so the same email cannot register
--   twice for the same event (main_category + sub_category).
--
-- What this does NOT do:
--   No DELETE, no UPDATE, no column changes, no DROP.
--   Existing 75 rows are untouched.
--
-- Rule blocked:  same email + same main_category + same sub_category
-- Rule allowed:  same email + different sub_category (e.g. FC 26 + Tekken 8)
-- ============================================================


-- ------------------------------------------------------------
-- PRE-FLIGHT (optional — should return 0 rows)
-- If rows appear, STOP and dedupe before running STEP 2.
-- ------------------------------------------------------------
SELECT
  LOWER(email) AS email,
  main_category,
  sub_category,
  COUNT(*) AS duplicate_count
FROM registrations
GROUP BY LOWER(email), main_category, sub_category
HAVING COUNT(*) > 1;


-- ------------------------------------------------------------
-- STEP 1: Create unique index (safe, additive only)
-- Uses LOWER(email) so Aziz@x.com and aziz@x.com are treated the same.
-- ------------------------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS registrations_email_event_unique
ON public.registrations (
  LOWER(email),
  main_category,
  sub_category
);


-- ------------------------------------------------------------
-- STEP 2: Verify index was created
-- ------------------------------------------------------------
SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = 'registrations'
  AND indexname = 'registrations_email_event_unique';


-- ------------------------------------------------------------
-- STEP 3: Smoke test (optional — run manually, then ROLLBACK)
-- Pick a real email from your table; second insert should FAIL with
-- duplicate key error. Do NOT leave the test row — use ROLLBACK.
-- ------------------------------------------------------------
/*
BEGIN;

INSERT INTO registrations (
  full_name, email, phone_number, university,
  main_category, sub_category, terms_accepted
) VALUES (
  'Test User', 'test-duplicate-check@example.com', '03001234567', 'Test Uni',
  'E-Sports', 'Tekken 8', true
);

INSERT INTO registrations (
  full_name, email, phone_number, university,
  main_category, sub_category, terms_accepted
) VALUES (
  'Test User Duplicate', 'test-duplicate-check@example.com', '03001234567', 'Test Uni',
  'E-Sports', 'Tekken 8', true
);  -- Expected: ERROR duplicate key

ROLLBACK;
*/
