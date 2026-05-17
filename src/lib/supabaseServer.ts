import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// The backend MUST use the service_role key to bypass Row Level Security 
// when inserting/upserting data, otherwise public submissions will be rejected.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase credentials missing in Server Client initialization. Make sure SUPABASE_SERVICE_ROLE_KEY is set in .env.local");
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);
