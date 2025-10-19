"use client";

import { useState } from "react";
import { useRealtimeRegistrations } from "@/hooks/useRealtimeRegistrations";
import { useRegistrationNotifications } from "@/hooks/useRegistrationNotifications";
import AdminLayout from "@/components/admin/AdminLayout";
import { FaSearch, FaEye } from "react-icons/fa";
import { Registration } from "@/types/admin";

export default function AdminRegistrations() {
  const { registrations, loading, error, refetch, isRealtimeActive } = useRealtimeRegistrations();
  const { hasNewRegistrations, notificationCount, clearNotifications } = useRegistrationNotifications();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const pageSize = 25;

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

  const totalPages = Math.max(1, Math.ceil(filteredRegistrations.length / pageSize));
  const paginated = filteredRegistrations.slice((page - 1) * pageSize, page * pageSize);

  const goFirst = () => setPage(1);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setPage(totalPages);

  const handleExport = () => {
    const csvContent = [
      [
        "ID", "Full Name", "Email", "Phone", "University", "Department", "Roll Number",
        "Main Category", "Sub Category", "Team Name", "Team Members",
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
    <AdminLayout
      title="Registrations"
      subtitle={`${filteredRegistrations.length} of ${registrations.length} registrations`}
      showRealtimeStatus={true}
      isRealtimeActive={isRealtimeActive}
      loading={loading}
      hasNewRegistrations={hasNewRegistrations}
      notificationCount={notificationCount}
      onRefresh={handleRefresh}
      onExport={handleExport}
    >
      {/* Simple Filters */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none text-black"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none appearance-none bg-white text-black"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

            {/* Sort */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none text-black"
              >
                <option value="created_at">Sort by Date</option>
                <option value="full_name">Sort by Name</option>
                <option value="main_category">Sort by Category</option>
                <option value="university">Sort by University</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none text-black"
              >
                <option value="desc">↓</option>
                <option value="asc">↑</option>
              </select>
            </div>
            </div>
          </div>
        </div>

        {/* Content */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Name
                      </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Email
                      </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        University
                      </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Category
                      </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Team
                      </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Terms
                      </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Date
                      </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                {paginated.map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-black">
                            {reg.full_name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {reg.phone_number}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          {reg.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">{reg.university}</div>
                          {reg.department && (
                            <div className="text-sm text-gray-600">{reg.department}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">{reg.main_category}</div>
                          <div className="text-sm text-gray-600">{reg.sub_category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
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
                  <p className="text-black">No registrations found matching your criteria.</p>
                </div>
              )}

              {/* Pagination */}
              {filteredRegistrations.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-black">
                    Page {page} of {totalPages} • Showing {paginated.length} of {filteredRegistrations.length}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={goFirst} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50 text-black">« First</button>
                    <button onClick={goPrev} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50 text-black">‹ Prev</button>
                    <button onClick={goNext} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-50 text-black">Next ›</button>
                    <button onClick={goLast} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-50 text-black">Last »</button>
                  </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
