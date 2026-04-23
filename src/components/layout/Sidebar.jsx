import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ChefHat,
  ShieldCheck,
  Brain,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  ChevronRight,
  Users,
  ScrollText,
  X,
} from "lucide-react";

import { Type } from "lucide-react";

const navItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    roles: ["Manager", "Chef", "Reviewer", "CRA"],
  },
  {
    to: "/all-recipes",
    label: "All Recipes",
    icon: <ChefHat size={18} />,
    roles: ["Chef", "Manager", "CRA"],
  },
  {
    to: "/reviews",
    label: "Submit Feedbacks",
    icon: <ShieldCheck size={18} />,
    roles: ["Manager", "Reviewer"],
  },
  {
    to: "/ai",
    label: "AI Analysis",
    icon: <Brain size={18} />,
    roles: ["Manager", "CRA"],
  },
  {
    to: "/quality-builder",
    label: "Question Builder",
    icon: <Type size={18} />,
    roles: ["Manager"],
  },
  {
    to: "/role-management",
    label: "Role Management",
    icon: <Users size={18} />,
    roles: ["Manager"],
  },
  {
    to: "/cra",
    label: " Audit Logs",
    icon: <FileText size={18} />,
    roles: ["CRA", "Manager"],
  },
  {
    to: "/recipes",
    label: "Recipes",
    icon: <ChefHat size={18} />,
    roles: ["Chef"],
  },
  {
    to: "/quality",
    label: "Review Recipe",
    icon: <ShieldCheck size={18} />,
    roles: ["Reviewer"],
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  onLogout,
}) {
  const location = useLocation();
  const role = localStorage.getItem("ck_role");
  const isChef = role === "Chef";
  const filteredItems = navItems.filter((item) => item.roles?.includes(role));

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[110] bg-gray-900/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-[120] h-screen bg-white border-r border-gray-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col overflow-hidden shadow-[20px_0_60px_-15px_rgba(0,0,0,0.03)] ${
          collapsed ? "md:w-20" : "md:w-[260px]"
        } ${isMobileOpen ? "w-[280px] translate-x-0" : "w-[280px] md:translate-x-0 -translate-x-full"}`}
      >
        {/* Brand Section */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50/80 bg-gradient-to-br from-gray-50/40 via-white to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="flex items-center gap-3.5 group cursor-pointer relative z-10">
            <div className="w-10 h-10 min-w-[40px] bg-emerald-600 rounded-2xl flex items-center justify-center  shadow-emerald-200 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
              <ChefHat size={22} className="text-white relative z-10" />
            </div>

            {!collapsed && (
              <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-500">
                <span className="text-sm font-black text-gray-900 tracking-tighter uppercase leading-none">
                  Sweet <span className="text-emerald-600">Factory</span>
                </span>
                <span className="text-[9px] font-black text-gray-400 mt-1 uppercase tracking-[0.2em] opacity-70">
                  Production Hub
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation section */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto custom-scrollbar relative">
          {!collapsed && (
            <p className="px-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 opacity-50">
              Operations List
            </p>
          )}

          {filteredItems.map((item, index) => {
            const isActive = location.pathname === item.to;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive: linkActive }) => `
                flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 group relative
                ${
                  linkActive
                    ? "bg-emerald-600 text-white  shadow-emerald-200 scale-[1.02]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
                style={{
                  transitionDelay: `${index * 30}ms`,
                }}
              >
                <div
                  className={`transition-all duration-500 ${isActive ? "scale-110 rotate-3" : "group-hover:scale-110 group-hover:-rotate-3"}`}
                >
                  {item.icon}
                </div>

                {!collapsed && (
                  <span className="text-[13px] font-bold tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500">
                    {item.to === "/recipes" && isChef
                      ? "New Experiment"
                      : item.label}
                  </span>
                )}

                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                )}

                {collapsed && isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-600 rounded-l-full" />
                )}

                {!isActive && !collapsed && (
                  <div className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <ChevronRight size={12} className="text-gray-400" />
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout / User profile stub */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex flex-col gap-3">
          {!collapsed && !isChef && (
            <div className="px-4 py-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm mb-2 group cursor-pointer hover:border-emerald-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-600">
                MG
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[11px] font-black text-gray-900 truncate uppercase tracking-tighter">
                  Kitchen Manager
                </span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  Active Shift
                </span>
              </div>
            </div>
          )}

          <button
            onClick={onLogout}
            className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300 font-bold text-[13px] ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div
              className={`transition-transform duration-300 ${collapsed ? "" : "group-hover:-translate-x-1"}`}
            >
              <LogOut size={18} />
            </div>
            {!collapsed && <span>System Exit</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
