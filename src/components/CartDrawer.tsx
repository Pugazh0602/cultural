import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onProceedToCheckout,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-[95] backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] transform transition-transform duration-300 ease-out shadow-2xl flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#ededed]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[17px] tracking-tight text-black uppercase">
                KINETIC DISPATCH CART
              </span>
              <span className="w-6 h-6 rounded-full bg-[#0db5ed] text-black text-[12px] flex items-center justify-center font-bold">
                {totalItemsCount}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Cart"
              className="w-9 h-9 rounded-full bg-[#eeeeee] flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Complimentary Courier Tally */}
          <div className="p-3.5 bg-[#f3f3f3] rounded-xl my-4">
            <div className="flex justify-between items-center text-[11px] font-semibold uppercase mb-1.5">
              <span className="text-[#3d484f]">Tier 1 Complimentary Courier</span>
              <span className="text-[#00677e] font-bold">UNLOCKED</span>
            </div>
            <div className="w-full bg-[#e2e2e2] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#0db5ed] h-full w-full transition-all duration-500" />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {items.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <span className="material-symbols-outlined text-4xl text-[#6d7980]">
                  production_quantity_limits
                </span>
                <p className="text-[14px] font-medium text-black uppercase">
                  Your dispatch manifest is empty
                </p>
                <p className="text-xs text-[#6d7980]">
                  Explore Season 04 drops to equip technical gear.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2 rounded-full bg-black text-white text-xs uppercase font-semibold hover:bg-[#0db5ed] hover:text-black transition-colors"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.size}-${idx}`}
                  className="flex gap-3 p-3 rounded-xl bg-[#f3f3f3] items-center justify-between group"
                >
                  <div className="w-16 h-20 rounded-lg bg-[#e2e2e2] overflow-hidden flex-shrink-0 relative">
                    <img
                      src={item.product.image}
                      alt={item.product.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 px-1">
                    <h4 className="font-semibold text-[13px] text-black uppercase truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-[#6d7980]">
                      Size: {item.size} · Cyber Carbon
                    </p>
                    <span className="font-bold text-[13px] text-black mt-1 block">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(idx)}
                      aria-label="Remove item"
                      className="text-[#6d7980] hover:text-red-600 transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                    <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-full border border-black/5 shadow-xs">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="text-xs font-bold text-gray-500 hover:text-black px-0.5"
                      >
                        -
                      </button>
                      <span className="text-[11px] font-bold min-w-3 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="text-xs font-bold text-gray-500 hover:text-black px-0.5"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {items.length > 0 && (
            <div className="pt-4 space-y-2 mt-auto border-t border-[#ededed]">
              <div className="flex justify-between items-center text-[13px] text-[#3d484f]">
                <span>Subtotal</span>
                <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] text-[#3d484f]">
                <span>Global Express Transit</span>
                <span className="font-bold text-[#2A9A30] uppercase">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-[17px] font-bold text-black border-t border-[#f3f3f3]">
                <span className="uppercase">Estimated Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 mt-2 rounded-full bg-black text-white font-semibold text-[13px] uppercase tracking-tight hover:bg-[#0db5ed] hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                type="button"
              >
                <span>Initiate Secure Checkout</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
