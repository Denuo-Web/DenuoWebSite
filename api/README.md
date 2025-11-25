# Denuo Web API (Cloud Run)

Express API for Denuo Web contact capture and admin utilities. Intended for Cloud Run behind Firebase Hosting rewrite.

## Endpoints
- `GET /health` – health check
- `POST /contact` – `{ name, email, project?, message }`; stores to Firestore `contactRequests` when credentials exist
- `GET /admin/status` – requires Firebase ID token with `admin: true`
- `POST /billing/invoice` – admin-only (Firebase ID token) to create and email a Stripe invoice

## Run locally
```bash
npm install
# Provide Firestore credentials (service account JSON)
export FIREBASE_SERVICE_ACCOUNT="$(cat path/to/serviceAccount.json)"
# Stripe (optional for invoicing)
export STRIPE_SECRET_KEY=sk_test_...
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
