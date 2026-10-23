import { X, Phone, Mail, MapPin, Building, Globe, Check } from 'lucide-react';
import { useState } from 'react';

export const ownerDetails = {
  name: 'SKYLARK LIFECARE AND SCIENCES',
  phone: '8059053151',
  email: 'grouptheskylark@gmail.com',
  address: 'FF 12 -A, VANDEMATRAM CROSSWIND, NEAR NEW S G ROAD, GOTA, AHMEDABAD - 382481',
  state: 'GUJRAT',
  city: 'AHMEDABAD',
  pinCode: '382481',
};

export default function ContactModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyDetails = () => {
    const text = `Name: ${ownerDetails.name}\nPhone: ${ownerDetails.phone}\nEmail: ${ownerDetails.email}\nAddress: ${ownerDetails.address}\nCity: ${ownerDetails.city}\nState: ${ownerDetails.state}\nPin Code: ${ownerDetails.pinCode}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 md:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/20 text-gold">
            <Building size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-wider text-gold uppercase">Contact & Owner Details</p>
            <h3 className="font-serif text-xl font-bold text-ink">{ownerDetails.name}</h3>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-sm">
          <div className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3.5">
            <Phone size={18} className="mt-0.5 shrink-0 text-gold" />
            <div>
              <p className="text-[11px] font-medium text-neutral-500 uppercase">Phone Number</p>
              <a href={`tel:${ownerDetails.phone}`} className="font-semibold text-ink hover:text-gold transition-colors">
                +91 {ownerDetails.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3.5">
            <Mail size={18} className="mt-0.5 shrink-0 text-gold" />
            <div>
              <p className="text-[11px] font-medium text-neutral-500 uppercase">Email ID</p>
              <a href={`mailto:${ownerDetails.email}`} className="font-semibold text-ink hover:text-gold transition-colors">
                {ownerDetails.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3.5">
            <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
            <div className="flex-1">
              <p className="text-[11px] font-medium text-neutral-500 uppercase">Full Address</p>
              <p className="font-semibold text-ink leading-snug">{ownerDetails.address}</p>
              <div className="mt-2.5 grid grid-cols-3 gap-2 border-t border-neutral-200/60 pt-2 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">City</span>
                  <span className="font-semibold text-ink">{ownerDetails.city}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">State</span>
                  <span className="font-semibold text-ink">{ownerDetails.state}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">Pin Code</span>
                  <span className="font-semibold text-ink">{ownerDetails.pinCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`tel:${ownerDetails.phone}`}
            className="flex-1 min-w-[120px] flex h-10 items-center justify-center gap-2 rounded-xl bg-ink text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            <Phone size={14} /> Call Now
          </a>
          <a
            href={`mailto:${ownerDetails.email}`}
            className="flex-1 min-w-[120px] flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white text-xs font-semibold text-ink hover:bg-neutral-50 transition-colors"
          >
            <Mail size={14} /> Send Email
          </a>
          <button
            onClick={copyDetails}
            className="flex h-10 items-center justify-center gap-1.5 px-4 rounded-xl border border-neutral-300 bg-white text-xs font-semibold text-ink hover:bg-neutral-50 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : null}
            {copied ? 'Copied!' : 'Copy Info'}
          </button>
        </div>
      </div>
    </div>
  );
}
