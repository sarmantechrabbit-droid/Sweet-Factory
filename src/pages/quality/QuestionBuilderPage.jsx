import { useState, useEffect } from "react";
import {
  AlignLeft,
  Activity,
  Calendar,
  ChevronDown,
  ChevronUp,
  Circle,
  CheckSquare,
  Download,
  Edit3,
  FileJson,
  GripVertical,
  Hash,
  ImageIcon,
  LayoutGrid,
  List,
  ListOrdered,
  Plus,
  Save,
  Smile,
  ThumbsUp,
  Trash2,
  Type,
  XCircle,
  Zap,
  CheckCircle,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";

// ─── Constants ───────────────────────────────────────────────────────────────

const QUESTION_TYPES = [
  { id: "rating_stars", label: "⭐ Star Rating", icon: "★" },
  { id: "nps", label: "🔢 NPS Scale (0-10)", icon: <Hash size={14} /> },
  { id: "slider", label: "🎚️ Slider", icon: <Zap size={14} /> },
  { id: "single_choice", label: "🔘 Single Choice", icon: <Circle size={14} /> },
  { id: "multi_choice", label: "☑️ Multiple Choice", icon: <CheckSquare size={14} /> },
  { id: "long_text", label: "📝 Long Text", icon: <AlignLeft size={14} /> },
  { id: "short_text", label: "✍️ Short Text", icon: <Type size={14} /> },
  { id: "yes_no", label: "👍 Yes/No", icon: <ThumbsUp size={14} /> },
  { id: "emoji_reaction", label: "🎭 Emoji Reaction", icon: <Smile size={14} /> },
  { id: "date_picker", label: "📅 Date Picker", icon: <Calendar size={14} /> },
  { id: "image_upload", label: "📸 Image Upload", icon: <ImageIcon size={14} /> },
  { id: "matrix", label: "📊 Matrix Table", icon: <LayoutGrid size={14} /> },
  { id: "ranking", label: "🔝 Ranking", icon: <ListOrdered size={14} /> },
];

// ─── Components ──────────────────────────────────────────────────────────────

const QuestionCard = ({
  question,
  isSelected,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const getIcon = (type) =>
    QUESTION_TYPES.find((t) => t.id === type)?.icon || "❓";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group relative p-6 lg:p-8 rounded-[2rem] border-2 transition-all duration-500 cursor-pointer ${
        isSelected
          ? "bg-white border-emerald-600 shadow-2xl shadow-emerald-900/10 scale-[1.02] z-10"
          : "bg-white/50 border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-xl group-hover:z-20"
      }`}
      onClick={() => onSelect(question)}
    >
      <div className="flex items-start gap-6">
        {/* Type Icon */}
        <div
          className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-inner transition-all duration-500 ${
            isSelected
              ? "bg-emerald-600 text-white rotate-3 scale-110"
              : "bg-gray-100 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500"
          }`}
        >
          {getIcon(question.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
             <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-emerald-600' : 'text-gray-300'}`}>NODE #{question.id?.substring(0, 4)}</span>
             <div className="w-1 h-1 rounded-full bg-gray-200" />
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60 italic">{question.type?.replace('_', ' ')}</span>
          </div>
          <h4 className={`text-xl font-black tracking-tighter leading-tight uppercase italic mb-6 group-hover:text-emerald-700 transition-colors ${isSelected ? 'text-emerald-800' : 'text-gray-900'}`}>
            {question.question}
          </h4>

          {/* Type-specific Previews */}
          <div className="mt-6 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
            {question.type === "rating_stars" && (
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="text-gray-200" />
                ))}
              </div>
            )}
            {(question.type === "single_choice" ||
              question.type === "multi_choice") && (
              <div className="flex flex-wrap gap-3">
                {question.options?.map((opt, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-[10px] font-black uppercase text-gray-400 tracking-widest"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
            {question.type === "yes_no" && (
              <div className="flex gap-3">
                <div className="px-6 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black border border-emerald-100 uppercase tracking-widest">
                  Validated
                </div>
                <div className="px-6 py-2 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black border border-rose-100 uppercase tracking-widest">
                  Variance
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Toolbar */}
        <div
          className={`flex flex-col gap-2 transition-all duration-500 ${
            isSelected ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(question.id);
            }}
            className="p-3 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
          >
            <Trash2 size={18} strokeWidth={2.5} />
          </button>
          {!isFirst && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp(question.id);
              }}
              className="p-3 text-gray-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
            >
              <ChevronUp size={18} strokeWidth={3} />
            </button>
          )}
          {!isLast && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown(question.id);
              }}
              className="p-3 text-gray-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
            >
              <ChevronDown size={18} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function QuestionBuilderPage() {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem("ck_questions");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "1",
            type: "rating_stars",
            question: "How would you rate the overall texture?",
            options: [],
          },
          {
            id: "2",
            type: "yes_no",
            question: "Was the salt level optimal?",
            options: [],
          },
          {
            id: "3",
            type: "single_choice",
            question: "Describe the primary flavor note",
            options: ["Earthy", "Floral", "Spicy", "Umami"],
          },
        ];
  });

  const [selectedId, setSelectedId] = useState(questions[0]?.id);
  const selected = questions.find((q) => q.id === selectedId);

  useEffect(() => {
    localStorage.setItem("ck_questions", JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (type) => {
    const newQ = {
      id: Date.now().toString(),
      type: type.id,
      question: `Define ${type.label} Inquiry...`,
      options: type.id.includes("choice") ? ["Option 01", "Option 02"] : [],
    };
    setQuestions([...questions, newQ]);
    setSelectedId(newQ.id);
  };

  const updateQuestion = (id, updates) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  };

  const deleteQuestion = (id) => {
    const remaining = questions.filter((q) => q.id !== id);
    setQuestions(remaining);
    if (selectedId === id) setSelectedId(remaining[0]?.id);
  };

  const move = (id, dir) => {
    const idx = questions.findIndex((q) => q.id === id);
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === questions.length - 1))
      return;
    const newQs = [...questions];
    [newQs[idx], newQs[idx + dir]] = [newQs[idx + dir], newQs[idx]];
    setQuestions(newQs);
  };

  return (
    <div className="animate-in fade-in duration-1000">
      <PageHeader
        title=" Question Builder"
        subtitle="Design high-fidelity sensory audit inquiry stacks for telemetry validation."
        actions={[
          <button
            key="save"
            className="flex items-center gap-3 px-8 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/10 hover:scale-[1.03] transition-all"
          >
            <Save size={18} strokeWidth={3} />
            Commit Stack
          </button>,
          <button
            key="export"
            className="flex items-center gap-3 px-8 py-3 bg-gray-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-700 transition-all"
          >
            <FileJson size={18} strokeWidth={3} />
            Export Schema
          </button>,
        ]}
      />

      <div className="flex flex-col xl:grid xl:grid-cols-[1fr,420px] gap-8 items-start">
        {/* Editor Terminal */}
        <div className="w-full xl:order-2 space-y-8 sticky top-24">
          <Card className="border-t-[10px] border-emerald-600 shadow-2xl">
            {selected ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between px-2">
                  <div>
                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2 leading-none">
                      Node Configuration
                    </div>
                    <h3 className="text-xl font-black text-gray-950 uppercase tracking-tighter italic">
                      Edit Inquiry
                    </h3>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
                    <Edit3 size={20} strokeWidth={3} />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2 italic">
                      Question nomenclature
                    </label>
                    <textarea
                      value={selected.question}
                      onChange={(e) =>
                        updateQuestion(selected.id, {
                          question: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full p-6 bg-gray-50 border-2 border-transparent focus:border-emerald-600 focus:bg-white rounded-[1.5rem] outline-none transition-all text-sm font-black text-gray-900 shadow-inner placeholder:text-gray-200"
                    />
                  </div>

                  {(selected.type.includes("choice") ||
                    selected.type === "ranking" ||
                    selected.type === "matrix") && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic leading-none">
                          Response Options
                        </label>
                        <button
                          onClick={() =>
                            updateQuestion(selected.id, {
                              options: [
                                ...selected.options,
                                `Option ${selected.options.length + 1}`,
                              ],
                            })
                          }
                          className="text-emerald-600 text-[10px] font-black uppercase tracking-widest hover:underline"
                        >
                          + Add Option
                        </button>
                      </div>
                      <div className="space-y-2">
                        {selected.options.map((opt, i) => (
                          <div key={i} className="flex gap-2 group/opt">
                            <input
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...selected.options];
                                newOpts[i] = e.target.value;
                                updateQuestion(selected.id, {
                                  options: newOpts,
                                });
                              }}
                              className="flex-1 p-4 bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:border-emerald-600 outline-none text-[12px] font-black text-gray-900 transition-all shadow-sm"
                            />
                            <button
                              onClick={() => {
                                const newOpts = selected.options.filter(
                                  (_, idx) => idx !== i,
                                );
                                updateQuestion(selected.id, {
                                  options: newOpts,
                                });
                              }}
                              className="p-3 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover/opt:opacity-100"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center space-y-6">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center mx-auto text-gray-200 animate-pulse">
                  <Edit3 size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-gray-950 uppercase tracking-tight">
                    NO NODE SELECTED
                  </h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60 italic">
                    SELECT AN INQUIRY TO MODIFY PROPERTY DATA
                  </p>
                </div>
              </div>
            )}
          </Card>

          <Card className="shadow-2xl">
            <div className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-6 px-2 italic">
              Inject New Protocol
            </div>
            <div className="grid grid-cols-2 gap-3">
              {QUESTION_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => addQuestion(type)}
                  className="flex flex-col items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-600/5 transition-all text-center group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-sm group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-12 transition-all">
                    {type.icon}
                  </div>
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none group-hover:text-emerald-700">
                    {type.label.split(" ").slice(1).join(" ")}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Protocol Stack List */}
        <div className="w-full xl:order-1 space-y-6">
          <div className="flex items-center justify-between px-8 mb-4 font-black uppercase tracking-[0.3em] text-[10px] italic">
            <div className="text-gray-400 flex items-center gap-4">
               <div className="w-8 h-[2px] bg-gray-100" />
               PROTOCOL STACK: <span className="text-emerald-600 ml-2">{questions.length} NODES LOGGED</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-600">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
               LIVE_EDIT_ACTIVE
            </div>
          </div>

          <div className="space-y-5">
            {questions.map((q, i) => (
              <QuestionCard
                key={q.id}
                question={q}
                isSelected={selectedId === q.id}
                onSelect={(q) => setSelectedId(q.id)}
                onDelete={deleteQuestion}
                onMoveUp={() => move(q.id, -1)}
                onMoveDown={() => move(q.id, 1)}
                isFirst={i === 0}
                isLast={i === questions.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
