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
      {!!data.whatWeDo?.length          && <TWhatWeDo         data={data} />}
      {!!data.whyJoin?.length           && <TWhyJoin          data={data} />}
      {!!data.roadmap?.length           && <TRoadmap          data={data} />}
      {!!data.learningTracks?.length    && <TLearningTracks   data={data} />}
      {!!data.focusAreas?.length        && <TFocusAreas       data={data} />}
      {!!data.certStages?.length        && <TCertification    data={data} />}
      {data.showLearningJourney         && <TLearningJourney  data={data} />}
      {!!data.careerTracks?.length      && <TCareerTracks     data={data} />}
      {!!data.events?.length       && <TEvents         data={data} />}
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
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [localMembers, setLocalMembers] = useState(() => {
    const storageKey = `cop_members_${data.id}`
    return JSON.parse(localStorage.getItem(storageKey) || '[]')
  })

  useEffect(() => {
    const storageKey = `cop_members_${data.id}`
    const handleMemberAdded = () => {
      const updatedMembers = JSON.parse(localStorage.getItem(storageKey) || '[]')
      setLocalMembers(updatedMembers)
    }
    window.addEventListener('memberAdded', handleMemberAdded)
    return () => window.removeEventListener('memberAdded', handleMemberAdded)
  }, [data.id])

  const stages   = data.certStages ?? []
  const spotlight = data.spotlight
  const trainings = data.trainings ?? []
  const stageIcons = ['🎓', '💻', '🏆']

  // Combine official members with localStorage members
  const allMembers = [...(data.members ?? []), ...localMembers]

  // Deduplicate by name (case-insensitive)
  const seenNames = new Set<string>()
  const members = allMembers.filter(m => {
    const nameLower = (m.name || '').toLowerCase().trim()
    if (seenNames.has(nameLower)) return false
    seenNames.add(nameLower)
    return true
  })

  // Calculate actual member counts by level
  const memberCountsByLevel = {
    'Trained': members.filter(m => m.levelLabel === 'Trained').length,
    'Intermediate': members.filter(m => m.levelLabel === 'Intermediate').length,
    'Certified': members.filter(m => m.levelLabel === 'Certified').length,
  }

  const getTrainingsForPlatform = (platform: string) => {
    return trainings.filter(t => t.platform === platform)
  }

  const groupTrainingsByLevel = (platformTrainings: typeof trainings) => {
    const grouped: Record<string, typeof trainings> = {}
    platformTrainings.forEach(t => {
      if (!grouped[t.level]) grouped[t.level] = []
      grouped[t.level].push(t)
    })
    return grouped
  }

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

            <div className="pathway-pipeline">
              {stages.map((stage, i) => {
                const actualMemberCount = memberCountsByLevel[stage.title as keyof typeof memberCountsByLevel] || 0
                const totalCohort = members.length

                return (
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
                      {actualMemberCount}<span>members</span>
                    </div>
                    {!stage.hideProgress && (
                      <>
                        <div className="pathway-bar-wrap">
                          <div
                            className="pathway-bar-fill"
                            style={{
                              width: `${totalCohort > 0 ? Math.round((actualMemberCount / totalCohort) * 100) : 0}%`,
                              background: stage.color,
                            }}
                          />
                        </div>
                        <div className="pathway-bar-label" style={{ color: stage.color }}>
                          {totalCohort > 0 ? Math.round((actualMemberCount / totalCohort) * 100) : 0}% of total cohort
                        </div>
                      </>
                    )}
                    <p className="pathway-desc">{stage.desc}</p>
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
              )
              })}
            </div>

            {data.skillFlavors && data.skillFlavors.length > 0 && trainings.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <div className="pathway-flavors">
                  <div className="pathway-flavors-label">Training Curriculum by Platform</div>
                  <div className="pathway-flavors-grid">
                    {data.skillFlavors.map(f => {
                      const platformTrainings = getTrainingsForPlatform(f.name)
                      return (
                        <button
                          key={f.name}
                          className={`pathway-flavor-btn ${selectedPlatform === f.name ? 'active' : ''}`}
                          onClick={() => setSelectedPlatform(selectedPlatform === f.name ? null : f.name)}
                          style={{
                            background: selectedPlatform === f.name ? '#3730A3' : 'white',
                            color: selectedPlatform === f.name ? 'white' : '#374151',
                            borderColor: selectedPlatform === f.name ? '#3730A3' : '#d1d5db',
                            transition: 'all 0.2s',
                          }}
                        >
                          {f.name}
                          <span style={{ fontSize: '12px', opacity: 0.7, marginLeft: '6px' }}>
                            ({platformTrainings.length})
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {selectedPlatform && (
                  <div style={{ marginTop: '24px' }}>
                    <div style={{
                      borderRadius: '12px',
                      border: '1.5px solid #e5e7eb',
                      overflow: 'hidden',
                      background: '#f9fafb',
                    }}>
                      <div style={{
                        padding: '16px 20px',
                        background: '#f3f4f6',
                        borderBottom: '1px solid #e5e7eb',
                      }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
                          {selectedPlatform} Training Modules
                        </h3>
                      </div>
                      <div style={{ padding: '20px' }}>
                        {(() => {
                          const platformTrainings = getTrainingsForPlatform(selectedPlatform)
                          const grouped = groupTrainingsByLevel(platformTrainings)

                          return Object.entries(grouped).map(([level, levelTrainings]) => (
                            <div key={level} style={{ marginBottom: '24px' }}>
                              <h4 style={{
                                fontSize: '13px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: '#6b7280',
                                margin: '0 0 12px 0',
                              }}>
                                {level}
                              </h4>
                              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                {levelTrainings.map((training, idx) => (
                                  <li key={idx} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {training.url ? (
                                      <a
                                        href={training.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          padding: '12px 14px',
                                          background: 'white',
                                          border: '1px solid #e5e7eb',
                                          borderRadius: '6px',
                                          marginBottom: '8px',
                                          fontSize: '14px',
                                          color: '#1f2937',
                                          textDecoration: 'none',
                                          transition: 'all 0.2s',
                                          cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => {
                                          const el = e.currentTarget as HTMLElement
                                          el.style.background = '#f3f4f6'
                                          el.style.borderColor = '#3730A3'
                                          el.style.color = '#3730A3'
                                        }}
                                        onMouseLeave={(e) => {
                                          const el = e.currentTarget as HTMLElement
                                          el.style.background = 'white'
                                          el.style.borderColor = '#e5e7eb'
                                          el.style.color = '#1f2937'
                                        }}
                                      >
                                        <span>{training.title}</span>
                                        <span style={{
                                          fontSize: '14px',
                                          color: '#3730A3',
                                          marginLeft: '16px',
                                          fontWeight: 600,
                                          whiteSpace: 'nowrap',
                                        }}>
                                          ↗
                                        </span>
                                      </a>
                                    ) : (
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          padding: '12px 14px',
                                          background: 'white',
                                          border: '1px solid #e5e7eb',
                                          borderRadius: '6px',
                                          marginBottom: '8px',
                                          fontSize: '14px',
                                          color: '#1f2937',
                                        }}
                                      >
                                        <span>{training.title}</span>
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

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

// ── Learning Journey Framework ───────────────────────────────────
function TLearningJourney({ data }: { data: CoPPageData }) {
  const ac = data.accentColor

  const CONTAINER_H = 540
  const STEP_H      = 90
  const STEP_RISE   = 72

  const steps = [
    {
      num: 1, label: 'EXPLORE', subtitle: 'Build Foundations',
      color: '#2563EB',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
      desc: 'Understand testing fundamentals, domain knowledge, tools, and proven best practices.',
    },
    {
      num: 2, label: 'PRACTICE', subtitle: 'Develop Skills',
      color: '#16A34A',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      desc: 'Participate in labs, hands-on sessions, simulations, and guided exercises.',
    },
    {
      num: 3, label: 'CERTIFY', subtitle: 'Validate Competence',
      color: '#7C3AED',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
      ),
      desc: 'Achieve recognised certifications and complete proficiency assessments.',
    },
    {
      num: 4, label: 'APPLY', subtitle: 'Deliver Value',
      color: '#EA580C',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      desc: 'Implement skills in projects, real-world engagements, and business situations.',
    },
    {
      num: 5, label: 'MENTOR', subtitle: 'Enable Others',
      color: '#0F766E',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      desc: 'Share expertise, guide team members, and contribute to the Testing CoP community.',
    },
  ]

  // Percentage coordinates for the SVG diagonal connector
  const lineX1 = 10
  const lineY1 = ((CONTAINER_H - STEP_H / 2) / CONTAINER_H) * 100
  const lineX2 = 90
  const lineY2 = ((CONTAINER_H - (4 * STEP_RISE + STEP_H / 2)) / CONTAINER_H) * 100

  return (
    <section className="reveal" style={{ padding: '72px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 16px',
            borderRadius: 999,
            background: `${ac}18`,
            color: ac,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>How We Grow</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>
            Learning Journey Framework
          </h2>
          <p style={{ color: '#64748B', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
            A structured 5-stage progression — from exploration to mentorship.
          </p>
        </div>

        {/* Staircase — scrolls horizontally on small screens */}
        <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{
            position: 'relative',
            height: CONTAINER_H,
            minWidth: 680,
            display: 'flex',
          }}>

            {/* Diagonal connector line */}
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1={lineX1} y1={lineY1}
                x2={lineX2} y2={lineY2}
                stroke="#CBD5E1"
                strokeWidth="0.35"
                strokeDasharray="2.5,1.8"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {steps.map((step, i) => {
              const stepBottom = i * STEP_RISE
              const cardBottom = stepBottom + STEP_H + 16
              return (
                <div key={i} style={{ flex: 1, position: 'relative' }}>

                  {/* Floating info card */}
                  <div style={{
                    position: 'absolute',
                    bottom: cardBottom,
                    left: 8,
                    right: 8,
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderLeft: `3px solid ${step.color}`,
                    borderRadius: 12,
                    padding: '14px 14px 12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                  }}>
                    <div style={{ color: step.color, marginBottom: 8 }}>{step.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', marginBottom: 5, lineHeight: 1.3 }}>
                      {step.subtitle}
                    </div>
                    <div style={{ fontSize: 11.5, color: '#64748B', lineHeight: 1.6 }}>
                      {step.desc}
                    </div>
                  </div>

                  {/* Step block */}
                  <div style={{
                    position: 'absolute',
                    bottom: stepBottom,
                    left: 8,
                    right: 8,
                    height: STEP_H,
                    background: step.color,
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 16px',
                    boxShadow: `0 6px 20px ${step.color}50`,
                  }}>
                    <div style={{
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: 1,
                    }}>Step {step.num}</div>
                    <div style={{
                      color: '#FFFFFF',
                      fontSize: 17,
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      lineHeight: 1,
                      marginBottom: 3,
                    }}>{step.label}</div>
                    <div style={{ color: 'rgba(255,255,255,0.78)', fontSize: 11 }}>
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Journey progress bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 6,
          marginTop: 20,
          padding: '12px 16px',
          background: '#F8FAFC',
          borderRadius: 10,
          border: '1px solid #E2E8F0',
        }}>
          {steps.map((s, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                width: 20, height: 20, borderRadius: '50%',
                background: s.color,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 10, fontWeight: 800,
              }}>{s.num}</span>
              <span style={{ color: s.color, fontWeight: 700, fontSize: 13 }}>{s.label}</span>
              {i < steps.length - 1 && (
                <span style={{ color: '#CBD5E1', fontSize: 14, marginLeft: 2 }}>→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Career Pathways ──────────────────────────────────────────────
function TCareerTracks({ data }: { data: CoPPageData }) {
  const tracks = data.careerTracks ?? []
  const ac = data.accentColor

  const levels = [
    { key: 'foundation'    as const, label: 'Foundation',   color: '#15803D', bg: '#DCFCE7', border: '#86EFAC' },
    { key: 'intermediate'  as const, label: 'Intermediate', color: '#1D4ED8', bg: '#DBEAFE', border: '#93C5FD' },
    { key: 'advanced'      as const, label: 'Advanced',     color: '#7C3AED', bg: '#EDE9FE', border: '#C4B5FD' },
  ]

  return (
    <section className="reveal" style={{ padding: '72px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 16px',
            borderRadius: 999,
            background: `${ac}18`,
            color: ac,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>Career Development</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>
            Testing Career Pathways
          </h2>
          <p style={{ color: '#64748B', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
            10 specialised tracks — from foundation skills to advanced expertise and industry certifications.
          </p>
        </div>

        {/* Track cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {tracks.map((track, i) => (
            <div key={i} style={{
              background: '#FFFFFF',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Card header */}
              <div style={{
                background: `linear-gradient(135deg, ${ac} 0%, ${darkenHex(ac, 0.18)} 100%)`,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}>
                <span style={{ fontSize: 28, lineHeight: 1 }}>{track.icon}</span>
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{track.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: 12, marginTop: 3 }}>
                    {track.targetRoles.join(' · ')}
                  </div>
                </div>
              </div>

              {/* Level columns */}
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)', gap: 0, flex: 1 }}>
                {levels.map(lvl => (
                  <div key={lvl.key} style={{ padding: '14px 10px', minWidth: 0, borderRight: lvl.key !== 'advanced' ? '1px solid #F1F5F9' : undefined }}>
                    <div style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: lvl.color,
                      marginBottom: 8,
                    }}>{lvl.label}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {(track[lvl.key] as string[]).map((item, j) => (
                        <span key={j} style={{
                          fontSize: 11,
                          padding: '2px 6px',
                          borderRadius: 6,
                          background: lvl.bg,
                          color: lvl.color,
                          border: `1px solid ${lvl.border}`,
                          lineHeight: 1.45,
                          display: 'block',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                        }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications footer */}
              {track.certifications.length > 0 && (
                <div style={{ padding: '12px 16px', borderTop: '1px solid #F1F5F9', background: '#FFFBEB' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#92400E', marginBottom: 7 }}>
                    Certifications
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {track.certifications.map((cert, j) => (
                      <span key={j} style={{
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 6,
                        background: '#FEF3C7',
                        color: '#92400E',
                        border: '1px solid #FCD34D',
                        fontWeight: 600,
                      }}>{cert}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
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
              <div className="event-date-block" style={{ background: ev.completed ? '#6b7280' : ev.accentColor }}>
                <span className="event-day">{ev.day}</span>
                <span className="event-month">{ev.month}</span>
              </div>
              <div className="event-details">
                <div className="event-details-top" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="event-badge">{ev.type}</span>
                  {ev.completed && <span className="event-badge" style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' }}>Completed</span>}
                </div>
                <h3>{ev.title}</h3>
                <p>{ev.desc}</p>
                <div className="event-meta">
                  {!ev.completed && <span>🕐 {ev.time}</span>}
                  {ev.completed && ev.recordingUrl
                    ? <a href={ev.recordingUrl} target="_blank" rel="noopener noreferrer" className="event-register" style={{ textDecoration: 'none' }}>▶ Watch Recording</a>
                    : !ev.completed && (
                      <button
                        className="event-register"
                        onClick={() => setModal({ title: ev.title, type: ev.type })}
                      >
                        Want to attend?
                      </button>
                    )
                  }
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

const MEMBERS_PAGE_SIZE = 50

function TMembers({ data }: { data: CoPPageData }) {
  const [sectionOpen, setSectionOpen]   = useState(true)
  const [streamOpen,  setStreamOpen]    = useState(true)
  const [search,      setSearch]        = useState('')
  const [activeFilter,setActiveFilter]  = useState<LevelFilter>('all')
  const [activePlatforms, setActivePlatforms] = useState<Set<string>>(new Set())
  const [visibleCount,    setVisibleCount]    = useState(MEMBERS_PAGE_SIZE)
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

  // Extract all unique platforms from members
  const allPlatforms = Array.from(
    new Set(members.flatMap(m => m.tags || []))
  ).sort()

  const filtered = members.filter(m => {
    const matchLevel  = activeFilter === 'all' || m.levelLabel === activeFilter
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
    const matchPlatform = activePlatforms.size === 0 || (m.tags && m.tags.some((t: string) => activePlatforms.has(t)))
    return matchLevel && matchSearch && matchPlatform
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
                  onChange={e => { setSearch(e.target.value); setVisibleCount(MEMBERS_PAGE_SIZE) }}
                  className="members-search"
                />
                {search && (
                  <button className="search-clear" onClick={() => { setSearch(''); setVisibleCount(MEMBERS_PAGE_SIZE) }}>✕</button>
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
                        onClick={() => { setActiveFilter(f.key); setVisibleCount(MEMBERS_PAGE_SIZE) }}
                      >
                        {f.label}
                        <span className="filter-count">{f.count}</span>
                      </button>
                    ))}
                  </div>

                  {allPlatforms.length > 0 && (
                    <div className="platform-filters" style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: 8 }}>
                        Technology
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {allPlatforms.map(platform => (
                          <button
                            key={platform}
                            className={`platform-filter-btn ${activePlatforms.has(platform) ? 'active' : ''}`}
                            onClick={() => {
                              const newPlatforms = new Set(activePlatforms)
                              if (newPlatforms.has(platform)) {
                                newPlatforms.delete(platform)
                              } else {
                                newPlatforms.add(platform)
                              }
                              setActivePlatforms(newPlatforms)
                              setVisibleCount(MEMBERS_PAGE_SIZE)
                            }}
                            style={{
                              padding: '6px 12px',
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              borderRadius: '6px',
                              border: `1.5px solid ${activePlatforms.has(platform) ? '#3730A3' : '#d1d5db'}`,
                              background: activePlatforms.has(platform) ? '#f5e6ff' : 'white',
                              color: activePlatforms.has(platform) ? '#3730A3' : '#374151',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            {platform}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filtered.length > 0 ? (
                    <>
                    <div className="members-grid">
                      {filtered.slice(0, visibleCount).map((member, idx) => (
                        <div key={member.name} className="member-card">
                          <div
                            className="member-avatar"
                            style={{ background: AV_COLORS[idx % AV_COLORS.length] }}
                          >
                            {member.initials}
                          </div>
                          <div className="member-info">
                            <h4>{member.name}</h4>
                            {member.role && (
                              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '4px', lineHeight: 1.3 }}>
                                {member.role}
                              </div>
                            )}
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
                            {member.tags && member.tags.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                                {member.tags.map((tag: string) => (
                                  <span
                                    key={tag}
                                    style={{
                                      display: 'inline-block',
                                      fontSize: '0.7rem',
                                      fontWeight: 600,
                                      padding: '2px 6px',
                                      borderRadius: '3px',
                                      background: 'rgba(55, 48, 163, 0.1)',
                                      color: '#3730A3',
                                      border: '1px solid rgba(55, 48, 163, 0.2)',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {visibleCount < filtered.length && (
                      <div style={{ textAlign: 'center', marginTop: 24 }}>
                        <button
                          onClick={() => setVisibleCount(c => c + MEMBERS_PAGE_SIZE)}
                          style={{
                            padding: '10px 28px',
                            borderRadius: 8,
                            border: '1.5px solid var(--acc-purple)',
                            background: 'white',
                            color: 'var(--acc-purple)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                          }}
                        >
                          Show more ({filtered.length - visibleCount} remaining)
                        </button>
                      </div>
                    )}
                    </>
                  ) : (
                    <div className="members-empty">
                      <div className="empty-icon">🔍</div>
                      <p>No members match <strong>"{search}"</strong></p>
                      <button
                        onClick={() => { setSearch(''); setActiveFilter('all'); setVisibleCount(MEMBERS_PAGE_SIZE) }}
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

// ── What We Do ───────────────────────────────────────────────────
function TWhatWeDo({ data }: { data: CoPPageData }) {
  const items = data.whatWeDo ?? []
  const ac = data.accentColor
  return (
    <section className="reveal" style={{ padding: '72px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 999, background: `${ac}18`, color: ac, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Our Work</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: 0 }}>What We Do</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '16px 20px', background: `${ac}08`, borderRadius: 12, border: `1px solid ${ac}22` }}>
              <span style={{ color: ac, fontSize: 16, flexShrink: 0, marginTop: 2, fontWeight: 700 }}>✦</span>
              <span style={{ color: '#334155', fontSize: 14, fontWeight: 500, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Why Join ─────────────────────────────────────────────────────
function TWhyJoin({ data }: { data: CoPPageData }) {
  const items = data.whyJoin ?? []
  const ac = data.accentColor
  return (
    <section className="reveal" style={{ padding: '72px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 999, background: `${ac}18`, color: ac, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Get Involved</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: 0 }}>Why Join the {data.name} CoP?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '16px 20px', background: '#FFFFFF', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
              <span style={{ color: '#16a34a', fontSize: 16, flexShrink: 0, marginTop: 1 }}>✅</span>
              <span style={{ color: '#334155', fontSize: 14, fontWeight: 500, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CoP Roadmap ──────────────────────────────────────────────────
function TRoadmap({ data }: { data: CoPPageData }) {
  const sections = data.roadmap ?? []
  const ac = data.accentColor
  return (
    <section className="reveal" style={{ padding: '72px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 999, background: `${ac}18`, color: ac, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>CoP Roadmap</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>Learning & Certification Programs</h2>
          <p style={{ color: '#64748B', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>A phased approach to building momentum — from launch to scale.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {sections.map((sec, i) => (
            <div key={i} style={{ border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ background: `linear-gradient(135deg, ${ac} 0%, ${darkenHex(ac, 0.18)} 100%)`, padding: '18px 28px' }}>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>{sec.badge}</div>
                <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: 12, marginTop: 4 }}>{sec.category}</div>
              </div>
              <div style={{ background: '#FFFFFF' }}>
                {sec.items.map((item, j) => (
                  <div key={j} style={{ padding: '20px 28px', borderBottom: j < sec.items.length - 1 ? '1px solid #F1F5F9' : undefined, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    {item.num && (
                      <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: `${ac}15`, color: ac, fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                        {item.num.replace('.', '')}
                      </span>
                    )}
                    <div>
                      <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 14, marginBottom: 5 }}>{item.title}</div>
                      <div style={{ color: '#64748B', fontSize: 13, lineHeight: 1.65 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Learning & Certification Pathway ─────────────────────────────
function TLearningTracks({ data }: { data: CoPPageData }) {
  const tracks = data.learningTracks ?? []
  const ac = data.accentColor

  const levelMeta: Record<string, { color: string; bg: string; border: string }> = {
    Beginner:     { color: '#15803D', bg: '#DCFCE7', border: '#86EFAC' },
    Intermediate: { color: '#1D4ED8', bg: '#DBEAFE', border: '#93C5FD' },
    Advanced:     { color: '#7C3AED', bg: '#EDE9FE', border: '#C4B5FD' },
    Expert:       { color: '#9D174D', bg: '#FCE7F3', border: '#F9A8D4' },
  }

  return (
    <section className="reveal" style={{ padding: '72px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 999, background: `${ac}18`, color: ac, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Learning Pathway</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>Learning & Certification Pathway</h2>
          <p style={{ color: '#64748B', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>A progressive learning journey — from AI curious to Agentic AI practitioner.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {tracks.map((t, i) => {
            const meta = levelMeta[t.level] ?? { color: ac, bg: `${ac}12`, border: `${ac}40` }
            return (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden', display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 2fr', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ padding: '20px 24px', borderRight: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94A3B8', marginBottom: 6 }}>Track</div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 15 }}>{t.track}</div>
                </div>
                <div style={{ padding: '20px 16px', borderRight: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94A3B8', marginBottom: 8 }}>Level</div>
                  <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 8, background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`, fontWeight: 700 }}>{t.level}</span>
                </div>
                <div style={{ padding: '20px 16px', borderRight: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94A3B8', marginBottom: 8 }}>Focus Areas</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {t.focusAreas.map((f, j) => (
                      <span key={j} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', fontWeight: 500 }}>{f}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '20px 16px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#92400E', marginBottom: 8 }}>Certifications</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {t.certifications.map((c, j) => (
                      <span key={j} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D', fontWeight: 600 }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Initial Focus Areas ───────────────────────────────────────────
function TFocusAreas({ data }: { data: CoPPageData }) {
  const areas = data.focusAreas ?? []
  const ac = data.accentColor

  const areaIcons = ['📋', '🔗', '⚡', '📊']

  return (
    <section className="reveal" style={{ padding: '72px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 999, background: `${ac}18`, color: ac, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>QBE Focus</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>Initial Focus Areas for QBE</h2>
          <p style={{ color: '#64748B', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>Where Agentic AI delivers the most immediate value across QBE NA workstreams.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {areas.map((area, i) => (
            <div key={i} style={{ background: '#FFFFFF', borderRadius: 14, border: `1px solid ${ac}22`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '24px 24px 20px', borderTop: `3px solid ${ac}` }}>
              <div style={{ fontSize: 28, marginBottom: 14, lineHeight: 1 }}>{areaIcons[i % areaIcons.length]}</div>
              <h3 style={{ fontWeight: 700, color: '#0F172A', fontSize: 16, margin: '0 0 10px' }}>{area.title}</h3>
              <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{area.desc}</p>
            </div>
          ))}
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

    const formNameLower  = formName.toLowerCase().trim()
    const formEmailLower = formEmail.toLowerCase().trim()

    // Check against official members (by name) and localStorage (by name or email)
    const officialNames = new Set((data.members ?? []).map((m: any) => (m.name || '').toLowerCase().trim()))
    const isDuplicateInStorage = existingMembers.some(
      (m: any) =>
        (m.name || '').toLowerCase().trim() === formNameLower ||
        (m.email && m.email.toLowerCase().trim() === formEmailLower),
    )

    if (officialNames.has(formNameLower) || isDuplicateInStorage) {
      setMessage({ type: 'error', text: 'You are already a member of this community!' })
      setTimeout(() => setMessage(null), 4000)
      return
    }

    const initials = formName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    const newMember = {
      name: formName,
      email: formEmail,
      initials,
      levelLabel: 'Trained',
      levelColor: '#16a34a',
      levelBg: '#dcfce7',
      levelText: '#065f46',
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
