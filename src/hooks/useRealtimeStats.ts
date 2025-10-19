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
  const [isRealtimeActive, setIsRealtimeActive] = useState(false);

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

    // Poll as a fallback; will stop when realtime is active
    const pollInterval = setInterval(() => {
      fetchStats();
    }, 60000);

    // Subscribe to changes affecting stats: registrations table INSERT/UPDATE/DELETE
    const channel = supabase
      .channel("registrations-stats-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "registrations" },
        () => {
          if (!isRealtimeActive) setIsRealtimeActive(true);
          clearInterval(pollInterval);
          fetchStats();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "registrations" },
        () => {
          if (!isRealtimeActive) setIsRealtimeActive(true);
          clearInterval(pollInterval);
          fetchStats();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "registrations" },
        () => {
          if (!isRealtimeActive) setIsRealtimeActive(true);
          clearInterval(pollInterval);
          fetchStats();
        }
      )
      // If you have a materialized view/table `registration_stats` updated via triggers,
      // you can also subscribe to it directly to minimize refetches.
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, [isRealtimeActive]);

  return {
    stats,
    totalRegistrations,
    todayRegistrations,
    loading,
    error,
    refetch: fetchStats,
    isRealtimeActive,
  };
}
