// ═══════════════════════════════════════════════════════════════
//  CoPTemplate.tsx
//  Generic community page — mirrors App.tsx visual design exactly.
//  Uses App.css classes; accent colour injected via CSS variable.
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react'
import './App.css'
import type { CoPPageData } from './data/types'

// ── Colour helpers ───────────────────────────────────────────────
function tintHex(hex: string, ratio: number): string {
  const r = parseInt(hex.slice(1,3), 16)
  const g = parseInt(hex.slice(3,5), 16)
  const b = parseInt(hex.slice(5,7), 16)
  const t = (c: number) => Math.round(c + (255 - c) * ratio).toString(16).padStart(2, '0')
  return `#${t(r)}${t(g)}${t(b)}`
}
function darkenHex(hex: string, ratio: number): string {
  const r = parseInt(hex.slice(1,3), 16)
  const g = parseInt(hex.slice(3,5), 16)
  const b = parseInt(hex.slice(5,7), 16)
  const d = (c: number) => Math.round(c * (1 - ratio)).toString(16).padStart(2, '0')
  return `#${d(r)}${d(g)}${d(b)}`
}

// ── Avatar colour palette ────────────────────────────────────────
const AV_COLORS = [
  '#7C3AED', '#6D28D9', '#5B21B6', '#8B5CF6', '#7E22CE',
  '#6D28D9', '#9333EA', '#A855F7', '#5B21B6', '#C084FC',
  '#7C3AED', '#5B21B6', '#8B5CF6', '#9333EA', '#6D28D9',
]

// ── Topology background (same as App.tsx) ────────────────────────
const NODE_POSITIONS = [
  { size: 8,  top: '15%', left: '10%', delay: '0s'   },
  { size: 12, top: '30%', left: '25%', delay: '0.5s' },
  { size: 6,  top: '60%', left: '15%', delay: '1s'   },
  { size: 10, top: '20%', left: '45%', delay: '1.5s' },
  { size: 8,  top: '70%', left: '40%', delay: '0.3s' },
  { size: 14, top: '40%', left: '70%', delay: '0.8s' },
  { size: 6,  top: '80%', left: '60%', delay: '1.2s' },
  { size: 10, top: '25%', left: '80%', delay: '0.6s' },
  { size: 8,  top: '55%', left: '85%', delay: '1.8s' },
  { size: 12, top: '10%', left: '65%', delay: '0.4s' },
  { size: 6,  top: '85%', left: '30%', delay: '2s'   },
  { size: 10, top: '45%', left: '55%', delay: '0.9s' },
]
const EDGES = [
  [0,1],[1,2],[1,3],[2,4],[3,4],[3,11],[3,9],
  [4,10],[5,7],[5,11],[5,8],[7,9],[8,6],[9,5],[11,6],[10,2],
]
const NODE_COORDS = NODE_POSITIONS.map(n => ({
  x: parseFloat(n.left), y: parseFloat(n.top),
}))

// ── Root component ───────────────────────────────────────────────
export default function CoPTemplate({ data }: { data: CoPPageData }) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io  = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Derive a full token set from this community's accent colour
  const cssVars = {
    '--acc-purple':        data.accentColor,
    '--acc-purple-dark':   darkenHex(data.accentColor, 0.18),
    '--acc-purple-deeper': darkenHex(data.accentColor, 0.36),
    '--acc-purple-light':  tintHex(data.accentColor, 0.72),
    '--acc-purple-bg':     tintHex(data.accentColor, 0.90),
  } as React.CSSProperties

  return (
    <div className="app" style={cssVars}>
      <TNavbar    data={data} />
      <THero      data={data} />
      <TAbout     data={data} />
      {!!data.certStages?.length  && <TCertification data={data} />}
      {!!data.events?.length      && <TEvents        data={data} />}
      {!!data.resources?.length   && <TKnowledgeHub  data={data} />}
      {!!data.members?.length     && <TMembers       data={data} />}
      {!!data.celebrateLearning   && <TCelebrate      data={data} />}
      <TLeadership data={data} />
      <TJoin       data={data} />
      <TFooter     data={data} />
    </div>
  )
}

// ── Navbar ───────────────────────────────────────────────────────
function TNavbar({ data }: { data: CoPPageData }) {
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [progress,       setProgress]       = useState(0)
  const [activeSection,  setActiveSection]  = useState('hero')

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
    const ids = ['about', 'pathway', 'events', 'members', 'celebrate', 'team']
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.35 },
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navItems = [
    { label: 'About',        id: 'about'    },
    ...(data.certStages?.length  ? [{ label: 'Certification', id: 'pathway'   }] : []),
    ...(data.events?.length      ? [{ label: 'Events',        id: 'events'    }] : []),
    ...(data.resources?.length   ? [{ label: 'Knowledge Hub', id: 'knowledge' }] : []),
    ...(data.members?.length     ? [{ label: 'Members',       id: 'members'   }] : []),
    ...(data.celebrateLearning   ? [{ label: '🏅 Celebrate',  id: 'celebrate' }] : []),
    { label: 'Leadership',   id: 'team'     },
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
            <span className="nav-brand-main">{data.name} Community of Practice</span>
            <span className="nav-brand-sub">QBE Account | Accenture</span>
          </div>
        </div>
        <button className="nav-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span className={`hamburger ${menuOpen ? 'open' : ''}`} />
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => scrollTo('join')} className="nav-link nav-cta">
              Join CoP
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
function THero({ data }: { data: CoPPageData }) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <svg
          className="hero-topo-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODE_COORDS[a].x} y1={NODE_COORDS[a].y}
              x2={NODE_COORDS[b].x} y2={NODE_COORDS[b].y}
              className="topo-line"
            />
          ))}
        </svg>
        {NODE_POSITIONS.map((node, i) => (
          <div
            key={i}
            className="node"
            style={{
              width: node.size, height: node.size,
              top: node.top, left: node.left,
              animationDelay: node.delay,
            }}
          />
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-badges">
          <span className="badge badge-acc">Accenture</span>
          <span className="badge badge-qbe">QBE Account Technology</span>
        </div>
        <h1 className="hero-title">{data.name} Community of Practice</h1>
        <p className="hero-desc">{data.description}</p>
        <div className="hero-actions">
          <button onClick={() => scrollTo('about')}  className="btn-primary">Explore CoP</button>
          <button onClick={() => scrollTo('join')}   className="btn-secondary">Join the Community</button>
        </div>
        <div className="hero-scroll-cue" onClick={() => scrollTo('about')}>
          <div className="scroll-line" />
          <span>Scroll to discover</span>
        </div>
      </div>
    </section>
  )
}

// ── About ────────────────────────────────────────────────────────
function TAbout({ data }: { data: CoPPageData }) {
  const pillars = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="36" height="36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
        </svg>
      ),
      title: 'Our Mission', desc: data.mission,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="36" height="36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      title: 'Our Vision', desc: data.vision,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="36" height="36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.3l-6.2 4-2.4-7.4L2 9.4h7.6z"/>
        </svg>
      ),
      title: 'Our Values', desc: data.values,
    },
  ]

  return (
    <section id="about" className="section about-section">
      <div className="container reveal">
        <div className="section-label">About the CoP</div>
        <h2 className="section-title">What We Stand For</h2>
        <p className="section-desc">
          The {data.name} Community of Practice is a cross-functional group of technology
          professionals at QBE Account dedicated to advancing {data.name.toLowerCase()} capabilities
          through shared expertise, structured learning, and collaboration.
        </p>
        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <div key={i} className="pillar-card">
              <div className="pillar-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Certification Pathway ────────────────────────────────────────
function TCertification({ data }: { data: CoPPageData }) {
  const [open, setOpen] = useState(true)
  const stages   = data.certStages ?? []
  const spotlight = data.spotlight
  const stageIcons = ['🎓', '💻', '🏆']

  return (
    <section id="pathway" className="section pathway-section">
      <div className="container reveal">
        <div className="dir-section-header">
          <div>
            <div className="section-label">Achievement Snapshot</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              {data.name} Certification Pathway
            </h2>
          </div>
          <button
            className="collapse-toggle"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Collapse section' : 'Expand section'}
          >
            <span className="toggle-icon">{open ? '−' : '+'}</span>
            <span className="toggle-label">{open ? 'Minimise' : 'Expand'}</span>
          </button>
        </div>

        {open && (
          <>
            <p className="section-desc">
              A structured three-stage certification journey — from foundational training to
              full certification — showcasing our team's commitment to continuous learning
              and technical excellence.
            </p>

            {data.skillFlavors && data.skillFlavors.length > 0 && (
              <div className="pathway-flavors">
                <div className="pathway-flavors-label">Supported Platforms</div>
                <div className="pathway-flavors-grid">
                  {data.skillFlavors.map(f => (
                    <button key={f.name} className="pathway-flavor-btn">
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pathway-pipeline">
              {stages.map((stage, i) => (
                <div key={i} className="pipeline-row">
                  <div className="pathway-card" style={{ borderColor: stage.border, background: stage.bg }}>
                    <div className="pathway-card-header">
                      <div className="pathway-stage-num" style={{ background: stage.color }}>
                        Stage {stage.num}
                      </div>
                      <span className="pathway-icon">{stageIcons[i] ?? '⭐'}</span>
                    </div>
                    <h3 style={{ color: stage.color }}>{stage.title}</h3>
                    <p className="pathway-subtitle">{stage.subtitle}</p>
                    <div className="pathway-count" style={{ color: stage.color }}>
                      {stage.count}<span>members</span>
                    </div>
                    {!stage.hideProgress && (
                      <>
                        <div className="pathway-bar-wrap">
                          <div
                            className="pathway-bar-fill"
                            style={{
                              width: `${Math.round((stage.count / stage.totalCohort) * 100)}%`,
                              background: stage.color,
                            }}
                          />
                        </div>
                        <div className="pathway-bar-label" style={{ color: stage.color }}>
                          {Math.round((stage.count / stage.totalCohort) * 100)}% of total cohort
                        </div>
                      </>
                    )}
                    <p className="pathway-desc">{stage.desc}</p>
                    {stage.detail && (
                      <p className="pathway-detail" style={{ color: stage.color, borderColor: stage.border }}>
                        {stage.detail}
                      </p>
                    )}
                    {stage.links && stage.links.length > 0 && (
                      <div className="pathway-links">
                        {stage.links.map((lnk, li) => (
                          <a
                            key={li}
                            href={lnk.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pathway-link-btn"
                            style={{ color: stage.color, borderColor: stage.border }}
                          >
                            {lnk.label}
                          </a>
                        ))}
                      </div>
                    )}
                    {stage.progressRate && (
                      <div className="pathway-rate" style={{ color: stage.color, borderColor: stage.border }}>
                        ↑ {stage.progressRate}
                      </div>
                    )}
                  </div>
                  {i < stages.length - 1 && (
                    <div className="pipeline-connector">
                      <div className="connector-line" />
                      <div className="connector-arrow">›</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {spotlight && (
              <div className="ccna-spotlight">
                <div className="spotlight-header">
                  <span className="spotlight-icon">🏆</span>
                  <div>
                    <h3>{spotlight.title}</h3>
                    <p>{spotlight.desc}</p>
                  </div>
                </div>
                <div className="spotlight-names">
                  {spotlight.names.map((name, i) => (
                    <div key={i} className="spotlight-chip">
                      <span className="chip-avatar">
                        {name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

// ── Upcoming Sessions ────────────────────────────────────────────
function TEvents({ data }: { data: CoPPageData }) {
  const [modal, setModal] = useState<{ title: string; type: string } | null>(null)
  const [mName,  setMName]  = useState('')
  const [mEmail, setMEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Want to Attend: ${modal?.title}`)
    const body    = encodeURIComponent(
      `Hi,\n\nI'd like to attend:\n\nEvent: ${modal?.title}\nType: ${modal?.type}\n\nName: ${mName}\nEmail: ${mEmail}\n\nThank you.`,
    )
    window.open(`mailto:${data.joinEmail}?subject=${subject}&body=${body}`)
    setModal(null); setMName(''); setMEmail('')
  }

  return (
    <section id="events" className="section events-section">
      <div className="container reveal">
        <div className="section-label">Stay Connected</div>
        <h2 className="section-title">Upcoming Sessions</h2>
        <p className="section-desc">
          Regular knowledge-sharing sessions, workshops, and deep dives.
          All QBE Account technology professionals are welcome.
        </p>
        <div className="events-grid">
          {(data.events ?? []).map((ev, i) => (
            <div key={i} className="event-card">
              <div className="event-date-block" style={{ background: ev.accentColor }}>
                <span className="event-day">{ev.day}</span>
                <span className="event-month">{ev.month}</span>
              </div>
              <div className="event-details">
                <div className="event-details-top">
                  <span className="event-badge">{ev.type}</span>
                </div>
                <h3>{ev.title}</h3>
                <p>{ev.desc}</p>
                <div className="event-meta">
                  <span>🕐 {ev.time}</span>
                  <button
                    className="event-register"
                    onClick={() => setModal({ title: ev.title, type: ev.type })}
                  >
                    Want to attend?
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modal && (
          <div className="attend-overlay" onClick={() => setModal(null)}>
            <div className="attend-modal" onClick={e => e.stopPropagation()}>
              <button className="attend-modal-close" onClick={() => setModal(null)}>✕</button>
              <div className="attend-modal-header">
                <div className="attend-modal-icon">📅</div>
                <div>
                  <h3>Register Your Interest</h3>
                  <p className="attend-modal-event">{modal.title}</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="attend-modal-form">
                <input type="text"  placeholder="Your full name"     required value={mName}  onChange={e => setMName(e.target.value)}  />
                <input type="email" placeholder="Your email address" required value={mEmail} onChange={e => setMEmail(e.target.value)} />
                <button type="submit" className="btn-submit">Send Registration Interest ↗</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ── Members Directory ────────────────────────────────────────────
type LevelFilter = 'all' | 'Trained' | 'Intermediate' | 'Certified'

function TMembers({ data }: { data: CoPPageData }) {
  const [sectionOpen, setSectionOpen]   = useState(true)
  const [streamOpen,  setStreamOpen]    = useState(true)
  const [search,      setSearch]        = useState('')
  const [activeFilter,setActiveFilter]  = useState<LevelFilter>('all')
  const [localMembers, setLocalMembers] = useState(() => {
    const storageKey = `cop_members_${data.id}`
    return JSON.parse(localStorage.getItem(storageKey) || '[]')
  })

  useEffect(() => {
    const storageKey = `cop_members_${data.id}`

    // Clean up localStorage: remove entries that match official members (case-insensitive)
    const officialNames = new Set((data.members ?? []).map(m => (m.name || '').toLowerCase().trim()))
    const storedData = JSON.parse(localStorage.getItem(storageKey) || '[]')
    const cleanedData = storedData.filter((m: any) => !officialNames.has((m.name || '').toLowerCase().trim()))
    if (cleanedData.length !== storedData.length) {
      if (cleanedData.length === 0) {
        localStorage.removeItem(storageKey)
      } else {
        localStorage.setItem(storageKey, JSON.stringify(cleanedData))
      }
    }
    setLocalMembers(cleanedData)

    const handleMemberAdded = () => {
      const data_val = JSON.parse(localStorage.getItem(storageKey) || '[]')
      setLocalMembers(data_val)
    }
    window.addEventListener('memberAdded', handleMemberAdded)
    return () => window.removeEventListener('memberAdded', handleMemberAdded)
  }, [data.id, data.members])

  // Combine data members with localStorage members, deduplicating by name (case-insensitive)
  const combinedMembers = [...(data.members ?? []), ...localMembers]
  const seenNames = new Set<string>()
  const members = combinedMembers.filter(m => {
    const nameLower = (m.name || '').toLowerCase().trim()
    if (seenNames.has(nameLower)) return false
    seenNames.add(nameLower)
    return true
  })

  const filtered = members.filter(m => {
    const matchLevel  = activeFilter === 'all' || m.levelLabel === activeFilter
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
    return matchLevel && matchSearch
  })

  const counts = {
    Certified:    members.filter(m => m.levelLabel === 'Certified').length,
    Intermediate: members.filter(m => m.levelLabel === 'Intermediate').length,
    Trained:      members.filter(m => m.levelLabel === 'Trained').length,
  }

  const filters: { key: LevelFilter; label: string; count: number }[] = [
    { key: 'all',          label: 'All',              count: members.length       },
    { key: 'Certified',    label: '🏆 Certified',     count: counts.Certified     },
    { key: 'Intermediate', label: '💻 Intermediate',  count: counts.Intermediate  },
    { key: 'Trained',      label: '🎓 Trained',       count: counts.Trained       },
  ]

  return (
    <section id="members" className="section members-section">
      <div className="container reveal">
        <div className="dir-section-header">
          <div>
            <div className="section-label">{data.name}</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>CoP Members Directory</h2>
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
                  placeholder={`Search ${data.name} members…`}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="members-search"
                />
                {search && (
                  <button className="search-clear" onClick={() => setSearch('')}>✕</button>
                )}
              </div>
              <div className="dir-total-pill">
                {members.length} members · {filtered.length} shown
              </div>
            </div>

            <div className="stream-block">
              <button
                className="stream-header network-stream"
                onClick={() => setStreamOpen(o => !o)}
              >
                <div className="stream-header-left">
                  <span className="stream-emoji">🌐</span>
                  <div>
                    <span className="stream-name">{data.name} Stream</span>
                    <span className="stream-sub">Certification Journey</span>
                  </div>
                </div>
                <div className="stream-header-right">
                  <span className="stream-pill">{members.length} members</span>
                  <span className="stream-toggle">{streamOpen ? '−' : '+'}</span>
                </div>
              </button>

              {streamOpen && (
                <div className="stream-body">
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

                  {filtered.length > 0 ? (
                    <div className="members-grid">
                      {filtered.map((member, idx) => (
                        <div key={member.name} className="member-card">
                          <div
                            className="member-avatar"
                            style={{ background: AV_COLORS[idx % AV_COLORS.length] }}
                          >
                            {member.initials}
                          </div>
                          <div className="member-info">
                            <h4>{member.name}</h4>
                            <span
                              className="member-stage-badge"
                              style={{
                                color:      member.levelText,
                                background: member.levelBg,
                                border: `1px solid ${member.levelColor}33`,
                              }}
                            >
                              <span className="cert-dot" style={{ background: member.levelColor }} />
                              {member.levelLabel}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="members-empty">
                      <div className="empty-icon">🔍</div>
                      <p>No members match <strong>"{search}"</strong></p>
                      <button
                        onClick={() => { setSearch(''); setActiveFilter('all') }}
                        className="clear-search-btn"
                      >
                        Reset
                      </button>
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

// ── Celebrate Learning ───────────────────────────────────────────
function TCelebrate({ data }: { data: CoPPageData }) {
  const celebrate = data.celebrateLearning!
  const tiles = celebrate.names.map(name => ({
    name,
    initials: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
  }))

  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected   = tiles[selectedIdx]
  const particles  = Array.from({ length: 20 }, (_, i) => i)

  return (
    <section id="celebrate" className="celebrate-section">
      <div className="sparkle-bg" aria-hidden="true">
        {particles.map(i => <span key={i} className={`sparkle sparkle-${i}`} />)}
      </div>

      <div className="container reveal">
        <div className="celebrate-inner">
          <div className="celebrate-eyebrow">
            <span className="celebrate-stars">✦ ✦ ✦</span>
            <span className="celebrate-label">Celebrate Learning</span>
            <span className="celebrate-stars">✦ ✦ ✦</span>
          </div>

          <div key={`photo-${selectedIdx}`} className="celebrate-photo-wrap">
            <div className="photo-glow-ring">
              <div className="photo-inner-ring">
                <div className="celebrate-avatar">{selected.initials}</div>
              </div>
            </div>
            <div className="ccna-pin">
              <span className="ccna-pin-icon">🏅</span>
              <span>{celebrate.title}</span>
            </div>
          </div>

          <div key={`text-${selectedIdx}`} className="celebrate-spotlight-text">
            <p className="celebrate-congrats">Congratulations!</p>
            <h2 className="celebrate-name">{selected.name}</h2>
            <p className="celebrate-subtitle">has achieved outstanding learning</p>
            <p className="celebrate-context">
              A proud member of the{' '}
              <strong>{data.name} Community of Practice</strong>{' '}
              — {celebrate.desc}
            </p>
            <div className="celebrate-orgs">
              <span className="org-chip">QBE Account</span>
              <span className="org-divider">✦</span>
              <span className="org-chip">Accenture</span>
              <span className="org-divider">✦</span>
              <span className="org-chip">{data.name} CoP</span>
            </div>
          </div>

          <div className="celebrate-tiles-wrap">
            <p className="celebrate-tiles-heading">
              <span aria-hidden="true">🏆</span> {celebrate.title}
            </p>
            <div className="celebrate-tiles-track">
              <div className="celebrate-tiles-scroll">
                {tiles.map((tile, idx) => (
                  <div
                    key={tile.name}
                    className={`celebrate-tile${idx === selectedIdx ? ' celebrate-tile-active' : ''}`}
                    onClick={() => setSelectedIdx(idx)}
                    role="button" tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && setSelectedIdx(idx)}
                    aria-pressed={idx === selectedIdx}
                  >
                    <div className="celebrate-tile-ring">
                      <div className="celebrate-tile-ring-inner">
                        <div
                          className="celebrate-tile-avatar"
                          style={{ background: AV_COLORS[idx % AV_COLORS.length] }}
                        >
                          {tile.initials}
                        </div>
                      </div>
                    </div>
                    <div className="celebrate-tile-name">{tile.name}</div>
                    <div className="celebrate-tile-badge">
                      <span aria-hidden="true">🏅</span> Achiever
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Leadership ───────────────────────────────────────────────────
function TLeaderPhoto({ src, alt, initials }: { src?: string; alt: string; initials: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error,  setError]  = useState(false)
  return (
    <div className="leader-photo-wrap">
      {src && !error && (
        <img
          src={src} alt={alt}
          className={`leader-photo ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      {(!src || error || !loaded) && (
        <div className={`leader-initials ${loaded && !error ? 'hidden' : ''}`}>
          {initials}
        </div>
      )}
    </div>
  )
}

function TLeadership({ data }: { data: CoPPageData }) {
  return (
    <section id="team" className="section team-section">
      <div className="container reveal">
        <div className="section-label">Meet the Team</div>
        <h2 className="section-title">CoP Leadership</h2>
        <p className="section-desc">
          Experienced leaders driving {data.name.toLowerCase()} excellence and collaboration
          across QBE Account's global technology footprint.
        </p>
        <div className="leaders-grid">
          {data.leadership.map((leader, i) => (
            <div key={i} className={`leader-card badge-${leader.badgeStyle}`}>
              <div className="leader-card-top">
                <TLeaderPhoto
                  src={leader.photo}
                  alt={leader.name}
                  initials={leader.initials}
                />
              </div>
              <div className="leader-card-body">
                <span className={`leader-badge badge-${leader.badgeStyle}`}>{leader.badge}</span>
                <h3>{leader.name}</h3>
                <p>{leader.role}</p>
                <a href={`mailto:${leader.email}`} className="leader-connect-btn">Connect →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Join CoP ─────────────────────────────────────────────────────
function TJoin({ data }: { data: CoPPageData }) {
  const [formName,     setFormName]     = useState('')
  const [formEmail,    setFormEmail]    = useState('')
  const [formRole,     setFormRole]     = useState('')
  const [formInterest, setFormInterest] = useState('')
  const [formNote,     setFormNote]     = useState('')
  const [message,      setMessage]      = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Add member to localStorage
    const storageKey = `cop_members_${data.id}`
    const existingMembers = JSON.parse(localStorage.getItem(storageKey) || '[]')

    const initials = formName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    const newMember = {
      name: formName,
      initials,
      levelLabel: 'Trained',
      levelColor: '#16a34a',
      levelBg: '#dcfce7',
      levelText: '#065f46',
    }

    // Check if member already exists (case-insensitive)
    const formNameLower = formName.toLowerCase().trim()
    if (existingMembers.some((m: any) => (m.name || '').toLowerCase().trim() === formNameLower)) {
      setMessage({ type: 'error', text: 'You have already joined this community!' })
      setTimeout(() => setMessage(null), 4000)
      return
    }

    existingMembers.push(newMember)
    localStorage.setItem(storageKey, JSON.stringify(existingMembers))

    window.dispatchEvent(new Event('memberAdded'))

    // Send email to CoP Lead
    const subject = encodeURIComponent(`${data.name} CoP Membership Request — ${formName}`)
    const body    = encodeURIComponent(
      `Hi CoP Lead,\n\n${formName} has requested to join the ${data.name} Community of Practice.\n\nDetails:\n- Email: ${formEmail}\n- Role: ${formRole}\n- Interest: ${formInterest}${formNote ? `\n- Message: ${formNote}` : ''}\n\nPlease reach out to onboard them.\n\nThank you.`,
    )

    window.open(`mailto:${data.joinEmail}?subject=${subject}&body=${body}`)

    // Show success and reset
    setMessage({ type: 'success', text: '✓ Added to community! Email to CoP Lead is opening...' })
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
            <h2>Join the {data.name} Community</h2>
            <p>
              Whether you're a {data.name.toLowerCase()} practitioner or a technology
              enthusiast at QBE, there's a place for you in our CoP. Contribute, learn,
              and grow with us.
            </p>
            <ul className="join-benefits">
              {[
                'Access exclusive knowledge resources and playbooks',
                `Connect with ${data.name} experts across QBE Account`,
                'Participate in hands-on workshops and deep dives',
                "Shape QBE Account's capability development strategy",
                'Earn recognition for your contributions and certifications',
              ].map((b, i) => <li key={i}>{b}</li>)}
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
              <input type="text"  placeholder="Full Name"        required value={formName}     onChange={e => setFormName(e.target.value)} />
              <input type="email" placeholder="Work Email"        required value={formEmail}    onChange={e => setFormEmail(e.target.value)} />
              <input type="text"  placeholder="Role / Job Title" required value={formRole}     onChange={e => setFormRole(e.target.value)} />
              <select required value={formInterest} onChange={e => setFormInterest(e.target.value)}>
                <option value="" disabled>Area of Interest</option>
                {(data.joinInterests ?? ['General', 'Certifications', 'Knowledge Sharing', 'Events']).map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <textarea
                placeholder="Brief introduction (optional)"
                rows={3}
                value={formNote}
                onChange={e => setFormNote(e.target.value)}
              />
              <button type="submit" className="btn-submit">Join Community ↗</button>
              <p className="join-form-hint">
                You'll be added to the members list and an email will open for you to send to the CoP Lead.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Knowledge Hub ────────────────────────────────────────────────
function TKnowledgeHub({ data }: { data: CoPPageData }) {
  const streams = data.resources ?? []
  return (
    <section id="knowledge" className="section resources-section">
      <div className="container reveal">
        <div className="section-label">Knowledge Hub</div>
        <h2 className="section-title">Resources &amp; Artifacts</h2>
        <p className="section-desc">
          Curated resources to support your {data.name} domain learning journey.
        </p>
        <div className="res-streams-grid">
          {streams.map(s => (
            <div key={s.title} className="res-stream-card" style={{ borderColor: s.border, background: s.bg }}>
              <div className="res-stream-top">
                {s.icon && (
                  <div className="res-icon-wrap" style={{ background: s.bg, border: `1.5px solid ${s.border}` }}>
                    <span>{s.icon}</span>
                  </div>
                )}
                <h3 className="res-stream-title" style={{ color: s.color }}>{s.title}</h3>
              </div>
              <ul className="res-stream-list">
                {s.items.map((item, i) => (
                  <li key={i} className="res-stream-item">
                    <span className="res-item-dot" style={{ background: s.color }} />
                    {item.url
                      ? <a href={item.url} target="_blank" rel="noopener noreferrer" className="res-item-name" style={{ color: s.color, textDecoration: 'underline' }}>{item.name}</a>
                      : <span className="res-item-name">{item.name}</span>
                    }
                    <span className="res-item-tag" style={{ color: s.tagColor, background: s.tagBg }}>{item.type}</span>
                  </li>
                ))}
              </ul>
              {s.viewAllUrl
                ? <a href={s.viewAllUrl} target="_blank" rel="noopener noreferrer" className="res-stream-btn" style={{ background: s.color, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>View All →</a>
                : <button className="res-stream-btn" style={{ background: s.color, opacity: 0.5, cursor: 'default' }} disabled>Coming Soon</button>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────
function TFooter({ data }: { data: CoPPageData }) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const links = [
    { label: 'About CoP',    id: 'about'    },
    ...(data.certStages?.length ? [{ label: 'Certification', id: 'pathway' }] : []),
    ...(data.events?.length     ? [{ label: 'Events',        id: 'events'  }] : []),
    ...(data.members?.length    ? [{ label: 'Members',       id: 'members' }] : []),
    { label: 'Leadership',   id: 'team'     },
    { label: 'Join CoP',     id: 'join'     },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="acc-arrow">›</span>
              <span>{data.name} CoP | QBE Account</span>
            </div>
            <p>{data.tagline}</p>
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
            <p>📧 {data.joinEmail}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 QBE Account {data.name} Community of Practice | Accenture.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
