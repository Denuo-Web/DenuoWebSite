# Start Here

Follow these steps to get Denuo Web online with Firebase Hosting + Cloud Run, admin dashboard, and Stripe invoicing.

## 1) Create/prepare your Firebase + GCP project
- Create a Firebase project and web app (copy the web config for later). Enable Firestore (Native) and Hosting.
- GCP project must have billing enabled.

## 2) Option A: Automate setup with Terraform (recommended)
- Open `infra/terraform/terraform.tfvars` and fill:
  - `project_id` and `firebase_project_id` (often the same)
  - `github_owner` and `github_repo`
  - `region` (e.g., `us-central1`)
  - `firebase_service_account_json` (path or inline JSON for Firebase Hosting deploys)
  - `stripe_secret_key` (optional, for invoicing API)
- Run:
  ```bash
  cd infra/terraform
  terraform init
  terraform apply
  ```
- Terraform will enable required APIs, create a deploy service account + key, set up Artifact Registry, and push GitHub secrets (`FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_PROJECT_ID`, `GCP_PROJECT_ID`, `GCP_REGION`, `GCP_SERVICE_ACCOUNT_KEY`, and `STRIPE_SECRET_KEY` if provided).

## 2) Option B: Manual secrets (skip Terraform)
- Create a deploy service account in GCP with roles: Run Admin, IAM Service Account User, Cloud Build Editor, Artifact Registry Admin, Firebase Hosting Admin, Firebase Rules Admin.
- Download its JSON key and add these GitHub repo secrets:
  - `FIREBASE_SERVICE_ACCOUNT` – deploy SA JSON
  - `FIREBASE_PROJECT_ID` – Firebase project id
  - `GCP_PROJECT_ID` – GCP project id
  - `GCP_REGION` – e.g., `us-central1`
  - `GCP_SERVICE_ACCOUNT_KEY` – same JSON key (for Cloud Run deploy)
  - `STRIPE_SECRET_KEY` – your Stripe secret (needed for invoicing)

## 3) Frontend env (web/.env)
- Copy `web/.env.example` to `web/.env` and paste your Firebase web config (apiKey, authDomain, etc.).
- Optional: set `VITE_USE_FIREBASE_EMULATORS=true` to develop against local emulators.

## 4) API env (Cloud Run)
- Ensure Cloud Run service has env vars `FIREBASE_SERVICE_ACCOUNT` (JSON) and `STRIPE_SECRET_KEY` (if using invoicing).

## 5) Deploy
- Cloud Run API: push to `main` (or run) `.github/workflows/deploy-cloudrun.yml` to build/deploy `api`.
- Firebase Hosting: push to `main` (or run) `.github/workflows/deploy-hosting.yml` to build/deploy `web` and proxy `/api/**` to Cloud Run.

## 6) Admin access
- Create a Firebase Auth user; set `admin: true` via:
  ```bash
  export FIREBASE_SERVICE_ACCOUNT="$(cat path/to/serviceAccount.json)"
  node api/scripts/setAdminClaim.js --email=you@example.com
  ```
- Sign in at `/admin` to edit site content or send Stripe invoices.

## 7) DNS
- Squarespace DNS cannot be Terraform-managed; add Firebase Hosting/Cloud Run records manually there. If you want full automation, move DNS to Cloudflare/Route53/Google Cloud DNS and manage records via Terraform.

## 8) Local dev (optional)
- Zero-config preview: `cd web && npm install && npm run dev` (uses fallback content; auth/API disabled).
- With live Firebase: set `web/.env` and run `npm run dev`.
- With emulators: set `VITE_USE_FIREBASE_EMULATORS=true` and run `firebase emulators:start --only auth,firestore`, then `npm run dev`.
- API local: `cd api && npm install && FIREBASE_SERVICE_ACCOUNT="$(cat serviceAccount.json)" STRIPE_SECRET_KEY=sk_test_... npm run dev`.

## References
- App content model and UX: `docs/SPEC.md`
- Firebase/hosting config: `firebase.json`, `firestore.rules`, `web/.env.example`
- Terraform scaffold: `infra/terraform/README.md`
- API endpoints: `api/README.md`
