"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRealtimeStats } from "@/hooks/useRealtimeStats";
import { useRegistrationNotifications } from "@/hooks/useRegistrationNotifications";
import { Orbitron } from "next/font/google";
import { FaUsers, FaTrophy, FaChartBar, FaDownload, FaWifi, FaTimes, FaSyncAlt, FaBell } from "react-icons/fa";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

// Interface moved to useRealtimeStats hook

export default function AdminStats() {
  const { stats, totalRegistrations, todayRegistrations, loading, error, refetch } = useRealtimeStats();
  const { hasNewRegistrations, notificationCount, clearNotifications } = useRegistrationNotifications();
  const [isConnected, setIsConnected] = useState(true);

  const handleRefresh = () => {
    refetch();
    clearNotifications();
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Category", "Sub-Category", "Total Registrations", "Unique Participants"],
      ...stats.map(stat => [
        stat.main_category,
        stat.sub_category,
        stat.total_registrations.toString(),
        stat.unique_participants.toString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spectrum-2025-stats-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className={`${orbitron.className} text-3xl font-bold text-gray-900`}>
                    Registration Statistics
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-green-600">
                      <FaWifi className="text-sm" />
                      <span className="text-xs font-medium">Auto-refresh</span>
                    </div>
                    {loading && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs font-medium">Updating...</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mt-1">
                  Spectrum 2025 Event Analytics
                  <span className="text-green-600 text-sm ml-2">• Auto-refreshing every 60s</span>
                  {hasNewRegistrations && (
                    <span className="text-red-600 text-sm ml-2">• {notificationCount} new registration(s) detected!</span>
                  )}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors disabled:opacity-50 ${
                    hasNewRegistrations
                      ? "bg-red-500 text-white hover:bg-red-600 animate-pulse" 
                      : "bg-[#FFD700] text-black hover:bg-yellow-500"
                  }`}
                >
                  {hasNewRegistrations ? (
                    <>
                      <FaBell className="animate-bounce" />
                      {notificationCount} New Registration{notificationCount > 1 ? 's' : ''}
                    </>
                  ) : (
                    <>
                      <FaSyncAlt className={loading ? "animate-spin" : ""} />
                      Check for Updates
                    </>
                  )}
                </button>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaDownload />
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 py-4">
              <Link
                href="/admin/stats"
                className="text-[#FFD700] border-b-2 border-[#FFD700] pb-2 px-1 text-sm font-medium"
              >
                Statistics
              </Link>
              <Link
                href="/admin/registrations"
                className="text-gray-500 hover:text-gray-700 pb-2 px-1 text-sm font-medium"
              >
                All Registrations
              </Link>
              <Link
                href="/admin"
                className="text-gray-500 hover:text-gray-700 pb-2 px-1 text-sm font-medium"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={refetch}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FaUsers className="text-blue-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                      <p className="text-2xl font-bold text-gray-900">{totalRegistrations}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <FaTrophy className="text-green-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Categories</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <FaChartBar className="text-purple-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Most Popular</p>
                      <p className="text-lg font-bold text-gray-900">
                        {stats.length > 0 ? stats[0].main_category : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Category Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Main Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sub-Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Registrations
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unique Participants
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stats.map((stat, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {stat.main_category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {stat.sub_category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {stat.total_registrations}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {stat.unique_participants}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
