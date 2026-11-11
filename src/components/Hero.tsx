import { ArrowRight, Waves } from 'lucide-react';

const HERO_IMAGE = import.meta.env.BASE_URL + 'images/fishing-pier-sunset.webp';

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy">
      <img
        src={HERO_IMAGE}
        alt="Anglers carrying fishing gear along a wooden pier beneath a golden sunset"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[65%_center] animate-slow-zoom sm:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/80 via-transparent to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-8 lg:pb-28">
        <div className="max-w-3xl">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-teal/40 bg-navy/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-100 backdrop-blur-sm">
            <Waves className="h-4 w-4 text-teal" />
            Australian fishing adventures
          </p>

          <h1
            className="animate-fade-up mt-6 font-display text-6xl font-extrabold uppercase leading-[0.95] text-white sm:text-7xl lg:text-8xl"
            style={{ animationDelay: '150ms' }}
          >
            Chase the
            <span className="block text-teal">Big One</span>
            Down Under
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            style={{ animationDelay: '300ms' }}
          >
            Epic days on the water, honest gear reviews and the tactics that land fish. Join a crew of anglers
            who fish hard, respect the ocean and never stop chasing the next session.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '450ms' }}
          >
            <a
              href="#membership"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral px-8 py-4 text-base font-semibold text-white shadow-lg shadow-coral/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-600 hover:shadow-xl"
            >
              Join the Crew
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#shop"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal hover:bg-white/10 hover:text-teal-100"
            >
              Shop the Gear
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

