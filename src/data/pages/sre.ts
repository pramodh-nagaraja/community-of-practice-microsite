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

export const Sre_DATA: CoPPageData = {
  id: 'sre',
  name: 'SRE / Automation',
  tagline: 'Embedding SRE principles, DevOps culture, and intelligent automation into QBE\'s delivery lifecycle.',
  description: 'Embedding site reliability engineering, DevOps, and intelligent automation into QBE\'s delivery lifecycle.',
  accentColor: '#0e7490',
  icon: `${BASE}SRE_Automation.png`,

  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,

  mission: 'To embed site reliability engineering principles, DevOps culture, and intelligent automation across QBE Account\'s delivery lifecycle for safer, faster, and more reliable releases.',
  vision: 'To build a QBE Account delivery engine that is self-healing, highly observable, and continuously improving through SRE practices, automation, and a blameless culture.',
  values: 'Reliability by design, automate everything, learn from incidents, and measure outcomes — not activity. Every failure is a learning opportunity.',

  certStages: [
    { num: 1, title: 'Trained',      subtitle: 'SRE & DevOps fundamentals completed',    count: 8, totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational training in SRE principles, DevOps culture, and CI/CD concepts.' },
    { num: 2, title: 'Intermediate', subtitle: 'Intermediate SRE / DevOps certification in progress', count: 5, totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members deepening expertise in SLO/SLI design, observability, pipeline engineering, and automation tooling.' },
    { num: 3, title: 'Certified',    subtitle: 'Full SRE / DevOps certification achieved',      count: 2, totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding formal SRE or DevOps certifications — driving engineering excellence at QBE.' },
  ],

  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active SRE / Automation Subject Matter Experts driving reliability engineering at QBE.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'SLO / SLI Design Workshop',
      desc: 'Hands-on workshop on defining meaningful Service Level Objectives and Indicators for QBE\'s critical systems and user journeys.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#0e7490',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'Automation & Pipeline Enablement',
      desc: 'Session covering CI/CD pipeline patterns, automation tooling, infrastructure-as-code best practices, and shift-left security.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#0e7490',
    },
  ],

  members: MEMBERS,

  celebrateLearning: {
    title: 'SRE / Automation Learning Achievers',
    desc: 'recognising outstanding commitment to site reliability engineering and DevOps certification excellence.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  leadership: [
    { name: 'Madhvan Gopalan', initials: 'MG', photo: `${BASE}madhvan.jpg`, badge: 'Executive Sponsor', role: 'Executive Sponsor and Global CAL for QBE', email: 'madhvan.gopalan@accenture.com', badgeStyle: 'sponsor' },
    { name: 'Name 1', initials: 'N1', badge: 'Global Lead', role: 'Global Lead — To Be Confirmed', email: 'tbd@accenture.com', badgeStyle: 'global' },
    { name: 'Name 2', initials: 'N2', badge: 'CoP Lead',    role: 'CoP Lead — To Be Confirmed',    email: 'tbd@accenture.com', badgeStyle: 'cop'    },
  ],

  joinEmail: 'madhvan.gopalan@accenture.com',
  joinInterests: ['General', 'SRE Practices', 'DevOps / CI-CD', 'Infrastructure as Code', 'Observability', 'Certifications'],
}
