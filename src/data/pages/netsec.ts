// ═══════════════════════════════════════════════════════════════
//  Network & Security CoP — data file
//  Auto-generated from content/netsec/*.csv via `npm run sync`.
//  To update: edit the CSV files and re-run `npm run sync`.
// ═══════════════════════════════════════════════════════════════

// ── Avatar colour palettes ──────────────────────────────────────
export const AVATAR_COLORS = [
  '#A100FF', '#7500C0', '#5700AB', '#C940FF', '#8B00E0',
  '#6200CC', '#9000E8', '#B822FF', '#6A00B8', '#D060FF',
]

export const SW_COLORS = [
  '#E85D00', '#FF6B1A', '#CC5200', '#FF8533', '#D94F00',
  '#FF7A00', '#B34500', '#FF9933', '#C75A00', '#FF7000', '#E06000',
]

// ── Stage metadata (certification levels) ──────────────────────
export const STAGE_META = {
  1: { label: 'Foundation Certified', short: 'Foundation', color: '#16a34a', bg: '#dcfce7', text: '#14532d' },
  2: { label: 'CCNA Boot Camp',       short: 'Boot Camp',  color: '#2563eb', bg: '#dbeafe', text: '#1e3a8a' },
  3: { label: 'CCNA Eligible',        short: 'CCNA ✓',     color: '#A100FF', bg: '#F5E6FF', text: '#5700AB' },
} as const

// ── Network stream — CCNA certification members ─────────────────
// stage 3 = CCNA Eligible  |  stage 2 = CCNA Boot Camp  |  stage 1 = Foundation
export const MEMBERS: { name: string; initials: string; stage: 1 | 2 | 3 }[] = [
  { name: 'Akanksha Bisht', initials: 'AB', stage: 3 },
  { name: 'Akhila G M', initials: 'AM', stage: 3 },
  { name: 'Amit Tiwari', initials: 'AT', stage: 3 },
  { name: 'Arthi Krishna', initials: 'AK', stage: 3 },
  { name: 'Koteswararao Bodapati', initials: 'KB', stage: 3 },
  { name: 'Kuldeep Rajpoot', initials: 'KP', stage: 3 },
  { name: 'Mohd Adil Munaf Shaikh', initials: 'MS', stage: 3 },
  { name: 'Shaik Zubair Ahmed', initials: 'SZ', stage: 3 },
  { name: 'Syed Ateeb Ahmed', initials: 'SA', stage: 3 },
  { name: 'Jamunadevi L Saral', initials: 'JS', stage: 2 },
  { name: 'Kanthi Kiran Chinthapally', initials: 'KC', stage: 2 },
  { name: 'Sujata Misra', initials: 'SM', stage: 2 },
  { name: 'V. Devathi', initials: 'VD', stage: 2 },
  { name: 'Varshini Natrajan', initials: 'VN', stage: 2 },
  { name: 'Vijay Kumar Venkata Seshu Hejeeb', initials: 'VK', stage: 2 },
  { name: 'Vinay Kumar Hiremath', initials: 'VH', stage: 2 },
  { name: 'Vishal Bhat', initials: 'VB', stage: 2 },
  { name: 'Bhavatharini Prakash', initials: 'BP', stage: 1 },
  { name: 'Bhuvaneshwari Durai', initials: 'BD', stage: 1 },
  { name: 'Christian Larano', initials: 'CL', stage: 1 },
  { name: 'John A. A. Volante Jr', initials: 'JV', stage: 1 },
  { name: 'Kaseeswar Reddy', initials: 'KR', stage: 1 },
  { name: 'Kathleen P. Sayaman', initials: 'KS', stage: 1 },
  { name: 'Mejela Gojol', initials: 'MG', stage: 1 },
  { name: 'Mukesh Mishra', initials: 'MM', stage: 1 },
  { name: 'Paras Bhargava', initials: 'PB', stage: 1 },
  { name: 'Parul A. Gulati', initials: 'PG', stage: 1 },
  { name: 'Pawan Narayan', initials: 'PW', stage: 1 },
  { name: 'Ravi Chandra Bathini', initials: 'RB', stage: 1 },
  { name: 'Sree Arvintha Rajamohan', initials: 'SR', stage: 1 },
  { name: 'Suraj Jadhav', initials: 'SJ', stage: 1 },
  { name: 'Vaibhav Suneja', initials: 'VS', stage: 1 },
  { name: 'Vallabharao Anguru', initials: 'VA', stage: 1 },
  { name: 'Winiston Jose', initials: 'WJ', stage: 1 },
]

// ── Observability stream — SolarWinds nominees ─────────────────
// sw_stage 1 = Nominated  |  ccna: null/2/3 = cross-program CCNA stage
export const SW_NOMINEES: { name: string; initials: string; sw_stage: number; ccna: null | 2 | 3 }[] = [
  { name: 'Joseph Ricablanca', initials: 'JR', sw_stage: 1, ccna: null },
  { name: 'M. Salazar-Dimapilis', initials: 'MS', sw_stage: 1, ccna: null },
  { name: 'Sunil Kumar Singotam', initials: 'SK', sw_stage: 1, ccna: null },
  { name: 'Gayathri T S', initials: 'GT', sw_stage: 1, ccna: null },
  { name: 'Kishan A Venkatesh', initials: 'KV', sw_stage: 1, ccna: null },
  { name: 'Varshini Natrajan', initials: 'VN', sw_stage: 1, ccna: 2 },
  { name: 'Arthi Krishna', initials: 'AK', sw_stage: 1, ccna: 3 },
  { name: 'V. Korrapati', initials: 'VK', sw_stage: 1, ccna: null },
  { name: 'Sarath Ramalingam', initials: 'SR', sw_stage: 1, ccna: null },
  { name: 'Dhivya Pradeepa S R', initials: 'DP', sw_stage: 1, ccna: null },
  { name: 'Pratyusha Inaganti', initials: 'PI', sw_stage: 1, ccna: null },
]

// ── Upcoming events ─────────────────────────────────────────────
export const NETSEC_EVENTS: {
  day: string; month: string; title: string; desc: string
  type: string; time: string; vendor: 'dynatrace' | 'solarwinds' | null
}[] = [
  {
    day: '29',
    month: 'Apr 2026',
    title: 'Case Study: Ford Finance on Dynatrace',
    desc: 'Guest presentation by Ford Finance on measuring Customer KPIs using Dynatrace — real-world insights into observability-driven business outcomes.',
    type: 'Case Study',
    time: 'TBC',
    vendor: 'dynatrace',
  },
  {
    day: '11',
    month: 'May 11–12 2026',
    title: 'SolarWinds Boot Camp',
    desc: 'Intensive two-day boot camp for SolarWinds Certification Program nominees — hands-on labs covering NPM, IPAM, and observability tooling.',
    type: 'Boot Camp',
    time: 'All Day · 2 Days',
    vendor: 'solarwinds',
  },
]

// ── Leadership team ─────────────────────────────────────────────
const BASE = import.meta.env.BASE_URL

export const NETSEC_LEADERS: {
  name: string; initials: string; photo: string
  badge: string; role: string; badgeStyle: string; email: string
}[] = [
  {
    name: 'Madhvan Gopalan',
    initials: 'MG',
    photo: `${BASE}madhvan.jpg`,
    badge: 'Executive Sponsor',
    role: 'Executive Sponsor and Global CAL for QBE',
    badgeStyle: 'badge-sponsor',
    email: 'madhvan.gopalan@accenture.com',
  },
  {
    name: 'Priti Ranjit Das',
    initials: 'PR',
    photo: `${BASE}Priti.jpg`,
    badge: 'Global Lead',
    role: 'Global Infrastructure Lead',
    badgeStyle: 'badge-global',
    email: 'priti.ranjit.das@accenture.com',
  },
  {
    name: 'Pramodh Nagaraja',
    initials: 'PN',
    photo: `${BASE}Pramodh.jpg`,
    badge: 'CoP Lead',
    role: 'Infra Delivery Lead and CoP Network',
    badgeStyle: 'badge-cop',
    email: 'pramodh.nagaraja@accenture.com',
  },
]

// ── Learning & Training POCs ────────────────────────────────────
export const NETSEC_LNT_TEAM: { name: string; initials: string; email: string }[] = [
  { name: 'A.G. Swaminathan', initials: 'AS', email: 'a.g.swaminathan@accenture.com' },
  { name: 'Hemavathy T M', initials: 'HT', email: 'hemavathy.t.m@accenture.com' },
  { name: 'H. Anil Agrawal', initials: 'HA', email: 'h.anil.agrawal@accenture.com' },
]
