-- ==========================================
-- 1. EXTENSIONS & ENUMS
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE registration_status AS ENUM ('pending', 'approved', 'rejected');

-- ==========================================
-- 2. TABLES
-- ==========================================

-- Events Catalog
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    main_category TEXT NOT NULL,
    sub_category TEXT NOT NULL,
    max_capacity INT DEFAULT 1000,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(main_category, sub_category)
);

-- Participants (Users)
CREATE TABLE participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    phone_number TEXT NOT NULL,
    university TEXT NOT NULL,
    department TEXT,
    roll_number TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Teams (For group events)
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_name TEXT UNIQUE NOT NULL,
    team_members TEXT,
    leader_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Registrations (The core transaction table)
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id UUID REFERENCES participants(id) ON DELETE RESTRICT,
    event_id UUID REFERENCES events(id) ON DELETE RESTRICT,
    team_id UUID REFERENCES teams(id) ON DELETE SET NULL, -- Null if individual
    status registration_status DEFAULT 'pending',
    terms_accepted BOOLEAN NOT NULL CHECK (terms_accepted = true),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(participant_id, event_id) -- Prevents duplicate registration for same event
);

-- Audit Logs (Security Tracking)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    changed_by UUID, -- Can be linked to auth.users
    changed_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- 3. PERFORMANCE INDEXES
-- ==========================================
CREATE INDEX idx_participants_email ON participants(email);
CREATE INDEX idx_registrations_participant ON registrations(participant_id);
CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_status ON registrations(status);

-- ==========================================
-- 4. VIEW (Real-Time Analytics)
-- ==========================================
CREATE OR REPLACE VIEW registration_stats AS
SELECT 
    e.main_category,
    e.sub_category,
    COUNT(r.id) as total_registrations,
    COUNT(DISTINCT r.participant_id) as unique_participants,
    MIN(r.created_at) as first_registration,
    MAX(r.created_at) as latest_registration
FROM events e
LEFT JOIN registrations r ON e.id = r.event_id
GROUP BY e.main_category, e.sub_category;

-- ==========================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Security Policies
CREATE POLICY "Public can insert participants" ON participants FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert teams" ON teams FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert registrations" ON registrations FOR INSERT WITH CHECK (true);

-- Admins can view everything
CREATE POLICY "Admins can view participants" ON participants FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can view registrations" ON registrations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can view teams" ON teams FOR SELECT USING (auth.role() = 'authenticated');

-- ==========================================
-- 6. SECURITY TRIGGERS (Auto Updated_At & Auditing)
-- ==========================================
-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_modified_column() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registrations_modtime BEFORE UPDATE ON registrations FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Auto Audit Trigger
CREATE OR REPLACE FUNCTION audit_trigger() RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_data) VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', row_to_json(OLD)::jsonb);
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_data, new_data) VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
        RETURN NEW;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER audit_registrations AFTER UPDATE OR DELETE ON registrations FOR EACH ROW EXECUTE PROCEDURE audit_trigger();

-- ==========================================
-- 7. DEFAULT SEED DATA
-- ==========================================
-- Insert the categories so users can register for them immediately.
INSERT INTO events (main_category, sub_category) VALUES 
('Play To Win', 'Singing'),
('Play To Win', 'Dance'),
('Play To Win', 'Stand-up Comedy'),
('Play To Win', 'Short Film'),
('Play To Win', 'Art'),
('Play To Win', 'Photography'),
('Hackathon', 'Web Dev'),
('Hackathon', 'Mobile App'),
('Hackathon', 'Data Science'),
('Hackathon', 'Cyber Security'),
('Hackathon', 'UI/UX'),
('Hackathon', 'Startup Ideathon'),
('Gaming Arena', 'PUBG'),
('Gaming Arena', 'Valorant'),
('Gaming Arena', 'FIFA'),
('Gaming Arena', 'Tekken')
ON CONFLICT (main_category, sub_category) DO NOTHING;
