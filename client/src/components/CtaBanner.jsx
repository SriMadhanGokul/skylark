import { ArrowRight } from 'lucide-react';
import Img from './Img.jsx';
import { IMG } from '../data/content.js';

export default function CtaBanner({ onShopNow }) {
  return (
    <section id="about" className="relative mt-8 mx-auto max-w-[900px] xl:max-w-[1280px] px-4 lg:px-6">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-white via-[#fbf3ea] to-[#f5e6d6] border border-neutral-200/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between">
        {/* Text Content */}
        <div className="p-6 md:p-8 lg:p-10 flex-1 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
            SAFE. GENTLE. EFFECTIVE.
          </span>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold leading-tight text-ink">
            Care That Starts<br />
            With <span className="font-love font-semibold italic text-gold">Love</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed">
            Because they deserve the best every single day. 100% pet-safe formulations crafted with care.
          </p>

          <div className="mt-4">
            {onShopNow ? (
              <button
                onClick={onShopNow}
                className="inline-flex h-9 px-5 items-center justify-center gap-2 rounded-xl bg-ink text-xs font-semibold text-white hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                Shop Now <ArrowRight size={13} />
              </button>
            ) : (
              <a
                href="#products"
                className="inline-flex h-9 px-5 items-center justify-center gap-2 rounded-xl bg-ink text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Shop Now <ArrowRight size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Banner Image */}
        <div className="relative w-full md:w-[45%] lg:w-[48%] flex items-center justify-center p-4 md:p-6">
          <div className="w-full overflow-hidden rounded-2xl bg-white/70 p-2 shadow-xs border border-white">
            <Img
              src={IMG.cta}
              alt="Care that starts with love"
              className="h-auto w-full object-contain rounded-xl"
              placeholder="bg-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
