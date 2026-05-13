import type { CoPPageData } from '../types'

const BASE = import.meta.env.BASE_URL

const STAGES = [
  { num: 1, title: 'Trained',      subtitle: 'Foundation training completed',       count: 8, totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundation-level Workday training across HCM and Finance modules.' },
  { num: 2, title: 'Intermediate', subtitle: 'Intermediate certification in progress', count: 5, totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members deepening their Workday skills across core business processes and integration patterns.' },
  { num: 3, title: 'Certified',    subtitle: 'Full Workday certification achieved',  count: 2, totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members who have achieved formal Workday certification — domain champions for the community.' },
] as const

const MEMBERS_BASE = [
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

export const Workday_DATA: CoPPageData = {
  id: 'workday',
  name: 'Workday',
  tagline: 'Driving Workday excellence across HCM, Finance, and integrations at QBE.',
  description: 'Driving Workday HCM and Finance implementations, integrations, and best practices at QBE.',
  accentColor: '#ea580c',
  icon: `${BASE}Workday.png`,

  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,

  mission: 'To build deep Workday HCM and Finance expertise within the QBE Account delivery team through structured learning, certifications, and knowledge sharing.',
  vision: 'To be the go-to centre of excellence for all Workday implementations and configurations across QBE, driving consistent delivery quality and innovation.',
  values: 'Continuous learning, collaborative problem-solving, and a shared commitment to delivering quality Workday solutions that meet QBE\'s evolving business needs.',

  certStages: STAGES.map(s => ({ ...s })),

  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Workday Subject Matter Experts driving knowledge and implementation excellence.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'Workday Feature Release Review',
      desc: 'Walkthrough of the latest Workday release features with impact analysis for QBE HCM and Finance modules.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#ea580c',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'Workday Certification Prep Workshop',
      desc: 'Hands-on session covering Workday certification pathways, study strategies, and exam readiness guidance.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#ea580c',
    },
  ],

  members: MEMBERS_BASE,

  celebrateLearning: {
    title: 'Workday Learning Achievers',
    desc: 'recognising outstanding commitment to Workday professional development and certification excellence.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  leadership: [
    {
      name: 'Madhvan Gopalan',
      initials: 'MG',
      photo: `${BASE}madhvan.jpg`,
      badge: 'Executive Sponsor',
      role: 'Executive Sponsor and Global CAL for QBE',
      email: 'madhvan.gopalan@accenture.com',
      badgeStyle: 'sponsor',
    },
    {
      name: 'Name 1',
      initials: 'N1',
      badge: 'Global Lead',
      role: 'Global Lead — To Be Confirmed',
      email: 'tbd@accenture.com',
      badgeStyle: 'global',
    },
    {
      name: 'Name 2',
      initials: 'N2',
      badge: 'CoP Lead',
      role: 'CoP Lead — To Be Confirmed',
      email: 'tbd@accenture.com',
      badgeStyle: 'cop',
    },
  ],

  joinEmail: 'madhvan.gopalan@accenture.com',
  joinInterests: ['General', 'HCM', 'Finance', 'Integrations', 'Reporting & Analytics', 'Certifications'],
}
