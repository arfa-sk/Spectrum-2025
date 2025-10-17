"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface RegistrationStats {
  main_category: string;
  sub_category: string;
  total_registrations: number;
  unique_participants: number;
}

export function useRealtimeStats() {
  const [stats, setStats] = useState<RegistrationStats[]>([]);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [todayRegistrations, setTodayRegistrations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch registration statistics
      const { data: statsData, error: statsError } = await supabase
        .from("registration_stats")
        .select("*")
        .order("main_category", { ascending: true });

      if (statsError) throw statsError;

      // Fetch total registrations
      const { count: totalCount, error: countError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true });

      if (countError) throw countError;

      // Fetch today's registrations
      const today = new Date().toISOString().split('T')[0];
      const { count: todayCount, error: todayCountError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today);

      if (todayCountError) throw todayCountError;

      setStats(statsData || []);
      setTotalRegistrations(totalCount || 0);
      setTodayRegistrations(todayCount || 0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchStats();

    // Set up polling for updates every 60 seconds (even more efficient)
    const interval = setInterval(() => {
      fetchStats();
    }, 60000); // Check for updates every 60 seconds

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    stats,
    totalRegistrations,
    todayRegistrations,
    loading,
    error,
    refetch: fetchStats,
  };
}
