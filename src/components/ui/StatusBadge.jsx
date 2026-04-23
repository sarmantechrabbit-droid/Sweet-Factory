import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

const configs = {
  Completed: {
    bg: "bg-emerald-50 border-emerald-100/50 text-emerald-700",
    icon: <CheckCircle size={12} strokeWidth={2.5} />,
  },
  Success: {
    bg: "bg-emerald-50 border-emerald-100/50 text-emerald-700",
    icon: <CheckCircle size={12} strokeWidth={2.5} />,
  },
  Approved: {
    bg: "bg-emerald-50 border-emerald-100/50 text-emerald-700",
    icon: <CheckCircle size={12} strokeWidth={2.5} />,
  },
  Pending: {
    bg: "bg-amber-50 border-amber-100/50 text-amber-700",
    icon: <Clock size={12} strokeWidth={2.5} />,
  },
  Submitted: {
    bg: "bg-blue-50 border-blue-100/50 text-blue-700",
    icon: <Clock size={12} strokeWidth={2.5} />,
  },
  Cancel: {
    bg: "bg-rose-50 border-rose-100/50 text-rose-700",
    icon: <XCircle size={12} strokeWidth={2.5} />,
  },
  Review: {
    bg: "bg-amber-50 border-amber-100/50 text-amber-700",
    icon: <AlertTriangle size={12} strokeWidth={2.5} />,
  },
  Low: { bg: "bg-emerald-50 border-emerald-100/50 text-emerald-700", icon: null },
  Medium: { bg: "bg-amber-50 border-amber-100/50 text-amber-700", icon: null },
  High: { bg: "bg-rose-50 border-rose-100/50 text-rose-700", icon: null },
};

export default function StatusBadge({ status }) {
  const cfg = configs[status] || configs.Pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap border transition-all shadow-sm ${cfg.bg}`}
    >
      {cfg.icon}
      {status}
    </span>
  );
}

