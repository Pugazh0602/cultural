import React from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', visible }) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[120] pointer-events-none transition-all duration-300 transform flex items-center gap-2.5 px-5 py-3 bg-black text-white rounded-full shadow-2xl border border-white/10 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <span className="material-symbols-outlined text-[#0db5ed] text-[20px]">{icon}</span>
      <span className="text-[13px] font-medium tracking-tight text-white">{message}</span>
    </div>
  );
};
