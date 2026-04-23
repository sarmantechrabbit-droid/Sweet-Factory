import React from 'react';

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 group animate-in slide-in-from-top-4 duration-700">
      <div className="relative">
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[11px] sm:text-xs font-black text-gray-400 max-w-xl leading-relaxed uppercase tracking-widest opacity-60">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap gap-3 items-center shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
