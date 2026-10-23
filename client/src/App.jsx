import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import BestSellers from './components/BestSellers.jsx';
import Testimonials from './components/Testimonials.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import Footer from './components/Footer.jsx';
import AllProducts from './components/AllProducts.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import WishlistDrawer from './components/WishlistDrawer.jsx';
import { CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'all-products' | 'product-detail'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Persistent wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('skylark_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('skylark_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore localStorage quota errors
    }
  }, [wishlist]);

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        setToastMessage({ text: `Removed "${product.name}" from Wishlist`, type: 'info' });
        setTimeout(() => setToastMessage(null), 2500);
        return prev.filter((item) => item.id !== product.id);
      } else {
        setToastMessage({ text: `Added "${product.name}" to Wishlist! ❤️`, type: 'heart' });
        setTimeout(() => setToastMessage(null), 2500);
        return [...prev, product];
      }
    });
  };

  const wishlistIds = wishlist.map((item) => item.id);

  // Cart operations
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });

    // Show toast confirmation
    setToastMessage({ text: `Added "${product.name}" to cart!`, type: 'cart' });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateCartQty = (id, newQty) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Navigation handlers
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView('all-products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllProducts = () => {
    setSelectedCategory('All');
    setCurrentView('all-products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view, hash) => {
    if (view === 'categories') {
      if (currentView === 'home') {
        const el = document.getElementById('categories');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setCurrentView('home');
        setTimeout(() => {
          const el = document.getElementById('categories');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      return;
    }

    if (view === 'home') {
      setCurrentView('home');
      if (hash && hash !== '#home') {
        setTimeout(() => {
          const targetId = hash.replace('#', '');
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (view === 'all-products') {
      setSelectedCategory('All');
      setCurrentView('all-products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-ink font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-xs font-bold text-white shadow-xl border border-gold/30 animate-in fade-in slide-in-from-top-2">
          {toastMessage.type === 'heart' ? (
            <Heart size={16} className="text-rose-400 fill-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
          {toastMessage.type === 'cart' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 rounded-none bg-gold/20 px-2.5 py-1 text-[10px] font-bold text-gold hover:bg-gold/30 cursor-pointer"
            >
              View Cart
            </button>
          )}
          {toastMessage.type === 'heart' && (
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="ml-2 rounded-none bg-rose-500/20 px-2.5 py-1 text-[10px] font-bold text-rose-300 hover:bg-rose-500/30 cursor-pointer"
            >
              View Wishlist
            </button>
          )}
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentView('all-products')}
            onAddToCart={addToCart}
            onSelectProduct={handleSelectProduct}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={toggleWishlist}
          />
        )}

        {currentView === 'all-products' && (
          <AllProducts
            initialCategory={selectedCategory}
            initialSearch={searchQuery}
            onSelectProduct={handleSelectProduct}
            onAddToCart={addToCart}
            onBackHome={handleBackToHome}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
          />
        )}

        {currentView === 'home' && (
          <>
            <Hero onShopProducts={handleViewAllProducts} />
            <Categories onSelectCategory={handleSelectCategory} />
            <BestSellers
              query={searchQuery}
              onAdd={addToCart}
              onSelectProduct={handleSelectProduct}
              onViewAllProducts={handleViewAllProducts}
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
            />
            <Testimonials />
            <CtaBanner onShopNow={handleViewAllProducts} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateCartQty}
        onRemoveItem={removeFromCart}
        onExploreProducts={handleViewAllProducts}
      />

      {/* Wishlist Drawer Slide-over */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveItem={toggleWishlist}
        onAddToCart={addToCart}
        onSelectProduct={handleSelectProduct}
        onExploreProducts={handleViewAllProducts}
      />
    </div>
  );
}
