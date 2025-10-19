"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import AdminHeader from "./AdminHeader";
import AdminNavigation from "./AdminNavigation";
import { useAuth } from "@/lib/authContext";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showRealtimeStatus?: boolean;
  isRealtimeActive?: boolean;
  loading?: boolean;
  hasNewRegistrations?: boolean;
  notificationCount?: number;
  onRefresh?: () => void;
  onExport?: () => void;
  notifications?: Array<{
    id: string;
    type: "success" | "info" | "warning" | "error";
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
  }>;
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
  onClearNotification?: (id: string) => void;
  additionalActions?: React.ReactNode;
}

export default function AdminLayout({
  children,
  title,
  subtitle,
  showRealtimeStatus = true,
  isRealtimeActive = false,
  loading = false,
  hasNewRegistrations = false,
  notificationCount = 0,
  onRefresh,
  onExport,
  notifications = [],
  onMarkAsRead = () => {},
  onClearAll = () => {},
  onClearNotification = () => {},
  additionalActions,
}: AdminLayoutProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ProtectedRoute>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader
            title={title}
            subtitle={subtitle}
            userEmail={user?.email || "Admin"}
            onSignOut={handleSignOut}
            showRealtimeStatus={showRealtimeStatus}
            isRealtimeActive={isRealtimeActive}
            loading={loading}
            hasNewRegistrations={hasNewRegistrations}
            notificationCount={notificationCount}
            onRefresh={onRefresh}
            onExport={onExport}
            notifications={notifications}
            onMarkAsRead={onMarkAsRead}
            onClearAll={onClearAll}
            onClearNotification={onClearNotification}
            additionalActions={additionalActions}
          />
          
          <AdminNavigation />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </div>
      </ErrorBoundary>
    </ProtectedRoute>
  );
}
