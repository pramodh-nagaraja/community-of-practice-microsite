// ═══════════════════════════════════════════════════════════════
//  Data and AI CoP — data file
//  Auto-generated from content/data-databricks/*.csv via `npm run sync`.
//  To update: edit the CSV files and re-run `npm run sync`.
// ═══════════════════════════════════════════════════════════════
import type { CoPPageData } from '../types'

const BASE = import.meta.env.BASE_URL

// Level presets — reused across members
const TRAINED   = { levelLabel: 'Trained',   levelColor: '#16a34a', levelBg: '#dcfce7', levelText: '#14532d' }
const CERTIFIED = { levelLabel: 'Certified', levelColor: '#A100FF', levelBg: '#F5E6FF', levelText: '#5700AB' }
const DBX = 'Databricks DE Associate'   // Databricks Certified Data Engineer Associate

export const DataDatabricks_DATA: CoPPageData = {
  id: 'data-databricks',
  name: 'Data and AI',
  tagline: 'Harnessing data engineering, analytics, and Databricks to power QBE\'s decisions.',
  description: 'Harnessing data engineering, analytics, and Databricks expertise to power QBE\'s decisions.',
  accentColor: '#5B21B6',
  icon: `${BASE}Data_and_AI.png`,
  memberCount: 31,
  certCount: 15,
  sessionsHeld: 0,
  launchYear: 2026,
  mission: 'To build data engineering and Databricks capability across QBE Account enabling data-driven decisions, advanced analytics, and responsible AI adoption.',
  vision: 'To make QBE Account a data-fluent organisation where insights are trusted, Databricks expertise is embedded, and every decision is underpinned by quality data.',
  values: 'Data integrity, Databricks expertise, and a curiosity-driven approach to turning data into meaningful insights for QBE\'s business.',
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
      name: 'Name 1',
      initials: 'N1',
      badge: 'Global Lead',
      role: 'Global Lead — To Be Confirmed',
      badgeStyle: 'global' as 'sponsor' | 'global' | 'cop',
      email: 'tbd@accenture.com',
    },
    {
      name: 'Shashank Johari',
      initials: 'SJ',
      badge: 'CoP Lead',
      role: 'CoP Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 's.a.kumar.johari@accenture.com',
    },
    {
      name: 'Priya Kanu Singh',
      initials: 'PKS',
      badge: 'CoP Lead',
      role: 'CoP Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'kanu.priya.singh@accenture.com',
    },
    {
      name: 'Srikar Rao Deshpande',
      initials: 'SRD',
      badge: 'CoP Lead',
      role: 'CoP Lead',
      badgeStyle: 'cop' as 'sponsor' | 'global' | 'cop',
      email: 'srikar.rao.deshpande@accenture.com',
    },
  ],
  joinEmail: 's.a.kumar.johari@accenture.com',
  members: [
    // ── Databricks Certified Data Engineer Associates ──
    { name: 'Kirankumar Dalei',          initials: 'KD', ...CERTIFIED, tags: [DBX] },
    { name: 'Praveen Tayappa',           initials: 'PT', ...CERTIFIED, tags: [DBX] },
    { name: 'Snehavalli Gadamsetty',     initials: 'SG', ...CERTIFIED, tags: [DBX] },
    { name: 'Aishwarya V S',             initials: 'AV', ...CERTIFIED, tags: [DBX] },
    { name: 'Dodle Bhavani Shanker',     initials: 'DS', ...CERTIFIED, tags: [DBX] },
    { name: 'Rakshanda Tarekar',         initials: 'RT', ...CERTIFIED, tags: [DBX] },
    { name: 'Supraja Repakula',          initials: 'SR', ...CERTIFIED, tags: [DBX] },
    { name: 'Chetan Singamsetty',        initials: 'CS', ...CERTIFIED, tags: [DBX] },
    { name: 'Bhuvan Suhas Yadati',       initials: 'BY', ...CERTIFIED, tags: [DBX] },
    { name: 'Manisha Sharma',            initials: 'MS', ...CERTIFIED, tags: [DBX] },
    { name: 'Shruthi Sudevan',           initials: 'SS', ...CERTIFIED, tags: [DBX] },
    { name: 'Manasa Reddy',              initials: 'MR', ...CERTIFIED, tags: [DBX] },
    { name: 'Shashank Manjunath',        initials: 'SM', ...CERTIFIED, tags: [DBX] },
    { name: 'Rounak Saha',               initials: 'RS', ...CERTIFIED, tags: [DBX] },
    { name: 'Surya Gayatri Namburu',     initials: 'SN', ...CERTIFIED, tags: [DBX] },
    // ── Members building toward certification ──
    { name: 'Prasanna N. Bhat',          initials: 'PB', ...TRAINED },
    { name: 'Prajwal Hp',                initials: 'PH', ...TRAINED },
    { name: 'Vidya Ravi',                initials: 'VR', ...TRAINED },
    { name: 'Shakshi Agarwal',           initials: 'SA', ...TRAINED },
    { name: 'Naveen Kumar Mani',         initials: 'NM', ...TRAINED },
    { name: 'Sanjay Chhetri',            initials: 'SC', ...TRAINED },
    { name: 'Vishal Bhat',               initials: 'VB', ...TRAINED },
    { name: 'Hima Bindhu Singapaka',     initials: 'HS', ...TRAINED },
    { name: 'Revathi Naralashetty',      initials: 'RN', ...TRAINED },
    { name: 'Aanchal Garg',              initials: 'AG', ...TRAINED },
    { name: 'Yuvaraj Gokul',             initials: 'YG', ...TRAINED },
    { name: 'Nitika Gupta',              initials: 'NG', ...TRAINED },
    { name: 'Kadambini Jain',            initials: 'KJ', ...TRAINED },
    { name: 'Mahesh Yarlagadda',         initials: 'MY', ...TRAINED },
    { name: 'Pradeep Sashi',             initials: 'PS', ...TRAINED },
    { name: 'Raghavendra Suryakanthappa',initials: 'RS', ...TRAINED },
  ],
  events: [
    {
      day: 'TBC',
      month: 'Jun 2026',
      title: 'Data Engineering at QBE',
      desc: 'Overview of the data platform architecture and pipelines powering QBE\'s analytics capabilities.',
      type: 'Knowledge Share',
      time: 'TBC',
      accentColor: '#7c3aed',
    },
    {
      day: 'TBC',
      month: 'Jul 2026',
      title: 'Generative AI & Responsible Use',
      desc: 'Workshop on practical generative AI use cases and Accenture\'s responsible AI framework applied to QBE.',
      type: 'Workshop',
      time: 'TBC',
      accentColor: '#7c3aed',
    },
  ],
  joinInterests: ['General', 'Data Engineering', 'Databricks', 'Machine Learning', 'Analytics', 'Generative AI', 'Azure AI', 'Certifications'],
  certStages: [
    { num: 1, title: 'Trained', subtitle: 'Foundation training completed', count: 16, totalCohort: 31, color: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Members active in the Data & AI CoP and building toward Databricks certification.', trainings: 0 },
    { num: 2, title: 'Intermediate', subtitle: 'Advanced certification in progress', count: 0, totalCohort: 31, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Members progressing toward advanced Databricks and AI certifications.', trainings: 0 },
    { num: 3, title: 'Certified', subtitle: 'Databricks Certified Data Engineers', count: 15, totalCohort: 31, color: '#A100FF', bg: '#F5E6FF', border: '#d8b4fe', desc: 'Databricks Certified Data Engineer Associates — our certified data engineering champions.', trainings: 0 },
  ],
  spotlight: {
    title: 'Databricks Certified Data Engineers',
    desc: 'Celebrating our 15 Databricks Certified Data Engineer Associates.',
    names: [
      'Kirankumar Dalei', 'Praveen Tayappa', 'Snehavalli Gadamsetty', 'Aishwarya V S', 'Dodle Bhavani Shanker',
      'Rakshanda Tarekar', 'Supraja Repakula', 'Chetan Singamsetty', 'Bhuvan Suhas Yadati', 'Manisha Sharma',
      'Shruthi Sudevan', 'Manasa Reddy', 'Shashank Manjunath', 'Rounak Saha', 'Surya Gayatri Namburu',
    ],
  },
  celebrateLearning: {
    title: 'Data and AI Learning Achievers',
    desc: 'recognising outstanding commitment to data engineering and Databricks certification excellence.',
    names: ['Kirankumar Dalei', 'Manisha Sharma', 'Shruthi Sudevan', 'Shashank Manjunath', 'Supraja Repakula', 'Rounak Saha'],
  },
}
