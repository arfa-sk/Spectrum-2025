"use client";

import React from "react";
import { FaUsers, FaTrophy, FaChartBar, FaCog } from "react-icons/fa";
import DashboardWidget from "./DashboardWidget";

interface StatsCardsProps {
  totalRegistrations: number;
  todayRegistrations: number;
  weeklyRegistrations?: number;
  monthlyRegistrations?: number;
  categoriesCount: number;
  loading?: boolean;
  showTrends?: boolean;
  className?: string;
}

export default function StatsCards({
  totalRegistrations,
  todayRegistrations,
  weeklyRegistrations = 0,
  monthlyRegistrations = 0,
  categoriesCount,
  loading = false,
  showTrends = false,
  className = "",
}: StatsCardsProps) {
  // Calculate trends if showTrends is enabled
  const weeklyTrend = showTrends && weeklyRegistrations > 0 ? 
    Math.round(((todayRegistrations - (weeklyRegistrations - todayRegistrations) / 6) / ((weeklyRegistrations - todayRegistrations) / 6)) * 100) : 0;

  const monthlyTrend = showTrends && monthlyRegistrations > 0 ? 
    Math.round(((monthlyRegistrations - (totalRegistrations - monthlyRegistrations) / 2) / ((totalRegistrations - monthlyRegistrations) / 2)) * 100) : 0;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      <DashboardWidget
        title="Total Registrations"
        value={totalRegistrations}
        icon={<FaUsers className="text-2xl" />}
        trend={showTrends ? {
          value: Math.abs(monthlyTrend),
          direction: monthlyTrend >= 0 ? "up" : "down",
          period: "vs last month"
        } : undefined}
        color="blue"
        loading={loading}
      />

      <DashboardWidget
        title="Today's Registrations"
        value={todayRegistrations}
        icon={<FaChartBar className="text-2xl" />}
        trend={showTrends ? {
          value: Math.abs(weeklyTrend),
          direction: weeklyTrend >= 0 ? "up" : "down",
          period: "vs last week"
        } : undefined}
        color="green"
        loading={loading}
      />

      {weeklyRegistrations > 0 && (
        <DashboardWidget
          title="Weekly Registrations"
          value={weeklyRegistrations}
          icon={<FaTrophy className="text-2xl" />}
          color="purple"
          loading={loading}
        />
      )}

      <DashboardWidget
        title="Active Categories"
        value={categoriesCount}
        icon={<FaCog className="text-2xl" />}
        color="yellow"
        loading={loading}
      />
    </div>
  );
}
