# Denuo Web site spec

## Purpose & audience
- Position Denuo Web, LLC as Jaron Rosenau's independent software-delivery and portfolio umbrella for practical web systems, integrations, civic/public-systems tooling, and supportable case-study projects.
- Showcase recent work (QuestByCycle PWA, CrowdPM platform, Moonshine Art marketplace, APK Workbench, DripCopy) and service lines drawn from Jaron's resume and portfolio repos without presenting the umbrella as conventional employment history.
- Provide a gated admin dashboard for rapid content edits without code deploys.

## Stack
- Frontend: React + Vite (TypeScript), Firebase Auth + Firestore, deployed to Firebase Hosting.
- Backend: Express API on Google Cloud Run (`/health`, `/contact`,
  `/admin/status`, `/billing/invoice`).
- Billing: Stripe invoicing endpoint for admin use.
- CI/CD: GitHub Actions (`deploy-hosting.yml`, `deploy-cloudrun.yml`).
- Local dev: Firebase Emulator Suite (auth:9099, firestore:8080, hosting:5000) toggled via `VITE_USE_FIREBASE_EMULATORS`.
- Styling: Custom theme (Space Grotesk/Archivo), glassmorphism cards, accent gradients; responsive for mobile/desktop.
- UI kit: Radix UI Themes for component styling, appearance toggles, and consistent theming.

## Pages & UX
- Landing (`/`)
  - Hero with eyebrow, bold headline, CTA buttons, and controlled Denuo Web umbrella framing.
  - Services grid (Discovery / Implementation Plan, Web App / Integration Build, Stabilize / Support Handoff) with differentiator pills.
  - Work/projects grid featuring QuestByCycle, Moonshine Art, CrowdPM with stack tags and status badges.
  - Process timeline (Scope → Design → Build → Launch + handoff).
  - Contact CTA with email.
  - Footer with contact email + admin link.
- Admin dashboard (`/admin`)
  - Email/password sign-in via Firebase Auth (requires custom `admin` claim).
  - Panels to edit hero, services, projects, differentiators, process steps, and contact info; writes to Firestore `siteContent/public`.
  - Case studies are read from Firestore `siteContent/public/work/{slug}` documents.
  - Status + warnings when Firebase config is missing; save button disabled until authenticated.
  - Billing form to issue Stripe invoices (admin-only; posts to `/billing/invoice`).
- Shakescape mobile (`/work/shakescape`)
  - Product overview and source link for the Android/iOS browser.
  - Dedicated privacy policy at `/work/shakescape/privacy`.
- Shakescape Extension (`/work/shakescape-extension`)
  - Separate Chromium extension and native Setup product overview.
  - Dedicated privacy and license/terms pages under the same route.
  - Legacy HNS Browser and HNS DANE Browser URLs redirect to the canonical
    Shakescape routes; static policy mirrors preserve store-facing URLs.
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
  work: {
    servicePackages: [{ title, summary, outcomes[], timeline? }],
    testimonials: [{ quote, person, role, company?, caseStudySlug? }]
  },
  process: [{ title, detail, outcome }],
  contact: { headline, subhead, email, note? }
}
```
- Case studies are first-class documents in `siteContent/public/work/{slug}`:
```
{
  slug, name, summary, impact, challenge, solution,
  outcomes[], stack[], status?, liveUrl?, repositoryUrl?,
  servicePackage?
}
```
- Fallback content lives in `web/src/content/fallback.ts` (pulled from Rosenau's resume).
- Contact submissions land in `contactRequests` via API-only writes (Admin SDK). Firestore client rules deny direct `contactRequests` creates.

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
- The live `shakescape.` Handshake authority is provisioned outside Terraform
  by `infra/provision-shakescape-hns.sh` on the existing production host. Its
  signed zone, TLSA/DoH service, HTTP/3 site, and generated private keys are
  operational state rather than Firestore content or Terraform resources.

## Contact API behavior
- `POST /contact` validates and normalizes `name`, `email`, `message`; optional `project`, `captchaToken`, and honeypot `website`.
- In-memory rate limiting applies per client IP hash (`CONTACT_RATE_LIMIT_WINDOW_MS`, `CONTACT_RATE_LIMIT_MAX_REQUESTS`).
- Optional origin allowlist via `CONTACT_ALLOWED_ORIGINS`.
- Optional App Check verification via `CONTACT_REQUIRE_APP_CHECK` + `x-firebase-appcheck` header.
- Optional Turnstile verification via `CONTACT_REQUIRE_CAPTCHA` + `TURNSTILE_SECRET_KEY`.
- If Firestore is configured, saves normalized document with ISO timestamp to `contactRequests`; otherwise logs and returns 201 for resilience.
- `POST /billing/invoice` (admin-only) creates and emails a Stripe invoice using `amountCents`, `email`, `name`, and optional `description`.

## Roadmap ideas
- Add testimonials/press logos and PDF resume download.
- Add analytics (GA4 or Plausible) and error reporting (Sentry) behind a feature flag.
