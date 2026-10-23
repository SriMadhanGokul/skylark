import { ArrowRight, Heart } from 'lucide-react';
import Img from './Img.jsx';
import { IMG } from '../data/content.js';

export default function CtaBanner() {
  return (
    <section id="about" className="relative mt-6 overflow-hidden bg-gradient-to-r from-white to-[#f7ece0]">
      <div className="relative mx-auto min-h-[170px] max-w-[900px] xl:max-w-[1280px]">
        <Img src={IMG.cta} alt="Care that starts with love" className="absolute right-0 top-0 h-full object-cover lg:object-contain object-right" placeholder="bg-transparent" />
        <div className="relative z-10 px-4 py-5 lg:px-6">
          <p className="text-[10px] font-medium tracking-wide">SAFE. GENTLE. EFFECTIVE.</p>
          <h2 className="mt-2 font-serif text-[33px] font-bold leading-[34px]">Care That Starts<br />With <span className="font-love font-semibold italic text-gold">Love</span></h2>
          <p className="mt-2 text-[12px]">Because they deserve the best.</p>
          <a href="#products" className="mt-3 inline-flex h-[30px] w-[137px] items-center justify-center gap-2 rounded-md bg-ink text-[10px] font-semibold text-white">Shop Now <ArrowRight size={12} /></a>
        </div>
      </div>
    </section>
  );
}
