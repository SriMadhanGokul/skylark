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
import Help from './components/Help.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import WishlistDrawer from './components/WishlistDrawer.jsx';
import WalletModal from './components/WalletModal.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import { CheckCircle2, Heart, Wallet } from 'lucide-react';

export default function App() {
  const getInitialView = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/help' || path === '/help/') return 'help';
      if (path === '/products' || path === '/shop') return 'all-products';
    }
    return 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView); // 'home' | 'all-products' | 'product-detail' | 'help'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [useStoreCredit, setUseStoreCredit] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Persistent customer wallet & store credit
  const defaultWallet = {
    balance: 350.00,
    customerName: 'Skylark Club Member',
    membershipId: 'SKY-WL-8821',
    transactions: [
      { id: 'tx-1', date: '2026-10-20', description: 'Welcome Club Store Credit', type: 'credit', amount: 200.00 },
      { id: 'tx-2', date: '2026-10-22', description: 'Return Courtesy Credit #RET-4091', type: 'credit', amount: 150.00 },
    ],
    redeemedCodes: ['WELCOME100'],
  };

  const [wallet, setWallet] = useState(() => {
    try {
      const saved = localStorage.getItem('skylark_customer_wallet');
      return saved ? JSON.parse(saved) : defaultWallet;
    } catch {
      return defaultWallet;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('skylark_customer_wallet', JSON.stringify(wallet));
    } catch {
      // ignore localStorage quota errors
    }
  }, [wallet]);

  // Wallet operations
  const addWalletFunds = (amount, note = 'Store Credit Added') => {
    const num = Number(amount);
    if (isNaN(num) || num <= 0) return;
    const newTx = {
      id: 'tx-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      description: note,
      type: 'credit',
      amount: num,
    };
    setWallet((prev) => ({
      ...prev,
      balance: prev.balance + num,
      transactions: [newTx, ...prev.transactions],
    }));
    setToastMessage({ text: `Added ₹${num.toFixed(2)} to your Store Credit Wallet!`, type: 'wallet' });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const redeemWalletCoupon = (rawCode) => {
    const code = rawCode.trim().toUpperCase();
    const redeemed = wallet?.redeemedCodes || [];
    if (redeemed.includes(code)) {
      return { success: false, text: 'This voucher code has already been redeemed on this account.' };
    }

    const couponMap = {
      'SKYLARK200': 200,
      'PETLOVE150': 150,
      'RETURN500': 500,
      'WELCOME100': 100,
      'PAWCARE50': 50,
    };

    let creditValue = couponMap[code];
    if (!creditValue) {
      const match = code.match(/\d+$/);
      if (match) {
        creditValue = parseInt(match[0], 10);
      }
    }

    if (!creditValue || creditValue <= 0) {
      return { success: false, text: 'Invalid voucher code. Please check and try again.' };
    }

    const newTx = {
      id: 'tx-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      description: `Voucher Redeemed: ${code}`,
      type: 'credit',
      amount: creditValue,
    };

    setWallet((prev) => ({
      ...prev,
      balance: prev.balance + creditValue,
      redeemedCodes: [...(prev.redeemedCodes || []), code],
      transactions: [newTx, ...prev.transactions],
    }));

    setToastMessage({ text: `Redeemed ${code}! ₹${creditValue} added to Store Credit.`, type: 'wallet' });
    setTimeout(() => setToastMessage(null), 3500);

    return { success: true, text: `Success! ₹${creditValue} has been added to your store credit.` };
  };

  const deductWalletFunds = (amount, note = 'Order Payment') => {
    const num = Number(amount);
    if (isNaN(num) || num <= 0) return;
    const newTx = {
      id: 'tx-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      description: note,
      type: 'debit',
      amount: num,
    };
    setWallet((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - num),
      transactions: [newTx, ...prev.transactions],
    }));
  };

  const handleCompleteOrder = (orderDetails) => {
    if (orderDetails.appliedCredit > 0) {
      deductWalletFunds(orderDetails.appliedCredit, `Order #${orderDetails.orderId} Payment`);
    }
    setCart([]);
    setToastMessage({
      text: `Order #${orderDetails.orderId} placed successfully!`,
      type: 'cart',
    });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync URL changes with back/forward browser buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/help' || path === '/help/') {
        setCurrentView('help');
      } else if (path === '/products' || path === '/shop') {
        setCurrentView('all-products');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const syncUrl = (path) => {
    try {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
    } catch {
      // ignore history errors
    }
  };

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
    syncUrl('/#products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllProducts = () => {
    setSelectedCategory('All');
    setCurrentView('all-products');
    syncUrl('/#products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    syncUrl('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view, hash) => {
    if (view === 'help') {
      setCurrentView('help');
      syncUrl('/help');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'categories') {
      syncUrl('/');
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
      syncUrl('/');
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
      syncUrl('/#products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-white text-ink font-sans w-full max-w-full overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-xs font-bold text-white shadow-xl border border-gold/30 animate-in fade-in slide-in-from-top-2">
          {toastMessage.type === 'heart' ? (
            <Heart size={16} className="text-rose-400 fill-rose-400 shrink-0" />
          ) : toastMessage.type === 'wallet' ? (
            <Wallet size={16} className="text-gold shrink-0" />
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
          {toastMessage.type === 'wallet' && (
            <button
              onClick={() => setIsWalletOpen(true)}
              className="ml-2 rounded-none bg-gold/20 px-2.5 py-1 text-[10px] font-bold text-gold hover:bg-gold/30 cursor-pointer"
            >
              View Wallet
            </button>
          )}
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        walletBalance={wallet.balance}
        onOpenWallet={() => setIsWalletOpen(true)}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'help' && (
          <Help
            onBackHome={handleBackToHome}
            onExploreProducts={handleViewAllProducts}
          />
        )}

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
      <Footer 
        onNavigate={handleNavigate} 
        onOpenWallet={() => setIsWalletOpen(true)}
      />

      {/* Cart Drawer Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateCartQty}
        onRemoveItem={removeFromCart}
        onExploreProducts={handleViewAllProducts}
        wallet={wallet}
        useStoreCredit={useStoreCredit}
        onToggleStoreCredit={setUseStoreCredit}
        onOpenWallet={() => setIsWalletOpen(true)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
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

      {/* Customer Wallet & Store Credit Modal */}
      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        wallet={wallet}
        onAddFunds={addWalletFunds}
        onRedeemCoupon={redeemWalletCoupon}
        onNavigateToHelp={() => {
          setIsWalletOpen(false);
          handleNavigate('help');
        }}
      />

      {/* Direct Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={cartSubtotal}
        wallet={wallet}
        useStoreCredit={useStoreCredit}
        onToggleStoreCredit={setUseStoreCredit}
        onCompleteOrder={handleCompleteOrder}
        onOpenWallet={() => {
          setIsCheckoutOpen(false);
          setIsWalletOpen(true);
        }}
      />
    </div>
  );
}

