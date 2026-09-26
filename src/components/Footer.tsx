import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSubscribe: (email: string) => void;
  onOpenMembership: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSubscribe,
  onOpenMembership,
}) => {
  const [email, setEmail] = useState('');
  const [policyModal, setPolicyModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
      setEmail('');
    }
  };

  return (
    <>
      <footer className="w-full bg-black text-[#b8b8b8] text-sm mt-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
            {/* Column 1 & 2: Brand & Newsletter */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-[#0db5ed] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.25 19.5 7 12 10.5zM2 17l10 5 10-5v-3.5L12 18.5 2 13.5V17z" />
                </svg>
                <span className="font-bold text-lg tracking-tight text-white uppercase">
                  Quantum<sup className="text-[#0db5ed] text-xs font-bold ml-0.5">2</sup> Collective
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#b8b8b8] max-w-sm">
                High-performance technical athletics engineered at the exact intersection of digital speed, luxury streetwear composure, and architectural utility.
              </p>
              <form onSubmit={handleSubscribe} className="flex items-center max-w-sm bg-white/10 rounded-full p-1 border border-white/10 focus-within:border-[#0db5ed]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your transmission mail"
                  className="w-full bg-transparent px-3 text-white text-xs focus:outline-none placeholder:text-gray-500 font-medium"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#0db5ed] text-black text-[11px] font-bold hover:bg-white transition-colors uppercase whitespace-nowrap cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>

            {/* Column 3: Collection */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-tight text-white block">
                Collection
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('drops-section')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Outerwear Lab
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('drops-section')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Performance Tights
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('drops-section')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Footwear Kinetics
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('drops-section')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Accessories &amp; Packs
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Ecosystem */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-tight text-white block">
                Ecosystem
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('athletes-section')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Athlete Roster
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('events-section')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Field Trials &amp; Events
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('community-section')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Community Hub
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('journal-section')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Editorial Journal
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 5: Protocol */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-tight text-white block">
                Protocol
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('about-section')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Manifesto &amp; About
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenMembership}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Quantum Card Membership
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('warranty')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Warranty &amp; Repairs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('privacy')}
                    className="hover:text-[#0db5ed] transition-colors cursor-pointer text-left"
                  >
                    Privacy &amp; Governance
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Legal */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#b8b8b8]">
            <p>© 2025 Quantum² Collective Inc. All engineering rights reserved.</p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setPolicyModal('terms')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                TERMS
              </button>
              <button
                onClick={() => setPolicyModal('privacy')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                PRIVACY
              </button>
              <button
                onClick={() => setPolicyModal('security')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                SECURITY
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Quick Policy Modal */}
      {policyModal && (
        <div className="fixed inset-0 bg-black/75 z-[130] backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 text-black">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-bold uppercase tracking-tight">
                {policyModal.toUpperCase()} PROTOCOL
              </h4>
              <button
                onClick={() => setPolicyModal(null)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#3d484f] leading-relaxed">
              All Quantum² gear includes a 2-year kinetic tear warranty and lifetime ultrasonic seam replacement. User telemetry gathered via the Quantum app remains end-to-end encrypted on sovereign client nodes.
            </p>
            <button
              onClick={() => setPolicyModal(null)}
              className="w-full py-2.5 rounded-full bg-black text-white text-xs font-semibold uppercase hover:bg-[#0db5ed] hover:text-black transition-colors"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </>
  );
};
