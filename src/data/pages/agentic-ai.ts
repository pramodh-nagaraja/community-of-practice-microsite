// ═══════════════════════════════════════════════════════════════
//  Agentic AI CoP — data file
// ═══════════════════════════════════════════════════════════════
import type { CoPPageData } from '../types'

const BASE = import.meta.env.BASE_URL

export const AgenticAI_DATA: CoPPageData = {
  id: 'agentic-ai',
  name: 'Agentic AI',
  tagline: 'Building AI agent capabilities, LLM expertise, and intelligent automation at QBE.',
  description: 'Driving Agentic AI adoption across QBE Account — from LLM integration and RAG pipelines to autonomous AI agents and responsible AI practices.',
  accentColor: '#4F46E5',
  icon: `${BASE}Data_and_AI.png`,
  memberCount: 10,
  certCount: 0,
  sessionsHeld: 0,
  launchYear: 2026,
  mission: 'To build a vibrant, curiosity-driven community that empowers QBE NA professionals to harness the potential of Agentic AI — accelerating delivery, driving innovation, and shaping the future of intelligent automation within our account.',
  vision: 'To be the go-to center of excellence for Agentic AI on the QBE account — fostering a culture where AI augments every workstream, every team member grows confidently with AI, and every delivery benefits from intelligent automation.',
  values: 'Explore Fearlessly · Share Openly · Build Responsibly · Deliver Impact · Grow Together — bold experimentation, open knowledge sharing, ethical AI use, measurable delivery value, and investing in each other\'s growth.',

  whatWeDo: [
    'Certification Guidance & Learning Pathways',
    'Knowledge Sharing Sessions & Agent Demos',
    'Agentic AI Use Case Discovery & Prioritization',
    'Prototype Builds and Showcases',
    'Reusable Agent Accelerators & Asset Library',
    'Expert Connect, Guest Speakers & Mentorship',
  ],

  whyJoin: [
    'Be at the forefront of AI innovation on the QBE account',
    'Learn from hands-on practitioners and AI thought leaders',
    'Access curated learning content, tools, and accelerators',
    'Contribute to real PoCs and delivery use cases',
    'Grow your AI skills and earn recognition for contributions',
    'Network with peers across QBE NA workstreams',
    'Shape how Agentic AI is adopted across the account',
  ],

  roadmap: [
    {
      badge: '🏆 Accenture Reinvention Program — Agentic AI',
      category: 'Complete all 3 to earn Badge / Certificate',
      items: [
        { num: '1.', title: 'Agentic QA', desc: 'Complete the Agentic QA learning module covering AI-driven test automation, agent-based quality workflows, and intelligent defect analysis.' },
        { num: '2.', title: 'Agentic AI Workshop', desc: 'Attend and complete the hands-on Agentic AI workshop — covering agent design, orchestration patterns, and practical use case delivery.' },
        { num: '3.', title: 'Stanford Course', desc: 'Complete the Stanford-accredited Agentic AI course covering foundational AI principles, LLM applications, and enterprise agent deployment.' },
      ],
    },
    {
      badge: '🎓 Accenture FDE — Forward Deploy Engineer Certification',
      category: 'FDE Certification',
      items: [
        { title: 'Forward Deploy Engineer (FDE) — Anthropic', desc: 'Earn the Accenture FDE certification by demonstrating hands-on expertise in deploying and operationalizing AI solutions — validating capability to deliver forward-deployed agentic AI in enterprise environments.' },
      ],
    },
    {
      badge: '🤖 Accenture GenWizard — Agentic AI Capability Building',
      category: 'GenWizard',
      items: [
        { title: 'Agentic AI Learning via GenWizard Tool', desc: 'Leverage Accenture\'s GenWizard platform to explore agentic AI capabilities, complete guided learning journeys, and build hands-on familiarity with enterprise AI tooling.' },
      ],
    },
  ],

  learningTracks: [
    { track: 'Agentic AI Fundamentals', level: 'Beginner',      focusAreas: ['Prompt Engineering', 'Agent Concepts', 'LLM Basics'],                     certifications: ['Claude AI Foundations', 'Anthropic Certifications'] },
    { track: 'Automation & Orchestration', level: 'Intermediate', focusAreas: ['Multi-agent Workflows', 'Tool Use', 'API Integration'],                  certifications: ['LangChain', 'AutoGen', 'CrewAI Learning Paths'] },
    { track: 'AI Solution Design',         level: 'Advanced',     focusAreas: ['Agentic Architecture', 'Safety & Governance', 'RAG'],                    certifications: ['AWS/Azure AI Certifications', 'Solution Architect'] },
    { track: 'Enterprise AI Delivery',     level: 'Expert',       focusAreas: ['AI at Scale', 'MLOps', 'Responsible AI'],                               certifications: ['Google Cloud AI', 'Accenture AI Certifications'] },
  ],

  focusAreas: [
    { title: 'Claims Automation',            desc: 'Agentic workflows for claim triage, document extraction, and adjuster assist using Guidewire ClaimCenter.' },
    { title: 'Integration Intelligence',     desc: 'AI-assisted reconciliation, postback validation, and anomaly detection across Worldpay and Majesco integrations.' },
    { title: 'SDLC Acceleration',            desc: 'GenAI-powered code review, unit test generation, and documentation agents embedded in the delivery lifecycle.' },
    { title: 'Policy & Underwriting Insights', desc: 'Intelligent summarization, risk flag detection, and workflow automation across MSL and EzSuite workstreams.' },
  ],

  leadership: [
    {
      name: 'Madhvan Gopalan',
      initials: 'MG',
      photo: `${BASE}madhvan.jpg`,
      badge: 'Co-Sponsor',
      role: 'Co-Sponsor and Global CAL for QBE',
      badgeStyle: 'sponsor' as 'sponsor' | 'global' | 'cop',
      email: 'madhvan.gopalan@accenture.com',
    },
    {
      name: 'Ashish Nageet',
      initials: 'AN',
      badge: 'Co-Sponsor',
      role: 'Co-Sponsor — Agentic AI CoP',
      badgeStyle: 'sponsor' as 'sponsor' | 'global' | 'cop',
      email: 'ashish.nageet@accenture.com',
    },
    {
      name: 'Priti Ranjit Das',
      initials: 'PR',
      badge: 'Global Lead',
      role: 'Global Lead — Agentic AI CoP',
      badgeStyle: 'global' as 'sponsor' | 'global' | 'cop',
      email: 'Priti.ranjit.das@accenture.com',
    },
    {
      name: 'Jayesh Patel',
      initials: 'JP',
      badge: 'CoP Lead',
      role: 'CoP Lead — Agentic AI CoP',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'jayesh.g.patel@accenture.com',
    },
    {
      name: 'Srikar Deshpande',
      initials: 'SD',
      badge: 'CoP Lead',
      role: 'CoP Lead — Agentic AI CoP',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'srikar.rao.deshpande@accenture.com',
    },
  ],
  joinEmail: 'jayesh.g.patel@accenture.com',
  contactEmails: ['jayesh.g.patel@accenture.com', 'srikar.rao.deshpande@accenture.com'],
  members: [
    // ── Trained ──────────────────────────────────────────────
    { name: 'Sandhya Gadila',         initials: 'SG',  levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d', tags: ['GenAI', 'Prompt Eng'] },
    { name: 'Canchi Vaishnavi',       initials: 'CV',  levelLabel: 'Trained',      levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d', tags: ['GenAI'] },
    // ── Intermediate ─────────────────────────────────────────
    { name: 'RAGHURAM Pinninti',      initials: 'RP',  levelLabel: 'Intermediate', levelColor: '#2563eb', levelBg: '#dbeafe', levelText: '#1e3a8a', tags: ['LLM', 'Agents'] },
    { name: 'Shital Ramdas Gambhire', initials: 'SRG', levelLabel: 'Intermediate', levelColor: '#2563eb', levelBg: '#dbeafe', levelText: '#1e3a8a', tags: ['Azure AI', 'Prompt Eng'] },
    { name: 'Virat Chary',            initials: 'VC',  levelLabel: 'Intermediate', levelColor: '#2563eb', levelBg: '#dbeafe', levelText: '#1e3a8a', tags: ['RAG', 'LLM'] },
    // ── Certified ────────────────────────────────────────────
    { name: 'Ramya Nagamalla',        initials: 'RN',  levelLabel: 'Certified',    levelColor: '#A100FF', levelBg: '#F5E6FF', levelText: '#5700AB', tags: ['Agents', 'LLM', 'RAG'] },
    { name: 'Varun Reddy Dopathi',    initials: 'VRD', levelLabel: 'Certified',    levelColor: '#A100FF', levelBg: '#F5E6FF', levelText: '#5700AB', tags: ['Agents', 'GenAI'] },
    { name: 'Naveen Mallela',         initials: 'NM',  levelLabel: 'Certified',    levelColor: '#A100FF', levelBg: '#F5E6FF', levelText: '#5700AB', tags: ['Azure AI', 'Agents'] },
    { name: 'Pranav Pramod',          initials: 'PP',  levelLabel: 'Certified',    levelColor: '#A100FF', levelBg: '#F5E6FF', levelText: '#5700AB', tags: ['LLM', 'Prompt Eng'] },
    { name: 'Srikar Deshpande',       initials: 'SD',  levelLabel: 'Certified',    levelColor: '#A100FF', levelBg: '#F5E6FF', levelText: '#5700AB', tags: ['Agents', 'LLM', 'GenAI'] },
  ],
  events: [
    {
      day: 'TBC',
      month: 'Aug 2026',
      title: 'Agentic AI Fundamentals — Kickoff Session',
      desc: 'Introduction to AI agents, LLM fundamentals, and Agentic AI patterns relevant to QBE Account delivery.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#4F46E5',
    },
    {
      day: 'TBC',
      month: 'Sep 2026',
      title: 'Hands-On: Building AI Agents with Azure',
      desc: 'Practical workshop on building and deploying Agentic AI solutions using Azure AI Foundry and Copilot Studio.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#4F46E5',
    },
  ],
  joinInterests: ['General', 'LLM & Prompt Engineering', 'AI Agents', 'RAG & Retrieval', 'Azure AI', 'Responsible AI', 'Certifications'],
  certStages: [
    { num: 1, title: 'Trained', subtitle: 'Foundation training completed', count: 2, totalCohort: 10, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members who have completed foundational Agentic AI training.', trainings: 0 },
    { num: 2, title: 'Intermediate', subtitle: 'Intermediate certification in progress', count: 3, totalCohort: 10, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members building hands-on Agentic AI and LLM skills.', trainings: 0 },
    { num: 3, title: 'Certified', subtitle: 'Full certification achieved', count: 5, totalCohort: 10, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Members holding AI/Agentic AI certifications — domain champions.', trainings: 0 },
  ],
  spotlight: {
    title: 'Top SME',
    desc: 'Recognising our most active Agentic AI Subject Matter Experts.',
    names: ['Srikar Deshpande', 'Ramya Nagamalla', 'Pranav Pramod'],
  },
  celebrateLearning: {
    title: 'Agentic AI Learning Achievers',
    desc: 'Recognising outstanding commitment to Agentic AI professional development and certification excellence.',
    names: ['Srikar Deshpande', 'Ramya Nagamalla', 'Pranav Pramod'],
  },
}
