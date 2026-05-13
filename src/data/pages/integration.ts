import type { CoPPageData } from '../types'

const BASE = import.meta.env.BASE_URL

const MEMBERS = [
  { name: 'Name 1',  initials: 'N1', levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d' },
  { name: 'Name 2',  initials: 'N2', levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d' },
  { name: 'Name 3',  initials: 'N3', levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d' },
  { name: 'Name 4',  initials: 'N4', levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d' },
  { name: 'Name 5',  initials: 'N5', levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d' },
  { name: 'Name 6',  initials: 'N6', levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d' },
  { name: 'Name 7',  initials: 'N7', levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d' },
  { name: 'Name 8',  initials: 'N8', levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d' },
  { name: 'Name 9',  initials: 'N9', levelLabel: 'Intermediate', levelColor: '#2563eb', levelBg: '#dbeafe', levelText: '#1e3a8a' },
  { name: 'Name 10', initials: 'NA', levelLabel: 'Intermediate', levelColor: '#2563eb', levelBg: '#dbeafe', levelText: '#1e3a8a' },
  { name: 'Name 11', initials: 'NB', levelLabel: 'Intermediate', levelColor: '#2563eb', levelBg: '#dbeafe', levelText: '#1e3a8a' },
  { name: 'Name 12', initials: 'NC', levelLabel: 'Intermediate', levelColor: '#2563eb', levelBg: '#dbeafe', levelText: '#1e3a8a' },
  { name: 'Name 13', initials: 'ND', levelLabel: 'Intermediate', levelColor: '#2563eb', levelBg: '#dbeafe', levelText: '#1e3a8a' },
  { name: 'Name 14', initials: 'NE', levelLabel: 'Certified',    levelColor: '#A100FF', levelBg: '#F5E6FF', levelText: '#5700AB' },
  { name: 'Name 15', initials: 'NF', levelLabel: 'Certified',    levelColor: '#A100FF', levelBg: '#F5E6FF', levelText: '#5700AB' },
]

export const Integration_DATA: CoPPageData = {
  id: 'integration',
  name: 'Integration',
  tagline: 'Connecting systems and services through API-led architecture and integration best practices.',
  description: 'Connecting systems and services through API-led architecture, ESB, and integration patterns.',
  accentColor: '#0d9488',
  icon: `${BASE}Integration.png`,

  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,

  mission: 'To establish API-led integration best practices across QBE Account, fostering expertise in ESB, middleware, and modern integration patterns that enable seamless connectivity.',
  vision: 'To create a seamlessly connected QBE technology ecosystem through robust, scalable, and standards-based integration architecture that every team can rely on.',
  values: 'Design consistency, reusability, security-first integration patterns, and a culture of documentation and shared ownership across all integration touchpoints.',

  certStages: [
    { num: 1, title: 'Trained',      subtitle: 'Foundation integration training completed',    count: 8, totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational training in API design and integration patterns.' },
    { num: 2, title: 'Intermediate', subtitle: 'Intermediate integration certification in progress', count: 5, totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members deepening expertise in ESB platforms, MuleSoft, and event-driven architecture.' },
    { num: 3, title: 'Certified',    subtitle: 'Full integration certification achieved',      count: 2, totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding formal integration platform certifications — our community champions.' },
  ],

  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Integration Subject Matter Experts driving API-led excellence across QBE.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'API Design Review & Patterns Workshop',
      desc: 'Deep dive into REST API design principles, versioning strategies, and integration patterns used across QBE Account.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#0d9488',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'Integration Platform Deep Dive',
      desc: 'Hands-on session covering integration platform capabilities, tooling, and certification preparation pathways.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#0d9488',
    },
  ],

  members: MEMBERS,

  celebrateLearning: {
    title: 'Integration Learning Achievers',
    desc: 'recognising outstanding commitment to integration platform expertise and certification excellence.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  leadership: [
    { name: 'Madhvan Gopalan', initials: 'MG', photo: `${BASE}madhvan.jpg`, badge: 'Executive Sponsor', role: 'Executive Sponsor and Global CAL for QBE', email: 'madhvan.gopalan@accenture.com', badgeStyle: 'sponsor' },
    { name: 'Name 1', initials: 'N1', badge: 'Global Lead', role: 'Global Lead — To Be Confirmed', email: 'tbd@accenture.com', badgeStyle: 'global' },
    { name: 'Name 2', initials: 'N2', badge: 'CoP Lead',    role: 'CoP Lead — To Be Confirmed',    email: 'tbd@accenture.com', badgeStyle: 'cop'    },
  ],

  joinEmail: 'madhvan.gopalan@accenture.com',
  joinInterests: ['General', 'API Design', 'ESB / MuleSoft', 'Azure Integration', 'Event Streaming', 'Certifications'],
}
