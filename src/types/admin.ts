// Admin Panel Types and Interfaces

export interface Registration {
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
  terms_accepted: boolean;
  created_at: string;
  updated_at: string;
}

export interface RegistrationStats {
  main_category: string;
  sub_category: string;
  total_registrations: number;
  unique_participants: number;
  first_registration?: string;
  latest_registration?: string;
}

export interface Notification {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface Trend {
  value: number;
  direction: "up" | "down" | "neutral";
  period: string;
}

export interface DashboardWidgetProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: Trend;
  color?: "blue" | "green" | "purple" | "yellow" | "red" | "indigo";
  loading?: boolean;
  className?: string;
}

export interface FilterOptions {
  searchTerm: string;
  category: string;
  subCategory: string;
  university: string;
  dateRange: {
    start: string;
    end: string;
  };
  teamBased: "all" | "team" | "individual";
  termsAccepted: "all" | "yes" | "no";
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

export interface AdminPageProps {
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
  onExport?: () => void;
}

export interface RealtimeStatus {
  isActive: boolean;
  loading: boolean;
  hasNewRegistrations: boolean;
  notificationCount: number;
}

// Color palette for charts and UI
export const adminColors = {
  primary: [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // yellow
    '#EF4444', // red
    '#8B5CF6', // purple
    '#06B6D4', // cyan
    '#84CC16', // lime
    '#F97316', // orange
  ],
  pastel: [
    '#A5B4FC', // light blue
    '#86EFAC', // light green
    '#FDE68A', // light yellow
    '#FCA5A5', // light red
    '#C4B5FD', // light purple
    '#67E8F9', // light cyan
    '#BEF264', // light lime
    '#FDBA74', // light orange
  ],
  gradient: [
    'rgba(59, 130, 246, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(6, 182, 212, 0.8)',
    'rgba(132, 204, 22, 0.8)',
    'rgba(249, 115, 22, 0.8)',
  ],
} as const;

export type AdminColor = keyof typeof adminColors;
