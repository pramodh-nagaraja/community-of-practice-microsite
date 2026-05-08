// ═══════════════════════════════════════════════════════════════════════════
//  COMMUNITIES OF PRACTICE — DATA TEMPLATE
//  Edit this file to update any CoP information.
//
//  Monthly update checklist per community:
//    ✅  memberCount   — update total headcount
//    ✅  highlights    — refresh top 3 achievements / stats (max 3 strings)
//    ✅  lead          — update if CoP lead changes
//    ✅  status        — change 'coming-soon' → 'active' when page is live
//    ✅  lastUpdated   — set to today's date (YYYY-MM-DD)
//
//  To add a new CoP page:
//    1. Change status to 'active'
//    2. Set route to '#/your-id'  (must match the hash in main.tsx)
//    3. Add the new route handler in src/main.tsx
// ═══════════════════════════════════════════════════════════════════════════

export interface CoPCommunity {
  id: string
  name: string
  description: string
  icon: string         // path to PNG in /public, e.g. '/Mainframe.png'
  accentColor: string  // hex — drives card top bar, icon bg, CTA button color
  category: string     // grouping label (not displayed, for future filtering)
  lead: string         // full name of CoP lead
  leadEmail: string    // work email of CoP lead
  memberCount: number | null  // null until the CoP is set up
  status: 'active' | 'coming-soon'
  route: string        // hash route, e.g. '#/noc' — must start with '#/'
  highlights: string[] // up to 3 short achievement strings shown on the card
  lastUpdated: string  // ISO date 'YYYY-MM-DD' — shown in footer
}

// ───────────────────────────────────────────────────────────────────────────
//  COMMUNITY DATA — edit below
// ───────────────────────────────────────────────────────────────────────────
export const COMMUNITIES: CoPCommunity[] = [
  {
    id: 'workday',
    name: 'Workday',
    description: 'Driving Workday HCM and Finance implementations, integrations, and best practices at QBE.',
    icon: '/Workday.png',
    accentColor: '#ea580c',
    category: 'Business Applications',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/workday',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'integration',
    name: 'Integration',
    description: 'Connecting systems and services through API-led architecture, ESB, and integration patterns.',
    icon: '/Integration.png',
    accentColor: '#0d9488',
    category: 'Platform',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/integration',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'guidewire',
    name: 'Guidewire',
    description: 'Enabling Guidewire PolicyCenter, BillingCenter, and ClaimCenter expertise across the QBE delivery team.',
    icon: '/Guidewire.png',
    accentColor: '#dc2626',
    category: 'Business Applications',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/guidewire',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Building domain knowledge in insurance products, regulations, and industry technology trends.',
    icon: '/Insurance.png',
    accentColor: '#0369a1',
    category: 'Business Applications',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/insurance',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    description: 'Championing Azure, M365, Power Platform, and .NET technologies within the QBE ecosystem.',
    icon: '/Microsoft.png',
    accentColor: '#2563eb',
    category: 'Platform',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/microsoft',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'cloud',
    name: 'Cloud',
    description: 'Accelerating cloud adoption, governance, FinOps, and multi-cloud strategy execution across QBE.',
    icon: '/Cloud.png',
    accentColor: '#0284c7',
    category: 'Infrastructure',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/cloud',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Elevating quality engineering, test automation frameworks, and QA strategies at QBE.',
    icon: '/Testing.png',
    accentColor: '#16a34a',
    category: 'Engineering',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/testing',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'data-ai',
    name: 'Data & AI',
    description: 'Harnessing data engineering, analytics, and artificial intelligence to power QBE\'s decisions.',
    icon: '/Data_and_AI.png',
    accentColor: '#7c3aed',
    category: 'Data',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/data-ai',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Optimising database design, performance, migration, and reliability across Oracle, MSSQL, and PostgreSQL.',
    icon: '/Database.png',
    accentColor: '#4338ca',
    category: 'Data',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/database',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'middleware',
    name: 'Middleware',
    description: 'Driving expertise in messaging, caching, and middleware platforms that power QBE\'s service backbone.',
    icon: '/Middleware.png',
    accentColor: '#b45309',
    category: 'Platform',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/middleware',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'netsec',
    name: 'Network & Security',
    description: 'Building deep expertise in network infrastructure, security architecture, and Cisco certification pathways across QBE Account.',
    icon: '/Network_and_Security.png',
    accentColor: '#A100FF',
    category: 'Infrastructure',
    lead: 'Pramodh Nagaraja',
    leadEmail: 'pramodh.nagaraja@accenture.com',
    memberCount: 34,
    status: 'active',
    route: '#/noc/network',
    highlights: [
      '34 members — Foundation Certified',
      '17 progressed to CCNA Boot Camp',
      '1 full CCNA certified at QBE',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'observability',
    name: 'Observability',
    description: 'Enabling full-stack observability with SolarWinds, monitoring strategy, and visibility across QBE Account\'s technology landscape.',
    icon: '/Observability.png',
    accentColor: '#be185d',
    category: 'Infrastructure',
    lead: 'Pramodh Nagaraja',
    leadEmail: 'pramodh.nagaraja@accenture.com',
    memberCount: 11,
    status: 'active',
    route: '#/noc/observability',
    highlights: [
      '11 nominated for SolarWinds Boot Camp',
      'SolarWinds NPM / SAM certification track',
      'Observability-specific certification journey',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'sre',
    name: 'SRE / Automation',
    description: 'Embedding site reliability engineering, DevOps, and intelligent automation into QBE\'s delivery lifecycle.',
    icon: '/SRE_Automation.png',
    accentColor: '#0e7490',
    category: 'Engineering',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/sre',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'service-mgmt',
    name: 'Service Management',
    description: 'Strengthening ITSM practices, ServiceNow capabilities, and ITIL adoption across QBE operations.',
    icon: '/Service_Management.png',
    accentColor: '#475569',
    category: 'Operations',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/service-mgmt',
    highlights: [],
    lastUpdated: '2026-04-30',
  },
]
