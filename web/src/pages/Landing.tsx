import { IconButton, Tooltip } from '@radix-ui/themes'
import { GlobeIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'

import type { Language, UiCopy } from '../i18n/uiCopy'
import type { SiteContent } from '../types'

interface Props {
  content: SiteContent
  loading: boolean
  error: string | null
  appearance: 'light' | 'dark'
  onToggleTheme: () => void
  language: Language
  onToggleLanguage: () => void
  copy: UiCopy
}

const LandingPage = ({
  content,
  loading,
  error,
  appearance,
  onToggleTheme,
  language,
  onToggleLanguage,
  copy,
}: Props) => {
  const { hero, stats, services, differentiators, projects, process, contact } = content

  return (
    <div className="page-shell">
      <div className="bg-accent" aria-hidden="true" />
      <header className="top-nav">
        <div className="brand">
          <span className="dot" />
          <span>Denuo Web</span>
        </div>
        <nav className="nav-links">
          <a href="#services">{copy.nav.services}</a>
          <a href="#projects">{copy.nav.work}</a>
          <a href="#process">{copy.nav.process}</a>
          <a href="#contact">{copy.nav.contact}</a>
          <Link className="ghost" to="/admin">
            {copy.nav.admin}
          </Link>
        </nav>
        <div className="nav-actions">
          <Tooltip content={copy.nav.themeToggle}>
            <IconButton variant="soft" onClick={onToggleTheme} aria-label={copy.nav.themeToggle}>
              {appearance === 'dark' ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip content={copy.nav.languageToggle}>
            <IconButton variant="soft" onClick={onToggleLanguage} aria-label={copy.nav.languageToggle}>
              <GlobeIcon />
              <span className="lang-code">{language === 'en' ? 'EN' : '日本'}</span>
            </IconButton>
          </Tooltip>
        </div>
      </header>

      {loading && <div className="banner info">Syncing live content…</div>}
      {error && <div className="banner warning">{error}</div>}

      <main className="page-content">
        <section id="top" className="hero">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="lede">{hero.subtitle}</p>
          <div className="cta-row">
            <a className="btn primary" href="#contact">
              {hero.primaryCta}
            </a>
            <a className="btn ghost" href="#projects">
              {hero.secondaryCta}
            </a>
          </div>
          <div className="hero-meta">
            <span className="badge">{hero.badge}</span>
            <div className="stat-row">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  {stat.helper && <p className="stat-helper">{stat.helper}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-header">
            <p className="kicker">{copy.sections.servicesKicker}</p>
            <h2>{copy.sections.servicesTitle}</h2>
            <p className="muted">{copy.sections.servicesLead}</p>
          </div>
          <div className="card-grid">
            {services.map((service) => (
              <article key={service.title} className="card">
                <div className="card-badge">{service.badge}</div>
                <h3>{service.title}</h3>
                <p className="muted">{service.summary}</p>
                <ul className="bullet-list">
                  {service.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="pill-row">
            {differentiators.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-header">
            <p className="kicker">{copy.sections.projectsKicker}</p>
            <h2>{copy.sections.projectsTitle}</h2>
            <p className="muted">{copy.sections.projectsLead}</p>
          </div>
          <div className="card-grid projects">
            {projects.map((project) => (
              <article key={project.name} className="card project">
                <div className="card-badge subtle">{project.status}</div>
                <div className="project-header">
                  <h3>{project.name}</h3>
                  {project.link && (
                    <a className="inline-link" href={project.link} target="_blank" rel="noreferrer">
                      View
                    </a>
                  )}
                </div>
                <p>{project.summary}</p>
                <p className="muted">{project.impact}</p>
                <div className="tag-row">
                  {project.stack.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section process">
          <div className="section-header">
            <p className="kicker">{copy.sections.processKicker}</p>
            <h2>{copy.sections.processTitle}</h2>
            <p className="muted">{copy.sections.processLead}</p>
          </div>
          <div className="process-grid">
            {process.map((step, idx) => (
              <div key={step.title} className="process-card">
                <div className="step-number">0{idx + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
                <p className="muted">Outcome: {step.outcome}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section cta">
          <div className="cta-card">
            <div>
              <p className="kicker">{copy.sections.contactKicker}</p>
              <h2>{contact.headline}</h2>
              <p className="muted">{contact.subhead}</p>
              <div className="pill-row">
                <span className="pill">Email: {contact.email}</span>
                <span className="pill">Phone: {contact.phone}</span>
              </div>
              {contact.note && <p className="muted">{contact.note}</p>}
            </div>
            <div className="cta-actions">
              <a className="btn primary" href={`mailto:${contact.email}`}>
                Email Jaron
              </a>
              {contact.calendly && (
                <a className="btn ghost" href={contact.calendly} target="_blank" rel="noreferrer">
                  Book a 30-min call
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <div className="brand">
            <span className="dot" />
            <span>Denuo Web, LLC</span>
          </div>
          <p className="muted">{copy.sections.footerLine}</p>
        </div>
        <div className="footer-links">
          <a href="mailto:jaron@rosenau.info">jaron@rosenau.info</a>
          <a href="tel:+19202920431">+1 (920) 292-0431</a>
          <Link to="/admin">{copy.nav.admin}</Link>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
