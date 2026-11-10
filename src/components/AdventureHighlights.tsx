import { ArrowUpRight, CalendarDays, MapPin, Sun, type LucideIcon } from 'lucide-react';

interface Adventure {
  title: string;
  location: string;
  date: string;
  duration: string;
  summary: string;
  image: string;
  imageAlt: string;
  Icon: LucideIcon;
}

const ADVENTURES: Adventure[] = [
  {
    title: 'Sunshine Coast Sunrise Session',
    location: 'Sunshine Coast, QLD',
    date: 'Next trip: March',
    duration: 'Half day',
    summary: 'Cast into the first light on rocky shorelines and chase bream, tailor and flathead before the crowds arrive.',
    image: 'https://images.pexels.com/photos/38434665/pexels-photo-38434665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Silhouetted angler fishing at sunrise on a rocky coastline',
    Icon: Sun,
  },
  {
    title: 'Gold Coast Kayak Hunt',
    location: 'Gold Coast, QLD',
    date: 'Next trip: April',
    duration: 'Full day',
    summary: 'Paddle the protected bays with a guide, targeting flathead and whiting from a stable, quiet kayak.',
    image: 'https://images.pexels.com/photos/32488535/pexels-photo-32488535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Red kayak with a yellow paddle resting on a sandy beach',
    Icon: MapPin,
  },
  {
    title: 'Open Water Offshore Run',
    location: 'Coffs Harbour, NSW',
    date: 'Next trip: May',
    duration: 'Overnight',
    summary: 'Run offshore to the continental shelf for kingfish, tuna and marlin with a skipper who knows the reef.',
    image: 'https://images.pexels.com/photos/32947354/pexels-photo-32947354.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Aerial view of a boat cutting through turquoise ocean water',
    Icon: CalendarDays,
  },
];

export default function AdventureHighlights() {
  return (
    <section id="adventures" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Fishing Adventures</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[1.05] text-navy sm:text-6xl">
              Trips Worth <span className="text-ocean">Every Mile</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal/75">
              Guided days and overnight runs along the Australian coast, built for anglers of every level.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {ADVENTURES.map((adventure) => {
            const Icon = adventure.Icon;
            return (
              <article
                key={adventure.title}
                className="group flex flex-col overflow-hidden rounded-3xl bg-mist ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={adventure.image}
                    alt={adventure.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-100">
                      <Icon className="h-4 w-4 text-teal" />
                      {adventure.location}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-bold uppercase leading-tight">
                      {adventure.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex-1 text-sm leading-relaxed text-charcoal/75">{adventure.summary}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-navy/10 pt-5 text-sm">
                    <span className="font-medium text-navy">
                      {adventure.date} &middot; {adventure.duration}
                    </span>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 font-semibold text-ocean transition-colors duration-200 hover:text-navy"
                    >
                      Enquire
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
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
