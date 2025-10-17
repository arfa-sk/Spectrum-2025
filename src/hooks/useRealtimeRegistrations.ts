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
  const [isRealtimeActive, setIsRealtimeActive] = useState(false);

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

    // Start with polling as a fallback; will stop if realtime events arrive
    const pollInterval = setInterval(() => {
      fetchRegistrations();
    }, 60000);

    // Subscribe to realtime changes on the registrations table
    const channel = supabase
      .channel("registrations-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "registrations" },
        (payload: RealtimePostgresChangesPayload<Registration>) => {
          if (!isRealtimeActive) setIsRealtimeActive(true);
          clearInterval(pollInterval);
          const newReg = payload.new as unknown as Registration;
          setRegistrations((prev) => {
            // Add to top, avoid duplicates
            const without = prev.filter((r) => r.id !== newReg.id);
            return [newReg, ...without].sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "registrations" },
        (payload: RealtimePostgresChangesPayload<Registration>) => {
          if (!isRealtimeActive) setIsRealtimeActive(true);
          clearInterval(pollInterval);
          const updated = payload.new as unknown as Registration;
          setRegistrations((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "registrations" },
        (payload: RealtimePostgresChangesPayload<Registration>) => {
          if (!isRealtimeActive) setIsRealtimeActive(true);
          clearInterval(pollInterval);
          const removed = payload.old as unknown as Registration;
          setRegistrations((prev) => prev.filter((r) => r.id !== removed.id));
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          // optional: could log or set a connected state
        }
      });

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, []);

  return {
    registrations,
    loading,
    error,
    refetch: fetchRegistrations,
    isRealtimeActive,
  };
}
