import React, { useState } from "react";
import {
  Search,
  Filter,
  ChefHat,
  Clock,
  Star,
  ArrowRight,
  LayoutGrid,
  List,
  X,
  Shield,
  Activity,
  Zap,
} from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import { experiments } from "../../data/dummy";

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
    answers: {
      static_overall: "Excellent dish with rich, creamy texture and perfectly balanced spices. The butter chicken had a great depth of flavor.",
      static_satisfaction: 5,
      static_understanding: "yes",
      static_expectations: "yes",
      static_quality: 4,
    },
    remarks: "One of the best batches yet. Slight improvement in consistency recommended.",
    reviewedBy: "Sunita Rao",
    reviewedDate: "2024-12-15",
  },
};

const sensoryLabels = [
  { key: "taste", label: "Taste & Flavor" },
  { key: "aroma", label: "Aroma & Scent" },
  { key: "saltiness", label: "Saltiness" },
  { key: "visual", label: "Visual Appeal" },
  { key: "consistency", label: "Texture & Consistency" },
  { key: "spiciness", label: "Spiciness" },
  { key: "oiliness", label: "Oiliness" },
  { key: "freshness", label: "Freshness" },
  { key: "aftertaste", label: "Aftertaste" },
];

// ─── Modal Components ────────────────────────────────────────────────────────

const RecipeDetailModal = ({ recipe, onClose, showAiScore = true }) => {
  if (!recipe) return null;
  const ingredients = recipe.ingredients || [];
  const reviewData = MOCK_REVIEW_DATA[recipe.id] || {
    sensoryScores: { taste: 0, aroma: 0, saltiness: 0, visual: 0, consistency: 0 },
    reviewedBy: "Sanjay Dutt",
    reviewedDate: recipe.date,
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white"><ChefHat size={20} /></div>
             <div>
                <h3 className="text-xl font-black text-gray-950 italic uppercase tracking-tighter leading-none mb-1">{recipe.recipe}</h3>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">{recipe.id}</span>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X size={20} className="text-gray-400" /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2 opacity-60">Chef</span>
                 <span className="text-sm font-black text-gray-950 uppercase tracking-tight italic">{recipe.chef}</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2 opacity-60">Timeline</span>
                 <span className="text-sm font-black text-gray-950 uppercase tracking-tight italic">{recipe.date} @ {recipe.time}</span>
              </div>
           </div>

           <div className="space-y-4">
              <h4 className="text-[11px] font-black text-gray-950 uppercase tracking-[0.4em]">Ingredients Spectrum</h4>
              <div className="flex flex-wrap gap-2">
                 {ingredients.length > 0 ? ingredients.map((ing, idx) => (
                   <span key={`${ing.name}-${idx}`} className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100/50">{ing.name} ({ing.quantity}{ing.unit})</span>
                 )) : <span className="text-[10px] font-black text-gray-300 uppercase italic">Base formulation active</span>}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const VersionListModal = ({ baseName, versions, onClose, onSelect, canSelect }) => (
  <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 !space-y-0">
    <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm" onClick={onClose} />
    <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[80vh]">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
         <div>
            <h3 className="text-lg font-black text-gray-950 uppercase tracking-tighter italic leading-none mb-2">{baseName}</h3>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic opacity-60">Iterative Version History</span>
         </div>
         <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
         <div className="space-y-2">
            {versions.map((v, i) => (
              <div
                key={v.id}
                onClick={() => canSelect && onSelect(v)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 border-transparent transition-all ${canSelect ? 'cursor-pointer hover:bg-emerald-50 hover:border-emerald-100' : 'opacity-80'}`}
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400 shadow-inner">V{versions.length - i}</div>
                    <div>
                       <div className="text-sm font-black text-gray-950 uppercase italic tracking-tight">{v.id}</div>
                       <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{v.date}</div>
                    </div>
                 </div>
                 {canSelect && <ArrowRight size={16} className="text-gray-300" />}
              </div>
            ))}
         </div>
      </div>
    </div>
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AllRecipesPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const role = localStorage.getItem("ck_role") || "Manager";
  const canOpenVersionDetails = role === "Manager";
  const showAiScoreInDetails = role === "Manager";
  const itemsPerPage = 12;

  // Filter & Group Logic
  const filteredRecipes = experiments.filter(exp => {
    const matchesStatus = statusFilter === "all" || exp.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = exp.recipe.toLowerCase().includes(search.toLowerCase()) || exp.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getVersionsForRecipe = (recipeName) => experiments.filter(e => e.recipe === recipeName).sort((a,b) => new Date(b.date) - new Date(a.date));

  const groupedRecipes = Array.from(new Set(filteredRecipes.map(e => e.recipe))).map(name => {
    const recipeVersions = getVersionsForRecipe(name);
    return { baseName: name, latest: recipeVersions[0], versions: recipeVersions, status: recipeVersions[0].status };
  });

  const totalPages = Math.ceil(groupedRecipes.length / itemsPerPage);
  const pageItems = groupedRecipes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="animate-in fade-in duration-1000 p-2">
      <PageHeader
        title="All Recipes"
        subtitle="Manage and investigate the complete registry of sensory formulations."
        actions={[
          <button key="add" className="flex items-center gap-3 px-8 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/10 hover:scale-[1.03] transition-all">
            <Activity size={18} strokeWidth={3} />
            New Sequence
          </button>
        ]}
      />

      {/* Control Hub - Medium profile */}
      <div className="flex flex-col xl:flex-row gap-6 items-stretch xl:items-center bg-white/40 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-gray-100/50 shadow-2xl shadow-emerald-900/5">
        <div className="flex-1 relative group">
          <Search size={18} className="absolute left-6 text-gray-300 group-focus-within:text-emerald-500 transition-colors" strokeWidth={3} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH REGISTRY..."
            className="w-full pl-16 pr-8 py-4 bg-white rounded-2xl border-2 border-gray-100 text-[11px] font-black uppercase tracking-widest text-gray-950 outline-none focus:border-emerald-600 transition-all placeholder:text-gray-200 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100">
            {["all", "completed", "pending"].map(id => (
              <button
                key={id}
                onClick={() => setStatusFilter(id)}
                className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/10' : 'text-gray-400 hover:text-emerald-600'}`}
              >
                {id}
              </button>
            ))}
          </div>

          <div className="w-px h-8 bg-gray-100 mx-2" />

          <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100">
             <button onClick={() => setViewMode("grid")} className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-300 hover:text-emerald-600'}`}><LayoutGrid size={18} strokeWidth={3} /></button>
             <button onClick={() => setViewMode("table")} className={`p-3 rounded-xl transition-all ${viewMode === 'table' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-300 hover:text-emerald-600'}`}><List size={18} strokeWidth={3} /></button>
          </div>
        </div>
      </div>

      {/* Grid Stream */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pageItems.map((item, idx) => (
            <div
              key={item.baseName}
              style={{ animationDelay: `${idx * 50}ms` }}
              className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-emerald-600 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-700 flex flex-col shadow-sm relative animate-in fade-in slide-in-from-bottom-4"
            >
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] font-black tracking-widest text-gray-300 uppercase italic opacity-60">ID: {item.latest.id}</span>
                  <StatusBadge status={item.status} />
                </div>

                <h3 className="text-xl font-black mb-4 truncate group-hover:text-emerald-700 transition-colors text-gray-950 tracking-tighter uppercase italic leading-none">
                  {item.baseName}
                </h3>

                <div className="flex items-center gap-3 mb-6 bg-gray-50 p-2.5 rounded-2xl w-fit border border-gray-50/50 shadow-inner">
                  <div className="w-8 h-8 rounded-xl bg-gray-950 flex items-center justify-center text-[10px] font-black text-white shadow-xl transition-transform group-hover:rotate-6">
                    {item.latest.chef.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">
                    {item.latest.chef}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                   <div className="space-y-1">
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest opacity-60 italic">Timeline</span>
                      <div className="flex items-center gap-2 text-gray-950 font-black text-[11px] leading-none uppercase italic"><Clock size={12} className="text-emerald-500" strokeWidth={3} /> {item.latest.timing}M</div>
                   </div>
                   {item.latest.status === "Completed" && (
                      <div className="space-y-1">
                         <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest opacity-60 italic">Fidelity Index</span>
                         <div className="flex items-center gap-2 text-emerald-600 font-black text-[11px] leading-none uppercase italic"><Zap size={12} fill="currentColor" /> {item.latest.aiScore}%</div>
                      </div>
                   )}
                </div>
              </div>

              {/* Card Terminal Footer */}
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-50 bg-gray-50/50">
                 <div>
                    <span className="block text-[8px] uppercase tracking-widest font-black text-gray-400 opacity-60 italic mb-0.5">Last Sequence</span>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">{item.latest.date}</span>
                 </div>
                 <button
                  onClick={() => setSelectedBase({ name: item.baseName, versions: getVersionsForRecipe(item.baseName) })}
                  className="p-3 bg-white border border-gray-100 text-gray-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 rounded-xl transition-all shadow-sm active:scale-90"
                 >
                   <ArrowRight size={16} strokeWidth={3} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table Stream */}
      {viewMode === "table" && (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/5 animate-in fade-in duration-500">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  {["Identity", "Formulation", "Chef", "Process", "Fidelity", "Timeline", "Actions"].map(h => (
                    <th key={h} className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 italic">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pageItems.map((item) => (
                  <tr key={item.baseName} className="group hover:bg-emerald-50/20 transition-all duration-500 items-center">
                    <td className="px-8 py-5 text-[10px] font-black text-emerald-600/50 group-hover:text-emerald-600 transition-colors tracking-widest italic">{item.latest.id}</td>
                    <td className="px-8 py-5">
                       <div className="text-[13px] font-black text-gray-950 uppercase italic tracking-tighter leading-none group-hover:text-emerald-700 transition-colors">{item.baseName}</div>
                       <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest whitespace-nowrap italic opacity-60">Sequence Ver. {item.versions.length}</span>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[9px] font-black text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">{item.latest.chef.split(" ").map(n => n[0]).join("")}</div>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">{item.latest.chef}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-[11px] font-black text-gray-950 italic">{item.latest.timing}M</td>
                    <td className="px-8 py-5">
                       {item.latest.status === "Completed" ? (
                         <div className="flex items-center gap-2 text-emerald-600 font-black text-[11px] italic"><Zap size={14} fill="currentColor" /> {item.latest.aiScore}%</div>
                       ) : <StatusBadge status={item.latest.status} />}
                    </td>
                    <td className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-tight">{item.latest.date}</td>
                    <td className="px-8 py-5">
                       <button
                         onClick={() => setSelectedBase({ name: item.baseName, versions: getVersionsForRecipe(item.baseName) })}
                         className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:bg-gray-950 hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
                       >
                         <ArrowRight size={16} strokeWidth={3} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {groupedRecipes.length === 0 && (
        <div className="py-40 text-center animate-in fade-in slide-in-from-top-4">
           <div className="w-20 h-20 bg-gray-50 border border-gray-100 text-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse shadow-inner">
              <ChefHat size={40} strokeWidth={1} />
           </div>
           <h3 className="text-xl font-black text-gray-950 uppercase tracking-tighter italic">Zero Molecular Hits</h3>
           <p className="max-w-xs mt-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-loose opacity-60 mx-auto">Neural query parameters returned no formulations matching the current protocol search.</p>
        </div>
      )}

      {/* Nav Controls */}
      {groupedRecipes.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-8 pb-12">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-8 py-3 rounded-2xl bg-white border border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm transition-all ${page === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-emerald-600 hover:text-emerald-600 active:scale-95'}`}
          >
            Previous
          </button>
          <div className="px-6 py-3 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
            <span className="text-emerald-600">{page}</span> / {totalPages}
          </div>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`px-8 py-3 rounded-2xl bg-white border border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm transition-all ${page === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:border-emerald-600 hover:text-emerald-600 active:scale-95'}`}
          >
            Next
          </button>
        </div>
      )}

      {/* Modals Hook */}
      {selectedRecipe && <RecipeDetailModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} showAiScore={showAiScoreInDetails} />}
      {selectedBase && <VersionListModal baseName={selectedBase.name} versions={selectedBase.versions} onClose={() => setSelectedBase(null)} onSelect={(v) => canOpenVersionDetails && setSelectedVersion(v)} canSelect={canOpenVersionDetails} />}
      {selectedVersion && <RecipeDetailModal recipe={selectedVersion} onClose={() => setSelectedVersion(null)} showAiScore={showAiScoreInDetails} />}
    </div>
  );
}
