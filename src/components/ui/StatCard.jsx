import React from 'react';
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ icon, label, value, sub, trend, trendUp }) {
  return (
    <div className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 overflow-hidden animate-in fade-in zoom-in-95">
      {/* Visual Decorator */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10 transition-opacity duration-500 group-hover:opacity-20 ${trendUp ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all duration-500 shadow-inner">
          {React.cloneElement(icon, { size: 18, strokeWidth: 2.5 })}
        </div>
        
        {trend && (
          <div className="flex flex-col items-end">
             <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all duration-300 ${
               trendUp 
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                : "bg-rose-50 text-rose-600 border border-rose-100"
             }`}>
               {trendUp ? <TrendingUp size={10} strokeWidth={3} /> : <TrendingDown size={10} strokeWidth={3} />}
               {trend}
             </div>
          </div>
        )}
      </div>

      <div className="mt-6 relative z-10">
        <h3 className="text-2xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">
          {value}
        </h3>
        
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2 mb-3 group-hover:text-emerald-600 transition-colors">
          {label}
        </p>

        {sub && (
          <div className="h-px bg-gray-50 w-full mb-3 group-hover:bg-emerald-50 transition-colors" />
        )}
        
        {sub && (
          <p className="text-[10px] font-bold text-gray-500/80 leading-relaxed italic flex items-center gap-2 uppercase tracking-wide">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${trendUp ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
