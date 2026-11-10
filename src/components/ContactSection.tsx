import { Clock, MapPin, Mail } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const DETAILS = [
  { icon: Clock, title: 'Response time', text: 'We reply within two business days.' },
  { icon: MapPin, title: 'Based in', text: 'Queensland, Australia. Trips run along the east coast.' },
  { icon: Mail, title: 'Brand and sponsor enquiries', text: 'Select "Brand partnerships" and we will route it to the team.' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-5 lg:gap-20 lg:px-8">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Contact</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[1.05] text-navy sm:text-6xl">
            Let's Talk <span className="text-ocean">Fishing</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-charcoal/75 sm:text-lg">
            Questions about a trip, an order or the membership? Send us a message and the crew will get back to you.
          </p>

          <ul className="mt-10 space-y-6">
            {DETAILS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/15 text-ocean">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-navy">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal/75">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
