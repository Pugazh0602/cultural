import React, { useState } from 'react';
import { Product } from '../types';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemCreated: (product: Product) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onItemCreated,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'outerwear' | 'performance' | 'footwear' | 'limited'>('outerwear');
  const [categoryLabel, setCategoryLabel] = useState('OUTERWEAR LAB');
  const [price, setPrice] = useState<number>(175);
  const [badge, setBadge] = useState('PROTOTYPE');
  const [badgeType, setBadgeType] = useState<'core' | 'new' | 'limited' | 'experimental'>('experimental');
  const [image, setImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDRmF33on182Iq_FH54gJln5ZzXeqVhJPKH6MMVYN-SPWlbOkBaa_5m-nTItwaWpfbKkfJXixgnzBYMabVKBhVy9hwYQsFF7IyCFo3b6I5mwJKuubqAcijx20VjifOeo00RBIyVxwUW9gzTiyepk6ynoQJ0P5E9uVxMgjfmuPyxxpSuYQxVLM5xWSu9paQbNIOE8ijFO6XDX2T0lNEfcjHBGuxR5cJA03tYtfQurMgBE7sd9MmrQUnf');
  const [description, setDescription] = useState('Next-generation experimental garment engineered with multi-axis stretch and atmospheric thermal insulation.');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newProductPayload = {
      title,
      category,
      categoryLabel: categoryLabel || category.toUpperCase(),
      price: Number(price),
      badge,
      badgeType,
      image,
      alt: title,
      description,
      colors: ['#000000', '#0db5ed'],
      sizes: ['S', 'M', 'L', 'XL'],
    };

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductPayload),
      });

      const data = await response.json();
      if (data.success && data.item) {
        onItemCreated(data.item);
        onClose();
      } else {
        throw new Error(data.error || 'Failed to save item');
      }
    } catch (err) {
      console.error('Error adding item to database:', err);
      // Fallback local create if network error
      const localItem: Product = {
        ...newProductPayload,
        id: `prod-${Date.now()}`,
      };
      onItemCreated(localItem);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-[120] backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start border-b border-[#ededed] pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#006687] block">
              MONGODB LAB STORAGE
            </span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-black mt-1">
              Add Prototype Item
            </h3>
            <p className="text-xs text-[#6d7980]">
              Persists new garments &amp; footwear directly to MongoDB collection.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase text-black mb-1">
              Item Name / Model Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Quantum Thermal Apex Jacket"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-black mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setCategory(val);
                  setCategoryLabel(val === 'footwear' ? 'FOOTWEAR KINETICS' : val === 'performance' ? 'PERFORMANCE' : 'OUTERWEAR LAB');
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
              >
                <option value="outerwear">Outerwear</option>
                <option value="performance">Performance</option>
                <option value="footwear">Footwear</option>
                <option value="limited">Limited</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-black mb-1">
                Price (USD)
              </label>
              <input
                type="number"
                required
                min="1"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed] font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-black mb-1">
                Badge Text
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed] font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-black mb-1">
                Badge Style
              </label>
              <select
                value={badgeType}
                onChange={(e) => setBadgeType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
              >
                <option value="core">Core (Dark)</option>
                <option value="new">New (Teal)</option>
                <option value="limited">Limited (Electric Cyan)</option>
                <option value="experimental">Experimental (Light)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-black mb-1">
              Image URL
            </label>
            <input
              type="url"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed] font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-black mb-1">
              Architectural Description
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#f3f3f3] text-xs focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0db5ed] hover:text-black transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>{submitting ? 'Persisting to MongoDB...' : 'Save Item to MongoDB Database'}</span>
              <span className="material-symbols-outlined text-[16px]">database</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
