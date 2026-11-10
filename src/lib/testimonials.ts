import { supabase } from '@/lib/supabase';

export interface Testimonial {
  id: string;
  guestName: string;
  location: string;
  trip: string;
  rating: number;
  quote: string;
}

interface TestimonialRow {
  id: string;
  guest_name: string;
  location: string;
  trip: string;
  rating: number;
  quote: string;
}

function isTestimonialRow(value: unknown): value is TestimonialRow {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'string' &&
    typeof row.guest_name === 'string' &&
    typeof row.location === 'string' &&
    typeof row.trip === 'string' &&
    typeof row.rating === 'number' &&
    typeof row.quote === 'string'
  );
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, guest_name, location, trip, rating, quote')
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  if (!Array.isArray(data) || !data.every(isTestimonialRow)) {
    throw new Error('Unexpected testimonials response');
  }

  return data.map((row) => ({
    id: row.id,
    guestName: row.guest_name,
    location: row.location,
    trip: row.trip,
    rating: row.rating,
    quote: row.quote,
  }));
}
