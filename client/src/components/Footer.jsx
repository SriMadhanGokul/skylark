import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, MapPin, PawPrint, Building } from 'lucide-react';
import Img from './Img.jsx';
import { IMG } from '../data/content.js';

const quick = ['Home', 'Shop', 'Shop by Category', 'About Us', 'Contact'];
const cats = ['Pet Shampoos', 'Paw Creams', 'Deodorants', 'Oral Sprays'];

export default function Footer({ onContactClick }) {
  return (
    <footer id="contact" className="bg-footer text-white">
      <div className="mx-auto max-w-[900px] xl:max-w-[1280px] px-4 py-8 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div className="flex gap-4">
            <Img src={IMG.logo} alt="Skylark logo" className="h-[82px] w-[82px] shrink-0 rounded-full bg-white object-contain" placeholder="bg-teal-100" />
            <div>
              <p className="text-[13px] font-semibold leading-4 tracking-wide">SKYLARK LIFECARE<br />AND SCIENCES</p>
              <p className="mt-2 text-[8px] leading-[11px] text-neutral-300">Premium pet care products made with love and care. Gentle, safe and effective solutions for healthier, happier pets.</p>
              <div className="mt-3 flex gap-3">
                {[Facebook, Instagram, Youtube, MessageCircle].map((I, i) => (
                  <a key={i} href="#contact" aria-label="Social link" className="text-neutral-400 hover:text-gold transition-colors">
                    <I size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[11px] font-semibold text-gold uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-3 space-y-1.5 text-[9px] text-neutral-300">
              {quick.map((l) => (
                <li key={l}>
                  {l === 'Contact' ? (
                    <button onClick={onContactClick} className="hover:text-gold transition-colors text-left">
                      {l}
                    </button>
                  ) : (
                    <a href="#home" className="hover:text-gold transition-colors">{l}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-semibold text-gold uppercase tracking-wider">Shop Categories</h3>
            <ul className="mt-3 space-y-1.5 text-[9px] text-neutral-300">
              {cats.map((l) => (
                <li key={l}>
                  <a href="#categories" className="hover:text-gold transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:border-l lg:border-neutral-700/80 lg:pl-5">
            <h3 className="text-[11px] font-semibold text-gold uppercase tracking-wider">Contact Us</h3>
            <ul className="mt-3 space-y-2.5 text-[9px] text-neutral-300">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold" />
                <a href="tel:8059053151" className="hover:text-gold transition-colors">8059053151</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold" />
                <a href="mailto:grouptheskylark@gmail.com" className="hover:text-gold transition-colors">grouptheskylark@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span>FF 12 -A, VANDEMATRAM CROSSWIND, NEAR NEW S G ROAD, GOTA, AHMEDABAD - 382481</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dedicated Owner Details Section */}
        <div className="mt-8 rounded-xl border border-neutral-700/70 bg-neutral-900/80 p-4 lg:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gold/20 text-gold">
                <Building size={14} />
              </span>
              <div>
                <span className="text-[9px] font-bold tracking-wider text-gold uppercase">Business & Owner Details</span>
                <h4 className="text-[12px] font-bold text-white tracking-wide">SKYLARK LIFECARE AND SCIENCES</h4>
              </div>
            </div>
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="rounded-lg bg-gold/15 px-3 py-1 text-[9px] font-semibold text-gold hover:bg-gold hover:text-ink transition-all"
              >
                View Full Contact Card
              </button>
            )}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-[10px]">
            <div className="rounded-lg bg-neutral-800/50 p-2.5">
              <span className="text-neutral-400 block text-[8px] uppercase tracking-wider">Owner / Name</span>
              <span className="font-semibold text-white">SKYLARK LIFECARE AND SCIENCES</span>
            </div>
            <div className="rounded-lg bg-neutral-800/50 p-2.5">
              <span className="text-neutral-400 block text-[8px] uppercase tracking-wider">Phone Number</span>
              <a href="tel:8059053151" className="font-semibold text-gold hover:underline">8059053151</a>
            </div>
            <div className="rounded-lg bg-neutral-800/50 p-2.5">
              <span className="text-neutral-400 block text-[8px] uppercase tracking-wider">Email ID</span>
              <a href="mailto:grouptheskylark@gmail.com" className="font-semibold text-gold hover:underline break-all">grouptheskylark@gmail.com</a>
            </div>
            <div className="rounded-lg bg-neutral-800/50 p-2.5">
              <span className="text-neutral-400 block text-[8px] uppercase tracking-wider">City / State / Pin</span>
              <span className="font-semibold text-white">AHMEDABAD, GUJRAT – 382481</span>
            </div>
            <div className="sm:col-span-2 lg:col-span-4 rounded-lg bg-neutral-800/50 p-2.5">
              <span className="text-neutral-400 block text-[8px] uppercase tracking-wider">Full Address</span>
              <span className="text-neutral-200 font-medium">FF 12 -A, VANDEMATRAM CROSSWIND, NEAR NEW S G ROAD, GOTA, AHMEDABAD - 382481</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-700">
        <div className="mx-auto flex max-w-[900px] xl:max-w-[1280px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-[9px] text-neutral-300 lg:px-6">
          <span>© 2026 Skylark Lifecare and Sciences. All rights reserved.</span>
          <span className="flex items-center gap-2"><PawPrint size={12} className="text-white" /> Thoughtful care for every paw</span>
        </div>
      </div>
    </footer>
  );
}
