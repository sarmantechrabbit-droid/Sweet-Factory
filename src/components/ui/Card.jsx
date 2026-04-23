import React from "react";

export default function Card({ children, className = "", noPad = false }) {
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
        ${noPad ? "p-0" : "p-6 md:p-8"} 
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
