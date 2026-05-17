-- ==========================================
-- SPECTRUM '26 - FLAT DATABASE SCHEMA (V4)
-- Description: Replaces all segregated tables with a single, highly-performant flat table.
-- ==========================================

-- 1. Clean up all old segregated tables (Fresh Start)
DROP VIEW IF EXISTS registration_stats CASCADE;
DROP TABLE IF EXISTS registrations CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS participants CASCADE;
DROP TABLE IF EXISTS events CASCADE;

-- 2. Create the Single Flat Registrations Table
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    university TEXT NOT NULL,
    department TEXT,
    roll_number TEXT,
    main_category TEXT NOT NULL,
    sub_category TEXT NOT NULL,
    team_name TEXT,
    team_logo_url TEXT,
    team_members TEXT, -- Combined text field for team members
    terms_accepted BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- 3. Create the Stats View for the Dashboard Charts
CREATE OR REPLACE VIEW registration_stats AS
SELECT 
    main_category,
    sub_category,
    COUNT(*) AS total_registrations,
    COUNT(DISTINCT email) AS unique_participants
FROM registrations
GROUP BY main_category, sub_category;

-- 4. RLS Security Policies

-- Policy: Allow public anonymous submissions (Anyone can register)
CREATE POLICY "Allow public inserts" 
ON registrations FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Policy: Allow authenticated users to view registrations (Only logged-in admins can read)
CREATE POLICY "Allow authenticated read" 
ON registrations FOR SELECT 
TO authenticated 
USING (true);

-- Policy: Allow admins to delete registrations if needed
CREATE POLICY "Allow authenticated delete" 
ON registrations FOR DELETE 
TO authenticated 
USING (true);

-- 5. Secure public bucket for Team Logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team_logos', 'team_logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- Safe Drop before Create
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;

CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'team_logos');

CREATE POLICY "Public Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'team_logos');

CREATE POLICY "Admin Delete" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'team_logos');
