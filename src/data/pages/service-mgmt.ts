// ═══════════════════════════════════════════════════════════════
//  Service Management CoP — data file
//  Auto-generated from content/service-mgmt/*.csv via `npm run sync`.
//  To update: edit the CSV files and re-run `npm run sync`.
// ═══════════════════════════════════════════════════════════════
import type { CoPPageData } from '../types'

const BASE = import.meta.env.BASE_URL

// Level presets — reused across members
const TRAINED      = { levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d' }
const INTERMEDIATE = { levelLabel: 'Intermediate', levelColor: '#2563eb', levelBg: '#dbeafe', levelText: '#1e3a8a' }
const CERTIFIED    = { levelLabel: 'Certified',    levelColor: '#A100FF', levelBg: '#F5E6FF', levelText: '#5700AB' }

export const ServiceMgmt_DATA: CoPPageData = {
  id: 'service-mgmt',
  name: 'Service Management',
  tagline: 'Strengthening ITSM practices, ITIL adoption, and continuous improvement at QBE.',
  description: 'Strengthening ITSM practices, ITIL adoption, and continuous improvement across QBE operations.',
  accentColor: '#334155',
  icon: `${BASE}Service_Management.png`,
  memberCount: 23,
  certCount: 6,
  sessionsHeld: 0,
  launchYear: 2026,
  mission: 'To strengthen ITSM practices, ITIL adoption, and continuous improvement across the QBE Account through collaboration and knowledge sharing, enabling consistent, high-quality, and measurable service delivery.',
  vision: 'To create a culture of service excellence through innovation, collaboration, automation, and continuous improvement, making the QBE Account a leader in IT Service Management.',
  values: 'To uphold service excellence, process discipline, collaboration, continuous improvement, and a customer-first approach across all IT Service Management practices and service delivery.',
  leadership: [
    {
      name: 'Madhvan Gopalan',
      initials: 'MG',
      photo: `${BASE}madhvan.jpg`,
      badge: 'Executive Sponsor',
      role: 'Executive Sponsor and Global CAL for QBE',
      badgeStyle: 'sponsor' as 'sponsor' | 'global' | 'cop',
      email: 'madhvan.gopalan@accenture.com',
    },
    {
      name: 'Dharshan Surendran',
      initials: 'DS',
      badge: 'CoP Lead',
      role: 'CFS Lead & Service Management CoP Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'dharshan.surendran@accenture.com',
    },
    {
      name: 'Josephine J. Joseph',
      initials: 'JJ',
      badge: 'CoP Lead',
      role: 'Service Management Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'josephine.j.joseph@accenture.com',
    },
    {
      name: 'Mukesh C. Mishra',
      initials: 'MM',
      badge: 'CoP Lead',
      role: 'Service Management Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'mukesh.c.mishra@accenture.com',
    },
  ],
  joinEmail: 'dharshan.surendran@accenture.com',
  members: [
    { name: 'Dharshan Surendran',   initials: 'DS', role: 'CFS Lead',                              ...CERTIFIED,    tags: ['ITIL Expert', 'ITIL V4 Foundation', 'SNOW License Mgmt', 'MS SAM', 'Six Sigma'] },
    { name: 'Josephine J. Joseph',  initials: 'JJ', role: 'Service Management Lead',               ...CERTIFIED,    tags: ['ITIL V4 Foundation', 'PL-300 (Power BI)', 'Dynatrace', 'Six Sigma'] },
    { name: 'Mukesh C. Mishra',     initials: 'MM', role: 'Service Management Lead',               ...CERTIFIED,    tags: ['ITIL V4 Foundation', 'CCNA', 'GCP Associate'] },
    { name: 'Varshini Natrajan',    initials: 'VN', role: 'Major Incident Management (MIM)',       ...CERTIFIED,    tags: ['ITIL V4 Foundation', 'PL-300 (Power BI)', 'SolarWinds'] },
    { name: 'Sarath Ram',           initials: 'SR', role: 'Dynatrace',                             ...CERTIFIED,    tags: ['Dynatrace', 'SolarWinds', 'AZ-900', 'Linux'] },
    { name: 'Shreya J. Sharma',     initials: 'SS', role: 'Disaster Recovery (DR)',               ...CERTIFIED,    tags: ['AZ-900', 'DP-900', 'AZ-204'] },
    { name: 'Shraddha Masale',      initials: 'SM', role: 'Change Management',                     ...INTERMEDIATE, tags: ['ITIL V4 Foundation', 'AZ-900'] },
    { name: 'Arthi Krishna',        initials: 'AK', role: 'Major Incident Management (MIM)',       ...INTERMEDIATE, tags: ['ITIL V4 Foundation', 'SolarWinds'] },
    { name: 'Pratyusha Inaganti',   initials: 'PI', role: 'Release Management',                    ...INTERMEDIATE, tags: ['PL-300 (Power BI)', 'SolarWinds'] },
    { name: 'Kishan',               initials: 'KI', role: 'Dynatrace',                             ...INTERMEDIATE, tags: ['SolarWinds', 'Oracle SQL'] },
    { name: 'Satyajeet Mohanty',    initials: 'SO', role: 'Change Management',                     ...TRAINED,      tags: ['ITIL V4 Foundation'] },
    { name: 'Nivedhitha Nadarajan', initials: 'NN', role: 'Problem Management',                    ...TRAINED,      tags: ['ITIL V4 Foundation'] },
    { name: 'Sree Harsha Gajjala',  initials: 'SG', role: 'Release Management',                    ...TRAINED,      tags: ['ITIL V4 Foundation'] },
    { name: 'Ashutosh Hemant Pande',initials: 'AP', role: 'Change Management',                     ...TRAINED,      tags: ['ITIL V4 Foundation'] },
    { name: 'Rashmi Basavarajappa', initials: 'RB', role: 'IT Asset Management (ITAM)',            ...TRAINED,      tags: ['ITIL V4 Foundation'] },
    { name: 'M. Salazar-Dimapilis', initials: 'MD', role: 'Dynatrace / MIM / Event Management',    ...TRAINED,      tags: ['ITIL V4 Foundation'] },
    { name: 'Sree A. Rajamohan',    initials: 'SA', role: 'Problem Management',                    ...TRAINED,      tags: ['Generative AI'] },
    { name: 'Dhivya Pradeepa S. R.',initials: 'DP', role: 'Disaster Recovery (DR)',               ...TRAINED,      tags: ['SolarWinds'] },
    { name: 'K. Kiran Chinthapally',initials: 'KC', role: 'Disaster Recovery (DR)',               ...TRAINED,      tags: ['AZ-900'] },
    { name: 'Gayathri T. S.',       initials: 'GT', role: 'Incident Management (IM)',              ...TRAINED,      tags: ['SolarWinds'] },
    { name: 'Shreeja Mo',           initials: 'SH', role: 'Vulnerability Management',              ...TRAINED },
    { name: 'Sunil',                initials: 'SU', role: 'Dynatrace',                             ...TRAINED },
    { name: 'Jhansi Kanaparthi',    initials: 'JK', role: 'IT Asset Management (ITAM)',            ...TRAINED },
  ],
  events: [
    {
      day: '📅', month: 'Planned',
      title: 'Quarterly ITSM Training for Regional Teams',
      desc: 'Structured ITSM training rolled out to regional delivery teams to strengthen ITIL practice adoption and process consistency.',
      type: 'Training', time: 'Quarterly cadence', accentColor: '#2563EB',
    },
    {
      day: '🔄', month: 'Ongoing',
      title: 'Monthly Performance Update to Leadership',
      desc: 'Regular performance reporting to leadership covering SLAs, KPIs, and service-health metrics across the account.',
      type: 'Governance', time: 'Monthly cadence', accentColor: '#0F766E',
    },
    {
      day: '🔄', month: 'Ongoing',
      title: 'Daily Status Call with Regional Delivery Teams',
      desc: 'Daily sync with regional delivery teams to align on incidents, changes, and operational priorities.',
      type: 'Operations', time: 'Daily cadence', accentColor: '#0F766E',
    },
    {
      day: '🔄', month: 'Ongoing',
      title: 'Dynatrace Community of Practice Initiative',
      desc: 'Growing Dynatrace expertise across the account through shared learning, best practices, and hands-on enablement.',
      type: 'Community', time: 'Ongoing', accentColor: '#0F766E',
    },
    {
      day: '🔄', month: 'Ongoing',
      title: 'Disaster Recovery Test & Knowledge Sessions',
      desc: 'Regular DR tests and knowledge-sharing sessions to validate recovery readiness across critical systems.',
      type: 'Resilience', time: 'Ongoing', accentColor: '#0F766E',
    },
    {
      day: '🛠️', month: 'In Build',
      title: 'ITSM Ticket Audit Automation',
      desc: 'Automating ITSM ticket-quality audits to improve accuracy and reduce manual review effort. Delivered with the SRE team.',
      type: 'Automation · SRE', time: 'SRE Team', accentColor: '#B45309',
    },
    {
      day: '🛠️', month: 'In Build',
      title: 'GenWizard Ticket Analysis',
      desc: 'Leveraging GenWizard for intelligent ticket analysis, categorisation, and trend detection. Delivered with the SRE team.',
      type: 'Automation · SRE', time: 'SRE Team', accentColor: '#B45309',
    },
    {
      day: '🛠️', month: 'In Build',
      title: 'Change Go/No-Go Agent',
      desc: 'Building an AI agent to support Change Advisory Board go/no-go decisions with data-driven insights. Delivered with the SRE team.',
      type: 'Automation · SRE', time: 'SRE Team', accentColor: '#B45309',
    },
    {
      day: '🛠️', month: 'In Build',
      title: 'Integrated Command Centre Observability',
      desc: 'Unified command-centre observability integrating monitoring signals for end-to-end service visibility. Delivered with the SRE team.',
      type: 'Observability · SRE', time: 'SRE Team', accentColor: '#B45309',
    },
  ],
  joinInterests: ['General', 'ITIL / ITSM', 'Incident Management', 'Change Management', 'Problem Management', 'Disaster Recovery', 'Dynatrace / Observability', 'Automation & AI', 'Certifications'],
  certStages: [
    {
      num: 1, title: 'Trained', subtitle: 'Foundation training completed', count: 13, totalCohort: 23,
      color: '#16a34a', bg: '#dcfce7', border: '#86efac',
      desc: 'Members grounded in ITIL/ITSM fundamentals and building their first certifications.',
      trainings: 0,
      links: [
        { label: 'ITIL® 4 Foundation ↗', url: 'https://share.percipio.com/cd/WQ9YnJjWs' },
        { label: 'Critical Incident Management ↗', url: 'https://share.percipio.com/cd/hPBcQiL61' },
      ],
    },
    {
      num: 2, title: 'Intermediate', subtitle: 'Multi-skilled across ITSM & tooling', count: 4, totalCohort: 23,
      color: '#2563eb', bg: '#dbeafe', border: '#93c5fd',
      desc: 'Members expanding into observability, cloud, and analytics certifications alongside ITSM.',
      trainings: 0,
      links: [
        { label: 'Six Sigma Foundations ↗', url: 'https://share.percipio.com/cd/JsXi5zvQL' },
        { label: 'PL-300: Power BI Data Analyst ↗', url: 'https://share.percipio.com/cd/l53lQikGy' },
      ],
    },
    {
      num: 3, title: 'Certified', subtitle: 'Domain champions — multi-certified', count: 6, totalCohort: 23,
      color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe',
      desc: 'ITIL Expert and multi-certified specialists driving ITSM excellence across the account.',
      trainings: 0,
    },
  ],
  spotlight: {
    title: 'CoP Recognition & Awards',
    desc: 'Celebrating standout achievements across our Service Management community.',
    names: ['Josephine J. Joseph (P4 Expert)', 'Arthi Krishna (ACE Award)'],
  },
  celebrateLearning: {
    title: 'Service Management Learning Achievers',
    desc: 'recognising outstanding commitment to ITSM professional development and certification excellence.',
    names: ['Dharshan Surendran', 'Josephine J. Joseph', 'Sarath Ram', 'Shreya J. Sharma', 'Mukesh C. Mishra'],
  },
}
