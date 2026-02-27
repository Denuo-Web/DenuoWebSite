import express from 'express'
import cors from 'cors'
import admin from 'firebase-admin'
import Stripe from 'stripe'
import { createHash } from 'node:crypto'

const app = express()
const port = process.env.PORT || 8080
const requestBodyLimit = process.env.REQUEST_BODY_LIMIT || '16kb'

const asBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null || value === '') return defaultValue
  const normalized = String(value).trim().toLowerCase()
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) return false
  return defaultValue
}

const asBoundedInteger = (value, fallback, min, max) => {
  const parsed = Number.parseInt(String(value ?? ''), 10)
  if (Number.isNaN(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}

const CONTACT_RATE_LIMIT_WINDOW_MS = asBoundedInteger(
  process.env.CONTACT_RATE_LIMIT_WINDOW_MS,
  10 * 60 * 1000,
  60 * 1000,
  24 * 60 * 60 * 1000
)
const CONTACT_RATE_LIMIT_MAX_REQUESTS = asBoundedInteger(
  process.env.CONTACT_RATE_LIMIT_MAX_REQUESTS,
  5,
  1,
  1000
)
const CONTACT_REQUIRE_APP_CHECK = asBoolean(process.env.CONTACT_REQUIRE_APP_CHECK, false)
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || ''
const CONTACT_REQUIRE_CAPTCHA = asBoolean(
  process.env.CONTACT_REQUIRE_CAPTCHA,
  Boolean(TURNSTILE_SECRET_KEY)
)
const CONTACT_IP_HASH_SALT = process.env.CONTACT_IP_HASH_SALT || ''
const CONTACT_ALLOWED_ORIGINS = String(process.env.CONTACT_ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const controlCharsRegex = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
const contactRateLimitStore = new Map()

const normalizeSingleLine = (value, maxLength) =>
  String(value ?? '')
    .replace(controlCharsRegex, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)

const normalizeMultiline = (value, maxLength) =>
  String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(controlCharsRegex, '')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength)

const hashValue = (value) =>
  createHash('sha256')
    .update(`${CONTACT_IP_HASH_SALT}|${value}`)
    .digest('hex')

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim()
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].split(',')[0].trim()
  }
  return req.ip || 'unknown'
}

const consumeContactRateLimit = (key) => {
  const now = Date.now()
  const existing = contactRateLimitStore.get(key)

  if (!existing || now - existing.windowStart >= CONTACT_RATE_LIMIT_WINDOW_MS) {
    contactRateLimitStore.set(key, { windowStart: now, count: 1 })
    return { limited: false, remaining: CONTACT_RATE_LIMIT_MAX_REQUESTS - 1, retryAfterMs: 0 }
  }

  if (existing.count >= CONTACT_RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      remaining: 0,
      retryAfterMs: CONTACT_RATE_LIMIT_WINDOW_MS - (now - existing.windowStart),
    }
  }

  existing.count += 1
  contactRateLimitStore.set(key, existing)

  return {
    limited: false,
    remaining: CONTACT_RATE_LIMIT_MAX_REQUESTS - existing.count,
    retryAfterMs: 0,
  }
}

setInterval(() => {
  const now = Date.now()
  for (const [key, value] of contactRateLimitStore.entries()) {
    if (now - value.windowStart > CONTACT_RATE_LIMIT_WINDOW_MS * 2) {
      contactRateLimitStore.delete(key)
    }
  }
}, Math.max(60 * 1000, CONTACT_RATE_LIMIT_WINDOW_MS)).unref()

const withTimeout = async (promiseFactory, timeoutMs = 5000) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await promiseFactory(controller.signal)
  } finally {
    clearTimeout(timeout)
  }
}

const verifyTurnstileToken = async (token, remoteIp) => {
  if (!TURNSTILE_SECRET_KEY) {
    return { checked: false, ok: false, reason: 'captcha-not-configured' }
  }

  const body = new URLSearchParams({
    secret: TURNSTILE_SECRET_KEY,
    response: token,
  })

  if (remoteIp) {
    body.append('remoteip', remoteIp)
  }

  try {
    const response = await withTimeout((signal) =>
      fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        signal,
      })
    )

    if (!response.ok) {
      return { checked: true, ok: false, reason: `captcha-http-${response.status}` }
    }

    const payload = await response.json()
    return {
      checked: true,
      ok: Boolean(payload.success),
      reason: (payload['error-codes'] || []).join(',') || undefined,
    }
  } catch (err) {
    return { checked: true, ok: false, reason: err.name === 'AbortError' ? 'captcha-timeout' : 'captcha-error' }
  }
}

app.use(cors())
app.set('trust proxy', true)
app.use(express.json({ limit: requestBodyLimit }))

let firestore = null
let auth = null
let appCheck = null
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
  appCheck = admin.appCheck()
  console.log('Firebase admin initialized.')
} catch (err) {
  console.warn('Firebase admin not initialized. Firestore writes will be skipped.', err.message)
}

if (CONTACT_REQUIRE_APP_CHECK && !appCheck) {
  console.warn('CONTACT_REQUIRE_APP_CHECK=true but App Check verification is unavailable.')
}

if (CONTACT_REQUIRE_CAPTCHA && !TURNSTILE_SECRET_KEY) {
  console.warn('CONTACT_REQUIRE_CAPTCHA=true but TURNSTILE_SECRET_KEY is missing.')
}

const stripeSecret = process.env.STRIPE_SECRET_KEY
if (stripeSecret) {
  stripe = new Stripe(stripeSecret, { apiVersion: '2024-09-30.acacia' })
  console.log('Stripe initialized.')
} else {
  console.warn('STRIPE_SECRET_KEY not set. Invoice endpoints disabled.')
}

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'denuo-web-api',
    firestore: Boolean(firestore),
    contactProtection: {
      rateLimitWindowMs: CONTACT_RATE_LIMIT_WINDOW_MS,
      rateLimitMaxRequests: CONTACT_RATE_LIMIT_MAX_REQUESTS,
      appCheckRequired: CONTACT_REQUIRE_APP_CHECK,
      captchaRequired: CONTACT_REQUIRE_CAPTCHA,
      allowedOriginsConfigured: CONTACT_ALLOWED_ORIGINS.length > 0,
    },
  })
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
  const requestOrigin = req.get('origin')
  if (
    CONTACT_ALLOWED_ORIGINS.length > 0 &&
    requestOrigin &&
    !CONTACT_ALLOWED_ORIGINS.includes(requestOrigin)
  ) {
    return res.status(403).json({ error: 'Origin not allowed.' })
  }

  const clientIp = getClientIp(req)
  const rateLimitKey = `contact:${hashValue(clientIp)}`
  const rateLimit = consumeContactRateLimit(rateLimitKey)

  if (rateLimit.limited) {
    const retryAfterSeconds = Math.max(1, Math.ceil(rateLimit.retryAfterMs / 1000))
    res.set('Retry-After', String(retryAfterSeconds))
    return res.status(429).json({ error: 'Too many requests. Please retry later.' })
  }

  const { name, email, project, message, captchaToken, website } = req.body ?? {}
  const normalizedName = normalizeSingleLine(name, 80)
  const normalizedEmail = normalizeSingleLine(email, 254).toLowerCase()
  const normalizedProject = normalizeSingleLine(project, 120)
  const normalizedMessage = normalizeMultiline(message, 4000)
  const normalizedWebsite = normalizeSingleLine(website, 200)
  const normalizedCaptchaToken = normalizeSingleLine(captchaToken, 4096)

  if (normalizedWebsite) {
    // Honeypot field: return success without persisting so bots can't probe behavior.
    return res.status(201).json({ ok: true })
  }

  if (!normalizedName || !normalizedEmail || !normalizedMessage) {
    return res.status(400).json({ error: 'name, email, and message are required.' })
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return res.status(400).json({ error: 'email must be a valid email address.' })
  }

  let appCheckVerified = false
  if (CONTACT_REQUIRE_APP_CHECK || req.headers['x-firebase-appcheck']) {
    if (!appCheck) {
      return res.status(500).json({ error: 'App Check verification is not configured.' })
    }

    const appCheckToken = normalizeSingleLine(req.headers['x-firebase-appcheck'], 4096)
    if (!appCheckToken) {
      return res.status(401).json({ error: 'Missing App Check token.' })
    }

    try {
      await appCheck.verifyToken(appCheckToken)
      appCheckVerified = true
    } catch (err) {
      console.warn('App Check verification failed:', err.message)
      return res.status(403).json({ error: 'Invalid App Check token.' })
    }
  }

  let captchaVerified = false
  if (CONTACT_REQUIRE_CAPTCHA || normalizedCaptchaToken) {
    if (!normalizedCaptchaToken) {
      return res.status(400).json({ error: 'captchaToken is required.' })
    }

    if (!TURNSTILE_SECRET_KEY) {
      return res.status(500).json({ error: 'CAPTCHA verification is not configured.' })
    }

    const captcha = await verifyTurnstileToken(normalizedCaptchaToken, clientIp)
    if (!captcha.ok) {
      console.warn('CAPTCHA verification failed:', captcha.reason || 'unknown')
      return res.status(403).json({ error: 'CAPTCHA verification failed.' })
    }
    captchaVerified = true
  }

  const entry = {
    name: normalizedName,
    email: normalizedEmail,
    project: normalizedProject || 'N/A',
    message: normalizedMessage,
    createdAt: new Date().toISOString(),
    source: 'denuo-web',
    abuseProtection: {
      ipHash: hashValue(clientIp),
      userAgent: normalizeSingleLine(req.get('user-agent'), 256),
      appCheckVerified,
      captchaVerified,
    },
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
