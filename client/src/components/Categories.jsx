import { ArrowRight } from 'lucide-react';
import Img from './Img.jsx';
import { categories } from '../data/content.js';

const labelPos = {
  'Pet Shampoos': 'bottom-3 left-3 w-14',
  'Paw Creams': 'left-[48%] top-[30%] w-14',
  Deodorants: 'left-[52%] top-[40%]',
  'Oral Sprays': 'right-5 top-[30%] w-14',
};

export default function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-[900px] xl:max-w-[1280px] px-4 lg:px-6 pt-6">
      <div className="flex items-start justify-between">
        <h2 className="section-title">Shop by Category<i className="under" /></h2>
        <a href="#categories" className="mt-3 flex items-center gap-1 text-[9px] font-semibold hover:text-gold transition-colors">View All Categories <ArrowRight size={12} /></a>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {categories.map((c) => (
          <a key={c.name} href="#products" className="group relative block overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
            <Img src={c.img} alt={c.name} className="h-full w-full object-cover rounded-xl" placeholder="bg-neutral-100" />
          </a>
        ))}
      </div>
    </section>
  );
}
