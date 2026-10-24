import { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Wallet, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Img from './Img.jsx';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  subtotal,
  wallet,
  useStoreCredit,
  onToggleStoreCredit,
  onCompleteOrder,
  onOpenWallet,
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'wallet' | 'upi' | 'cod'
  const [orderSuccess, setOrderSuccess] = useState(null);

  if (!isOpen) return null;

  // Calculate store credit deduction
  const availableCredit = wallet?.balance || 0;
  const appliedCredit = useStoreCredit ? Math.min(availableCredit, subtotal) : 0;
  const finalPayable = Math.max(0, subtotal - appliedCredit);
  const fullyPaidWithCredit = useStoreCredit && appliedCredit >= subtotal;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in your name, phone number, and address.');
      return;
    }

    const orderId = 'SKY-' + Math.floor(100000 + Math.random() * 900000);
    const orderDetails = {
      orderId,
      items: cart,
      subtotal,
      appliedCredit,
      finalPayable,
      paymentMethod: fullyPaidWithCredit ? 'Store Credit' : paymentMethod,
      customer: formData,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    onCompleteOrder(orderDetails);
    setOrderSuccess(orderDetails);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl overflow-hidden bg-white shadow-2xl border border-neutral-200 rounded-none flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 bg-neutral-50">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-gold" />
            <h2 className="text-base font-bold text-ink">
              {orderSuccess ? 'Order Confirmation' : 'Checkout & Delivery Details'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-ink hover:bg-neutral-100 rounded-none transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {orderSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto h-16 w-16 bg-emerald-100 text-emerald-600 grid place-items-center rounded-none">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-ink">Thank you for your order!</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Order ID: <span className="font-mono font-bold text-ink">{orderSuccess.orderId}</span>
                </p>
              </div>

              <div className="border border-neutral-200 bg-neutral-50 p-4 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Recipient:</span>
                  <span className="font-bold text-ink">{orderSuccess.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Phone:</span>
                  <span className="font-mono font-semibold text-ink">{orderSuccess.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Delivery Address:</span>
                  <span className="font-medium text-ink text-right max-w-[200px] truncate">{orderSuccess.customer.address}</span>
                </div>
                {orderSuccess.appliedCredit > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold border-t border-neutral-200 pt-2">
                    <span>Store Credit Used:</span>
                    <span>- ₹{orderSuccess.appliedCredit.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-ink border-t border-neutral-200 pt-2">
                  <span>Amount Paid / Due:</span>
                  <span className="text-gold">₹{orderSuccess.finalPayable.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500">
                  <span>Payment Mode:</span>
                  <span className="capitalize">{orderSuccess.paymentMethod.toUpperCase()}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="bg-ink hover:bg-neutral-800 text-white text-xs font-bold px-6 py-2.5 transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Top Banner for Store Credit */}
              {availableCredit > 0 ? (
                <div className="bg-amber-50/70 border border-gold/40 p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 bg-gold/20 text-gold grid place-items-center rounded-none shrink-0">
                      <Wallet size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ink flex items-center gap-1.5">
                        Customer Store Credit Available
                        <span className="text-gold font-extrabold font-mono">₹{availableCredit.toFixed(2)}</span>
                      </h4>
                      <p className="text-[11px] text-neutral-600">
                        {useStoreCredit 
                          ? `Applying ₹${appliedCredit.toFixed(2)} discount on this order.`
                          : 'Toggle switch to apply your store credit toward this order.'}
                      </p>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={useStoreCredit}
                      onChange={(e) => onToggleStoreCredit(e.target.checked)}
                      className="h-4 w-4 accent-[#e8a020] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-ink">
                      {useStoreCredit ? 'Applied' : 'Apply Credit'}
                    </span>
                  </label>
                </div>
              ) : (
                <div className="bg-neutral-50 border border-neutral-200 p-3 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 flex items-center gap-1.5">
                    <Wallet size={14} className="text-neutral-400" />
                    Store Credit balance: ₹0.00
                  </span>
                  <button
                    type="button"
                    onClick={onOpenWallet}
                    className="text-gold font-bold hover:underline cursor-pointer"
                  >
                    Top-Up or Redeem Voucher →
                  </button>
                </div>
              )}

              {/* Form Grid */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  1. Shipping Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 p-2 text-ink focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 p-2 text-ink focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-neutral-700 mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Flat / House No., Street, Landmark"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 p-2 text-ink focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">City / State</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Ahmedabad, Gujarat"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 p-2 text-ink focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="e.g. 382481"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 p-2 text-ink focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  2. Payment Method
                </h3>
                {fullyPaidWithCredit ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    Entire order is covered by your Store Credit! (₹0.00 cash payable)
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className={`border p-3 flex items-center gap-2 cursor-pointer transition-colors ${
                      paymentMethod === 'cod' ? 'border-gold bg-amber-50/20' : 'border-neutral-200'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-[#e8a020]"
                      />
                      <div>
                        <span className="font-bold text-ink block">Cash on Delivery</span>
                        <span className="text-[10px] text-neutral-500">Pay when order arrives</span>
                      </div>
                    </label>

                    <label className={`border p-3 flex items-center gap-2 cursor-pointer transition-colors ${
                      paymentMethod === 'upi' ? 'border-gold bg-amber-50/20' : 'border-neutral-200'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-[#e8a020]"
                      />
                      <div>
                        <span className="font-bold text-ink block">UPI / QR / Net Banking</span>
                        <span className="text-[10px] text-neutral-500">Fast digital payment</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {/* Order Breakdown */}
              <div className="border-t border-neutral-200 pt-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-ink">₹ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Standard Shipping</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                {appliedCredit > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles size={12} />
                      Store Credit Applied
                    </span>
                    <span>- ₹ {appliedCredit.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-neutral-200 pt-2 flex justify-between text-base font-bold text-ink">
                  <span>Total Payable:</span>
                  <span className="text-gold">₹ {finalPayable.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-ink hover:bg-neutral-800 text-white text-xs font-bold py-3 transition-colors cursor-pointer"
                >
                  Confirm & Place Order <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
