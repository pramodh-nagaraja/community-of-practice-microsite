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

export const Middleware_DATA: CoPPageData = {
  id: 'middleware',
  name: 'Middleware',
  tagline: 'Driving excellence in messaging, caching, and middleware platforms powering QBE\'s service backbone.',
  description: 'Driving expertise in messaging, caching, and middleware platforms that power QBE\'s service backbone.',
  accentColor: '#b45309',
  icon: `${BASE}Middleware.png`,

  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,

  mission: 'To drive excellence in messaging, caching, and middleware platforms that underpin QBE Account\'s service backbone and integration infrastructure.',
  vision: 'To ensure QBE\'s middleware layer is resilient, scalable, and well-understood by every team member who depends on it for reliable service delivery.',
  values: 'Reliability engineering, deep platform expertise, operational excellence, and a commitment to keeping the backbone of QBE\'s systems healthy and performant.',

  certStages: [
    { num: 1, title: 'Trained',      subtitle: 'Middleware fundamentals training completed',    count: 8, totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational training in middleware platforms, messaging concepts, and caching principles.' },
    { num: 2, title: 'Intermediate', subtitle: 'Intermediate middleware certification in progress', count: 5, totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members deepening expertise in Kafka, MQ, API Gateway, and middleware operational management.' },
    { num: 3, title: 'Certified',    subtitle: 'Full middleware certification achieved',      count: 2, totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding formal middleware platform certifications — our platform operations champions.' },
  ],

  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Middleware Subject Matter Experts ensuring platform reliability and performance at QBE.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'Middleware Platform Health Review',
      desc: 'Review of QBE\'s messaging and caching platform health, capacity trends, and upcoming maintenance windows and upgrade plans.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#b45309',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'Caching & Messaging Patterns Workshop',
      desc: 'Hands-on session on caching strategies, message queue patterns, dead-letter handling, and event-driven architecture at QBE.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#b45309',
    },
  ],

  members: MEMBERS,

  celebrateLearning: {
    title: 'Middleware Learning Achievers',
    desc: 'recognising outstanding commitment to middleware platform expertise and operational certification excellence.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  leadership: [
    { name: 'Madhvan Gopalan', initials: 'MG', photo: `${BASE}madhvan.jpg`, badge: 'Executive Sponsor', role: 'Executive Sponsor and Global CAL for QBE', email: 'madhvan.gopalan@accenture.com', badgeStyle: 'sponsor' },
    { name: 'Name 1', initials: 'N1', badge: 'Global Lead', role: 'Global Lead — To Be Confirmed', email: 'tbd@accenture.com', badgeStyle: 'global' },
    { name: 'Name 2', initials: 'N2', badge: 'CoP Lead',    role: 'CoP Lead — To Be Confirmed',    email: 'tbd@accenture.com', badgeStyle: 'cop'    },
  ],

  joinEmail: 'madhvan.gopalan@accenture.com',
  joinInterests: ['General', 'Kafka / Event Streaming', 'MQ / Messaging', 'API Gateway', 'Caching', 'Certifications'],
}
