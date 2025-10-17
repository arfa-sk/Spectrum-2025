"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRealtimeRegistrations } from "@/hooks/useRealtimeRegistrations";
import { useRegistrationNotifications } from "@/hooks/useRegistrationNotifications";
import { Orbitron } from "next/font/google";
import { FaSearch, FaDownload, FaEye, FaFilter, FaWifi, FaTimes, FaSyncAlt, FaBell } from "react-icons/fa";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

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

export default function AdminRegistrations() {
  const { registrations, loading, error, refetch } = useRealtimeRegistrations();
  const { hasNewRegistrations, notificationCount, clearNotifications } = useRegistrationNotifications();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isConnected, setIsConnected] = useState(true);

  const handleRefresh = () => {
    refetch();
    clearNotifications();
  };

  // Apply filters and sorting
  const filteredRegistrations = registrations
    .filter(reg => {
      const matchesSearch = 
        reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.main_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.sub_category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !categoryFilter || reg.main_category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Registration];
      const bValue = b[sortBy as keyof Registration];
      
      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortOrder === "asc" ? -1 : 1;
      if (bValue == null) return sortOrder === "asc" ? 1 : -1;
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const exportToCSV = () => {
    const csvContent = [
      [
        "ID", "Full Name", "Email", "Phone", "University", "Department", "Roll Number",
        "Main Category", "Sub Category", "Team Name", "Team Members", "Message",
        "Terms Accepted", "Created At"
      ],
      ...filteredRegistrations.map(reg => [
        reg.id,
        reg.full_name,
        reg.email,
        reg.phone_number,
        reg.university,
        reg.department || "",
        reg.roll_number || "",
        reg.main_category,
        reg.sub_category,
        reg.team_name || "",
        reg.team_members || "",
        reg.message || "",
        reg.terms_accepted ? "Yes" : "No",
        new Date(reg.created_at).toLocaleString()
      ])
    ].map(row => row.map(field => `"${field}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spectrum-2025-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const categories = Array.from(new Set(registrations.map(reg => reg.main_category)));

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
                    All Registrations
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
                  {filteredRegistrations.length} of {registrations.length} registrations
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
                className="text-gray-500 hover:text-gray-700 pb-2 px-1 text-sm font-medium"
              >
                Statistics
              </Link>
              <Link
                href="/admin/registrations"
                className="text-[#FFD700] border-b-2 border-[#FFD700] pb-2 px-1 text-sm font-medium"
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

        {/* Filters */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
              >
                <option value="created_at">Sort by Date</option>
                <option value="full_name">Sort by Name</option>
                <option value="main_category">Sort by Category</option>
                <option value="university">Sort by University</option>
              </select>

              {/* Sort Order */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
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
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        University
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Terms
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {reg.full_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {reg.phone_number}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {reg.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{reg.university}</div>
                          {reg.department && (
                            <div className="text-sm text-gray-500">{reg.department}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{reg.main_category}</div>
                          <div className="text-sm text-gray-500">{reg.sub_category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {reg.team_name || "Individual"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            reg.terms_accepted 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {reg.terms_accepted ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-[#FFD700] hover:text-yellow-600 transition-colors">
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredRegistrations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No registrations found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
