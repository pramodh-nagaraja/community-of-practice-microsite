import { useState, useEffect, useRef } from 'react'
import { COMMUNITIES, type CoPCommunity } from './data/communities'
import './LandingPage.css'

type FilterTab = 'all' | 'active' | 'coming-soon'

/* ── Hooks ──────────────────────────────────────────────── */

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, on }
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrolled,  setScrolled]  = useState(false)
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

function useCountUp(end: number, duration = 1600, run = false) {
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

/* ── Topology data (hero background) ───────────────────── */

const TOPO_NODES = [
  { x:  4, y: 18, r: 3 }, { x: 14, y: 42, r: 5 }, { x:  7, y: 70, r: 3 },
  { x: 24, y: 10, r: 6 }, { x: 30, y: 58, r: 4 }, { x: 18, y: 82, r: 4 },
  { x: 42, y: 28, r: 7 }, { x: 46, y: 70, r: 5 }, { x: 56, y: 12, r: 5 },
  { x: 62, y: 46, r: 8 }, { x: 70, y: 22, r: 5 }, { x: 76, y: 62, r: 5 },
  { x: 85, y: 12, r: 4 }, { x: 88, y: 44, r: 6 }, { x: 92, y: 76, r: 4 },
  { x: 97, y: 28, r: 3 }, { x: 52, y: 88, r: 4 }, { x: 36, y: 40, r: 5 },
]

const TOPO_EDGES = [
  [0,1],[1,2],[0,3],[1,4],[2,5],[3,6],[4,6],[4,7],[5,7],
  [3,8],[6,8],[6,9],[8,10],[9,10],[9,11],[10,12],[10,13],
  [11,13],[12,15],[13,14],[14,15],[11,14],[7,16],[4,17],
  [6,17],[17,9],[1,17],[7,11],[16,11],[8,15],
]

/* ── Main ───────────────────────────────────────────────── */

export default function LandingPage() {
  const [filter, setFilter]   = useState<FilterTab>('all')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40)
    return () => clearTimeout(t)
  }, [])

  const activeCount  = COMMUNITIES.filter(c => c.status === 'active').length
  const totalMembers = COMMUNITIES.reduce((s, c) => s + (c.memberCount ?? 0), 0)
  const latestUpdate = COMMUNITIES.reduce((latest, c) =>
    c.lastUpdated > latest ? c.lastUpdated : latest, '')

  const displayed = filter === 'all'
    ? COMMUNITIES
    : COMMUNITIES.filter(c => c.status === filter)

  const go = (route: string) => {
    window.location.hash = route.startsWith('#/') ? route : `#/${route}`
  }

  return (
    <div className={`lp-root${visible ? ' lp-visible' : ''}`}>
      <LPHeader />
      <LPHero activeCount={activeCount} totalMembers={totalMembers} />
      <VisionMission />

      <section className="lp-communities">
        <div className="lp-comm-glow" aria-hidden="true" />
        <CommSparkles />
        <div className="lp-comm-inner">
          <div className="lp-comm-header">
            <div>
              <p className="lp-comm-eyebrow">Explore the ecosystem</p>
              <h2 className="lp-comm-title">All Communities</h2>
            </div>
            <div className="lp-filter-dark">
              {([
                ['all',         `All  ${COMMUNITIES.length}`],
                ['active',      `Active  ${activeCount}`],
                ['coming-soon', `Coming Soon  ${COMMUNITIES.length - activeCount}`],
              ] as [FilterTab, string][]).map(([tab, label]) => (
                <button
                  key={tab}
                  className={`lp-fdb${filter === tab ? ' lp-fdb-on' : ''}`}
                  onClick={() => setFilter(tab)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="lp-cop-grid">
            {displayed.map((cop, i) => (
              <CoPCard key={cop.id} cop={cop} index={i} onGo={go} />
            ))}
          </div>
        </div>
      </section>

      <LPFooter latestUpdate={latestUpdate} />
    </div>
  )
}

/* ── Header ──────────────────────────────────────────────── */

function LPHeader() {
  const { progress, scrolled } = useScrollProgress()

  return (
    <header className={`lp-header${scrolled ? ' lp-header-scrolled' : ''}`}>
      <div className="lp-header-progress" style={{ width: `${progress}%` }} />
      <div className="lp-header-inner">
        <div className="lp-brand">

          {/* ── Accenture mark ── */}
          <div className="lp-logo-acc" aria-label="Accenture">
            <svg className="lp-acc-chevron" viewBox="0 0 22 20" fill="none" aria-hidden="true">
              <path d="M4 2 L17 10 L4 18" stroke="white" strokeWidth="3.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="lp-brand-name">Accenture</span>

          {/* ── Separator ── */}
          <div className="lp-brand-rule" aria-hidden="true" />

          {/* ── QBE mark ── */}
          <div className="lp-logo-qbe" aria-label="QBE Account">
            <span className="lp-qbe-text">QBE Account</span>
          </div>
          <span className="lp-brand-client">Technology</span>

        </div>
        <span className="lp-header-tagline">Communities of Practice</span>
      </div>
    </header>
  )
}

/* ── Hero ─────────────────────────────────────────────────── */

function StatCount({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)
  const count = useCountUp(value, 1400, run)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRun(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="lp-stat">
      <span className="lp-stat-num">{count}{suffix}</span>
      <span className="lp-stat-label">{label}</span>
    </div>
  )
}

function LPHero({ activeCount, totalMembers }: { activeCount: number; totalMembers: number }) {
  return (
    <section className="lp-hero">
      <div className="lp-hero-glow" aria-hidden="true" />
      <HeroTopology />

      <div className="lp-hero-inner">
        <div className="lp-hero-badge">
          <span className="lp-hero-badge-dot" />
          QBE Account Technology Program
        </div>

        <h1 className="lp-hero-title">
          Communities<br />of Practice
        </h1>

        <p className="lp-hero-desc">
          Fostering expertise, building certifications, and driving innovation
          across 14 technology disciplines at QBE Account — powered by Accenture.
        </p>

        <div className="lp-hero-stats">
          <StatCount value={14}          suffix=""  label="Communities" />
          <div className="lp-stat-sep" />
          <StatCount value={activeCount} suffix=""  label="Active" />
          <div className="lp-stat-sep" />
          <StatCount value={totalMembers} suffix="+" label="Members" />
          <div className="lp-stat-sep" />
          <StatCount value={2026}        suffix=""  label="Launched" />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="lp-scroll-cue" aria-hidden="true">
        <span className="lp-scroll-line" />
        <span className="lp-scroll-text">Scroll</span>
      </div>
    </section>
  )
}

/* ── Hero topology ───────────────────────────────────────── */

function HeroTopology() {
  return (
    <div className="lp-topo" aria-hidden="true">
      <svg className="lp-topo-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {TOPO_EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={TOPO_NODES[a].x} y1={TOPO_NODES[a].y}
            x2={TOPO_NODES[b].x} y2={TOPO_NODES[b].y}
            className="lp-topo-line"
          />
        ))}
      </svg>
      {TOPO_NODES.map((n, i) => (
        <div
          key={i}
          className="lp-topo-node"
          style={{
            left: `${n.x}%`,
            top:  `${n.y}%`,
            width:  n.r * 2,
            height: n.r * 2,
            ['--delay' as string]: `${(i * 0.35) % 3}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Vision & Mission ─────────────────────────────────────── */

function VisionMission() {
  const { ref, on } = useReveal()

  const pillars = [
    {
      title: 'DELIVER CONSISTENTLY',
      subtitle: 'Standardise how we work across every region so quality and consistency are a given, not a variable.',
      image: `${import.meta.env.BASE_URL}deliver-consistently.png`,
    },
    {
      title: 'INNOVATE MEANINGFULLY',
      subtitle: 'Drive innovation through AI and automation that generates real efficiencies.',
      image: `${import.meta.env.BASE_URL}innovate-meaningfully.png`,
    },
    {
      title: 'UPSKILL RELENTLESSLY',
      subtitle: 'Grow our talent through certifications, knowledge sessions, and cross-skilling.',
      image: `${import.meta.env.BASE_URL}upskill-relentlessly.png`,
    },
  ]

  return (
    <section ref={ref} className={`lp-vm${on ? ' lp-revealed' : ''}`}>
      <div className="lp-vm-inner">
        <div className="lp-vm-pillars">
          {pillars.map((pillar, i) => (
            <div key={i} className="lp-vm-pillar">
              <div className="lp-vm-pillar-image">
                <img src={pillar.image} alt={pillar.title} loading="lazy" />
              </div>
              <div className="lp-vm-pillar-content">
                <h3 className="lp-vm-pillar-title">{pillar.title}</h3>
                <p className="lp-vm-pillar-subtitle">{pillar.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



/* ── Sparkle particles ───────────────────────────────────── */

function CommSparkles() {
  const items = [
    { left: '4%',  top: '18%', s: 3, dur: '7s',  del: '0s'   },
    { left: '12%', top: '62%', s: 4, dur: '9s',  del: '1.2s' },
    { left: '22%', top: '35%', s: 2, dur: '6s',  del: '0.4s' },
    { left: '31%', top: '78%', s: 5, dur: '8s',  del: '2.1s' },
    { left: '40%', top: '12%', s: 3, dur: '10s', del: '0.8s' },
    { left: '48%', top: '55%', s: 4, dur: '7s',  del: '1.6s' },
    { left: '55%', top: '88%', s: 2, dur: '9s',  del: '0.2s' },
    { left: '63%', top: '28%', s: 5, dur: '6s',  del: '3.0s' },
    { left: '70%', top: '72%', s: 3, dur: '8s',  del: '1.4s' },
    { left: '78%', top: '42%', s: 4, dur: '7s',  del: '0.6s' },
    { left: '85%', top: '15%', s: 2, dur: '9s',  del: '2.5s' },
    { left: '92%', top: '65%', s: 5, dur: '6s',  del: '1.8s' },
    { left: '96%', top: '85%', s: 3, dur: '10s', del: '0.9s' },
    { left: '18%', top: '90%', s: 4, dur: '8s',  del: '3.5s' },
    { left: '58%', top: '6%',  s: 3, dur: '7s',  del: '2.8s' },
    { left: '88%', top: '30%', s: 2, dur: '9s',  del: '4.0s' },
  ]
  return (
    <div className="lp-sparkles" aria-hidden="true">
      {items.map((s, i) => (
        <div key={i} className="lp-sparkle"
          style={{ left: s.left, top: s.top, width: s.s, height: s.s,
            animationDuration: s.dur, animationDelay: s.del } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

/* ── CoP Card ─────────────────────────────────────────────── */

function CoPCard({ cop, index, onGo }: { cop: CoPCommunity; index: number; onGo: (r: string) => void }) {
  const isActive = cop.status === 'active'
  const initials = cop.lead
    ? cop.lead.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : ''

  return (
    <article
      className={`lp-cop${isActive ? ' lp-cop-active' : ' lp-cop-soon'}`}
      style={{ '--accent': cop.accentColor, '--d': `${index * 0.04}s` } as React.CSSProperties}
      onClick={() => isActive && onGo(cop.route)}
      role={isActive ? 'button' : 'article'}
      tabIndex={isActive ? 0 : undefined}
      onKeyDown={e => e.key === 'Enter' && isActive && onGo(cop.route)}
      aria-label={isActive ? `Open ${cop.name} CoP` : `${cop.name} — Coming Soon`}
    >
      <div className="lp-cop-bar" />

      <div className="lp-cop-body">
        {/* Icon + badge */}
        <div className="lp-cop-row">
          <div className="lp-cop-icon-wrap">
            <div className="lp-cop-icon">
              <img src={cop.icon} alt={cop.name} />
            </div>
          </div>
          {isActive
            ? <span className="lp-cop-badge lp-cop-live"><span className="lp-cop-pulse" />Live</span>
            : <span className="lp-cop-badge lp-cop-soon-b">Soon</span>
          }
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <h3 className="lp-cop-name" style={{ margin: 0 }}>{cop.name}</h3>
          <span className="lp-cop-category">{cop.category}</span>
        </div>
        <p className="lp-cop-desc">{cop.description}</p>

        {isActive && cop.highlights.length > 0 && (
          <ul className="lp-cop-hl">
            {cop.highlights.slice(0, 3).map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        )}
      </div>

      <div className="lp-cop-foot">
        {isActive && cop.lead ? (
          <div className="lp-cop-lead">
            <div className="lp-cop-avatar">{initials}</div>
            <span className="lp-cop-lead-name">{cop.lead.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        ) : <div />}

        {isActive ? (
          <button className="lp-cop-cta"
            onClick={e => { e.stopPropagation(); onGo(cop.route) }}>
            Explore <em className="lp-cop-arr">→</em>
          </button>
        ) : (
          <span className="lp-cop-indev">In Development</span>
        )}
      </div>
    </article>
  )
}

/* ── Footer ──────────────────────────────────────────────── */

function LPFooter({ latestUpdate }: { latestUpdate: string }) {
  return (
    <footer className="lp-footer">
      <div className="lp-footer-inner">
        <div className="lp-footer-left">
          <div className="lp-footer-logos">
            <div className="lp-logo-acc lp-logo-acc-sm" aria-label="Accenture">
              <svg className="lp-acc-chevron" viewBox="0 0 22 20" fill="none" aria-hidden="true">
                <path d="M4 2 L17 10 L4 18" stroke="white" strokeWidth="3.8"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="lp-footer-brand-name">Accenture</span>
            <div className="lp-brand-rule lp-brand-rule-sm" aria-hidden="true" />
            <div className="lp-logo-qbe lp-logo-qbe-sm" aria-label="QBE Account">
              <span className="lp-qbe-text">QBE Account</span>
            </div>
            <span className="lp-footer-brand-client">Technology</span>
          </div>
          <span className="lp-footer-desc">Communities of Practice Program</span>
        </div>
        <div className="lp-footer-right">
          <span className="lp-footer-ver">v1.0</span>
          {latestUpdate && <span className="lp-footer-date">Last updated: {latestUpdate}</span>}
        </div>
      </div>
    </footer>
  )
}
