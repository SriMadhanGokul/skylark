import { useState } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import Img from './Img.jsx';
import { IMG } from '../data/content.js';

const links = [
  ['Home', '#home'], ['Shop', '#products'], ['Shop by Category', '#categories'],
  ['About Us', '#about'], ['Contact', '#contact'],
];

export default function Navbar({ cartCount, onSearch, onContactClick }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Home');

  const handleClick = (l) => {
    setActive(l);
    setOpen(false);
    if (l === 'Contact' && onContactClick) {
      onContactClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto flex h-[60px] max-w-[900px] xl:max-w-[1280px] items-center justify-between px-4 lg:px-6">
        <a href="#home" className="flex items-center gap-3">
          <Img src={IMG.logo} alt="Skylark Lifecare and Sciences" className="h-[70px] w-[70px] -mb-3 rounded-full bg-white object-contain shadow-sm" placeholder="bg-teal-100" />
          <span className="text-[13px] font-semibold leading-[15px] tracking-wide">SKYLARK LIFECARE<br />AND SCIENCES</span>
        </a>
        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-semibold">
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              onClick={() => handleClick(l)}
              className={`py-1 transition-colors hover:text-gold ${active === l ? 'border-b-2 border-gold text-ink' : 'text-neutral-700'}`}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <label className="hidden md:flex h-9 w-[157px] xl:w-[220px] items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-3">
            <Search size={14} />
            <input type="search" placeholder="Search for products..." onChange={(e) => onSearch(e.target.value)} className="w-full bg-transparent text-[9px] outline-none placeholder:text-neutral-400" />
          </label>
          <button aria-label="Account" onClick={onContactClick}><User size={19} strokeWidth={1.6} /></button>
          <button aria-label="Cart" className="relative">
            <ShoppingCart size={19} strokeWidth={1.6} />
            <span className="absolute -right-2 -top-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-ink text-[7px] text-white">{cartCount}</span>
          </button>
          <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden flex flex-col gap-3 border-t px-4 py-3 text-sm font-semibold">
          {links.map(([l, h]) => (
            <a key={l} href={h} onClick={() => handleClick(l)} className="hover:text-gold transition-colors">
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
