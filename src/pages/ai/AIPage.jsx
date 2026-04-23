import { useState, useEffect, useRef } from "react";
import {
  Search,
  Download,
  Activity,
  Shield,
  ShieldCheck,
  ChefHat,
  Star,
  Zap,
  ChevronDown,
  FileText,
  Clock,
  Layers,
  FlaskConical,
  AlertCircle,
  X,
  Check,
  Calendar,
  Plus,
  Thermometer,
  ArrowRight,
  Target,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import PageHeader from "../../components/ui/PageHeader";
import { aiAnalysis } from "../../data/dummy";

const FilterDropdown = ({
  label,
  icon: Icon,
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const isAllSelected = selectedValue.startsWith("All");

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-4 px-6 py-4 min-w-[200px] rounded-2xl border-2 transition-all duration-500 bg-white shadow-sm font-black text-[10px] uppercase tracking-widest
          ${isOpen ? "border-emerald-600 ring-4 ring-emerald-600/5 text-emerald-600 shadow-xl" : "border-gray-50 text-gray-400 hover:border-emerald-200 hover:shadow-lg"}`}
      >
        <div className="flex items-center gap-3 truncate">
          <Icon
            size={16}
            className={
              isAllSelected
                ? isOpen
                  ? "text-emerald-600"
                  : "text-gray-300"
                : "text-emerald-600"
            }
            strokeWidth={3}
          />
          <div className="flex items-center gap-2 truncate">
            {!isAllSelected && (
              <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg text-[9px] font-black whitespace-nowrap flex items-center gap-1.5 border border-emerald-100/50 shadow-sm">
                {selectedValue}
              </span>
            )}
            <span
              className={`truncate font-black ${isAllSelected ? "text-gray-700" : "text-gray-300"}`}
            >
              {isAllSelected ? label : ""}
            </span>
          </div>
        </div>
        <ChevronDown
          size={14}
          strokeWidth={3}
          className={`transition-transform duration-500 ${isOpen ? "rotate-180 text-emerald-600" : "text-gray-400"}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-white border border-gray-100 rounded-3xl shadow-2xl z-[110] overflow-hidden backdrop-blur-3xl bg-white/95"
          >
            <div className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
              {options.map((option) => {
                const isSelected = selectedValue === option;
                const isAll = option.startsWith("All");
                const initials = option
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2);

                return (
                  <div
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 mb-1 last:mb-0
                      ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/10"
                          : "hover:bg-emerald-50 text-gray-500 font-black text-[10px] uppercase tracking-widest hover:text-emerald-700"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {!isAll ? (
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-[9px] font-black shadow-inner transition-all
                          ${isSelected ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600"}`}
                        >
                          {initials}
                        </div>
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isSelected ? "bg-white/20 text-white" : "bg-gray-50 text-gray-300"}`}
                        >
                          <Icon size={14} strokeWidth={3} />
                        </div>
                      )}
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-white" : "text-gray-700"}`}
                      >
                        {option}
                      </span>
                    </div>
                    {isSelected && (
                      <Check
                        size={14}
                        strokeWidth={4}
                        className="text-white animate-in zoom-in duration-300"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AIPage() {
  const [search, setSearch] = useState("");
  const [chefFilter, setChefFilter] = useState("All Chefs");
  const [reviewerFilter, setReviewerFilter] = useState("All Reviewers");

  const chefs = [
    "All Chefs",
    ...new Set(aiAnalysis.map((a) => a.submittedBy).filter(Boolean)),
  ];
  const reviewers = [
    "All Reviewers",
    ...new Set(aiAnalysis.map((a) => a.reviewedBy).filter(Boolean)),
  ];

  const filtered = aiAnalysis.filter((a) => {
    const matchesSearch =
      a.recipe.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    const matchesChef =
      chefFilter === "All Chefs" || a.submittedBy === chefFilter;
    const matchesReviewer =
      reviewerFilter === "All Reviewers" || a.reviewedBy === reviewerFilter;
    return matchesSearch && matchesChef && matchesReviewer;
  });

  const ExperimentCard = ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    const barColor =
      data.variance < 5
        ? "#10b981"
        : data.variance < 15
          ? "#f59e0b"
          : "#ef4444";

    return (
      <Card
        noPad
        className="mb-8 border-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.04)] group"
      >
        <div className="p-8 lg:p-10">
          {/* Main Info Strip */}
          <div className="flex flex-col xl:flex-row justify-between items-start gap-8 mb-10">
            <div className="flex flex-1 items-center gap-8">
              <div className="relative shrink-0">
                <div className="absolute -inset-4 bg-emerald-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-600/10 rounded-3xl -rotate-2 scale-105 group-hover:rotate-0 group-hover:scale-100 transition-transform duration-700" />
                  <img
                    src={
                      data.image ||
                      "https://images.unsplash.com/photo-1604908176997-43149b0a7c0c"
                    }
                    alt={data.recipe}
                    className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-3xl object-cover border-4 border-white shadow-2xl z-10 transition-all duration-700 group-hover:rounded-2xl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/10">
                    {data.id}
                  </span>
                  <span className="bg-gray-950 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-gray-900/5">
                    BATCH {data.batchNo}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none group-hover:text-emerald-700 transition-colors duration-500">
                  {data.recipe}
                </h3>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-black text-gray-400 uppercase tracking-widest italic opacity-70">
                  <div className="flex items-center gap-2 text-gray-950">
                    <Calendar size={14} className="text-emerald-500" />
                    {data.date} <span className="opacity-30">•</span>{" "}
                    {data.time}
                  </div>
                  <div className="flex items-center gap-2 text-rose-500">
                    <Activity size={14} strokeWidth={3} />
                    RISK: {data.risk}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 self-end xl:self-start">
              <StatusBadge status={data.status} />
              <button
                onClick={() => setExpanded(!expanded)}
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-700 relative overflow-hidden group/btn ${
                  expanded
                    ? "bg-gray-950 border-gray-950 text-white shadow-xl scale-110"
                    : "bg-white text-gray-300 border-gray-100 hover:border-emerald-600 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                {expanded ? (
                  <ChevronUp size={20} strokeWidth={3} />
                ) : (
                  <ChevronDown size={20} strokeWidth={3} />
                )}
              </button>
            </div>
          </div>

          {/* Medium Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
            {[
              {
                label: "Thermal Index",
                val: data.temp,
                icon: Thermometer,
                color: "text-rose-500",
                bg: "bg-rose-50",
              },
              {
                label: "Cycle Time",
                val: data.timing,
                icon: Clock,
                color: "text-amber-500",
                bg: "bg-amber-50",
              },
              {
                label: "Target Form",
                val: data.expTexture,
                icon: Target,
                color: "text-emerald-500",
                bg: "bg-emerald-50",
              },
              {
                label: "Actual Form",
                val: data.actTexture,
                icon: Layers,
                color: "text-blue-500",
                bg: "bg-blue-50",
              },
              {
                label: "Yield Forecast",
                val: data.expYield,
                icon: Zap,
                color: "text-fuchsia-500",
                bg: "bg-fuchsia-50",
              },
              {
                label: "Actual Yield",
                val: data.actYield,
                icon: Activity,
                color: "text-cyan-500",
                bg: "bg-cyan-50",
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="group/metric p-6 rounded-3xl bg-gray-50/50 border border-gray-100/50 hover:bg-white hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-700 relative overflow-hidden text-center"
              >
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${metric.bg} ${metric.color} flex items-center justify-center shadow-inner group-hover/metric:scale-110 transition-all duration-700`}
                  >
                    <metric.icon size={18} strokeWidth={3} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] opacity-60 italic whitespace-nowrap">
                      {metric.label}
                    </div>
                    <div className="text-[14px] font-black text-gray-950 uppercase tracking-tighter">
                      {metric.val}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Variance Box - Medium Scaled */}
          <div className="relative p-8 lg:p-12 bg-gray-950 rounded-[3rem] border-2 border-emerald-950 overflow-hidden text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-600/10 blur-[130px] rounded-full -mr-[20rem] -mt-[20rem] opacity-50" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-14">
              {/* Radial Score */}
              <div className="flex flex-col items-center gap-4 shrink-0">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      className="stroke-emerald-950 fill-none stroke-[12px]"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      className="fill-none stroke-[12px] transition-all duration-1000 ease-out"
                      strokeDasharray="439.8"
                      strokeDashoffset={439.8 - (439.8 * data.variance) / 100}
                      stroke={barColor}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      {data.variance}%
                    </span>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mt-1 opacity-60">
                      DELTA
                    </span>
                  </div>
                </div>
                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] px-5 py-2 bg-emerald-950/50 rounded-full border border-emerald-900/50">
                  VARIANCE INDEX
                </div>
              </div>

              {/* Analysis Console */}
              <div className="flex-1 w-full space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-900 border shadow-2xl ${data.variance < 10 ? "text-emerald-400 border-emerald-400/20" : "text-amber-400 border-amber-400/20"}`}
                    >
                      {data.variance < 10 ? (
                        <ShieldCheck size={28} strokeWidth={2.5} />
                      ) : (
                        <AlertCircle size={28} strokeWidth={2.5} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none mb-2">
                        {data.varianceStatus}
                      </h4>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] opacity-80 italic">
                        Neural Validation Active
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">
                      CONSENSUS
                    </span>
                    <span className="text-xs font-black text-white italic tracking-tighter">
                      99.8% FIDELITY
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-3 bg-emerald-950 rounded-full w-full p-0.5 border border-emerald-900/20 relative overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                      style={{
                        backgroundColor: barColor,
                        width: `${data.variance}%`,
                      }}
                    />
                  </div>
                  <div className="relative pt-2">
                    <p className="text-base font-black text-emerald-50/70 leading-relaxed italic uppercase tracking-tight pl-6 border-l-4 border-emerald-600">
                      “Deep neural scan identified a {data.variance}% delta in
                      molecular consistency matrix for iteration V.
                      {data.version}.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden"
              >
                <div className="pt-12 mt-12 border-t border-gray-100 space-y-12">
                  {/* Grid System - Medium */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        label: "Target Profile",
                        icon: Target,
                        content: (
                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex-1">
                              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest opacity-60 italic">
                                TARGET
                              </div>
                              <div className="text-lg font-black text-gray-950 italic tracking-tighter">
                                ★ {data.expTaste}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest opacity-60 italic">
                                SYNTH
                              </div>
                              <div className="text-lg font-black text-emerald-600 italic tracking-tighter">
                                ★ {data.actTaste}
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        label: "Origin Node",
                        icon: ChefHat,
                        content: (
                          <div className="flex items-center gap-4 mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-10 h-10 rounded-xl bg-gray-950 flex items-center justify-center text-[10px] font-black text-white">
                              {data.submittedBy
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-black text-gray-950 uppercase tracking-tight truncate tracking-widest">
                                {data.submittedBy}
                              </div>
                              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest opacity-60">
                                ORIGINATOR
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        label: "Ledger Schema",
                        icon: FileText,
                        content: (
                          <div className="flex items-center gap-4 mt-6 px-5 py-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600">
                            <FileText size={18} strokeWidth={3} />
                            <span className="text-xs font-black uppercase tracking-widest italic leading-none">
                              V{data.version} LOGGED
                            </span>
                          </div>
                        ),
                      },
                      {
                        label: "Clearance",
                        icon: Shield,
                        content: (
                          <div className="flex items-center gap-4 mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-[10px] font-black text-white">
                              {data.reviewedBy
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "??"}
                            </div>
                            <div className="min-w-0 text-xs font-black italic text-gray-950 uppercase tracking-tight truncate">
                              {data.reviewedBy || "PENDING"}
                            </div>
                          </div>
                        ),
                      },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center gap-2 mb-2">
                          <item.icon
                            size={12}
                            className="text-emerald-600"
                            strokeWidth={3}
                          />
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic opacity-60">
                            {item.label}
                          </span>
                        </div>
                        {item.content}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-4 bg-emerald-600 rounded-full" />
                        <h4 className="text-[10px] font-black text-gray-950 uppercase tracking-[0.4em]">
                          Strategic Report
                        </h4>
                      </div>
                      <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-inner italic">
                        <p className="text-base font-black text-gray-950 leading-relaxed uppercase tracking-tight border-l-4 border-emerald-600 pl-6">
                          “ {data.remarks} ”
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-4 bg-emerald-600 rounded-full" />
                        <h4 className="text-[10px] font-black text-gray-950 uppercase tracking-[0.4em]">
                          Protocol Assets
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {data.files.map((f) => (
                          <button
                            key={f}
                            className="group/file flex items-center gap-4 px-6 py-4 bg-white border border-gray-100 rounded-2xl transition-all duration-300"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover/file:bg-emerald-600 group-hover/file:text-white flex items-center justify-center transition-all">
                              <FileText size={16} strokeWidth={2.5} />
                            </div>
                            <span className="text-[10px] font-black text-gray-950 uppercase tracking-widest group-hover/file:text-emerald-600 transition-colors">
                              {f}
                            </span>
                            <Download
                              size={14}
                              className="text-gray-200 group-hover/file:text-emerald-600 ml-2"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    );
  };

  return (
    <div className="animate-in fade-in duration-1000 p-2 lg:p-4">
      <PageHeader
        title="AI Analytics"
        subtitle="Approve or reject production batches based on deep neural analysis of variance data."
        actions={[
          <div
            key="mon"
            className="flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-3xl rounded-2xl border border-gray-100 text-[9px] font-black text-emerald-600 uppercase tracking-[0.3em] shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shadow-[0_0_10px_rgba(5,150,105,0.8)]" />
            SYNTHESIS ENGINE ONLINE
          </div>,
        ]}
      />

      {/* Strategic Metrics Overview - Medium Scale */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Zap,
            label: "Precise Synth",
            val: "94.8%",
            sub: "Predictive consistency",
            up: true,
          },
          {
            icon: Star,
            label: "Molecular Index",
            val: "91.2%",
            sub: "Structural stability",
            up: true,
          },
          {
            icon: ShieldCheck,
            label: "Active Tokens",
            val: "156",
            sub: "Verified ledgers",
            up: null,
          },
          {
            icon: Activity,
            label: "Archival Yield",
            val: `0${aiAnalysis.length}`,
            sub: "Processed entities",
            up: true,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="group bg-white/50 backdrop-blur-3xl p-8 rounded-3xl border border-gray-100 hover:border-emerald-600 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-700 relative overflow-hidden"
          >
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <stat.icon size={18} strokeWidth={3} />
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic opacity-60 leading-none">
                  {stat.label}
                </div>
              </div>
              <div className="text-3xl font-black text-gray-950 italic tracking-tighter uppercase leading-none">
                {stat.val}
              </div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest opacity-50">
                {stat.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Commands & Hub */}
      <div className="bg-white/40 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-gray-100/50 shadow-2xl shadow-emerald-900/5 flex flex-col xl:flex-row gap-6 items-stretch xl:items-center relative z-[40]">
        <div className="flex-1 relative group">
          <Search
            size={18}
            className="absolute left-6 text-gray-300 group-focus-within:text-emerald-500 transition-colors"
            strokeWidth={3}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH PROTOCOLS, BATCH ID..."
            className="w-full pl-16 pr-8 py-4 bg-white rounded-2xl border-2 border-gray-100 text-[11px] font-black uppercase tracking-widest text-gray-950 outline-none focus:border-emerald-600 transition-all placeholder:text-gray-200"
          />
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <FilterDropdown
            label="Chef"
            icon={ChefHat}
            options={chefs}
            selectedValue={chefFilter}
            onChange={setChefFilter}
          />
          <FilterDropdown
            label="Auditor"
            icon={ShieldCheck}
            options={reviewers}
            selectedValue={reviewerFilter}
            onChange={setReviewerFilter}
          />
          <button className="flex items-center justify-center gap-4 px-10 py-4 bg-gray-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-emerald-600 transition-all active:scale-95 group">
            <Download
              size={18}
              strokeWidth={3}
              className="group-hover:translate-y-0.5 transition-transform"
            />
            EXPLEDGER
          </button>
        </div>
      </div>

      {/* Stream */}
      <div className="space-y-10">
        <div className="flex items-center justify-between px-8 font-black uppercase tracking-[0.3em] text-[10px] italic">
          <div className="text-gray-400 flex items-center gap-4">
            DATABASE:{" "}
            <span className="text-emerald-600">{filtered.length} ARCHIVES</span>
          </div>
          <div className="flex items-center gap-3 text-emerald-600">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(5,150,105,0.8)]" />
            REALTIME_SYNC
          </div>
        </div>

        <div className="space-y-8">
          {filtered.map((e) => (
            <ExperimentCard key={e.id} data={e} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageSquareAlt({ size, className, strokeWidth }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function Card({ children, className = "", noPad = false }) {
  return (
    <div
      className={`
        bg-white/80 backdrop-blur-3xl 
        border border-gray-100/60 
        rounded-3xl 
        shadow-[0_20px_50px_-15px_rgba(5,150,105,0.04)]
        hover:shadow-[0_40px_80px_-20px_rgba(5,150,105,0.06)]
        transition-all duration-700
        relative
        ${noPad ? "p-0" : "p-8 md:p-10"} 
        ${className}
      `}
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16 opacity-40" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
