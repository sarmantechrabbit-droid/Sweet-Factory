import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
  RotateCcw,
  X,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Menu,
} from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

const recentSearches = [
  "Butter Chicken v3.2",
  "EXP-001 – Approved",
  "Quality Review Queue",
  "AI Variance Report",
];

export default function Navbar({ collapsed, setIsMobileOpen, onLogout }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);

  const userEmail =
    localStorage.getItem("ck_auth_email") || "admin@kitchen.com";
  const role = localStorage.getItem("ck_role") || "Manager";
  const username = userEmail.split("@")[0];
  const initials = username.slice(0, 2).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <header
        className={`fixed top-0 right-0 h-20 z-[99] bg-white/80 backdrop-blur-xl border-b border-gray-100/50 flex items-center px-4 md:px-10 gap-6 transition-all duration-300 left-0 ${
          collapsed ? "md:left-20" : "md:left-[260px]"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent opacity-50" />

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2.5 -ml-2 rounded-2xl text-gray-500 md:hidden hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-95 bg-white shadow-sm border border-gray-100"
        >
          <Menu size={22} strokeWidth={2.5} />
        </button>

        {/* Global Search Interface */}
        <div className="flex-1 max-w-lg relative group md:block hidden">
          <div
            className={`absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-0 transition duration-500 group-hover:opacity-10 ${focused ? "opacity-20" : ""}`}
          />
          <div className="relative">
            <Search
              size={18}
              strokeWidth={2.5}
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${focused ? "text-emerald-600 scale-110" : "text-gray-400 group-hover:text-gray-600"}`}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder="Search experiments, recipes or staff..."
              className={`w-full bg-gray-50/50 border border-gray-100/50 rounded-2xl py-3 pl-12 pr-4 text-[13px] font-medium text-gray-900 outline-none transition-all duration-500 placeholder:text-gray-400 ${
                focused
                  ? "bg-white ring-4 ring-emerald-600/5 border-emerald-200  shadow-emerald-600/5"
                  : "hover:bg-gray-100/50 hover:border-gray-200"
              }`}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X size={14} strokeWidth={3} />
              </button>
            )}
          </div>

          {/* Search Dropdown with Visual Polish */}
          {focused && (
            <div className="absolute top-[calc(100%+16px)] left-0 right-0 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 p-3 z-[200] animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex items-center justify-between px-4 py-3 mb-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Recently Analyzed
                </span>
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  HISTORY
                </span>
              </div>
              <div className="space-y-1">
                {recentSearches.map((s) => (
                  <div
                    key={s}
                    onClick={() => setSearch(s)}
                    className="px-4 py-3 rounded-2xl text-gray-700 text-[13px] font-bold cursor-pointer flex items-center gap-3.5 transition-all hover:bg-emerald-50/80 hover:text-emerald-700 group/item"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover/item:bg-white transition-colors">
                      <RotateCcw
                        size={14}
                        className="text-gray-400 group-hover/item:text-emerald-500"
                      />
                    </div>
                    <span className="flex-1">{s}</span>
                    <ChevronRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-emerald-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global Utilities */}
        <div className="ml-auto flex items-center gap-4 relative z-10">
          <div className="hidden lg:block">
            {/* <ThemeToggle /> */}
          </div>

          <button className="p-3 rounded-2xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100 border border-transparent transition-all relative group shadow-sm bg-white">
            <Bell
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white ring-2 ring-rose-500/20" />
          </button>

          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-2 hidden sm:block" />

          {/* User Profile Controller */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`flex items-center gap-3.5 p-1.5 pr-4 rounded-2xl transition-all duration-500 group border ${
                showDropdown
                  ? "bg-white border-emerald-100 shadow-lg shadow-emerald-600/5 ring-4 ring-emerald-600/5"
                  : "bg-white border-transparent hover:border-gray-100 shadow-sm"
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-emerald-200 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                  {initials}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
              </div>
              <div className="text-left hidden lg:block pr-2">
                <div className="text-[13px] font-black text-gray-900 leading-none group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
                  {username}
                </div>
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1.5 opacity-80">
                  {role}
                </div>
              </div>
              <ChevronDown
                size={14}
                strokeWidth={3}
                className={`text-gray-400 transition-all duration-500 ${
                  showDropdown ? "rotate-180 text-emerald-600" : "rotate-0"
                }`}
              />
            </button>

            {/* Profile Dropdown Redesign */}
            {showDropdown && (
              <div className="absolute right-0 top-[calc(100%+16px)] w-72 bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-6 duration-500">
                <div className="px-6 py-5 border-b border-gray-50 bg-gradient-to-b from-gray-50/30 to-white rounded-t-[2rem]">
                  <div className="flex items-center gap-3.5 mb-1">
                    <div className="text-sm font-black text-gray-900 capitalize tracking-tight">
                      {username}
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase rounded-md tracking-wider">
                      ONLINE
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-gray-400 truncate tracking-tight">
                    {userEmail}
                  </div>
                </div>
                <div className="p-3 space-y-1.5">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      setShowChangePassword(true);
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3 text-[13px] font-bold text-gray-600 hover:bg-emerald-50/80 hover:text-emerald-700 rounded-2xl transition-all group/btn"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:shadow-sm transition-all text-gray-400 group-hover/btn:text-emerald-500">
                      <Lock size={18} />
                    </div>
                    Password Lock
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3 text-[13px] font-bold text-rose-600 hover:bg-rose-50/80 rounded-2xl transition-all group/btn"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:shadow-sm transition-all text-rose-400 group-hover/btn:text-rose-500">
                      <LogOut size={18} />
                    </div>
                    Secure Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 w-full max-w-sm animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <LogOut size={28} className="text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Confirm Logout
              </h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Are you sure you want to sign out? You will need to login again
                to access your kitchen analytics.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    onLogout();
                    navigate("/login");
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-200 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </>
  );
}

function ChangePasswordModal({ onClose }) {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (form.newPass.length < 4) {
      setError("New password must be at least 4 characters.");
      return;
    }
    if (form.newPass !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSuccess(true);
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 w-full max-w-md animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Account Security
            </h3>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">
              Update credentials
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg
                className="w-10 h-10 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-bold text-gray-900">Success!</p>
            <p className="text-sm text-gray-500 mt-2">
              Your password has been updated safely.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={form.current}
                  onChange={(e) =>
                    setForm({ ...form, current: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-900 focus:ring-4 focus:ring-emerald-600/5 focus:border-emerald-600 focus:bg-white outline-none transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={form.newPass}
                  onChange={(e) =>
                    setForm({ ...form, newPass: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-900 focus:ring-4 focus:ring-emerald-600/5 focus:border-emerald-600 focus:bg-white outline-none transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-900 focus:ring-4 focus:ring-emerald-600/5 focus:border-emerald-600 focus:bg-white outline-none transition-all"
                required
              />
            </div>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-600 font-bold">
                {error}
              </div>
            )}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-100 transition-all"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
