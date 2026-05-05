import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './LandingPage'
import App        from './App'
import CoPPage    from './CoPPage'
import { COMMUNITIES } from './data/communities'
import { COP_DATA }    from './data/pages/index'

// ═══════════════════════════════════════════════════════════════
//  Hash-based router — no server config required.
//
//  Routing logic:
//    /          → LandingPage (hub)
//    /noc       → App (N&O rich custom page)
//    /<cop-id>  → CoPPage with that CoP's data (if registered in COP_DATA)
//    anything else → LandingPage
//
//  To activate a new CoP page:
//    1. Fill in content/<cop-id>/*.csv
//    2. Run:  npm run sync
//    3. Uncomment in src/data/pages/index.ts
//    4. Set status: 'active' in src/data/communities.ts
// ═══════════════════════════════════════════════════════════════

function Root() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const sync = () => setHash(window.location.hash)
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const route = hash.replace(/^#\/?/, '')

  // N&O CoP — premium custom page (App.tsx)
  if (route === 'noc') return <App />

  // Any other active CoP registered in COP_DATA
  if (route && COP_DATA[route]) {
    return <CoPPage data={COP_DATA[route]} />
  }

  // Look up by community route for any active CoP
  const cop = COMMUNITIES.find(c => c.route === `#/${route}` && c.status === 'active')
  if (cop && COP_DATA[cop.id]) {
    return <CoPPage data={COP_DATA[cop.id]} />
  }

  return <LandingPage />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
