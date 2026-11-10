import { Check, Crown, Fish, Ship } from 'lucide-react';

const TIERS = [
  {
    name: 'Deckhand',
    price: 'Free',
    period: '',
    icon: Fish,
    perks: ['Weekly fishing tips newsletter', 'Access to public videos', 'Community forum access'],
    highlighted: false,
  },
  {
    name: 'First Mate',
    price: '$12',
    period: '/month',
    icon: Ship,
    perks: ['Everything in Deckhand', 'Member-only tutorials and tactics', 'Ten percent off all gear', 'Monthly live Q&A'],
    highlighted: true,
  },
  {
    name: 'Skipper',
    price: '$25',
    period: '/month',
    icon: Crown,
    perks: ['Everything in First Mate', 'Priority seats on adventure trips', 'Free shipping on every order', 'Annual crew gear pack'],
    highlighted: false,
  },
];

export default function MembershipTeaser() {
  return (
    <section id="membership" className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-ocean/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-teal/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">The Crew Membership</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[1.05] sm:text-6xl">
            Fish Smarter <span className="text-teal">With the Crew</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
            Join a community of anglers sharing real knowledge, real catches and real discounts. Pick the level that
            suits your season on the water.
          </p>
        </div>

        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-3">
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                  tier.highlighted
                    ? 'bg-white text-navy shadow-2xl shadow-black/30 ring-2 ring-teal md:-my-4'
                    : 'bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-coral px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      tier.highlighted ? 'bg-teal/15 text-ocean' : 'bg-teal/20 text-teal'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-3xl font-bold uppercase">{tier.name}</h3>
                </div>

                <p className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold">{tier.price}</span>
                  {tier.period && (
                    <span className={tier.highlighted ? 'text-charcoal/60' : 'text-white/60'}>{tier.period}</span>
                  )}
                </p>

                <ul className="mt-8 flex-1 space-y-4">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm leading-relaxed">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      <span className={tier.highlighted ? 'text-charcoal/85' : 'text-white/80'}>{perk}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-10 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    tier.highlighted
                      ? 'bg-coral text-white shadow-lg shadow-coral/30 hover:bg-coral-600'
                      : 'border border-white/25 text-white hover:border-teal hover:text-teal'
                  }`}
                >
                  Join the Crew
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
