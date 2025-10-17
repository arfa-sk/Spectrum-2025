-- Create registrations table for Spectrum 2025
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  university VARCHAR(255) NOT NULL,
  department VARCHAR(255),
  roll_number VARCHAR(100),
  main_category VARCHAR(100) NOT NULL,
  sub_category VARCHAR(100) NOT NULL,
  team_name VARCHAR(255),
  team_members TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_registrations_category ON registrations(main_category, sub_category);

-- Create index for timestamp sorting
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for public registration)
CREATE POLICY "Allow public registration" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow admins to read all registrations
-- Note: You'll need to set up authentication and admin roles for this
CREATE POLICY "Allow admin read access" ON registrations
  FOR SELECT
  USING (true);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for registration statistics
CREATE OR REPLACE VIEW registration_stats AS
SELECT 
  main_category,
  sub_category,
  COUNT(*) as total_registrations,
  COUNT(DISTINCT email) as unique_participants
FROM registrations
GROUP BY main_category, sub_category
ORDER BY main_category, sub_category;

COMMENT ON TABLE registrations IS 'Stores participant registrations for Spectrum 2025 event';
COMMENT ON COLUMN registrations.team_members IS 'Newline-separated list of team member names';

ALTER TABLE registrations ADD COLUMN IF NOT EXISTS terms_accepted boolean DEFAULT false;