// ═══════════════════════════════════════════════════════════════
//  Mainframe CoP — data file
//  Auto-generated from content/mainframe/*.csv via `npm run sync`.
//  To update: edit the CSV files and re-run `npm run sync`.
// ═══════════════════════════════════════════════════════════════
import type { CoPPageData } from '../types'

const BASE = import.meta.env.BASE_URL

export const Mainframe_DATA: CoPPageData = {
  id: 'mainframe',
  name: 'Mainframe',
  tagline: 'Modernising mainframe capabilities and driving legacy system excellence at QBE.',
  description: 'Building deep expertise in mainframe technologies, COBOL, system architecture, and legacy modernisation strategies across QBE Account.',
  accentColor: '#DC2626',
  icon: `${BASE}Mainframe.png`,
  memberCount: 12,
  certCount: 0,
  sessionsHeld: 0,
  launchYear: 2026,
  mission: 'To cultivate mainframe expertise and drive strategic modernisation initiatives that enhance system reliability, maintainability, and strategic value across QBE Account.',
  vision: 'A QBE Account mainframe environment that is optimised for performance, secure, and strategically positioned as a key enabler of core business operations through continuous learning and modernisation.',
  values: 'Technical excellence, knowledge preservation, legacy respect, strategic modernisation, and continuous improvement of mainframe platforms.',
  leadership: [
    {
      name: 'Mathew Samuel',
      initials: 'MS',
      badge: 'CoP Lead',
      role: 'CoP Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'mathew.samuel@accenture.com',
    },
  ],
  joinEmail: 'mathew.samuel@accenture.com',
  members: [
    {
      name: 'James Wilson',
      initials: 'JW',
      levelLabel: 'Trained',
      levelColor: '#16a34a',
      levelBg: '#dcfce7',
      levelText: '#14532d',
    },
    {
      name: 'Patricia Brown',
      initials: 'PB',
      levelLabel: 'Trained',
      levelColor: '#16a34a',
      levelBg: '#dcfce7',
      levelText: '#14532d',
    },
    {
      name: 'Michael Chen',
      initials: 'MC',
      levelLabel: 'Intermediate',
      levelColor: '#2563eb',
      levelBg: '#dbeafe',
      levelText: '#1e3a8a',
    },
    {
      name: 'Sandra Thompson',
      initials: 'ST',
      levelLabel: 'Intermediate',
      levelColor: '#2563eb',
      levelBg: '#dbeafe',
      levelText: '#1e3a8a',
    },
    {
      name: 'Robert Anderson',
      initials: 'RA',
      levelLabel: 'Certified',
      levelColor: '#A100FF',
      levelBg: '#F5E6FF',
      levelText: '#5700AB',
    },
    {
      name: 'Jennifer Martinez',
      initials: 'JM',
      levelLabel: 'Certified',
      levelColor: '#A100FF',
      levelBg: '#F5E6FF',
      levelText: '#5700AB',
    },
  ],
  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'COBOL Modernisation Patterns',
      desc: 'Deep dive into effective patterns and strategies for modernising legacy COBOL applications.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#dc2626',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'Mainframe Performance Tuning',
      desc: 'Session on optimising mainframe system performance and resource utilisation.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#dc2626',
    },
  ],
  joinInterests: ['General', 'COBOL', 'System Architecture', 'Performance Tuning', 'Modernisation', 'Certifications'],
  certStages: [
    {
      num: 1,
      title: 'Foundations',
      subtitle: 'Mainframe fundamentals completed',
      count: 2,
      totalCohort: 12,
      color: '#16a34a',
      bg: '#dcfce7',
      border: '#86efac',
      desc: 'Members who have completed foundational mainframe systems and COBOL fundamentals training.',
      links: [
        { label: 'Mainframe Systems Overview', url: 'https://wd103.myworkday.com' },
        { label: 'COBOL Basics', url: 'https://wd103.myworkday.com' },
      ],
    },
    {
      num: 2,
      title: 'Advanced',
      subtitle: 'Advanced certification in progress',
      count: 4,
      totalCohort: 12,
      color: '#2563eb',
      bg: '#dbeafe',
      border: '#93c5fd',
      desc: 'Members advancing through intermediate mainframe system architecture and advanced COBOL programming.',
      links: [
        { label: 'System Architecture', url: 'https://wd103.myworkday.com' },
        { label: 'Advanced COBOL', url: 'https://wd103.myworkday.com' },
        { label: 'JCL & TSO', url: 'https://wd103.myworkday.com' },
      ],
    },
    {
      num: 3,
      title: 'Expert',
      subtitle: 'Full certification achieved',
      count: 2,
      totalCohort: 12,
      color: '#A100FF',
      bg: '#F5E6FF',
      border: '#d8b4fe',
      desc: 'Members holding full mainframe certification — domain experts and strategic advisors.',
      links: [
        { label: 'Modernisation Strategies', url: 'https://wd103.myworkday.com' },
        { label: 'Performance & Capacity', url: 'https://wd103.myworkday.com' },
      ],
    },
  ],
  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Mainframe Subject Matter Experts.',
    names: ['Robert Anderson', 'Jennifer Martinez'],
  },
  celebrateLearning: {
    title: 'Mainframe Learning Achievers',
    desc: 'recognising outstanding commitment to mainframe professional development and expertise advancement.',
    names: ['Robert Anderson', 'Jennifer Martinez', 'Michael Chen'],
  },
}
