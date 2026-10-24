import { ShoppingCart, Eye, Heart } from 'lucide-react';
import Img from './Img.jsx';
import Stars from './Stars.jsx';

export default function ProductCard({
  p,
  onAdd,
  onSelectProduct,
  isWishlisted = false,
  onToggleWishlist,
}) {
  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(p);
    }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAdd) {
      onAdd(p);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(p);
    }
  };

  const discount =
    p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : 0;

  return (
    <article
      onClick={handleCardClick}
      className="group relative flex flex-col items-center justify-between rounded-2xl bg-white p-3 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-neutral-100 cursor-pointer"
    >
      {/* Category Tag & View badge on hover */}
      <div className="w-full flex items-center justify-between mb-1">
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[9px] font-semibold text-neutral-600 uppercase tracking-wider">
          {p.category}
        </span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-gold flex items-center gap-1">
          <Eye size={12} /> View
        </span>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-50 p-2 grid place-items-center">
        <Img
          src={p.img}
          alt={p.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          placeholder="bg-neutral-100 rounded-lg"
        />

        {/* Discount Badge on Image */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 z-10 rounded-none bg-gold px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-white shadow-xs tracking-tight">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2 right-2 z-10 grid h-7 w-7 place-items-center rounded-none shadow-sm backdrop-blur-xs transition-all hover:scale-110 active:scale-90 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-500 border border-rose-200'
              : 'bg-white/90 text-neutral-400 hover:text-rose-500 border border-neutral-200/60'
          }`}
        >
          <Heart size={14} className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''} />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-3 flex w-full flex-1 flex-col items-center">
        <h3 className="line-clamp-2 min-h-[34px] text-xs font-bold leading-4 text-ink group-hover:text-gold transition-colors">
          {p.name}
        </h3>
        <p className="mt-1 text-[10px] font-medium text-neutral-500">{p.size}</p>

        {/* Price Section with Offer Price, MRP and Discount % */}
        <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-center">
          <span className="text-xs sm:text-sm font-bold text-ink">
            ₹ {p.price.toFixed(2)}
          </span>
          {p.originalPrice && p.originalPrice > p.price && (
            <span className="text-[10px] sm:text-[11px] text-neutral-400">
              MRP <span className="line-through">₹ {p.originalPrice.toFixed(2)}</span>
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 whitespace-nowrap">
              ({discount}% OFF)
            </span>
          )}
        </div>

        <div className="mt-1">
          <Stars size={11} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 w-full flex flex-col gap-1.5">
        <button
          type="button"
          onClick={handleAdd}
          className="flex h-8 w-full items-center justify-center gap-1.5 rounded-none bg-ink text-[10px] font-bold text-white shadow-sm hover:bg-neutral-800 active:scale-95 transition-all"
        >
          <ShoppingCart size={12} /> Add to Cart
        </button>
      </div>
    </article>
  );
}
