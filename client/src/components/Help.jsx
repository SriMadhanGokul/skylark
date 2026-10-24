import React, { useState } from 'react';
import {
  Clock,
  ShieldAlert,
  Video,
  RotateCcw,
  BadgeIndianRupee,
  Truck,
  Banknote,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  Package,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export default function Help({ onBackHome, onExploreProducts }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const policyHighlights = [
    {
      badge: 'Window',
      title: '4 Days',
      desc: 'To request a return or exchange from delivery.',
      icon: Clock,
      highlight: true,
    },
    {
      badge: 'Urgent Claims',
      title: '48 Hours',
      desc: 'To report damaged, wrong, or missing items.',
      icon: ShieldAlert,
      highlight: false,
    },
    {
      badge: 'Mandatory',
      title: 'Uncut Unboxing Video',
      desc: 'Required for all damage and wrong-item claims.',
      icon: Video,
      highlight: false,
    },
    {
      badge: 'Pickup Fee',
      title: '₹220',
      desc: 'Return pickup fee; free if the mistake is Skylark’s.',
      icon: BadgeIndianRupee,
      highlight: false,
    },
    {
      badge: 'Store Credit',
      title: '24 Hours',
      desc: 'Store credit issued after the returned product passes inspection.',
      icon: RotateCcw,
      highlight: false,
    },
  ];

  const shoppingBenefits = [
    {
      title: 'Free Shipping',
      subtitle: 'On every order across India',
      icon: Truck,
    },
    {
      title: 'Cash on Delivery',
      subtitle: 'Available on most PIN codes',
      icon: Banknote,
    },
    {
      title: 'Easy Exchange',
      subtitle: 'Request within 4 days of delivery',
      icon: RefreshCw,
    },
    {
      title: 'Secure Checkout',
      subtitle: 'UPI, cards, and net banking',
      icon: ShieldCheck,
    },
  ];

  const returnSteps = [
    {
      step: '01',
      title: 'Request',
      timeline: 'Within 4 days of delivery',
      desc: 'Submit your return or exchange request via email or WhatsApp with your Order ID, clear photos, and unboxing video if applicable.',
    },
    {
      step: '02',
      title: 'Approval',
      timeline: 'Within 24–48 hours',
      desc: 'Our customer support team inspects your request details and authorizes the reverse pickup once approved.',
    },
    {
      step: '03',
      title: 'Pickup',
      timeline: 'Within 2–5 business days',
      desc: 'Our dedicated courier partner collects the securely repacked item from your doorstep.',
    },
    {
      step: '04',
      title: 'Inspection',
      timeline: '1–3 business days after arrival',
      desc: 'Our quality assurance team verifies the product condition, seal, batch codes, and original packaging.',
    },
    {
      step: '05',
      title: 'Credit / Refund',
      timeline: 'Store Credit in 24 hrs | Bank Refund 5–7 days',
      desc: 'Store credit is issued within 24 hours of passing inspection. Bank/source payment refunds reflect within 5–7 business days.',
    },
  ];

  const quickNav = [
    { id: 'general-policy', label: '1. General Policy' },
    { id: 'eligibility', label: '2. Eligibility & Window' },
    { id: 'non-returnable', label: '3. Non-Returnable Items' },
    { id: 'how-to-submit', label: '4. How to Request' },
    { id: 'damage-claims', label: '5. Damaged / Missing Items' },
    { id: 'unboxing-video', label: '6. Unboxing Video Rules' },
    { id: 'fees', label: '7. Pickup & Shipping Fees' },
    { id: 'exchanges', label: '8. Exchanges & Replacements' },
    { id: 'refunds', label: '9. Store Credit & Refunds' },
    { id: 'payment-modes', label: '10. COD & Prepaid Orders' },
    { id: 'cancellations', label: '11. Cancellations & RTO' },
    { id: 'promotions', label: '12. Combos & Free Gifts' },
    { id: 'support-contact', label: '13. Support & Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-ink selection:bg-gold/20">
      {/* Top Breadcrumb Header Bar */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-xs text-neutral-500 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackHome}
              className="hover:text-gold transition-colors font-medium cursor-pointer"
            >
              Home
            </button>
            <ChevronRight size={12} className="text-neutral-400" />
            <span className="text-ink font-semibold">Help & Return Policy</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-neutral-500 font-medium">
            <Sparkles size={13} className="text-gold" /> Skylark Lifecare Customer Guarantee
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Page Title & Header */}
        <header className="mb-10 text-center">
          <span className="inline-block rounded-none bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#9d690a]">
            Customer Support & Policies
          </span>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Help & Return Policy
          </h1>
          <div className="mx-auto mt-3 h-[2px] w-12 bg-gold" />
          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm text-neutral-600 leading-relaxed">
            At Skylark Lifecare and Sciences, we are devoted to providing safe, gentle, and
            effective pet care products for happier pets. Please review our comprehensive return,
            exchange, and refund guidelines below.
          </p>
          <p className="mt-2 text-[11px] text-neutral-400">
            Last Updated: October 2026 &bull; Reference: SLCS-POL-2026
          </p>
        </header>

        {/* SECTION 4: POLICY HIGHLIGHTS AT THE TOP */}
        <section aria-labelledby="highlights-heading" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="highlights-heading" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Key Policy Highlights
              </h2>
              <p className="text-xs text-neutral-600">Quick snapshot of return and refund terms</p>
            </div>
            <span className="text-[11px] text-gold font-semibold">Quick Summary</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {policyHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`relative p-4 bg-white border transition-all ${
                    item.highlight
                      ? 'border-gold shadow-sm bg-gradient-to-br from-white to-[#fffbf3]'
                      : 'border-neutral-200/90 hover:border-gold/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5">
                      {item.badge}
                    </span>
                    <div className="p-1.5 rounded-full bg-neutral-100 text-neutral-700">
                      <Icon size={16} />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ink tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600 leading-snug">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: SHOPPING AND PAYMENT BENEFITS */}
        <section aria-labelledby="benefits-heading" className="mb-12">
          <div className="p-6 bg-white border border-neutral-200 shadow-xs">
            <h2 id="benefits-heading" className="font-serif text-lg font-bold text-ink mb-1">
              Shopping & Payment Benefits
            </h2>
            <p className="text-xs text-neutral-500 mb-6">
              Shop with complete peace of mind with our transparent order guarantees.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {shoppingBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-[#faf8f5] border border-neutral-200/70"
                  >
                    <div className="mt-0.5 p-2 bg-white text-gold border border-gold/20 shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-ink">{b.title}</h3>
                      <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                        {b.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: HOW A RETURN WORKS */}
        <section aria-labelledby="how-return-works" className="mb-12">
          <div className="p-6 sm:p-8 bg-white border border-neutral-200 shadow-xs">
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                Step-by-Step Guide
              </span>
              <h2 id="how-return-works" className="font-serif text-2xl font-bold text-ink mt-0.5">
                How a Return Works
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Follow these 5 transparent steps to process your return, exchange, or replacement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {returnSteps.map((s, index) => (
                <div
                  key={index}
                  className="relative p-4 bg-[#faf8f5] border border-neutral-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-2xl font-bold text-neutral-400">
                        {s.step}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-gold" />
                    </div>
                    <h3 className="font-bold text-xs text-ink">{s.title}</h3>
                    <div className="mt-1 text-[10px] font-semibold text-gold uppercase tracking-wider">
                      {s.timeline}
                    </div>
                    <p className="mt-2 text-[11px] text-neutral-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 p-3 bg-neutral-50 border border-neutral-200/80 text-xs">
              <span className="text-neutral-600">
                Need immediate help with your order? Our support representatives are available Monday to Saturday.
              </span>
              <a
                href="https://wa.me/918059053151"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-white font-bold text-[11px] hover:bg-neutral-800 transition-colors"
              >
                <MessageSquare size={13} className="text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* QUICK JUMP TABLE OF CONTENTS */}
        <nav aria-label="Policy sections" className="mb-10 p-4 bg-white border border-neutral-200">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
            Policy Navigation / Table of Contents
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {quickNav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-gold/15 hover:text-ink text-neutral-600 text-[11px] font-medium transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>

        {/* SECTION 7: COMPLETE RETURN, EXCHANGE, AND REFUND POLICY */}
        <article className="space-y-8 bg-white p-6 sm:p-10 border border-neutral-200 shadow-xs text-neutral-800 leading-relaxed text-sm">
          {/* 1. General return and refund policy */}
          <section id="general-policy" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              1. General Return and Refund Policy
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <p className="text-neutral-700 text-xs sm:text-sm">
              Skylark Lifecare and Sciences is committed to providing premium quality, gentle, and
              scientifically formulated pet care essentials. Every batch of our pet shampoos, paw creams,
              deodorants, and oral wellness solutions is rigorously tested for pet safety and hygiene.
            </p>
            <p className="mt-3 text-neutral-700 text-xs sm:text-sm">
              Because our catalog consists of topical pet grooming formulations, paw balms, and oral care
              solutions, strict pet hygiene and cross-contamination standards apply to all returns. We accept
              returns or exchange requests strictly within <strong>4 days from the date of confirmed delivery</strong>,
              provided the items comply with our hygiene, sealing, and safety criteria detailed below.
            </p>
          </section>

          {/* 2. Return eligibility and request window */}
          <section id="eligibility" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              2. Return Eligibility and Request Window
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <p className="text-neutral-700 text-xs sm:text-sm">
              To qualify for a valid return or exchange, your item must meet all of the following conditions:
            </p>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-neutral-700 list-disc list-inside">
              <li>
                <strong>Timely Notice:</strong> The request must be raised within <strong>4 days</strong> of
                the delivery confirmation recorded by our courier partner.
              </li>
              <li>
                <strong>Unopened and Unused:</strong> The item must be completely unused, unpumped, and in the
                same condition as received.
              </li>
              <li>
                <strong>Intact Safety Seal:</strong> Bottle caps, safety shrink-wraps, flip-top seals, and spray
                nozzle locks must be untampered with.
              </li>
              <li>
                <strong>Original Packaging:</strong> The product must be returned with its original outer cardboard
                box, batch labels, MRP sticker, and promotional inclusions.
              </li>
              <li>
                <strong>Valid Proof of Purchase:</strong> You must supply your original Order ID or invoice.
              </li>
            </ul>
          </section>

          {/* 3. Products that cannot be returned */}
          <section id="non-returnable" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              3. Products That Cannot Be Returned (Non-Returnable Items)
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 mb-4 text-xs text-amber-900 leading-relaxed">
              <strong>Health & Pet Hygiene Safety Notice:</strong> Due to veterinary hygiene standards and to
              prevent cross-infection among beloved pets, opened or unsealed personal pet care formulations cannot
              be returned or re-sold once handled.
            </div>
            <p className="text-neutral-700 text-xs sm:text-sm">
              The following categories and circumstances are strictly non-returnable:
            </p>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-neutral-700 list-disc list-inside">
              <li>
                <strong>Opened Oral Care Sprays:</strong> Any oral spray or dental solution whose tamper-proof seal or
                cap has been opened or actuated.
              </li>
              <li>
                <strong>Partially Used Shampoos & Creams:</strong> Any bottle, tub, or tube where liquid/cream has been
                dispensed or applied.
              </li>
              <li>
                <strong>Expired Request Window:</strong> Requests submitted after the 4-day delivery window has elapsed.
              </li>
              <li>
                <strong>Clearance & Flash Sale Purchases:</strong> Products marked as "Final Sale", clearance specials,
                or closeout inventory.
              </li>
              <li>
                <strong>Damaged Without Unboxing Video:</strong> Claims of transit damage, leakage, or missing bottles
                without a valid, continuous unboxing video.
              </li>
              <li>
                <strong>Missing Batch/Label:</strong> Products where the batch number, manufacturing date, or MRP label
                has been defaced, scratched, or removed.
              </li>
            </ul>
          </section>

          {/* 4. How to submit a return or exchange request */}
          <section id="how-to-submit" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              4. How to Submit a Return or Exchange Request
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <p className="text-neutral-700 text-xs sm:text-sm">
              To ensure swift processing within 24–48 hours, follow these steps to file your request:
            </p>
            <ol className="mt-3 space-y-3 text-xs sm:text-sm text-neutral-700 list-decimal list-inside">
              <li>
                <strong>Contact Support:</strong> Email us at{' '}
                <a href="mailto:grouptheskylark@gmail.com" className="text-gold font-semibold underline">
                  grouptheskylark@gmail.com
                </a>{' '}
                or WhatsApp us at{' '}
                <a href="https://wa.me/918059053151" className="text-gold font-semibold underline">
                  +91 80590 53151
                </a>.
              </li>
              <li>
                <strong>Include Mandatory Details:</strong> State your <strong>Order ID</strong>, full delivery name,
                registered contact number, and the specific reason for requesting a return or exchange.
              </li>
              <li>
                <strong>Attach Photographic & Video Evidence:</strong> Include clear photos of all sides of the box,
                shipping label with barcode, and the uncut unboxing video.
              </li>
              <li>
                <strong>Ticket Authorization:</strong> Our team will review the request within 24–48 hours and issue a
                Return Merchandise Authorization (RMA) ticket with pickup instructions.
              </li>
            </ol>
          </section>

          {/* 5. Evidence required for damaged, wrong, defective, or missing products */}
          <section id="damage-claims" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              5. Damaged, Wrong, Defective, or Missing Products
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <p className="text-neutral-700 text-xs sm:text-sm">
              While every Skylark order is carefully packaged in leak-resistant corrugated boxes with protective bubble
              cushioning, transit mishaps can occasionally occur.
            </p>
            <div className="mt-3 p-4 bg-neutral-50 border border-neutral-200 text-xs sm:text-sm">
              <p className="font-bold text-ink mb-1">
                48-Hour Reporting Deadline:
              </p>
              <p className="text-neutral-600">
                Any visible transit damage, product leakage, incorrect item variant (e.g. receiving a paw cream instead of
                conditioning shampoo), or missing bottle must be reported to our team within <strong>48 hours of confirmed delivery</strong>.
                Reports received after 48 hours cannot be entertained as courier insurance claim windows expire.
              </p>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-neutral-700">
              When the fault is Skylark’s (e.g., defective nozzle, wrong bottle dispatched, transit breakage), Skylark will
              arrange an expedited free replacement or issue a full 100% refund without deducting any reverse pickup fee.
            </p>
          </section>

          {/* 6. Uncut unboxing video requirements */}
          <section id="unboxing-video" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              6. Mandatory Uncut Unboxing Video Requirements
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <div className="p-4 bg-red-50 border-l-4 border-red-500 mb-4 text-xs text-red-950">
              <strong>Strict Requirement for Claims:</strong> An uncut, continuous unboxing video is 100% mandatory for
              approving any claim involving transit damage, leakage, defective dispensers, or missing items.
            </div>
            <p className="text-neutral-700 text-xs sm:text-sm">
              To be considered valid, your unboxing video recording must adhere to the following criteria:
            </p>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-neutral-700 list-disc list-inside">
              <li>
                <strong>Continuous & Single Take:</strong> The video must be recorded in one single, uninterrupted take with
                no cuts, pauses, fast-forwards, or editing.
              </li>
              <li>
                <strong>Show Outer Label First:</strong> The recording must clearly display the courier shipping label with the
                tracking number (AWB) and recipient details prior to unsealing.
              </li>
              <li>
                <strong>Start Before Opening:</strong> The camera must clearly capture the intact sealed courier tape before
                cutting or tearing open the box.
              </li>
              <li>
                <strong>Inspect Contents on Camera:</strong> The product must be taken out of the packaging and inspected in
                plain view of the camera, highlighting any leakage, crack, or defect.
              </li>
            </ul>
          </section>

          {/* 7. Return pickup and shipping charges */}
          <section id="fees" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              7. Return Pickup and Shipping Charges
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div className="p-4 border border-neutral-200 bg-[#faf8f5]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Customer Discretion / Change of Mind
                </span>
                <h3 className="font-serif text-xl font-bold text-ink mt-1">₹220 Reverse Pickup Fee</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  For exchanges or returns due to personal preference (e.g. ordered wrong fragrance or decided not to use),
                  a flat <strong>₹220 reverse courier fee</strong> is charged. This fee covers courier doorstep collection,
                  fuel surcharge, and return freight. It will be deducted from your final store credit or refund.
                </p>
              </div>

              <div className="p-4 border border-gold/40 bg-[#fffdf9]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                  Skylark Mistake or Defect
                </span>
                <h3 className="font-serif text-xl font-bold text-emerald-700 mt-1">100% Free Reverse Pickup</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  If the return is required because we sent the wrong product, an expired batch, a defective spray mechanism,
                  or if the item arrived broken, <strong>no reverse pickup fee is charged</strong>. Skylark bears the entire cost
                  of pickup and redelivery.
                </p>
              </div>
            </div>
          </section>

          {/* 8. Exchange and replacement conditions */}
          <section id="exchanges" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              8. Exchange and Replacement Conditions
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <p className="text-neutral-700 text-xs sm:text-sm">
              We gladly facilitate product exchanges for unopened bottles and tubs of equal value within 4 days of delivery.
            </p>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-neutral-700 list-disc list-inside">
              <li>
                <strong>One-Time Exchange:</strong> An order can only be exchanged once. Subsequent exchange requests on the
                replacement unit are not permitted.
              </li>
              <li>
                <strong>Price Differences:</strong> If exchanging for a higher-priced product, the customer must settle the
                price difference before dispatch. If exchanging for a lower-priced product, the balance is credited as a Skylark store voucher.
              </li>
              <li>
                <strong>Dispatch Timeline:</strong> The exchanged item is dispatched within <strong>2 business days</strong> after
                the returned product successfully passes quality inspection at our central warehouse.
              </li>
            </ul>
          </section>

          {/* 9. Store credit and refunds */}
          <section id="refunds" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              9. Store Credit and Refunds
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 bg-neutral-50 border border-neutral-200">
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider">Fastest Resolution</span>
                <h3 className="font-bold text-sm text-ink mt-0.5">Skylark Store Credit</h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Issued within <strong>24 hours</strong> of inspection approval. Valid for 12 months with no minimum cart value.
                  Can be applied toward any pet care formulation.
                </p>
              </div>
              <div className="p-4 bg-neutral-50 border border-neutral-200">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Original Payment Source</span>
                <h3 className="font-bold text-sm text-ink mt-0.5">Bank / Card / UPI Refund</h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Processed within <strong>5–7 business days</strong> after approval. The turnaround time depends on the issuing
                  bank, gateway, or card network protocols.
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-700">
              Please note: Shipping charges paid on the original forward dispatch (if applicable) are non-refundable as they represent
              third-party logistics services already rendered.
            </p>
          </section>

          {/* 10. Cash on Delivery and prepaid orders */}
          <section id="payment-modes" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              10. Cash on Delivery (COD) and Prepaid Orders
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <div className="space-y-3 text-xs sm:text-sm text-neutral-700">
              <p>
                <strong>Prepaid Orders (Cards, Net Banking, UPI):</strong> Refunds are remitted directly to the original
                source account or card through our RBI-authorized payment aggregator within 5–7 business days.
              </p>
              <p>
                <strong>Cash on Delivery (COD) Orders:</strong> Because physical cash cannot be returned via courier agents,
                refunds for verified COD returns are remitted via <strong>Bank NEFT transfer</strong> or secure <strong>UPI transfer</strong>.
                Customers must provide their registered Account Number, IFSC code, and Account Holder Name or UPI ID upon return approval.
                Alternatively, customers may opt for an instant Skylark Store Credit voucher issued in 24 hours.
              </p>
            </div>
          </section>

          {/* 11. Cancellations and refused deliveries */}
          <section id="cancellations" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              11. Order Cancellations & Refused Deliveries
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 list-disc list-inside">
              <li>
                <strong>Cancellation Window:</strong> Orders can be cancelled free of charge at any time <em>before</em> the
                shipment has been handed over to our courier partner.
              </li>
              <li>
                <strong>Post-Dispatch Cancellations:</strong> Once dispatched with an active AWB tracking number, the order
                cannot be intercepted in transit and must be received and processed via the standard return flow.
              </li>
              <li>
                <strong>Refused COD Deliveries:</strong> Refusing a COD parcel at the doorstep without a valid defect claim
                creates heavy transit carbon and double courier costs. Customers who repeatedly refuse COD deliveries may have
                future COD privileges permanently disabled on their mobile number and address.
              </li>
            </ul>
          </section>

          {/* 12. Discounts, combo offers, and partial returns */}
          <section id="promotions" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              12. Discounts, Combo Offers, and Free Gifts
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <div className="space-y-3 text-xs sm:text-sm text-neutral-700">
              <p>
                <strong>Combo Pack & Bundle Returns:</strong> If you purchased a discounted bundle or promotional combo
                (e.g., Shampoo + Paw Cream Kit), all items comprising the combo must be returned together in unopened condition.
                Partial returns of individual combo components will result in the bundle discount being revoked and the retained
                items billed at their standard individual MRP.
              </p>
              <p>
                <strong>Free Gifts & Promotional Add-ons:</strong> Any complimentary item, free sample, or promotional gift received
                with your purchase must be returned alongside the main product. If the free gift is withheld or opened, its standard retail
                value will be deducted from your final credit amount.
              </p>
            </div>
          </section>

          {/* 13. Packaging and inspection requirements */}
          <section className="border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              13. Packaging and Inspection Requirements
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <p className="text-neutral-700 text-xs sm:text-sm">
              When preparing your return parcel for reverse courier pickup:
            </p>
            <ol className="mt-3 space-y-2 text-xs sm:text-sm text-neutral-700 list-decimal list-inside">
              <li>Ensure all bottle caps and dispenser pumps are closed tight and securely taped to prevent in-transit leaks.</li>
              <li>Place the items inside the original cardboard box with sufficient bubble wrapping or paper cushioning.</li>
              <li>Affix or write the Skylark Return RMA number and Order ID clearly on the outside of the parcel.</li>
              <li>Do not hand over any loose or unboxed items to the courier pickup executive.</li>
            </ol>
            <p className="mt-3 text-xs text-neutral-500">
              If an item is received at our facility broken or leaked due to inadequate customer repacking, the return claim will be invalidated.
            </p>
          </section>

          {/* 14. Return-to-origin shipments & Courier delays */}
          <section className="border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              14. Return-to-Origin (RTO) Shipments & Courier Delays
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <p className="text-neutral-700 text-xs sm:text-sm">
              Our courier partners attempt delivery up to <strong>3 times</strong> and contact the recipient via phone/SMS.
              If delivery fails due to an incorrect address, phone unreachable, or customer unavailability, the parcel is marked
              Return-to-Origin (RTO).
            </p>
            <p className="mt-2 text-neutral-700 text-xs sm:text-sm">
              For prepaid RTO orders, our team will reach out to confirm your correct delivery details for one free re-dispatch attempt.
              If the order is cancelled, a refund or store credit will be issued after deducting the non-refundable courier transit fee.
            </p>
          </section>

          {/* 15. Customer support and contact details */}
          <section id="support-contact" className="scroll-mt-24 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              15. Customer Support & Contact Information
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <p className="text-neutral-700 text-xs sm:text-sm mb-4">
              We are here to assist you and your furry companions. Reach out to our dedicated support desk through any of the channels below:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#faf8f5] border border-neutral-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gold mb-2">
                    <Phone size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ink">Phone Support</span>
                  </div>
                  <p className="text-xs text-neutral-600">Available Mon–Sat, 10 AM – 7 PM IST</p>
                  <a
                    href="tel:8059053151"
                    className="mt-2 block font-serif text-base font-bold text-ink hover:text-gold transition-colors"
                  >
                    +91 80590 53151
                  </a>
                </div>
                <a
                  href="tel:8059053151"
                  className="mt-3 inline-block text-[11px] font-bold text-gold underline"
                >
                  Call Now &rarr;
                </a>
              </div>

              <div className="p-4 bg-[#faf8f5] border border-neutral-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gold mb-2">
                    <Mail size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ink">Email Support</span>
                  </div>
                  <p className="text-xs text-neutral-600">Response within 24 business hours</p>
                  <a
                    href="mailto:grouptheskylark@gmail.com"
                    className="mt-2 block text-xs font-bold text-ink hover:text-gold transition-colors break-all"
                  >
                    grouptheskylark@gmail.com
                  </a>
                </div>
                <a
                  href="mailto:grouptheskylark@gmail.com"
                  className="mt-3 inline-block text-[11px] font-bold text-gold underline"
                >
                  Write an Email &rarr;
                </a>
              </div>

              <div className="p-4 bg-[#faf8f5] border border-neutral-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gold mb-2">
                    <MapPin size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ink">Head Office</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-snug">
                    FF 12 -A, Vandematram Crosswind,<br />
                    Near New S G Road, Gota,<br />
                    Ahmedabad – 382481, Gujarat, India
                  </p>
                </div>
                <span className="mt-3 text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                  Corporate Facility
                </span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
              <strong>Notice regarding return shipments:</strong> Do not send returned merchandise to our head office address
              without a pre-approved Return Authorization Ticket (RMA). Unsolicited deliveries cannot be acknowledged by our security desk.
            </div>
          </section>

          {/* 16. Legal terms and policy updates */}
          <section className="pt-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              16. Legal Terms & Policy Updates
            </h2>
            <div className="mt-1 h-[2px] w-8 bg-gold mb-4" />
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              Skylark Lifecare and Sciences reserves the right to revise or modify this Return, Exchange, and Refund Policy at any time
              without prior individual notice. Any modifications take effect immediately upon being posted on this website. All disputes,
              claims, and legal interpretations arising under this policy shall be subject to the exclusive jurisdiction of the competent
              courts located in <strong>Ahmedabad, Gujarat, India</strong>.
            </p>
          </section>
        </article>

        {/* BOTTOM HELP FAQ ACCORDION */}
        <section aria-labelledby="faq-heading" className="mt-12 bg-white p-6 sm:p-8 border border-neutral-200 shadow-xs">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold">Frequently Asked</span>
            <h2 id="faq-heading" className="font-serif text-2xl font-bold text-ink mt-0.5">
              Common Questions About Returns
            </h2>
          </div>

          <div className="divide-y divide-neutral-200">
            {[
              {
                q: 'How do I start a return or exchange?',
                a: 'Simply email grouptheskylark@gmail.com or WhatsApp us at +91 80590 53151 within 4 days of delivery. Share your Order ID, product details, reason for return, and your continuous unboxing video.',
              },
              {
                q: 'Why is an uncut unboxing video required?',
                a: 'Liquid pet care formulations can face courier transit mishandling. An uncut unboxing video protects both you and us by conclusively verifying that any leakage or damage occurred before opening.',
              },
              {
                q: 'What is the ₹220 return pickup charge?',
                a: 'If you wish to return or exchange an item for personal reasons (e.g. ordered by mistake or changed your mind), a ₹220 reverse courier fee applies. If the return is due to Skylark’s error (wrong product or defect), pickup is 100% free.',
              },
              {
                q: 'How long until I receive my refund or store credit?',
                a: 'Once the returned item reaches our facility and clears quality inspection (1–3 business days), store credit is issued within 24 hours. Bank or source account refunds reflect within 5–7 business days.',
              },
              {
                q: 'Can I return an opened pet shampoo or oral spray?',
                a: 'No. To ensure absolute safety and prevent biological cross-contamination between pets, items with broken seals, opened caps, or dispensed formulations cannot be returned or re-stocked.',
              },
            ].map((item, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between text-left font-bold text-xs sm:text-sm text-ink hover:text-gold transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <span className="ml-4 font-serif text-lg text-neutral-400">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <p className="mt-2 text-xs text-neutral-600 leading-relaxed animate-in fade-in">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM ACTION CTA */}
        <div className="mt-10 p-6 bg-footer text-white text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-bold">
            Still Have Questions About Your Pet's Care?
          </h2>
          <p className="mt-2 text-xs text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Our pet care advisors are ready to help you select the ideal gentle shampoo, soothing paw cream, or oral spray for your furry friend.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreProducts}
              className="px-5 py-2.5 bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold/90 transition-colors cursor-pointer"
            >
              Explore Products
            </button>
            <a
              href="https://wa.me/918059053151"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-neutral-800 border border-neutral-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              Chat With Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
