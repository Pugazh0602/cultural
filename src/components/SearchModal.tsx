import React, { useState } from 'react';
import { Product, Athlete, FieldEvent, Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  athletes: Athlete[];
  events: FieldEvent[];
  articles: Article[];
  onSelectProduct: (product: Product) => void;
  onSelectAthlete: (athlete: Athlete) => void;
  onSelectEvent: (event: FieldEvent) => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  athletes,
  events,
  articles,
  onSelectProduct,
  onSelectAthlete,
  onSelectEvent,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredProducts = q
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    : products;

  const filteredAthletes = q
    ? athletes.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q)
      )
    : athletes;

  const filteredEvents = q
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.typeLabel.toLowerCase().includes(q)
      )
    : events;

  const filteredArticles = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    : articles;

  return (
    <div className="fixed inset-0 bg-black/70 z-[105] backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#ededed] flex items-center gap-3">
          <span className="material-symbols-outlined text-gray-400 text-[24px]">search</span>
          <input
            type="text"
            placeholder="Search drops, athletes, trials, dispatches..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-[16px] text-black placeholder:text-gray-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-black text-xs font-semibold uppercase"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors ml-2"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Quick Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setQuery('hoodie')}
              className="px-3 py-1 rounded-full bg-[#f3f3f3] hover:bg-black hover:text-white transition-colors"
            >
              Hoodies
            </button>
            <button
              onClick={() => setQuery('runner')}
              className="px-3 py-1 rounded-full bg-[#f3f3f3] hover:bg-black hover:text-white transition-colors"
            >
              Footwear
            </button>
            <button
              onClick={() => setQuery('night run')}
              className="px-3 py-1 rounded-full bg-[#f3f3f3] hover:bg-black hover:text-white transition-colors"
            >
              Night Runs
            </button>
            <button
              onClick={() => setQuery('maya')}
              className="px-3 py-1 rounded-full bg-[#f3f3f3] hover:bg-black hover:text-white transition-colors"
            >
              Maya Chen
            </button>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6d7980] block mb-2">
                Drops &amp; Products ({filteredProducts.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f3f3f3] transition-colors cursor-pointer"
                  >
                    <img
                      src={p.image}
                      alt={p.alt}
                      className="w-12 h-12 object-cover rounded-lg bg-[#e2e2e2]"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-black uppercase truncate">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-[#6d7980]">${p.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Athletes */}
          {filteredAthletes.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6d7980] block mb-2">
                The Collective Athletes ({filteredAthletes.length})
              </span>
              <div className="space-y-1.5">
                {filteredAthletes.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onSelectAthlete(a);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f3f3f3] transition-colors cursor-pointer"
                  >
                    <img
                      src={a.image}
                      alt={a.alt}
                      className="w-10 h-10 object-cover rounded-full bg-black"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-black uppercase">{a.name}</h4>
                      <p className="text-[11px] text-[#6d7980]">{a.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6d7980] block mb-2">
                Field Trials ({filteredEvents.length})
              </span>
              <div className="space-y-1.5">
                {filteredEvents.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => {
                      onSelectEvent(e);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f3f3f3] transition-colors cursor-pointer"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-black uppercase">{e.title}</h4>
                      <p className="text-[11px] text-[#6d7980]">{e.location}</p>
                    </div>
                    <span className="text-xs font-bold text-[#0db5ed] uppercase">
                      {e.month} {e.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dispatches */}
          {filteredArticles.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6d7980] block mb-2">
                Editorial Dispatches ({filteredArticles.length})
              </span>
              <div className="space-y-1.5">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-[#f3f3f3] transition-colors cursor-pointer"
                  >
                    <h4 className="text-xs font-bold text-black uppercase truncate">
                      {art.title}
                    </h4>
                    <p className="text-[11px] text-[#6d7980]">
                      {art.date} · {art.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
