"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface ContactStats {
  total_messages: number;
  unread_messages: number;
  today_messages: number;
  weekly_messages: number;
  monthly_messages: number;
}

export function useContactStats() {
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("contact_stats")
        .select("*")
        .single();

      if (error) throw error;

      setStats(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch contact statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}
