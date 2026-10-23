import { ArrowRight, Heart } from 'lucide-react';
import Img from './Img.jsx';
import TrustIcon from './TrustIcon.jsx';
import { IMG } from '../data/content.js';

export default function Hero({ onShopProducts, onExploreCategories }) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-r from-white via-[#fbf3ea] to-[#f3e2cf]">
      <div className="relative mx-auto grid max-w-[900px] xl:max-w-[1280px] min-h-[343px]">
        <Img
          src={IMG.hero}
          alt="Dog and cat together"
          className="absolute right-0 top-0 h-full w-full object-cover object-[70%_center] lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent,black_20%)]"
        />
        <div className="relative z-10 px-4 py-9 lg:px-6 lg:w-[55%]">
          <p className="text-[11px] font-medium tracking-wider text-gold">PREMIUM PET CARE</p>
          <h1 className="mt-3 font-serif text-[40px] font-bold leading-[42px]">
            Taking Care<br />of Your Pets,<br />With Love{' '}
            <Heart className="inline -mt-3 text-gold" size={40} strokeWidth={1.3} />
          </h1>
          <p className="mt-3 text-[15px] leading-[22px] text-neutral-800">
            Gentle everyday essentials<br />for happier, healthier pets.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={onShopProducts}
              className="flex h-[38px] w-[153px] items-center justify-center gap-2 rounded-xl bg-ink text-[11px] font-semibold text-white shadow-sm hover:bg-neutral-800 transition-colors"
            >
              Shop Products <ArrowRight size={13} />
            </button>
            <button
              onClick={onExploreCategories}
              className="flex h-[38px] w-[151px] items-center justify-center rounded-xl border border-ink bg-white/60 text-[11px] font-semibold hover:bg-white transition-colors"
            >
              Explore Categories
            </button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-6 text-[10px]">
            {[
              ['leaf', 'No Paraben'],
              ['drop', 'No Sulphate'],
              ['flask', 'No Silicone'],
            ].map(([i, t]) => (
              <li key={t} className="flex items-center gap-2">
                <TrustIcon name={i} size={26} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
