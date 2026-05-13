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

export const DataAi_DATA: CoPPageData = {
  id: 'data-ai',
  name: 'Data & AI',
  tagline: 'Harnessing data engineering, analytics, and AI to power QBE\'s decisions and innovation.',
  description: 'Harnessing data engineering, analytics, and artificial intelligence to power QBE\'s decisions.',
  accentColor: '#7c3aed',
  icon: `${BASE}Data_and_AI.png`,

  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,

  mission: 'To harness data engineering, advanced analytics, and artificial intelligence to power QBE\'s decision-making, product innovation, and operational efficiency.',
  vision: 'To build a data-driven QBE Account where AI and analytics are embedded in every major business and technology decision, enabling smarter and faster outcomes.',
  values: 'Data quality, responsible AI, scalable engineering, and a culture of experimentation and evidence-based decision-making across QBE Account.',

  certStages: [
    { num: 1, title: 'Trained',      subtitle: 'Data & AI foundation training completed',    count: 8, totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational training in data concepts, analytics, and AI fundamentals.' },
    { num: 2, title: 'Intermediate', subtitle: 'Intermediate data / ML certification in progress', count: 5, totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members deepening expertise in data pipelines, ML model development, and cloud analytics platforms.' },
    { num: 3, title: 'Certified',    subtitle: 'Full data / AI certification achieved',      count: 2, totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding formal data or AI certifications — our analytics and machine learning champions.' },
  ],

  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Data & AI Subject Matter Experts driving intelligence and analytics at QBE.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'AI / ML Use Case Showcase',
      desc: 'Members present real AI and machine learning use cases from QBE projects — showcasing outcomes, lessons learned, and responsible AI practices.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#7c3aed',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'Data Platform & Pipeline Architecture',
      desc: 'Workshop on QBE\'s data platform architecture, pipeline design patterns, data quality frameworks, and modern lakehouse approaches.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#7c3aed',
    },
  ],

  members: MEMBERS,

  celebrateLearning: {
    title: 'Data & AI Learning Achievers',
    desc: 'recognising outstanding commitment to data engineering, analytics, and AI certification excellence.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  leadership: [
    { name: 'Madhvan Gopalan', initials: 'MG', photo: `${BASE}madhvan.jpg`, badge: 'Executive Sponsor', role: 'Executive Sponsor and Global CAL for QBE', email: 'madhvan.gopalan@accenture.com', badgeStyle: 'sponsor' },
    { name: 'Name 1', initials: 'N1', badge: 'Global Lead', role: 'Global Lead — To Be Confirmed', email: 'tbd@accenture.com', badgeStyle: 'global' },
    { name: 'Name 2', initials: 'N2', badge: 'CoP Lead',    role: 'CoP Lead — To Be Confirmed',    email: 'tbd@accenture.com', badgeStyle: 'cop'    },
  ],

  joinEmail: 'madhvan.gopalan@accenture.com',
  joinInterests: ['General', 'Data Engineering', 'Analytics', 'Machine Learning', 'GenAI', 'Certifications'],
}
