import { useState, useEffect } from "react";
import {
  Activity,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  Droplets,
  Eye,
  ImageIcon,
  Smile,
  Utensils,
  Wind,
  XCircle,
  Zap,
  ClipboardCheck,
  Save,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import { experiments } from "../../data/dummy";

// ─── Static Questions ────────────────────────────────────────────────────────

const STATIC_QUESTIONS = [
  {
    id: "static_overall",
    question: "What did you think about the test overall?",
    type: "long_text",
  },
  {
    id: "static_satisfaction",
    question: "How satisfied are you with the test experience?",
    type: "rating_stars",
  },
  {
    id: "static_understanding",
    question: "Was the test easy to understand?",
    type: "yes_no",
  },
  {
    id: "static_expectations",
    question: "Did the test meet your expectations?",
    type: "yes_no",
  },
  {
    id: "static_quality",
    question: "How would you rate the quality of the test?",
    type: "rating_stars",
  },
];

// ─── Question Components ───────────────────────────────────────────────────

const QuestionComponents = {
  rating_stars: ({ value, onChange, maxStars = 5 }) => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.5 bg-gray-50/50 p-2 rounded-2xl border border-gray-100/50">
        {[...Array(maxStars)].map((_, i) => {
          const star = i + 1;
          const isActive = value >= star;
          return (
            <button
              key={star}
              onClick={() => onChange(star)}
              className={`text-3xl transition-all duration-300 transform hover:scale-125 focus:outline-none ${
                isActive
                  ? "text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                  : "text-gray-200 hover:text-gray-300"
              }`}
            >
              ★
            </button>
          );
        })}
      </div>
      {value > 0 && (
        <span className="font-black text-[10px] text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100/50 shadow-sm animate-in zoom-in-50 duration-500">
          Score: {value} / {maxStars}
        </span>
      )}
    </div>
  ),

  short_text: ({ value, onChange, placeholder = "Input text payload..." }) => (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-5 text-sm font-bold text-gray-900 focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-600/20 outline-none transition-all placeholder:opacity-30 shadow-inner"
      placeholder={placeholder}
    />
  ),

  long_text: ({
    value,
    onChange,
    placeholder = "Detailed assessment remarks...",
  }) => (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50/50 border border-gray-100 rounded-[2rem] px-6 py-6 text-sm font-bold text-gray-900 focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-600/20 outline-none transition-all placeholder:opacity-30 min-h-[180px] resize-none shadow-inner leading-relaxed"
      placeholder={placeholder}
    />
  ),

  yes_no: ({ value, onChange }) => (
    <div className="flex gap-5">
      {["Yes", "No"].map((opt) => {
        const isActive = value === opt;
        const isYes = opt === "Yes";
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 flex items-center justify-center gap-4 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 border-2 ${
              isActive
                ? isYes
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-600/20 scale-[1.02]"
                  : "bg-red-600 text-white border-red-600 shadow-xl shadow-red-600/20 scale-[1.02]"
                : "bg-white text-gray-400 border-gray-100 hover:border-emerald-500/30 hover:text-gray-900 shadow-sm"
            }`}
          >
            {isYes ? (
              <CheckCircle size={18} strokeWidth={3} />
            ) : (
              <XCircle size={18} strokeWidth={3} />
            )}
            {opt}
          </button>
        );
      })}
    </div>
  ),

  nps: ({ value, onChange }) => (
    <div className="space-y-5">
      <div className="grid grid-cols-6 sm:grid-cols-11 gap-2.5">
        {[...Array(11)].map((_, i) => {
          const isActive = value === i;
          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              className={`aspect-square rounded-2xl font-black text-sm transition-all duration-500 border ${
                isActive
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30 scale-110"
                  : "bg-white text-gray-500 border-gray-100 hover:border-emerald-500 hover:text-emerald-600"
              }`}
            >
              {i}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between items-center px-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] opacity-80">
        <span>Low Confidence</span>
        <div className="h-px flex-1 mx-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <span>High Precision</span>
      </div>
    </div>
  ),

  slider: ({ value, onChange, min = 0, max = 100, step = 1 }) => (
    <div className="py-2 space-y-6">
      <div className="relative h-2.5 rounded-full bg-gray-100 border border-gray-200 shadow-inner">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value ?? (max - min) / 2}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-x-0 -top-1.5 w-full h-6 opacity-0 cursor-pointer z-20"
        />
        <div
          className="absolute left-0 top-0 h-full bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300"
          style={{
            width: `${(((value ?? (max - min) / 2) - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
        <span className="text-gray-400">{min} MIN</span>
        <span className="bg-emerald-600 text-white px-5 py-2 rounded-xl border border-emerald-500 shadow-lg shadow-emerald-600/20 text-xs tracking-tight">
          Current: {value ?? "--"}
        </span>
        <span className="text-gray-400">{max} MAX</span>
      </div>
    </div>
  ),

  single_choice: ({ value, onChange, options = [] }) => (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const isActive = value === opt;
        return (
          <label
            key={opt}
            className={`flex items-center gap-4 py-5 px-6 rounded-[2rem] cursor-pointer transition-all duration-300 border-2 group ${
              isActive
                ? "bg-emerald-50/50 border-emerald-600 shadow-xl shadow-emerald-900/5"
                : "bg-white border-gray-100 hover:border-emerald-500/30"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isActive
                  ? "border-emerald-600 bg-white"
                  : "border-gray-200 group-hover:border-emerald-500/50"
              }`}
            >
              {isActive && (
                <div className="w-3 h-3 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)]" />
              )}
            </div>
            <input
              type="radio"
              checked={isActive}
              onChange={() => onChange(opt)}
              className="hidden"
            />
            <span
              className={`text-[15px] font-bold tracking-tight transition-colors ${isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"}`}
            >
              {opt}
            </span>
          </label>
        );
      })}
    </div>
  ),

  multi_choice: ({ value = [], onChange, options = [] }) => (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const isChecked = value.includes(opt);
        return (
          <label
            key={opt}
            className={`flex items-center gap-4 py-5 px-6 rounded-[2rem] cursor-pointer transition-all duration-300 border-2 group ${
              isChecked
                ? "bg-emerald-50/50 border-emerald-600 shadow-xl shadow-emerald-900/5"
                : "bg-white border-gray-100 hover:border-emerald-500/30"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all ${
                isChecked
                  ? "bg-emerald-600 border-emerald-600"
                  : "border-gray-200 group-hover:border-emerald-500/50"
              }`}
            >
              {isChecked && (
                <div className="w-2 h-3 border-r-[3px] border-b-[3px] border-white rotate-45 mb-1" />
              )}
            </div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() =>
                onChange(
                  isChecked ? value.filter((v) => v !== opt) : [...value, opt],
                )
              }
              className="hidden"
            />
            <span
              className={`text-[15px] font-bold tracking-tight transition-colors ${isChecked ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"}`}
            >
              {opt}
            </span>
          </label>
        );
      })}
    </div>
  ),

  dropdown: ({ value, onChange, options = [] }) => (
    <div className="relative group">
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50/50 border border-gray-100 rounded-[2rem] px-6 py-5 text-[15px] font-bold text-gray-900 focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-600/20 outline-none transition-all appearance-none cursor-pointer pr-16 shadow-inner"
      >
        <option value="" disabled className="text-gray-400">
          Select target protocol...
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-white">
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
        <ChevronDown size={24} strokeWidth={2.5} />
      </div>
    </div>
  ),

  emoji_reaction: ({ value, onChange }) => (
    <div className="flex justify-between items-center px-10 py-10 bg-gray-50/50 rounded-[3rem] border border-gray-100 shadow-inner">
      {["😠", "😟", "😐", "🙂", "😍"].map((emoji, i) => {
        const isActive = value === emoji;
        return (
          <button
            key={i}
            onClick={() => onChange(emoji)}
            className={`text-6xl transition-all duration-500 hover:scale-125 hover:-translate-y-4 focus:outline-none ${
              isActive
                ? "filter-none opacity-100 scale-125 drop-shadow-[0_20px_25px_rgba(16,185,129,0.3)]"
                : "grayscale opacity-20 hover:grayscale-0 hover:opacity-60"
            }`}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  ),

  date: ({ value, onChange }) => (
    <input
      type="date"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
    />
  ),

  number: ({ value, onChange, min, max }) => (
    <input
      type="number"
      min={min}
      max={max}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-mono"
      placeholder="0.00"
    />
  ),

  ranking: ({ value = [], onChange, options = [] }) => {
    const handleMove = (idx, dir) => {
      const newList = [...value];
      const target = dir === "up" ? idx - 1 : idx + 1;
      if (target >= 0 && target < newList.length) {
        [newList[idx], newList[target]] = [newList[target], newList[idx]];
        onChange(newList);
      }
    };

    useEffect(() => {
      if (value.length === 0 && options.length > 0) onChange([...options]);
    }, [options]);

    return (
      <div className="flex flex-col gap-3">
        {(value.length > 0 ? value : options).map((opt, i) => (
          <div
            key={opt}
            className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xs font-black text-emerald-600 shadow-inner">
              {i + 1}
            </div>
            <span className="flex-1 text-sm font-bold text-gray-900 tracking-tight">
              {opt}
            </span>
            <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleMove(i, "up")}
                disabled={i === 0}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  i === 0
                    ? "text-gray-300 opacity-20"
                    : "bg-gray-50 text-gray-600 hover:bg-emerald-600 hover:text-white"
                }`}
              >
                <ChevronUp size={16} strokeWidth={3} />
              </button>
              <button
                onClick={() => handleMove(i, "down")}
                disabled={i === (value.length || options.length) - 1}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  i === (value.length || options.length) - 1
                    ? "text-gray-300 opacity-20"
                    : "bg-gray-50 text-gray-600 hover:bg-emerald-600 hover:text-white"
                }`}
              >
                <ChevronDown size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  },

  matrix: ({ value = {}, onChange, rows = [], columns = [] }) => (
    <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr>
            <th className="text-left px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] opacity-80">
              Verification Node
            </th>
            {columns.map((col) => (
              <th
                key={col}
                className="text-center px-4 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] opacity-80"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row}
              className="bg-white shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] group/row"
            >
              <td className="px-8 py-6 text-sm font-black text-gray-900 rounded-l-[2rem] border-l border-y border-gray-100 group-hover/row:border-emerald-500/30 group-hover/row:bg-emerald-50/30 transition-all">
                {row}
              </td>
              {columns.map((col, idx) => (
                <td
                  key={col}
                  className={`text-center px-4 py-6 border-y border-gray-100 group-hover/row:border-emerald-500/30 group-hover/row:bg-emerald-50/30 transition-all ${idx === columns.length - 1 ? "rounded-r-[2rem] border-r" : ""}`}
                >
                  <label className="flex items-center justify-center cursor-pointer group/cell">
                    <input
                      type="radio"
                      checked={value[row] === col}
                      onChange={() => onChange({ ...value, [row]: col })}
                      className="hidden"
                    />
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        value[row] === col
                          ? "border-emerald-600 bg-emerald-50 shadow-[0_0_12px_rgba(5,150,105,0.3)] scale-110"
                          : "border-gray-200 group-cell:border-emerald-500/50"
                      }`}
                    >
                      {value[row] === col && (
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)]" />
                      )}
                    </div>
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),

  image_choice: ({ value, onChange, options = [] }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {options.map((opt, i) => {
        const isActive = value === opt;
        return (
          <div
            key={i}
            onClick={() => onChange(opt)}
            className={`group cursor-pointer rounded-[28px] overflow-hidden transition-all duration-500 border-2 ${
              isActive
                ? "border-emerald-600 shadow-2xl shadow-emerald-600/10 scale-[1.02]"
                : "border-gray-100 hover:border-emerald-500/30"
            }`}
          >
            <div className="relative h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/5" />
              <ImageIcon
                size={48}
                className={`transition-all duration-700 ${isActive ? "text-emerald-600 opacity-100 scale-125" : "text-gray-300 opacity-20 group-hover:opacity-40"}`}
              />
            </div>
            <div
              className={`p-4 text-center text-xs font-black uppercase tracking-widest transition-colors ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-400 group-hover:text-gray-900"
              }`}
            >
              {opt}
            </div>
          </div>
        );
      })}
    </div>
  ),

  linear_scale: ({ value, onChange, min = 1, max = 5 }) => (
    <div className="flex justify-center gap-5 py-2">
      {[...Array(max - min + 1)].map((_, i) => {
        const val = min + i;
        const isActive = value === val;
        return (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={`w-16 h-16 rounded-[2rem] font-black text-xl transition-all duration-500 border-2 ${
              isActive
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-600/20 scale-110"
                : "bg-white text-gray-400 border-gray-100 hover:border-emerald-500/50 hover:text-gray-900"
            }`}
          >
            {val}
          </button>
        );
      })}
    </div>
  ),
};

//  Main Component

export default function QualityPage() {
  const [experimentsState, setExperimentsState] = useState(experiments);
  const pendingExps = experimentsState.filter((e) => e.status === "Pending");

  const [questions] = useState(() => {
    const saved = localStorage.getItem("quality_questions");
    return saved ? JSON.parse(saved) : [];
  });
  const [selected, setSelected] = useState(null);
  const [reviewType, setReviewType] = useState(() => {
    const saved = localStorage.getItem("quality_questions");
    const hasCustom = saved ? JSON.parse(saved).length > 0 : false;
    return hasCustom ? "qa" : "rating";
  });
  const [queueFilter, setQueueFilter] = useState("Pending");
  const [sensoryScores, setSensoryScores] = useState({
    taste: 0,
    aroma: 0,
    visual: 0,
    consistency: 0,
    saltiness: 0,
    spiciness: 0,
    oiliness: 0,
    freshness: 0,
    aftertaste: 0,
  });
  const [formAnswers, setFormAnswers] = useState({});
  const [remarks, setRemarks] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const ingredientText = selected?.ingredients?.length
    ? selected.ingredients
        .map((ing) => ing.name)
        .filter(Boolean)
        .join(", ")
    : "—";

  const handleSelect = (exp) => {
    setSelected(exp);
    setStatusMessage(null);
    setRemarks("");
    setSensoryScores({
      taste: 0,
      aroma: 0,
      visual: 0,
      consistency: 0,
      saltiness: 0,
      spiciness: 0,
      oiliness: 0,
      freshness: 0,
      aftertaste: 0,
    });
    setFormAnswers({});
  };

  const handleSubmitReview = () => {
    if (!selected) return;
    const updatedExperiments = experimentsState.map((exp) =>
      exp.id === selected.id ? { ...exp, status: "Approved" } : exp,
    );
    setExperimentsState(updatedExperiments);
    setStatusMessage({ text: "Protocol audit verified and encrypted." });
    setTimeout(() => {
      setSelected(null);
      setStatusMessage(null);
    }, 3000);
  };

  const isFormValid =
    reviewType === "rating"
      ? true
      : Object.keys(formAnswers).length === questions.length;

  const RatingRow = ({ icon: Icon, label, value, onChange, color }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
          <Icon size={16} strokeWidth={2.5} style={{ color }} />
          {label}
        </div>
        {value > 0 && (
          <div
            className="text-[10px] font-black px-3 py-1 rounded-full bg-white border shadow-sm scale-110 transition-transform animate-in zoom-in-50"
            style={{ color, borderColor: `${color}40` }}
          >
            {value} / 10
          </div>
        )}
      </div>
      <div className="relative group">
        <input
          type="number"
          min="0"
          max="10"
          value={value === 0 ? "" : value}
          onChange={(e) => {
            const val =
              e.target.value === ""
                ? 0
                : Math.min(10, Math.max(0, parseInt(e.target.value) || 0));
            onChange(val);
          }}
          placeholder="Enter Intensity (0-10)"
          className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 text-center text-xl font-black transition-all duration-500 focus:ring-8 focus:ring-gray-100 focus:border-emerald-500/30 outline-none placeholder:font-black placeholder:text-xs placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-gray-300 text-gray-900 shadow-sm"
          style={{
            color: value > 0 ? color : "#111827",
            borderColor: value > 0 ? `${color}40` : "#f3f4f6",
          }}
        />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[9px] font-black text-gray-400 uppercase tracking-widest pointer-events-none group-focus-within:text-emerald-500 transition-colors">
          Audit Score
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-black text-gray-400 uppercase tracking-widest pointer-events-none group-focus-within:text-emerald-500 transition-colors">
          PTS
        </div>
      </div>
    </div>
  );

  const queueItems = experimentsState.filter((e) =>
    queueFilter === "All" ? true : e.status === queueFilter,
  );

  return (
    <div className="animate-in fade-in duration-1000">
      <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-160px)] relative">
        {/* Sidebar Queue */}
        <div className="w-full lg:w-[480px] lg:h-[calc(100vh-160px)] lg:overflow-y-auto lg:sticky lg:top-24 space-y-6 scrollbar-hide">
          <div className="flex items-center justify-between mb-10 px-4">
            <div>
              <div className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2 leading-none">
                Telemetry Queue
              </div>
              <h1 className="text-4xl font-black text-gray-950 uppercase tracking-tighter italic">
                Audit Stream
              </h1>
            </div>
            <div className="p-4 bg-emerald-50 rounded-[2rem] border border-emerald-100 text-emerald-600 shadow-inner group transition-transform hover:rotate-12">
              <Activity size={24} className="group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div className="space-y-4">
            {queueItems.length === 0 ? (
              <div className="py-32 px-10 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-gray-200 shadow-inner border border-gray-100">
                  <Activity size={40} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-black text-gray-950 uppercase tracking-tight">NULL SIGNAL</h4>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3 leading-relaxed">
                  The audit stream is currently empty.<br />Waiting for experiment telemetry.
                </p>
              </div>
            ) : (
              queueItems.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => handleSelect(exp)}
                  className={`w-full group p-8 rounded-[3rem] transition-all duration-700 relative overflow-hidden border-2 flex flex-col gap-6 text-left ${
                    selected?.id === exp.id
                      ? "bg-emerald-600 border-emerald-500 shadow-2xl shadow-emerald-600/30 -translate-y-2"
                      : "bg-white border-transparent hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-gray-900/5"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className={`text-[10px] font-black uppercase tracking-[0.25em] mb-1.5 transition-colors ${selected?.id === exp.id ? "text-emerald-300" : "text-emerald-600/60"}`}>
                        NODE #{exp.id} v{exp.version}
                      </div>
                      <h3 className={`text-2xl font-black tracking-tight leading-none uppercase ${selected?.id === exp.id ? "text-white" : "text-gray-950 group-hover:text-emerald-700"}`}>
                        {exp.recipe}
                      </h3>
                    </div>
                    <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${selected?.id === exp.id ? "bg-white/10 border-white/20 text-white" : "bg-emerald-50 border-emerald-100 text-emerald-600"}`}>
                      {exp.status}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                    <div className={`flex items-center gap-3 ${selected?.id === exp.id ? "text-white/60" : "text-gray-400"}`}>
                      <Clock size={16} />
                      {exp.time}
                    </div>
                    <div className={`flex items-center gap-3 ${selected?.id === exp.id ? "text-white" : "text-emerald-600"}`}>
                      <Zap size={16} className={selected?.id === exp.id ? "" : "text-amber-500"} />
                      {exp.aiScore}% SCORE
                    </div>
                  </div>

                  {selected?.id === exp.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms]" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main Content Terminal */}
        <div className="flex-1 min-h-[calc(100vh-160px)] px-2 lg:px-8 relative pb-20">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-white rounded-[3.5rem] border border-gray-200/60 shadow-2xl shadow-gray-900/5 overflow-hidden border-t-[12px] border-t-emerald-600"
                >
                  <div className="p-10 lg:p-14">
                    {/* Experiment Header Info */}
                    <div className="flex flex-col xl:flex-row justify-between items-start gap-12 mb-14">
                      <div className="flex-1 space-y-8">
                        <div className="flex items-center gap-4">
                          <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100 shadow-sm animate-in zoom-in-50 duration-500">
                            NODE: {selected.id}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] opacity-80">
                              Telemetry by {selected.chef}
                            </span>
                          </div>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-gray-950 tracking-tighter leading-[0.85] uppercase">
                          {selected.recipe}
                        </h2>
                        <div className="flex flex-wrap items-center gap-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">
                          <div className="flex items-center gap-3 text-gray-900">
                            <Clock size={18} className="text-emerald-500" />
                            {selected.date} <span className="opacity-30">•</span> {selected.time}
                          </div>
                          <div className="flex items-center gap-3 text-gray-900">
                            <Zap size={18} className="text-amber-500" />
                            ITERATION v{selected.version}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-10 bg-gray-50/50 p-8 rounded-[3rem] border border-gray-100 shadow-inner group/score">
                        <div className="relative">
                          <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="58"
                              stroke="currentColor"
                              strokeWidth="10"
                              fill="transparent"
                              className="text-white"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="58"
                              stroke="currentColor"
                              strokeWidth="10"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 58}
                              strokeDashoffset={
                                2 * Math.PI * 58 * (1 - (selected.aiScore || 0) / 100)
                              }
                              className={`transition-all duration-1000 ${
                                selected.aiScore > 80
                                  ? "text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                                  : selected.aiScore > 60
                                    ? "text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                                    : "text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                              }`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-gray-900 leading-none">
                              {selected.aiScore}
                            </span>
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">
                              FIDELITY
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            AI Confidence
                          </div>
                          <div className="text-lg font-black text-gray-900 italic">
                            {selected.aiScore > 80 ? "High Precision" : "Optimal range"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image Preview & Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                      <div className="aspect-video rounded-[3rem] overflow-hidden border-8 border-gray-50 shadow-2xl relative group bg-gray-100">
                        <img
                          src={selected.image}
                          alt={selected.recipe}
                          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                          <div className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                            Visual Reference Data
                          </div>
                          <div className="text-white text-lg font-black tracking-tight leading-none uppercase">
                            Batch #{selected.batchNo} Imaging
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5">
                        {[
                          {
                            label: "Molecular Profile",
                            value: ingredientText,
                            icon: Utensils,
                            color: "text-blue-500",
                            bg: "bg-blue-50",
                          },
                          {
                            label: "Thermal Precision",
                            value: `${selected.temp}°C`,
                            icon: Droplets,
                            color: "text-indigo-500",
                            bg: "bg-indigo-50",
                          },
                          {
                            label: "Cycle Duration",
                            value: `${selected.timing}m`,
                            icon: Clock,
                            color: "text-amber-500",
                            bg: "bg-amber-50",
                          },
                        ].map(({ label, value, icon: Icon, color, bg }) => (
                          <div
                            key={label}
                            className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500"
                          >
                            <div className="flex items-center gap-6 relative z-10 transition-transform group-hover:translate-x-2 duration-500">
                              <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner border border-gray-50 group-hover:scale-110 transition-all duration-500 ${bg} ${color}`}
                              >
                                <Icon size={20} strokeWidth={2.5} />
                              </div>
                              <div className="flex-1">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{label}</div>
                                <div className="text-lg font-black text-gray-900 tracking-tight leading-none">
                                  {value}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form Controls Section */}
                    <div className="bg-gray-50/50 p-10 lg:p-14 rounded-[3rem] border border-gray-100 shadow-inner">
                      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-[22px] bg-white border border-gray-100 flex items-center justify-center text-emerald-600 shadow-sm transition-transform hover:rotate-6 duration-500">
                            <Activity size={28} strokeWidth={2.5} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black tracking-tight text-gray-950 uppercase leading-none mb-1">
                              Verification Data
                            </h3>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                              Audit Vector Control
                            </div>
                          </div>
                        </div>

                        <div className="flex p-1.5 bg-white border border-gray-100 rounded-2xl gap-1.5 shadow-sm">
                          {[
                            { key: "rating", label: "Metric Ratings" },
                            { key: "qa", label: "Logic Inquiries" },
                          ].map(({ key, label }) => (
                            <button
                              key={key}
                              onClick={() => setReviewType(key)}
                              className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                                reviewType === key
                                  ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 scale-[1.05]"
                                  : "text-gray-400 hover:text-gray-900"
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Content Switching Area */}
                      <motion.div
                        key={reviewType}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="min-h-[450px]"
                      >
                        {reviewType === "rating" ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                            {[
                              { label: "Flavor Profile", icon: Utensils, color: "#10b981", key: "taste" },
                              { label: "Aromatic Volatility", icon: Wind, color: "#f59e0b", key: "aroma" },
                              { label: "Structural Integrity", icon: Activity, color: "#8b5cf6", key: "consistency" },
                              { label: "Visual Chromacity", icon: Eye, color: "#ec4899", key: "visual" },
                              { label: "Thermal Stability", icon: Droplets, color: "#3b82f6", key: "saltiness" },
                              { label: "Palate Persistence", icon: Smile, color: "#d946ef", key: "aftertaste" },
                            ].map((field) => (
                              <RatingRow
                                key={field.key}
                                label={field.label}
                                icon={field.icon}
                                color={field.color}
                                value={sensoryScores[field.key]}
                                onChange={(val) =>
                                  setSensoryScores((prev) => ({ ...prev, [field.key]: val }))
                                }
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-8">
                            {questions.length === 0 ? (
                              <div className="py-24 px-10 bg-white border border-gray-100 rounded-[3rem] text-center max-w-xl mx-auto shadow-sm">
                                <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 text-gray-200 border border-gray-100">
                                  <Activity size={40} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Null Signal Vector</h4>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3 leading-relaxed">
                                  Dynamic inquiry vectors must be initialized<br />in the quality control center.
                                </p>
                              </div>
                            ) : (
                              questions.map((q, i) => {
                                const Comp = QuestionComponents[q.type];
                                return (
                                  <div key={q.id} className="p-10 bg-white border border-gray-100 rounded-[3rem] shadow-sm hover:border-emerald-500/30 transition-all duration-500 group">
                                    <div className="flex items-start gap-8 mb-10">
                                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-sm font-black text-emerald-600 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        {String(i + 1).padStart(2, "0")}
                                      </div>
                                      <div className="pt-2">
                                        <div className="text-[10px] font-black text-emerald-600/60 uppercase tracking-[0.25em] mb-2">Verification Node {i + 1}</div>
                                        <h4 className="text-xl font-black tracking-tight text-gray-950 uppercase leading-snug">{q.question}</h4>
                                      </div>
                                    </div>
                                    <div className="px-2">
                                      {Comp ? (
                                        <Comp {...q} value={formAnswers[q.id]} onChange={(val) => setFormAnswers((prev) => ({ ...prev, [q.id]: val }))} />
                                      ) : (
                                        <div className="p-8 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-3xl border border-red-100 flex items-center gap-4">
                                          <Activity size={16} />
                                          ERR: Critical Logic Component Missing [{q.type}]
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        )}
                      </motion.div>

                      {/* Remarks Section */}
                      <div className="mt-16 pt-16 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-1.5 h-6 bg-gray-900 rounded-full" />
                          <h3 className="text-[11px] font-black text-gray-950 uppercase tracking-[0.3em]">Audit Remarks & Signature</h3>
                        </div>
                        <div className="relative group/remarks">
                          <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="w-full bg-white rounded-[2.5rem] p-10 text-gray-900 font-bold text-lg leading-relaxed border-2 border-gray-100 focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500/30 outline-none transition-all placeholder:text-gray-300 placeholder:font-black placeholder:uppercase placeholder:text-xs placeholder:tracking-widest min-h-[200px] shadow-sm group-hover/remarks:shadow-lg duration-500"
                            placeholder="Provide final professional summary and compliance remarks..."
                          />
                        </div>
                      </div>

                      {/* Action Footer */}
                      <div className="mt-12 flex flex-col sm:flex-row gap-6">
                        <button
                          onClick={handleSubmitReview}
                          disabled={!isFormValid}
                          className={`flex-1 flex items-center justify-center gap-5 py-8 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.3em] transition-all duration-500 transform hover:scale-[1.02] border-2 shadow-2xl ${
                            !isFormValid
                              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-700 shadow-emerald-600/30 active:scale-95"
                          }`}
                        >
                          {!isFormValid ? <Clock size={22} className="animate-pulse" /> : <Save size={22} strokeWidth={3} />}
                          {!isFormValid ? "Awaiting Data Entry..." : "Finalize Audit Transaction"}
                        </button>
                        <button
                          onClick={() => setSelected(null)}
                          className="px-12 py-8 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.3em] bg-white border-2 border-gray-100 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all duration-500 shadow-lg shadow-gray-900/5 active:scale-95"
                        >
                          Cancel Protocol
                        </button>
                      </div>

                      <AnimatePresence>
                        {statusMessage && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-10 p-8 bg-emerald-600 text-white rounded-[32px] shadow-2xl shadow-emerald-500/30 flex items-center gap-6"
                          >
                            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 animate-bounce">
                              <CheckCircle size={28} strokeWidth={3} />
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1 leading-none">Mission Accomplished</div>
                              <span className="text-lg font-black tracking-tight">{statusMessage.text}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-[600px] flex flex-col items-center justify-center p-12 text-center bg-white rounded-[4rem] border border-gray-100 shadow-xl mx-auto max-w-3xl">
                  <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
                    <div className="w-32 h-32 bg-gray-50 rounded-[40px] flex items-center justify-center shadow-inner border border-gray-100 relative z-10">
                      <ClipboardCheck size={56} className="text-gray-200 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-700" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black text-gray-950 uppercase tracking-[0.2em] mb-4">Select Protocol</h2>
                  <p className="text-sm font-medium text-gray-400 max-w-sm leading-relaxed mb-10">
                    Select a high-fidelity experiment protocol from the queue to start the quality audit orchestration.
                  </p>
                  <div className="flex gap-4">
                    <div className="px-6 py-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                      <Activity size={14} />
                      Terminal Ready
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
