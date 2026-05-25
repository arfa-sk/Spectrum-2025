-- ============================================================
-- SPECTRUM 2025 — CONTACT MESSAGES TABLE
-- ============================================================


-- AUDIT: Check if table exists (run this first)
SELECT EXISTS (
  SELECT 1 FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name = 'contact_messages'
) AS table_exists;

-- If table_exists = true, check policies:
SELECT policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'contact_messages'
ORDER BY policyname;


-- ============================================================
-- IF table_exists = false, run everything below.
-- IF table_exists = true but no INSERT policy for anon,
-- run only the policy section.
-- ============================================================

/*
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a contact message
CREATE POLICY "Allow public contact inserts"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow admins to read messages
CREATE POLICY "Allow authenticated read contact"
ON contact_messages FOR SELECT
TO authenticated
USING (true);

-- Allow admins to delete messages
CREATE POLICY "Allow authenticated delete contact"
ON contact_messages FOR DELETE
TO authenticated
USING (true);
*/
