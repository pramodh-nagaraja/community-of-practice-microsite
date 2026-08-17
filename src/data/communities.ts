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
    id: 'cloud',
    name: 'Cloud',
    description: 'Accelerating cloud adoption, governance, FinOps, and multi-cloud strategy execution across QBE.',
    icon: `${BASE}Cloud.png`,
    accentColor: '#0369A1',
    category: 'Infrastructure',
    lead: 'Sagar Melupalleppa',
    leadEmail: 'sagar.melupalleppa@accenture.com',
    memberCount: 28,
    status: 'active',
    route: '#/cloud',
    highlights: [
      '28 members — 8 Certified, 9 Intermediate, 11 Trained',
      'Azure IaaS, AKS, DBaaS — certifications spanning AZ-104, AZ-305, AZ-400, AZ-800 and more',
      'Multi-cloud governance, FinOps, and containerised workload expertise',
    ],
    lastUpdated: '2026-07-23',
  },
  {
    id: 'data-databricks',
    name: 'Data and AI',
    description: 'Harnessing data engineering, analytics, and artificial intelligence to power QBE\'s decisions.',
    icon: `${BASE}Data_and_AI.png`,
    accentColor: '#5B21B6',
    category: 'Data',
    lead: 'Priya Kanu Singh',
    leadEmail: 'kanu.priya.singh@accenture.com',
    memberCount: 31,
    status: 'active',
    route: '#/data-databricks',
    highlights: [
      '31 members — 15 Databricks Certified Data Engineers',
      'Databricks Certified Data Engineer Associate certification drive',
      'Data engineering, analytics, and AI across the QBE Account',
    ],
    lastUpdated: '2026-08-03',
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    description: 'Driving AI agent adoption, LLM integration, and intelligent automation across QBE Account.',
    icon: `${BASE}Data_and_AI.png`,
    accentColor: '#4F46E5',
    category: 'Innovation',
    lead: 'TBD',
    leadEmail: '',
    memberCount: 15,
    status: 'active',
    route: '#/agentic-ai',
    highlights: [
      '15 members exploring LLMs, AI agents, and RAG pipelines',
      'Azure AI, Prompt Engineering, and Agentic AI patterns',
      'Responsible AI practices for QBE Account delivery',
    ],
    lastUpdated: '2026-07-29',
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Optimising database design, performance, migration, and reliability across Oracle, MSSQL, and PostgreSQL.',
    icon: `${BASE}Database.png`,
    accentColor: '#3730A3',
    category: 'Data',
    lead: 'Kaseeswar Reddy',
    leadEmail: 'kaseeswar.reddy@accenture.com',
    memberCount: 27,
    status: 'active',
    route: '#/database',
    highlights: [
      '27 members — 14 Certified, 10 Intermediate, 3 Trained',
      '10 database platforms: Oracle, SQL Server, DB2, MongoDB, PostgreSQL, and more',
      'Performance tuning, migration, and reliability expertise',
    ],
    lastUpdated: '2026-08-03',
  },
  {
    id: 'guidewire',
    name: 'Guidewire',
    description: 'Enabling Guidewire PolicyCenter, BillingCenter, and ClaimCenter expertise across the QBE delivery team.',
    icon: `${BASE}Guidewire.png`,
    accentColor: '#B91C1C',
    category: 'Business Applications',
    lead: 'Jeethu Nair',
    leadEmail: 'jeethu.t.nair@accenture.com',
    memberCount: 24,
    status: 'active',
    route: '#/guidewire',
    highlights: [
      '24 members — 14 Certified, 7 Intermediate, 3 Trained',
      'ClaimCenter, PolicyCenter, BillingCenter & Integration specialists',
      'Ongoing Guidewire Developer Training from June 2026',
    ],
    lastUpdated: '2026-08-17',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Building domain knowledge in insurance products, regulations, and industry technology trends.',
    icon: `${BASE}Insurance.png`,
    accentColor: '#075985',
    category: 'Business Applications',
    lead: 'Mavelyn Pascual',
    leadEmail: 'mavelyn.r.pascual@accenture.com',
    memberCount: 530,
    status: 'active',
    route: '#/insurance',
    highlights: [
      '530 members — 15 Certified, 244 Intermediate, 271 Trained',
      '2 Industry Day learning sessions held — Q2 Feb & Q3 Jun 2026',
      'Foundation, Intermediate & Guidewire skill pathways active',
    ],
    lastUpdated: '2026-08-13',
  },
  {
    id: 'integration',
    name: 'Integration',
    description: 'Connecting systems and services through API-led architecture, ESB, and integration patterns.',
    icon: `${BASE}Integration.png`,
    accentColor: '#0F766E',
    category: 'Platform',
    lead: 'Aisha Mulla',
    leadEmail: 'aisha.m.mulla@accenture.com',
    memberCount: 16,
    status: 'active',
    route: '#/integration',
    highlights: [
      '16 members — 2 Certified, 3 Intermediate, 11 Trained',
      '9 platforms: MuleSoft, Azure, Boomi, TOSCA, Tricentis, Google Cloud, AWS, IBM, GitHub Copilot',
      '4 sessions held — API Marketplace, APIM, MuleSoft Agentic AI, Secure Integrations',
    ],
    lastUpdated: '2026-07-23',
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
    memberCount: 56,
    status: 'active',
    route: '#/mainframe',
    highlights: [
      '56 members — 18 Expert, 29 Intermediate, 9 Trained',
      'Comprehensive COBOL, CICS, and JCL training program',
      '7 upcoming sessions with hands-on workshops',
    ],
    lastUpdated: '2026-06-30',
  },
  {
    id: 'middleware',
    name: 'Middleware',
    description: 'Driving expertise in messaging, caching, and middleware platforms that power QBE\'s service backbone.',
    icon: `${BASE}Middleware.png`,
    accentColor: '#92400E',
    category: 'Platform',
    lead: 'Deepa Roshan Shetty',
    leadEmail: 'd.roshan.shetty@accenture.com',
    memberCount: 25,
    status: 'active',
    route: '#/middleware',
    highlights: [
      '25 members — 14 Expert, 11 Intermediate across 9 middleware platforms',
      '12 Percipio training resources — Weblogic, WAS, Tomcat, JBOSS, Netscaler & more',
      'Center of excellence for integration & middleware at QBE',
    ],
    lastUpdated: '2026-08-07',
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
    lead: 'Dharshan Surendran',
    leadEmail: 'dharshan.surendran@accenture.com',
    memberCount: 24,
    status: 'active',
    route: '#/service-mgmt',
    highlights: [
      '24 members — 7 Certified, 4 Intermediate, 13 Trained',
      'ITIL Expert & V4 Foundation, Dynatrace, SolarWinds, Azure certs',
      'ITSM automation with SRE — audit, GenWizard, Go/No-Go agent',
    ],
    lastUpdated: '2026-08-03',
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
    memberCount: 10,
    status: 'active',
    route: '#/sre',
    highlights: [
      '10 members — 5 Certified, 3 Intermediate, 2 Trained',
      'SLO/SLI design and DevOps practices',
      'CI/CD pipelines and infrastructure-as-code excellence',
    ],
    lastUpdated: '2026-06-30',
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Elevating quality engineering, test automation frameworks, and QA strategies at QBE.',
    icon: `${BASE}Testing.png`,
    accentColor: '#15803D',
    category: 'Engineering',
    lead: 'Kalyan Chamarthi',
    leadEmail: 'kalyan.chamarthi@accenture.com',
    memberCount: 15,
    status: 'active',
    route: '#/testing',
    highlights: [
      '10 career pathways — Manual, Selenium, Playwright, Tosca & more',
      '5-stage Learning Journey Framework — Explore to Mentor',
      'Quality engineering, automation, and continuous testing',
    ],
    lastUpdated: '2026-08-03',
  },
  {
    id: 'workday',
    name: 'Workday',
    description: 'Driving Workday HCM and Finance implementations, integrations, and best practices at QBE.',
    icon: `${BASE}Workday.png`,
    accentColor: '#C2410C',
    category: 'Business Applications',
    lead: 'Christian Valenzuela',
    leadEmail: 'christian.valenzuela@accenture.com',
    memberCount: 27,
    status: 'active',
    route: '#/workday',
    highlights: [
      '27 members — 3 Certified, 21 Intermediate, 3 Trained',
      'HCM Core, Integrations, Orchestrate, Prism, Adaptive & more',
      'Multi-cert specialists across HCM, Finance, and Workday Pro modules',
    ],
    lastUpdated: '2026-07-29',
  },
]
