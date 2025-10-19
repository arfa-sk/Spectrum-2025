"use client";

import React from "react";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

interface Trend {
  value: number;
  direction: "up" | "down" | "neutral";
  period: string;
}

interface DashboardWidgetProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: Trend;
  color?: "blue" | "green" | "purple" | "yellow" | "red" | "indigo";
  loading?: boolean;
  className?: string;
}

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    icon: "text-blue-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    icon: "text-green-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    icon: "text-purple-600",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    icon: "text-yellow-600",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    icon: "text-red-600",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    icon: "text-indigo-600",
  },
};

export default function DashboardWidget({
  title,
  value,
  icon,
  trend,
  color = "blue",
  loading = false,
  className = "",
}: DashboardWidgetProps) {
  const colors = colorClasses[color];

  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend.direction) {
      case "up":
        return <FaArrowUp className="text-green-500" />;
      case "down":
        return <FaArrowDown className="text-red-500" />;
      default:
        return <FaMinus className="text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return "text-gray-500";
    
    switch (trend.direction) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        <div className="flex items-center">
          <div className="p-3 bg-gray-100 rounded-lg animate-pulse">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-6 ${className}`}>
      <div className="flex items-center">
        <div className={`p-3 ${colors.bg} rounded-lg`}>
          <div className={colors.icon}>
            {icon}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
                {getTrendIcon()}
                <span className="font-medium">{trend.value}%</span>
                <span className="text-gray-500 text-xs">{trend.period}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
