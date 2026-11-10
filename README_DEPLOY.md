# Fishing Website — GitHub + Cloudflare Pages

## GitHub
From the project root, run:

```bash
git init
git branch -M main
git remote add origin https://github.com/WebCanvas1/fishing-website.git
git add .
git commit -m "Initial fishing website"
git push -u origin main
```

If `main` already has a README/initial commit, clone the repository first and copy these files into it before committing.

## Cloudflare Pages
Connect GitHub repository `WebCanvas1/fishing-website` to Cloudflare Pages.
- Framework: React (Vite)
- Production branch: main
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `/`
- Node.js major version: 22

In Pages project settings > Variables and Secrets, configure build-time environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the public URL and publishable/anon key of the correct Supabase project. Redeploy after adding these values.

Run included migration SQL against your Supabase project if not already applied. These migration files contain sample testimonials and must not be mistaken for verified customer reviews.

Never commit `.env`, service role keys or database passwords. Note: `VITE_` variables are embedded in browser JavaScript at build time; use only the Supabase publishable/anon key, never a secret/service-role key.
