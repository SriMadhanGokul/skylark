import { ArrowRight } from 'lucide-react';
import Img from './Img.jsx';
import { categories } from '../data/content.js';

export default function Categories({ onSelectCategory }) {
  const handleCategoryClick = (catName) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
  };

  return (
    <section id="categories" className="mx-auto max-w-[900px] xl:max-w-[1280px] px-4 lg:px-6 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="section-title">
          Shop by Category <i className="under" />
        </h2>
        <button
          onClick={() => handleCategoryClick('All')}
          className="flex items-center gap-1.5 text-xs font-bold text-ink hover:text-gold transition-colors group cursor-pointer"
        >
          <span>View All Categories</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {categories.map((c) => (
          <div
            key={c.name}
            onClick={() => handleCategoryClick(c.name)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-neutral-100 aspect-[16/10] bg-neutral-100"
          >
            <Img
              src={c.img}
              alt={c.name}
              className="h-full w-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              placeholder="bg-neutral-100"
            />
            {/* Elegant hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                Shop {c.name} <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
