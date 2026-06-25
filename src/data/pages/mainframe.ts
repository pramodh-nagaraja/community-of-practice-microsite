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
      name: 'Madhavan Gopalan',
      initials: 'MG',
      photo: `${BASE}madhvan.jpg`,
      badge: 'Executive Sponsor',
      role: 'Executive Sponsor and Global CAL for QBE',
      badgeStyle: 'sponsor' as 'sponsor' | 'global' | 'cop',
      email: 'madhvan.gopalan@accenture.com',
    },
    {
      name: 'Srini Vinnakota',
      initials: 'SV',
      badge: 'Global Lead',
      role: 'Global Lead',
      badgeStyle: 'global' as 'sponsor' | 'global' | 'cop',
      email: 'srini.vinnakota@accenture.com',
    },
    {
      name: 'Mohan Bhuneswaran',
      initials: 'MB',
      badge: 'CoP Lead',
      role: 'CoP Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'mohan.bhuvaneswaran@accenture.com',
    },
    {
      name: 'Shruthi Purushothama',
      initials: 'SP',
      badge: 'CoP Lead',
      role: 'CoP Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'shruthi.purushothama@accenture.com',
    },
    {
      name: 'Winiston Jose',
      initials: 'WJ',
      badge: 'CoP Lead',
      role: 'CoP Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'winiston.jose@accenture.com',
    },
  ],
  joinEmail: 'mohan.bhuvaneswaran@accenture.com',
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
      levelLabel: 'Trained',
      levelColor: '#16a34a',
      levelBg: '#dcfce7',
      levelText: '#14532d',
    },
    {
      name: 'Sandra Thompson',
      initials: 'ST',
      levelLabel: 'Trained',
      levelColor: '#16a34a',
      levelBg: '#dcfce7',
      levelText: '#14532d',
    },
    {
      name: 'Robert Anderson',
      initials: 'RA',
      levelLabel: 'Trained',
      levelColor: '#16a34a',
      levelBg: '#dcfce7',
      levelText: '#14532d',
    },
    {
      name: 'Jennifer Martinez',
      initials: 'JM',
      levelLabel: 'Trained',
      levelColor: '#16a34a',
      levelBg: '#dcfce7',
      levelText: '#14532d',
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
    { num: 1, title: 'Trained', subtitle: 'Foundation training completed', count: 6, totalCohort: 6, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational Mainframe training.', links: [{ label: 'Mainframe Systems Overview', url: 'https://wd103.myworkday.com' }, { label: 'COBOL Basics', url: 'https://wd103.myworkday.com' }] },
    { num: 2, title: 'Intermediate', subtitle: 'Intermediate certification in progress', count: 0, totalCohort: 6, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members pursuing intermediate Mainframe certification.', links: [{ label: 'System Architecture', url: 'https://wd103.myworkday.com' }, { label: 'Advanced COBOL', url: 'https://wd103.myworkday.com' }, { label: 'JCL & TSO', url: 'https://wd103.myworkday.com' }] },
    { num: 3, title: 'Certified', subtitle: 'Full certification achieved', count: 0, totalCohort: 6, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding full Mainframe certification — domain champions.', links: [{ label: 'Modernisation Strategies', url: 'https://wd103.myworkday.com' }, { label: 'Performance & Capacity', url: 'https://wd103.myworkday.com' }] },
  ],
  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Mainframe Subject Matter Experts.',
    names: ['James Wilson', 'Patricia Brown', 'Michael Chen'],
  },
  celebrateLearning: {
    title: 'Mainframe Learning Achievers',
    desc: 'recognising outstanding commitment to Mainframe professional development and certification excellence.',
    names: ['James Wilson', 'Patricia Brown', 'Michael Chen'],
  },
}
