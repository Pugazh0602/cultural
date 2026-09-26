import React from 'react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onBookmark: (article: Article) => void;
  isBookmarked: boolean;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onBookmark,
  isBookmarked,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[105] backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#ededed] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${article.categoryColor}`}
            >
              {article.category}
            </span>
            <span className="text-xs text-[#6d7980]">
              {article.date} · {article.readTime} · BY {article.author}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookmark(article)}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked ? 'text-[#0db5ed]' : 'text-gray-500 hover:text-black'
              }`}
              title="Bookmark article"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-black tracking-tight leading-tight">
            {article.title}
          </h2>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#e2e2e2]">
            <img
              src={article.image}
              alt={article.alt}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-base font-medium text-black leading-relaxed border-l-2 border-[#0db5ed] pl-4 italic">
            {article.excerpt}
          </p>

          <div className="space-y-4 text-[15px] leading-relaxed text-[#3d484f]">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-[#ededed] flex justify-between items-center text-xs text-[#6d7980]">
            <span>Quantum² Editorial Collective · Dispatch No. {article.id}</span>
            <button
              onClick={() => onBookmark(article)}
              className="flex items-center gap-1 font-semibold text-black uppercase hover:text-[#006687]"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isBookmarked ? 'check' : 'bookmark_border'}
              </span>
              <span>{isBookmarked ? 'Saved to reading tray' : 'Save to tray'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
