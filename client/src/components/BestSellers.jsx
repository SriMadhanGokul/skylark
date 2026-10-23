import ProductCard from './ProductCard.jsx';
import TrustIcon from './TrustIcon.jsx';
import { products, trust } from '../data/content.js';

export default function BestSellers({
  query,
  onAdd,
  onSelectProduct,
  onViewAllProducts,
  wishlistIds = [],
  onToggleWishlist,
}) {
  const list = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section id="products" className="mx-auto max-w-[900px] xl:max-w-[1280px] px-4 lg:px-6 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="section-title flex items-center gap-3">
          Our Best Selling Products <i className="h-[2px] w-7 bg-gold" />
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {list.length ? (
          list.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              onAdd={onAdd}
              onSelectProduct={onSelectProduct}
              isWishlisted={wishlistIds.includes(p.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))
        ) : (
          <p className="col-span-full py-10 text-center text-sm text-neutral-500">
            No products match your search.
          </p>
        )}
      </div>

      {/* Centered View All Products Button */}
      {onViewAllProducts && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onViewAllProducts}
            className="flex items-center justify-center rounded-lg bg-[#2e5d37] hover:bg-[#244b2c] px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wider text-white shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer uppercase"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>
      )}

      {/* Trust Badges */}
      <div className="mt-8 rounded-2xl bg-neutral-100/80 p-4 sm:p-6 border border-neutral-200/60 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/80">
          {trust.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-3.5 pt-3.5 sm:pt-0 first:pt-0 sm:px-4 justify-start sm:justify-center"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white shadow-xs">
                <TrustIcon name={t.icon} size={20} />
              </span>
              <div className="text-left">
                <p className="text-xs sm:text-[13px] font-bold text-ink">{t.title}</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
