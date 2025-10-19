"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  href: string;
  label: string;
  description?: string;
}

const navigationItems: NavigationItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    description: "Overview, analytics, and quick stats"
  },
  {
    href: "/admin/registrations",
    label: "Registrations",
    description: "Manage participant registrations"
  },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 py-4">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`pb-2 px-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#FFD700] border-b-2 border-[#FFD700]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                title={item.description}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
