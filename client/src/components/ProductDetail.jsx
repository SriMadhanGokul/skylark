import { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Check, Sparkles, Heart } from 'lucide-react';
import Img from './Img.jsx';
import Stars from './Stars.jsx';
import TrustIcon from './TrustIcon.jsx';
import { products, trust } from '../data/content.js';

export default function ProductDetail({
  product,
  onBack,
  onAddToCart,
  onSelectProduct,
  isWishlisted = false,
  onToggleWishlist,
}) {
  const [activeImage, setActiveImage] = useState(product?.images?.[0] || product?.img);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits');

  useEffect(() => {
    setActiveImage(product?.images?.[0] || product?.img);
    setQty(1);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, qty);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-16">
      {/* Breadcrumb & Navigation Bar */}
      <div className="border-b border-neutral-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 lg:px-8">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Products
          </button>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="hover:text-ink cursor-pointer" onClick={onBack}>Home</span>
            <span>/</span>
            <span className="text-neutral-600 font-medium">{product.category}</span>
            <span>/</span>
            <span className="text-ink font-semibold truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 pt-8 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 bg-white rounded-3xl p-6 lg:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-neutral-100">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-50 border border-neutral-200/80 p-4 grid place-items-center">
              <Img
                src={activeImage}
                alt={product.name}
                className="h-full w-full object-contain transition-all duration-300"
                placeholder="bg-neutral-100"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                  {discount}% OFF
                </span>
              )}
              <span className="absolute top-4 right-4 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                100% Pet Safe
              </span>
            </div>

            {/* Gallery Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div>
                <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  All Product Images ({product.images.length})
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {product.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all p-1 bg-neutral-50 ${
                        activeImage === imgUrl ? 'border-gold shadow-md scale-105' : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <Img
                        src={imgUrl}
                        alt={`${product.name} preview ${idx + 1}`}
                        className="h-full w-full object-contain rounded-lg"
                        placeholder="bg-neutral-100"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Purchase */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gold/15 px-3 py-0.5 text-[10px] font-bold tracking-wide text-gold uppercase">
                  {product.category}
                </span>
                <span className="text-[11px] text-neutral-400">•</span>
                <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <ShieldCheck size={14} /> In Stock & Ready to Ship
                </span>
              </div>

              <h1 className="mt-3 font-serif text-2xl lg:text-3xl font-bold text-ink leading-snug">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="mt-2 text-xs font-medium text-neutral-600 italic">
                  "{product.tagline}"
                </p>
              )}

              {/* Ratings and Reviews */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Stars size={14} />
                  <span className="ml-1 text-xs font-bold text-ink">{product.rating}</span>
                </div>
                <span className="text-neutral-300">|</span>
                <span className="text-xs text-neutral-500">{product.reviewsCount} verified pet parent reviews</span>
              </div>

              {/* Price & Size */}
              <div className="mt-5 flex flex-wrap items-baseline gap-3 rounded-2xl bg-[#faf6f0] p-4 border border-gold/20">
                <span className="text-3xl font-bold text-ink">₹ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-400 line-through">
                    ₹ {product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs font-semibold text-gold">
                  Inclusive of all taxes
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-[11px] font-medium text-neutral-600 uppercase">Volume:</span>
                  <span className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-ink border border-neutral-300">
                    {product.size}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-5">
                <p className="text-xs lg:text-[13px] leading-relaxed text-neutral-700">
                  {product.description}
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-2 border-y border-neutral-100 py-3 text-center">
                <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-neutral-800">
                  <TrustIcon name="leaf" size={18} /> No Paraben
                </div>
                <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-neutral-800">
                  <TrustIcon name="drop" size={18} /> No Sulphate
                </div>
                <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-neutral-800">
                  <TrustIcon name="flask" size={18} /> No Silicone
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-xl border border-neutral-300 bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="h-11 w-10 text-base font-bold text-neutral-600 hover:bg-neutral-100 transition-colors rounded-l-xl"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-ink">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="h-11 w-10 text-base font-bold text-neutral-600 hover:bg-neutral-100 transition-colors rounded-r-xl"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 min-w-[150px] flex h-11 items-center justify-center gap-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-ink text-white hover:bg-neutral-800 hover:shadow-lg active:scale-95'
                  }`}
                >
                  {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                  {added ? 'Added to Cart!' : 'Add to Cart'}
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWishlist && onToggleWishlist(product)}
                  className={`flex h-11 px-4 items-center gap-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isWishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-500 shadow-sm'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:text-rose-500'
                  }`}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={16} className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                </button>
              </div>
            </div>

            {/* Informational Tabs: Benefits / How to Use / Ingredients */}
            <div className="mt-8 border-t border-neutral-100 pt-6">
              <div className="flex gap-4 border-b border-neutral-200 pb-2">
                {[
                  ['benefits', 'Key Benefits'],
                  ['howToUse', 'How to Use'],
                  ['ingredients', 'Natural Actives'],
                ].map(([tabKey, tabLabel]) => (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`pb-2 text-xs font-bold transition-all relative ${
                      activeTab === tabKey
                        ? 'text-ink border-b-2 border-gold'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    {tabLabel}
                  </button>
                ))}
              </div>

              <div className="pt-4 text-xs">
                {activeTab === 'benefits' && (
                  <ul className="space-y-2">
                    {product.keyBenefits?.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-neutral-700">
                        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/20 text-gold mt-0.5">
                          <Check size={10} strokeWidth={3} />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'howToUse' && (
                  <ol className="space-y-2.5">
                    {product.howToUse?.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-700">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neutral-100 text-[10px] font-bold text-ink">
                          {i + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-2.5">
                    {product.ingredients?.map((ing, i) => (
                      <div key={i} className="rounded-lg bg-neutral-50 p-2.5">
                        <span className="font-bold text-ink block">{ing.name}</span>
                        <span className="text-neutral-600 text-[11px]">{ing.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full Image Gallery for this Product */}
        {product.images && product.images.length > 0 && (
          <div className="mt-12 rounded-3xl bg-white p-6 lg:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-4 mb-6">
              <div>
                <h2 className="font-serif text-xl lg:text-2xl font-bold text-ink">
                  Product Gallery & Visual Guides
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Explore all high-resolution infographics, ingredient breakdowns, and usage directions for {product.name}
                </p>
              </div>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
                {product.images.length} Images Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveImage(imgUrl);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`group relative overflow-hidden rounded-2xl border-2 p-3 bg-neutral-50 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                    activeImage === imgUrl ? 'border-gold shadow-md' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="aspect-square w-full overflow-hidden rounded-xl bg-white grid place-items-center">
                    <Img
                      src={imgUrl}
                      alt={`${product.name} image ${idx + 1}`}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      placeholder="bg-neutral-100"
                    />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-neutral-700">
                      Photo {idx + 1}
                    </span>
                    <span className="text-[10px] font-semibold text-gold group-hover:underline">
                      Click to Enlarge ↑
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="mt-14">
            <h3 className="section-title flex items-center gap-3">
              Explore More Essentials <i className="h-[2px] w-7 bg-gold" />
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="group cursor-pointer rounded-2xl bg-white p-4 text-center shadow-sm hover:shadow-md hover:scale-[1.02] transition-all border border-neutral-100"
                >
                  <Img src={p.img} alt={p.name} className="h-40 w-full object-contain mb-3" />
                  <h4 className="text-xs font-semibold text-ink line-clamp-2 min-h-[32px] group-hover:text-gold transition-colors">
                    {p.name}
                  </h4>
                  <p className="mt-1 text-[11px] font-bold text-ink">₹ {p.price.toFixed(2)}</p>
                  <button className="mt-2 text-[10px] font-bold text-gold group-hover:underline">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
