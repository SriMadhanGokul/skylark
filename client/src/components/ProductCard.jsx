import { ShoppingCart } from 'lucide-react';
import Img from './Img.jsx';
import Stars from './Stars.jsx';

export default function ProductCard({ p, onAdd }) {
  return (
    <article className="flex flex-col items-center rounded-lg bg-white px-2 pb-3 pt-1 text-center shadow-[0_2px_10px_rgba(0,0,0,0.07)]">
      <Img src={p.img} alt={p.name} className="h-[180px] w-full object-contain" placeholder="bg-neutral-100 rounded-lg" />
      <h3 className="mt-3 flex min-h-[32px] items-center text-[11px] font-semibold leading-4">{p.name}</h3>
      <p className="mt-1 text-[10px] text-neutral-600">{p.size}</p>
      <p className="mt-1 text-[16px] font-semibold">₹ {p.price.toFixed(2)}</p>
      <div className="mt-1"><Stars size={11} /></div>
      <button onClick={() => onAdd(p)} className="mt-3 flex h-[32px] w-[132px] items-center justify-center gap-2 rounded-md bg-ink text-[9px] font-semibold text-white active:scale-95">
        <ShoppingCart size={11} /> Add to Cart
      </button>
    </article>
  );
}
