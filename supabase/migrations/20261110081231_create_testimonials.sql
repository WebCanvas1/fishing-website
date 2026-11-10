/*
# Create testimonials table with sample guest reviews

1. New Tables
- `testimonials`
  - `id` (uuid, primary key)
  - `guest_name` (text, required, for example "Sarah M.")
  - `location` (text, required, where the guest is from)
  - `trip` (text, required, the charter or adventure the guest took)
  - `rating` (smallint, required, 1 to 5 stars)
  - `quote` (text, required, the review shown on the website)
  - `sort_order` (smallint, required, controls display order, lowest first)
  - `created_at` (timestamp, set automatically)

2. Seed Data
- Four sample reviews are inserted with fixed ids so re-running this migration does not create duplicates.
- These are placeholders to be replaced with real guest reviews.

3. Security
- Row level security is enabled on `testimonials`.
- Visitors (anonymous and signed-in) may only READ testimonials.
- Nobody can add, edit or delete testimonials through the website. Changes are made in the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL CHECK (char_length(btrim(guest_name)) BETWEEN 1 AND 100),
  location text NOT NULL CHECK (char_length(btrim(location)) BETWEEN 1 AND 100),
  trip text NOT NULL CHECK (char_length(btrim(trip)) BETWEEN 1 AND 150),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  quote text NOT NULL CHECK (char_length(btrim(quote)) BETWEEN 1 AND 1000),
  sort_order smallint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON testimonials TO anon, authenticated;

DROP POLICY IF EXISTS "public_select_testimonials" ON testimonials;
CREATE POLICY "public_select_testimonials" ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO testimonials (id, guest_name, location, trip, rating, quote, sort_order) VALUES
  ('5f1c2a10-0000-4000-8000-000000000001', 'Sarah M.', 'Brisbane, QLD', 'Sunshine Coast Sunrise Session', 5,
   'Jamie had us on bream before the sun was properly up. Patient, funny and genuinely knows the water. I have already booked the next trip.', 1),
  ('5f1c2a10-0000-4000-8000-000000000002', 'Daniel R.', 'Sydney, NSW', 'Open Water Offshore Run', 5,
   'Our first time chasing kingfish offshore and we landed three before lunch. Safety briefing was thorough and the crew made us feel at home.', 2),
  ('5f1c2a10-0000-4000-8000-000000000003', 'Priya K.', 'Gold Coast, QLD', 'Gold Coast Kayak Hunt', 4,
   'Paddling out to the bays with a guide was calm, scenic and surprisingly productive. Great for beginners who want to learn without feeling rushed.', 3),
  ('5f1c2a10-0000-4000-8000-000000000004', 'Tom H.', 'Perth, WA', 'Crew Membership Q&A', 5,
   'The member tutorials alone are worth it. Jamie breaks down tides, lures and reading structure in a way that actually sticks.', 4)
ON CONFLICT (id) DO NOTHING;
