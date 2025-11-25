# Denuo Web site spec

## Purpose & audience
- Position Denuo Web, LLC (Jaron Rosenau) as a fractional CTO/full-stack delivery partner for founders, nonprofits, and research teams.
- Showcase recent work (QuestByCycle PWA, Moonshine Art marketplace, CrowdPM platform) and service lines drawn from Jaron's resume and portfolio repos.
- Provide a gated admin dashboard for rapid content edits without code deploys.

## Stack
- Frontend: React + Vite (TypeScript), Firebase Auth + Firestore, deployed to Firebase Hosting.
- Backend: Express API on Google Cloud Run (`/health`, `/contact`, `/admin/status`).
- Billing: Stripe invoicing endpoint for admin use.
- CI/CD: GitHub Actions (`deploy-hosting.yml`, `deploy-cloudrun.yml`).
- Local dev: Firebase Emulator Suite (auth:9099, firestore:8080, hosting:5000) toggled via `VITE_USE_FIREBASE_EMULATORS`.
- Styling: Custom theme (Space Grotesk/Archivo), glassmorphism cards, accent gradients; responsive for mobile/desktop.
- UI kit: Radix UI Themes for component styling, appearance toggles, and consistent theming.

## Pages & UX
- Landing (`/`)
  - Hero with eyebrow, bold headline, CTA buttons, and stat strip (games launched, honorarium, cloud coverage).
  - Services grid (strategy, build, platform) with differentiator pills.
  - Work/projects grid featuring QuestByCycle, Moonshine Art, CrowdPM with stack tags and status badges.
  - Process timeline (Discover → Architecture → Build → Launch).
  - Contact CTA with email/phone and booking link.
  - Footer with contact + admin link.
- Admin dashboard (`/admin`)
  - Email/password sign-in via Firebase Auth (requires custom `admin` claim).
  - Panels to edit hero, services, projects, differentiators, process steps, and contact info; writes to Firestore `siteContent/public`.
  - Status + warnings when Firebase config is missing; save button disabled until authenticated.
  - Billing form to issue Stripe invoices (admin-only; posts to `/billing/invoice`).
- Global toggles
  - Light/dark appearance powered by Radix UI Themes.
  - Language switcher EN/JA for UI chrome; English fallback for missing strings.

## Content model (Firestore `siteContent/public`)
```
{
  hero: { eyebrow, title, subtitle, badge, primaryCta, secondaryCta },
  stats: [{ label, value, helper }],
  services: [{ title, summary, bullets[], badge }],
  differentiators: [string],
  projects: [{ name, summary, impact, stack[], link?, status? }],
  process: [{ title, detail, outcome }],
  contact: { headline, subhead, email, phone, calendly?, note? }
}
```
- Fallback content lives in `web/src/content/fallback.ts` (pulled from Rosenau's resume).
- Contact submissions land in `contactRequests` when Firestore credentials are available; reads of site content are public, writes are `admin`-only per `firestore.rules`.

## Admin/auth requirements
- Create a Firebase Auth user; set custom claim `admin: true` via `node api/scripts/setAdminClaim.js --email=<user>` with a service account.
- Hosting env vars: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`.
- Emulator toggle: set `VITE_USE_FIREBASE_EMULATORS=true` and run `firebase emulators:start --only auth,firestore` for local content editing.
- Localization toggle: EN/JA switch in the UI powered by `src/i18n/uiCopy.ts`; default fallback to English when translated copy is missing. Theme toggle (light/dark) uses Radix Themes appearance.

## Localization guidelines
- Keep UI strings in `src/i18n/uiCopy.ts` and avoid hard-coding labels in components. Fall back to English keys when translations are missing.
- Store per-language content in Firestore alongside the base document (e.g., `siteContent/public/translations/ja`) or add language-specific fields; keep schema parallel across locales.
- Prefer JSON exports for translators and review; automate pushes of locale files via CI before release.
- Keep layout/copy decoupled: avoid concatenated strings; prefer full-sentence keys so Japanese line breaks remain natural.
- Ensure direction-agnostic styling and avoid embedding locale-specific assets in code; load them by locale key.

## Deployment targets
- Firebase Hosting serves the SPA from `web/dist`; `/api/**` rewrites to Cloud Run service `denuo-api` (region `us-central1` by default).
- Cloud Run service pulls Firestore credentials from default service account or `FIREBASE_SERVICE_ACCOUNT` env var for local/dev.
- GitHub Actions secrets needed: `FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_PROJECT_ID`, `GCP_SERVICE_ACCOUNT_KEY`, `GCP_PROJECT_ID`, `GCP_REGION`.
- Stripe secret `STRIPE_SECRET_KEY` required for invoicing API.
- Terraform scaffold at `infra/terraform` enables APIs, creates deploy SA + Artifact Registry, and pushes GitHub secrets (DNS not automated for Squarespace).

## Contact API behavior
- `POST /contact` validates `name`, `email`, `message`; optional `project` string.
- If Firestore is configured, saves document with ISO timestamp to `contactRequests`; otherwise logs and returns 201 for resilience.
- `POST /billing/invoice` (admin-only) creates and emails a Stripe invoice using `amountCents`, `email`, `name`, and optional `description`.

## Roadmap ideas
- Add testimonials/press logos and PDF resume download.
- Add analytics (GA4 or Plausible) and error reporting (Sentry) behind a feature flag.
