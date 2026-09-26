import React, { useState } from 'react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [showFitGuide, setShowFitGuide] = useState(false);

  if (!product) return null;

  const handleDeploy = () => {
    onAddToCart(product, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[105] backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Product Image */}
        <div className="relative h-72 md:h-full min-h-[360px] bg-[#e2e2e2]">
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-black text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            LAB SERIES
          </span>
        </div>

        {/* Right Side: Product Configuration */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#006687] block">
                  {product.categoryLabel}
                </span>
                <h3 className="text-[22px] font-bold tracking-tight uppercase text-black mt-1">
                  {product.title}
                </h3>
                <p className="text-[18px] font-bold text-black mt-2">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-[13px] leading-relaxed text-[#3d484f] my-4">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase">
                <span className="text-black">Select Architecture Size</span>
                <button
                  type="button"
                  onClick={() => setShowFitGuide(!showFitGuide)}
                  className="text-[#6d7980] underline hover:text-black transition-colors cursor-pointer"
                >
                  Fit Protocol
                </button>
              </div>

              {showFitGuide && (
                <div className="p-3 bg-[#f3f3f3] rounded-xl text-xs text-[#3d484f] space-y-1 animate-in fade-in">
                  <p className="font-semibold text-black">Precision Athletic Fit:</p>
                  <p>True to size for zero-drag sprinting. For relaxed streetwear layering, order one size up.</p>
                </div>
              )}

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    type="button"
                    className={`py-2 text-[12px] font-semibold rounded-xl transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-black text-white shadow'
                        : 'bg-[#eeeeee] text-black hover:bg-black/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <button
              onClick={handleDeploy}
              className="w-full py-3.5 rounded-full bg-[#0db5ed] text-black font-semibold text-[13px] uppercase tracking-tight hover:bg-black hover:text-white transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              type="button"
            >
              <span>DEPLOY TO CART</span>
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
