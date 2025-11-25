import admin from 'firebase-admin'

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null

if (admin.apps.length === 0) {
  admin.initializeApp(
    serviceAccount
      ? { credential: admin.credential.cert(serviceAccount) }
      : { credential: admin.credential.applicationDefault() }
  )
}

const emailArg = process.argv.find((arg) => arg.startsWith('--email='))
const uidArg = process.argv.find((arg) => arg.startsWith('--uid='))

const run = async () => {
  try {
    let user
    if (emailArg) {
      const email = emailArg.split('=')[1]
      user = await admin.auth().getUserByEmail(email)
    } else if (uidArg) {
      const uid = uidArg.split('=')[1]
      user = await admin.auth().getUser(uid)
    } else {
      throw new Error('Provide --email or --uid to set the admin claim')
    }

    await admin.auth().setCustomUserClaims(user.uid, { admin: true })
    console.log(`Admin claim set for ${user.uid}`)
  } catch (err) {
    console.error('Failed to set admin claim', err)
    process.exit(1)
  }
}

run()
