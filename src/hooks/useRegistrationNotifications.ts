"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { usePageVisibility } from "./usePageVisibility";

export function useRegistrationNotifications() {
  const [lastRegistrationCount, setLastRegistrationCount] = useState(0);
  const [hasNewRegistrations, setHasNewRegistrations] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const isVisible = usePageVisibility();

  const checkForNewRegistrations = async () => {
    try {
      const { count, error } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true });

      if (error) throw error;

      const currentCount = count || 0;
      
      console.log("Checking registrations:", { lastRegistrationCount, currentCount });
      
      if (lastRegistrationCount > 0 && currentCount > lastRegistrationCount) {
        console.log("New registrations detected!", currentCount - lastRegistrationCount);
        setHasNewRegistrations(true);
        setNotificationCount(currentCount - lastRegistrationCount);
      }
      
      setLastRegistrationCount(currentCount);
    } catch (error) {
      console.error("Error checking for new registrations:", error);
    }
  };

  const clearNotifications = () => {
    setHasNewRegistrations(false);
    setNotificationCount(0);
  };

  useEffect(() => {
    // Only check when page is visible and every 15 seconds
    if (!isVisible) return;

    const interval = setInterval(checkForNewRegistrations, 15000);
    
    // Initial check
    checkForNewRegistrations();

    return () => clearInterval(interval);
  }, [isVisible, checkForNewRegistrations]); // Check when page visibility changes

  return {
    hasNewRegistrations,
    notificationCount,
    clearNotifications,
    checkForNewRegistrations,
  };
}
