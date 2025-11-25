# Denuo Web frontend (Vite + Firebase)

A React/Vite SPA for Denuo Web, LLC with Firebase Auth + Firestore-backed content and an admin dashboard.

## Setup
1. Copy `.env.example` to `.env` and fill your Firebase web config values.
2. Install dependencies: `npm install`.
3. Zero-config preview: run `npm run dev` without env vars to see fallback content (admin saves disabled, auth/API not configured).
4. Build: `npm run build` (outputs to `dist/`).

### Firebase emulators (optional)
- Set `VITE_USE_FIREBASE_EMULATORS=true` in `.env` to point the app at local emulators.
- Start emulators: `firebase emulators:start --only auth,firestore --project $FIREBASE_PROJECT_ID` (ports 9099/8080 as defined in `firebase.json`).

## Admin
- Visit `/admin` to sign in (email/password). Saving content requires a Firebase user with custom claim `admin: true`.
- Content lives at Firestore document `siteContent/public`; fallback content is bundled from `src/content/fallback.ts`.
- Billing: Admins can send Stripe invoices from `/admin` when `STRIPE_SECRET_KEY` is set on the API and a valid Firebase ID token is provided.

## Content structure
- Hero, stats, services, differentiators, projects, process steps, and contact info are editable via the dashboard.
- Styling uses Space Grotesk/Archivo fonts with glassmorphism cards and accent gradients; responsive on mobile/desktop.
- Radix UI Themes powers the light/dark toggle (persisted) and IconButtons used for controls.
- Language toggle (EN/JA) is driven by `src/i18n/uiCopy.ts`; labels fall back to English when translations are missing.

## Localization tips
- Keep UI strings in `src/i18n/uiCopy.ts`; avoid duplicating labels in components.
- If adding translated content from Firestore, mirror the base document per locale (`siteContent/public/translations/ja`) with the same schema and fall back to English when absent.

## Notes
- Chunk size warnings during build come from the Firebase SDK and Radix Themes; acceptable for this project.
- The Hosting rewrite for `/api/**` expects a Cloud Run service named `denuo-api` (region `us-central1` by default).
