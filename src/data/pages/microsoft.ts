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

export const Microsoft_DATA: CoPPageData = {
  id: 'microsoft',
  name: 'Microsoft',
  tagline: 'Championing Azure, M365, Power Platform, and .NET technologies across QBE Account.',
  description: 'Championing Azure, M365, Power Platform, and .NET technologies within the QBE ecosystem.',
  accentColor: '#2563eb',
  icon: `${BASE}Microsoft.png`,

  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,

  mission: 'To champion Microsoft technology adoption at QBE Account, building expertise across Azure, M365, Power Platform, and .NET to accelerate cloud-first delivery.',
  vision: 'To position QBE Account as a Microsoft technology leader within Accenture, with certified professionals driving cloud adoption and digital transformation.',
  values: 'Cloud-first thinking, collaboration through M365, automation through Power Platform, and continuous advancement on the Microsoft learning path.',

  certStages: [
    { num: 1, title: 'Trained',      subtitle: 'Microsoft foundation training completed',    count: 8, totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational Microsoft technology training across Azure and M365.' },
    { num: 2, title: 'Intermediate', subtitle: 'Intermediate Microsoft certification in progress', count: 5, totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members working towards Microsoft Associate-level certifications in Azure, Power Platform, or M365.' },
    { num: 3, title: 'Certified',    subtitle: 'Full Microsoft certification achieved',      count: 2, totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding Microsoft certifications — our cloud and platform champions at QBE.' },
  ],

  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Microsoft technology Subject Matter Experts at QBE Account.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'Azure Architecture Review',
      desc: 'Review of QBE\'s Azure estate, architecture patterns, Well-Architected Framework alignment, and upcoming cloud projects.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#2563eb',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'Power Platform Community Build Sprint',
      desc: 'Collaborative session to build Power Apps and Power Automate solutions that solve real QBE Account operational challenges.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#2563eb',
    },
  ],

  members: MEMBERS,

  celebrateLearning: {
    title: 'Microsoft Learning Achievers',
    desc: 'recognising outstanding commitment to Microsoft technology certification and cloud excellence.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  leadership: [
    { name: 'Madhvan Gopalan', initials: 'MG', photo: `${BASE}madhvan.jpg`, badge: 'Executive Sponsor', role: 'Executive Sponsor and Global CAL for QBE', email: 'madhvan.gopalan@accenture.com', badgeStyle: 'sponsor' },
    { name: 'Name 1', initials: 'N1', badge: 'Global Lead', role: 'Global Lead — To Be Confirmed', email: 'tbd@accenture.com', badgeStyle: 'global' },
    { name: 'Name 2', initials: 'N2', badge: 'CoP Lead',    role: 'CoP Lead — To Be Confirmed',    email: 'tbd@accenture.com', badgeStyle: 'cop'    },
  ],

  joinEmail: 'madhvan.gopalan@accenture.com',
  joinInterests: ['General', 'Azure', 'M365', 'Power Platform', '.NET / C#', 'Certifications'],
}
