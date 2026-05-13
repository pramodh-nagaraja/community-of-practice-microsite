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

export const Insurance_DATA: CoPPageData = {
  id: 'insurance',
  name: 'Insurance',
  tagline: 'Building insurance domain knowledge across products, regulations, and industry technology.',
  description: 'Building domain knowledge in insurance products, regulations, and industry technology trends.',
  accentColor: '#0369a1',
  icon: `${BASE}Insurance.png`,

  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,

  mission: 'To build comprehensive insurance domain knowledge across the QBE Account team, covering products, regulations, and industry-specific technology to enable better business conversations.',
  vision: 'To make every technology professional on the QBE Account equally comfortable with insurance concepts, bridging the gap between technology delivery and business outcomes.',
  values: 'Domain curiosity, continuous upskilling, and bridging the gap between technology delivery and insurance business outcomes at QBE.',

  certStages: [
    { num: 1, title: 'Trained',      subtitle: 'Insurance domain foundation completed',    count: 8, totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational insurance domain training covering core products and principles.' },
    { num: 2, title: 'Intermediate', subtitle: 'Intermediate insurance knowledge in progress', count: 5, totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members deepening expertise in insurance regulations, underwriting, and claims lifecycle.' },
    { num: 3, title: 'Certified',    subtitle: 'Insurance domain certification achieved',  count: 2, totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding recognised insurance domain certifications — our community knowledge anchors.' },
  ],

  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Insurance domain Subject Matter Experts driving knowledge at QBE Account.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'Insurance Products & Regulatory Overview',
      desc: 'Overview of QBE\'s core insurance product lines, regulatory frameworks, and recent industry changes affecting technology delivery.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#0369a1',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'QBE Business Context & Tech Alignment',
      desc: 'Workshop connecting QBE\'s business strategy, insurance domain context, and how technology teams can deliver greater business value.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#0369a1',
    },
  ],

  members: MEMBERS,

  celebrateLearning: {
    title: 'Insurance Learning Achievers',
    desc: 'recognising outstanding commitment to insurance domain knowledge and professional development.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  leadership: [
    { name: 'Madhvan Gopalan', initials: 'MG', photo: `${BASE}madhvan.jpg`, badge: 'Executive Sponsor', role: 'Executive Sponsor and Global CAL for QBE', email: 'madhvan.gopalan@accenture.com', badgeStyle: 'sponsor' },
    { name: 'Name 1', initials: 'N1', badge: 'Global Lead', role: 'Global Lead — To Be Confirmed', email: 'tbd@accenture.com', badgeStyle: 'global' },
    { name: 'Name 2', initials: 'N2', badge: 'CoP Lead',    role: 'CoP Lead — To Be Confirmed',    email: 'tbd@accenture.com', badgeStyle: 'cop'    },
  ],

  joinEmail: 'madhvan.gopalan@accenture.com',
  joinInterests: ['General', 'Insurance Products', 'Regulations', 'Underwriting', 'Claims', 'Risk Management'],
}
