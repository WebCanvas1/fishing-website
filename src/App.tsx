import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import MembershipTeaser from '@/components/MembershipTeaser';
import Sponsors from '@/components/Sponsors';
import Gallery from '@/components/Gallery';
import ContactSection from '@/components/ContactSection';

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen bg-mist">
      <Header cartCount={cartCount} />
      <main>
        <Hero />
        <div className="bg-navy px-6 py-3 text-center text-sm text-white">Design preview · Sample branding, products and photography</div>
        <FeaturedProducts onAddToCart={() => setCartCount((count) => count + 1)} />
        <MembershipTeaser />
        <Gallery />
        <Sponsors />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
