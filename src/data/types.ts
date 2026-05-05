// ═══════════════════════════════════════════════════════════════
//  Shared data interfaces for the CoP page template (CoPPage.tsx)
//  Each active community's data file must export an object that
//  satisfies CoPPageData.
// ═══════════════════════════════════════════════════════════════

export interface CoPLeader {
  name: string
  initials: string
  photo?: string          // path served from public/ e.g. '/Pramodh.jpg'
  badge: string           // e.g. 'CoP Lead', 'Executive Sponsor'
  role: string
  email: string
  badgeStyle: 'sponsor' | 'global' | 'cop'
}

export interface CoPMember {
  name: string
  initials: string
  levelLabel: string      // e.g. 'CCNA Eligible'
  levelColor: string      // hex accent for avatar bg
  levelBg: string         // hex for badge background
  levelText: string       // hex for badge text
}

export interface CoPEvent {
  day: string             // e.g. '11'
  month: string           // e.g. 'May 2026'
  title: string
  desc: string
  type: string            // e.g. 'Boot Camp', 'Webinar'
  time: string            // e.g. 'All Day · 2 Days'
  accentColor: string     // hex for the date block
}

export interface CoPResourceItem {
  name: string
  type: string            // e.g. 'Guide', 'Training', 'Reference'
  url?: string
}

export interface CoPResourceStream {
  title: string
  color: string
  bg: string
  border: string
  tagColor: string
  tagBg: string
  items: CoPResourceItem[]
}

export interface CertStage {
  num: number
  title: string
  subtitle: string
  count: number
  totalCohort: number
  color: string
  bg: string
  border: string
  desc: string
  progressRate?: string   // e.g. '50% progression'
}

export interface CoPPageData {
  id: string
  name: string
  tagline: string
  description: string
  accentColor: string
  icon: string            // path from public/ e.g. '/Cloud.png'

  // Hero stats
  memberCount: number
  certCount?: number
  sessionsHeld?: number
  launchYear?: number

  // About section (3 pillars)
  mission: string
  vision: string
  values: string

  // Optional sections — rendered only when data is present
  certStages?: CertStage[]
  spotlight?: { title: string; desc: string; names: string[] }
  events?: CoPEvent[]
  resources?: CoPResourceStream[]
  members?: CoPMember[]

  // Always rendered
  leadership: CoPLeader[]
  joinEmail: string
  joinInterests?: string[]
}
