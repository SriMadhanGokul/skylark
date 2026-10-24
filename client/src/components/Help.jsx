import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  AlertCircle,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  Clock,
  Video,
} from 'lucide-react';

export default function Help({ onBackHome, onExploreProducts }) {
  const [topSearch, setTopSearch] = useState('');
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [activeSection, setActiveSection] = useState('sec-01');
  const searchInputRef = useRef(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ScrollSpy to highlight active sidebar section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-policy-section]');
      let current = 'sec-01';
      const scrollPos = window.scrollY + 140;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const sectionsMeta = [
    { id: 'sec-01', num: '01', title: 'Return policy basics', keywords: 'return basics 4 days exchange store credit inspection' },
    { id: 'sec-02', num: '02', title: 'Products eligible for return', keywords: 'eligible criteria accepted rejected unwashed seals tags' },
    { id: 'sec-03', num: '03', title: 'Non-returnable products', keywords: 'non-returnable opened hygiene oral sprays used final sale' },
    { id: 'sec-04', num: '04', title: 'How to request a return', keywords: 'how to request steps whatsapp email rma photos order number' },
    { id: 'sec-05', num: '05', title: 'Unboxing video & photo proof', keywords: 'unboxing video mandatory proof continuous uncut label packaging' },
    { id: 'sec-06', num: '06', title: 'Return pickup', keywords: 'pickup courier attempts pin code self ship doorstep' },
    { id: 'sec-07', num: '07', title: 'Return shipping charges', keywords: 'charges 220 reverse pickup fee free shipping charges table' },
    { id: 'sec-08', num: '08', title: 'Exchange policy', keywords: 'exchange replacement different size variant 4 days dispatch' },
    { id: 'sec-09', num: '09', title: 'Refunds & store credit', keywords: 'refunds store credit 24 hours 5-7 days bank method account' },
    { id: 'sec-10', num: '10', title: 'Cash on Delivery (COD) orders', keywords: 'cod cash on delivery bank transfer upi neft refund rules' },
    { id: 'sec-11', num: '11', title: 'Prepaid orders', keywords: 'prepaid card upi net banking refund gateway account' },
    { id: 'sec-12', num: '12', title: 'Damaged or defective products', keywords: 'damaged defective transit leak broken nozzle 48 hours free replacement' },
    { id: 'sec-13', num: '13', title: 'Wrong product received', keywords: 'wrong item incorrect variant mismatch free replacement' },
    { id: 'sec-14', num: '14', title: 'Missing items', keywords: 'missing item bottle incomplete order 48 hours verification' },
    { id: 'sec-15', num: '15', title: 'Packing your return', keywords: 'packing bubble wrap carton tape order number slip secure' },
    { id: 'sec-16', num: '16', title: 'Return inspection', keywords: 'inspection quality check 1-2 days warehouse rejection reshipping' },
    { id: 'sec-17', num: '17', title: 'Refused delivery (RTO)', keywords: 'refused delivery rto return to origin courier attempts' },
    { id: 'sec-18', num: '18', title: 'Order cancellation', keywords: 'cancellation cancel order dispatch tracking awb' },
    { id: 'sec-19', num: '19', title: 'Sale, discount & combo offers', keywords: 'combo offers discount bundle kit pack prorated' },
    { id: 'sec-20', num: '20', title: 'Partial returns', keywords: 'partial return combo bundle recalculate individual mrp' },
    { id: 'sec-21', num: '21', title: 'Free gifts & promotional items', keywords: 'free gifts sample promotional freebie return together' },
    { id: 'sec-22', num: '22', title: 'Store credit rules', keywords: 'store credit voucher validity 12 months coupon code' },
    { id: 'sec-23', num: '23', title: 'Fraud & return abuse', keywords: 'fraud policy abuse fake claims multiple accounts COD block' },
    { id: 'sec-24', num: '24', title: 'Courier & pickup problems', keywords: 'courier delay tracking pin code failure service issue' },
    { id: 'sec-25', num: '25', title: 'Processing timeline', keywords: 'timeline table days hours credit refund approval pickup' },
    { id: 'sec-26', num: '26', title: 'Return address', keywords: 'return address warehouse facility gota ahmedabad self ship' },
    { id: 'sec-27', num: '27', title: 'Customer support', keywords: 'customer support contact whatsapp email hours seller details' },
    { id: 'sec-28', num: '28', title: 'Policy changes', keywords: 'policy changes updates effective date terms' },
    { id: 'sec-29', num: '29', title: 'Legal & general terms', keywords: 'legal general terms jurisdiction ahmedabad gujarat' },
  ];

  const filteredSections = useMemo(() => {
    if (!sidebarSearch.trim()) return sectionsMeta;
    const q = sidebarSearch.toLowerCase();
    return sectionsMeta.filter(
      (s) => s.title.toLowerCase().includes(q) || s.keywords.toLowerCase().includes(q) || s.num.includes(q)
    );
  }, [sidebarSearch]);

  const handlePopularSearch = (term) => {
    setTopSearch(term);
    // Find matching section and scroll to it
    const termLower = term.toLowerCase();
    const match = sectionsMeta.find((s) => s.title.toLowerCase().includes(termLower) || s.keywords.includes(termLower));
    if (match) {
      scrollToSection(match.id);
    }
  };

  const handleTopSearchSubmit = (e) => {
    e.preventDefault();
    if (!topSearch.trim()) return;
    const q = topSearch.toLowerCase();
    const match = sectionsMeta.find((s) => s.title.toLowerCase().includes(q) || s.keywords.includes(q));
    if (match) {
      scrollToSection(match.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D261E] font-sans selection:bg-[#B98A35]/20">
      {/* Top Banner Breadcrumb */}
      <div className="pt-8 pb-4 text-center">
        <p className="text-[11px] font-medium tracking-[0.25em] text-[#B98A35] uppercase">
          — CUSTOMER CARE —
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#2D261E]">
          Returns, Exchange <span className="font-serif italic font-light text-[#B98A35]">&</span> Refund Policy
        </h1>
        <p className="mx-auto mt-3 max-w-2xl px-4 text-xs sm:text-[13px] text-[#5C554B] leading-relaxed">
          Every Skylark product is carefully formulated and packed before it reaches you. If something isn’t right, this policy explains exactly what we can do, how long it takes, and what we need from you.
        </p>
        <p className="mt-2 text-[11px] text-[#8C8275]">
          Effective for orders placed from October 2026 &middot; Applies to orders on Skylark Lifecare &amp; Sciences
        </p>
      </div>

      {/* Main Outer Container */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pb-16">
        {/* Help Center Dark Search Card (Matches Screenshot 1) */}
        <div className="relative mx-auto my-6 overflow-hidden rounded-none border border-[#3A3027] bg-[#1C1814] p-6 sm:p-10 text-center text-white shadow-xl">
          {/* Subtle gold inner border */}
          <div className="pointer-events-none absolute inset-2 border border-[#B98A35]/25" />

          <p className="text-[10.5px] font-semibold tracking-[0.22em] text-[#D9B262] uppercase">
            — HELP CENTER —
          </p>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#EFE5D3]">
            How can we <span className="font-serif italic text-[#E9C77E]">help</span> you?
          </h2>
          <p className="mt-1 text-xs text-[#A89E8F]">
            Type your question in your own words and we’ll find the answer in this policy.
          </p>

          <form onSubmit={handleTopSearchSubmit} className="mx-auto mt-6 flex max-w-xl items-center bg-white p-1 shadow-sm">
            <Search size={18} className="ml-3 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={topSearch}
              onChange={(e) => setTopSearch(e.target.value)}
              placeholder="e.g. When will I get my refund?"
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-ink outline-none placeholder:text-neutral-400"
            />
            <button
              type="submit"
              className="bg-[#2D261E] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-black transition-colors cursor-pointer shrink-0"
            >
              Search
            </button>
          </form>

          {/* Popular Tag Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px]">
            <span className="text-[10px] uppercase tracking-wider text-[#A89E8F] mr-1">Popular:</span>
            {[
              'Refund time',
              'Damaged product',
              'Return window',
              'COD refund',
              'Combo return',
              'Cancel order',
              'Return fee',
              'Contact us',
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handlePopularSearch(tag)}
                className="rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1 text-neutral-300 hover:border-[#D9B262] hover:text-[#D9B262] transition-colors cursor-pointer text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-4 text-[11.5px] text-[#A89E8F]">
            Can’t find your answer?{' '}
            <a
              href="https://wa.me/918059053151"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#E9C77E] hover:underline"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </div>

        {/* 5 Policy Highlights Bar (Matches Screenshot 1) */}
        <div className="my-8 grid grid-cols-2 md:grid-cols-5 border border-[#E8DFD2] bg-white divide-y md:divide-y-0 md:divide-x divide-[#E8DFD2]">
          <div className="p-4 sm:p-5 text-center">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#2D261E]">4 days</div>
            <p className="mt-1 text-[11.5px] text-[#5C554B] leading-tight">
              to request a return or exchange from delivery
            </p>
          </div>
          <div className="p-4 sm:p-5 text-center">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#2D261E]">48 hrs</div>
            <p className="mt-1 text-[11.5px] text-[#5C554B] leading-tight">
              to report damaged, wrong or missing items
            </p>
          </div>
          <div className="p-4 sm:p-5 text-center col-span-2 md:col-span-1">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#2D261E]">Video</div>
            <p className="mt-1 text-[11.5px] text-[#5C554B] leading-tight">
              uncut unboxing video needed for damage &amp; wrong item claims
            </p>
          </div>
          <div className="p-4 sm:p-5 text-center">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#2D261E]">₹220</div>
            <p className="mt-1 text-[11.5px] text-[#5C554B] leading-tight">
              return pickup fee &middot; free if the mistake is ours
            </p>
          </div>
          <div className="p-4 sm:p-5 text-center">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#2D261E]">24 hrs</div>
            <p className="mt-1 text-[11.5px] text-[#5C554B] leading-tight">
              store credit issued after your return passes inspection
            </p>
          </div>
        </div>

        {/* How a Return Works Section (Matches Screenshot 1) */}
        <div className="my-8 border border-[#E8DFD2] bg-white p-6 sm:p-8">
          <h3 className="text-center font-serif text-xl sm:text-2xl font-normal text-[#2D261E]">
            How a return works
          </h3>
          <div className="relative mt-8">
            {/* Horizontal timeline connecting bar (hidden on mobile, visible on md+) */}
            <div className="absolute top-4 left-[10%] right-[10%] hidden h-[2px] bg-[#E8DFD2] md:block" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-4 text-center">
              {[
                { step: '1', title: 'Request', sub: 'within 4 days of delivery' },
                { step: '2', title: 'Approval', sub: 'within 24 - 48 hours' },
                { step: '3', title: 'Pickup', sub: 'in 2 - 5 business days' },
                { step: '4', title: 'Inspection', sub: '1 - 3 business days after we receive it' },
                { step: '5', title: 'Credit / Refund', sub: 'credit in 24 hrs · bank in 5 - 7 business days' },
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#2D261E] font-serif text-sm font-bold text-white shadow-xs">
                    {item.step}
                  </div>
                  <h4 className="mt-2 text-xs sm:text-[13px] font-bold text-[#2D261E]">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-[#6E6557] max-w-[150px]">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN TWO-COLUMN LAYOUT: Sticky Left Sidebar + Right Policy Content */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 xl:gap-12 items-start">
          {/* LEFT COLUMN: Sticky Sidebar with Search and 29 Content Items */}
          <aside className="lg:sticky lg:top-24 bg-[#FAF7F2] pb-6">
            {/* Search This Policy Box */}
            <div className="relative mb-4">
              <label className="flex items-center rounded-none border border-[#D5CABE] bg-white px-2.5 py-1.5 focus-within:border-[#B98A35] transition-colors">
                <Search size={14} className="text-[#8C8275] shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  placeholder="Search this policy"
                  className="w-full bg-transparent px-2 text-[12px] text-ink outline-none placeholder:text-neutral-400"
                />
                <kbd className="hidden sm:inline-block rounded border border-[#E8DFD2] bg-neutral-50 px-1.5 py-0.5 text-[10px] text-neutral-400">
                  /
                </kbd>
              </label>
            </div>

            <h3 className="text-[11px] font-bold tracking-[0.16em] text-[#8C8275] uppercase mb-2">
              CONTENTS
            </h3>

            {/* List of 29 items */}
            <nav className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-[11px] space-y-0.5 scrollbar-thin">
              {filteredSections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex w-full items-start gap-1.5 py-1 text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'font-bold text-[#9D690A] pl-1 border-l-2 border-[#B98A35]'
                        : 'text-[#6E6557] hover:text-[#2D261E]'
                    }`}
                  >
                    <span className="shrink-0 font-mono text-[10.5px] text-[#9D690A]/80">{sec.num}</span>
                    <span className="leading-snug">{sec.title}</span>
                  </button>
                );
              })}
              {filteredSections.length === 0 && (
                <p className="py-2 text-[11px] text-neutral-400 italic">No matching sections found</p>
              )}
            </nav>
          </aside>

          {/* RIGHT COLUMN: The Complete Policy Content with Exact Headings & Tables */}
          <div className="space-y-12 text-[#3D352B] leading-relaxed text-[13px]">
            {/* 01 Return policy basics */}
            <section id="sec-01" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6 first:border-t-0 first:pt-0">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">01</span> Return policy basics
              </h3>
              <p className="mt-3">
                You can request a return or exchange within <strong>4 days of delivery</strong>, as shown on the courier’s tracking. Requests raised after this window cannot be accepted, except where the law requires otherwise.
              </p>

              <div className="mt-4 overflow-x-auto border border-[#E8DFD2]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4EFE6] text-[#2D261E] font-bold border-b border-[#E8DFD2]">
                    <tr>
                      <th className="p-3 w-1/2">Reason for return</th>
                      <th className="p-3 w-1/2">What we offer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFD2] bg-white">
                    <tr>
                      <td className="p-3 align-top font-medium text-[#2D261E]">Changed your mind / didn’t like the product or scent</td>
                      <td className="p-3 align-top">Exchange or store credit</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-[#2D261E]">Damaged, defective, wrong or missing item (our mistake)</td>
                      <td className="p-3 align-top">Free replacement. If a replacement isn’t available: refund to your original payment method (prepaid) or bank/UPI (COD)</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-[#2D261E]">Wrong size / variant selected (e.g. 330ml vs 1L or different formula)</td>
                      <td className="p-3 align-top">Exchange for a different size/variant, subject to availability</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-[12.5px] text-[#5C554B]">
                COD and prepaid orders follow the same return rules. Only the way money is returned differs (see{' '}
                <button onClick={() => scrollToSection('sec-10')} className="font-bold underline text-[#2D261E] cursor-pointer">COD</button> and{' '}
                <button onClick={() => scrollToSection('sec-11')} className="font-bold underline text-[#2D261E] cursor-pointer">Prepaid</button>). Every return is accepted only if the product passes our{' '}
                <button onClick={() => scrollToSection('sec-16')} className="font-bold underline text-[#2D261E] cursor-pointer">quality inspection</button>.
              </p>
            </section>

            {/* 02 Products eligible for return */}
            <section id="sec-02" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">02</span> Products eligible for return
              </h3>
              <p className="mt-3">
                A product is eligible for return or exchange only if <strong>all</strong> of the following are true:
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-[#E8DFD2] bg-white p-4">
                  <h4 className="font-bold text-xs text-[#2D261E] border-b border-[#E8DFD2] pb-2 mb-3">
                    Accepted when the product is
                  </h4>
                  <ul className="space-y-2 text-xs text-[#5C554B]">
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Unused, unpumped and unapplied</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>In its original packaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>With all tags, seals and labels still attached</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Free of pet hair, bodily fluids, leakage or tampering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Not diluted, mixed or altered</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Complete, with cap, pump nozzle, outer carton and any included items intact</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-[#E8DFD2] bg-white p-4">
                  <h4 className="font-bold text-xs text-[#2D261E] border-b border-[#E8DFD2] pb-2 mb-3">
                    Rejected when the product has
                  </h4>
                  <ul className="space-y-2 text-xs text-[#5C554B]">
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>Signs of dispensing, pumping or usage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>Broken safety seal, opened inner foil or torn shrink wrap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>Pet residue, fur or dirt on the bottle/container</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>Missing tags, carton box or batch label scratched off</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 03 Non-returnable products */}
            <section id="sec-03" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">03</span> Non-returnable products
              </h3>
              <p className="mt-3">
                The following cannot be returned or exchanged unless they arrived damaged, defective or incorrect:
              </p>
              <ul className="mt-3 space-y-1.5 text-xs sm:text-[12.5px] text-[#5C554B] list-disc list-inside">
                <li>Used, tested, diluted or partially emptied bottles</li>
                <li>Opened pet oral sprays, dental drops or hygiene solutions (for pet health safety)</li>
                <li>Customized bundles or personalized pet grooming sets done on request</li>
                <li>Bottles with broken seals, missing pump locks or defaced batch codes</li>
                <li>Products damaged by the customer or improper storage</li>
                <li>Products returned without original secondary packaging or outer box</li>
                <li>Clearance or <strong>Final Sale</strong> products (clearly marked on the product page)</li>
                <li>Free gifts and promotional items returned on their own (see <button onClick={() => scrollToSection('sec-21')} className="font-bold underline text-[#2D261E] cursor-pointer">free gifts</button>)</li>
              </ul>
            </section>

            {/* 04 How to request a return */}
            <section id="sec-04" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">04</span> How to request a return
              </h3>
              <p className="mt-3">
                Return and exchange requests are accepted <strong>only on WhatsApp or email</strong>. We don’t accept requests through courier partners, social media comments or phone calls.
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B98A35] text-xs font-serif text-[#B98A35]">
                    1
                  </div>
                  <p className="text-xs sm:text-[12.5px]">
                    <strong>Contact us within 4 days of delivery</strong> on WhatsApp (
                    <a href="https://wa.me/918059053151" className="font-semibold underline text-[#2D261E]">
                      +91 80590 53151
                    </a>
                    , or tap the chat bubble on our website) or email{' '}
                    <a href="mailto:grouptheskylark@gmail.com" className="font-semibold underline text-[#2D261E]">
                      grouptheskylark@gmail.com
                    </a>.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B98A35] text-xs font-serif text-[#B98A35]">
                    2
                  </div>
                  <p className="text-xs sm:text-[12.5px]">
                    <strong>Share your details:</strong> order number (e.g. #1234), the phone number or email used for the order, the item(s) you want to return, and the reason.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B98A35] text-xs font-serif text-[#B98A35]">
                    3
                  </div>
                  <p className="text-xs sm:text-[12.5px]">
                    <strong>Send clear photos</strong> of the product (front, back, seal, nozzle and packaging). For damaged, defective, wrong or missing items, also send the{' '}
                    <button onClick={() => scrollToSection('sec-05')} className="font-bold underline text-[#2D261E] cursor-pointer">unboxing video</button>.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B98A35] text-xs font-serif text-[#B98A35]">
                    4
                  </div>
                  <p className="text-xs sm:text-[12.5px]">
                    <strong>Get our decision within 24–48 hours.</strong> If approved, we’ll confirm pickup or share self-shipping instructions. If rejected, we’ll explain why.
                  </p>
                </div>
              </div>

              <div className="mt-4 border-l-2 border-[#B98A35] bg-[#FFFBF3] p-3 text-xs text-[#6E5930]">
                Please don’t send a product back without approval. Unapproved returns cannot be processed and may be sent back to you at your cost.
              </div>
            </section>

            {/* 05 Unboxing video & photo proof */}
            <section id="sec-05" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">05</span> Unboxing video &amp; photo proof
              </h3>

              <div className="my-3 border-l-2 border-red-500 bg-[#FFF5F5] p-3.5 text-xs text-red-900 leading-relaxed">
                <strong>An unboxing video is mandatory for every damaged, defective, wrong-item or missing-item claim.</strong> Without it, we cannot verify the claim with our courier partners and the claim cannot be approved.
              </div>

              <h4 className="font-bold text-xs text-[#2D261E] mt-3 mb-2">Your video must:</h4>
              <ul className="space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>Be one continuous, uncut recording with no pauses or edits</li>
                <li>Start with the <strong>sealed</strong> package, showing the shipping label and order details clearly</li>
                <li>Show all sides of the package (360&deg;) before opening</li>
                <li>Show the opening of the package and every item inside</li>
                <li>Clearly show the damage, defect, leakage or difference you are reporting</li>
              </ul>
              <p className="mt-3 text-xs text-[#6E6557]">
                If the package looks tampered with, torn or wet at delivery, start recording <strong>before</strong> accepting it from the courier, or refuse the delivery and contact us right away.
              </p>
            </section>

            {/* 06 Return pickup */}
            <section id="sec-06" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">06</span> Return pickup
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>Once your return is approved, we arrange a reverse pickup through our courier partner, usually within <strong>2–5 business days</strong>.</li>
                <li>Pickup depends on courier service at your PIN code. If pickup isn’t available, you’ll need to <strong>self-ship</strong> the parcel to our <button onClick={() => scrollToSection('sec-26')} className="font-bold underline text-[#2D261E] cursor-pointer">return address</button>.</li>
                <li>The courier will make up to <strong>2 pickup attempts</strong>. Please keep the parcel packed and ready, and make sure someone is available at the address.</li>
                <li>If both attempts fail because nobody was available or the parcel wasn’t ready, the request will be closed. You may then self-ship the parcel within 5 days at your own cost.</li>
                <li>Please hand over the parcel only to the courier partner we have assigned, and keep the pickup receipt or AWB number.</li>
              </ul>
            </section>

            {/* 07 Return shipping charges */}
            <section id="sec-07" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">07</span> Return shipping charges
              </h3>

              <div className="mt-3 overflow-x-auto border border-[#E8DFD2]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4EFE6] text-[#2D261E] font-bold border-b border-[#E8DFD2]">
                    <tr>
                      <th className="p-3 w-1/2">Situation</th>
                      <th className="p-3 w-1/2">Return charge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFD2] bg-white">
                    <tr>
                      <td className="p-3 align-top font-medium text-[#2D261E]">Damaged, defective, wrong or missing item</td>
                      <td className="p-3 align-top"><strong>Free:</strong> we cover pickup and replacement shipping</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-[#2D261E]">Change of mind / didn’t like it</td>
                      <td className="p-3 align-top"><strong>₹220</strong> pickup &amp; handling fee, deducted from your store credit or exchange value</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-[#2D261E]">Size / variant exchange (unopened / ready to swap)</td>
                      <td className="p-3 align-top">First exchange: <strong>₹220</strong> &middot; Repeated exchanges: <strong>₹220</strong> each</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-[#2D261E]">Self-shipped (pickup unavailable at your PIN code)</td>
                      <td className="p-3 align-top">You pay the courier. For damaged, defective or wrong items, we reimburse up to ₹150 as store credit on receipt of the courier bill</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs text-[#6E6557]">
                Original shipping charges, COD charges and gift-wrap charges are <strong>non-refundable</strong>, except when the return is caused by our mistake.
              </p>
            </section>

            {/* 08 Exchange policy */}
            <section id="sec-08" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">08</span> Exchange policy
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>Exchanges must be requested within 4 days of delivery.</li>
                <li>You can exchange for the same product in a different size or scent, or for a different pet care formulation.</li>
                <li><strong>Higher-priced product:</strong> you pay the difference before we dispatch the new product.</li>
                <li><strong>Lower-priced product:</strong> the difference is added to your account as store credit.</li>
                <li>For change-of-mind exchanges, the ₹220 pickup fee applies. Shipping for the new product is free.</li>
                <li>If the product you want is out of stock, you can choose another product or receive store credit for the value.</li>
                <li>The replacement product is dispatched only after the returned product passes inspection.</li>
                <li>Each order can be exchanged once. Exchanged products cannot be returned for store credit.</li>
              </ul>
            </section>

            {/* 09 Refunds & store credit */}
            <section id="sec-09" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">09</span> Refunds &amp; store credit
              </h3>
              <p className="mt-3">
                For change-of-mind returns, we issue <strong>store credit</strong> for the amount you paid for the returned product(s), minus the return fee. Cash refunds are given only when we made a mistake and can’t offer a replacement.
              </p>

              <div className="mt-3 overflow-x-auto border border-[#E8DFD2]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4EFE6] text-[#2D261E] font-bold border-b border-[#E8DFD2]">
                    <tr>
                      <th className="p-3 w-1/3">Case</th>
                      <th className="p-3 w-1/3">How you get your money</th>
                      <th className="p-3 w-1/3">Time after approval</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFD2] bg-white">
                    <tr>
                      <td className="p-3 align-top font-medium text-[#2D261E]">Change of mind</td>
                      <td className="p-3 align-top">Store credit on your Skylark account</td>
                      <td className="p-3 align-top">Within 24 hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-[#2D261E]">Our mistake, prepaid order</td>
                      <td className="p-3 align-top">Original payment method</td>
                      <td className="p-3 align-top">5–7 business days</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-[#2D261E]">Our mistake, COD order</td>
                      <td className="p-3 align-top">Bank transfer or UPI</td>
                      <td className="p-3 align-top">5–7 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs text-[#6E6557]">
                Store credit is added to the account linked to your order email or phone number, and we confirm it on WhatsApp or email. Full store credit rules are in <button onClick={() => scrollToSection('sec-22')} className="font-bold underline text-[#2D261E] cursor-pointer">section 22</button>.
              </p>
            </section>

            {/* 10 Cash on Delivery (COD) orders */}
            <section id="sec-10" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">10</span> Cash on Delivery (COD) orders
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>COD orders are eligible for returns and exchanges under the same rules as prepaid orders.</li>
                <li>Change-of-mind returns are refunded as <strong>store credit</strong>.</li>
                <li>Approved cash refunds (our mistake, no replacement available) are sent by <strong>bank transfer or UPI</strong>.</li>
                <li>For a bank refund, please share the account holder name, account number and IFSC code. For UPI, share your UPI ID. The account should be in the name of the person who placed the order.</li>
                <li>COD handling charges are non-refundable.</li>
              </ul>
            </section>

            {/* 11 Prepaid orders */}
            <section id="sec-11" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">11</span> Prepaid orders
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>Change-of-mind returns are refunded as <strong>store credit</strong>.</li>
                <li>Approved cash refunds go back to the <strong>original payment method</strong> (card, UPI, net banking or wallet).</li>
                <li>We start the refund within 24 hours of approval. Your bank or payment gateway usually takes <strong>5–7 business days</strong> to show it in your account.</li>
                <li>Any prepaid discount you received is adjusted proportionally in the refund amount.</li>
              </ul>
            </section>

            {/* 12 Damaged or defective products */}
            <section id="sec-12" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">12</span> Damaged or defective products
              </h3>
              <p className="mt-3">
                Report damage or defects within <strong>48 hours of delivery</strong> with your unboxing video and photos.
              </p>

              <h4 className="font-bold text-xs text-[#2D261E] mt-3 mb-1">What counts as a defect:</h4>
              <ul className="space-y-1 text-xs text-[#5C554B] list-disc list-inside">
                <li>Manufacturing packaging defects such as broken pump dispenser, cracked cap or loose seal</li>
                <li>Bottle leakage or damaged container during transit</li>
                <li>Product texture separation, contamination or discolouration upon first unboxing</li>
                <li>Variant or formulation clearly different from what was ordered</li>
              </ul>

              <h4 className="font-bold text-xs text-[#2D261E] mt-3 mb-1">What doesn’t count as a defect:</h4>
              <ul className="space-y-1 text-xs text-[#5C554B] list-disc list-inside">
                <li>Slight natural aroma or herbal color variation across botanical batches (Neem, Tulsi, Aloe extracts)</li>
                <li>Pet disliking a fragrance (scent preference is personal and not a manufacturing defect)</li>
                <li>Damage or leakage caused by customer dropping or mishandling the product</li>
              </ul>

              <p className="mt-3 text-xs text-[#6E6557]">
                After verification (usually within 24–48 hours), we arrange a <strong>free pickup and a free replacement</strong>. If a replacement isn’t available, you can choose another product or receive a refund to your original payment method or bank/UPI.
              </p>
            </section>

            {/* 13 Wrong product received */}
            <section id="sec-13" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">13</span> Wrong product received
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>Contact us within <strong>48 hours of delivery</strong> with your unboxing video and photos of the product and its label.</li>
                <li>Keep the product unused, with tags, pump locks and packaging intact.</li>
                <li>Once verified, we’ll arrange a free pickup of the wrong product and ship the correct one. You won’t be charged anything.</li>
                <li>If the correct product is out of stock, you can choose an alternative or get a full refund.</li>
              </ul>
            </section>

            {/* 14 Missing items */}
            <section id="sec-14" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">14</span> Missing items
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>Report missing items within <strong>48 hours of delivery</strong>.</li>
                <li>Share your unboxing video, a photo of the outer package and shipping label, and photos of the items you received.</li>
                <li>We’ll investigate with our warehouse and courier partner. This usually takes 3–5 business days.</li>
                <li>If confirmed, we’ll ship the missing item free of charge or refund its value.</li>
              </ul>
            </section>

            {/* 15 Packing your return */}
            <section id="sec-15" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">15</span> Packing your return
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>Check that all bottle caps and pump dispensers are firmly locked to avoid in-transit spills.</li>
                <li>Place the product neatly in its original packaging, with all tags and any included accessories.</li>
                <li>Use a strong, protective outer box with bubble wrap and seal it properly.</li>
                <li>Write your order number on a slip and place it inside the parcel.</li>
                <li>Products damaged in transit because of poor packaging may be rejected.</li>
              </ul>
            </section>

            {/* 16 Return inspection */}
            <section id="sec-16" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">16</span> Return inspection
              </h3>
              <p className="mt-3">
                Every returned product is inspected within <strong>1–3 business days</strong> of reaching our warehouse. Approval of your request is <strong>not</strong> automatic acceptance of the return: store credit, refunds and exchanges are processed only after the product passes inspection.
              </p>
              <p className="mt-2">
                If the product doesn’t meet the conditions in <button onClick={() => scrollToSection('sec-02')} className="font-bold underline text-[#2D261E] cursor-pointer">section 2</button>, we’ll share photos of the issue and send the product back to you. Reshipping charges of ₹220 apply in that case.
              </p>
            </section>

            {/* 17 Refused delivery (RTO) */}
            <section id="sec-17" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">17</span> Refused delivery (RTO)
              </h3>
              <p className="mt-3">
                Refusing a delivery is not the same as a return. When a parcel is refused or can’t be delivered, it is returned to us (RTO) and we pay shipping both ways.
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li><strong>Prepaid orders:</strong> we deduct the forward shipping cost and reverse shipping cost before issuing store credit or refund.</li>
                <li><strong>COD orders:</strong> we reserve the right to disable COD on your account for future purchases if multiple deliveries are refused.</li>
              </ul>
            </section>

            {/* 18 Order cancellation */}
            <section id="sec-18" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">18</span> Order cancellation
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>You can cancel an order free of charge at any time <strong>before it is dispatched</strong>.</li>
                <li>Once an order is handed over to the courier and assigned an AWB tracking code, it cannot be cancelled. You can accept the parcel and request a return under our standard policy.</li>
                <li>To cancel, message us on WhatsApp with your Order ID as early as possible.</li>
              </ul>
            </section>

            {/* 19 Sale, discount & combo offers */}
            <section id="sec-19" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">19</span> Sale, discount &amp; combo offers
              </h3>
              <p className="mt-3">
                Products purchased during promotional events, flash sales or combo offers follow the same return rules unless specifically marked "Final Sale".
              </p>
              <p className="mt-2 text-xs text-[#5C554B]">
                If a promo code applied a flat discount or percent off across multiple items, the discount is distributed proportionally. Returns on such orders will receive store credit based on the discounted net amount paid, not full MRP.
              </p>
            </section>

            {/* 20 Partial returns */}
            <section id="sec-20" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">20</span> Partial returns
              </h3>
              <p className="mt-3">
                If you ordered multiple individual products, you may return just one item. However, if the items were purchased as part of a bundled combo kit (e.g. Grooming Duo Pack), returning one item dissolves the bundle discount. The kept item will be charged at its regular single unit price and the difference adjusted in your store credit.
              </p>
            </section>

            {/* 21 Free gifts & promotional items */}
            <section id="sec-21" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">21</span> Free gifts &amp; promotional items
              </h3>
              <p className="mt-3">
                If your order included a free gift (e.g. complimentary paw balm or pet wipe sample), the gift must be returned in unopened condition along with the main item. If the gift is kept or opened, its retail value will be deducted from your store credit or refund amount.
              </p>
            </section>

            {/* 22 Store credit rules */}
            <section id="sec-22" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">22</span> Store credit rules
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>Store credit is issued as a unique digital coupon code or added to your registered mobile/email profile.</li>
                <li>Store credit is valid for <strong>12 months</strong> from the date of issue.</li>
                <li>It can be used on any future Skylark order with no minimum cart value constraint.</li>
                <li>Store credit cannot be transferred to a bank account or redeemed for physical cash.</li>
              </ul>
            </section>

            {/* 23 Fraud & return abuse */}
            <section id="sec-23" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">23</span> Fraud &amp; return abuse
              </h3>
              <p className="mt-3">
                We monitor return patterns to protect genuine pet owners and ensure sustainable service. The following activities may result in permanent suspension of account services:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-[#5C554B] list-disc list-inside">
                <li>Fake damage, defect or missing-item claims, or edited videos</li>
                <li>Returning products other than the ones we delivered (e.g. returning an empty bottle or older batch)</li>
                <li>Suspicious orders, or multiple accounts used to misuse offers or returns</li>
              </ul>
              <p className="mt-2 text-xs text-[#6E6557]">
                In such cases, we may decline the return, send the product back, disable COD or returns for the account, or cancel future orders.
              </p>
            </section>

            {/* 24 Courier & pickup problems */}
            <section id="sec-24" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">24</span> Courier &amp; pickup problems
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5C554B] list-disc list-inside">
                <li>Reverse pickup depends on courier service availability at your PIN code.</li>
                <li>Please make sure your address and phone number are correct. Pickups can fail if the courier can’t reach you.</li>
                <li>Keep the parcel packed and ready before the pickup date.</li>
                <li>If the courier refuses pickup (for example because of poor packaging or service issues), or the pickup fails, message us on WhatsApp with your order number. We’ll reschedule once or share self-shipping instructions.</li>
                <li>We are not responsible for delays caused by courier partners, but we’ll follow up on your behalf.</li>
              </ul>
            </section>

            {/* 25 Processing timeline */}
            <section id="sec-25" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">25</span> Processing timeline
              </h3>

              <div className="mt-3 overflow-x-auto border border-[#E8DFD2]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4EFE6] text-[#2D261E] font-bold border-b border-[#E8DFD2]">
                    <tr>
                      <th className="p-3 w-1/2">Step</th>
                      <th className="p-3 w-1/2">Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFD2] bg-white">
                    <tr>
                      <td className="p-3 font-medium text-[#2D261E]">Return / exchange request</td>
                      <td className="p-3">Within 4 days of delivery</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[#2D261E]">Damaged / wrong / missing report</td>
                      <td className="p-3">Within 48 hours of delivery</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[#2D261E]">Approval or rejection</td>
                      <td className="p-3">24 - 48 hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[#2D261E]">Reverse pickup</td>
                      <td className="p-3">2 - 5 business days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[#2D261E]">Inspection after receipt</td>
                      <td className="p-3">1 - 3 business days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[#2D261E]">Store credit</td>
                      <td className="p-3">Within 24 hours after inspection</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[#2D261E]">Exchange dispatch</td>
                      <td className="p-3">Within 2 business days after inspection</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[#2D261E]">Bank / UPI / original payment refund</td>
                      <td className="p-3">5 - 7 business days after approval</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 26 Return address */}
            <section id="sec-26" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">26</span> Return address
              </h3>
              <p className="mt-3">
                Use this address <strong>only after your return is approved</strong> and we’ve asked you to self-ship:
              </p>

              <div className="mt-4 border border-[#E8DFD2] bg-white p-4 max-w-md">
                <p className="font-bold text-xs text-[#2D261E]">Skylark Lifecare and Sciences</p>
                <p className="mt-1 text-xs text-[#5C554B] leading-relaxed">
                  FF 12 -A, Vandematram Crosswind,<br />
                  Near New S G Road, Gota,<br />
                  Ahmedabad, Gujarat – 382481, India<br />
                  Phone: +91 80590 53151
                </p>
              </div>

              <p className="mt-3 text-xs text-[#6E6557]">
                Pack the parcel as described in <button onClick={() => scrollToSection('sec-15')} className="font-bold underline text-[#2D261E] cursor-pointer">section 15</button>, include a slip with your order number, and send us the courier tracking number on WhatsApp or email. Please use a trackable courier service. We are not responsible for parcels lost in transit when you self-ship.
              </p>
            </section>

            {/* 27 Customer support */}
            <section id="sec-27" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">27</span> Customer support
              </h3>
              <p className="mt-3">
                Skylark has <strong>only two official contact channels</strong>: the WhatsApp number and the email address below. Please keep your order number ready when you reach out.
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/918059053151"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-[#E8DFD2] bg-white p-4 hover:border-[#B98A35] transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C8275]">WHATSAPP</span>
                    <div className="font-bold text-sm text-[#2D261E]">+91 80590 53151</div>
                    <span className="text-[10.5px] text-[#6E6557]">Tap the chat bubble on our website</span>
                  </div>
                </a>

                <a
                  href="mailto:grouptheskylark@gmail.com"
                  className="flex items-center gap-3 border border-[#E8DFD2] bg-white p-4 hover:border-[#B98A35] transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2D261E] text-white">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C8275]">EMAIL</span>
                    <div className="font-bold text-xs sm:text-sm text-[#2D261E] break-all">grouptheskylark@gmail.com</div>
                    <span className="text-[10.5px] text-[#6E6557]">For returns, refunds &amp; order help</span>
                  </div>
                </a>
              </div>

              {/* Security Alert Card (Matches Screenshot 2) */}
              <div className="mt-4 border-l-2 border-red-400 bg-[#FFF8F6] p-4 text-xs text-[#4A2018] leading-relaxed">
                <p className="font-bold text-red-950 mb-1">
                  Please contact us only on +91 80590 53151 (WhatsApp) or grouptheskylark@gmail.com.
                </p>
                <p>
                  Any other phone number, WhatsApp account, email address, social media profile or website claiming to be Skylark or its support team does <strong>not</strong> belong to us.
                </p>
                <p className="mt-1">
                  For your safety, Skylark will <strong>never</strong> ask for your OTP, UPI PIN, card details or passwords, ask you to install any app, or ask you to pay into a personal bank account or UPI ID to process a return, refund or order.
                </p>
                <p className="mt-1">
                  We kindly request you not to share order or payment details through any other channel. <strong>Skylark is not responsible for any loss, fraud or misuse that happens when a customer communicates or makes payments through any contact other than our two official channels.</strong> If you are unsure whether a message is genuine, please verify with us on our official WhatsApp number first.
                </p>
              </div>

              <div className="mt-4 space-y-1 text-xs text-[#5C554B]">
                <p><strong>Working hours:</strong> Monday to Saturday, 10:00 AM – 7:00 PM IST (closed on Sundays and public holidays)</p>
                <p><strong>Response time:</strong> WhatsApp within 4 working hours &middot; Email within 24–48 hours</p>
                <p><strong>Always include:</strong> your order number and the phone number or email used for the order</p>
              </div>

              <h4 className="font-bold text-xs text-[#2D261E] mt-5 mb-2">Seller information</h4>
              <div className="overflow-x-auto border border-[#E8DFD2]">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-[#E8DFD2] bg-white">
                    <tr>
                      <td className="p-3 w-1/3 bg-[#F4EFE6] font-bold text-[#2D261E]">Legal name</td>
                      <td className="p-3">Skylark Lifecare and Sciences</td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-[#F4EFE6] font-bold text-[#2D261E]">Brand / store name</td>
                      <td className="p-3">Skylark (skylark-48h2.vercel.app)</td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-[#F4EFE6] font-bold text-[#2D261E]">GSTIN</td>
                      <td className="p-3">24CRIPM5064J2ZH</td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-[#F4EFE6] font-bold text-[#2D261E]">Registered address</td>
                      <td className="p-3">FF 12 -A, Vandematram Crosswind, Near New S G Road, Gota, Ahmedabad, Gujarat – 382481, India</td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-[#F4EFE6] font-bold text-[#2D261E]">Email</td>
                      <td className="p-3">
                        <a href="mailto:grouptheskylark@gmail.com" className="underline text-[#2D261E]">grouptheskylark@gmail.com</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-[#F4EFE6] font-bold text-[#2D261E]">WhatsApp</td>
                      <td className="p-3">
                        <a href="https://wa.me/918059053151" className="underline text-[#2D261E]">+91 80590 53151</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 28 Policy changes */}
            <section id="sec-28" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">28</span> Policy changes
              </h3>
              <p className="mt-3">
                Skylark may update this policy from time to time. Changes apply to orders placed after the updated policy is published. Existing orders follow the policy in effect on the date of purchase. The effective date is shown at the top of this page.
              </p>
            </section>

            {/* 29 Legal & general terms */}
            <section id="sec-29" data-policy-section className="scroll-mt-24 border-t border-[#E8DFD2] pt-6">
              <h3 className="font-serif text-2xl font-normal text-[#2D261E]">
                <span className="font-serif text-lg text-[#B98A35] mr-2">29</span> Legal &amp; general terms
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-[#5C554B] list-disc list-inside">
                <li>Skylark is a brand owned and operated by <strong>Skylark Lifecare and Sciences</strong> (GSTIN 24CRIPM5064J2ZH), Ahmedabad, Gujarat, India. All sales on skylark-48h2.vercel.app are made by Skylark Lifecare and Sciences, and GST invoices are issued in this name.</li>
                <li>This policy is governed by the laws of India, including the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020. Nothing in this policy limits your statutory rights.</li>
                <li>Decisions on returns are made after physical inspection of the product, in line with this policy.</li>
                <li>We are not responsible for delays caused by events beyond our control, such as natural disasters, strikes, pandemics, government restrictions or courier disruptions.</li>
                <li>To the extent permitted by law, our liability for any order is limited to the amount paid for that order.</li>
                <li>Any disputes are subject to the exclusive jurisdiction of the competent courts in <strong>Ahmedabad, Gujarat</strong>.</li>
              </ul>
            </section>

            {/* Bottom Quote (Matches Screenshot 2) */}
            <div className="border-t border-[#E8DFD2] pt-12 pb-6 text-center">
              <p className="font-serif italic text-base sm:text-lg text-[#5C554B]">
                Thank you for choosing Skylark. Every pet product we send is formulated with care, and we’re here on WhatsApp whenever you need us.
              </p>
              <div className="mx-auto mt-4 h-[1px] w-24 bg-[#E8DFD2]" />
              <p className="mt-3 text-[10.5px] text-[#8C8275]">
                Skylark Lifecare and Sciences &middot; GSTIN 24CRIPM5064J2ZH &middot; FF 12 -A, Vandematram Crosswind, Gota, Ahmedabad, Gujarat 382481, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
