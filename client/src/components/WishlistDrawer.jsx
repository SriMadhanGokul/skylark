import { X, Trash2, Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import Img from './Img.jsx';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveItem,
  onAddToCart,
  onSelectProduct,
  onExploreProducts,
}) {
  if (!isOpen) return null;

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
              <Heart size={20} className="fill-rose-500 text-rose-500" />
              <h2 className="text-base font-bold text-ink">My Wishlist</h2>
              <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600 border border-rose-200">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-ink transition-colors"
              aria-label="Close wishlist"
            >
              <X size={18} />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {wishlist.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-rose-50 text-rose-400 mb-4">
                  <Heart size={30} />
                </div>
                <h3 className="text-base font-bold text-ink">Your wishlist is empty</h3>
                <p className="mt-1 text-xs text-neutral-500 max-w-[240px]">
                  Tap the heart icon on any product you love to save it to your wishlist.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    if (onExploreProducts) onExploreProducts();
                  }}
                  className="mt-6 flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition-colors"
                >
                  Explore Products <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div
                      onClick={() => {
                        onClose();
                        if (onSelectProduct) onSelectProduct(item);
                      }}
                      className="h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 p-1.5 hover:border-gold transition-colors"
                    >
                      <Img
                        src={item.img}
                        alt={item.name}
                        className="h-full w-full object-contain"
                        placeholder="bg-neutral-100"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div
                          onClick={() => {
                            onClose();
                            if (onSelectProduct) onSelectProduct(item);
                          }}
                          className="cursor-pointer"
                        >
                          <h4 className="text-xs font-bold text-ink line-clamp-1 hover:text-gold transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-neutral-500">{item.size} • {item.category}</p>
                          <p className="text-xs font-bold text-ink mt-1">₹ {item.price.toFixed(2)}</p>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item)}
                          className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                          aria-label="Remove from wishlist"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            onAddToCart(item);
                            onRemoveItem(item);
                          }}
                          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-ink text-[10px] font-bold text-white hover:bg-neutral-800 active:scale-95 transition-all"
                        >
                          <ShoppingCart size={12} /> Move to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="border-t border-neutral-200 bg-neutral-50 p-6">
              <button
                onClick={() => {
                  wishlist.forEach((item) => onAddToCart(item));
                  wishlist.forEach((item) => onRemoveItem(item));
                }}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-xs font-bold text-white shadow-md hover:bg-neutral-800 active:scale-95 transition-all"
              >
                <ShoppingCart size={15} /> Move All to Cart
              </button>
              <button
                onClick={onClose}
                className="mt-2 flex h-9 w-full items-center justify-center text-xs font-semibold text-neutral-600 hover:text-ink transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
