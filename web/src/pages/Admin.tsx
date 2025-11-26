import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Kbd,
  Separator,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from '@radix-ui/themes'
import { GlobeIcon } from '@radix-ui/react-icons'
import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'

import { auth, isConfigured } from '../lib/firebase'
import type { Language, UiCopy } from '../i18n/uiCopy'
import type { ProcessStep, Project, Service, SiteContent } from '../types'

interface AdminProps {
  content: SiteContent
  onSave: (next: SiteContent) => Promise<void>
  onOpenThemePanel: () => void
  language: Language
  onToggleLanguage: () => void
  copy: UiCopy
}

const AdminPage = ({
  content,
  onSave,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: AdminProps) => {
  const [draft, setDraft] = useState<SiteContent>(content)
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [authError, setAuthError] = useState<string>('')
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [invoiceForm, setInvoiceForm] = useState({ email: '', name: '', amountUsd: '', description: '' })
  const [invoiceStatus, setInvoiceStatus] = useState<string>('')

  useEffect(() => {
    setDraft(content)
  }, [content])

  useEffect(() => {
    if (!auth) return
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    if (!auth) {
      setAuthError('Firebase is not configured yet.')
      return
    }
    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      setAuthError('')
      setStatus('Signed in.')
    } catch (err) {
      setAuthError('Unable to sign in. Check credentials and admin claim.')
      console.error(err)
    }
  }

  const handleCreateInvoice = async () => {
    if (!auth || !user) {
      setInvoiceStatus('Sign in as admin to send invoices.')
      return
    }
    const amountCents = Math.round(Number(invoiceForm.amountUsd || 0) * 100)
    if (!invoiceForm.email || !invoiceForm.name || !amountCents) {
      setInvoiceStatus('Email, name, and a positive amount are required.')
      return
    }
    setInvoiceStatus('Sending invoice…')
    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/billing/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: invoiceForm.email,
          name: invoiceForm.name,
          amountCents,
          description: invoiceForm.description,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Invoice failed')
      }
      setInvoiceStatus(`Invoice sent. URL: ${data.hostedInvoiceUrl}`)
    } catch (err) {
      console.error(err)
      setInvoiceStatus('Invoice failed. Check Stripe key and permissions.')
    }
  }

  const handleSignOut = async () => {
    if (!auth) return
    await signOut(auth)
    setStatus('Signed out.')
  }

  const handleSave = async () => {
    setSaving(true)
    setStatus('')
    try {
      await onSave(draft)
      setStatus('Content saved to Firestore.')
    } catch (err) {
      console.error(err)
      setStatus('Save failed. Confirm Firebase config and your admin claim.')
    } finally {
      setSaving(false)
    }
  }

  const differentiatorsText = useMemo(() => draft.differentiators.join('\n'), [draft.differentiators])

  const updateService = (index: number, next: Partial<Service>) => {
    const updated = draft.services.map((svc, idx) => (idx === index ? { ...svc, ...next } : svc))
    setDraft({ ...draft, services: updated })
  }

  const updateProject = (index: number, next: Partial<Project>) => {
    const updated = draft.projects.map((proj, idx) => (idx === index ? { ...proj, ...next } : proj))
    setDraft({ ...draft, projects: updated })
  }

  const updateProcess = (index: number, next: Partial<ProcessStep>) => {
    const updated = draft.process.map((step, idx) => (idx === index ? { ...step, ...next } : step))
    setDraft({ ...draft, process: updated })
  }

  const addService = () => {
    const newService: Service = {
      title: 'New service',
      summary: 'Describe the value and outcome.',
      bullets: ['Add bullet points'],
      badge: 'New',
    }
    setDraft({ ...draft, services: [...draft.services, newService] })
  }

  const addProject = () => {
    const newProject: Project = {
      name: 'New project',
      summary: 'What it is and who it served.',
      impact: 'Impact or measurable result.',
      stack: ['Stack'],
      status: 'Planned',
    }
    setDraft({ ...draft, projects: [...draft.projects, newProject] })
  }

  const Header = ({ children }: { children?: ReactNode }) => (
    <Flex align="center" justify="between" wrap="wrap" gap="3" mb="4">
      <Flex align="center" gap="2">
        <Text weight="bold">Admin · Denuo Web</Text>
      </Flex>
      {children}
      <Flex gap="2" ml="auto">
        <Tooltip content={copy.nav.themeToggle}>
          <IconButton variant="soft" onClick={onOpenThemePanel} aria-label={copy.nav.themeToggle}>
            <Kbd>t</Kbd>
          </IconButton>
        </Tooltip>
        <Tooltip content={copy.nav.languageToggle}>
          <Button variant="soft" onClick={onToggleLanguage} aria-label={copy.nav.languageToggle} size="2">
            <GlobeIcon />
            <Text ml="2">{language === 'en' ? 'EN' : '日本'}</Text>
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  )

  const Field = ({ label, id, children }: { label: string; id: string; children: ReactNode }) => (
    <Flex direction="column" gap="1">
      <Text as="label" htmlFor={id} weight="medium">
        {label}
      </Text>
      {children}
    </Flex>
  )

  if (!user) {
    return (
      <Container size="4" px="5" py="6">
        <Header>
          <Button asChild variant="ghost" size="2">
            <Link to="/">{copy.nav.backToSite}</Link>
          </Button>
        </Header>

        <Card size="4">
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="2">
              <Text color="green" size="2" weight="medium">
                Content dashboard
              </Text>
              <Heading size="7">Admin sign in</Heading>
              {!isConfigured && (
                <Callout.Root color="amber">
                  <Callout.Text>Set VITE_FIREBASE_* env vars to enable auth + saves.</Callout.Text>
                </Callout.Root>
              )}
            </Flex>

            <form onSubmit={handleLogin}>
              <Flex direction="column" gap="3">
                <Field label="Admin email" id="admin-email">
                  <TextField.Root
                    id="admin-email"
                    type="email"
                    value={credentials.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    placeholder="admin email"
                    required
                  />
                </Field>
                <Field label="Password" id="admin-password">
                  <TextField.Root
                    id="admin-password"
                    type="password"
                    value={credentials.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
                    placeholder="password"
                    required
                  />
                </Field>
                <Button type="submit" disabled={!isConfigured}>
                  Sign in
                </Button>
              </Flex>
            </form>
            {authError && (
              <Callout.Root color="ruby">
                <Callout.Text>{authError}</Callout.Text>
              </Callout.Root>
            )}
            <Card variant="surface">
              <Flex direction="column" gap="1">
                <Heading size="5">Access restricted</Heading>
                <Text color="gray">Sign in with an admin account to edit site content.</Text>
              </Flex>
            </Card>
          </Flex>
        </Card>
      </Container>
    )
  }

  return (
    <Container size="4" px="5" py="6">
      <Header>
        <Button asChild variant="ghost" size="2">
          <Link to="/">{copy.nav.backToSite}</Link>
        </Button>
      </Header>

      <Card size="4" mb="4">
        <Flex align="center" justify="between" wrap="wrap" gap="3">
          <Box>
            <Text color="green" size="2" weight="medium">
              Content dashboard
            </Text>
            <Heading size="7" mt="1">
              Update site copy, services, and projects.
            </Heading>
            {!isConfigured && (
              <Callout.Root color="amber" mt="2">
                <Callout.Text>Set VITE_FIREBASE_* env vars to enable auth + saves.</Callout.Text>
              </Callout.Root>
            )}
          </Box>
          <Flex gap="2" align="center">
            <Text color="gray">Signed in as {user.email}</Text>
            <Button variant="ghost" onClick={handleSignOut}>
              Sign out
            </Button>
          </Flex>
        </Flex>
      </Card>

      <Grid columns={{ initial: '1', md: '2' }} gap="3">
        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading size="5">Hero</Heading>
            <Text color="gray">Headline, subtitle, and CTAs.</Text>
            <Field label="Eyebrow" id="hero-eyebrow">
              <TextField.Root
                id="hero-eyebrow"
                value={draft.hero.eyebrow}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDraft({ ...draft, hero: { ...draft.hero, eyebrow: e.target.value } })
                }
              />
            </Field>
            <Field label="Title" id="hero-title">
              <TextField.Root
                id="hero-title"
                value={draft.hero.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDraft({ ...draft, hero: { ...draft.hero, title: e.target.value } })
                }
              />
            </Field>
            <Field label="Subtitle" id="hero-subtitle">
              <TextArea
                id="hero-subtitle"
                value={draft.hero.subtitle}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDraft({ ...draft, hero: { ...draft.hero, subtitle: e.target.value } })
                }
              />
            </Field>
            <Field label="Badge" id="hero-badge">
              <TextField.Root
                id="hero-badge"
                value={draft.hero.badge}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDraft({ ...draft, hero: { ...draft.hero, badge: e.target.value } })
                }
              />
            </Field>
            <Grid columns={{ initial: '1', sm: '2' }} gap="3">
              <Field label="Primary CTA" id="hero-primary">
                <TextField.Root
                  id="hero-primary"
                  value={draft.hero.primaryCta}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDraft({ ...draft, hero: { ...draft.hero, primaryCta: e.target.value } })
                  }
                />
              </Field>
              <Field label="Secondary CTA" id="hero-secondary">
                <TextField.Root
                  id="hero-secondary"
                  value={draft.hero.secondaryCta}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDraft({ ...draft, hero: { ...draft.hero, secondaryCta: e.target.value } })
                  }
                />
              </Field>
            </Grid>
          </Flex>
        </Card>

        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading size="5">Services</Heading>
            <Text color="gray">Cards with bullets.</Text>
            {draft.services.map((service, idx) => (
              <Card key={service.title + idx} variant="surface">
                <Flex direction="column" gap="2">
                  <Grid columns={{ initial: '1', sm: '2' }} gap="3">
                    <Field label="Badge" id={`service-${idx}-badge`}>
                      <TextField.Root
                        id={`service-${idx}-badge`}
                        value={service.badge ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateService(idx, { badge: e.target.value })}
                      />
                    </Field>
                    <Field label="Title" id={`service-${idx}-title`}>
                      <TextField.Root
                        id={`service-${idx}-title`}
                        value={service.title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateService(idx, { title: e.target.value })}
                      />
                    </Field>
                  </Grid>
                  <Field label="Summary" id={`service-${idx}-summary`}>
                    <TextArea
                      id={`service-${idx}-summary`}
                      value={service.summary}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        updateService(idx, { summary: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Bullets (one per line)" id={`service-${idx}-bullets`}>
                    <TextArea
                      id={`service-${idx}-bullets`}
                      value={service.bullets.join('\n')}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        updateService(idx, { bullets: e.target.value.split('\n').filter(Boolean) })
                      }
                    />
                  </Field>
                </Flex>
              </Card>
            ))}
            <Button variant="soft" onClick={addService}>
              + Add service
            </Button>
          </Flex>
        </Card>

        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading size="5">Projects</Heading>
            <Text color="gray">Recent work tiles.</Text>
            {draft.projects.map((project, idx) => (
              <Card key={project.name + idx} variant="surface">
                <Flex direction="column" gap="2">
                  <Field label="Name" id={`project-${idx}-name`}>
                    <TextField.Root
                      id={`project-${idx}-name`}
                      value={project.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateProject(idx, { name: e.target.value })}
                    />
                  </Field>
                  <Field label="Summary" id={`project-${idx}-summary`}>
                    <TextArea
                      id={`project-${idx}-summary`}
                      value={project.summary}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        updateProject(idx, { summary: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Impact" id={`project-${idx}-impact`}>
                    <TextArea
                      id={`project-${idx}-impact`}
                      value={project.impact}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        updateProject(idx, { impact: e.target.value })
                      }
                    />
                  </Field>
                  <Grid columns={{ initial: '1', sm: '2' }} gap="3">
                    <Field label="Status" id={`project-${idx}-status`}>
                      <TextField.Root
                        id={`project-${idx}-status`}
                        value={project.status ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateProject(idx, { status: e.target.value })}
                      />
                    </Field>
                    <Field label="Link" id={`project-${idx}-link`}>
                      <TextField.Root
                        id={`project-${idx}-link`}
                        value={project.link ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateProject(idx, { link: e.target.value })}
                      />
                    </Field>
                  </Grid>
                  <Field label="Stack (comma-separated)" id={`project-${idx}-stack`}>
                    <TextField.Root
                      id={`project-${idx}-stack`}
                      value={project.stack.join(', ')}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateProject(idx, { stack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })
                      }
                    />
                  </Field>
                </Flex>
              </Card>
            ))}
            <Button variant="soft" onClick={addProject}>
              + Add project
            </Button>
          </Flex>
        </Card>

        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading size="5">Differentiators</Heading>
            <Text color="gray">Shown as pills under services.</Text>
            <Field label="One per line" id="differentiators">
              <TextArea
                id="differentiators"
                value={differentiatorsText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDraft({ ...draft, differentiators: e.target.value.split('\n').filter(Boolean) })
                }
              />
            </Field>
          </Flex>
        </Card>

        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading size="5">Process steps</Heading>
            <Text color="gray">Four steps recommended.</Text>
            {draft.process.map((step, idx) => (
              <Card key={step.title + idx} variant="surface">
                <Flex direction="column" gap="2">
                  <Field label="Title" id={`process-${idx}-title`}>
                    <TextField.Root
                      id={`process-${idx}-title`}
                      value={step.title}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateProcess(idx, { title: e.target.value })}
                    />
                  </Field>
                  <Field label="Detail" id={`process-${idx}-detail`}>
                    <TextArea
                      id={`process-${idx}-detail`}
                      value={step.detail}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        updateProcess(idx, { detail: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Outcome" id={`process-${idx}-outcome`}>
                    <TextField.Root
                      id={`process-${idx}-outcome`}
                      value={step.outcome}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateProcess(idx, { outcome: e.target.value })}
                    />
                  </Field>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Card>

        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading size="5">Contact</Heading>
            <Text color="gray">CTA and contact channels.</Text>
            <Field label="Headline" id="contact-headline">
              <TextField.Root
                id="contact-headline"
                value={draft.contact.headline}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDraft({ ...draft, contact: { ...draft.contact, headline: e.target.value } })
                }
              />
            </Field>
            <Field label="Subhead" id="contact-subhead">
              <TextArea
                id="contact-subhead"
                value={draft.contact.subhead}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDraft({ ...draft, contact: { ...draft.contact, subhead: e.target.value } })
                }
              />
            </Field>
            <Grid columns={{ initial: '1', sm: '2' }} gap="3">
              <Field label="Email" id="contact-email">
                <TextField.Root
                  id="contact-email"
                  value={draft.contact.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDraft({ ...draft, contact: { ...draft.contact, email: e.target.value } })
                  }
                />
              </Field>
              <Field label="Phone" id="contact-phone">
                <TextField.Root
                  id="contact-phone"
                  value={draft.contact.phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDraft({ ...draft, contact: { ...draft.contact, phone: e.target.value } })
                  }
                />
              </Field>
            </Grid>
            <Field label="Calendly / booking URL" id="contact-calendly">
              <TextField.Root
                id="contact-calendly"
                value={draft.contact.calendly ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDraft({ ...draft, contact: { ...draft.contact, calendly: e.target.value } })
                }
              />
            </Field>
            <Field label="Note" id="contact-note">
              <TextArea
                id="contact-note"
                value={draft.contact.note ?? ''}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDraft({ ...draft, contact: { ...draft.contact, note: e.target.value } })
                }
              />
            </Field>
          </Flex>
        </Card>

        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading size="5">Billing (Stripe)</Heading>
            <Text color="gray">Create and email a Stripe invoice. Admin auth + STRIPE_SECRET_KEY required.</Text>
            <Field label="Customer email" id="invoice-email">
              <TextField.Root
                id="invoice-email"
                value={invoiceForm.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInvoiceForm({ ...invoiceForm, email: e.target.value })}
              />
            </Field>
            <Field label="Customer name" id="invoice-name">
              <TextField.Root
                id="invoice-name"
                value={invoiceForm.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInvoiceForm({ ...invoiceForm, name: e.target.value })}
              />
            </Field>
            <Grid columns={{ initial: '1', sm: '2' }} gap="3">
              <Field label="Amount (USD)" id="invoice-amount">
                <TextField.Root
                  id="invoice-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={invoiceForm.amountUsd}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInvoiceForm({ ...invoiceForm, amountUsd: e.target.value })
                  }
                />
              </Field>
              <Field label="Description" id="invoice-description">
                <TextField.Root
                  id="invoice-description"
                  value={invoiceForm.description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInvoiceForm({ ...invoiceForm, description: e.target.value })
                  }
                />
              </Field>
            </Grid>
            <Button onClick={handleCreateInvoice} disabled={!user}>
              {user ? 'Send invoice' : 'Sign in to send'}
            </Button>
            {invoiceStatus && (
              <Text color="gray" size="2">
                {invoiceStatus}
              </Text>
            )}
          </Flex>
        </Card>
      </Grid>

      <Separator my="4" />

      <Flex align="center" gap="3" wrap="wrap">
        <Text color="gray">
          Saves write to Firestore collection `siteContent/public`. Restrict writes with an admin custom claim.
        </Text>
        <Button onClick={handleSave} disabled={saving || !user}>
          {saving ? 'Saving…' : user ? 'Save content' : 'Sign in to save'}
        </Button>
        {status && (
          <Text color="gray" size="2">
            {status}
          </Text>
        )}
      </Flex>
    </Container>
  )
}

export default AdminPage
