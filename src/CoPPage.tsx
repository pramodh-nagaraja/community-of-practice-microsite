import { useState, useEffect, useRef } from 'react'
import type { CoPPageData, CoPLeader, CoPMember, CoPEvent, CoPResourceStream, CertStage, SkillFlavor } from './data/types'
import './CoPPage.css'

/* ── Topology background data ───────────────────────────────── */
const NODES = [
  { x:  5, y: 20, r: 4 }, { x: 15, y: 48, r: 6 }, { x:  8, y: 72, r: 3 },
  { x: 26, y: 12, r: 7 }, { x: 32, y: 60, r: 5 }, { x: 20, y: 84, r: 4 },
  { x: 44, y: 30, r: 8 }, { x: 48, y: 68, r: 5 }, { x: 58, y: 14, r: 5 },
  { x: 64, y: 44, r: 9 }, { x: 72, y: 24, r: 5 }, { x: 78, y: 64, r: 5 },
  { x: 86, y: 14, r: 4 }, { x: 90, y: 46, r: 6 }, { x: 94, y: 78, r: 4 },
  { x: 98, y: 30, r: 3 },
]
const EDGES = [
  [0,1],[1,2],[0,3],[1,4],[2,5],[3,6],[4,6],[4,7],[5,7],
  [3,8],[6,8],[6,9],[8,10],[9,10],[9,11],[10,12],[10,13],
  [11,13],[12,15],[13,14],[11,14],[7,11],[1,4],[6,15],
]

/* ── Hooks ──────────────────────────────────────────────────── */
function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return { progress, scrolled }
}

function useCountUp(end: number, duration: number, run: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) { setVal(0); return }
    let raf: number
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1)
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * end))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, run])
  return val
}

/* ── Main component ─────────────────────────────────────────── */
export default function CoPPage({ data }: { data: CoPPageData }) {
  useEffect(() => {
    const els = document.querySelectorAll('.cp-reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('cp-revealed'); io.unobserve(e.target) }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const navItems = [
    { label: 'About',         id: 'about' },
    ...(data.certStages?.length    ? [{ label: 'Certification', id: 'pathway'   }] : []),
    ...(data.skillFlavors?.length  ? [{ label: 'Database Types', id: 'flavors'   }] : []),
    ...(data.events?.length        ? [{ label: 'Events',        id: 'events'    }] : []),
    ...(data.resources?.length     ? [{ label: 'Resources',     id: 'resources' }] : []),
    ...(data.members?.length       ? [{ label: 'Members',       id: 'members'   }] : []),
    ...(data.celebrateLearning     ? [{ label: '🏅 Celebrate',  id: 'celebrate' }] : []),
    { label: 'Leadership', id: 'team' },
  ]

  return (
    <div className="cp-root" style={{ '--cp-accent': data.accentColor } as React.CSSProperties}>
      <CPNav name={data.name} navItems={navItems} />
      <CPHero data={data} />
      <CPAbout data={data} />
      {!!data.certStages?.length && <CPPathway stages={data.certStages} spotlight={data.spotlight} flavors={data.skillFlavors} />}
      {!!data.skillFlavors?.length && <CPSkillFlavors flavors={data.skillFlavors} copName={data.name} />}
      {!!data.events?.length     && <CPEvents events={data.events} />}
      {!!data.resources?.length  && <CPResources streams={data.resources} />}
      {!!data.members?.length       && <CPMembers members={data.members} copName={data.name} />}
      {!!data.celebrateLearning     && <CPCelebrateLearning celebrate={data.celebrateLearning} copName={data.name} />}
      <CPLeadership leaders={data.leadership} />
      <CPJoin data={data} />
      <CPFooter data={data} />
    </div>
  )
}

/* ── Navbar ─────────────────────────────────────────────────── */
function CPNav({ name, navItems }: { name: string; navItems: { label: string; id: string }[] }) {
  const { progress, scrolled } = useScrollProgress()
  const [active, setActive]   = useState('hero')
  const [open, setOpen]       = useState(false)

  useEffect(() => {
    const ids = ['hero', ...navItems.map(i => i.id), 'join']
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.3 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [navItems])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={`cp-nav${scrolled ? ' cp-nav-scrolled' : ''}`}>
      <div className="cp-nav-progress" style={{ width: `${progress}%` }} />
      <div className="cp-nav-back-bar">
        <button className="cp-nav-back-btn" onClick={() => { window.location.hash = '/' }}>
          ← All Communities
        </button>
      </div>
      <div className="cp-nav-container">
        <div className="cp-nav-brand" onClick={() => go('hero')}>
          <div className="cp-acc-arrow">›</div>
          <div className="cp-nav-brand-text">
            <span className="cp-nav-brand-main">{name} CoP</span>
            <span className="cp-nav-brand-sub">QBE Account | Accenture</span>
          </div>
        </div>
        <button className="cp-nav-toggle" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span className={`cp-hamburger${open ? ' open' : ''}`} />
        </button>
        <ul className={`cp-nav-links${open ? ' open' : ''}`}>
          {navItems.map(({ label, id }) => (
            <li key={id}>
              <button onClick={() => go(id)} className={`cp-nav-link${active === id ? ' active' : ''}`}>{label}</button>
            </li>
          ))}
          <li>
            <button onClick={() => go('join')} className="cp-nav-link cp-nav-cta">Join CoP</button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

/* ── Hero ───────────────────────────────────────────────────── */
function CPHero({ data }: { data: CoPPageData }) {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect() } }, { threshold: 0.3 })
    io.observe(el); return () => io.disconnect()
  }, [])

  const members  = useCountUp(data.memberCount,      1200, run)
  const certs    = useCountUp(data.certCount ?? 0,   1500, run)
  const sessions = useCountUp(data.sessionsHeld ?? 0, 1000, run)
  const year     = useCountUp(data.launchYear ?? 2026, 800, run)

  const stats = [
    { val: members,  label: 'Members' },
    ...(data.certCount    ? [{ val: certs,    label: 'Certified' }] : []),
    ...(data.sessionsHeld ? [{ val: sessions, label: 'Sessions'  }] : []),
    { val: year, label: 'Launched' },
  ]

  return (
    <section id="hero" className="cp-hero">
      {/* Topology background */}
      <div className="cp-hero-bg" aria-hidden="true">
        <svg className="cp-topo-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {EDGES.map(([a, b], i) => (
            <line key={i}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              className="cp-topo-line"
            />
          ))}
        </svg>
        {NODES.map((n, i) => (
          <div key={i} className="cp-node"
            style={{ width: n.r*2, height: n.r*2, top: `${n.y}%`, left: `${n.x}%`,
              animationDelay: `${(i * 0.35) % 3}s` }}
          />
        ))}
      </div>

      <div className="cp-hero-content">
        <div className="cp-hero-badges">
          <span className="cp-badge cp-badge-acc">Accenture</span>
          <span className="cp-badge cp-badge-qbe">QBE Account Technology</span>
        </div>

        <div className="cp-hero-icon-wrap">
          <img src={data.icon} alt={data.name} className="cp-hero-icon" />
        </div>

        <h1 className="cp-hero-title">
          {data.name}
          <span className="cp-hero-title-accent"> Community of Practice</span>
        </h1>
        <p className="cp-hero-tagline">{data.tagline}</p>
        <p className="cp-hero-desc">{data.description}</p>

        {/* Stats */}
        <div ref={ref} className="cp-hero-stats">
          {stats.map((s, i) => (
            <div key={i} className="cp-stat-wrap">
              {i > 0 && <div className="cp-stat-divider" />}
              <div className="cp-stat">
                <div className="cp-stat-val">{s.val}</div>
                <div className="cp-stat-lbl">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="cp-hero-actions">
          <button onClick={() => go('about')} className="cp-btn-primary">Explore CoP</button>
          <button onClick={() => go('join')}  className="cp-btn-secondary">Join the Community</button>
        </div>

        <div className="cp-scroll-cue" onClick={() => go('about')}>
          <div className="cp-scroll-line" />
          <span>Scroll to discover</span>
        </div>
      </div>
    </section>
  )
}

/* ── About ──────────────────────────────────────────────────── */
function CPAbout({ data }: { data: CoPPageData }) {
  const pillars = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
        </svg>
      ),
      title: 'Our Mission', body: data.mission,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      title: 'Our Vision', body: data.vision,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.3l-6.2 4.1 2.4-7.4L2 9.4h7.6z"/>
        </svg>
      ),
      title: 'Our Values', body: data.values,
    },
  ]

  return (
    <section id="about" className="cp-section cp-about">
      <div className="cp-container cp-reveal">
        <div className="cp-section-label">About the CoP</div>
        <h2 className="cp-section-title">What We Stand For</h2>
        <div className="cp-pillars-grid">
          {pillars.map((p, i) => (
            <div key={i} className="cp-pillar-card">
              <div className="cp-pillar-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Certification Pathway ───────────────────────────────────── */
function CPPathway({ stages, spotlight, flavors }: { stages: CertStage[]; spotlight?: CoPPageData['spotlight']; flavors?: SkillFlavor[] }) {
  const [open, setOpen] = useState(true)

  return (
    <section id="pathway" className="cp-section cp-pathway">
      <div className="cp-container cp-reveal">
        <div className="cp-section-top-row">
          <div>
            <div className="cp-section-label">Achievement Snapshot</div>
            <h2 className="cp-section-title" style={{ marginBottom: 0 }}>Certification Pathway</h2>
          </div>
          <button className="cp-collapse-btn" onClick={() => setOpen(o => !o)}>
            <span>{open ? '−' : '+'}</span>
            <span>{open ? 'Minimise' : 'Expand'}</span>
          </button>
        </div>

        {open && (
          <>
            <p className="cp-section-desc">
              A structured certification journey showcasing the team's commitment to continuous learning.
            </p>
            {flavors && flavors.length > 0 && (
              <div className="cp-pathway-flavors">
                <div className="cp-pathway-flavors-label">Supported Platforms</div>
                <div className="cp-pathway-flavors-grid">
                  {flavors.map(f => (
                    <button key={f.name} className="cp-pathway-flavor-btn">
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="cp-pathway-pipeline">
              {stages.map((s, i) => (
                <div key={i} className="cp-pipeline-row">
                  <div className="cp-pathway-card" style={{ borderColor: s.border, background: s.bg }}>
                    <div className="cp-pathway-card-head">
                      <div className="cp-stage-num" style={{ background: s.color }}>Stage {s.num}</div>
                    </div>
                    <h3 style={{ color: s.color }}>{s.title}</h3>
                    <p className="cp-pathway-subtitle">{s.subtitle}</p>
                    <div className="cp-pathway-count" style={{ color: s.color }}>
                      {s.count}<span> members</span>
                      {s.trainings !== undefined && s.trainings > 0 && <><span style={{ marginLeft: '1.5rem' }}>{s.trainings}</span><span> trainings</span></>}
                    </div>
                    <div className="cp-pathway-bar-wrap">
                      <div className="cp-pathway-bar-fill"
                        style={{ width: `${Math.round((s.count / s.totalCohort) * 100)}%`, background: s.color }} />
                    </div>
                    <div className="cp-pathway-pct" style={{ color: s.color }}>
                      {Math.round((s.count / s.totalCohort) * 100)}% of total cohort
                    </div>
                    <p className="cp-pathway-desc">{s.desc}</p>
                    {s.links && s.links.length > 0 && (
                      <h4 style={{ color: s.color, fontWeight: 600, fontSize: '14px', marginBottom: '12px', marginTop: '12px' }}>Courses</h4>
                    )}
                    {s.progressRate && (
                      <div className="cp-pathway-rate" style={{ color: s.color, borderColor: s.border }}>
                        ↑ {s.progressRate}
                      </div>
                    )}
                    {s.links && s.links.length > 0 && (
                      <div className="cp-pathway-links">
                        {s.links.map((link, idx) => (
                          <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="cp-pathway-link-btn" style={{ color: s.color, borderColor: s.color }}>
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {i < stages.length - 1 && (
                    <div className="cp-connector">
                      <div className="cp-connector-line" />
                      <div className="cp-connector-arrow">›</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {spotlight && (
              <div className="cp-spotlight">
                <div className="cp-spotlight-head">
                  <span className="cp-spotlight-icon">🏆</span>
                  <div>
                    <h3>{spotlight.title}</h3>
                    <p>{spotlight.desc}</p>
                  </div>
                </div>
                <div className="cp-spotlight-names">
                  {spotlight.names.map((name, i) => (
                    <div key={i} className="cp-spotlight-chip">
                      <span className="cp-chip-av">
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

/* ── Skill Flavors ──────────────────────────────────────────── */
function CPSkillFlavors({ flavors, copName }: { flavors: SkillFlavor[]; copName: string }) {
  return (
    <section id="flavors" className="cp-section cp-flavors">
      <div className="cp-container cp-reveal">
        <div className="cp-section-label">{copName}</div>
        <h2 className="cp-section-title">Database Types & Platforms</h2>
        <p className="cp-section-desc">
          Expertise across multiple database technologies used in the client network.
        </p>
        <div className="cp-flavors-grid">
          {flavors.map(f => (
            <div key={f.name} className="cp-flavor-card">
              <div className="cp-flavor-badge" style={{ background: f.color || '#E8E8FF', color: f.bg || '#3730A3' }}>
                {f.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Events ─────────────────────────────────────────────────── */
function CPEvents({ events }: { events: CoPEvent[] }) {
  return (
    <section id="events" className="cp-section cp-events">
      <div className="cp-container cp-reveal">
        <div className="cp-section-label">Stay Connected</div>
        <h2 className="cp-section-title">Upcoming Sessions</h2>
        <p className="cp-section-desc">
          Regular knowledge-sharing sessions, workshops, and deep dives. All QBE Account technology professionals are welcome.
        </p>
        <div className="cp-events-grid">
          {events.map((ev, i) => (
            <div key={i} className="cp-event-card">
              <div className="cp-event-date" style={{ background: ev.accentColor }}>
                <span className="cp-event-day">{ev.day}</span>
                <span className="cp-event-month">{ev.month}</span>
              </div>
              <div className="cp-event-body">
                <span className="cp-event-badge">{ev.type}</span>
                <h3>{ev.title}</h3>
                <p>{ev.desc}</p>
                <div className="cp-event-time">🕐 {ev.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Resources ──────────────────────────────────────────────── */
function CPResources({ streams }: { streams: CoPResourceStream[] }) {
  return (
    <section id="resources" className="cp-section cp-resources">
      <div className="cp-container cp-reveal">
        <div className="cp-section-label">Knowledge Hub</div>
        <h2 className="cp-section-title">Resources &amp; Artifacts</h2>
        <p className="cp-section-desc">
          Curated resources organised by technology stream to support your journey.
        </p>
        <div className="cp-res-grid">
          {streams.map(s => (
            <div key={s.title} className="cp-res-card" style={{ borderColor: s.border, background: s.bg }}>
              <h3 className="cp-res-stream-title" style={{ color: s.color }}>{s.title}</h3>
              <ul className="cp-res-list">
                {s.items.map((item, i) => (
                  <li key={i} className="cp-res-item">
                    <span className="cp-res-dot" style={{ background: s.color }} />
                    <span className="cp-res-name">{item.name}</span>
                    <span className="cp-res-tag" style={{ color: s.tagColor, background: s.tagBg }}>{item.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Members ─────────────────────────────────────────────────── */
function CPMembers({ members, copName }: { members: CoPMember[]; copName: string }) {
  const [search, setSearch] = useState('')
  const [open, setOpen]     = useState(true)
  const filtered = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <section id="members" className="cp-section cp-members">
      <div className="cp-container cp-reveal">
        <div className="cp-section-top-row">
          <div>
            <div className="cp-section-label">{copName}</div>
            <h2 className="cp-section-title" style={{ marginBottom: 0 }}>CoP Members Directory</h2>
          </div>
          <button className="cp-collapse-btn cp-collapse-btn-dark" onClick={() => setOpen(o => !o)}>
            <span>{open ? '−' : '+'}</span>
            <span>{open ? 'Minimise' : 'Expand'}</span>
          </button>
        </div>

        {open && (
          <>
            <div className="cp-search-wrap">
              <svg className="cp-search-icon" viewBox="0 0 20 20" fill="none">
                <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text" placeholder="Search members…" value={search}
                onChange={e => setSearch(e.target.value)} className="cp-search-input"
              />
              {search && <button className="cp-search-clear" onClick={() => setSearch('')}>✕</button>}
            </div>

            {filtered.length > 0 ? (
              <div className="cp-members-grid">
                {filtered.map(m => (
                  <div key={m.name} className="cp-member-card">
                    <div className="cp-member-av" style={{ background: m.levelColor }}>{m.initials}</div>
                    <div className="cp-member-info">
                      <h4>{m.name}</h4>
                      <span className="cp-member-badge" style={{ color: m.levelText, background: m.levelBg }}>
                        <span className="cp-member-dot" style={{ background: m.levelColor }} />
                        {m.levelLabel}
                      </span>
                      {m.tags && m.tags.length > 0 && (
                        <div className="cp-member-tags">
                          {m.tags.map(tag => (
                            <span key={tag} className="cp-member-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="cp-members-empty">
                <div className="cp-empty-icon">🔍</div>
                <p>No members match <strong>"{search}"</strong></p>
                <button onClick={() => setSearch('')} className="cp-clear-btn">Reset</button>
              </div>
            )}

            <div className="cp-members-total">
              {members.length} members total · {filtered.length} shown
            </div>
          </>
        )}
      </div>
    </section>
  )
}

/* ── Celebrate Learning ──────────────────────────────────────── */
function CPCelebrateLearning({
  celebrate, copName,
}: {
  celebrate: NonNullable<CoPPageData['celebrateLearning']>
  copName: string
}) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected  = celebrate.names[selectedIdx]
  const initials  = selected.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <section id="celebrate" className="cp-section cp-celebrate">
      <div className="cp-container cp-reveal">
        <div className="cp-celebrate-eyebrow">
          <span className="cp-celebrate-stars">✦ ✦ ✦</span>
          <span className="cp-celebrate-label">Celebrate Learning</span>
          <span className="cp-celebrate-stars">✦ ✦ ✦</span>
        </div>

        <div key={selectedIdx} className="cp-celebrate-spotlight">
          <div className="cp-celebrate-av">{initials}</div>
          <p className="cp-celebrate-congrats">Congratulations!</p>
          <h2 className="cp-celebrate-name">{selected}</h2>
          <p className="cp-celebrate-desc">
            A proud member of the <strong>{copName}</strong> CoP —{' '}
            {celebrate.desc}
          </p>
          <div className="cp-celebrate-achievement-badge">
            <span>🏅</span>
            <span>{celebrate.title}</span>
          </div>
        </div>

        <div className="cp-celebrate-tiles">
          {celebrate.names.map((name, idx) => {
            const ti = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
            return (
              <div
                key={idx}
                className={`cp-cel-tile${idx === selectedIdx ? ' active' : ''}`}
                onClick={() => setSelectedIdx(idx)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelectedIdx(idx)}
                aria-pressed={idx === selectedIdx}
              >
                <div className="cp-cel-av">{ti}</div>
                <div className="cp-cel-name">{name}</div>
                <div className="cp-cel-chip">🏅 Achiever</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Leadership ─────────────────────────────────────────────── */
function CPLeaderPhoto({ src, alt, initials }: { src?: string; alt: string; initials: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError]   = useState(false)
  return (
    <div className="cp-leader-photo-wrap">
      {src && !error && (
        <img src={src} alt={alt}
          className={`cp-leader-photo${loaded ? ' loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      {(!src || error || !loaded) && (
        <div className={`cp-leader-initials${loaded ? ' hidden' : ''}`}>{initials}</div>
      )}
    </div>
  )
}

function CPLeadership({ leaders }: { leaders: CoPLeader[] }) {
  return (
    <section id="team" className="cp-section cp-leadership">
      <div className="cp-container cp-reveal">
        <div className="cp-section-label">Meet the Team</div>
        <h2 className="cp-section-title">CoP Leadership</h2>
        <p className="cp-section-desc">
          Experienced leaders driving excellence and collaboration across the community.
        </p>
        <div className="cp-leaders-grid">
          {leaders.map((l, i) => (
            <div key={i} className={`cp-leader-card cp-leader-${l.badgeStyle}`}>
              <div className="cp-leader-card-top">
                <CPLeaderPhoto src={l.photo} alt={l.name} initials={l.initials} />
              </div>
              <div className="cp-leader-card-body">
                <span className={`cp-leader-badge cp-leader-badge-${l.badgeStyle}`}>{l.badge}</span>
                <h3>{l.name}</h3>
                <p>{l.role}</p>
                <a href={`mailto:${l.email}`} className="cp-leader-btn">Connect →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Join ───────────────────────────────────────────────────── */
function CPJoin({ data }: { data: CoPPageData }) {
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [role,     setRole]     = useState('')
  const [interest, setInterest] = useState('')
  const [note,     setNote]     = useState('')
  const [message,  setMessage]  = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const interests = data.joinInterests ?? [
    'General', 'Certifications', 'Knowledge Sharing', 'Events', 'Tools & Automation',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const storageKey = `cop_members_${data.id}`
    const existingMembers = JSON.parse(localStorage.getItem(storageKey) || '[]')

    const nameLower = name.toLowerCase().trim()
    if (existingMembers.some((m: any) => (m.name || '').toLowerCase().trim() === nameLower)) {
      setMessage({ type: 'error', text: 'You have already joined this community!' })
      setTimeout(() => setMessage(null), 4000)
      return
    }

    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    existingMembers.push({
      name,
      initials,
      levelLabel: 'Trained',
      levelColor: '#16a34a',
      levelBg: '#dcfce7',
      levelText: '#065f46',
    })
    localStorage.setItem(storageKey, JSON.stringify(existingMembers))
    window.dispatchEvent(new Event('memberAdded'))

    const subject = encodeURIComponent(`${data.name} CoP Membership Request — ${name}`)
    const body = encodeURIComponent(
      `Hi CoP Lead,\n\n${name} has requested to join the ${data.name} Community of Practice.\n\nDetails:\n- Email: ${email}\n- Role: ${role}\n- Interest: ${interest}${note ? `\n- Message: ${note}` : ''}\n\nPlease reach out to onboard them.\n\nThank you.`
    )
    window.open(`mailto:${data.joinEmail}?subject=${subject}&body=${body}`)

    setMessage({ type: 'success', text: '✓ Added to community! Email to CoP Lead is opening...' })
    setName('')
    setEmail('')
    setRole('')
    setInterest('')
    setNote('')
    setTimeout(() => setMessage(null), 4000)
  }

  return (
    <section id="join" className="cp-join">
      <div className="cp-container cp-reveal">
        <div className="cp-join-inner">
          <div className="cp-join-left">
            <div className="cp-section-label light">Get Involved</div>
            <h2>Join the {data.name} Community</h2>
            <p>Connect with domain experts at QBE Account. Contribute, learn, and grow with us.</p>
            <ul className="cp-join-benefits">
              {[
                'Access exclusive knowledge resources and playbooks',
                'Connect with domain experts across QBE Account',
                'Participate in hands-on workshops and deep dives',
                'Earn recognition for contributions and certifications',
              ].map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
          <div className="cp-join-form-wrap">
            <h3>Request to Join</h3>
            {message && (
              <div style={{
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
            <form onSubmit={handleSubmit} className="cp-join-form">
              <input type="text"  placeholder="Full Name"        required value={name}     onChange={e => setName(e.target.value)} />
              <input type="email" placeholder="Work Email"        required value={email}    onChange={e => setEmail(e.target.value)} />
              <input type="text"  placeholder="Role / Job Title" required value={role}     onChange={e => setRole(e.target.value)} />
              <select required value={interest} onChange={e => setInterest(e.target.value)}>
                <option value="" disabled>Area of Interest</option>
                {interests.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <textarea placeholder="Brief introduction (optional)" rows={3} value={note} onChange={e => setNote(e.target.value)} />
              <button type="submit" className="cp-submit-btn">Submit Request ↗</button>
              <p className="cp-join-hint">You'll be added to the members list and an email will open for you to send to the CoP Lead.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ─────────────────────────────────────────────────── */
function CPFooter({ data }: { data: CoPPageData }) {
  // Extract CoP Lead and Global Lead emails from leadership
  const copLead = data.leadership.find(l => (l.badge || '').toLowerCase().includes('cop'))
  const globalLead = data.leadership.find(l => (l.badge || '').toLowerCase().includes('global'))

  return (
    <footer className="cp-footer">
      <div className="cp-container">
        <div className="cp-footer-grid">
          <div className="cp-footer-brand">
            <div className="cp-footer-logo">
              <span className="cp-acc-arrow-sm">›</span>
              <span>{data.name} CoP | QBE Account</span>
            </div>
            <p>{data.tagline}</p>
            <div className="cp-footer-credit">Powered by <strong>Accenture</strong></div>
          </div>
          <div className="cp-footer-contact">
            <h4>Contact</h4>
            {data.contactEmails && data.contactEmails.length > 0 ? (
              data.contactEmails.map((email, i) => <p key={i}>📧 {email}</p>)
            ) : (
              <>
                {copLead && <p>📧 {copLead.email}</p>}
                {globalLead && <p>📧 {globalLead.email}</p>}
              </>
            )}
          </div>
        </div>
        <div className="cp-footer-bottom">
          © 2026 QBE Account {data.name} Community of Practice | Accenture. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
