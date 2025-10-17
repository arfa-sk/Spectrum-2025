"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/authContext";
import { useRealtimeStats } from "@/hooks/useRealtimeStats";
import { Orbitron } from "next/font/google";
import { FaUsers, FaTrophy, FaChartBar, FaSignOutAlt, FaCog, FaWifi, FaTimes } from "react-icons/fa";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { stats, totalRegistrations, todayRegistrations, loading } = useRealtimeStats();
  const [isConnected, setIsConnected] = useState(true);

  const topCategory = stats.length > 0 ? stats[0].main_category : "N/A";

  const handleSignOut = async () => {
    await signOut();
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
                    Admin Dashboard
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
                  Spectrum 2025 Management Panel
                  <span className="text-green-600 text-sm ml-2">• Auto-refreshing every 60s</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FaSignOutAlt />
                  Sign Out
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
                href="/admin"
                className="text-[#FFD700] border-b-2 border-[#FFD700] pb-2 px-1 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/stats"
                className="text-gray-500 hover:text-gray-700 pb-2 px-1 text-sm font-medium"
              >
                Statistics
              </Link>
              <Link
                href="/admin/registrations"
                className="text-gray-500 hover:text-gray-700 pb-2 px-1 text-sm font-medium"
              >
                All Registrations
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
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                      <FaChartBar className="text-green-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Today&apos;s Registrations</p>
                      <p className="text-2xl font-bold text-gray-900">{todayRegistrations}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <FaTrophy className="text-purple-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Categories</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <FaCog className="text-yellow-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Most Popular</p>
                      <p className="text-lg font-bold text-gray-900">{topCategory}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link
                      href="/admin/registrations"
                      className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">View All Registrations</span>
                        <span className="text-gray-500">→</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Browse and manage participant registrations</p>
                    </Link>
                    <Link
                      href="/admin/stats"
                      className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">View Statistics</span>
                        <span className="text-gray-500">→</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Analyze registration data and trends</p>
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Database Connection</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Connected
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Authentication</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Public Registration</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Open
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
