import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChefHat,
  Lock,
  Mail,
  User,
  ShieldCheck,
  ChevronDown,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["Chef", "Reviewer", "Manager", "CRA"];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Manager");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Credentials required to establish connection.");
      return;
    }
    setError("");
    localStorage.setItem("ck_auth", "1");
    localStorage.setItem("ck_role", role);
    localStorage.setItem("ck_auth_email", email.trim());
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-[#FBFBFC] relative overflow-hidden font-figtree">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full -ml-24 -mb-24 blur-3xl opacity-50" />

      <div className="w-full max-w-[400px] relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="flex flex-col items-center mb-8 group cursor-default">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-600/10 group-hover:rotate-6 transition-all duration-700 relative overflow-hidden mb-4">
            <ChefHat
              size={28}
              strokeWidth={2.5}
              className="text-white relative z-10"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black text-gray-950 tracking-tighter uppercase leading-none italic">
              Sweet{" "}
              <span className="text-emerald-600 not-italic">Factory.</span>
            </h1>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2 opacity-60 italic">
              KITCHEN CONTROL HUB
            </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.06)] relative">
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-950 tracking-tighter uppercase italic mb-1 leading-none">
              IDENTITY <span className="text-emerald-600">SYNC.</span>
            </h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60">
              Establish secure archival connection.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1 italic">
                ACCESS VECTOR
              </label>
              <div className="relative group">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-600 transition-colors"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="COMMANDER@FACTORY.COM"
                  className="w-full py-3.5 pl-12 pr-4 bg-gray-50/50 border border-gray-100 rounded-xl text-xs font-black text-gray-950 uppercase tracking-widest outline-none focus:bg-white focus:border-emerald-600 focus:shadow-lg focus:shadow-emerald-600/5 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1 italic">
                SYSTEM CIPHER
              </label>
              <div className="relative group">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-600 transition-colors"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-3.5 pl-12 pr-4 bg-gray-50/50 border border-gray-100 rounded-xl text-xs font-black text-gray-950 uppercase tracking-widest outline-none focus:bg-white focus:border-emerald-600 focus:shadow-lg focus:shadow-emerald-600/5 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1 italic">
                AUTH NODE
              </label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full flex items-center justify-between py-3.5 px-5 bg-gray-50/50 border rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isDropdownOpen ? "border-emerald-600 bg-white ring-4 ring-emerald-600/5" : "border-gray-100"}`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span className="text-gray-950">{role}</span>
                </div>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-500 ${isDropdownOpen ? "rotate-180 text-emerald-600" : "text-gray-300"}`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    className="absolute z-20 top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl p-1 overflow-hidden"
                  >
                    {roles.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setRole(r);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${role === r ? "bg-emerald-600 text-white shadow-lg" : "hover:bg-emerald-50 text-gray-400 hover:text-emerald-600"}`}
                      >
                        {r}
                        {role === r && <Check size={14} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-rose-50 text-rose-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-rose-100/50 italic"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full mt-4 py-4 bg-gray-950 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-emerald-600 shadow-emerald-950/20 active:scale-[0.98] transition-all duration-700 relative overflow-hidden group/submit"
            >
              <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover/submit:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">INITIALIZE ACCESS</span>
            </button>
          </form>
        </div>
        <div className="mt-8 text-center">
          <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] italic opacity-40 leading-relaxed cursor-default hover:text-emerald-600 transition-colors">
            ESTABLISHING SECURE CONNECTION TO V.2024.12.LE
          </span>
        </div>
      </div>
    </div>
  );
}
