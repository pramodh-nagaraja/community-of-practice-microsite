import { useState, useEffect, useRef } from 'react'
import { COMMUNITIES, type CoPCommunity } from './data/communities'
import './LandingPage.css'

type FilterTab = 'all' | 'active' | 'coming-soon'
type EthosTab  = 'values' | 'pillars'

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
    window.location.hash = route.startsWith('#/') ? route : route.replace('#/', '')
  }

  return (
    <div className={`lp-root${visible ? ' lp-visible' : ''}`}>
      <LPHeader />
      <LPHero activeCount={activeCount} totalMembers={totalMembers} />
      <VisionMission />
      <ProgramEthos />

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
          across 15 technology disciplines at QBE Account — powered by Accenture.
        </p>

        <div className="lp-hero-stats">
          <StatCount value={15}          suffix=""  label="Communities" />
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
  return (
    <section ref={ref} className={`lp-vm${on ? ' lp-revealed' : ''}`}>
      <div className="lp-vm-inner">
        <div className="lp-vm-col">
          <span className="lp-vm-label lp-vm-vision">Vision</span>
          <blockquote className="lp-vm-quote">
            "Engineering a smarter, more resilient insurance technology platform — together."
          </blockquote>
          <p className="lp-vm-body">
            To be the definitive internal community where infrastructure, application, and automation professionals collaborate, innovate, and continuously raise the bar. We envision a future where our systems are robust and secure, our delivery is disciplined, and intelligent automation is thoughtfully embedded — not as an end in itself, but as a tool that amplifies what our people can achieve for the client.
          </p>
        </div>
        <div className="lp-vm-sep" aria-hidden="true" />
        <div className="lp-vm-col">
          <span className="lp-vm-label lp-vm-mission">Mission</span>
          <blockquote className="lp-vm-quote">
            "Connect, grow, automate thoughtfully, and deliver with purpose."
          </blockquote>
          <p className="lp-vm-body">
            Our mission is to unite infrastructure, application, and automation engineers across the account to share knowledge, co-create solutions, and continuously improve how we build and operate. We embrace AI and automation as practical enablers — helping us reduce toil, improve reliability, and free our people to focus on higher-value work. Above all, we invest in the craft, curiosity, and growth of every member — so that together we deliver measurable, lasting value to our insurance client.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── Program Ethos (tabbed) ───────────────────────────────── */

const VALUES = [
  { letter: 'C', color: '#A100FF', bg: '#f5e6ff', name: 'Collaboration first',      desc: 'The best outcomes emerge when expertise is shared openly — across infra, app, and automation disciplines alike.' },
  { letter: 'E', color: '#2563eb', bg: '#dbeafe', name: 'Engineering excellence',   desc: 'We hold a high bar — clean design, robust infrastructure, and disciplined delivery. Automation extends that standard; it doesn\'t replace it.' },
  { letter: 'H', color: '#0d9488', bg: '#ccfbf1', name: 'Human-led, tech-enabled', desc: 'AI and automation are tools in skilled hands. Our people remain at the centre of every decision, design, and outcome.' },
  { letter: 'L', color: '#d97706', bg: '#fef3c7', name: 'Continuous learning',      desc: 'We invest in one another\'s growth — through mentoring, upskilling, and staying ahead of an evolving technology landscape.' },
  { letter: 'T', color: '#dc2626', bg: '#fee2e2', name: 'Trust & transparency',     desc: 'We communicate openly, share lessons from failures, and build a community where honest dialogue — about tools, tech, and process — is always welcome.' },
  { letter: 'R', color: '#16a34a', bg: '#dcfce7', name: 'Resilience & reliability', desc: 'We design systems — and teams — that hold under pressure. For our community, and for the client who depends on us every day.' },
]

const PILLARS = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v4l-4-4H9a2 2 0 0 1-2-2v-1"/><path d="M15 3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v4l4-4h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/></svg>,   title: 'Peer-led knowledge sharing',    desc: 'Regular forums, retrospectives, and guilds where every voice contributes — whether you\'re deep in infra, shipping code, or building automations.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,                                                                                                                                                                                                                                                              title: 'Client-centric thinking',       desc: 'Every technical and automation decision is measured by the impact it has on our insurance client\'s operations, compliance, and experience.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z"/><path d="M4 20a8 8 0 0 1 8-8"/><path d="M16 14l2 2 4-4"/></svg>,                                                                                                                                                                                                                   title: 'Automation with intent',        desc: 'We automate to eliminate toil and reduce risk — not to automate for its own sake. Every pipeline and AI integration must earn its place.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,                                                                                                                                                                                                                                                            title: 'Secure & compliant by design',  desc: 'Infrastructure, applications, and automated workflows all built with regulatory rigour and zero-compromise on security.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><line x1="7" y1="11.5" x2="17" y2="6.5"/><line x1="7" y1="12.5" x2="17" y2="17.5"/></svg>,                                                                                                                                                                      title: 'Breaking silos',               desc: 'Infra, app, and automation engineers working as one unified community — sharing patterns, tooling, and accountability across the stack.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,                                                                                                                                                                                                                                                                  title: 'Raising the baseline',          desc: 'We lift the floor for everyone — sharing reusable frameworks, automation accelerators, and best practices that benefit the whole team.' },
]

function ProgramEthos() {
  const [tab, setTab] = useState<EthosTab>('values')
  const { ref, on }   = useReveal(0.08)

  return (
    <section ref={ref} className={`lp-ethos${on ? ' lp-revealed' : ''}`}>
      <div className="lp-ethos-inner">
        <div className="lp-ethos-tabs">
          <button className={`lp-ethos-tab${tab === 'values'  ? ' lp-ethos-on' : ''}`} onClick={() => setTab('values')}>Our Values</button>
          <button className={`lp-ethos-tab${tab === 'pillars' ? ' lp-ethos-on' : ''}`} onClick={() => setTab('pillars')}>What We Stand For</button>
        </div>

        {tab === 'values' && (
          <div className="lp-ethos-grid lp-ethos-anim">
            {VALUES.map((v, i) => (
              <div key={v.letter} className="lp-ev"
                style={{ '--vc': v.color, '--vbg': v.bg, '--d': `${i * 0.05}s` } as React.CSSProperties}>
                <div className="lp-ev-letter">{v.letter}</div>
                <div className="lp-ev-text">
                  <h3 className="lp-ev-name">{v.name}</h3>
                  <p className="lp-ev-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'pillars' && (
          <div className="lp-ethos-grid lp-ethos-anim">
            {PILLARS.map((p, i) => (
              <div key={p.title} className="lp-ep"
                style={{ '--d': `${i * 0.05}s` } as React.CSSProperties}>
                <div className="lp-ep-icon">{p.icon}</div>
                <div className="lp-ep-text">
                  <h3 className="lp-ep-name">{p.title}</h3>
                  <p className="lp-ep-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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

        <h3 className="lp-cop-name">{cop.name}</h3>
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

      {isActive && cop.memberCount !== null && (
        <div className="lp-cop-chip">{cop.memberCount} members</div>
      )}
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
