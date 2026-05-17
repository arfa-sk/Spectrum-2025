"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface Registration {
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
  team_logo_url?: string | null;
  team_members: string | null;
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
      if (!isRealtimeActive) {
        fetchRegistrations();
      }
    }, 60000);

    // Subscribe to realtime changes on the registrations table
    const channel = supabase
      .channel("registrations-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "registrations" },
        (payload) => {
          setIsRealtimeActive(true);
          clearInterval(pollInterval);
          
          const newReg = payload.new as Registration;
          setRegistrations((prev) => {
            const without = prev.filter((r) => r.id !== newReg.id);
            return [newReg, ...without].sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "registrations" },
        (payload) => {
          setIsRealtimeActive(true);
          clearInterval(pollInterval);
          
          const updatedReg = payload.new as Registration;
          setRegistrations((prev) => prev.map((r) => (r.id === updatedReg.id ? updatedReg : r)));
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "registrations" },
        (payload) => {
          setIsRealtimeActive(true);
          clearInterval(pollInterval);
          setRegistrations((prev) => prev.filter((r) => r.id !== payload.old.id));
        }
      )
      .subscribe((status) => {
        console.log("Registrations realtime subscription status:", status);
        if (status === "SUBSCRIBED") {
          setIsRealtimeActive(true);
          clearInterval(pollInterval);
        }
      });

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, [isRealtimeActive]);

  return {
    registrations,
    loading,
    error,
    refetch: fetchRegistrations,
    isRealtimeActive,
  };
}
