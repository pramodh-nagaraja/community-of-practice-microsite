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

const BASE = import.meta.env.BASE_URL

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
    id: 'ai-genwizard',
    name: 'AI & GenWizard',
    description: 'Exploring generative AI, large language models, and intelligent automation to drive innovation across QBE Account.',
    icon: `${BASE}Data_and_AI.png`,
    accentColor: '#7C3AED',
    category: 'Data',
    lead: 'TBD',
    leadEmail: '',
    memberCount: null,
    status: 'coming-soon',
    route: '#/ai-genwizard',
    highlights: [],
    lastUpdated: '2026-05-18',
  },
  {
    id: 'cloud',
    name: 'Cloud',
    description: 'Accelerating cloud adoption, governance, FinOps, and multi-cloud strategy execution across QBE.',
    icon: `${BASE}Cloud.png`,
    accentColor: '#0369A1',
    category: 'Infrastructure',
    lead: 'Sagar Melupalleppa',
    leadEmail: 'sagar.melupalleppa@accenture.com',
    memberCount: 15,
    status: 'active',
    route: '#/cloud',
    highlights: [
      '15 members across AWS, Azure, GCP platforms',
      'Multi-cloud governance and FinOps optimization',
      'Strategic cloud adoption roadmaps',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'data-ai',
    name: 'Data & AI',
    description: 'Harnessing data engineering, analytics, and artificial intelligence to power QBE\'s decisions.',
    icon: `${BASE}Data_and_AI.png`,
    accentColor: '#5B21B6',
    category: 'Data',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/data-ai',
    highlights: [
      '15 members in data engineering and AI',
      'Advanced analytics and ML model expertise',
      'Data pipelines and intelligent automation',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Optimising database design, performance, migration, and reliability across Oracle, MSSQL, and PostgreSQL.',
    icon: `${BASE}Database.png`,
    accentColor: '#3730A3',
    category: 'Data',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/database',
    highlights: [
      '15 members across Oracle, MSSQL, PostgreSQL',
      'Performance tuning and migration expertise',
      'Database design and reliability standards',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'guidewire',
    name: 'Guidewire',
    description: 'Enabling Guidewire PolicyCenter, BillingCenter, and ClaimCenter expertise across the QBE delivery team.',
    icon: `${BASE}Guidewire.png`,
    accentColor: '#B91C1C',
    category: 'Business Applications',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/guidewire',
    highlights: [
      '15 members across 3 Guidewire modules',
      'PolicyCenter, BillingCenter, ClaimCenter mastery',
      'Insurance business process expertise',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Building domain knowledge in insurance products, regulations, and industry technology trends.',
    icon: `${BASE}Insurance.png`,
    accentColor: '#075985',
    category: 'Business Applications',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/insurance',
    highlights: [
      '15 insurance domain experts at QBE',
      'Product knowledge and regulatory compliance',
      'Industry technology trends and innovations',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'integration',
    name: 'Integration',
    description: 'Connecting systems and services through API-led architecture, ESB, and integration patterns.',
    icon: `${BASE}Integration.png`,
    accentColor: '#0F766E',
    category: 'Platform',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/integration',
    highlights: [
      '15 API architecture and ESB specialists',
      'API-led connectivity and microservices',
      'System integration pattern expertise',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    description: 'Championing Azure, M365, Power Platform, and .NET technologies within the QBE ecosystem.',
    icon: `${BASE}Microsoft.png`,
    accentColor: '#1D4ED8',
    category: 'Platform',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/microsoft',
    highlights: [
      '15 Azure, M365, and Power Platform experts',
      '.NET and modern application development',
      'Cloud-native solutions and ecosystem',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'mainframe',
    name: 'Mainframe',
    description: 'Building deep expertise in mainframe technologies, COBOL, and legacy system modernisation across QBE Account.',
    icon: `${BASE}Mainframe.png`,
    accentColor: '#DC2626',
    category: 'Infrastructure',
    lead: 'Mohan Bhuneswaran',
    leadEmail: 'mohan.bhuvaneswaran@accenture.com',
    memberCount: 12,
    status: 'active',
    route: '#/mainframe',
    highlights: [
      '12 members — Foundation & Advanced level',
      '2 certified experts and strategic advisors',
      'COBOL modernisation initiatives underway',
    ],
    lastUpdated: '2026-06-25',
  },
  {
    id: 'middleware',
    name: 'Middleware',
    description: 'Driving expertise in messaging, caching, and middleware platforms that power QBE\'s service backbone.',
    icon: `${BASE}Middleware.png`,
    accentColor: '#92400E',
    category: 'Platform',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/middleware',
    highlights: [
      '15 middleware and messaging specialists',
      'Kafka, RabbitMQ, and caching platforms',
      'Service backbone architecture expertise',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'netsec',
    name: 'Network & Security',
    description: 'Building deep expertise in network infrastructure, security architecture, and Cisco certification pathways across QBE Account.',
    icon: `${BASE}Network_and_Security.png`,
    accentColor: '#6D28D9',
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
    icon: `${BASE}Observability.png`,
    accentColor: '#9D174D',
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
    id: 'service-mgmt',
    name: 'Service Management',
    description: 'Strengthening ITSM practices, ServiceNow capabilities, and ITIL adoption across QBE operations.',
    icon: `${BASE}Service_Management.png`,
    accentColor: '#334155',
    category: 'Operations',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/service-mgmt',
    highlights: [
      '15 ITSM and ServiceNow practitioners',
      'ITIL best practices and process optimization',
      'Service delivery and incident management',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'sre',
    name: 'SRE / Automation',
    description: 'Embedding site reliability engineering, DevOps, and intelligent automation into QBE\'s delivery lifecycle.',
    icon: `${BASE}SRE_Automation.png`,
    accentColor: '#155E75',
    category: 'Engineering',
    lead: 'Ramya Nagamalla',
    leadEmail: 'ramya.nagamalla@accenture.com',
    memberCount: 15,
    status: 'active',
    route: '#/sre',
    highlights: [
      '15 SRE and DevOps engineers',
      'CI/CD, automation, and infrastructure-as-code',
      'Reliability engineering and observability',
    ],
    lastUpdated: '2026-05-21',
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Elevating quality engineering, test automation frameworks, and QA strategies at QBE.',
    icon: `${BASE}Testing.png`,
    accentColor: '#15803D',
    category: 'Engineering',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/testing',
    highlights: [
      '15 QA and test automation experts',
      'Test frameworks, automation, and strategies',
      'Quality engineering and continuous testing',
    ],
    lastUpdated: '2026-04-30',
  },
  {
    id: 'workday',
    name: 'Workday',
    description: 'Driving Workday HCM and Finance implementations, integrations, and best practices at QBE.',
    icon: `${BASE}Workday.png`,
    accentColor: '#C2410C',
    category: 'Business Applications',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/workday',
    highlights: [
      '15 Workday HCM and Finance specialists',
      'Implementation and integration expertise',
      'Best practices and employee experience',
    ],
    lastUpdated: '2026-04-30',
  },
]
