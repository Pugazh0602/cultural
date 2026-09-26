import React, { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenMembership: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenMembership,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'shop', label: 'SHOP' },
    { id: 'athletes', label: 'ATHLETES' },
    { id: 'events', label: 'EVENTS' },
    { id: 'community', label: 'COMMUNITY' },
    { id: 'journal', label: 'JOURNAL' },
    { id: 'about', label: 'ABOUT' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);

    // Smooth scroll to respective sections if on home
    const sectionMap: Record<string, string> = {
      shop: 'drops-section',
      athletes: 'athletes-section',
      events: 'events-section',
      community: 'community-section',
      journal: 'journal-section',
      about: 'about-section',
    };

    const targetEl = document.getElementById(sectionMap[id]);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3.5 pointer-events-none">
        <div className="h-14 w-full max-w-7xl bg-black rounded-full px-4 sm:px-6 flex items-center justify-between shadow-[0_12px_32px_rgba(2,72,105,0.2)] pointer-events-auto border border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick('shop')}
              className="flex items-center gap-1.5 focus:outline-none group text-left cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-[#0db5ed] fill-current transition-transform group-hover:scale-105"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.25 19.5 7 12 10.5zM2 17l10 5 10-5v-3.5L12 18.5 2 13.5V17z" />
              </svg>
              <span className="font-semibold text-[17px] tracking-tight text-white uppercase">
                Quantum<sup className="text-[#0db5ed] text-[11px] font-bold ml-0.5">2</sup>
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-[13px] font-medium tracking-tight uppercase transition-colors cursor-pointer ${
                  activeTab === link.id
                    ? 'text-white font-semibold'
                    : 'text-[#b8b8b8] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#b8b8b8] hover:text-white transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Quick Cart */}
            <button
              onClick={onOpenCart}
              aria-label="Quick Cart"
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#b8b8b8] hover:text-white transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-0.5 w-4 h-4 rounded-full bg-[#0db5ed] text-black text-[10px] font-bold flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* JOIN NOW CTA */}
            <button
              onClick={onOpenMembership}
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white text-black hover:bg-[#0db5ed] hover:text-black transition-colors text-[13px] font-semibold uppercase tracking-tight cursor-pointer"
              type="button"
            >
              JOIN NOW
            </button>

            {/* Person Profile Icon */}
            <button
              onClick={onOpenMembership}
              aria-label="Athlete Profile"
              className="w-8 h-8 rounded-full bg-[#006687] flex items-center justify-center hover:ring-2 hover:ring-[#0db5ed] transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="xl:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#b8b8b8] hover:text-white cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md pt-24 px-6 flex flex-col justify-between pb-10 xl:hidden">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-[20px] font-medium tracking-tight uppercase py-2 border-b border-white/10 ${
                  activeTab === link.id ? 'text-[#0db5ed]' : 'text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMembership();
              }}
              className="w-full py-3 rounded-full bg-[#0db5ed] text-black font-semibold text-[14px] uppercase tracking-tight text-center"
            >
              JOIN THE COLLECTIVE
            </button>
            <p className="text-center text-xs text-[#b8b8b8]">
              Quantum² Cohort 2025.2 · Sector Protocol
            </p>
          </div>
        </div>
      )}
    </>
  );
};
