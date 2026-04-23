import React, { useState, useMemo } from "react";
import {
  FileText,
  Search,
  ChefHat,
  ShieldCheck,
  ClipboardCheck,
  Crown,
  Activity,
  Calendar,
  Clock,
} from "lucide-react";
import { auditLogs as dummyAuditLogs } from "../../data/dummy";
import PageHeader from "../../components/ui/PageHeader";

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const allLogs = useMemo(() => {
    const customLogs = JSON.parse(
      localStorage.getItem("ck_audit_logs") || "[]",
    );
    const merged = [
      ...customLogs,
      ...dummyAuditLogs.map((l) => ({
        id: l.id,
        user: l.user,
        role: l.role,
        action: l.action,
        description: l.details,
        timestamp: l.timestamp,
      })),
    ];
    return merged.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, []);

  const filtered = useMemo(() => {
    let result = allLogs;
    if (roleFilter !== "All") {
      result = result.filter((l) => l.role === roleFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.user?.toLowerCase().includes(q) ||
          l.action?.toLowerCase().includes(q) ||
          l.description?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [allLogs, roleFilter, searchQuery]);

  const roleIcon = (role) => {
    switch (role) {
      case "Chef":
        return <ChefHat size={14} strokeWidth={2.5} />;
      case "Reviewer":
        return <ShieldCheck size={14} strokeWidth={2.5} />;
      case "CRA":
        return <ClipboardCheck size={14} strokeWidth={2.5} />;
      case "Manager":
        return <Crown size={14} strokeWidth={2.5} />;
      default:
        return <FileText size={14} strokeWidth={2.5} />;
    }
  };

  const actionColor = (action) => {
    switch (action) {
      case "Create":
        return "text-emerald-500 bg-emerald-50 border-emerald-100";
      case "Update":
        return "text-blue-500 bg-blue-50 border-blue-100";
      case "Delete":
        return "text-rose-500 bg-rose-50 border-rose-100";
      case "Completed":
        return "text-emerald-500 bg-emerald-50 border-emerald-100";
      case "Submitted":
        return "text-amber-500 bg-amber-50 border-amber-100";
      default:
        return "text-gray-400 bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="animate-in fade-in duration-700 p-6 lg:p-10 min-h-screen bg-[#FBFBFC] space-y-12">
      <PageHeader
        title="Protocol Ledger"
        subtitle="Chronological sequence of every molecular interaction and security signature."
        actions={[
          <div
            key="activity"
            className="flex items-center gap-3 px-6 py-3 bg-emerald-600/5 rounded-2xl border border-emerald-600/20 text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] shadow-sm backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            LIVE SECURITY ACTIVE
          </div>,
        ]}
      />

      {/* Filters Bar */}
      <div className="bg-white p-4 lg:p-6 rounded-[3rem] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row gap-8 lg:items-center">
        <div className="flex-1 relative group">
          <Search
            size={20}
            strokeWidth={3}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-600 transition-colors"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across origin identity, action, or molecular payload..."
            className="w-full pl-16 pr-8 py-5 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 text-[11px] font-black uppercase tracking-widest text-gray-900 focus:bg-white focus:ring-4 focus:ring-emerald-600/5 focus:border-emerald-200 outline-none transition-all placeholder:text-gray-300 shadow-inner"
          />
        </div>

        <div className="flex flex-wrap gap-3 p-2 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner">
          {["All", "Manager", "Chef", "Reviewer", "CRA"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 active:scale-95 ${
                roleFilter === r
                  ? "bg-emerald-600 text-white  shadow-emerald-600/20 scale-105"
                  : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              {r !== "All" && roleIcon(r)}
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] rounded-[3rem] overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 backdrop-blur-xl transition-all duration-500">
                {[
                  "Executing Identity",
                  "Clearance Level",
                  "Action Protocol",
                  "Event Descriptor",
                  "System Epoch",
                ].map((th) => (
                  <th
                    key={th}
                    className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] border-b border-gray-100"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((log, idx) => (
                <tr
                  key={`${log.id}-${idx}`}
                  className="group hover:bg-emerald-50/30 transition-all duration-500"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-[11px] font-black text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-500 uppercase">
                        {log.user?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="min-w-0">
                        <div className="font-black text-[13px] text-gray-900 tracking-tighter uppercase italic group-hover:text-emerald-600 transition-colors">
                          {log.user}
                        </div>
                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1 opacity-50">
                          ID: {log.id || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gray-50/80 border border-gray-100 text-[9px] font-black text-gray-500 uppercase tracking-widest shadow-sm group-hover:bg-white transition-all">
                      <span className="text-emerald-600">
                        {roleIcon(log.role)}
                      </span>
                      {log.role}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div
                      className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${actionColor(log.action)}`}
                    >
                      {log.action}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="text-[13px] font-black text-gray-600 max-w-sm leading-relaxed uppercase tracking-tight opacity-80 group-hover:translate-x-2 transition-transform duration-700 italic">
                      " {log.description} "
                    </div>
                  </td>
                  <td className="px-10 py-8 whitespace-nowrap">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 text-[11px] font-black text-gray-900 uppercase tracking-tighter">
                        <Calendar
                          size={14}
                          className="text-emerald-500"
                          strokeWidth={2.5}
                        />
                        {log.timestamp?.split(",")[0]}
                      </div>
                      <div className="flex items-center gap-2.5 text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">
                        <Clock size={12} strokeWidth={2.5} />
                        {log.timestamp?.split(",")[1] || log.timestamp}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
                        <FileText
                          size={40}
                          className="text-gray-200"
                          strokeWidth={1}
                        />
                      </div>
                      <div className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">
                        Logs Nullified
                      </div>
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3 max-w-xs mx-auto leading-relaxed opacity-60">
                        No cryptographic trace identified for the current
                        validation parameters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
