import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart } from 'lucide-react';
import Img from './Img.jsx';
import { IMG } from '../data/content.js';

export default function Navbar({
  cartCount,
  wishlistCount = 0,
  onSearch,
  searchValue = '',
  onOpenCart,
  onOpenWishlist,
  onNavigate,
  currentView,
}) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: 'home', hash: '#home' },
    { label: 'Shop', view: 'all-products', hash: '#products' },
    { label: 'Shop by Category', view: 'categories', hash: '#categories' },
    { label: 'About Us', view: 'home', hash: '#about' },
    { label: 'Help', view: 'help', hash: '/help' },
    { label: 'Contact', view: 'home', hash: '#contact' },
  ];

  const handleNavClick = (item) => {
    setOpen(false);
    if (onNavigate) {
      onNavigate(item.view, item.hash);
    }
  };

  const handleSearchChange = (val) => {
    if (onSearch) {
      onSearch(val);
    }
    // If user is searching and not in all-products, switch to all-products view
    if (val.trim() && currentView !== 'all-products' && onNavigate) {
      onNavigate('all-products');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100">
      <div className="mx-auto flex h-[64px] max-w-[900px] xl:max-w-[1280px] items-center justify-between px-4 lg:px-6">
        <button
          onClick={() => handleNavClick({ label: 'Home', view: 'home', hash: '#home' })}
          className="flex items-center gap-3 cursor-pointer text-left"
        >
          <Img
            src={IMG.logo}
            alt="Skylark Lifecare and Sciences"
            className="h-[52px] w-[52px] rounded-full bg-white object-contain shadow-xs border border-neutral-200"
            placeholder="bg-teal-100"
          />
          <span className="text-[12px] font-bold leading-[14px] tracking-wide text-ink">
            SKYLARK LIFECARE<br />AND SCIENCES
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold">
          {navItems.map((item) => {
            const isActive =
              (item.view === 'all-products' && currentView === 'all-products') ||
              (item.view === 'help' && currentView === 'help') ||
              (item.view === 'home' && currentView === 'home' && item.label === 'Home');
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`py-1 transition-colors hover:text-gold cursor-pointer ${
                  isActive ? 'border-b-2 border-gold text-ink' : 'text-neutral-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <label className="hidden md:flex h-9 w-[180px] xl:w-[240px] items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-3 focus-within:border-gold transition-colors">
            <Search size={14} className="text-neutral-400" />
            <input
              type="search"
              value={searchValue}
              placeholder="Search products..."
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-transparent text-xs outline-none placeholder:text-neutral-400 text-ink"
            />
          </label>

          {/* Wishlist Button */}
          <button
            aria-label="View Wishlist"
            onClick={onOpenWishlist}
            className="relative p-2 rounded-none hover:bg-neutral-100 text-ink hover:text-rose-500 transition-colors cursor-pointer"
          >
            <Heart
              size={20}
              strokeWidth={1.8}
              className={wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}
            />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-[16px] px-1 place-items-center rounded-none bg-rose-500 text-[9px] font-bold text-white shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            aria-label="View Shopping Cart"
            onClick={onOpenCart}
            className="relative p-2 rounded-none hover:bg-neutral-100 text-ink hover:text-gold transition-colors cursor-pointer"
          >
            <ShoppingCart size={20} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-[16px] px-1 place-items-center rounded-none bg-gold text-[9px] font-bold text-white shadow-xs animate-scale">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="lg:hidden p-2 rounded-none text-ink hover:bg-neutral-100"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden flex flex-col gap-3 border-t bg-white px-4 py-4 text-xs font-bold">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="py-1 text-left hover:text-gold transition-colors text-neutral-700"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <label className="flex h-9 w-full items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-3">
              <Search size={14} className="text-neutral-400" />
              <input
                type="search"
                value={searchValue}
                placeholder="Search products..."
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-transparent text-xs outline-none placeholder:text-neutral-400 text-ink"
              />
            </label>
          </div>
        </nav>
      )}
    </header>
  );
}
