"use client";

import { useEffect, useState } from "react";
import { useRealtimeStats } from "@/hooks/useRealtimeStats";
import { useRealtimeRegistrations } from "@/hooks/useRealtimeRegistrations";
import { useContactStats } from "@/hooks/useContactStats";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCards from "@/components/admin/StatsCards";
import ChartComponent, { chartColors } from "@/components/admin/ChartComponent";
import { useNotifications } from "@/components/admin/RealTimeNotification";
import Link from "next/link";

export default function AdminDashboard() {
  const { stats, totalRegistrations, todayRegistrations, loading, error, refetch, isRealtimeActive } = useRealtimeStats();
  const { registrations } = useRealtimeRegistrations();
  const { stats: contactStats } = useContactStats();
  const { notifications, addNotification, markAsRead, clearNotification, clearAll } = useNotifications();
  
  // Calculate notification count and new registrations status
  const notificationCount = notifications.filter(n => !n.read).length;
  const hasNewRegistrations = notificationCount > 0;

  const topCategory = stats.length > 0 ? stats[0].main_category : "N/A";

  // Calculate additional metrics
  const weeklyRegistrations = registrations.filter(reg => {
    const regDate = new Date(reg.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return regDate >= weekAgo;
  }).length;

  const monthlyRegistrations = registrations.filter(reg => {
    const regDate = new Date(reg.created_at);
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    return regDate >= monthAgo;
  }).length;


  // Prepare chart data
  const categoryData = {
    labels: stats.map(stat => stat.main_category),
    datasets: [{
      label: "Registrations",
      data: stats.map(stat => stat.total_registrations),
      backgroundColor: chartColors.primary.slice(0, stats.length),
      borderColor: chartColors.primary.slice(0, stats.length),
      borderWidth: 1,
    }]
  };

  const subCategoryData = {
    labels: stats.map(stat => stat.sub_category),
    datasets: [{
      label: "Registrations",
      data: stats.map(stat => stat.total_registrations),
      backgroundColor: chartColors.pastel.slice(0, stats.length),
      borderColor: chartColors.primary.slice(0, stats.length),
      borderWidth: 1,
    }]
  };

  // Daily registrations data (last 7 days)
  const dailyData = (() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const dailyCounts = last7Days.map(date => {
      return registrations.filter(reg => 
        reg.created_at.startsWith(date)
      ).length;
    });

    return {
      labels: last7Days.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
      datasets: [{
        label: "Daily Registrations",
        data: dailyCounts,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: '#3B82F6',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      }]
    };
  })();

  // Track last processed registration for notifications
  const [lastRegistrationId, setLastRegistrationId] = useState<string | null>(null);
  
  // Add notifications for new registrations (real-time)
  useEffect(() => {
    if (registrations.length > 0) {
      const latestRegistration = registrations[0]; // Most recent registration
      
      // Check if this is a new registration (different ID than last one we processed)
      if (lastRegistrationId !== latestRegistration.id) {
        // Only add notification if we had a previous registration (not on initial load)
        if (lastRegistrationId !== null) {
          addNotification({
            type: "success",
            title: "New Registration",
            message: `${latestRegistration.full_name} registered for ${latestRegistration.main_category} - ${latestRegistration.sub_category}`,
          });
        }
        
        setLastRegistrationId(latestRegistration.id);
      }
    }
  }, [registrations, addNotification, lastRegistrationId]);

  const handleRefresh = () => {
    refetch();
    clearAll();
  };

  const handleExport = () => {
    const csvContent = [
      ["Metric", "Value", "Date"],
      ["Total Registrations", totalRegistrations.toString(), new Date().toISOString()],
      ["Today's Registrations", todayRegistrations.toString(), new Date().toISOString()],
      ["Weekly Registrations", weeklyRegistrations.toString(), new Date().toISOString()],
      ["Monthly Registrations", monthlyRegistrations.toString(), new Date().toISOString()],
      ["Categories", stats.length.toString(), new Date().toISOString()],
      ["Most Popular Category", topCategory, new Date().toISOString()],
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spectrum-2025-dashboard-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };


  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Spectrum 2025 Management Panel"
      showRealtimeStatus={true}
      isRealtimeActive={isRealtimeActive}
      loading={loading}
      hasNewRegistrations={hasNewRegistrations}
      notificationCount={notificationCount}
      onRefresh={handleRefresh}
      onExport={handleExport}
      notifications={notifications}
      onMarkAsRead={markAsRead}
      onClearAll={clearAll}
      onClearNotification={clearNotification}
    >
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
          <StatsCards
            totalRegistrations={totalRegistrations}
            todayRegistrations={todayRegistrations}
            weeklyRegistrations={weeklyRegistrations}
            monthlyRegistrations={monthlyRegistrations}
            categoriesCount={stats.length}
            loading={loading}
            showTrends={true}
            className="mb-8"
          />

          {/* Contact Messages Statistics */}
          {contactStats && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Contact Messages</h3>
                <Link
                  href="/admin/contact"
                  className="text-[#FFD700] hover:text-yellow-600 font-medium text-sm"
                >
                  View All Messages →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{contactStats.total_messages}</div>
                  <div className="text-sm text-gray-500">Total Messages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{contactStats.unread_messages}</div>
                  <div className="text-sm text-gray-500">Unread</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{contactStats.today_messages}</div>
                  <div className="text-sm text-gray-500">Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{contactStats.weekly_messages}</div>
                  <div className="text-sm text-gray-500">This Week</div>
                </div>
              </div>
            </div>
          )}

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Daily Registrations Trend */}
                <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Registration Trend</h3>
              <ChartComponent
                type="line"
                data={dailyData}
                height={300}
              />
                </div>

            {/* Category Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Category Distribution</h3>
              <ChartComponent
                type="doughnut"
                data={categoryData}
                height={300}
              />
                  </div>
                </div>

          {/* Sub-Category Analysis */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sub-Category Performance</h3>
            <ChartComponent
              type="bar"
              data={subCategoryData}
              height={400}
              options={{
                indexAxis: 'y',
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
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
                    <span className="font-medium text-gray-900">Manage Registrations</span>
                        <span className="text-gray-500">→</span>
                      </div>
                  <p className="text-sm text-gray-600 mt-1">Browse, filter, and manage participant registrations</p>
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
                  <span className="text-sm text-gray-600">Realtime Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isRealtimeActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {isRealtimeActive ? 'Active' : 'Polling'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Public Registration</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Open
                      </span>
                    </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Most Popular Category</span>
                  <span className="text-sm font-medium text-gray-900">{topCategory}</span>
                </div>
              </div>
                </div>
              </div>
            </>
          )}
    </AdminLayout>
  );
}
