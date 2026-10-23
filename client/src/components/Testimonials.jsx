import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Img from './Img.jsx';
import Stars from './Stars.jsx';
import { reviews } from '../data/content.js';

export default function Testimonials() {
  const [start, setStart] = useState(0);
  const show = [0, 1, 2].map((i) => reviews[(start + i) % reviews.length]);
  const move = (d) => setStart((s) => (s + d + reviews.length) % reviews.length);
  return (
    <section className="mx-auto max-w-[900px] xl:max-w-[1280px] px-4 lg:px-6 pt-8">
      <div className="flex items-center justify-between">
        <h2 className="section-title flex items-center gap-3">Happy Customers <i className="h-[2px] w-7 bg-gold" /></h2>
        <div className="flex gap-3">
          <button aria-label="Previous reviews" onClick={() => move(-1)} className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100"><ChevronLeft size={15} /></button>
          <button aria-label="Next reviews" onClick={() => move(1)} className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100"><ChevronRight size={15} /></button>
        </div>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {show.map((r) => (
          <figure key={r.name} className="flex overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_rgba(0,0,0,0.07)]">
            <Img src={r.img} alt={r.name} className="h-[135px] w-[132px] shrink-0 rounded-l-lg object-cover" placeholder="bg-orange-100" />
            <figcaption className="flex flex-col justify-center gap-1.5 px-3 py-2">
              <Stars size={12} />
              <blockquote className="text-[9px] leading-[14px] text-neutral-700">{r.text}</blockquote>
              <p className="text-[10px] font-semibold">{r.name}</p>
              <p className="text-[8px] text-neutral-500">{r.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
