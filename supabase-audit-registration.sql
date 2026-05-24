-- ============================================================
-- SPECTRUM 2025 — REGISTRATION AUDIT (READ-ONLY)
-- Safe to run in Supabase SQL Editor. Does NOT change anything.
-- Run all sections, copy/save the results, then share with dev.
-- ============================================================


-- ------------------------------------------------------------
-- 1) Table exists + row count
-- ------------------------------------------------------------
SELECT
  'registrations' AS table_name,
  COUNT(*) AS total_rows
FROM registrations;


-- ------------------------------------------------------------
-- 2) Column list (confirm schema matches app)
-- ------------------------------------------------------------
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'registrations'
ORDER BY ordinal_position;


-- ------------------------------------------------------------
-- 3) Existing indexes & unique constraints on registrations
-- (If empty → duplicates are NOT blocked at DB level today)
-- ------------------------------------------------------------
SELECT
  i.relname AS index_name,
  ix.indisunique AS is_unique,
  pg_get_indexdef(ix.indexrelid) AS index_definition
FROM pg_class t
JOIN pg_index ix ON t.oid = ix.indrelid
JOIN pg_class i ON i.oid = ix.indexrelid
JOIN pg_namespace n ON n.oid = t.relnamespace
WHERE n.nspname = 'public'
  AND t.relname = 'registrations'
ORDER BY index_name;


-- ------------------------------------------------------------
-- 4) RLS enabled? + policies on registrations
-- ------------------------------------------------------------
SELECT
  c.relname AS table_name,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS rls_forced
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname = 'registrations';

SELECT
  policyname,
  cmd AS command,
  roles,
  qual AS using_expression,
  with_check AS with_check_expression
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'registrations'
ORDER BY policyname;


-- ------------------------------------------------------------
-- 5) Duplicate registrations (same email + same event)
-- Must be ZERO before adding a unique index
-- ------------------------------------------------------------
SELECT
  LOWER(email) AS email,
  main_category,
  sub_category,
  COUNT(*) AS duplicate_count,
  MIN(created_at) AS first_registered,
  MAX(created_at) AS last_registered,
  ARRAY_AGG(id ORDER BY created_at DESC) AS registration_ids
FROM registrations
GROUP BY LOWER(email), main_category, sub_category
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, email
LIMIT 100;


-- ------------------------------------------------------------
-- 6) Summary: how many duplicate groups exist?
-- ------------------------------------------------------------
SELECT
  COUNT(*) AS duplicate_groups,
  COALESCE(SUM(cnt - 1), 0) AS extra_rows_to_remove_if_deduped
FROM (
  SELECT COUNT(*) AS cnt
  FROM registrations
  GROUP BY LOWER(email), main_category, sub_category
  HAVING COUNT(*) > 1
) d;


-- ------------------------------------------------------------
-- 7) Storage bucket: team_logos
-- ------------------------------------------------------------
SELECT id, name, public, created_at
FROM storage.buckets
WHERE id = 'team_logos';


-- ------------------------------------------------------------
-- 8) Storage policies for team_logos
-- ------------------------------------------------------------
SELECT
  policyname,
  cmd AS command,
  roles,
  qual AS using_expression,
  with_check AS with_check_expression
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND (
    policyname ILIKE '%logo%'
    OR qual::text ILIKE '%team_logos%'
    OR with_check::text ILIKE '%team_logos%'
  )
ORDER BY policyname;


-- ------------------------------------------------------------
-- 9) Registrations with logo URL vs without (recent sample)
-- ------------------------------------------------------------
SELECT
  COUNT(*) FILTER (WHERE team_logo_url IS NOT NULL AND TRIM(team_logo_url) <> '') AS with_logo,
  COUNT(*) FILTER (WHERE team_logo_url IS NULL OR TRIM(team_logo_url) = '') AS without_logo,
  COUNT(*) AS total
FROM registrations;

SELECT
  id,
  full_name,
  email,
  main_category,
  sub_category,
  team_name,
  CASE
    WHEN team_logo_url IS NOT NULL AND TRIM(team_logo_url) <> '' THEN 'yes'
    ELSE 'no'
  END AS has_logo,
  created_at
FROM registrations
ORDER BY created_at DESC
LIMIT 20;


-- ------------------------------------------------------------
-- 10) Registrations per main category (sanity check)
-- ------------------------------------------------------------
SELECT
  main_category,
  sub_category,
  COUNT(*) AS registrations
FROM registrations
GROUP BY main_category, sub_category
ORDER BY registrations DESC;
