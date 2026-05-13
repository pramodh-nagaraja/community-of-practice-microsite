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

export const Testing_DATA: CoPPageData = {
  id: 'testing',
  name: 'Testing',
  tagline: 'Elevating quality engineering, test automation, and QA strategies at QBE.',
  description: 'Elevating quality engineering, test automation frameworks, and QA strategies at QBE.',
  accentColor: '#16a34a',
  icon: `${BASE}Testing.png`,

  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,

  mission: 'To elevate quality engineering standards across QBE Account through test automation frameworks, shift-left practices, and a quality-first delivery culture.',
  vision: 'To embed quality engineering as a core discipline at QBE Account, ensuring every delivery meets the highest reliability and performance standards expected by the business.',
  values: 'Shift-left quality, automation first, zero-defect mindset, and a commitment to continuous improvement in testing practices that protect QBE\'s systems.',

  certStages: [
    { num: 1, title: 'Trained',      subtitle: 'Quality engineering foundation completed',    count: 8, totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational quality engineering training, covering test strategy and manual techniques.' },
    { num: 2, title: 'Intermediate', subtitle: 'Test automation certification in progress', count: 5, totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members building automation framework expertise across API, UI, and performance testing disciplines.' },
    { num: 3, title: 'Certified',    subtitle: 'Full QA / ISTQB certification achieved', count: 2, totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding formal testing certifications (ISTQB, Selenium, etc.) — our quality champions.' },
  ],

  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Quality Engineering Subject Matter Experts driving testing excellence at QBE.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'Test Automation Framework Review',
      desc: 'Review of QBE Account\'s test automation stack, framework patterns, coverage metrics, and opportunities to shift testing left.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#16a34a',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'Performance Testing Best Practices',
      desc: 'Hands-on workshop on performance testing strategy, load testing tooling, and how to integrate performance gates in CI/CD pipelines.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#16a34a',
    },
  ],

  members: MEMBERS,

  celebrateLearning: {
    title: 'Testing Learning Achievers',
    desc: 'recognising outstanding commitment to quality engineering certification and test automation mastery.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  leadership: [
    { name: 'Madhvan Gopalan', initials: 'MG', photo: `${BASE}madhvan.jpg`, badge: 'Executive Sponsor', role: 'Executive Sponsor and Global CAL for QBE', email: 'madhvan.gopalan@accenture.com', badgeStyle: 'sponsor' },
    { name: 'Name 1', initials: 'N1', badge: 'Global Lead', role: 'Global Lead — To Be Confirmed', email: 'tbd@accenture.com', badgeStyle: 'global' },
    { name: 'Name 2', initials: 'N2', badge: 'CoP Lead',    role: 'CoP Lead — To Be Confirmed',    email: 'tbd@accenture.com', badgeStyle: 'cop'    },
  ],

  joinEmail: 'madhvan.gopalan@accenture.com',
  joinInterests: ['General', 'Test Automation', 'Performance Testing', 'API Testing', 'Mobile Testing', 'Certifications'],
}
