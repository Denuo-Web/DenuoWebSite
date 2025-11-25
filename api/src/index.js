import express from 'express'
import cors from 'cors'
import admin from 'firebase-admin'
import Stripe from 'stripe'

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

let firestore = null
let auth = null
let stripe = null

try {
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

  firestore = admin.firestore()
  auth = admin.auth()
  console.log('Firebase admin initialized.')
} catch (err) {
  console.warn('Firebase admin not initialized. Firestore writes will be skipped.', err.message)
}

const stripeSecret = process.env.STRIPE_SECRET_KEY
if (stripeSecret) {
  stripe = new Stripe(stripeSecret, { apiVersion: '2024-09-30.acacia' })
  console.log('Stripe initialized.')
} else {
  console.warn('STRIPE_SECRET_KEY not set. Invoice endpoints disabled.')
}

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'denuo-web-api', firestore: Boolean(firestore) })
})

const requireAdmin = async (req, res, next) => {
  if (!auth) return res.status(500).json({ error: 'Auth not configured' })
  const tokenHeader = req.headers.authorization
  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' })
  }
  const token = tokenHeader.replace('Bearer ', '')
  try {
    const decoded = await auth.verifyIdToken(token)
    if (!decoded.admin) {
      return res.status(403).json({ error: 'Admin claim required' })
    }
    req.user = decoded
    next()
  } catch (err) {
    console.error('Token verification failed', err)
    res.status(401).json({ error: 'Invalid token' })
  }
}

app.get('/admin/status', requireAdmin, (req, res) => {
  res.json({ ok: true, uid: req.user.uid })
})

app.post('/contact', async (req, res) => {
  const { name, email, project, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required.' })
  }

  const entry = {
    name,
    email,
    project: project || 'N/A',
    message,
    createdAt: new Date().toISOString(),
    source: 'denuo-web'
  }

  try {
    if (firestore) {
      await firestore.collection('contactRequests').add(entry)
    } else {
      console.log('Contact request (Firestore disabled):', entry)
    }
    res.status(201).json({ ok: true })
  } catch (err) {
    console.error('Failed to store contact', err)
    res.status(500).json({ error: 'Failed to store contact request' })
  }
})

app.post('/billing/invoice', requireAdmin, async (req, res) => {
  if (!stripe) return res.status(500).json({ error: 'Stripe is not configured' })
  const { email, name, amountCents, description } = req.body ?? {}
  const amount = Number(amountCents)

  if (!email || !name || !amount || Number.isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'email, name, and positive amountCents are required.' })
  }

  try {
    let customerId
    const search = await stripe.customers.search({
      query: `email:\"${email}\"`,
      limit: 1,
    })
    if (search.data.length > 0) {
      customerId = search.data[0].id
    } else {
      const created = await stripe.customers.create({ email, name })
      customerId = created.id
    }

    await stripe.invoiceItems.create({
      customer: customerId,
      amount: Math.round(amount),
      currency: 'usd',
      description: description || 'Services by Denuo Web',
    })

    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: 'send_invoice',
      days_until_due: 7,
      description: description || 'Invoice from Denuo Web',
      metadata: { source: 'denuo-web-admin' },
    })

    const finalized = await stripe.invoices.finalizeInvoice(invoice.id)
    const sent = await stripe.invoices.sendInvoice(finalized.id)

    res.status(201).json({
      ok: true,
      invoiceId: sent.id,
      hostedInvoiceUrl: sent.hosted_invoice_url,
    })
  } catch (err) {
    console.error('Failed to create invoice', err)
    res.status(500).json({ error: 'Invoice creation failed', detail: err.message })
  }
})

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(`API listening on :${port}`)
})
