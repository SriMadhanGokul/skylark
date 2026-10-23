import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, MapPin, PawPrint } from 'lucide-react';
import Img from './Img.jsx';
import { IMG } from '../data/content.js';

const quick = [
  ['Home', '#home'],
  ['Shop', '#products'],
  ['Shop by Category', '#categories'],
  ['About Us', '#about'],
  ['Contact', '#contact'],
];

const cats = [
  ['Pet Shampoos', '#categories'],
  ['Paw Creams', '#categories'],
  ['Deodorants', '#categories'],
  ['Oral Sprays', '#categories'],
];

export default function Footer() {
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
              {quick.map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="hover:text-gold transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-semibold text-gold uppercase tracking-wider">Shop Categories</h3>
            <ul className="mt-3 space-y-1.5 text-[9px] text-neutral-300">
              {cats.map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="hover:text-gold transition-colors">{l}</a>
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
                <span>FF 12 -A, VANDEMATRAM CROSSWIND, NEAR NEW S G ROAD, GOTA, AHMEDABAD – 382481, GUJRAT</span>
              </li>
            </ul>
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
