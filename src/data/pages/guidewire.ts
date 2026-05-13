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

export const Guidewire_DATA: CoPPageData = {
  id: 'guidewire',
  name: 'Guidewire',
  tagline: 'Enabling Guidewire PolicyCenter, BillingCenter, and ClaimCenter expertise at QBE.',
  description: 'Enabling Guidewire PolicyCenter, BillingCenter, and ClaimCenter expertise across the QBE delivery team.',
  accentColor: '#dc2626',
  icon: `${BASE}Guidewire.png`,

  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,

  mission: 'To develop deep Guidewire platform expertise across PolicyCenter, BillingCenter, and ClaimCenter, enabling high-quality insurance system delivery at QBE.',
  vision: 'To be the authoritative knowledge hub for Guidewire at QBE Account, accelerating delivery, reducing defects, and enabling continuous improvement across all Guidewire suites.',
  values: 'Technical depth, insurance domain understanding, and a commitment to quality Guidewire delivery that serves QBE\'s business transformation goals.',

  certStages: [
    { num: 1, title: 'Trained',      subtitle: 'Foundation Guidewire training completed',    count: 8, totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational Guidewire platform training and configuration basics.' },
    { num: 2, title: 'Intermediate', subtitle: 'Intermediate Guidewire certification in progress', count: 5, totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members progressing through intermediate Guidewire configuration, rules, and workflow development.' },
    { num: 3, title: 'Certified',    subtitle: 'Full Guidewire certification achieved',      count: 2, totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members who hold formal Guidewire certifications — our platform champions and go-to experts.' },
  ],

  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Guidewire Subject Matter Experts driving platform excellence at QBE.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'Guidewire Cloud Migration Update',
      desc: 'Session covering Guidewire Cloud adoption roadmap, migration strategies, and lessons learned from QBE implementations.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#dc2626',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'PolicyCenter Configuration Workshop',
      desc: 'Hands-on workshop on PolicyCenter business rules, product model design, and certification preparation.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#dc2626',
    },
  ],

  members: MEMBERS,

  celebrateLearning: {
    title: 'Guidewire Learning Achievers',
    desc: 'recognising outstanding commitment to Guidewire platform mastery and certification excellence.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  leadership: [
    { name: 'Madhvan Gopalan', initials: 'MG', photo: `${BASE}madhvan.jpg`, badge: 'Executive Sponsor', role: 'Executive Sponsor and Global CAL for QBE', email: 'madhvan.gopalan@accenture.com', badgeStyle: 'sponsor' },
    { name: 'Name 1', initials: 'N1', badge: 'Global Lead', role: 'Global Lead — To Be Confirmed', email: 'tbd@accenture.com', badgeStyle: 'global' },
    { name: 'Name 2', initials: 'N2', badge: 'CoP Lead',    role: 'CoP Lead — To Be Confirmed',    email: 'tbd@accenture.com', badgeStyle: 'cop'    },
  ],

  joinEmail: 'madhvan.gopalan@accenture.com',
  joinInterests: ['General', 'PolicyCenter', 'BillingCenter', 'ClaimCenter', 'Guidewire Cloud', 'Certifications'],
}
