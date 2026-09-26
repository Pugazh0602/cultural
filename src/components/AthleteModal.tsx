import React from 'react';
import { Athlete } from '../types';

interface AthleteModalProps {
  athlete: Athlete | null;
  onClose: () => void;
  onSelectGear: (gearName: string) => void;
}

export const AthleteModal: React.FC<AthleteModalProps> = ({
  athlete,
  onClose,
  onSelectGear,
}) => {
  if (!athlete) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[105] backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 sm:h-72 bg-black">
          <img
            src={athlete.image}
            alt={athlete.alt}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="absolute bottom-5 left-6 right-6">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase inline-block mb-2 ${athlete.badgeColor}`}
            >
              {athlete.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
              {athlete.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              {athlete.tagline} · {athlete.location}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Quote */}
          <blockquote className="p-4 bg-[#f3f3f3] rounded-2xl italic text-[13px] text-black border-l-4 border-[#0db5ed]">
            "{athlete.quote}"
          </blockquote>

          {/* Bio */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#006687] mb-1">
              Field Background
            </h4>
            <p className="text-[14px] leading-relaxed text-[#3d484f]">{athlete.bio}</p>
          </div>

          {/* Stats Grid */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#006687] mb-2">
              Performance Telemetry
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {athlete.stats.map((s, idx) => (
                <div key={idx} className="p-3 bg-[#f3f3f3] rounded-xl text-center">
                  <span className="text-[16px] font-bold text-black block">
                    {s.value}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-[#6d7980]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Gear */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#006687] mb-2">
              Assigned Lab Gear Loadout
            </h4>
            <div className="flex flex-wrap gap-2">
              {athlete.featuredGear.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectGear(item);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-[#eeeeee] hover:bg-black hover:text-white transition-colors text-xs font-semibold uppercase tracking-tight cursor-pointer flex items-center gap-1.5"
                >
                  <span>{item}</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
