import { useEffect, useState } from 'react';
import { AlertCircle, Quote, RefreshCw, Star } from 'lucide-react';
import { fetchTestimonials, type Testimonial } from '@/lib/testimonials';

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; items: Testimonial[] };

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? 'fill-coral text-coral' : 'text-navy/15'}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <figure
      className="group flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 animate-fade-up"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <Quote className="h-8 w-8 text-teal/40 transition-colors duration-300 group-hover:text-teal" />
      <StarRating rating={item.rating} />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-charcoal/85">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-8 border-t border-navy/10 pt-5">
        <p className="font-semibold text-navy">{item.guestName}</p>
        <p className="mt-1 text-sm text-charcoal/65">
          {item.location} &middot; {item.trip}
        </p>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    fetchTestimonials()
      .then((items) => {
        if (!cancelled) setState({ status: 'ready', items });
      })
      .catch((err) => {
        console.error('Failed to load testimonials', err);
        if (!cancelled) setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const averageRating =
    state.status === 'ready' && state.items.length > 0
      ? state.items.reduce((sum, item) => sum + item.rating, 0) / state.items.length
      : null;

  return (
    <section id="reviews" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Guest Stories</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[1.05] text-navy sm:text-6xl">
              Straight From <span className="text-ocean">the Crew</span>
            </h2>
          </div>
          {averageRating !== null && (
            <div className="flex items-center gap-4 rounded-2xl bg-mist px-6 py-4 ring-1 ring-navy/5">
              <span className="font-display text-5xl font-extrabold text-navy">{averageRating.toFixed(1)}</span>
              <div>
                <StarRating rating={Math.round(averageRating)} />
                <p className="mt-1 text-sm text-charcoal/65">Average guest rating</p>
              </div>
            </div>
          )}
        </div>

        {state.status === 'loading' && (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4" aria-busy="true">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="h-64 animate-pulse rounded-3xl bg-mist" />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <div
            role="alert"
            className="mt-14 flex flex-col items-start gap-4 rounded-3xl bg-mist p-8 ring-1 ring-coral/30 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3 text-charcoal">
              <AlertCircle className="h-5 w-5 shrink-0 text-coral-600" />
              <span>We couldn't load guest reviews just now.</span>
            </div>
            <button
              type="button"
              onClick={() => setAttempt((count) => count + 1)}
              className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-colors duration-200 hover:border-teal hover:text-ocean"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        )}

        {state.status === 'ready' && state.items.length > 0 && (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {state.items.map((item, index) => (
              <ReviewCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
