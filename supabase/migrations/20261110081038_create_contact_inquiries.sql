/*
# Create contact inquiries table

1. New Tables
- `contact_inquiries`
  - `id` (uuid, primary key, generated automatically)
  - `name` (text, required, 1 to 100 characters)
  - `email` (text, required, 3 to 254 characters)
  - `topic` (text, required, one of: general, adventures, shop, membership, partnerships)
  - `message` (text, required, 10 to 2000 characters)
  - `created_at` (timestamp, set automatically)

2. Security
- Row level security is enabled on `contact_inquiries`.
- Anonymous and signed-in visitors may only INSERT a new inquiry. They cannot read, edit or delete any inquiries, including their own.
- Length and topic checks are enforced by the database so invalid submissions are rejected even if the website is bypassed.

3. Notes
- Inquiries are read by the business owner through the Supabase dashboard, not through the public website.
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND email LIKE '%_@_%'),
  topic text NOT NULL CHECK (topic IN ('general', 'adventures', 'shop', 'membership', 'partnerships')),
  message text NOT NULL CHECK (char_length(btrim(message)) BETWEEN 10 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_inquiries TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_inquiries" ON contact_inquiries;
CREATE POLICY "anon_insert_contact_inquiries" ON contact_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
