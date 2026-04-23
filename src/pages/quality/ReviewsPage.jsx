import { useState } from "react";
import {
  CheckCircle,
  Clock,
  Search,
  Calendar,
  ChevronDown,
  Activity,
  Eye,
  Utensils,
  Wind,
  Zap,
  Droplets,
  Smile,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  FileText,
  ShieldCheck,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import { experiments } from "../../data/dummy";

// ─── Static Questions ────────────────────────────────────────────────────────

const STATIC_QUESTIONS = [
  { id: "static_overall", question: "Overall Impression", type: "long_text" },
  { id: "static_satisfaction", question: "Satisfaction", type: "rating_stars" },
  { id: "static_understanding", question: "Clarity", type: "yes_no" },
  { id: "static_expectations", question: "Met Expectations", type: "yes_no" },
  { id: "static_quality", question: "Quality Rating", type: "rating_stars" },
];

const MOCK_REVIEW_DATA = {
  "EXP-001": {
    sensoryScores: { taste: 9, aroma: 8, saltiness: 7, visual: 9, consistency: 8, spiciness: 6, oiliness: 5, freshness: 9, aftertaste: 8 },
    answers: { static_overall: "Excellent dish with rich, creamy texture and perfectly balanced spices.", static_satisfaction: 5, static_understanding: "yes", static_expectations: "yes", static_quality: 4 },
    remarks: "One of the best batches yet. Slight improvement in consistency recommended.",
    reviewedBy: "Sunita Rao",
    reviewedDate: "2024-12-15",
  },
};

const sensoryLabels = [
  { key: "taste", label: "Taste", icon: Utensils, color: "text-blue-500", bg: "bg-blue-50", bar: "bg-blue-500" },
  { key: "aroma", label: "Aroma", icon: Wind, color: "text-amber-500", bg: "bg-amber-50", bar: "bg-amber-500" },
  { key: "saltiness", label: "Saltiness", icon: Zap, color: "text-indigo-500", bg: "bg-indigo-50", bar: "bg-indigo-500" },
  { key: "visual", label: "Visual", icon: Eye, color: "text-emerald-500", bg: "bg-emerald-50", bar: "bg-emerald-500" },
  { key: "consistency", label: "Texture", icon: Droplets, color: "text-orange-500", bg: "bg-orange-50", bar: "bg-orange-500" },
  { key: "spiciness", label: "Spiciness", icon: Activity, color: "text-rose-500", bg: "bg-rose-50", bar: "bg-rose-500" },
  { key: "oiliness", label: "Oiliness", icon: Droplets, color: "text-lime-500", bg: "bg-lime-50", bar: "bg-lime-500" },
  { key: "freshness", label: "Freshness", icon: Activity, color: "text-cyan-500", bg: "bg-cyan-50", bar: "bg-cyan-500" },
  { key: "aftertaste", label: "Aftertaste", icon: Smile, color: "text-fuchsia-500", bg: "bg-fuchsia-50", bar: "bg-fuchsia-500" },
];

export default function ReviewsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const role = localStorage.getItem("ck_role");
  const showAIScore = role === "Manager";

  const tableColumns = showAIScore
    ? "1.2fr 1fr 1fr 80px 1.2fr 100px 50px"
    : "1.2fr 1fr 1fr 80px 100px 50px";

  const filteredExperiments = experiments.filter((exp) => {
    const matchesStatus = statusFilter === "all" || (statusFilter === "pending" && exp.status === "Pending") || (statusFilter === "completed" && exp.status === "Completed");
    const matchesSearch = exp.recipe.toLowerCase().includes(searchQuery.toLowerCase()) || exp.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = experiments.filter((e) => e.status === "Pending").length;
  const completedCount = experiments.filter((e) => e.status === "Completed").length;

  const renderStars = (value) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={12} className={s <= value ? "fill-emerald-500 text-emerald-500" : "fill-gray-100 text-gray-200"} strokeWidth={0} />
      ))}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-1000">
      <PageHeader
        title="Quality Feedback"
        subtitle="Manage sensory analytics and archival validation data."
        actions={[
          <div key="stats" className="flex gap-3">
            <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 text-[9px] font-black tracking-widest uppercase text-gray-400">
              <span className="text-amber-500 mr-2">●</span> {pendingCount} PENDING
            </div>
            <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 text-[9px] font-black tracking-widest uppercase text-gray-400">
              <span className="text-emerald-500 mr-2">●</span> {completedCount} VERIFIED
            </div>
          </div>,
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" strokeWidth={3} />
          <input
            type="text"
            placeholder="Search Protocols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border-2 border-gray-50 focus:border-emerald-600 outline-none text-[11px] font-black uppercase tracking-widest"
          />
        </div>
        <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100 shrink-0">
          {["all", "pending", "completed"].map((id) => (
            <button
              key={id}
              onClick={() => setStatusFilter(id)}
              className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === id ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-600'}`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-2xl shadow-emerald-900/5">
        <div className="overflow-x-auto overflow-hidden">
          <div className="min-w-[1000px]">
            <div className="grid gap-4 px-10 py-6 border-b border-gray-50 bg-gray-50/30 text-[9px] font-black text-gray-400 uppercase tracking-widest" style={{ gridTemplateColumns: tableColumns }}>
              <span>Identity</span>
              <span>Chef</span>
              <span>Audit Timeline</span>
              <span>Marks</span>
              {showAIScore && <span>Variance</span>}
              <span className="text-center">Status</span>
              <span></span>
            </div>

            <div className="divide-y divide-gray-50">
              {filteredExperiments.map(exp => {
                const isExpanded = expandedId === exp.id;
                const review = MOCK_REVIEW_DATA[exp.id];

                return (
                  <div key={exp.id} className="group">
                    <div
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      className={`grid gap-4 px-10 py-6 cursor-pointer hover:bg-emerald-50/10 transition-colors duration-500 items-center ${isExpanded ? 'bg-emerald-50/20' : ''}`}
                      style={{ gridTemplateColumns: tableColumns }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-emerald-600 transition-colors"><FileText size={16} /></div>
                        <div>
                          <div className="text-[14px] font-black text-gray-950 uppercase italic tracking-tighter leading-none mb-1">{exp.recipe}</div>
                          <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">{exp.id}</div>
                        </div>
                      </div>
                      <div className="text-[11px] font-black text-gray-700 uppercase">{exp.chef}</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 pt-0.5"><Calendar size={12} className="text-emerald-400" />{exp.date}</div>
                      <div className="text-[10px] font-black text-gray-400 italic pt-0.5">{exp.time}</div>
                      {showAIScore && (
                         <div className="pr-8">
                            {exp.status === "Completed" ? (
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-full"><div className="h-full bg-emerald-500" style={{ width: `${exp.aiScore}%` }} /></div>
                            ) : <span className="text-[9px] font-black text-gray-200 italic uppercase">SYNCING...</span>}
                         </div>
                      )}
                      <div className="flex justify-center"><StatusBadge status={exp.status} /></div>
                      <div className="flex justify-end"><div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isExpanded ? 'bg-gray-950 text-white rotate-180' : 'text-gray-200'}`}><ChevronDown size={18} /></div></div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="bg-gray-50/30 overflow-hidden">
                          <div className="px-10 py-12 space-y-10">
                            {review ? (
                              <>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                  {[
                                    { label: "Taste", val: review.sensoryScores.taste, icon: Utensils, bar: "bg-blue-500" },
                                    { label: "Aroma", val: review.sensoryScores.aroma, icon: Wind, bar: "bg-amber-500" },
                                    { label: "Visual", val: review.sensoryScores.visual, icon: Eye, bar: "bg-emerald-500" },
                                    { label: "Texture", val: review.sensoryScores.consistency, icon: Droplets, bar: "bg-orange-500" },
                                  ].map(s => (
                                    <div key={s.label} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-emerald-600"><s.icon size={18} /></div>
                                      <div className="flex-1">
                                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 opacity-60 italic">{s.label}</div>
                                        <div className="flex items-baseline gap-2">
                                          <div className="text-xl font-black italic tracking-tighter text-gray-950">{s.val}.0</div>
                                          <div className="flex-1 h-1.5 bg-gray-50 rounded-full overflow-hidden"><div className={`h-full ${s.bar}`} style={{ width: `${s.val * 10}%` }} /></div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                   <div className="space-y-6">
                                      <h4 className="text-[11px] font-black text-gray-950 uppercase tracking-[0.4em]">Audit Logs</h4>
                                      <div className="space-y-3">
                                         {STATIC_QUESTIONS.map(q => (
                                           <div key={q.id} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                              <span className="text-[11px] font-black text-gray-950 uppercase italic tracking-tight">{q.question}</span>
                                              <div className="shrink-0">{q.type === 'rating_stars' ? renderStars(review.answers[q.id]) : <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{review.answers[q.id]}</span>}</div>
                                           </div>
                                         ))}
                                      </div>
                                   </div>
                                   <div className="space-y-6">
                                      <h4 className="text-[11px] font-black text-gray-950 uppercase tracking-[0.4em]">Conclusion</h4>
                                      <div className="p-10 bg-gray-950 rounded-[2.5rem] border-2 border-emerald-950">
                                         <p className="text-lg font-black italic text-emerald-50 leading-relaxed uppercase tracking-tight border-l-4 border-emerald-600 pl-6">“ {review.remarks} ”</p>
                                      </div>
                                   </div>
                                </div>
                              </>
                            ) : <div className="py-20 text-center opacity-30 italic font-black uppercase tracking-[0.3em]">Awaiting Archival Validation...</div>}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
