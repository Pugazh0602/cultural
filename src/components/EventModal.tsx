import React, { useState } from 'react';
import { FieldEvent } from '../types';

interface EventModalProps {
  event: FieldEvent | null;
  onClose: () => void;
  onRegister: (eventName: string, athleteName: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  onClose,
  onRegister,
}) => {
  const [callsign, setCallsign] = useState('Kaelen Frost');
  const [comms, setComms] = useState('+1 (555) 019-2834');
  const [sectorNote, setSectorNote] = useState('Sector 07 Ground Crew');

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(event.title, callsign);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[105] backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#006687] block">
              DISPATCH DISCIPLINE TICKET
            </span>
            <h3 className="text-[20px] font-bold uppercase text-black mt-1">
              {event.title}
            </h3>
            <p className="text-[12px] text-[#3d484f] mt-0.5">{event.location}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold uppercase text-black mb-1">
              Athlete Callsign / Name
            </label>
            <input
              type="text"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f3f3] text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0db5ed] font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-black mb-1">
              Emergency Comms / Mobile
            </label>
            <input
              type="text"
              value={comms}
              onChange={(e) => setComms(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f3f3] text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0db5ed] font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-black mb-1">
              Pacing / Wave Sector
            </label>
            <input
              type="text"
              value={sectorNote}
              onChange={(e) => setSectorNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f3f3] text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0db5ed] font-medium"
            />
          </div>

          <div className="p-3.5 bg-[#f3f3f3] rounded-xl flex items-start gap-3 mt-2">
            <span className="material-symbols-outlined text-[#006687] text-[20px] mt-0.5">
              sensors
            </span>
            <p className="text-[11px] text-[#3d484f] leading-relaxed">
              Includes digital RFID timing bib and physical high-visibility reflective collective arm-sleeve dispatched at checkpoint zero.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-black text-white font-semibold text-[13px] uppercase hover:bg-[#0db5ed] hover:text-black transition-colors cursor-pointer shadow-md"
            >
              Confirm Credentials &amp; Issue Bib
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
