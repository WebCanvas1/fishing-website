import MembershipForm from './MembershipForm';
import { Check, Fish } from 'lucide-react';

const perks = ['Behind-the-scenes fishing videos', 'Member catch reports', 'Early access to merch drops'];

export default function MembershipTeaser() {
  return (
    <section id="membership" className="bg-navy px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/20 p-8 sm:p-12">
        <Fish className="h-9 w-9 text-teal" aria-hidden="true" />
        <p className="mt-5 text-sm font-semibold text-teal">Sample membership</p>
        <h2 className="mt-2 font-display text-5xl font-extrabold uppercase">The Reel Crew</h2>
        <ul className="mt-6 space-y-3">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-3">
              <Check className="h-5 w-5 text-teal" aria-hidden="true" />
              {perk}
            </li>
          ))}
        </ul>
        <MembershipForm />
      </div>
    </section>
  );
}
