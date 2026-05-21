// ═══════════════════════════════════════════════════════════════
//  Insurance CoP — data file
//  Last updated: 2026-05-18
// ═══════════════════════════════════════════════════════════════
import type { CoPPageData } from '../types'

const BASE = import.meta.env.BASE_URL

export const Insurance_DATA: CoPPageData = {
  id: 'insurance',
  name: 'Insurance',
  tagline: 'Building domain knowledge in insurance products, regulations, and industry trends at QBE.',
  description: 'Building domain knowledge in insurance products, regulations, and industry technology trends.',
  accentColor: '#075985',
  icon: `${BASE}Insurance.png`,
  memberCount: 15,
  certCount: 2,
  sessionsHeld: 0,
  launchYear: 2026,
  mission: 'To deepen insurance domain knowledge across QBE Account enabling technology professionals to deliver solutions aligned with insurance business needs.',
  vision: 'To create a QBE Account team that seamlessly bridges technology and insurance domain expertise for better client outcomes.',
  values: 'Domain curiosity, business alignment, and a drive to translate insurance knowledge into technology solutions that deliver real value.',
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
      name: 'Priti Ranjit Das',
      initials: 'PRD',
      badge: 'Global Lead',
      role: 'Global Lead',
      badgeStyle: 'global' as 'sponsor' | 'global' | 'cop',
      email: 'priti.ranjit.das@accenture.com',
    },
    {
      name: 'Ramya Nagamalla',
      initials: 'RN',
      badge: 'CoP Lead',
      role: 'CoP Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'ramya.nagamalla@accenture.com',
    },
  ],
  joinEmail: 'ramya.nagamalla@accenture.com',
  members: [],
  resources: [
    {
      title: 'Newsletter',
      icon: '📰',
      color: '#075985',
      bg: '#f0f9ff',
      border: '#bae6fd',
      tagColor: '#075985',
      tagBg: '#e0f2fe',
      items: [
        { name: 'Coming soon — link to be provided', type: 'Newsletter' },
      ],
    },
    {
      title: 'Previous Sessions',
      icon: '🎬',
      color: '#0369a1',
      bg: '#f0f9ff',
      border: '#7dd3fc',
      tagColor: '#0369a1',
      tagBg: '#e0f2fe',
      items: [
        { name: 'Coming soon — link to be provided', type: 'Recording' },
      ],
    },
    {
      title: 'Others',
      icon: '🗂️',
      color: '#0284c7',
      bg: '#f0f9ff',
      border: '#93c5fd',
      tagColor: '#0284c7',
      tagBg: '#dbeafe',
      items: [
        { name: 'Coming soon — link to be provided', type: 'Resource' },
      ],
    },
  ],
  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'Insurance Domain Fundamentals',
      desc: 'Introduction to P&C insurance products',
      type: 'policy lifecycle',
      time: 'and how technology supports insurance operations at QBE.',
      accentColor: 'Knowledge Share',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'InsurTech Trends & QBE Strategy',
      desc: 'Session on emerging insurance technology trends and how QBE is positioning for the future.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#0369a1',
    },
  ],
  joinInterests: ['General', 'P&C Insurance', 'Regulations & Compliance', 'InsurTech', 'Industry Trends', 'Certifications'],
  certStages: [
    { num: 1, title: 'Trained',      subtitle: 'Foundation training completed',           count: 457,    totalCohort: 15, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational Insurance training.',                              hideProgress: true, links: [{ label: 'Foundation Training', url: 'https://mediaexchange.accenture.com/media/t/1_eix5k3ru' }] },
    { num: 2, title: 'Intermediate', subtitle: 'Intermediate certification in progress',  count: 334,    totalCohort: 15, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members pursuing intermediate Insurance certification.',                                         hideProgress: true, links: [{ label: 'Focus Training 1', url: 'https://login.microsoftonline.com/e0793d39-0939-496d-b129-198edd916feb/oauth2/v2.0/authorize?client_id=50540083-d7c5-4aae-8528-67ce8aa0a106&scope=cd0ffaad-ec2e-4d81-9890-2fbcad200de3%2f.default&response_type=code&redirect_uri=https%3a%2f%2fnetworks.learning.accenture.com%2f&nonce=gadjkahdjad&state=06c6584a3eda7eb41f2f6a8b0e55f2689b14e7beba73790db13764df7b8340f9&sso_nonce=AwABEgEAAAADAOz_BQD0_0V2b1N0c0FydGlmYWN0cwUAAAAAAAe0yif3I9EvpVgY5pyg4j_Hv6wB_JxTz7ycyxf7T27pRSgNCwAW7ge17RfvY93F5Ptv9TYFn57I0o4mgUlKDvMgAA&client-request-id=ffcb92b2-8745-4fd2-956b-15af4dd63d54&mscrid=ffcb92b2-8745-4fd2-956b-15af4dd63d54' }, { label: 'Focus Training 2', url: 'https://networks.learning.accenture.com/app/#/details?id=2&tab=4' }] },
    { num: 3, title: 'Certified',    subtitle: 'Full certification achieved',              count: 2,      totalCohort: 15, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding full Insurance certification — domain champions.', detail: 'AINS 101 · AINS 102 · AINS 103', hideProgress: true },
  ],
  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Insurance Subject Matter Experts.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },
  celebrateLearning: {
    title: 'Insurance Learning Achievers',
    desc: 'recognising outstanding commitment to Insurance professional development and certification excellence.',
    names: ['Name 1', 'Name 2', 'Name 3'],
  },
}
