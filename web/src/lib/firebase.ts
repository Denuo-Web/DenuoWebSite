import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'
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

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

if (isConfigured) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)

  if (useEmulators && auth && db) {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, 'localhost', 8080)
    console.info('Connected to Firebase emulators (auth:9099, firestore:8080).')
  }
} else {
  console.warn('Firebase config missing. Using static fallback content until env vars are set.')
}

export { app, auth, db, isConfigured, useEmulators }
