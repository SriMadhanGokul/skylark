import { ArrowRight, Heart } from 'lucide-react';
import Img from './Img.jsx';
import TrustIcon from './TrustIcon.jsx';
import { IMG } from '../data/content.js';

export default function Hero({ onShopProducts, onExploreCategories }) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b lg:bg-gradient-to-r from-white via-[#fbf5ee] to-[#f4e4d4]">
      <div className="relative mx-auto flex flex-col lg:grid lg:grid-cols-12 max-w-[900px] xl:max-w-[1280px] lg:min-h-[420px]">
        {/* Content Column */}
        <div className="relative z-10 flex flex-col justify-center px-4 pt-8 pb-6 sm:px-6 lg:py-10 lg:col-span-6 xl:col-span-5">
          <span className="text-[11px] font-bold tracking-wider text-gold uppercase">
            PREMIUM PET CARE
          </span>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight lg:leading-[42px] text-ink">
            Taking Care<br className="hidden sm:inline" /> of Your Pets,<br />
            With Love{' '}
            <Heart className="inline -mt-1 text-gold" size={32} strokeWidth={1.5} />
          </h1>
          <p className="mt-3 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-neutral-700">
            Gentle everyday essentials crafted with natural actives for happier, healthier pets.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onShopProducts}
              className="flex h-10 px-5 items-center justify-center gap-2 rounded-xl bg-ink text-xs font-semibold text-white shadow-sm hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Shop Products <ArrowRight size={13} />
            </button>
            <button
              onClick={onExploreCategories}
              className="flex h-10 px-5 items-center justify-center rounded-xl border border-ink/80 bg-white/80 text-xs font-semibold text-ink hover:bg-white transition-colors cursor-pointer"
            >
              Explore Categories
            </button>
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] font-medium text-neutral-800 border-t border-neutral-200/60 pt-4">
            {[
              ['leaf', 'No Paraben'],
              ['drop', 'No Sulphate'],
              ['flask', 'No Silicone'],
            ].map(([i, t]) => (
              <li key={t} className="flex items-center gap-2">
                <TrustIcon name={i} size={22} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Image Column */}
        <div className="relative w-full lg:col-span-6 xl:col-span-7 flex items-center justify-center p-4 sm:p-6 lg:p-0">
          <div className="w-full overflow-hidden rounded-2xl lg:rounded-none lg:h-full flex items-center justify-center">
            <Img
              src={IMG.hero}
              alt="Dog and cat together - Healthier Happier Together"
              className="h-auto max-h-[380px] lg:max-h-none lg:h-full w-full object-contain lg:object-cover object-center lg:object-[70%_center] rounded-2xl lg:rounded-none shadow-sm lg:shadow-none lg:[mask-image:linear-gradient(to_right,transparent,black_15%)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
