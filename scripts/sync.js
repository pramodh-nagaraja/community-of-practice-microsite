#!/usr/bin/env node
// scripts/sync.js
// Reads content/<id>/*.csv files and regenerates src/data/pages/<id>.ts
// Usage: node scripts/sync.js   (or npm run sync)

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT    = path.resolve(__dirname, '..')
const CONTENT = path.join(ROOT, 'content')
const PAGES   = path.join(ROOT, 'src', 'data', 'pages')

// All CoP IDs that use the generic CoPPage.tsx template (netsec uses App.tsx)
const ALL_GENERIC_IDS = [
  'cloud', 'testing', 'data-ai', 'database', 'microsoft',
  'mainframe', 'workday', 'integration', 'guidewire',
  'insurance', 'middleware', 'sre', 'service-mgmt',
]

// ── CSV parser (RFC 4180, handles quoted fields & embedded commas) ─
function parseLine(line) {
  const fields = []
  let field = ''
  let inQuote = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (!inQuote) {
        inQuote = true
      } else if (line[i + 1] === '"') {
        field += '"'; i++               // escaped double-quote
      } else {
        inQuote = false
      }
    } else if (ch === ',' && !inQuote) {
      fields.push(field); field = ''
    } else {
      field += ch
    }
  }
  fields.push(field)
  return fields
}

function parseCSV(text) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    .trim().split('\n').filter(l => l.trim())
  if (lines.length < 2) return []
  const headers = parseLine(lines[0]).map(h => h.trim())
  return lines.slice(1).map(line => {
    const values = parseLine(line)
    const row = {}
    headers.forEach((h, i) => { row[h] = (values[i] ?? '').trim() })
    return row
  })
}

function parseKV(text) {
  const kv = {}
  parseCSV(text).forEach(r => { if (r.key) kv[r.key] = r.value ?? '' })
  return kv
}

function readCSV(fp) { return fs.existsSync(fp) ? parseCSV(fs.readFileSync(fp, 'utf8')) : [] }
function readKV(fp)  { return fs.existsSync(fp) ? parseKV(fs.readFileSync(fp, 'utf8'))  : {} }

// ── Helpers ───────────────────────────────────────────────────────
// Escape a value as a single-quoted TypeScript string literal
function s(v) {
  return `'${String(v ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

// Convert string to number; return 0 if falsy
function n(v) { const x = Number(v); return isNaN(x) ? 0 : x }

// id → ExportName (e.g. 'data-ai' → 'DataAi_DATA', 'cloud' → 'Cloud_DATA')
function toExportName(id) {
  return id.replace(/(^|-)([a-z])/g, (_, _dash, c) => c.toUpperCase()) + '_DATA'
}

// ── Netsec special-case ───────────────────────────────────────────
function syncNetsec(dir) {
  const members    = readCSV(path.join(dir, 'members.csv'))
  const swNominees = readCSV(path.join(dir, 'sw_nominees.csv'))
  const events     = readCSV(path.join(dir, 'events.csv'))
  const leaders    = readCSV(path.join(dir, 'leadership.csv'))
  const lntTeam    = readCSV(path.join(dir, 'lnt_team.csv'))

  // Sort members: stage 3 first, then 2, then 1
  const sorted = [...members].sort((a, b) => Number(b.stage) - Number(a.stage))

  const memberLines = sorted.map(m =>
    `  { name: ${s(m.name)}, initials: ${s(m.initials)}, stage: ${m.stage} },`
  )

  const swLines = swNominees.map(m => {
    const ccnaVal = m.ccna_stage ? m.ccna_stage : 'null'
    return `  { name: ${s(m.name)}, initials: ${s(m.initials)}, sw_stage: 1, ccna: ${ccnaVal} },`
  })

  const eventLines = events.map(e => [
    `  {`,
    `    day: ${s(e.day)},`,
    `    month: ${s(e.month)},`,
    `    title: ${s(e.title)},`,
    `    desc: ${s(e.desc)},`,
    `    type: ${s(e.type)},`,
    `    time: ${s(e.time)},`,
    `    vendor: ${e.vendor ? s(e.vendor) : 'null'},`,
    `  },`,
  ].join('\n'))

  const leaderLines = leaders.map(l => [
    `  {`,
    `    name: ${s(l.name)},`,
    `    initials: ${s(l.initials)},`,
    `    photo: ${s(l.photo)},`,
    `    badge: ${s(l.badge)},`,
    `    role: ${s(l.role)},`,
    `    badgeStyle: ${s(l.badgeStyle)},`,
    `    email: ${s(l.email)},`,
    `  },`,
  ].join('\n'))

  const lntLines = lntTeam.map(t =>
    `  { name: ${s(t.name)}, initials: ${s(t.initials)}, email: ${s(t.email)} },`
  )

  const out = `\
// ═══════════════════════════════════════════════════════════════
//  Network & Security CoP — data file
//  Auto-generated from content/netsec/*.csv via \`npm run sync\`.
//  To update: edit the CSV files and re-run \`npm run sync\`.
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
${memberLines.join('\n')}
]

// ── Observability stream — SolarWinds nominees ─────────────────
// sw_stage 1 = Nominated  |  ccna: null/2/3 = cross-program CCNA stage
export const SW_NOMINEES: { name: string; initials: string; sw_stage: number; ccna: null | 2 | 3 }[] = [
${swLines.join('\n')}
]

// ── Upcoming events ─────────────────────────────────────────────
export const NETSEC_EVENTS: {
  day: string; month: string; title: string; desc: string
  type: string; time: string; vendor: 'dynatrace' | 'solarwinds' | null
}[] = [
${eventLines.join('\n')}
]

// ── Leadership team ─────────────────────────────────────────────
export const NETSEC_LEADERS: {
  name: string; initials: string; photo: string
  badge: string; role: string; badgeStyle: string; email: string
}[] = [
${leaderLines.join('\n')}
]

// ── Learning & Training POCs ────────────────────────────────────
export const NETSEC_LNT_TEAM: { name: string; initials: string; email: string }[] = [
${lntLines.join('\n')}
]
`

  fs.writeFileSync(path.join(PAGES, 'netsec.ts'), out, 'utf8')
  console.log(`  ✓ netsec.ts  (${sorted.length} members, ${swNominees.length} SW nominees, ${events.length} events)`)
}

// ── Level name → colour mapping (used by generic CoP member sync) ─
const LEVEL_MAP = {
  foundation: { label: 'Foundation Certified', color: '#16a34a', bg: '#dcfce7', text: '#14532d' },
  associate:  { label: 'Associate Certified',  color: '#2563eb', bg: '#dbeafe', text: '#1e3a8a' },
  expert:     { label: 'Expert Certified',      color: '#A100FF', bg: '#F5E6FF', text: '#5700AB' },
}

function resolveLevel(m) {
  // New format: level = 'Foundation' / 'Associate' / 'Expert'
  if (m.level) {
    const key = m.level.toLowerCase()
    const meta = LEVEL_MAP[key] || LEVEL_MAP.foundation
    return { label: meta.label, color: meta.color, bg: meta.bg, text: meta.text }
  }
  // Legacy format: explicit hex columns
  return { label: m.levelLabel || '', color: m.levelColor || '#A100FF', bg: m.levelBg || '#F5E6FF', text: m.levelText || '#5700AB' }
}

// badge column text → badgeStyle token
function resolveBadgeStyle(l) {
  if (l.badgeStyle) return l.badgeStyle   // explicit column takes priority
  const b = (l.badge || '').toLowerCase()
  if (b.includes('sponsor')) return 'sponsor'
  if (b.includes('global'))  return 'global'
  return 'cop'
}

// ── Generic CoP sync ──────────────────────────────────────────────
function syncGenericCoP(id, dir) {
  const pagePath = path.join(dir, 'page.csv')
  if (!fs.existsSync(pagePath)) {
    console.log(`  -  ${id}: no page.csv — skipping`)
    return false
  }

  const page    = readKV(pagePath)
  const members = readCSV(path.join(dir, 'members.csv'))
  const events  = readCSV(path.join(dir, 'events.csv'))
  const leaders = readCSV(path.join(dir, 'leadership.csv'))

  const exportName = toExportName(id)
  const accent     = page.accentColor || '#A100FF'

  const memberLines = members.map(m => {
    const lv = resolveLevel(m)
    return [
      `    {`,
      `      name: ${s(m.name)},`,
      `      initials: ${s(m.initials)},`,
      `      levelLabel: ${s(lv.label)},`,
      `      levelColor: ${s(lv.color)},`,
      `      levelBg: ${s(lv.bg)},`,
      `      levelText: ${s(lv.text)},`,
      `    },`,
    ].join('\n')
  })

  const eventLines = events.map(e => [
    `    {`,
    `      day: ${s(e.day)},`,
    `      month: ${s(e.month)},`,
    `      title: ${s(e.title)},`,
    `      desc: ${s(e.desc)},`,
    `      type: ${s(e.type)},`,
    `      time: ${s(e.time)},`,
    `      accentColor: ${s(e.accentColor || accent)},`,
    `    },`,
  ].join('\n'))

  const leaderLines = leaders.map(l => {
    const badgeStyle = resolveBadgeStyle(l)
    const lines = [
      `    {`,
      `      name: ${s(l.name)},`,
      `      initials: ${s(l.initials)},`,
    ]
    if (l.photo) lines.push(`      photo: ${s(l.photo)},`)
    lines.push(
      `      badge: ${s(l.badge)},`,
      `      role: ${s(l.role)},`,
      `      badgeStyle: ${s(badgeStyle)} as 'sponsor' | 'global' | 'cop',`,
      `      email: ${s(l.email)},`,
      `    },`,
    )
    return lines.join('\n')
  })

  const interests = page.joinInterests
    ? page.joinInterests.split('|').map(i => s(i.trim())).join(', ')
    : null

  // Optional stat fields — only emit when present in CSV
  const stats = []
  if (page.certCount)    stats.push(`  certCount: ${n(page.certCount)},`)
  if (page.sessionsHeld) stats.push(`  sessionsHeld: ${n(page.sessionsHeld)},`)
  if (page.launchYear)   stats.push(`  launchYear: ${n(page.launchYear)},`)

  // Optional array sections — only emit when CSV rows exist
  const sections = []
  if (members.length) sections.push(`  members: [\n${memberLines.join('\n')}\n  ],`)
  if (events.length)  sections.push(`  events: [\n${eventLines.join('\n')}\n  ],`)
  if (interests)      sections.push(`  joinInterests: [${interests}],`)

  const out = `\
// ═══════════════════════════════════════════════════════════════
//  ${page.name || id} CoP — data file
//  Auto-generated from content/${id}/*.csv via \`npm run sync\`.
//  To update: edit the CSV files and re-run \`npm run sync\`.
// ═══════════════════════════════════════════════════════════════
import type { CoPPageData } from '../types'

export const ${exportName}: CoPPageData = {
  id: ${s(id)},
  name: ${s(page.name || '')},
  tagline: ${s(page.tagline || '')},
  description: ${s(page.description || '')},
  accentColor: ${s(accent)},
  icon: ${s(page.icon || '/icon.png')},
  memberCount: ${n(page.memberCount)},
${stats.join('\n')}
  mission: ${s(page.mission || '')},
  vision: ${s(page.vision || '')},
  values: ${s(page.values || '')},
  leadership: [
${leaderLines.join('\n')}
  ],
  joinEmail: ${s(page.joinEmail || '')},
${sections.join('\n')}
}
`

  fs.writeFileSync(path.join(PAGES, `${id}.ts`), out, 'utf8')
  console.log(`  ✓ ${id}.ts  (${members.length} members, ${events.length} events, ${leaders.length} leaders)`)
  return true
}

// ── Regenerate src/data/pages/index.ts ───────────────────────────
function updateIndex(activeIds) {
  const activeSet = new Set(activeIds)

  const importLines = ALL_GENERIC_IDS.map(id => {
    const name = toExportName(id)
    const line = `import { ${name} } from './${id}'`
    return activeSet.has(id) ? line : `// ${line}`
  })

  const entryLines = ALL_GENERIC_IDS.map(id => {
    const name = toExportName(id)
    const line = `  '${id}': ${name},`
    return activeSet.has(id) ? line : `  // ${line}`
  })

  const out = `\
// ═══════════════════════════════════════════════════════════════
//  CoP Page Registry
//
//  To activate a new CoP page:
//    1. Fill in content/<cop-id>/*.csv
//    2. Run:  npm run sync          (generates src/data/pages/<id>.ts)
//    3. Commit and push — GitHub Actions handles build + deploy
// ═══════════════════════════════════════════════════════════════
import type { CoPPageData } from '../types'

// ── CoP imports (auto-managed by sync.js) ────────────────────────
${importLines.join('\n')}

// ── Registry — maps CoP id → CoPPageData ────────────────────────
// NOTE: 'noc' (Network & Security + Observability) uses App.tsx,
//       handled separately in main.tsx.
export const COP_DATA: Record<string, CoPPageData> = {
${entryLines.join('\n')}
}
`

  fs.writeFileSync(path.join(PAGES, 'index.ts'), out, 'utf8')
  console.log(`  ✓ index.ts  (${activeIds.length} active generic CoP${activeIds.length !== 1 ? 's' : ''})`)
}

// ── Main ──────────────────────────────────────────────────────────
const contentDirs = fs.readdirSync(CONTENT)
  .filter(f => f !== '_template' && fs.statSync(path.join(CONTENT, f)).isDirectory())
  .sort()

console.log(`\nSyncing ${contentDirs.length} content folder(s)…\n`)

const activeGeneric = []

for (const id of contentDirs) {
  const dir = path.join(CONTENT, id)
  if (id === 'netsec') {
    syncNetsec(dir)
  } else {
    if (syncGenericCoP(id, dir)) activeGeneric.push(id)
  }
}

updateIndex(activeGeneric)

console.log('\nSync complete.\n')
