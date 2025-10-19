"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRealtimeActive, setIsRealtimeActive] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setMessages(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch contact messages");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ is_read: true })
        .eq("id", messageId);

      if (error) throw error;

      // Update local state
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );
    } catch (err: unknown) {
      console.error("Error marking message as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ is_read: true })
        .eq("is_read", false);

      if (error) throw error;

      // Update local state
      setMessages(prev => 
        prev.map(msg => ({ ...msg, is_read: true }))
      );
    } catch (err: unknown) {
      console.error("Error marking all messages as read:", err);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;

      // Update local state
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } catch (err: unknown) {
      console.error("Error deleting message:", err);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchMessages();

    // Subscribe to real-time changes
    const channel = supabase
      .channel("contact-messages-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact_messages" },
        (payload: RealtimePostgresChangesPayload<ContactMessage>) => {
          if (!isRealtimeActive) setIsRealtimeActive(true);
          setMessages(prev => [payload.new as ContactMessage, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "contact_messages" },
        (payload: RealtimePostgresChangesPayload<ContactMessage>) => {
          if (!isRealtimeActive) setIsRealtimeActive(true);
          const updatedMessage = payload.new as ContactMessage;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === updatedMessage.id ? updatedMessage : msg
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "contact_messages" },
        (payload: RealtimePostgresChangesPayload<ContactMessage>) => {
          if (!isRealtimeActive) setIsRealtimeActive(true);
          const deletedId = (payload.old as ContactMessage).id;
          setMessages(prev => prev.filter(msg => msg.id !== deletedId));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isRealtimeActive]);

  return {
    messages,
    loading,
    error,
    refetch: fetchMessages,
    markAsRead,
    markAllAsRead,
    deleteMessage,
    isRealtimeActive,
  };
}
