-- ==========================================
-- SPECTRUM '26 - ENTERPRISE DATABASE UPDATE V3
-- Description: Adds relational team members tracking and logo storage
-- ==========================================

-- 1. Update Teams Table
-- We are keeping the old team_members text column for backward compatibility with older data
ALTER TABLE teams ADD COLUMN IF NOT EXISTS team_logo_url TEXT;

-- 2. Create Detailed Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookups (very important for Admin dashboard joins)
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);

-- 3. Create Storage Bucket for Team Logos
-- This creates a public bucket called 'team_logos'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team_logos', 'team_logos', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Storage Security Policies
-- Allow anyone to view the logos
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'team_logos');

-- Allow public uploads (to support the registration form)
CREATE POLICY "Public Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'team_logos');

-- Allow admins to delete or manage if needed
CREATE POLICY "Admin Delete" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'team_logos');
