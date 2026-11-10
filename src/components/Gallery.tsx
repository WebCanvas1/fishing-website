import { Camera } from 'lucide-react';

interface GalleryShot {
  src: string;
  alt: string;
  caption: string;
  span: string;
}

const SHOTS: GalleryShot[] = [
  {
    src: 'https://images.pexels.com/photos/38434672/pexels-photo-38434672.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Lone fisherman casting his line at sunrise',
    caption: 'First cast, Sunshine Coast',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/6139640/pexels-photo-6139640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Silhouetted fishermen casting lines into the ocean at dawn',
    caption: 'Dawn crew',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/2150403/pexels-photo-2150403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Aerial view of a fisherman casting a net from a boat',
    caption: 'Net work',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/10065936/pexels-photo-10065936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Three fishermen on a river boat holding their rods on a sunny day',
    caption: 'River day with the boys',
    span: 'md:col-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/8671734/pexels-photo-8671734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Close-up of a hand holding a freshly caught fish',
    caption: 'Fresh from the water',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/24861049/pexels-photo-24861049.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Lone kayaker on calm waters beside a rugged cliff',
    caption: 'Quiet water',
    span: '',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-ocean">
              <Camera className="h-4 w-4" />
              The Gallery
            </p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[1.05] text-navy sm:text-6xl">
              Moments From <span className="text-ocean">the Water</span>
            </h2>
          </div>
        </div>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[200px] md:grid-cols-3 md:gap-6">
          {SHOTS.map((shot) => (
            <figure
              key={shot.src}
              className={`group relative overflow-hidden rounded-2xl bg-navy-100 ${shot.span}`}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-navy/90 to-navy/0 p-5 pt-12 font-medium text-white transition-transform duration-500 group-hover:translate-y-0">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
