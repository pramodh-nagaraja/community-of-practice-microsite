// ═══════════════════════════════════════════════════════════════
//  CoP Page Registry
//
//  To activate a new CoP page:
//    1. Fill in content/<cop-id>/*.csv
//    2. Run:  npm run sync          (generates src/data/pages/<id>.ts)
//    3. Commit and push — GitHub Actions handles build + deploy
// ═══════════════════════════════════════════════════════════════
import type { CoPPageData } from '../types'

// ── CoP imports ─────────────────────────────────────────────────
import { Workday_DATA }     from './workday'
import { Integration_DATA } from './integration'
import { Guidewire_DATA }   from './guidewire'
import { Insurance_DATA }   from './insurance'
import { Microsoft_DATA }   from './microsoft'
import { Cloud_DATA }       from './cloud'
import { Testing_DATA }     from './testing'
import { DataAi_DATA }      from './data-ai'
import { Database_DATA }    from './database'
import { Middleware_DATA }  from './middleware'
import { Sre_DATA }         from './sre'
import { ServiceMgmt_DATA } from './service-mgmt'

// ── Registry — maps CoP id → CoPPageData ────────────────────────
// NOTE: 'noc' (Network & Security + Observability) uses App.tsx,
//       handled separately in main.tsx.
export const COP_DATA: Record<string, CoPPageData> = {
  'workday':       Workday_DATA,
  'integration':   Integration_DATA,
  'guidewire':     Guidewire_DATA,
  'insurance':     Insurance_DATA,
  'microsoft':     Microsoft_DATA,
  'cloud':         Cloud_DATA,
  'testing':       Testing_DATA,
  'data-ai':       DataAi_DATA,
  'database':      Database_DATA,
  'middleware':    Middleware_DATA,
  'sre':           Sre_DATA,
  'service-mgmt':  ServiceMgmt_DATA,
}
