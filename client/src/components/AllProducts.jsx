import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, Filter, X } from 'lucide-react';
import ProductCard from './ProductCard.jsx';
import TrustIcon from './TrustIcon.jsx';
import { products, categories, trust } from '../data/content.js';

export default function AllProducts({
  initialCategory = null,
  initialSearch = '',
  onSelectProduct,
  onAddToCart,
  onBackHome,
  wishlistIds = [],
  onToggleWishlist,
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [search, setSearch] = useState(initialSearch || '');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialCategory]);

  const allCategoryTabs = useMemo(() => {
    const list = [{ name: 'All', count: products.length }];
    categories.forEach((cat) => {
      const cnt = products.filter((p) => p.category === cat.name).length;
      list.push({ name: cat.name, count: cnt });
    });
    // Also add Anti-Tick & Flea if not present
    const antiTickCount = products.filter((p) => p.category === 'Anti-Tick & Flea').length;
    if (antiTickCount > 0 && !list.find((c) => c.name === 'Anti-Tick & Flea')) {
      list.push({ name: 'Anti-Tick & Flea', count: antiTickCount });
    }
    return list;
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          !search ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()) ||
          (p.tagline && p.tagline.toLowerCase().includes(search.toLowerCase())) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return a.id - b.id; // featured default
      });
  }, [selectedCategory, search, sortBy]);

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-20">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-neutral-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 lg:px-8">
          <button
            onClick={onBackHome}
            className="group flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="hover:text-ink cursor-pointer" onClick={onBackHome}>
              Home
            </span>
            <span>/</span>
            <span className="text-neutral-700 font-semibold">All Products</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-gold font-bold">{selectedCategory}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1280px] px-4 pt-8 lg:px-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Filter size={13} /> Category:
            </span>
            {allCategoryTabs.map((tab) => {
              const active = selectedCategory.toLowerCase() === tab.name.toLowerCase();
              return (
                <button
                  key={tab.name}
                  onClick={() => setSelectedCategory(tab.name)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                    active
                      ? 'bg-ink text-white shadow-md scale-105'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  <span>{tab.name}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      active ? 'bg-gold text-ink font-bold' : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-neutral-200/80 shadow-sm">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by product name, ingredient, or benefit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl bg-neutral-50 pl-10 pr-9 py-2.5 text-xs text-ink placeholder:text-neutral-400 outline-none border border-neutral-200 focus:border-gold transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal size={14} className="text-neutral-500" />
              <span className="text-xs font-semibold text-neutral-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-ink outline-none focus:border-gold cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count & Active Filters Indicator */}
        <div className="flex items-center justify-between mb-4 px-1 text-xs text-neutral-600 font-medium">
          <p>
            Showing <strong className="text-ink">{filteredProducts.length}</strong> of{' '}
            <strong className="text-ink">{products.length}</strong> products
            {selectedCategory !== 'All' && (
              <span>
                {' '}
                in <strong className="text-gold">{selectedCategory}</strong>
              </span>
            )}
            {search && (
              <span>
                {' '}
                matching "<strong className="text-ink">{search}</strong>"
              </span>
            )}
          </p>

          {(selectedCategory !== 'All' || search) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearch('');
              }}
              className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
            >
              Clear all filters <X size={12} />
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                onAdd={onAddToCart}
                onSelectProduct={onSelectProduct}
                isWishlisted={wishlistIds.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-neutral-100">
            <p className="text-base font-semibold text-neutral-700">No products match your criteria</p>
            <p className="mt-1 text-xs text-neutral-500">
              Try searching with different terms or selecting another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearch('');
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition-colors"
            >
              Reset Filters & Show All
            </button>
          </div>
        )}

        {/* Trust Badges Bar */}
        <div className="mt-12 rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-neutral-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
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
      </div>
    </div>
  );
}
