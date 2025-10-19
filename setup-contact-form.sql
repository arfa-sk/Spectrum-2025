-- Contact Form Database Setup for Spectrum 2025
-- This script creates the contact_messages table and necessary policies

-- 1. Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON public.contact_messages(is_read);

-- 3. Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
-- Allow public to insert contact messages
CREATE POLICY "Allow public to insert contact messages" ON public.contact_messages
    FOR INSERT TO public
    WITH CHECK (true);

-- Allow authenticated users to read all contact messages
CREATE POLICY "Allow authenticated users to read contact messages" ON public.contact_messages
    FOR SELECT TO authenticated
    USING (true);

-- Allow authenticated users to update contact messages (for marking as read)
CREATE POLICY "Allow authenticated users to update contact messages" ON public.contact_messages
    FOR UPDATE TO authenticated
    USING (true);

-- 5. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Create trigger for updated_at
CREATE TRIGGER contact_messages_updated_at
    BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_messages_updated_at();

-- 7. Create view for contact statistics
CREATE OR REPLACE VIEW public.contact_stats AS
SELECT 
    COUNT(*) as total_messages,
    COUNT(*) FILTER (WHERE is_read = false) as unread_messages,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as today_messages,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as weekly_messages,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as monthly_messages
FROM public.contact_messages;

-- 8. Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.contact_messages TO anon, authenticated;
GRANT SELECT ON public.contact_stats TO authenticated;

-- 9. Enable realtime for contact_messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;

-- 10. Test the setup
INSERT INTO public.contact_messages (name, email, subject, message) 
VALUES ('Test User', 'test@example.com', 'Test Subject', 'This is a test message');

-- Verify the setup
SELECT 'Contact messages table created successfully' as status;
SELECT COUNT(*) as test_message_count FROM public.contact_messages;
