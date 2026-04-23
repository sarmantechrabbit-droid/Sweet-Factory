import React, { useState, useMemo } from "react";
import {
  FlaskConical,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  ChevronRight,
  Plus,
  FileText,
  ShieldCheck,
  BarChart3,
  Search,
  Filter,
  ArrowRight,
  Utensils,
  Users,
  ChefHat,
  ClipboardCheck,
  Calendar,
  RotateCcw,
  AlertCircle,
  Brain,
  Target,
  Zap,
  Heart,
  TrendingUp,
  LayoutDashboard,
  Maximize2,
  MoreVertical,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import PageHeader from "../../components/ui/PageHeader";
import { experiments, monthlyData } from "../../data/dummy";
import { motion, AnimatePresence } from "framer-motion";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900/95 border border-emerald-500/20 rounded-2xl p-4 text-[10px] font-black uppercase tracking-widest backdrop-blur-3xl shadow-2xl text-white">
      <div className="text-emerald-400 mb-3 border-b border-emerald-900/50 pb-2 italic tracking-tighter">
        TIMESTAMP: {label}
      </div>
      {payload.map((p) => (
        <div
          key={p.dataKey}
          className="flex items-center justify-between gap-6 mb-1.5 min-w-[120px]"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              style={{ backgroundColor: p.color }}
            />
            <span className="opacity-60">{p.dataKey}</span>
          </div>
          <span className="font-black italic text-sm">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const role = localStorage.getItem("ck_role") || "Manager";
  const userEmail = localStorage.getItem("ck_auth_email") || "Admin";
  const username = userEmail.split("@")[0];

  const storedExperiments = useMemo(() => {
    const raw = localStorage.getItem("ck_experiments");
    return raw ? JSON.parse(raw) : [];
  }, []);

  const allExperiments = useMemo(() => {
    return [...storedExperiments, ...experiments];
  }, [storedExperiments]);

  const stats = useMemo(() => {
    const chefExps = allExperiments.filter((e) =>
      e.chef?.toLowerCase().includes(username.toLowerCase()),
    );
    const chefData = chefExps.length ? chefExps : allExperiments;
    const chefChartData = monthlyData.map((m) => {
      const counts = chefData.reduce(
        (acc, e) => {
          if (!e.date) return acc;
          const mFull = new Date(e.date).toLocaleString("en-US", {
            month: "short",
          });
          if (mFull !== m.month) return acc;
          if (e.status === "Completed") acc.completed += 1;
          if (e.status === "Pending") acc.pending += 1;
          return acc;
        },
        { completed: 0, pending: 0 },
      );
      return { ...m, ...counts };
    });

    return {
      all: role === "Chef" ? chefData.length : allExperiments.length,
      completed: (role === "Chef" ? chefData : allExperiments).filter(
        (e) => e.status === "Completed",
      ).length,
      pending: (role === "Chef" ? chefData : allExperiments).filter(
        (e) => e.status === "Pending",
      ).length,
      data: role === "Chef" ? chefData : allExperiments,
      chartData: role === "Chef" ? chefChartData : monthlyData,
    };
  }, [role, allExperiments, username]);

  const staffCounts = useMemo(() => {
    const raw = localStorage.getItem("ck_staff_list");
    const staffList = raw
      ? JSON.parse(raw)
      : [
          { role: "Chef" },
          { role: "Chef" },
          { role: "Reviewer" },
          { role: "CRA" },
        ];
    return {
      chefs: staffList.filter((s) => s.role === "Chef").length,
      reviewers: staffList.filter((s) => s.role === "Reviewer").length,
      cra: staffList.filter((s) => s.role === "CRA").length,
    };
  }, []);

  const renderChefDashboard = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div className="relative group p-8 lg:p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-sm italic border border-emerald-100/50">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shadow-[0_0_8px_rgba(5,150,105,0.8)]" />
              Kitchen Live
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tighter leading-none uppercase italic">
              Welcome, <span className="text-emerald-600">{username}</span>
            </h1>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest opacity-60 italic leading-relaxed max-w-sm">
              Molecular formulations are tracking within optimal variance
              parameters.
            </p>
          </div>
          <div className="flex shrink-0 gap-4">
            <button
              onClick={() => navigate("/recipes")}
              className="flex items-center gap-3 px-8 py-4 bg-gray-950 hover:bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95 group/btn"
            >
              <Plus
                size={18}
                strokeWidth={3}
                className="group-hover/btn:rotate-90 transition-transform"
              />{" "}
              NEW SEQUENCE
            </button>
            <button
              onClick={() => navigate("/all-recipes")}
              className="flex items-center gap-3 px-8 py-4 bg-white text-gray-950 hover:bg-gray-50 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-gray-100 active:scale-95"
            >
              <FileText size={18} strokeWidth={2.5} /> REGISTRY
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Heart />}
          value={stats.all}
          label="Active Sequences"
          sub="Molecular load balanced"
          trend="↑ 12%"
          trendUp={true}
        />
        <StatCard
          icon={<ShieldCheck />}
          value={stats.completed}
          label="Pass Index"
          sub="Compliance achieved"
          trend="↑ 5.2%"
          trendUp={true}
        />
        <StatCard
          icon={<Clock />}
          value={stats.pending}
          label="Awaiting Audit"
          sub="Queue processing"
          trend="↓ 2.4%"
          trendUp={false}
        />
      </div>

      <Card noPad className="overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-gray-950 tracking-tighter uppercase italic leading-none">
              Sequence Activity Log
            </h2>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic opacity-60">
              Telemetry tracking for current shift
            </p>
          </div>
          <button className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-xl text-[9px] font-black text-gray-950 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
            FULL LOG <ArrowRight size={14} strokeWidth={3} />
          </button>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-white text-gray-300 text-[9px] font-black uppercase tracking-[0.3em] italic border-b border-gray-50">
              <tr>
                <th className="px-8 py-5">Node Identity</th>
                <th className="px-6 py-5 hidden sm:table-cell">
                  Temporal Mark
                </th>
                <th className="px-6 py-5 text-center">Quality Guard</th>
                <th className="px-8 py-5 text-right">Fidelity State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.data.slice(0, 10).map((exp, idx) => (
                <tr
                  key={exp.id}
                  className="hover:bg-emerald-50/20 transition-all group animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-300 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-black text-gray-950 text-xs uppercase tracking-tight group-hover:text-emerald-700 transition-colors italic">
                          {exp.recipe}
                        </div>
                        <div className="text-[8px] text-gray-400 font-black uppercase tracking-widest mt-1 opacity-60">
                          UID: {exp.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:table-cell">
                    {exp.date}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={exp.status} />
                  </td>
                  <td className="px-8 py-5 text-right font-black text-gray-950 italic text-xs tracking-tighter uppercase">
                    {exp.time || "Batch_Alpha"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderReviewerDashboard = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-5 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-0.5 bg-emerald-600 rounded-full" />
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] italic leading-none">
              Auditor Presence Active
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter leading-none italic uppercase">
            Quality Assurance <br />{" "}
            <span className="text-emerald-600">Terminal.</span>
          </h1>
          <p className="text-sm font-black text-gray-400 uppercase tracking-widest leading-relaxed italic opacity-60">
            Audit kitchen output, validate molecular formulations, and secure
            the protocol registry.
          </p>
        </div>
        <button
          onClick={() => navigate("/quality")}
          className="flex items-center gap-4 px-10 py-5 bg-gray-950 text-white rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 group"
        >
          <ShieldCheck
            size={20}
            strokeWidth={3}
            className="group-hover:rotate-12 transition-transform"
          />{" "}
          BEGIN AUDIT SEQUENCE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Brain />}
          value={stats.pending}
          label="Audit Queue"
          sub="Pending validation"
          trend="SYNC READY"
          trendUp={true}
        />
        <StatCard
          icon={<CheckCircle />}
          value={stats.completed}
          label="Daily Clearance"
          sub="Current shift total"
          trend="PEAK"
          trendUp={true}
        />
        <StatCard
          icon={<Target />}
          value="98.2%"
          label="Fidelity Index"
          sub="Consensus achieved"
          trend="OPTIMAL"
          trendUp={true}
        />
      </div>

      <Card noPad className="overflow-hidden">
        <div className="px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50 bg-gray-50/30">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">
              Prioritization Buffer
            </h3>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic opacity-60">
              Urgent validation nodes identified in stream
            </p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
            <button className="px-6 py-2 bg-gray-950 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">
              Active Queue
            </button>
            <button className="px-6 py-2 text-gray-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-emerald-600">
              History
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-gray-300 text-[9px] font-black uppercase tracking-[0.3em] italic border-b border-gray-50">
              <tr>
                <th className="px-8 py-5">Nomenclature</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.data.slice(0, 10).map((exp, i) => (
                <tr
                  key={exp.id}
                  className="hover:bg-emerald-50/20 group transition-all animate-in fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                        <FileText size={18} strokeWidth={3} />
                      </div>
                      <div>
                        <div className="text-sm font-black text-gray-950 uppercase italic tracking-tight leading-none group-hover:text-emerald-600 transition-colors uppercase">
                          {exp.recipe}
                        </div>
                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1 opacity-60">
                          IDENT: {exp.id} • {exp.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <StatusBadge status={exp.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => navigate("/quality")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 text-gray-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-emerald-600 hover:text-emerald-600 transition-all shadow-sm"
                    >
                      AUDIT <ChevronRight size={14} strokeWidth={3} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-1000 p-2 lg:p-4 space-y-10">
      {role === "Chef" ? (
        renderChefDashboard()
      ) : role === "Reviewer" ? (
        renderReviewerDashboard()
      ) : (
        <div className="space-y-10 animate-in fade-in duration-1000">
          <PageHeader
            title="Dashboard"
            subtitle="Aggregated manufacturing intelligence and molecular velocity tracking for factory floor management."
            actions={[
              <div
                key="range"
                className="flex items-center gap-4 px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm text-[9px] font-black text-gray-400 uppercase tracking-widest italic group hover:border-emerald-600 cursor-pointer transition-all"
              >
                <Calendar size={16} className="text-emerald-600" /> RANGE: 30D
                PROTOCOL
              </div>,
              <button
                key="exp"
                className="flex items-center gap-3 px-8 py-3 bg-gray-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-emerald-600 transition-all active:scale-95 group"
              >
                <Download
                  size={18}
                  strokeWidth={3}
                  className="group-hover:-translate-y-1 transition-transform"
                />{" "}
                EXPORT ANALYTICS
              </button>,
            ]}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<RotateCcw />}
              label="Audit Velocity"
              value="42"
              sub="Optimal throughput"
              trend="+12%"
              trendUp={true}
            />
            <StatCard
              icon={<AlertCircle />}
              label="Quality Sync"
              value="08"
              sub="Attention required"
              trend="+5.4%"
              trendUp={false}
            />
            <StatCard
              icon={<Users />}
              label="Staff Load"
              value={`${staffCounts.chefs + staffCounts.reviewers}`}
              sub="Cross-node cluster"
              trend="92%"
              trendUp={true}
            />
            <StatCard
              icon={<TrendingUp />}
              label="Fidelity Index"
              value="94"
              sub="Peak performance"
              trend="+2.4%"
              trendUp={true}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8 group">
              <Card
                noPad
                className="h-full border-gray-100 shadow-2xl shadow-emerald-900/5 relative overflow-hidden group"
              >
                <div className="px-8 py-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">
                      Monthly Total Experiments
                    </h3>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic opacity-60">
                      Recipe approval trends over molecular timeline
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-gray-100 rounded-xl text-emerald-600 shadow-sm group-hover:rotate-12 transition-transform">
                    <BarChart3 size={20} />
                  </div>
                </div>
                <div className="p-8 h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.15}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="6 6"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: 900 }}
                        dy={15}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: 900 }}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                          stroke: "#10b981",
                          strokeWidth: 2,
                          strokeDasharray: "4 4",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="completed"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl bg-gray-950 text-white p-8 lg:p-10 border-none shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/20 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-emerald-600/30 transition-all duration-1000" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                    <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] italic">
                      Neural Insights
                    </h4>
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter leading-none italic uppercase text-white">
                    Strategic Trace.
                  </h3>
                  <p className="text-emerald-100/50 text-xs font-black uppercase tracking-widest leading-loose italic">
                    Synthesis velocity is 12% faster than last interval.
                    Optimization protocol recommended.
                  </p>
                  <button className="w-full py-5 bg-white text-gray-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-2xl shadow-emerald-950/20 active:scale-95">
                    VIEW NEURAL REPORT
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-700 group overflow-hidden relative">
                  <div className="absolute right-0 top-0 p-4 opacity-[0.05] group-hover:scale-125 transition-transform duration-500">
                    <Zap size={40} className="text-emerald-500" />
                  </div>
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 italic opacity-60">
                    System Uptime
                  </div>
                  <div className="text-2xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">
                    99.8%
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-700 group overflow-hidden relative">
                  <div className="absolute right-0 top-0 p-4 opacity-[0.05] group-hover:scale-125 transition-transform duration-500">
                    <Users size={40} className="text-emerald-500" />
                  </div>
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 italic opacity-60">
                    Live Clusters
                  </div>
                  <div className="text-2xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">
                    REALTIME.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
