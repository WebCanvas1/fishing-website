import { Anchor, Compass, Waves } from 'lucide-react';

const placeholders = [
  { name: 'Sample tackle partner', Icon: Anchor },
  { name: 'Sample outdoor partner', Icon: Compass },
  { name: 'Sample marine partner', Icon: Waves },
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-5xl font-extrabold uppercase text-navy">Sponsors</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {placeholders.map(({ name, Icon }) => (
            <li key={name} className="rounded-2xl border border-navy/15 bg-mist p-8 text-navy">
              <Icon className="mx-auto mb-3 h-9 w-9 text-ocean" aria-hidden="true" />
              <span className="font-semibold">{name}</span>
            </li>
          ))}
        </ul>
        <details className="mx-auto mt-8 max-w-lg rounded-2xl bg-navy p-5 text-white">
          <summary className="cursor-pointer font-semibold">Enquire about sponsorship</summary>
          <p className="mt-3 text-sm text-white/80">The enquiry link will be available when sponsorship contact details are confirmed.</p>
        </details>
      </div>
    </section>
  );
}
