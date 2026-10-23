import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import Img from './Img.jsx';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  onExploreProducts,
}) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemList = cart
      .map((item, i) => `${i + 1}. ${item.name} (${item.size}) x${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`)
      .join('%0A');
    const msg = `Hello Skylark Lifecare and Sciences,%0A%0AI would like to place an order:%0A${itemList}%0A%0ATotal Amount: ₹${subtotal.toFixed(2)}%0A%0APlease confirm availability and shipping details.`;
    window.open(`https://wa.me/918059053151?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-gold" />
              <h2 className="text-base font-bold text-ink">Your Cart</h2>
              <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-gold">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-none p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-ink transition-colors"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-none bg-neutral-100 text-neutral-400 mb-4">
                  <ShoppingBag size={30} />
                </div>
                <h3 className="text-base font-bold text-ink">Your cart is empty</h3>
                <p className="mt-1 text-xs text-neutral-500 max-w-[220px]">
                  Looks like you haven't added any pet wellness essentials yet.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    if (onExploreProducts) onExploreProducts();
                  }}
                  className="mt-6 flex items-center gap-2 rounded-none bg-ink px-5 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition-colors"
                >
                  Start Shopping <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-none border border-neutral-200 bg-neutral-50 p-1.5">
                      <Img
                        src={item.img}
                        alt={item.name}
                        className="h-full w-full object-contain"
                        placeholder="bg-neutral-100"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-ink line-clamp-1">{item.name}</h4>
                          <p className="text-[10px] text-neutral-500">{item.size} • {item.category}</p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Qty controls */}
                        <div className="flex items-center rounded-none border border-neutral-200 bg-neutral-50">
                          <button
                            onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                            className="h-7 w-7 text-neutral-600 hover:bg-neutral-200 rounded-none grid place-items-center"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-ink">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                            className="h-7 w-7 text-neutral-600 hover:bg-neutral-200 rounded-none grid place-items-center"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-ink">
                          ₹ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-neutral-200 bg-neutral-50 p-6">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink">₹ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Taxes</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-neutral-200 pt-2 flex justify-between text-sm font-bold text-ink">
                  <span>Total Amount</span>
                  <span className="text-base text-gold">₹ {subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-neutral-500 justify-center">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>100% Secure Checkout & Guaranteed Pet-Safe Products</span>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-none bg-emerald-600 text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
                >
                  Order via WhatsApp Instant <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    if (onCheckout) onCheckout();
                  }}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-none bg-ink text-xs font-bold text-white hover:bg-neutral-800 transition-colors"
                >
                  Proceed to Direct Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
