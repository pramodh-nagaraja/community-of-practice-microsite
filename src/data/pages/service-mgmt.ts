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

export const ServiceMgmt_DATA: CoPPageData = {
  id: 'service-mgmt',
  name: 'Service Management',
  tagline: 'Strengthening ITSM practices, ServiceNow capabilities, and ITIL adoption at QBE.',
  description: 'Strengthening ITSM practices, ServiceNow capabilities, and ITIL adoption across QBE operations.',
  accentColor: '#475569',
  icon: `${BASE}Service_Management.png`,

  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,

  mission: 'To strengthen ITSM practices, ServiceNow capabilities, and ITIL adoption across QBE Account operations for consistent, high-quality, and measurable service delivery.',
  vision: 'To establish QBE Account as a model of ITSM excellence, where service management processes are efficient, automated, and continually improving through data-driven insights.',
  values: 'Service excellence, process discipline, continuous improvement, and a customer-first approach to IT operations across all service management touchpoints at QBE.',

  certStages: [
    { num: 1, title: 'Trained',      subtitle: 'ITSM foundation training completed',    count: 8, totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed ITIL Foundation or ServiceNow basics training — building ITSM literacy.' },
    { num: 2, title: 'Intermediate', subtitle: 'ITIL / ServiceNow certification in progress', count: 5, totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members pursuing ITIL 4 Practitioner or ServiceNow Certified Administrator credentials.' },
    { num: 3, title: 'Certified',    subtitle: 'Full ITSM / ServiceNow certification achieved', count: 2, totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding ITIL Expert or ServiceNow certifications — our ITSM community anchors at QBE.' },
  ],

  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Service Management Subject Matter Experts driving ITSM excellence at QBE Account.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'ServiceNow Platform Update & Review',
      desc: 'Walkthrough of the latest ServiceNow capabilities, QBE Account configuration updates, and roadmap for upcoming ITSM enhancements.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#475569',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'ITIL Practices & Process Improvement',
      desc: 'Workshop on applying ITIL 4 practices to real QBE service management challenges — incident, problem, change, and continual improvement.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#475569',
    },
  ],

  members: MEMBERS,

  celebrateLearning: {
    title: 'Service Management Learning Achievers',
    desc: 'recognising outstanding commitment to ITSM and ServiceNow certification excellence.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },

  leadership: [
    { name: 'Madhvan Gopalan', initials: 'MG', photo: `${BASE}madhvan.jpg`, badge: 'Executive Sponsor', role: 'Executive Sponsor and Global CAL for QBE', email: 'madhvan.gopalan@accenture.com', badgeStyle: 'sponsor' },
    { name: 'Name 1', initials: 'N1', badge: 'Global Lead', role: 'Global Lead — To Be Confirmed', email: 'tbd@accenture.com', badgeStyle: 'global' },
    { name: 'Name 2', initials: 'N2', badge: 'CoP Lead',    role: 'CoP Lead — To Be Confirmed',    email: 'tbd@accenture.com', badgeStyle: 'cop'    },
  ],

  joinEmail: 'madhvan.gopalan@accenture.com',
  joinInterests: ['General', 'ServiceNow', 'ITIL', 'Incident Management', 'Change Management', 'Certifications'],
}
