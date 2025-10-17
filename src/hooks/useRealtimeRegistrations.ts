"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  university: string;
  department: string | null;
  roll_number: string | null;
  main_category: string;
  sub_category: string;
  team_name: string | null;
  team_members: string | null;
  message: string | null;
  terms_accepted: boolean;
  created_at: string;
  updated_at: string;
}

export function useRealtimeRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setRegistrations(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchRegistrations();

    // Set up polling for updates every 60 seconds (even more efficient)
    const interval = setInterval(() => {
      fetchRegistrations();
    }, 60000); // Check for updates every 60 seconds

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    registrations,
    loading,
    error,
    refetch: fetchRegistrations,
  };
}
