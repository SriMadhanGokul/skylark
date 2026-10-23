import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import BestSellers from './components/BestSellers.jsx';
import Testimonials from './components/Testimonials.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import Footer from './components/Footer.jsx';
import ContactModal from './components/ContactModal.jsx';

export default function App() {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');
  const [contactOpen, setContactOpen] = useState(false);

  const addToCart = (p) => setCart((c) => [...c, p]);

  return (
    <>
      <Navbar
        cartCount={cart.length}
        onSearch={setQuery}
        onContactClick={() => setContactOpen(true)}
      />
      <main>
        <Hero />
        <Categories />
        <BestSellers query={query} onAdd={addToCart} />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer onContactClick={() => setContactOpen(true)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
