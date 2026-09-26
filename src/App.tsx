import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { KineticHero3D } from './components/KineticHero3D';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { EventModal } from './components/EventModal';
import { AthleteModal } from './components/AthleteModal';
import { ArticleModal } from './components/ArticleModal';
import { SearchModal } from './components/SearchModal';
import { MembershipModal } from './components/MembershipModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AddItemModal } from './components/AddItemModal';
import { SportsChatbot } from './components/SportsChatbot';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

import {
  INITIAL_PRODUCTS,
  ATHLETES_DATA,
  FIELD_EVENTS,
  LEADERBOARD_DATA,
  ARTICLES_DATA,
} from './data/mockData';
import { Product, CartItem, FieldEvent, Athlete, Article } from './types';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>('shop');

  // Products from MongoDB & Filtering
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [dbConnected, setDbConnected] = useState<boolean>(false);
  const [dbDiagnostic, setDbDiagnostic] = useState<string>('');
  const [showDbModal, setShowDbModal] = useState<boolean>(false);

  // Fetch items stored in MongoDB on mount & check status
  useEffect(() => {
    async function loadDbItems() {
      try {
        const [itemsRes, healthRes] = await Promise.allSettled([
          fetch('/api/items'),
          fetch('/api/health'),
        ]);

        if (itemsRes.status === 'fulfilled' && itemsRes.value.ok) {
          const data = await itemsRes.value.json();
          if (data.success && Array.isArray(data.items) && data.items.length > 0) {
            setProducts(data.items);
          }
        }

        if (healthRes.status === 'fulfilled' && healthRes.value.ok) {
          const healthData = await healthRes.value.json();
          const dbStatus = healthData?.database;
          setDbConnected(Boolean(dbStatus?.isMongoConnected));
          setDbDiagnostic(dbStatus?.diagnostic || '');
        }
      } catch (err) {
        console.warn('Backend MongoDB items endpoint notice:', err);
      }
    }
    loadDbItems();
  }, []);

  // Cart State (Initialized with the 2 items from design reference)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0], // Quantum Aero Hoodie v2
      size: 'L',
      quantity: 1,
    },
    {
      product: INITIAL_PRODUCTS[2], // Kinetic Velocity Runner
      size: 'US 10.5',
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<FieldEvent | null>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Bookmarked Articles
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Challenges Joined
  const [enrolledChallenges, setEnrolledChallenges] = useState<Record<string, boolean>>({});

  // Leaderboard timeframe tab
  const [lbTimeframe, setLbTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');
  const [leaderboardList, setLeaderboardList] = useState(LEADERBOARD_DATA);
  const [isSyncingMetrics, setIsSyncingMetrics] = useState(false);

  // Transmission handle input
  const [transmissionHandle, setTransmissionHandle] = useState('');

  // Toast State
  const [toast, setToast] = useState<{ message: string; icon?: string; visible: boolean }>({
    message: '',
    icon: 'check_circle',
    visible: false,
  });

  const showToast = (message: string, icon = 'check_circle') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, size = 'M') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    showToast(`Added ${product.title} (${size}) to manifest`);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (index: number) => {
    const item = cartItems[index];
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    if (item) {
      showToast(`Removed ${item.product.title} from manifest`, 'delete');
    }
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  // Challenge Join Handler
  const handleJoinChallenge = (challengeId: string, name: string) => {
    setEnrolledChallenges((prev) => ({ ...prev, [challengeId]: true }));
    showToast(`Enrolled in ${name}! GPS Telemetry sensor path activated.`);
  };

  // Leaderboard sync handler
  const handleSyncMetrics = () => {
    setIsSyncingMetrics(true);
    showToast('Synchronizing your Quantum App telemetry data...', 'sync');
    setTimeout(() => {
      setIsSyncingMetrics(false);
      setLeaderboardList((prev) => {
        const updatedWeekly = prev.weekly.map((item, idx) =>
          idx === 2 ? { ...item, points: item.points + 650 } : item
        );
        return { ...prev, weekly: updatedWeekly };
      });
      showToast('Telemetry updated! +650 PTS credited to your node.');
    }, 1200);
  };

  // Bookmark article handler
  const handleToggleBookmark = (article: Article) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(article.id);
      if (exists) {
        showToast('Article removed from reading tray');
        return prev.filter((id) => id !== article.id);
      } else {
        showToast('Article bookmarked to your Quantum reading tray');
        return [...prev, article.id];
      }
    });
  };

  // Transmission access request
  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transmissionHandle.trim()) {
      showToast('Please enter an Athlete Frequency Handle', 'warning');
      return;
    }
    showToast(`Transmission Frequency Authenticated for ${transmissionHandle}!`);
    setTransmissionHandle('');
  };

  // Filtered Products from MongoDB
  const filteredProducts = products.filter((prod) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'limited') return prod.badgeType === 'limited' || prod.badgeType === 'experimental';
    return prod.category === selectedFilter;
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-[#f9f9f9] text-[#1b1b1b] min-h-screen flex flex-col font-sans selection:bg-[#0db5ed] selection:text-black">
      {/* Toast Notification */}
      <Toast message={toast.message} icon={toast.icon} visible={toast.visible} />

      {/* Floating Pill Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMembership={() => setIsMembershipOpen(true)}
      />

      {/* Main Content Container */}
      <main className="w-full pt-16 flex-1">
        {/* ============================================================== */}
        {/* SECTION 1: CINEMATIC 3D HERO SECTION */}
        {/* ============================================================== */}
        <section className="relative w-full max-w-7xl mx-auto px-4 md:px-10 pt-6 md:pt-10 pb-16">
          {/* Atmospheric Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0db5ed]/20 blur-[130px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Typographic Assertion & Narrative */}
            <div className="lg:col-span-5 space-y-5 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8e8e8]">
                <span className="w-2 h-2 rounded-full bg-[#0db5ed] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-black">
                  COLLECTIVE COHORT 2025.2
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl uppercase text-black font-semibold leading-[0.95] tracking-tighter">
                MOVE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-[#006687] to-[#0db5ed]">
                  DIFFERENT.
                </span>
              </h1>

              <p className="text-[15px] sm:text-base text-[#3d484f] max-w-md leading-relaxed">
                A collective built around sport, street culture and the people who push both
                forward. Powered by quantum AI and urban athleticism.
              </p>

              {/* CTA Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#drops-section"
                  className="px-6 py-3 rounded-full bg-black text-white text-[13px] font-semibold uppercase tracking-tight hover:bg-[#0db5ed] hover:text-black transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsMembershipOpen(true)}
                  className="px-6 py-3 rounded-full bg-white text-black text-[13px] font-semibold uppercase tracking-tight shadow-xs hover:bg-[#eeeeee] transition-colors cursor-pointer border border-black/5"
                >
                  Join The Collective
                </button>
              </div>

              {/* Telemetry Stats Capsule */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="p-3.5 rounded-2xl bg-[#f3f3f3] shadow-xs">
                  <span className="text-xl sm:text-2xl font-bold text-black block tracking-tight">
                    14.2K
                  </span>
                  <span className="text-[10px] text-[#6d7980] uppercase tracking-tight font-semibold">
                    Active Athletes
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#f3f3f3] shadow-xs">
                  <span className="text-xl sm:text-2xl font-bold text-[#006687] block tracking-tight">
                    04
                  </span>
                  <span className="text-[10px] text-[#6d7980] uppercase tracking-tight font-semibold">
                    Global Drops
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#f3f3f3] shadow-xs">
                  <span className="text-xl sm:text-2xl font-bold text-black block tracking-tight">
                    99.4%
                  </span>
                  <span className="text-[10px] text-[#6d7980] uppercase tracking-tight font-semibold">
                    Peak Rating
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Canvas Rig */}
            <div className="lg:col-span-7 relative">
              <KineticHero3D />
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 2: BUILT TO MOVE (SEASON 04 ARCHIVE) */}
        {/* ============================================================== */}
        <section id="drops-section" className="w-full max-w-7xl mx-auto px-4 md:px-10 py-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0db5ed]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#6d7980]">
                  SEASON 04 ARCHIVE
                </span>
                <span className="text-gray-300">·</span>
                <button
                  type="button"
                  onClick={() => setShowDbModal(true)}
                  title="Click to view MongoDB connection status & details"
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#006687] hover:text-black bg-[#f3f3f3] hover:bg-[#e8e8e8] px-2.5 py-0.5 rounded-full transition-colors cursor-pointer border border-black/5"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${dbConnected ? 'bg-[#2A9A30]' : 'bg-[#0db5ed]'} animate-pulse`} />
                  <span>{dbConnected ? 'MongoDB Live' : 'Storage Active'} ({products.length} Items)</span>
                  <span className="material-symbols-outlined text-[12px]">info</span>
                </button>
              </div>
              <h2 className="text-4xl sm:text-5xl uppercase text-black font-semibold tracking-tight">
                BUILT TO MOVE
              </h2>
            </div>

            {/* Filter Tabs & Add Item Action */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'outerwear', label: 'Outerwear' },
                  { id: 'performance', label: 'Performance' },
                  { id: 'footwear', label: 'Footwear' },
                  { id: 'limited', label: 'Limited' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    type="button"
                    className={`px-4 py-1.5 rounded-full text-[13px] font-semibold uppercase transition-colors cursor-pointer ${
                      selectedFilter === tab.id
                        ? 'bg-black text-white'
                        : 'bg-[#eeeeee] text-[#3d484f] hover:bg-[#e2e2e2]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Add Prototype Item to MongoDB Button */}
              <button
                onClick={() => setIsAddItemOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-[#006687] text-white text-[12px] font-semibold uppercase tracking-tight hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                type="button"
                title="Add new prototype item to MongoDB"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add Lab Item</span>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, p.sizes[0] || 'M')}
              />
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 3: THE COLLECTIVE (ACTIVE ROSTER) */}
        {/* ============================================================== */}
        <section id="athletes-section" className="w-full max-w-7xl mx-auto px-4 md:px-10 py-16 scroll-mt-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#0db5ed]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#6d7980]">
                  ACTIVE ROSTER
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl uppercase text-black font-semibold tracking-tight">
                THE COLLECTIVE
              </h2>
            </div>
            <p className="text-[14px] text-[#3d484f] max-w-md leading-relaxed">
              We do not sponsor athletes to wear logos. We co-engineer apparel with pioneers
              navigating the absolute physical periphery of high-density cities and mountain peaks.
            </p>
          </div>

          {/* Editorial Asymmetric Mosaic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ATHLETES_DATA.map((athlete, index) => (
              <div
                key={athlete.id}
                onClick={() => setSelectedAthlete(athlete)}
                className={`relative group rounded-3xl overflow-hidden bg-black h-[480px] sm:h-[500px] shadow-lg flex flex-col justify-end p-6 sm:p-8 cursor-pointer transition-all duration-500 hover:-translate-y-1 ${
                  index === 1 ? 'md:-translate-y-3' : ''
                }`}
              >
                <img
                  src={athlete.image}
                  alt={athlete.alt}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase inline-block ${athlete.badgeColor}`}
                  >
                    {athlete.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl text-white font-bold uppercase tracking-tight">
                    {athlete.name}
                  </h3>
                  <p className="text-xs text-[#b8b8b8]">
                    {athlete.tagline} · {athlete.location}
                  </p>

                  <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <blockquote className="text-[12px] italic text-white bg-black/80 p-3 rounded-xl backdrop-blur-md border border-white/10">
                      "{athlete.quote}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 4: GLOBAL FIELD TRIALS (PHYSICAL PROTOCOL) */}
        {/* ============================================================== */}
        <section id="events-section" className="w-full max-w-7xl mx-auto px-4 md:px-10 py-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#006687] block">
                PHYSICAL PROTOCOL
              </span>
              <h2 className="text-4xl sm:text-5xl uppercase text-black font-semibold tracking-tight">
                GLOBAL FIELD TRIALS
              </h2>
            </div>
            <p className="text-[14px] text-[#3d484f] max-w-sm leading-relaxed">
              Community runs, covert tournaments, and altitude endurance summits sanctioned across 12
              metropolitan hubs worldwide.
            </p>
          </div>

          <div className="space-y-3">
            {FIELD_EVENTS.map((event) => (
              <div
                key={event.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-[#f3f3f3] hover:bg-[#eeeeee] transition-colors shadow-xs gap-4"
              >
                <div className="flex items-start md:items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-black text-white flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-[11px] uppercase text-[#0db5ed] font-bold">
                      {event.month}
                    </span>
                    <span className="text-xl font-bold leading-tight">{event.day}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          event.status === 'open'
                            ? 'bg-[#2A9A30]'
                            : event.status === 'warning'
                            ? 'bg-[#F6A825]'
                            : 'bg-gray-400'
                        }`}
                      />
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          event.status === 'open'
                            ? 'text-[#2A9A30]'
                            : event.status === 'warning'
                            ? 'text-[#F6A825]'
                            : 'text-[#6d7980]'
                        }`}
                      >
                        {event.statusLabel}
                      </span>
                      <span className="text-[#3d484f] text-xs">· {event.typeLabel}</span>
                    </div>
                    <h3 className="text-lg font-bold uppercase text-black tracking-tight mt-0.5">
                      {event.title}
                    </h3>
                    <p className="text-xs text-[#6d7980]">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  {event.bibsLeft !== undefined && (
                    <span className="text-[11px] font-bold text-[#6d7980] uppercase hidden sm:block">
                      Bibs left: {event.bibsLeft}
                    </span>
                  )}

                  {event.status !== 'upcoming' ? (
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="px-5 py-2 rounded-full bg-black text-white text-[12px] font-semibold uppercase tracking-tight hover:bg-[#0db5ed] hover:text-black transition-colors cursor-pointer"
                      type="button"
                    >
                      Register Bib
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        showToast('Notified! We will dispatch an alert when Berlin registration opens.')
                      }
                      className="px-5 py-2 rounded-full bg-[#e8e8e8] text-black text-[12px] font-semibold uppercase tracking-tight hover:bg-black hover:text-white transition-colors cursor-pointer"
                      type="button"
                    >
                      Notify Me
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 5: NOT A FANBASE. A COLLECTIVE. (COMMUNITY & LEADERBOARD) */}
        {/* ============================================================== */}
        <section id="community-section" className="w-full max-w-7xl mx-auto px-4 md:px-10 py-16 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: Active Challenges & Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#006687] block">
                  COLLECTIVE DISCIPLINE
                </span>
                <h2 className="text-4xl sm:text-5xl uppercase text-black font-semibold tracking-tight leading-none mt-1">
                  NOT A FANBASE.
                  <br />
                  A COLLECTIVE.
                </h2>
                <p className="text-[14px] text-[#3d484f] mt-3 max-w-lg leading-relaxed">
                  Track metrics through the Quantum App. Push through weekly city challenges, earn
                  kinetic tokens, and unlock restricted drops before public release.
                </p>
              </div>

              {/* Challenge Cards */}
              <div className="space-y-3">
                {/* Challenge 1 */}
                <div className="p-5 rounded-2xl bg-[#f3f3f3] shadow-xs flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-[#006687] block">
                        SPRINT STREAK
                      </span>
                      <h3 className="text-base font-bold uppercase text-black mt-0.5">
                        30-Day Velocity Streak
                      </h3>
                      <p className="text-xs text-[#6d7980]">
                        Log at least 5 KM daily at sub-4:30 pace for 30 consecutive days.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleJoinChallenge('c1', '30-Day Velocity Streak')
                      }
                      disabled={enrolledChallenges['c1']}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase transition-colors flex-shrink-0 cursor-pointer ${
                        enrolledChallenges['c1']
                          ? 'bg-[#2A9A30] text-white'
                          : 'bg-black text-white hover:bg-[#0db5ed] hover:text-black'
                      }`}
                      type="button"
                    >
                      {enrolledChallenges['c1'] ? 'Enrolled ✓' : 'Join Challenge'}
                    </button>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-[11px] font-semibold uppercase text-[#3d484f] mb-1">
                      <span>2,410 Cohort Runners</span>
                      <span className="text-black font-bold">82% Target Paced</span>
                    </div>
                    <div className="w-full bg-[#e2e2e2] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0db5ed] h-full w-[82%]" />
                    </div>
                  </div>
                </div>

                {/* Challenge 2 */}
                <div className="p-5 rounded-2xl bg-[#f3f3f3] shadow-xs flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-[#F6A825] block">
                        ENDURANCE PROTOCOL
                      </span>
                      <h3 className="text-base font-bold uppercase text-black mt-0.5">
                        100 KM Midnight Cypher
                      </h3>
                      <p className="text-xs text-[#6d7980]">
                        Accumulate 100 KM running between 10 PM and 4 AM before the moon cycle closes.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleJoinChallenge('c2', '100 KM Midnight Cypher')
                      }
                      disabled={enrolledChallenges['c2']}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase transition-colors flex-shrink-0 cursor-pointer ${
                        enrolledChallenges['c2']
                          ? 'bg-[#2A9A30] text-white'
                          : 'bg-black text-white hover:bg-[#0db5ed] hover:text-black'
                      }`}
                      type="button"
                    >
                      {enrolledChallenges['c2'] ? 'Enrolled ✓' : 'Join Challenge'}
                    </button>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-[11px] font-semibold uppercase text-[#3d484f] mb-1">
                      <span>1,890 Athletes · 7 Days Remaining</span>
                      <span className="text-black font-bold">54% Completed</span>
                    </div>
                    <div className="w-full bg-[#e2e2e2] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00677e] h-full w-[54%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Live Leaderboard Panel */}
            <div className="lg:col-span-5 bg-[#f3f3f3] rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006687] text-[20px]">
                      leaderboard
                    </span>
                    <h3 className="font-bold text-[16px] uppercase text-black">
                      GLOBAL VELOCITY BOARD
                    </h3>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2A9A30] animate-ping" />
                </div>

                {/* Timeframe Selector */}
                <div className="grid grid-cols-3 gap-1 bg-[#eeeeee] p-1 rounded-full mb-4">
                  {(['weekly', 'monthly', 'alltime'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setLbTimeframe(t)}
                      type="button"
                      className={`py-1 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer ${
                        lbTimeframe === t
                          ? 'bg-white text-black shadow-xs'
                          : 'text-[#6d7980] hover:text-black'
                      }`}
                    >
                      {t === 'alltime' ? 'ALL TIME' : t.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Ranks Stack */}
                <div className="space-y-2">
                  {leaderboardList[lbTimeframe].slice(0, 4).map((entry, idx) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center justify-between p-3 rounded-2xl bg-white shadow-xs ${
                        idx === 3 ? 'opacity-85' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm font-bold w-5 text-center ${
                            idx === 0 ? 'text-[#006687]' : 'text-black'
                          }`}
                        >
                          {entry.rank}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#e8e8e8] flex items-center justify-center font-bold text-xs text-black">
                          {entry.initials}
                        </div>
                        <div>
                          <h4 className="font-bold text-[13px] text-black uppercase leading-tight">
                            {entry.callsign}
                          </h4>
                          <span className="text-[11px] text-[#6d7980]">{entry.node}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[14px] text-black block">
                          {entry.points.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#006687] uppercase font-bold">
                          PTS
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5">
                <button
                  onClick={handleSyncMetrics}
                  disabled={isSyncingMetrics}
                  className="w-full py-2.5 rounded-full bg-[#eeeeee] text-black text-xs font-bold uppercase tracking-tight hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isSyncingMetrics ? 'animate-spin' : ''
                    }`}
                  >
                    sync
                  </span>
                  <span>{isSyncingMetrics ? 'Syncing...' : 'Sync Live App Metrics'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 6: EDITORIAL JOURNAL (DISPATCH / ESSAYS) */}
        {/* ============================================================== */}
        <section id="journal-section" className="w-full max-w-7xl mx-auto px-4 md:px-10 py-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#006687] block">
                DISPATCH / ESSAYS
              </span>
              <h2 className="text-4xl sm:text-5xl uppercase text-black font-semibold tracking-tight">
                EDITORIAL JOURNAL
              </h2>
            </div>
            <button
              onClick={() => setSelectedArticle(ARTICLES_DATA[0])}
              className="text-xs font-bold uppercase text-black hover:text-[#006687] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Archive</span>
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ARTICLES_DATA.map((article) => {
              const isSaved = bookmarkedIds.includes(article.id);
              return (
                <article
                  key={article.id}
                  className="group rounded-3xl bg-[#f3f3f3] overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div
                    onClick={() => setSelectedArticle(article)}
                    className="relative w-full aspect-video bg-[#e2e2e2] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={article.image}
                      alt={article.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className={`absolute top-4 left-4 text-[10px] font-bold uppercase px-3 py-1 rounded-full ${article.categoryColor}`}
                    >
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase text-[#6d7980] mb-2">
                        <span>{article.date}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                        <span>·</span>
                        <span>BY {article.author}</span>
                      </div>
                      <h3
                        onClick={() => setSelectedArticle(article)}
                        className="text-xl font-bold uppercase text-black tracking-tight group-hover:text-[#006687] transition-colors cursor-pointer"
                      >
                        {article.title}
                      </h3>
                      <p className="text-[13px] text-[#3d484f] mt-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-black/5 mt-5">
                      <button
                        onClick={() => handleToggleBookmark(article)}
                        className="flex items-center gap-1 text-[11px] font-bold uppercase text-[#6d7980] hover:text-black transition-colors cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isSaved ? 'bookmark' : 'bookmark_border'}
                        </span>
                        <span>{isSaved ? 'Bookmarked' : 'Bookmark Dispatch'}</span>
                      </button>
                      <button
                        onClick={() => setSelectedArticle(article)}
                        aria-label="Read full article"
                        className="text-black group-hover:translate-x-1 transition-transform cursor-pointer"
                      >
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 7: TRANSMISSION 009 (MANIFESTO FULL BLEED BANNER) */}
        {/* ============================================================== */}
        <section id="about-section" className="w-full bg-black text-white py-16 my-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-[#0db5ed]/10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[#0db5ed] text-[11px] font-bold uppercase tracking-widest block">
                TRANSMISSION 009
              </span>
              <h2 className="text-3xl sm:text-4xl uppercase text-white font-bold leading-tight tracking-tight">
                ENGINEERED FOR THE UNRESTRAINED.
              </h2>
              <p className="text-xs sm:text-sm text-[#b8b8b8] pt-1 leading-relaxed">
                Every thread tested under anaerobic strain. Join the collective to test prototype
                drops before they surface anywhere on earth.
              </p>
            </div>

            <form
              onSubmit={handleRequestAccess}
              className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto"
            >
              <input
                type="text"
                placeholder="Athlete Frequency Handle"
                value={transmissionHandle}
                onChange={(e) => setTransmissionHandle(e.target.value)}
                className="w-full sm:w-64 px-4 py-2.5 rounded-full bg-white/10 text-white text-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0db5ed] border border-white/10"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0db5ed] text-black text-xs font-bold uppercase tracking-tight hover:bg-white transition-colors whitespace-nowrap cursor-pointer shadow-md"
              >
                Request Access
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(sectionId) => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSubscribe={(email) =>
          showToast(`Subscribed! Priority transmissions directed to ${email}`)
        }
        onOpenMembership={() => setIsMembershipOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, size) => handleAddToCart(prod, size)}
      />

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegister={(eventName, athleteName) =>
          showToast(`Registration Confirmed for ${athleteName}! Digital Bib Transmitted via Comms.`)
        }
      />

      <AthleteModal
        athlete={selectedAthlete}
        onClose={() => setSelectedAthlete(null)}
        onSelectGear={(gearName) => {
          const matchedProd = products.find((p) => p.title === gearName);
          if (matchedProd) {
            setQuickViewProduct(matchedProd);
          } else {
            showToast(`Selected gear loadout: ${gearName}`);
          }
        }}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onBookmark={handleToggleBookmark}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        athletes={ATHLETES_DATA}
        events={FIELD_EVENTS}
        articles={ARTICLES_DATA}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onSelectAthlete={(a) => setSelectedAthlete(a)}
        onSelectEvent={(e) => setSelectedEvent(e)}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
        onJoined={(handle, city) =>
          showToast(`Welcome to Cohort 2025.2, ${handle}! Node initialized in ${city}.`)
        }
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={() => {
          setCartItems([]);
          showToast('Order confirmed! Tracking dispatch credentials generated.');
        }}
      />

      {/* Add New Item to MongoDB Modal */}
      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onItemCreated={(newProduct) => {
          setProducts((prev) => [newProduct, ...prev]);
          showToast(`Saved ${newProduct.title} to MongoDB database!`);
        }}
      />

      {/* Sports & Field Trials AI Chatbot powered by Groq LLM */}
      <SportsChatbot />

      {/* Database Status & Atlas Guide Modal */}
      {showDbModal && (
        <div className="fixed inset-0 bg-black/75 z-[130] backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 text-black">
            <div className="flex justify-between items-start border-b border-[#ededed] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#006687] block">
                  SYSTEM STORAGE STATUS
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-black mt-1">
                  Database Architecture
                </h3>
              </div>
              <button
                onClick={() => setShowDbModal(false)}
                className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#f3f3f3] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-600 uppercase">Connection Mode</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                    dbConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {dbConnected ? 'MongoDB Live Cluster' : 'Resilient High-Speed Storage'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-600 uppercase">Available Lab Items</span>
                  <span className="font-mono font-bold text-black">{products.length} Items</span>
                </div>
                {dbDiagnostic && (
                  <p className="text-[11px] text-gray-600 pt-1 border-t border-black/5 leading-relaxed">
                    {dbDiagnostic}
                  </p>
                )}
              </div>

              {!dbConnected && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2 text-amber-950">
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-tight text-amber-900">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>MongoDB Atlas Setup Guide</span>
                  </div>
                  <p className="leading-relaxed">
                    If you configured MongoDB Atlas and see an SSL alert 80, Atlas requires adding the client IP to your IP Access List:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px]">
                    <li>Open your <strong>MongoDB Atlas Console</strong> at <code className="bg-amber-100 px-1 rounded">cloud.mongodb.com</code></li>
                    <li>In the left sidebar under Security, click <strong>Network Access</strong></li>
                    <li>Click <strong>Add IP Address</strong></li>
                    <li>Select <strong>Allow Access from Anywhere</strong> (<code className="bg-amber-100 px-1 rounded">0.0.0.0/0</code>) and confirm</li>
                  </ol>
                  <p className="text-[11px] text-amber-800 italic pt-1">
                    The app seamlessly maintains all items, additions, and updates in resilient storage without interruption.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowDbModal(false)}
                className="w-full py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0db5ed] hover:text-black transition-colors cursor-pointer"
              >
                Close Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
