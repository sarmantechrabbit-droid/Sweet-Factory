import { X } from 'lucide-react';

export default function Modal({ title, children, onClose, width = 440 }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-10 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden"
        style={{ maxWidth: width }}
      >
        {/* Visual Decorator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-2xl bg-gray-50 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-95 border border-transparent hover:border-emerald-100"
        >
          <X size={16} strokeWidth={3} />
        </button>

        {title && (
          <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter italic">
            {title}
          </h2>
        )}
        
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

