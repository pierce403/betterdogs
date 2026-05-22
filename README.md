# BetterDogs MVP
Next.js + Firebase Auth/Firestore + Firebase Admin + Cloudflare R2 + Stripe Checkout.
## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill values.
3. Run `npm run dev`.
## Firebase
Create web app config (NEXT_PUBLIC_*). Create service account for admin SDK (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` with escaped newline support).
Deploy `firestore.rules`.
## First admin
Use Firestore console to set `users/{uid}.role = "admin"`, or run script after auth bootstrap.
## R2
Set `R2_*` vars. Uploads use direct presigned PUT URLs against `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`.
## Stripe
Set `STRIPE_SECRET_KEY`, `STRIPE_PRICE_COACH_MONTHLY`, and optional `STRIPE_WEBHOOK_SECRET`. If missing, checkout endpoint returns `Stripe not configured`.
Webhook endpoint: `/api/stripe/webhook`.
## Vercel
Add all env vars in Vercel project settings. Only `NEXT_PUBLIC_*` exposed client-side.
