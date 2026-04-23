import Modal from "./Modal";
import { LogOut, ShieldAlert } from "lucide-react";

export default function LogoutModal({ onClose, onLogout }) {
  return (
    <Modal onClose={onClose} width={400}>
      <div className="text-center pt-2">
        <div className="w-20 h-20 bg-rose-50 border border-rose-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm group hover:scale-110 transition-transform duration-500">
          <LogOut
            size={32}
            className="text-rose-500 group-hover:rotate-12 transition-transform"
          />
        </div>

        <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic mb-3">
          Secure <span className="text-rose-600">Exit.</span>
        </h2>

        <p className="text-sm font-bold text-gray-400 leading-relaxed mb-10 px-4">
          Establishment sync will be terminated. Ensure all active experiments
          are indexed before session closure.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 px-6 rounded-2xl bg-gray-50 text-gray-600 font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100 active:scale-95"
          >
            Stay Synced
          </button>
          <button
            onClick={onLogout}
            className="flex-1 py-4 px-6 rounded-2xl bg-rose-600 text-white font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all  shadow-rose-200 active:scale-95"
          >
            Confirm Out
          </button>
        </div>
      </div>
    </Modal>
  );
}
