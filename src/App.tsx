import { useState, useEffect, useRef } from 'react'
import './App.css'
import {
  MEMBERS, SW_NOMINEES, STAGE_META,
  AVATAR_COLORS, SW_COLORS,
  NETSEC_EVENTS, NETSEC_LEADERS, NETSEC_LNT_TEAM,
} from './data/pages/netsec'

/* ── Utility hooks ───────────────────────────────────── */

function useCountUp(end: number, duration: number, run: boolean): number {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) { setVal(0); return }
    let raf: number
    const startTime = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(eased * end))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, end, duration])
  return val
}

type Template = 'network' | 'observability'

const TEMPLATE_META: Record<Template, { name: string; subtitle: string; heroTitle: string }> = {
  network: {
    name: 'Network and Security',
    subtitle: 'QBE Account Network Operations and Security Practice',
    heroTitle: 'Network and Security community of practice',
  },
  observability: {
    name: 'Observability',
    subtitle: 'QBE Account Observability and Monitoring Practice',
    heroTitle: 'Observability Community of Practice',
  },
}

function getTemplateFromHash(hash = window.location.hash): Template {
  const route = hash.replace(/^#\/?/, '')
  const [, section] = route.split('/')
  return section === 'observability' ? 'observability' : 'network'
}

/* ── OEM Logo Components ──────────────────────────────── */

function CiscoLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`oem-logo cisco-logo ${className}`}>
      <svg viewBox="0 0 82 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1"  y="15" width="10" height="12" rx="2.5" fill="#049FD9"/>
        <rect x="15" y="7"  width="10" height="20" rx="2.5" fill="#049FD9"/>
        <rect x="29" y="1"  width="10" height="26" rx="2.5" fill="#049FD9"/>
        <rect x="43" y="1"  width="10" height="26" rx="2.5" fill="#049FD9"/>
        <rect x="57" y="7"  width="10" height="20" rx="2.5" fill="#049FD9"/>
        <rect x="71" y="15" width="10" height="12" rx="2.5" fill="#049FD9"/>
      </svg>
      <span className="oem-name cisco-name">cisco</span>
    </div>
  )
}

function SolarWindsLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`oem-logo sw-logo ${className}`}>
      <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17" cy="17" r="13.5" stroke="#F57421" strokeWidth="2.5" fill="none"/>
        <circle cx="17" cy="17" r="8" stroke="#FF9A45" strokeWidth="2" fill="none" strokeDasharray="8 6" strokeLinecap="round"/>
        <circle cx="17" cy="17" r="3.5" fill="#F57421"/>
        <line x1="17" y1="3" x2="17" y2="0.5" stroke="#F57421" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="17" y1="34" x2="17" y2="31" stroke="#F57421" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="3"  y1="17" x2="0.5" y2="17" stroke="#F57421" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="34" y1="17" x2="31"  y2="17" stroke="#F57421" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <span className="oem-name sw-name">SolarWinds</span>
    </div>
  )
}

function DynatraceLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`oem-logo dt-logo ${className}`}>
      <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="17,2 31,10 31,24 17,32 3,24 3,10" fill="rgba(20,150,255,0.1)" stroke="#1496FF" strokeWidth="1.8"/>
        <path d="M12 22 L12 12 L17.5 12 C21.6 12 24.5 14.2 24.5 17 C24.5 19.8 21.6 22 17.5 22 Z" fill="#1496FF"/>
        <rect x="14" y="12" width="2.5" height="10" fill="white"/>
      </svg>
      <span className="oem-name dt-name">dynatrace</span>
    </div>
  )
}

function Navbar({ template }: { template: Template }) {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [progress, setProgress]         = useState(0)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['about', template === 'network' ? 'pathway' : 'solarwinds', 'events', template === 'observability' ? 'resources' : null, 'members', 'celebrate', 'team'].filter(Boolean) as string[]
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.35 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [template])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navItems = [
    { label: 'About',        id: 'about' },
    { label: template === 'network' ? 'Certification' : 'SolarWinds', id: template === 'network' ? 'pathway' : 'solarwinds' },
    { label: 'Events',       id: 'events' },
    ...(template === 'observability' ? [{ label: 'Resources', id: 'resources' }] : []),
    { label: 'Members',      id: 'members' },
    { label: '🏅 Celebrate', id: 'celebrate' },
    { label: 'Leadership',   id: 'team' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
      <div className="nav-back-bar">
        <button className="nav-back-btn" onClick={() => { window.location.hash = '/' }}>
          ← All Communities
        </button>
      </div>
      <div className="nav-container">
        <div className="nav-brand" onClick={() => scrollTo('hero')}>
          <div className="acc-arrow">›</div>
          <div className="nav-brand-text">
            <span className="nav-brand-main">{TEMPLATE_META[template].heroTitle}</span>
            <span className="nav-brand-sub">{TEMPLATE_META[template].subtitle}</span>
          </div>
        </div>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(({ label, id }) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} className={`nav-link ${activeSection === id ? 'active' : ''}`}>{label}</button>
            </li>
          ))}
          <li>
            <button onClick={() => scrollTo('join')} className="nav-link nav-cta">Join CoP</button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

function Hero({ template }: { template: Template }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const nodePositions = [
    { size: 8,  top: '15%', left: '10%', delay: '0s' },
    { size: 12, top: '30%', left: '25%', delay: '0.5s' },
    { size: 6,  top: '60%', left: '15%', delay: '1s' },
    { size: 10, top: '20%', left: '45%', delay: '1.5s' },
    { size: 8,  top: '70%', left: '40%', delay: '0.3s' },
    { size: 14, top: '40%', left: '70%', delay: '0.8s' },
    { size: 6,  top: '80%', left: '60%', delay: '1.2s' },
    { size: 10, top: '25%', left: '80%', delay: '0.6s' },
    { size: 8,  top: '55%', left: '85%', delay: '1.8s' },
    { size: 12, top: '10%', left: '65%', delay: '0.4s' },
    { size: 6,  top: '85%', left: '30%', delay: '2s' },
    { size: 10, top: '45%', left: '55%', delay: '0.9s' },
  ]
  const edges = [[0,1],[1,2],[1,3],[2,4],[3,4],[3,11],[3,9],[4,10],[5,7],[5,11],[5,8],[7,9],[8,6],[9,5],[11,6],[10,2]]
  const nodeCoords = nodePositions.map(n => ({ x: parseFloat(n.left), y: parseFloat(n.top) }))

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <svg className="hero-topo-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodeCoords[a].x} y1={nodeCoords[a].y} x2={nodeCoords[b].x} y2={nodeCoords[b].y} className="topo-line" />
          ))}
        </svg>
        {nodePositions.map((node, i) => (
          <div
            key={i}
            className="node"
            style={{
              width: node.size,
              height: node.size,
              top: node.top,
              left: node.left,
              animationDelay: node.delay,
            }}
          />
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-badges">
          <span className="badge badge-acc">Accenture</span>
          <span className="badge badge-qbe">QBE Account</span>
        </div>
        <h1 className="hero-title">
          {TEMPLATE_META[template].heroTitle}
        </h1>
        <p className="hero-desc">
          {template === 'network'
            ? 'Driving network excellence and security operations across QBE Account’s technology landscape. Sharing expertise and advancing capabilities through a stronger, safer infrastructure.'
            : 'Driving network excellence and operational observability across QBE Account’s technology landscape. Sharing expertise, advancing capabilities, and building the future of intelligent infrastructure.'}
        </p>
        <div className="hero-actions">
          <button onClick={() => scrollTo('about')} className="btn-primary">Explore CoP</button>
          <button onClick={() => scrollTo('join')} className="btn-secondary">Join the Community</button>
        </div>
        <div className="hero-scroll-cue" onClick={() => scrollTo('about')}>
          <div className="scroll-line"></div>
          <span>Scroll to discover</span>
        </div>
      </div>
    </section>
  )
}

function About({ template }: { template: Template }) {
  const pillars = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="36" height="36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
        </svg>
      ),
      title: 'Our Mission',
      desc: template === 'network'
        ? 'To elevate network and security capabilities across QBE Account — fostering collaboration, sharing knowledge, and driving operational excellence across secure infrastructure.'
        : 'To elevate network and observability capabilities across QBE Account — fostering collaboration, sharing knowledge, and driving operational excellence through innovative monitoring solutions.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="36" height="36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      title: 'Our Vision',
      desc: template === 'network'
        ? 'A secure, resilient network ecosystem where proactive threat protection and intelligent automation enable QBE Account to deliver uninterrupted service at scale.'
        : 'A fully observable, self-healing network ecosystem where proactive insights and intelligent automation enable QBE Account to deliver uninterrupted service at scale.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="36" height="36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.3l-6.2 4-2.4-7.4L2 9.4h7.6z"/>
        </svg>
      ),
      title: 'Our Values',
      desc: 'Collaboration, continuous learning, innovation, transparency, and data-driven decision-making are the principles that guide our community forward.',
    },
  ]

  return (
    <section id="about" className="section about-section">
      <div className="container reveal">
        <div className="section-label">About the CoP</div>
        <h2 className="section-title">What We Stand For</h2>
        <p className="section-desc">
          {template === 'network'
            ? 'The Network and Security Community of Practice is a cross-functional group of technology professionals at QBE Account dedicated to advancing network operations and security capabilities.'
            : 'The Network & Observability Community of Practice is a cross-functional group of technology professionals at QBE Account dedicated to advancing monitoring, observability, and network operations capabilities.'}
        </p>
        <div className="pillars-grid">
          {pillars.map((pillar, i) => (
            <div key={i} className="pillar-card">
              <div className="pillar-icon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const n34 = useCountUp(34, 1200, inView)
  const n17 = useCountUp(17, 1500, inView)
  const n9  = useCountUp(9,  1800, inView)
  const n24 = useCountUp(24, 1000, inView)

  const stats = [
    { value: n34, label: 'Foundation Certified', desc: 'Accenture Network Foundation' },
    { value: n17, label: 'CCNA Boot Camp',        desc: '6-week intensive training'    },
    { value: n9,  label: 'CCNA Eligible',         desc: 'Internal assessment cleared'  },
    { value: n24, label: 'Sessions Held',          desc: 'Knowledge sharing sessions'  },
  ]

  return (
    <section className="stats-section" ref={ref}>
      <div className="container reveal">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-desc">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


function Events() {
  const [attendModal, setAttendModal] = useState<{ title: string; type: string } | null>(null)
  const [attendName, setAttendName] = useState('')
  const [attendEmail, setAttendEmail] = useState('')

  const handleAttendSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Want to Attend: ${attendModal?.title}`)
    const body = encodeURIComponent(`Hi Pramodh,\n\nI would like to attend:\n\nEvent: ${attendModal?.title}\nType: ${attendModal?.type}\n\nName: ${attendName}\nEmail: ${attendEmail}\n\nPlease confirm my attendance.\n\nThank you.`)
    window.open(`mailto:pramodh.nagaraja@accenture.com?subject=${subject}&body=${body}`)
    setAttendModal(null); setAttendName(''); setAttendEmail('')
  }

  const events = NETSEC_EVENTS

  return (
    <section id="events" className="section events-section">
      <div className="container reveal">
        <div className="section-label">Stay Connected</div>
        <h2 className="section-title">Upcoming Sessions</h2>
        <p className="section-desc">
          Regular knowledge-sharing sessions, workshops, and deep dives. All QBE Account technology professionals are welcome.
        </p>
        <div className="events-grid">
          {events.map((event, i) => (
            <div key={i} className="event-card">
              <div className="event-date-block" style={{ background: event.vendor === 'dynatrace' ? '#1496FF' : event.vendor === 'solarwinds' ? '#F57421' : 'var(--acc-purple)' }}>
                <span className="event-day">{event.day}</span>
                <span className="event-month">{event.month}</span>
              </div>
              <div className="event-details">
                <div className="event-details-top">
                  <span className="event-badge">{event.type}</span>
                  {event.vendor === 'dynatrace'  && <DynatraceLogo  className="event-vendor-logo" />}
                  {event.vendor === 'solarwinds' && <SolarWindsLogo className="event-vendor-logo" />}
                </div>
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
                <div className="event-meta">
                  <span>🕐 {event.time}</span>
                  <button className="event-register" onClick={() => setAttendModal({ title: event.title, type: event.type })}>Want to attend?</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {attendModal && (
          <div className="attend-overlay" onClick={() => setAttendModal(null)}>
            <div className="attend-modal" onClick={e => e.stopPropagation()}>
              <button className="attend-modal-close" onClick={() => setAttendModal(null)}>✕</button>
              <div className="attend-modal-header">
                <div className="attend-modal-icon">📅</div>
                <div>
                  <h3>Register Your Interest</h3>
                  <p className="attend-modal-event">{attendModal.title}</p>
                </div>
              </div>
              <form onSubmit={handleAttendSubmit} className="attend-modal-form">
                <input type="text" placeholder="Your full name" required value={attendName} onChange={e => setAttendName(e.target.value)} />
                <input type="email" placeholder="Your email address" required value={attendEmail} onChange={e => setAttendEmail(e.target.value)} />
                <button type="submit" className="btn-submit">Send Registration Interest ↗</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Resources() {
  const streams = [
    {
      id: 'network',
      logo: <div className="res-icon-wrap" style={{ background: '#2563eb' }}><span>🌐</span></div>,
      title: 'Network & Security',
      color: '#2563eb',
      bg: '#eff6ff',
      border: '#93c5fd',
      tagColor: '#1d4ed8',
      tagBg: '#dbeafe',
      items: [
        { name: 'Network Foundation Study Guide',     type: 'Study Guide'  },
        { name: 'Network Monitoring Playbook',         type: 'Playbook'     },
        { name: 'Security Architecture Templates',    type: 'Template'     },
        { name: 'CCNA Exam Preparation Pack',         type: 'Training'     },
        { name: 'Network KPI & SLO Reference',        type: 'Reference'    },
      ],
    },
    {
      id: 'dynatrace',
      logo: <DynatraceLogo className="res-oem-logo" />,
      title: 'Dynatrace',
      color: '#1496FF',
      bg: '#e8f4ff',
      border: '#bfdbfe',
      tagColor: '#0070cc',
      tagBg: '#e0f0ff',
      items: [
        { name: 'Observability Maturity Model',       type: 'Framework'    },
        { name: 'APM & Full-Stack Monitoring Guide',  type: 'Tech Guide'   },
        { name: 'Customer KPI Metrics Library',       type: 'Reference'    },
        { name: 'Dynatrace + ServiceNow Integration', type: 'Integration'  },
        { name: 'Dashboarding Best Practices',        type: 'Best Practice'},
      ],
    },
    {
      id: 'solarwinds',
      logo: <SolarWindsLogo className="res-oem-logo" />,
      title: 'SolarWinds',
      color: '#F57421',
      bg: '#fff4ec',
      border: '#fed7aa',
      tagColor: '#c2410c',
      tagBg: '#ffedd5',
      items: [
        { name: 'SolarWinds Partner Academy Portal',  type: 'Portal'       },
        { name: 'NPM Configuration Guide',            type: 'Tech Guide'   },
        { name: 'IPAM Best Practices',                type: 'Best Practice'},
        { name: 'Observability SaaS Cert Pack',       type: 'Certification'},
        { name: 'SolarWinds + Workday Training Path', type: 'Training'     },
      ],
    },
  ]

  return (
    <section id="resources" className="section resources-section">
      <div className="container reveal">
        <div className="section-label">Knowledge Hub</div>
        <h2 className="section-title">Resources &amp; Artifacts</h2>
        <p className="section-desc">
          Curated resources organised by technology stream to support your certification and observability journey.
        </p>
        <div className="res-streams-grid">
          {streams.map(stream => (
            <div key={stream.id} className="res-stream-card" style={{ borderColor: stream.border, background: stream.bg }}>
              <div className="res-stream-top">
                {stream.logo}
                <h3 className="res-stream-title" style={{ color: stream.color }}>{stream.title}</h3>
              </div>
              <ul className="res-stream-list">
                {stream.items.map((item, i) => (
                  <li key={i} className="res-stream-item">
                    <span className="res-item-dot" style={{ background: stream.color }} />
                    <span className="res-item-name">{item.name}</span>
                    <span className="res-item-tag" style={{ color: stream.tagColor, background: stream.tagBg }}>{item.type}</span>
                  </li>
                ))}
              </ul>
              <button className="res-stream-btn" style={{ background: stream.color }}>View All →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificationPathway() {
  const [pathwayOpen, setPathwayOpen] = useState(true)

  const stages = [
    {
      num: 1,
      icon: '🎓',
      title: 'Network Foundation',
      subtitle: 'Accenture Certification',
      count: 34,
      total: 34,
      color: '#16a34a',
      bg: '#f0fdf4',
      border: '#86efac',
      desc: 'All 34 team members completed the Accenture Network Foundation Certification, establishing a strong core networking knowledge base.',
      rate: null,
    },
    {
      num: 2,
      icon: '💻',
      title: 'CCNA Boot Camp',
      subtitle: '6-Week Intensive Training',
      count: 17,
      total: 34,
      color: '#2563eb',
      bg: '#eff6ff',
      border: '#93c5fd',
      desc: '17 high-performers were selected to advance into the intensive 6-week Cisco CCNA Boot Camp training program.',
      rate: '50% progression',
    },
    {
      num: 3,
      icon: '🏆',
      title: 'CCNA Eligibility',
      subtitle: 'Internal Assessment Cleared',
      count: 9,
      total: 17,
      color: '#A100FF',
      bg: '#faf5ff',
      border: '#d8b4fe',
      desc: '9 candidates successfully cleared the internal CCNA eligibility assessment and are ready for Cisco CCNA certification.',
      rate: '53% pass rate',
    },
  ]

  const ccnaNames = MEMBERS.filter(m => m.stage === 3).map(m => m.name)

  return (
    <section id="pathway" className="section pathway-section">
      <div className="container reveal">
        <div className="dir-section-header">
          <div>
            <div className="section-label">Achievement Snapshot</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Network Certification (CCNA)</h2>
          </div>
          <button
            className="collapse-toggle"
            onClick={() => setPathwayOpen(o => !o)}
            aria-label={pathwayOpen ? 'Collapse section' : 'Expand section'}
          >
            <span className="toggle-icon">{pathwayOpen ? '−' : '+'}</span>
            <span className="toggle-label">{pathwayOpen ? 'Minimise' : 'Expand'}</span>
          </button>
        </div>

        {pathwayOpen && (
          <>
        <p className="section-desc">
          A structured three-stage certification journey — from foundational knowledge to CCNA readiness —
          showcasing our team's commitment to continuous learning and technical excellence.
        </p>

        <div className="pathway-pipeline">
          {stages.map((stage, i) => (
            <div key={i} className="pipeline-row">
              <div className="pathway-card" style={{ borderColor: stage.border, background: stage.bg }}>
                <div className="pathway-card-header">
                  <div className="pathway-stage-num" style={{ background: stage.color }}>
                    Stage {stage.num}
                  </div>
                  <span className="pathway-icon">{stage.icon}</span>
                </div>
                <h3 style={{ color: stage.color }}>{stage.title}</h3>
                <p className="pathway-subtitle">{stage.subtitle}</p>
                <div className="pathway-count" style={{ color: stage.color }}>
                  {stage.count}
                  <span>members</span>
                </div>
                <div className="pathway-bar-wrap">
                  <div
                    className="pathway-bar-fill"
                    style={{
                      width: `${Math.round((stage.count / 34) * 100)}%`,
                      background: stage.color,
                    }}
                  />
                </div>
                <div className="pathway-bar-label" style={{ color: stage.color }}>
                  {Math.round((stage.count / 34) * 100)}% of total cohort
                </div>
                <p className="pathway-desc">{stage.desc}</p>
                {stage.rate && (
                  <div className="pathway-rate" style={{ color: stage.color, borderColor: stage.border }}>
                    ↑ {stage.rate} from previous stage
                  </div>
                )}
              </div>
              {i < stages.length - 1 && (
                <div className="pipeline-connector">
                  <div className="connector-line"></div>
                  <div className="connector-arrow">›</div>
                  <div className="connector-label">
                    {i === 0 ? '17 advanced' : '9 cleared'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="ccna-spotlight">
          <div className="spotlight-header">
            <span className="spotlight-icon">🏆</span>
            <div>
              <h3>CCNA Certificate Program — Top Achievers</h3>
              <p>9 members who cleared the internal CCNA eligibility assessment — ready for full Cisco CCNA</p>
            </div>
          </div>
          <div className="spotlight-names">
            {ccnaNames.map((name, i) => (
              <div key={i} className="spotlight-chip">
                <span className="chip-avatar">
                  {MEMBERS.find(m => m.name === name)?.initials}
                </span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
          </>
        )}
      </div>
    </section>
  )
}

type StageFilter = 'all' | 1 | 2 | 3

function Members({ template }: { template: Template }) {
  const [sectionOpen, setSectionOpen]   = useState(true)
  const [streamOpen, setStreamOpen]     = useState(true)
  const [search, setSearch]             = useState('')
  const [activeFilter, setActiveFilter] = useState<StageFilter>('all')
  const [localMembers, setLocalMembers] = useState(() => {
    const storageKey = `cop_members_${template}`
    return JSON.parse(localStorage.getItem(storageKey) || '[]')
  })

  useEffect(() => {
    const storageKey = `cop_members_${template}`
    const handleMemberAdded = () => {
      const data = JSON.parse(localStorage.getItem(storageKey) || '[]')
      setLocalMembers(data)
    }
    window.addEventListener('memberAdded', handleMemberAdded)
    return () => window.removeEventListener('memberAdded', handleMemberAdded)
  }, [template])

  const isNetwork = template === 'network'
  const allMembers = [...MEMBERS, ...localMembers]
  const displayCount = isNetwork ? allMembers.length : SW_NOMINEES.length

  const filters: { key: StageFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All',              count: allMembers.length },
    { key: 3,     label: '🏆 CCNA Eligible', count: allMembers.filter(m => m.stage === 3).length },
    { key: 2,     label: '💻 Boot Camp',     count: allMembers.filter(m => m.stage === 2).length },
    { key: 1,     label: '🎓 Foundation',    count: allMembers.filter(m => m.stage === 1).length },
  ]

  const filteredNetwork = allMembers.filter(m => {
    const matchStage  = activeFilter === 'all' || m.stage === activeFilter
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
    return matchStage && matchSearch
  })

  const filteredObs = SW_NOMINEES.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  const filteredMembers = isNetwork ? filteredNetwork : filteredObs

  return (
    <section id="members" className="section members-section">
      <div className="container reveal">

        <div className="dir-section-header">
          <div>
            <div className="section-label">{isNetwork ? 'Network & Security' : 'Observability'}</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              {isNetwork ? 'Network Members Directory' : 'Observability Nominees'}
            </h2>
          </div>
          <button
            className="collapse-toggle"
            onClick={() => setSectionOpen(o => !o)}
            aria-label={sectionOpen ? 'Collapse section' : 'Expand section'}
          >
            <span className="toggle-icon">{sectionOpen ? '−' : '+'}</span>
            <span className="toggle-label">{sectionOpen ? 'Minimise' : 'Expand'}</span>
          </button>
        </div>

        {sectionOpen && (
          <>
            <div className="dir-search-bar">
              <div className="members-search-wrap" style={{ maxWidth: '100%' }}>
                <svg className="search-icon" viewBox="0 0 20 20" fill="none">
                  <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder={isNetwork ? 'Search network members…' : 'Search observability nominees…'}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="members-search"
                />
                {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
              </div>
              <div className="dir-total-pill">
                {displayCount} {isNetwork ? 'members' : 'nominees'} · {filteredMembers.length} shown
              </div>
            </div>

            <div className="stream-block">
              <button
                className={`stream-header ${isNetwork ? 'network-stream' : 'obs-stream'}`}
                onClick={() => setStreamOpen(o => !o)}
              >
                <div className="stream-header-left">
                  <span className="stream-emoji">{isNetwork ? '🌐' : '📊'}</span>
                  <div>
                    <span className="stream-name">{isNetwork ? 'Network Stream' : 'Observability Stream'}</span>
                    <span className="stream-sub">
                      {isNetwork ? 'CCNA Certification Journey' : 'SolarWinds Certification Program'}
                    </span>
                  </div>
                </div>
                <div className="stream-header-right">
                  <span className={`stream-pill ${isNetwork ? '' : 'obs'}`}>
                    {displayCount} {isNetwork ? 'members' : 'nominees'}
                  </span>
                  <span className="stream-toggle">{streamOpen ? '−' : '+'}</span>
                </div>
              </button>

              {streamOpen && (
                <div className="stream-body">
                  {isNetwork && (
                    <div className="stage-filters" style={{ marginBottom: 16 }}>
                      {filters.map(f => (
                        <button
                          key={String(f.key)}
                          className={`stage-filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                          onClick={() => setActiveFilter(f.key)}
                        >
                          {f.label}
                          <span className="filter-count">{f.count}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredMembers.length > 0 ? (
                    <div className="members-grid">
                      {isNetwork ? (
                        filteredNetwork.map(member => {
                          const idx  = allMembers.findIndex(m => m.name === member.name)
                          const meta = STAGE_META[member.stage as 1 | 2 | 3]
                          return (
                            <div key={member.name} className="member-card">
                              <div className="member-avatar" style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}>
                                {member.initials}
                              </div>
                              <div className="member-info">
                                <h4>{member.name}</h4>
                                <span className="member-stage-badge"
                                  style={{ color: meta.text, background: meta.bg, border: `1px solid ${meta.color}22` }}>
                                  <span className="cert-dot" style={{ background: meta.color }}></span>
                                  {meta.short}
                                </span>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        filteredObs.map((member, i) => (
                          <div key={member.name} className={`member-card ${member.ccna !== null ? 'multi-prog' : ''}`}>
                            <div className="member-avatar" style={{ background: SW_COLORS[i % SW_COLORS.length] }}>
                              {member.initials}
                            </div>
                            <div className="member-info">
                              <h4>{member.name}</h4>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                <span className="member-stage-badge"
                                  style={{ color: '#c45000', background: '#fff3eb', border: '1px solid #ffcba033' }}>
                                  <span className="cert-dot" style={{ background: '#E85D00' }}></span>
                                  SW Nominee
                                </span>
                                {member.ccna !== null && (
                                  <span className="member-stage-badge"
                                    style={{ color: STAGE_META[member.ccna].text, background: STAGE_META[member.ccna].bg, border: `1px solid ${STAGE_META[member.ccna].color}22` }}>
                                    <span className="cert-dot" style={{ background: STAGE_META[member.ccna].color }}></span>
                                    {STAGE_META[member.ccna].short}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="members-empty">
                      <div className="empty-icon">🔍</div>
                      <p>{isNetwork ? 'No network members' : 'No observability nominees'} match <strong>"{search}"</strong></p>
                      <button onClick={() => { setSearch(''); if (isNetwork) setActiveFilter('all') }} className="clear-search-btn">Reset</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function SpotlightPhoto({ name, initials, src }: { name: string; initials: string; src?: string }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const showPhoto = !!src && !imgError
  return (
    <div className="photo-glow-ring">
      <div className="photo-inner-ring">
        {showPhoto && (
          <img
            src={src}
            alt={name}
            className={`celebrate-photo ${imgLoaded ? 'loaded' : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
        {(!showPhoto || !imgLoaded) && (
          <div className={`celebrate-avatar ${showPhoto && imgLoaded ? 'hidden' : ''}`}>
            {initials}
          </div>
        )}
      </div>
    </div>
  )
}

const BASE = import.meta.env.BASE_URL
const SPOTLIGHT_PHOTOS: Record<string, string> = {
  'Syed Ateeb Ahmed':       `${BASE}ateeb.jpg`,
  'Kuldeep Rajpoot':        `${BASE}Kuldeep.jpg`,
  'Akanksha Bisht':         `${BASE}Akansha.jpg`,
  'Shaik Zubair Ahmed':     `${BASE}Zubair.jpg`,
  'Koteswararao Bodapati':  `${BASE}Koteshwar.jpg`,
}

function CelebrateLearning({ template }: { template: Template }) {
  const ccnaTiles = template === 'network'
    ? MEMBERS.filter(m => m.stage === 3)
    : []

  const defaultIdx = Math.max(0, ccnaTiles.findIndex(m => m.name === 'Syed Ateeb Ahmed'))
  const [selectedIdx, setSelectedIdx] = useState(defaultIdx)

  const selected = ccnaTiles[selectedIdx] ?? ccnaTiles[0]
  const isAteeb = selected?.name === 'Syed Ateeb Ahmed'
  const copName = template === 'network'
    ? 'QBE Account Network and Security CoP'
    : 'QBE Account Network & Observability CoP'
  const copChip = template === 'network'
    ? 'Network and Security Community of Practice'
    : 'Network and Observability Community of Practice'

  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <section id="celebrate" className="celebrate-section">
      <div className="sparkle-bg" aria-hidden="true">
        {particles.map(i => (
          <span key={i} className={`sparkle sparkle-${i}`} />
        ))}
      </div>

      <div className="container reveal">
        <div className="celebrate-inner">
          <div className="celebrate-eyebrow">
            <span className="celebrate-stars">✦ ✦ ✦</span>
            <span className="celebrate-label">Celebrate Learning</span>
            <span className="celebrate-stars">✦ ✦ ✦</span>
          </div>

          <div key={`photo-${selectedIdx}`} className="celebrate-photo-wrap">
            <SpotlightPhoto
              key={selectedIdx}
              name={selected?.name ?? ''}
              initials={selected?.initials ?? ''}
              src={SPOTLIGHT_PHOTOS[selected?.name ?? '']}
            />
            <div className="ccna-pin">
              <span className="ccna-pin-icon">🏅</span>
              <span>CCNA Certified</span>
            </div>
          </div>

          <div key={`text-${selectedIdx}`} className="celebrate-spotlight-text">
            <p className="celebrate-congrats">Congratulations!</p>
            <h2 className="celebrate-name">{selected?.name}</h2>
            <p className="celebrate-subtitle">has successfully achieved</p>

            <div className="celebrate-cert-block">
              <CiscoLogo className="celebrate-cisco-logo" />
              <div className="cert-title-main">CCNA Certification</div>
              <div className="cert-title-sub">Cisco Certified Network Associate</div>
            </div>

            <p className="celebrate-context">
              {isAteeb
                ? <>The first member of the <strong>{copName}</strong> to attain CCNA certification through the QBE Account Network Certification Program — a testament to dedication, technical excellence, and continuous learning.</>
                : <>A proud member of the <strong>{copName}</strong> who has attained CCNA certification through the QBE Account Network Certification Program — a testament to dedication, technical excellence, and continuous learning.</>
              }
            </p>

            <div className="celebrate-orgs">
              <span className="org-chip">QBE Account</span>
              <span className="org-divider">✦</span>
              <span className="org-chip">Accenture</span>
              <span className="org-divider">✦</span>
              <span className="org-chip">{copChip}</span>
            </div>
          </div>

          {ccnaTiles.length > 0 && (
            <div className="celebrate-tiles-wrap">
              <p className="celebrate-tiles-heading">
                <span aria-hidden="true">🏆</span> All CCNA Certified Members
              </p>
              <div className="celebrate-tiles-track">
                <div className="celebrate-tiles-scroll">
                  {ccnaTiles.map((member, idx) => (
                    <div
                      key={member.name}
                      className={`celebrate-tile${idx === selectedIdx ? ' celebrate-tile-active' : ''}`}
                      onClick={() => setSelectedIdx(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && setSelectedIdx(idx)}
                      aria-pressed={idx === selectedIdx}
                    >
                      <div className="celebrate-tile-ring">
                        <div className="celebrate-tile-ring-inner">
                          <div
                            className="celebrate-tile-avatar"
                            style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                          >
                            {member.initials}
                          </div>
                        </div>
                      </div>
                      <div className="celebrate-tile-name">{member.name}</div>
                      <div className="celebrate-tile-badge">
                        <span aria-hidden="true">🏅</span> CCNA Certified
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function LeaderPhoto({ src, alt, initials }: { src: string; alt: string; initials: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  return (
    <div className="leader-photo-wrap">
      {!error && (
        <img
          src={src}
          alt={alt}
          className={`leader-photo ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      {(error || !loaded) && (
        <div className={`leader-initials ${loaded ? 'hidden' : ''}`}>{initials}</div>
      )}
    </div>
  )
}

function Leadership({ template }: { template: Template }) {
  const leaders = NETSEC_LEADERS

  return (
    <section id="team" className="section team-section">
      <div className="container reveal">
        <div className="section-label">Meet the Team</div>
        <h2 className="section-title">CoP Leadership</h2>
        <p className="section-desc">
          {template === 'network'
            ? 'Experienced leaders driving network and security excellence across QBE Account’s global technology footprint.'
            : 'Experienced leaders driving network and observability excellence across QBE Account’s global technology footprint.'}
        </p>
        <div className="leaders-grid">
          {leaders.map((leader, i) => (
            <div key={i} className={`leader-card ${leader.badgeStyle}`}>
              <div className="leader-card-top">
                <LeaderPhoto src={leader.photo} alt={leader.name} initials={leader.initials} />
              </div>
              <div className="leader-card-body">
                <span className={`leader-badge ${leader.badgeStyle}`}>{leader.badge}</span>
                <h3>{leader.name}</h3>
                <p>{leader.role}</p>
                <a href={`mailto:${leader.email}`} className="leader-connect-btn">Connect →</a>
              </div>
            </div>
          ))}
        </div>

        {/* Learning & Training Team */}
        <div className="lnt-section">
          <div className="lnt-header">
            <div className="lnt-header-left">
              <span className="lnt-icon">📚</span>
              <div>
                <h3>Learning &amp; Training Team</h3>
                <p>Points of Contact for all certification and training programmes</p>
              </div>
            </div>
            <span className="lnt-tag">POC</span>
          </div>
          <div className="lnt-grid">
            {NETSEC_LNT_TEAM.map((poc, i) => (
              <a key={i} href={`mailto:${poc.email}`} className="lnt-card">
                <div className="lnt-avatar">{poc.initials}</div>
                <div className="lnt-info">
                  <h4>{poc.name}</h4>
                  <span>{poc.email}</span>
                </div>
                <div className="lnt-mail-icon">✉</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Join({ template }: { template: Template }) {
  const [formName,     setFormName]     = useState('')
  const [formEmail,    setFormEmail]    = useState('')
  const [formRole,     setFormRole]     = useState('')
  const [formInterest, setFormInterest] = useState('')
  const [formNote,     setFormNote]     = useState('')
  const [message,      setMessage]      = useState(null as { type: 'success' | 'error'; text: string } | null)

  const benefits = template === 'network' ? [
    'Access exclusive knowledge resources and playbooks',
    'Connect with network & security experts across QBE Account',
    'Participate in hands-on workshops and tool showcases',
    'Shape QBE Account’s network and security operations',
    'Earn recognition for your contributions and certifications',
  ] : [
    'Access exclusive knowledge resources and playbooks',
    'Connect with network & observability experts across QBE Account',
    'Participate in hands-on workshops and tool showcases',
    "Shape QBE Account's observability strategy and standards",
    'Earn recognition for your contributions and certifications',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const storageKey = `cop_members_${template}`
    const existingMembers = JSON.parse(localStorage.getItem(storageKey) || '[]')

    const initials = formName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    const newMember = {
      name: formName,
      initials,
      stage: 1,
    }

    const formNameLower = formName.toLowerCase().trim()
    if (existingMembers.some((m: any) => (m.name || '').toLowerCase().trim() === formNameLower)) {
      setMessage({ type: 'error', text: 'You have already joined this community!' })
      setTimeout(() => setMessage(null), 4000)
      return
    }

    existingMembers.push(newMember)
    localStorage.setItem(storageKey, JSON.stringify(existingMembers))

    window.dispatchEvent(new Event('memberAdded'))

    const copName = template === 'network' ? 'Network and Security' : 'Network and Observability'
    const subject = encodeURIComponent(`${copName} CoP Membership Request — ${formName}`)
    const body = encodeURIComponent(
      `Hi CoP Lead,\n\n${formName} has requested to join the ${copName} Community of Practice.\n\nDetails:\n- Email: ${formEmail}\n- Role: ${formRole}\n- Interest: ${formInterest}${formNote ? `\n- Message: ${formNote}` : ''}\n\nPlease reach out to onboard them.\n\nThank you.`
    )
    window.open(`mailto:pramodh.nagaraja@accenture.com?subject=${subject}&body=${body}`)

    setMessage({ type: 'success', text: 'Added to community! Email to CoP Lead is opening...' })
    setFormName('')
    setFormEmail('')
    setFormRole('')
    setFormInterest('')
    setFormNote('')
    setTimeout(() => setMessage(null), 4000)
  }

  return (
    <section id="join" className="join-section">
      <div className="container reveal">
        <div className="join-content">
          <div className="join-text">
            <div className="section-label light">Get Involved</div>
            <h2>Join the Community</h2>
            <p>
              {template === 'network'
                ? 'Whether you’re a network or security practitioner at QBE, there’s a place for you in our CoP. Contribute, learn, and grow with us.'
                : 'Whether you’re an observability practitioner, network engineer, or technology enthusiast at QBE, there’s a place for you in our CoP. Contribute, learn, and grow with us.'}
            </p>
            <ul className="join-benefits">
              {benefits.map((b, i) => (<li key={i}>{b}</li>))}
            </ul>
          </div>
          <div className="join-form">
            <h3>Request to Join</h3>
            {message && (
              <div className={`form-message form-message-${message.type}`} style={{
                padding: '12px 16px',
                marginBottom: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
                color: message.type === 'success' ? '#065f46' : '#7f1d1d',
                border: `1px solid ${message.type === 'success' ? '#86efac' : '#fca5a5'}`,
              }}>
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" required value={formName} onChange={e => setFormName(e.target.value)} />
              <input type="email" placeholder="Work Email (@accenture.com)" required value={formEmail} onChange={e => setFormEmail(e.target.value)} />
              <input type="text" placeholder="Role / Job Title" required value={formRole} onChange={e => setFormRole(e.target.value)} />
              <select required value={formInterest} onChange={e => setFormInterest(e.target.value)}>
                <option value="" disabled>Area of Interest</option>
                <option value="Network">Network</option>
                <option value="Security">Security</option>
                <option value="Dynatrace">Dynatrace</option>
                <option value="SolarWinds">SolarWinds</option>
              </select>
              <textarea placeholder="Brief introduction (optional)" rows={3} value={formNote} onChange={e => setFormNote(e.target.value)} />
              <button type="submit" className="btn-submit">Submit Request ↗</button>
              <p className="join-form-hint">You will be added to the members list and an email will open for you to send to the CoP Lead.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ template }: { template: Template }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { label: 'About CoP',      id: 'about' },
    { label: template === 'network' ? 'Certification' : 'SolarWinds', id: template === 'network' ? 'pathway' : 'solarwinds' },
    { label: 'Events',        id: 'events' },
    ...(template === 'observability' ? [{ label: 'Resources', id: 'resources' }] : []),
    { label: 'Members',       id: 'members' },
    { label: 'Leadership',    id: 'team' },
    { label: 'Join CoP',      id: 'join' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="acc-arrow">›</span>
              <span>{template === 'network' ? 'Network and Security CoP | QBE Account' : 'Network and Observability CoP | QBE Account'}</span>
            </div>
            <p>
              {template === 'network'
                ? 'Network and Security Community of Practice — Building intelligent operations at QBE Account through shared expertise and collaboration.'
                : 'Network & Observability Community of Practice — Building intelligent operations at QBE Account through shared expertise and collaboration.'}
            </p>
            <div className="footer-acc-credit">
              <span>Powered by</span>
              <strong>Accenture</strong>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {links.map(({ label, id }) => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)}>{label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>📧 pramodh.nagaraja@accenture.com</p>
            <div className="footer-social">
              <a href="#">Teams Channel</a>
              <a href="#">SharePoint Site</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 QBE Account {template === 'network' ? 'Network and Security' : 'Network & Observability'} Community of Practice | Accenture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function SolarWindsCertification() {
  const [activeStep, setActiveStep] = useState(0)
  const [nomineesOpen, setNomineesOpen] = useState(false)

  const stepIcons = [
    /* 1 – Register: user with checkmark */
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
      <path d="M16 11l1.5 1.5L20 9"/>
    </svg>,
    /* 2 – Coursework: open book */
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>,
    /* 3 – Boot Camp: presentation screen */
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
      <path d="M9 8.5l4 2.5-4 2.5"/>
    </svg>,
    /* 4 – Assessment: clipboard with check */
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>,
    /* 5 – Certification: award/medal */
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>,
  ]

  const steps = [
    {
      num: 1,
      status: 'active' as const,
      gradient: 'linear-gradient(150deg, #1e1b4b 0%, #4338ca 100%)',
      title: 'Register on SolarWinds Partner Academy',
      desc: 'All nominated participants must register on the SolarWinds Partner Academy Portal.',
      note: { icon: '✅', text: 'Registration is mandatory for progress tracking and certification eligibility.' },
      extra: null,
    },
    {
      num: 2,
      status: 'active' as const,
      gradient: 'linear-gradient(150deg, #0c2340 0%, #1d4ed8 100%)',
      title: 'Complete Certification Coursework (Workday)',
      desc: 'Participants must enrol and complete an assigned SolarWinds certification course on Workday.',
      note: { icon: '📅', text: 'Completion Deadline: 4th May 2026' },
      extra: 'courses',
    },
    {
      num: 3,
      status: 'soon' as const,
      gradient: 'linear-gradient(150deg, #064e3b 0%, #059669 100%)',
      title: 'Live Instructor-Led Session / Boot Camp',
      desc: 'Attend a live session conducted by SolarWinds Subject Matter Experts, focusing on:',
      note: null,
      extra: 'bootcamp',
    },
    {
      num: 4,
      status: 'pending' as const,
      gradient: 'linear-gradient(150deg, #7c2d12 0%, #c2410c 100%)',
      title: 'Mock Assessment',
      desc: 'A mock assessment will be conducted to assess exam readiness.',
      note: { icon: '🎯', text: 'Score 75% or above to qualify for certification.' },
      extra: null,
    },
    {
      num: 5,
      status: 'pending' as const,
      gradient: 'linear-gradient(150deg, #3b0764 0%, #7e22ce 100%)',
      title: 'SolarWinds Certification Exam',
      desc: 'Appear for the official SolarWinds certification exam and earn your SolarWinds Solutions Certified Associate badge.',
      note: null,
      extra: null,
    },
  ]

  const courses = [
    {
      title: 'SolarWinds Solutions Certified Associate – Observability SaaS',
      url: 'https://wd102.myworkday.com/accenture/email-universal/inst/1731888575/relitar',
    },
    {
      title: 'SolarWinds Solutions Certified Associate – Observability Self-Hosted',
      url: 'https://wd102.myworkday.com/accenture/email-universal/inst/1731688574/rel-task',
    },
  ]

  const bootcampTopics = ['Concept Clarification', 'Real-world Use Cases', 'Open Q&A']

  const statusColor = {
    active:  { ring: '#A100FF', dot: '#A100FF', label: 'Active',      labelBg: '#F5E6FF', labelText: '#5700AB' },
    soon:    { ring: '#f59e0b', dot: '#f59e0b', label: 'Coming Soon', labelBg: '#fef3c7', labelText: '#92400e' },
    pending: { ring: '#d1d5db', dot: '#9ca3af', label: 'Upcoming',    labelBg: '#f3f4f6', labelText: '#6b7280' },
  }

  return (
    <section id="solarwinds" className="section sw-section">
      <div className="container reveal">
        {/* Header */}
        <div className="sw-header">
          <SolarWindsLogo className="sw-section-logo" />
          <div className="section-label" style={{ marginTop: 20 }}>Observability Stream</div>
          <h2 className="section-title">
            SolarWinds Certification Journey
            <span className="sw-acc-tag"> — Get Certified with Accenture</span>
          </h2>
          <div className="sw-path-banner">
            <span className="sw-banner-icon">›</span>
            5-Step Path to SolarWinds Certification
          </div>
        </div>

        {/* Horizontal Step Tiles */}
        <div className="sw-htiles">
          {steps.map((step, i) => {
            const isActive = i === activeStep
            return (
              <div
                key={i}
                className={`sw-htile ${isActive ? 'sw-htile-active' : 'sw-htile-collapsed'}`}
                onClick={() => setActiveStep(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setActiveStep(i)}
              >
                <div className="sw-htile-top" style={{ background: step.gradient }}>
                  {isActive ? (
                    <>
                      <div className="sw-htile-icon-wrap">{stepIcons[i]}</div>
                      <div className="sw-htile-top-badges">
                        <span className="sw-step-num-badge">Step {step.num} of {steps.length}</span>
                        <span className="sw-htile-status-pill">{statusColor[step.status].label}</span>
                      </div>
                    </>
                  ) : (
                    <div className="sw-htile-mini">
                      <span className="sw-htile-step-num">{step.num}</span>
                      <div className="sw-htile-icon-wrap-sm">{stepIcons[i]}</div>
                    </div>
                  )}
                </div>
                {isActive ? (
                  <div className="sw-htile-body">
                    <h3 className="sw-step-card-title">{step.title}</h3>
                    <p className="sw-step-desc">{step.desc}</p>
                    {step.note && (
                      <div className={`sw-note ${step.num === 2 ? 'sw-deadline' : ''}`}>
                        <span className="sw-note-icon">{step.note.icon}</span>
                        <span dangerouslySetInnerHTML={{ __html: step.note.text.replace('4th May 2026', '<strong>4th May 2026</strong>').replace('75%', '<strong>75%</strong>') }} />
                      </div>
                    )}
                    {step.extra === 'courses' && (
                      <div className="sw-course-table-wrap">
                        <table className="sw-course-table">
                          <thead><tr><th>Course Title</th><th>Workday Course Link</th></tr></thead>
                          <tbody>
                            {courses.map((c, j) => (
                              <tr key={j}><td>{c.title}</td><td><a href={c.url} target="_blank" rel="noreferrer" className="sw-course-link">Enrol on Workday ↗</a></td></tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {step.extra === 'bootcamp' && (
                      <div className="sw-bootcamp-topics">
                        {bootcampTopics.map((t, j) => <span key={j} className="sw-topic-chip">{t}</span>)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="sw-htile-collapsed-title">{step.title}</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Boot Camp Nominees */}
        <div className="stream-block" style={{ marginTop: 32 }}>
          <button className="stream-header obs-stream" onClick={() => setNomineesOpen(o => !o)}>
            <div className="stream-header-left">
              <span className="stream-emoji">🎯</span>
              <div>
                <span className="stream-name">SolarWinds Boot Camp Nominees</span>
                <span className="stream-sub">Selected participants for the SolarWinds Observability Certification Program</span>
              </div>
            </div>
            <div className="stream-header-right">
              <span className="stream-pill obs">{SW_NOMINEES.length} nominees</span>
              <span className="stream-toggle">{nomineesOpen ? '−' : '+'}</span>
            </div>
          </button>
          {nomineesOpen && (
            <div className="stream-body">
              <div className="sw-nominees-grid">
                {SW_NOMINEES.map((nominee, i) => (
                  <div key={i} className={`sw-nominee-card ${nominee.ccna !== null ? 'multi-program' : ''}`}>
                    <div className="sw-nominee-avatar" style={{ background: SW_COLORS[i % SW_COLORS.length] }}>{nominee.initials}</div>
                    <div className="sw-nominee-info">
                      <h4>{nominee.name}</h4>
                      <div className="sw-nominee-badges">
                        <span className="sw-nom-badge">SW Nominee</span>
                        {nominee.ccna !== null && (
                          <span className="sw-ccna-badge">{nominee.ccna === 3 ? '🏆 CCNA Eligible' : '💻 CCNA Boot Camp'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sw-nominees-note">
                <span>🔄</span>
                <span><strong>{SW_NOMINEES.filter(m => m.ccna !== null).length} nominees</strong> are active on both the SolarWinds and CCNA certification programs simultaneously. Stages will be updated as participants progress through the journey.</span>
              </div>
            </div>
          )}
        </div>


      </div>
    </section>
  )
}

function App({ initialTemplate }: { initialTemplate?: Template }) {
  const [template, setTemplate] = useState<Template>(() => initialTemplate ?? getTemplateFromHash())

  useEffect(() => {
    if (initialTemplate && initialTemplate !== template) {
      setTemplate(initialTemplate)
    }
  }, [initialTemplate, template])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="app">
      <Navbar template={template} />
      <Hero template={template} />
      <About template={template} />
      <Stats />
      {template === 'network' && <CertificationPathway />}
      {template === 'observability' && <SolarWindsCertification />}
      <Events />
      {template === 'observability' && <Resources />}
      <Members template={template} />
      <CelebrateLearning template={template} />
      <Leadership template={template} />
      <Join template={template} />
      <Footer template={template} />
    </div>
  )
}

export default App
