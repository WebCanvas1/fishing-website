import { useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  tag: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'reef-lure-pack',
    name: 'Reef Hunter Lure Pack',
    description: 'Twelve hand-tuned soft plastics built for snapper, kingfish and reef species.',
    price: 54.95,
    image: 'https://images.pexels.com/photos/6478206/pexels-photo-6478206.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Close-up of a colourful fishing lure',
    tag: 'Best Seller',
  },
  {
    id: 'bass-jig-kit',
    name: 'Big Bass Jig Kit',
    description: 'Heavy-duty jigs and tackle essentials for chasing bass in river and dam systems.',
    price: 39.5,
    image: 'https://images.pexels.com/photos/13740880/pexels-photo-13740880.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Angler holding a large bass with tackle visible',
    tag: 'New',
  },
  {
    id: 'crew-cap',
    name: 'Crew Performance Cap',
    description: 'Sun-smart, quick-dry cap with the Jamie\u2019s Fishing Adventures crest.',
    price: 34,
    image: 'https://images.pexels.com/photos/11250845/pexels-photo-11250845.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Angler holding a freshly caught trout outdoors',
    tag: 'Crew Favourite',
  },
];

interface FeaturedProductsProps {
  onAddToCart: () => void;
}

export default function FeaturedProducts({ onAddToCart }: FeaturedProductsProps) {
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const handleAdd = (id: string) => {
    onAddToCart();
    setAddedIds((ids) => [...ids, id]);
    window.setTimeout(() => {
      setAddedIds((ids) => ids.filter((existing) => existing !== id));
    }, 1600);
  };

  return (
    <section id="shop" className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">The Crew Shop</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[1.05] text-navy sm:text-6xl">
              Gear Tested <span className="text-ocean">On the Water</span>
            </h2>
          </div>
          <a
            href="#membership"
            className="text-sm font-semibold text-ocean transition-colors duration-200 hover:text-navy"
          >
            Get member pricing &rarr;
          </a>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const added = addedIds.includes(product.id);
            return (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {product.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-navy">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/75">{product.description}</p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-navy">${product.price.toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => handleAdd(product.id)}
                      disabled={added}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        added
                          ? 'bg-teal text-white'
                          : 'bg-navy text-white hover:-translate-y-0.5 hover:bg-ocean'
                      }`}
                    >
                      {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                      {added ? 'Added' : 'Add to cart'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
