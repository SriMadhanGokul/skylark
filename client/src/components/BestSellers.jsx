import { ArrowRight } from 'lucide-react';
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
        {onViewAllProducts && (
          <button
            onClick={onViewAllProducts}
            className="flex items-center gap-1.5 text-xs font-bold text-ink hover:text-gold transition-colors group cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        )}
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

      {/* Trust Badges */}
      <div className="mt-6 grid gap-4 rounded-2xl bg-neutral-100 px-6 py-4 md:grid-cols-3">
        {trust.map((t, i) => (
          <div
            key={t.title}
            className={`flex items-center justify-center gap-4 ${
              i < 2 ? 'md:border-r md:border-neutral-300' : ''
            }`}
          >
            <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-ink text-white">
              <TrustIcon name={t.icon} size={22} />
            </span>
            <div>
              <p className="text-[13px] font-semibold">{t.title}</p>
              <p className="text-[10px] text-neutral-600">{t.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
