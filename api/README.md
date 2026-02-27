# Denuo Web API (Cloud Run)

Express API for Denuo Web contact capture and admin utilities. Intended for Cloud Run behind Firebase Hosting rewrite.

## Endpoints
- `GET /health` – health check
- `POST /contact` – `{ name, email, project?, message, captchaToken?, website? }`; stores normalized payload to Firestore `contactRequests` when credentials exist
- `GET /admin/status` – requires Firebase ID token with `admin: true`
- `POST /billing/invoice` – admin-only (Firebase ID token) to create and email a Stripe invoice

## Run locally
```bash
npm install
# Provide Firestore credentials (service account JSON)
export FIREBASE_SERVICE_ACCOUNT="$(cat path/to/serviceAccount.json)"
# Stripe (optional for invoicing)
export STRIPE_SECRET_KEY=sk_test_...
# Contact protections (recommended)
export CONTACT_REQUIRE_APP_CHECK=true
export CONTACT_REQUIRE_CAPTCHA=true
export TURNSTILE_SECRET_KEY=turnstile_secret_here
export CONTACT_RATE_LIMIT_WINDOW_MS=600000
export CONTACT_RATE_LIMIT_MAX_REQUESTS=5
export CONTACT_ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
export CONTACT_IP_HASH_SALT="$(openssl rand -hex 32)"
npm run dev
```

### Using Firebase emulators
- Start emulators: `firebase emulators:start --only auth,firestore --project $FIREBASE_PROJECT_ID`.
- Point the API to emulators before running:\
  `export FIRESTORE_EMULATOR_HOST=localhost:8080`\
  `export FIREBASE_AUTH_EMULATOR_HOST=localhost:9099`

## Deploy (example)
```bash
gcloud builds submit . --tag gcr.io/$PROJECT_ID/denuo-api
gcloud run deploy denuo-api \
  --image gcr.io/$PROJECT_ID/denuo-api \
  --region us-central1 \
  --allow-unauthenticated
```

## Set admin claim helper
```bash
export FIREBASE_SERVICE_ACCOUNT="$(cat path/to/serviceAccount.json)"
node scripts/setAdminClaim.js --email=you@example.com
```

## Stripe invoicing
- Requires `STRIPE_SECRET_KEY` env.
- `POST /billing/invoice` body: `{ email, name, amountCents, description? }` and Firebase ID token with `admin: true`. Returns hosted invoice URL.

## Contact abuse controls
- Firestore rules should deny client-side `contactRequests` writes; writes happen only from this API using Admin SDK.
- Rate limiting is enabled by default and configurable via `CONTACT_RATE_LIMIT_WINDOW_MS` and `CONTACT_RATE_LIMIT_MAX_REQUESTS`.
- App Check can be enforced with `CONTACT_REQUIRE_APP_CHECK=true` (expects `x-firebase-appcheck` header).
- Turnstile verification can be enforced with `CONTACT_REQUIRE_CAPTCHA=true` and `TURNSTILE_SECRET_KEY` (expects `captchaToken` in body).
- Optional browser origin allowlist: `CONTACT_ALLOWED_ORIGINS=https://example.com,https://www.example.com`
