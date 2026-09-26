import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const getBadgeStyle = (badgeType?: string) => {
    switch (badgeType) {
      case 'core':
        return 'bg-black text-white';
      case 'new':
        return 'bg-[#00677e] text-white';
      case 'limited':
        return 'bg-[#0db5ed] text-black font-bold';
      case 'experimental':
        return 'bg-[#e2e2e2] text-black';
      default:
        return 'bg-black text-white';
    }
  };

  return (
    <div className="product-item group flex flex-col rounded-2xl bg-[#f3f3f3] p-4 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Product Image Stage */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#e2e2e2] mb-3">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full ${getBadgeStyle(
              product.badgeType
            )}`}
          >
            {product.badge}
          </span>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2 bg-white text-black font-semibold text-[12px] uppercase rounded-full shadow hover:bg-[#0db5ed] transition-colors cursor-pointer"
            type="button"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#6d7980] uppercase mb-1">
            <span>{product.categoryLabel}</span>
            <span className="flex items-center gap-1">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full border border-black/10"
                  style={{ backgroundColor: c }}
                />
              ))}
            </span>
          </div>
          <h3 className="font-semibold text-[16px] text-black uppercase tracking-tight line-clamp-1">
            {product.title}
          </h3>
        </div>

        <div className="pt-3 flex items-center justify-between mt-auto">
          <span className="font-bold text-[16px] text-black">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.title} to cart`}
            className="w-9 h-9 rounded-full bg-black text-white hover:bg-[#0db5ed] hover:text-black transition-colors flex items-center justify-center cursor-pointer shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
