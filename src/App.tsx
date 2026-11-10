import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import AdventureHighlights from '@/components/AdventureHighlights';
import MembershipTeaser from '@/components/MembershipTeaser';
import Gallery from '@/components/Gallery';
import ContactSection from '@/components/ContactSection';

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen bg-mist">
      <Header cartCount={cartCount} />
      <main>
        <Hero />
        <FeaturedProducts onAddToCart={() => setCartCount((count) => count + 1)} />
        <MembershipTeaser />
        <AdventureHighlights />
        <Gallery />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
