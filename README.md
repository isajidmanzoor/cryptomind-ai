CryptoMind AI is a Next.js crypto intelligence automation app.

Pipeline:

Internet -> AI web scraper -> Groq AI analysis -> sentiment -> price charts -> Pollinations AI image -> Supabase article publish -> AdSense, affiliate and crypto ads readiness.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Copy `.env.example` to `.env.local` and add the keys you want to activate. Without keys, the app runs in preview mode with graceful fallbacks.

Monetization notes:

- AdSense needs both `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and `NEXT_PUBLIC_ADSENSE_SLOT_ID` before a verifier-visible `<ins class="adsbygoogle">` unit is rendered.
- Crypto ads render from `NEXT_PUBLIC_CRYPTO_ADS_ZONE_ID` using an A-ADS-style iframe. If your network provides an exact snippet, paste it into `NEXT_PUBLIC_CRYPTO_ADS_EMBED_HTML`.
- Public monetization values are intentionally exposed to the browser because ad network bots must see the embedded unit on the specified URL.

Useful endpoints:

- `GET /api/pipeline` previews a compact automation summary.
- `GET /api/pipeline?full=1` returns the full automation payload for the dashboard.
- `POST /api/pipeline` publishes to Supabase. Send `Authorization: Bearer <secret>`.
- `GET /api/news` returns scraped crypto news.
- `GET /api/feed` returns the full generated feed.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
