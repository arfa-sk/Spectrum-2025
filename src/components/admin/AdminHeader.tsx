"use client";

import React from "react";
import { FaWifi, FaSignOutAlt, FaSyncAlt, FaDownload } from "react-icons/fa";
import { Orbitron } from "next/font/google";
import RealTimeNotification from "./RealTimeNotification";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  userEmail: string;
  onSignOut: () => void;
  showRealtimeStatus?: boolean;
  isRealtimeActive?: boolean;
  loading?: boolean;
  hasNewRegistrations?: boolean;
  notificationCount?: number;
  onRefresh?: () => void;
  onExport?: () => void;
  notifications: Array<{
    id: string;
    type: "success" | "info" | "warning" | "error";
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
  }>;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onClearNotification: (id: string) => void;
  additionalActions?: React.ReactNode;
}

export default function AdminHeader({
  title,
  subtitle,
  userEmail,
  onSignOut,
  showRealtimeStatus = true,
  isRealtimeActive = false,
  loading = false,
  hasNewRegistrations = false,
  notificationCount = 0,
  onRefresh,
  onExport,
  notifications,
  onMarkAsRead,
  onClearAll,
  onClearNotification,
  additionalActions,
}: AdminHeaderProps) {

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    }
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className={`${orbitron.className} text-3xl font-bold text-gray-900`}>
                {title}
              </h1>
              {showRealtimeStatus && (
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 ${isRealtimeActive ? 'text-green-600' : 'text-gray-600'}`}>
                    <FaWifi className="text-sm" />
                    <span className="text-xs font-medium">{isRealtimeActive ? 'Realtime' : 'Auto-refresh'}</span>
                  </div>
                  {loading && (
                    <div className="flex items-center gap-1 text-blue-600">
                      <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs font-medium">Updating...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            {subtitle && (
              <p className="text-gray-600 mt-1">
                {subtitle}
                {showRealtimeStatus && isRealtimeActive && (
                  <span className="text-green-600 text-sm ml-2">
                    • Live updates
                  </span>
                )}
                {showRealtimeStatus && !isRealtimeActive && (
                  <span className="text-gray-500 text-sm ml-2">
                    • Auto-refresh every 60s
                  </span>
                )}
                {hasNewRegistrations && (
                  <span className="text-red-600 text-sm ml-2">
                    • {notificationCount} new registration(s) detected!
                  </span>
                )}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <RealTimeNotification
              notifications={notifications}
              onMarkAsRead={onMarkAsRead}
              onClearAll={onClearAll}
              onClearNotification={onClearNotification}
            />
            
            {onRefresh && !isRealtimeActive && (
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors disabled:opacity-50 bg-[#FFD700] text-black hover:bg-yellow-500"
              >
                <FaSyncAlt className={loading ? "animate-spin" : ""} />
                Check for Updates
              </button>
            )}
            
            {hasNewRegistrations && (
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-medium rounded-lg animate-pulse">
                <FaSyncAlt className="animate-pulse" />
                {notificationCount} New Registration{notificationCount > 1 ? 's' : ''}
              </div>
            )}
            
            {onExport && (
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaDownload />
                Export
              </button>
            )}
            
            {additionalActions}
            
            <span className="text-sm text-gray-600">
              Welcome, {userEmail}
            </span>
            
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
