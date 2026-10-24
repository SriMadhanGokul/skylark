import { useState } from 'react';
import { 
  X, 
  Wallet, 
  Sparkles, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Gift, 
  Plus, 
  Check, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  Copy
} from 'lucide-react';

export default function WalletModal({
  isOpen,
  onClose,
  wallet,
  onAddFunds,
  onRedeemCoupon,
  onNavigateToHelp,
}) {
  const [activeTab, setActiveTab] = useState('balance'); // 'balance' | 'topup' | 'redeem' | 'history'
  const [customAmount, setCustomAmount] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherMessage, setVoucherMessage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const quickAmounts = [100, 250, 500, 1000];

  const handleQuickAdd = (amount) => {
    onAddFunds(amount, 'Manual Balance Top-up');
  };

  const handleCustomAdd = (e) => {
    e.preventDefault();
    const val = parseFloat(customAmount);
    if (!isNaN(val) && val > 0) {
      onAddFunds(val, 'Customer Account Top-up');
      setCustomAmount('');
    }
  };

  const handleRedeem = (e) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;
    const res = onRedeemCoupon(voucherCode.trim());
    setVoucherMessage(res);
    if (res.success) {
      setVoucherCode('');
    }
    setTimeout(() => {
      setVoucherMessage(null);
    }, 4000);
  };

  const copyMemberId = () => {
    if (wallet?.membershipId) {
      navigator.clipboard?.writeText(wallet.membershipId);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl border border-neutral-200 rounded-none animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4 bg-neutral-50/80">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-ink grid place-items-center rounded-none text-gold shadow-xs">
              <Wallet size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink flex items-center gap-1.5">
                Skylark Club Wallet & Store Credit
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-none">
                  Active
                </span>
              </h2>
              <p className="text-[11px] text-neutral-500">
                Member ID: <span className="font-mono font-semibold text-ink">{wallet?.membershipId || 'SKY-WL-1001'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-ink hover:bg-neutral-100 rounded-none transition-colors cursor-pointer"
            aria-label="Close wallet"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Virtual Membership & Credit Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1c1815] via-[#241e19] to-[#12100e] text-white p-5 rounded-none shadow-lg border border-gold/40">
            {/* Background luxury watermark pattern */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] tracking-widest uppercase font-bold text-gold flex items-center gap-1">
                  <Sparkles size={11} /> Skylark Lifecare Club
                </span>
                <p className="text-xs text-neutral-300 font-medium mt-0.5">
                  {wallet?.customerName || 'Valued Pet Parent'}
                </p>
              </div>
              <button 
                onClick={copyMemberId}
                className="flex items-center gap-1 text-[10px] font-mono bg-white/10 hover:bg-white/20 px-2 py-1 rounded-none text-neutral-300 transition-colors"
                title="Copy Member ID"
              >
                {copiedCode ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                {copiedCode ? 'Copied' : wallet?.membershipId}
              </button>
            </div>

            <div className="my-3">
              <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider block">
                Total Available Store Credit
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-gold font-sans tracking-tight">
                  ₹ {(wallet?.balance || 0).toFixed(2)}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 border border-emerald-500/30">
                  Ready to Spend
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-neutral-300">
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-gold" />
                Store credit valid for 12 months
              </span>
              <span className="text-neutral-400">
                1 Credit = ₹1 INR
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-200">
            <button
              onClick={() => setActiveTab('balance')}
              className={`flex-1 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'balance'
                  ? 'border-gold text-ink bg-amber-50/30'
                  : 'border-transparent text-neutral-500 hover:text-ink'
              }`}
            >
              Overview & Top-up
            </button>
            <button
              onClick={() => setActiveTab('redeem')}
              className={`flex-1 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'redeem'
                  ? 'border-gold text-ink bg-amber-50/30'
                  : 'border-transparent text-neutral-500 hover:text-ink'
              }`}
            >
              Redeem Voucher
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'history'
                  ? 'border-gold text-ink bg-amber-50/30'
                  : 'border-transparent text-neutral-500 hover:text-ink'
              }`}
            >
              History ({wallet?.transactions?.length || 0})
            </button>
          </div>

          {/* TAB 1: Overview & Quick Top-Up */}
          {activeTab === 'balance' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-2">
                  Quick Add Store Credit (Instant Top-Up)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleQuickAdd(amt)}
                      className="border border-neutral-300 bg-neutral-50 hover:border-gold hover:bg-gold/10 hover:text-ink py-2 text-xs font-bold text-neutral-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus size={11} /> ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleCustomAdd} className="pt-2">
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Or enter specific amount (₹)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="e.g. 750"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 text-xs border border-neutral-300 rounded-none focus:outline-none focus:border-gold text-ink"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!customAmount}
                    className="bg-ink hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold px-4 py-2 transition-colors cursor-pointer"
                  >
                    Add Credit
                  </button>
                </div>
              </form>

              {/* Store Credit Benefits */}
              <div className="bg-amber-50/60 border border-gold/25 p-3.5 space-y-2 text-xs text-neutral-700">
                <h4 className="font-bold text-ink flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-gold" />
                  Why use Skylark Store Credit?
                </h4>
                <ul className="text-[11px] space-y-1 text-neutral-600 list-disc pl-4">
                  <li>Zero processing fees — instantly applied in your cart during checkout.</li>
                  <li>Automatically receives return reimbursements and courtesy credits.</li>
                  <li>Can be stacked with coupon discount offers and free shipping.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Redeem Voucher */}
          {activeTab === 'redeem' && (
            <div className="space-y-4">
              <div className="border border-neutral-200 bg-neutral-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gift size={16} className="text-gold" />
                  <h3 className="text-xs font-bold text-ink">Have a Store Credit or Return Voucher?</h3>
                </div>
                <p className="text-[11px] text-neutral-600 mb-3 leading-relaxed">
                  Enter your unique alphanumeric code provided via WhatsApp, email return notification, or promotional gift card to claim store credit directly to your wallet.
                </p>

                <form onSubmit={handleRedeem} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SKYLARK200 or RETURN-CREDIT"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                      className="flex-1 uppercase font-mono px-3 py-2 text-xs border border-neutral-300 rounded-none focus:outline-none focus:border-gold"
                    />
                    <button
                      type="submit"
                      disabled={!voucherCode.trim()}
                      className="bg-gold hover:bg-[#d89318] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold px-4 py-2 transition-colors cursor-pointer"
                    >
                      Redeem
                    </button>
                  </div>
                </form>

                {voucherMessage && (
                  <div className={`mt-3 p-2.5 text-xs font-semibold flex items-center gap-2 border ${
                    voucherMessage.success 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                      : 'bg-rose-50 text-rose-800 border-rose-300'
                  }`}>
                    {voucherMessage.success ? <Check size={14} /> : <X size={14} />}
                    <span>{voucherMessage.text}</span>
                  </div>
                )}
              </div>

              {/* Sample test vouchers for quick testing */}
              <div className="border border-dashed border-neutral-300 p-3 bg-white">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-2">
                  Available Promo Codes to Try:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: 'SKYLARK200', desc: '₹200 Welcome Credit' },
                    { code: 'PETLOVE150', desc: '₹150 Pet Care Bonus' },
                    { code: 'RETURN500', desc: '₹500 Exchange Voucher' },
                  ].map((item) => (
                    <button
                      key={item.code}
                      onClick={() => setVoucherCode(item.code)}
                      className="text-left border border-neutral-200 bg-neutral-50 hover:bg-gold/10 hover:border-gold p-2 text-[10px] transition-colors cursor-pointer"
                    >
                      <span className="font-mono font-bold text-ink block">{item.code}</span>
                      <span className="text-neutral-500">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Transaction History */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {(!wallet?.transactions || wallet.transactions.length === 0) ? (
                <div className="py-8 text-center text-neutral-400">
                  <p className="text-xs">No transactions yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100 max-h-[300px] overflow-y-auto">
                  {wallet.transactions.map((tx) => (
                    <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-7 w-7 grid place-items-center rounded-none shrink-0 ${
                          tx.type === 'credit' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                          {tx.type === 'credit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                        </div>
                        <div>
                          <p className="font-semibold text-ink line-clamp-1">{tx.description}</p>
                          <span className="text-[10px] text-neutral-400 font-mono">{tx.date}</span>
                        </div>
                      </div>
                      <span className={`font-bold font-mono ${
                        tx.type === 'credit' ? 'text-emerald-600' : 'text-neutral-700'
                      }`}>
                        {tx.type === 'credit' ? '+' : '-'} ₹{Number(tx.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 px-6 py-3.5 bg-neutral-50 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              onClose();
              if (onNavigateToHelp) onNavigateToHelp();
            }}
            className="text-[11px] text-neutral-600 hover:text-ink hover:underline flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle size={13} className="text-gold" />
            Store Credit Policy & Rules (Sec 22)
          </button>
          <button
            onClick={onClose}
            className="bg-neutral-200 hover:bg-neutral-300 text-ink font-bold px-4 py-1.5 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
