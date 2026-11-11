import { useEffect, useState } from 'react';
import { Fish, Menu, ShoppingCart, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Shop', href: '#shop' },
  { label: 'Membership', href: '#membership' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

interface HeaderProps {
  cartCount: number;
}

export default function Header({ cartCount }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-navy/95 shadow-lg shadow-navy/20 backdrop-blur-md'
          : 'bg-gradient-to-b from-navy/70 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#top" onClick={closeMenu} className="group flex items-center gap-3 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-navy transition-transform duration-300 group-hover:-rotate-12">
            <Fish className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-extrabold uppercase leading-none tracking-wide sm:text-xl">
            Jamie's Fishing
            <span className="block text-sm font-semibold tracking-[0.2em] text-teal-100">Adventures</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-2 text-sm font-medium text-white/85 transition-colors duration-200 hover:text-teal after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-teal after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#shop"
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-coral px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </a>

          <a
            href="#membership"
            className="hidden rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-coral/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-600 hover:shadow-lg md:inline-flex"
          >
            Join the Crew
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 xl:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden bg-navy transition-all duration-500 xl:hidden ${
          menuOpen ? 'max-h-[80vh] border-t border-white/10' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 font-display text-2xl font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white/5 hover:text-teal"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#membership"
            onClick={closeMenu}
            className="mt-4 rounded-full bg-coral px-5 py-3 text-center text-base font-semibold text-white"
          >
            Join the Crew
          </a>
        </nav>
      </div>
    </header>
  );
}
