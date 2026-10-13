import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'

import { app, useEmulators } from './firebase'

const auth: Auth | null = app ? getAuth(app) : null

if (useEmulators && auth) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  console.info('Connected to Firebase Auth emulator (auth:9099).')
}

export { auth }
