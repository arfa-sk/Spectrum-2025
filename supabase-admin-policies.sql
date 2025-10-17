-- Secure Supabase RLS policies for admin system
-- Run this in Supabase SQL Editor

-- 1. Drop existing SELECT policy (too permissive)
DROP POLICY IF EXISTS "Allow admin read access" ON public.registrations;

-- 2. Create new SELECT policy - only authenticated users (admins)
CREATE POLICY "Allow authenticated read access" ON public.registrations
FOR SELECT TO authenticated
USING (true);

-- 3. Keep existing INSERT policy for public registration (unchanged)
-- This allows public users to register without authentication

-- 4. Optional: Create admin users table for role management
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 6. Policy for admin_users (only authenticated users can read)
CREATE POLICY "Allow authenticated admin access" ON public.admin_users
FOR SELECT TO authenticated
USING (true);

-- 7. Create admin user (replace with your email)
-- INSERT INTO public.admin_users (email) VALUES ('your-admin@email.com');

-- 8. Verify policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  cmd, 
  roles, 
  qual, 
  with_check
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('registrations', 'admin_users')
ORDER BY tablename, policyname;
