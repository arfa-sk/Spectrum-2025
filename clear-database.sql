-- ==========================================
-- SPECTRUM '26 - RESET DATABASE RECORDS
-- Description: Safely deletes all registration, team, and participant data 
-- to start fresh, while PRESERVING pre-populated events.
-- ==========================================

-- Temporarily disable triggers (optional, but ensures clean delete)
SET session_replication_role = 'replica';

-- Truncate tables with CASCADE to clean up all dependencies
TRUNCATE TABLE registrations, team_members, teams, participants CASCADE;

-- Reset identity generators if applicable
-- (e.g. if any table uses serial/auto-incrementing IDs, this resets count to 1)
-- None of our tables use serial IDs (all use UUIDs), but this is good practice.

-- Re-enable triggers
SET session_replication_role = 'origin';

-- Log confirmation
SELECT 'Database successfully cleared! You are ready to start fresh.' AS status;
