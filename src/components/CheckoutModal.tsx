import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: 'Kaelen Frost',
    email: 'kaelen.frost@quantum.lab',
    address: '742 Cyber Parkway, Suite 109',
    city: 'San Francisco',
    zip: '94107',
    cardNumber: '4242 •••• •••• 4242',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    onOrderCompleted();
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-[115] backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start border-b border-[#ededed] pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#006687] block">
              ENCRYPTED DISPATCH TERMINAL
            </span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-black mt-1">
              {step === 'details' ? 'Kinetic Checkout' : 'Dispatch Order Confirmed'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Order Summary Capsule */}
            <div className="p-3.5 bg-[#f3f3f3] rounded-2xl flex justify-between items-center text-xs">
              <span className="text-[#3d484f]">
                {items.length} product(s) in manifest
              </span>
              <span className="text-base font-bold text-black">
                Total: ${subtotal.toFixed(2)} USD
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-black mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-black mb-1">
                  Transmission Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-black mb-1">
                Dispatch Destination Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-black mb-1">
                  City / Node
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase text-black mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#f3f3f3] text-sm focus:outline-none focus:ring-2 focus:ring-[#0db5ed]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-black mb-1">
                Payment Method (Mock Encrypted Token)
              </label>
              <div className="p-3 bg-[#f3f3f3] rounded-xl flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#006687]">
                    credit_card
                  </span>
                  {formData.cardNumber}
                </span>
                <span className="text-[#2A9A30] font-bold text-[10px] uppercase">
                  Encrypted
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-black text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#0db5ed] hover:text-black transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>Authorize &amp; Dispatch · ${subtotal.toFixed(2)}</span>
                <span className="material-symbols-outlined text-[16px]">lock</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2A9A30] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h4 className="text-lg font-bold uppercase text-black">
              Manifest In Flight
            </h4>
            <p className="text-xs text-[#3d484f] max-w-sm mx-auto leading-relaxed">
              Your gear manifest has been approved and assigned tracking code{' '}
              <span className="font-mono font-bold text-black">
                Q2-PKG-98214
              </span>
              . Global Express Courier dispatched with priority air routing.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-black text-white text-xs font-semibold uppercase hover:bg-[#0db5ed] hover:text-black transition-colors"
              >
                Return to Collective
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
