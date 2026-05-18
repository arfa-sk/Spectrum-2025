"use client";

import { useState } from "react";
import { useRealtimeRegistrations } from "@/hooks/useRealtimeRegistrations";
import { useRegistrationNotifications } from "@/hooks/useRegistrationNotifications";
import AdminLayout from "@/components/admin/AdminLayout";
import { FaSearch, FaEye } from "react-icons/fa";
import { Registration } from "@/types/admin";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export default function AdminRegistrations() {
  const { registrations, loading, error, refetch, isRealtimeActive } = useRealtimeRegistrations();
  const { hasNewRegistrations, notificationCount, clearNotifications } = useRegistrationNotifications();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
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
        reg.sub_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (reg.team_members && reg.team_members.toLowerCase().includes(searchTerm.toLowerCase()));
      
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
    // Helper function to safely escape CSV fields (handles quotes, commas, and newlines)
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""'); // Escape double quotes
      return `"${str}"`; // Wrap in quotes
    };

    const csvContent = [
      [
        "ID", "Full Name", "Email", "Phone", "University", "Department", "Roll Number",
        "Main Category", "Sub Category", "Team Name", "Team Logo URL", "Team Members",
        "Terms Accepted", "Created At", "Updated At"
      ].map(escapeCsv).join(","),
      ...filteredRegistrations.map(reg => [
        reg.id,
        reg.full_name,
        reg.email,
        reg.phone_number,
        reg.university,
        reg.department,
        reg.roll_number,
        reg.main_category,
        reg.sub_category,
        reg.team_name,
        reg.team_logo_url || "",
        reg.team_members,
        reg.terms_accepted ? "Yes" : "No",
        new Date(reg.created_at).toLocaleString(),
        new Date(reg.updated_at).toLocaleString()
      ].map(escapeCsv).join(","))
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spectrum-2026-registrations-${new Date().toISOString().split('T')[0]}.csv`;
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
                          <button 
                            onClick={() => setSelectedReg(reg)}
                            className="text-[#FFD700] hover:text-yellow-600 transition-colors"
                          >
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

      {/* Sleek Detail Modal */}
      {selectedReg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedReg(null)}
        >
          <div 
            className="bg-white border-2 border-[#FFD700]/30 rounded-3xl shadow-[0_0_50px_rgba(255,215,0,0.15)] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 relative text-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedReg(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black text-2xl font-bold transition-colors"
            >
              ×
            </button>

            <h3 className={`${orbitron.className} text-xl font-bold mb-6 text-black border-b pb-4 flex items-center gap-2 uppercase tracking-widest`}>
              Registration Dossier
            </h3>

            <div className="space-y-6">
              {/* Section: Applicant Core */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Full Name</p>
                  <p className="font-semibold text-sm">{selectedReg.full_name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email Address</p>
                  <p className="font-semibold text-sm">{selectedReg.email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Phone Number</p>
                  <p className="font-semibold text-sm">{selectedReg.phone_number}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Registration Date</p>
                  <p className="font-semibold text-sm">{new Date(selectedReg.created_at).toLocaleString()}</p>
                </div>
              </div>

              {/* Section: Academic */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-150 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">University / Institute</p>
                  <p className="font-semibold text-sm">{selectedReg.university}</p>
                </div>
                {selectedReg.department && (
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Department</p>
                    <p className="font-semibold text-sm">{selectedReg.department}</p>
                  </div>
                )}
                {selectedReg.roll_number && (
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Roll / ID Number</p>
                    <p className="font-semibold text-sm">{selectedReg.roll_number}</p>
                  </div>
                )}
              </div>

              {/* Section: Event Track */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Category</p>
                  <span className="inline-block mt-1 px-3 py-1 rounded bg-[#FFD700]/10 border border-[#FFD700]/30 text-xs font-bold text-yellow-800">
                    {selectedReg.main_category}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Sub-Track</p>
                  <p className="font-bold text-xs text-white bg-black inline-block px-3 py-1 rounded mt-1">
                    {selectedReg.sub_category}
                  </p>
                </div>
              </div>

              {/* Section: Team Detail */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-150 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Team Setup</p>
                    <p className="font-bold text-sm text-black">{selectedReg.team_name || "Individual Solo Slot"}</p>
                  </div>
                  {selectedReg.team_logo_url && (
                    <a href={selectedReg.team_logo_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline font-bold">
                      View Logo Link
                    </a>
                  )}
                </div>

                {/* Parse and list members */}
                {(() => {
                  const parsed = parseTeamMembers(selectedReg.team_members);
                  return (
                    <>
                      {parsed.members.length > 0 && (
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1.5">Additional Registered Members</p>
                          <div className="space-y-1">
                            {parsed.members.map((m, idx) => (
                              <p key={idx} className="text-xs text-gray-700">• {m}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Custom Hackathon Profile Dossier */}
                      {parsed.hackathon && (
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">// Innovation Dossier Data</p>
                          
                          {parsed.hackathon.IDEA && (
                            <div>
                              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Project Concept</p>
                              <p className="text-xs text-gray-700 leading-relaxed italic">"{parsed.hackathon.IDEA}"</p>
                            </div>
                          )}

                          {parsed.hackathon.PROBLEM && (
                            <div>
                              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Problem Statement</p>
                              <p className="text-xs text-gray-700 leading-relaxed font-medium">{parsed.hackathon.PROBLEM}</p>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {parsed.hackathon.TECH && (
                              <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Tech Stack</p>
                                <p className="text-xs font-bold text-black">{parsed.hackathon.TECH}</p>
                              </div>
                            )}
                            {parsed.hackathon.GITHUB && (
                              <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Repository Link</p>
                                <a 
                                  href={parsed.hackathon.GITHUB.startsWith("http") ? parsed.hackathon.GITHUB : `https://${parsed.hackathon.GITHUB}`} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="text-xs font-bold text-blue-600 hover:underline break-all"
                                >
                                  {parsed.hackathon.GITHUB}
                                </a>
                              </div>
                            )}
                          </div>

                          {parsed.hackathon.ROLES && (
                            <div>
                              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Roles Mapping</p>
                              <p className="text-xs text-gray-700">{parsed.hackathon.ROLES}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// Helper to parse serialized team members and innovation fields
const parseTeamMembers = (membersStr: string | null) => {
  if (!membersStr) return { members: [], hackathon: null };
  
  const mainParts = membersStr.split(" || ");
  const membersList = mainParts[0] ? mainParts[0].split(" | ") : [];
  
  const hackathonData: Record<string, string> = {};
  for (let i = 1; i < mainParts.length; i++) {
    const part = mainParts[i];
    const colonIdx = part.indexOf(": ");
    if (colonIdx !== -1) {
      const key = part.slice(0, colonIdx);
      const value = part.slice(colonIdx + 2);
      hackathonData[key] = value;
    }
  }
  
  return {
    members: membersList,
    hackathon: Object.keys(hackathonData).length > 0 ? hackathonData : null
  };
};
