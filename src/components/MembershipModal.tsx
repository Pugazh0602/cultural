import React, { useState } from 'react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoined: (handle: string, city: string) => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  onClose,
  onJoined,
}) => {
  const [handle, setHandle] = useState('');
  const [city, setCity] = useState('Tokyo Sector 03');
  const [discipline, setDiscipline] = useState('Urban Sprint');
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardId, setCardId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `Q2-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    setCardId(generatedId);
    setIsSuccess(true);
    onJoined(handle || 'Ath_Ghost', city);
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-[110] backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-lg bg-black text-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 border border-white/10 relative overflow-hidden animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0db5ed]/15 blur-3xl pointer-events-none rounded-full" />

        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0db5ed] block">
              COHORT 2025.2 PROTOCOL
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">
              Quantum Card Membership
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Unlock prototype drops, sector trials, and kinetic token accumulation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-gray-300 mb-1">
                Athlete Callsign / Frequency Handle
              </label>
              <input
                type="text"
                placeholder="e.g. Ghost_Runner_99"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-gray-300 mb-1">
                  Primary Node
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
                >
                  <option value="Tokyo Sector 03" className="bg-neutral-900">Tokyo Sector 03</option>
                  <option value="Berlin Sector 09" className="bg-neutral-900">Berlin Sector 09</option>
                  <option value="NYC Grid North" className="bg-neutral-900">NYC Grid North</option>
                  <option value="Taipei Metro Node" className="bg-neutral-900">Taipei Metro Node</option>
                  <option value="London Old Docks" className="bg-neutral-900">London Old Docks</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-gray-300 mb-1">
                  Discipline Focus
                </label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
                >
                  <option value="Urban Sprint" className="bg-neutral-900">Urban Sprint</option>
                  <option value="Asphalt Streetball" className="bg-neutral-900">Asphalt Streetball</option>
                  <option value="High-Altitude Ultra" className="bg-neutral-900">High-Altitude Ultra</option>
                  <option value="Nocturnal 100K" className="bg-neutral-900">Nocturnal 100K</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-300 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <span className="material-symbols-outlined text-[16px] text-[#0db5ed]">verified</span>
                <span>Immediate Privileges Included:</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-gray-400">
                <li>Priority queue access to Season 04 restricted drops</li>
                <li>Live GPS sync connection to Global Velocity Board</li>
                <li>Complimentary express courier across all global shipments</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#0db5ed] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
            >
              Issue Digital Quantum Card
            </button>
          </form>
        ) : (
          <div className="space-y-5 relative z-10 text-center animate-in fade-in">
            {/* Visual Digital Member Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-[#0db5ed]/40 shadow-xl text-left space-y-4 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <svg className="w-5 h-5 text-[#0db5ed] fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.25 19.5 7 12 10.5zM2 17l10 5 10-5v-3.5L12 18.5 2 13.5V17z" />
                  </svg>
                  <span className="font-bold text-sm uppercase">Quantum² Pass</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0db5ed]/20 text-[#0db5ed]">
                  ACTIVE COHORT
                </span>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
                  Athlete Handle
                </span>
                <span className="text-xl font-bold uppercase text-white">{handle || 'ATH_GHOST'}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block">Node</span>
                  <span className="font-medium text-gray-200">{city}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block">RFID Token</span>
                  <span className="font-mono text-gray-200">{cardId}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#2A9A30] font-semibold flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Credentials successfully authenticated in the collective registry!
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-tight hover:bg-[#0db5ed] transition-colors"
            >
              Enter the Collective
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
