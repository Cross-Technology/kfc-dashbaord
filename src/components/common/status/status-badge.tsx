"use client";

import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  UserCheck,
  UserX,
  ClockCheck,
  Calendar,
  TicketPercent,
  Flame,
  Sparkles,
  PackageCheck,
  PackageX,
} from "lucide-react";

type StatusType =
  | "late"
  | "missed"
  | "present"
  | "onTime"
  | "early"
  | "absent"
  | "day_off"
  | "pending"
  | "approved"
  | "rejected"
  | "female"
  | "male"
  | "active"
  | "inactive"
  | "user-active"
  | "user-inactive"
  | "available"
  | "out_of_stock"
  | "on_sale"
  | "new_arrival"
  | "hot_item";

interface StatusBadgeProps {
  status: StatusType | string | null | undefined;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const formatTranslationKey = (label: string) =>
    label.trim().toLowerCase().replace(/\s+/g, "_")

  const config: Record<
    StatusType,
    { label: string; color: string; icon: React.ReactNode }> = {
    late: { label: "Late", color: "bg-chart-6/10 text-chart-6", icon: <Clock size={14} /> },
    missed: { label: "Missed", color: "bg-red-500/5 text-red-500", icon: <XCircle size={14} /> },
    present: { label: "Present", color: "bg-chart-1/10 text-chart-1", icon: <ClockCheck size={14} /> },
    onTime: { label: "On Time", color: "bg-chart-5/10 text-chart-5", icon: <CheckCircle size={14} /> },
    early: { label: "Early", color: "bg-chart-3/10 text-chart-3", icon: <Clock size={14} /> },
    absent: { label: "Absent", color: "bg-chart-2/10 text-chart-2", icon: <XCircle size={14} /> },
    day_off: { label: "Day Off", color: "bg-gray-500/10 text-gray-700 dark:text-white/70", icon: <Calendar size={14} /> },

    pending: { label: "Pending", color: "bg-orange-500/5 text-orange-500", icon: <Clock size={14} /> },
    approved: { label: "Approved", color: "bg-green-600/5 text-green-600", icon: <CheckCircle size={14} /> },
    rejected: { label: "Rejected", color: "bg-red-500/5 text-red-600", icon: <XCircle size={14} /> },

    available: { label: "Available", color: "bg-green-600/5 text-green-600 border border-green-600/15", icon: <CheckCircle size={14} /> },
    out_of_stock: { label: "Out of Stock", color: "bg-red-500/5 text-red-600 border border-red-600/15", icon: <XCircle size={14} /> },

    on_sale: { label: "On Sale", color: "bg-yellow-500/5 text-yellow-600 border border-yellow-600/15", icon: <TicketPercent size={14} /> },
    new_arrival: { label: "New Arrival", color: "bg-green-500/5 text-green-600 border border-green-600/15", icon: <Sparkles size={14} /> },
    hot_item: { label: "Hot Item", color: "bg-red-500/5 text-red-600 border border-red-600/15", icon: <Flame size={14} /> },

    female: { label: "Female", color: "bg-pink-500/5 text-pink-500", icon: <User size={14} /> },
    male: { label: "Male", color: "bg-blue-500/5 text-blue-600", icon: <User size={14} /> },
    active: { label: "Active", color: "bg-emerald-500/10 text-emerald-600 border border-emerald-600/15", icon: <PackageCheck size={14} /> },
    inactive: { label: "Inactive", color: "bg-red-500/5 text-red-600 border border-red-600/15", icon: <PackageX size={14} /> },
    "user-active": { label: "User Active", color: "bg-emerald-500/10 text-emerald-600 border border-emerald-600/15", icon: <UserCheck size={14} /> },
    "user-inactive": { label: "User Inactive", color: "bg-red-500/5 text-red-600 border border-red-600/15", icon: <UserX size={14} /> },
  };

  const item = status && config[status as StatusType];

  if (!item) {
    return (
      <Badge variant="secondary" className="bg-gray-300 text-gray-700">
        {status}
      </Badge>
    );
  }

  const translationKey = formatTranslationKey(item.label)
  const translatedLabel = item.label

  return (
    <Badge variant="secondary" className={`${item.color} gap-1 px-1.5 flex items-center capitalize`}>
      {item.icon}
      {translatedLabel}
    </Badge>
  );
}
