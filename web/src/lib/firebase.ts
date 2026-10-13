import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  type AppCheck,
} from 'firebase/app-check'
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const isConfigured = Object.values(firebaseConfig).every(Boolean)
const useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true'
const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY
const appCheckDebugToken = import.meta.env.VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN

let app: FirebaseApp | null = null
let db: Firestore | null = null
let appCheck: AppCheck | null = null

if (isConfigured) {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)

  if (!useEmulators && appCheckSiteKey && typeof window !== 'undefined') {
    if (appCheckDebugToken) {
      ;(globalThis as typeof globalThis & { FIREBASE_APPCHECK_DEBUG_TOKEN?: string }).FIREBASE_APPCHECK_DEBUG_TOKEN =
        appCheckDebugToken
    }

    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    })
  }

  if (useEmulators && db) {
    connectFirestoreEmulator(db, 'localhost', 8080)
    console.info('Connected to Firebase Firestore emulator (firestore:8080).')
  }
} else {
  console.warn('Firebase config missing. Using static fallback content until env vars are set.')
}

export { app, db, appCheck, isConfigured, useEmulators }
