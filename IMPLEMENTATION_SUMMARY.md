# CoP Join Request Auto-Add Implementation Summary

I've built the complete backend infrastructure for auto-adding members to community pages and notifying CoP Leads. Here's what's been implemented:

## What's New

### Azure Functions (`/api` directory)
- **`joinCommunity`** — HTTP-triggered function that processes join requests
  - Accepts POST requests at `/api/joinCommunity/{communityId}`
  - Validates input and stores member in Azure Table Storage
  - Sends email notification to CoP Lead
  - Sends welcome email to the member

### Frontend Updates (`CoPTemplate.tsx`)
- Join form now submits to Azure Function instead of mailto
- Shows loading state and success/error messages
- Clears form after successful submission
- Better UX with immediate feedback

### Infrastructure Files
- `staticwebapp.config.json` — Routes API calls correctly in Azure Static Web Apps
- `.github/workflows/azure-static-web-apps-icy-beach-0cd68d000.yml` — Updated to build & deploy functions
- `SETUP_AZURE_RESOURCES.md` — Complete Azure setup guide
- `api/README.md` — API documentation and local development guide

## Setup Checklist

Before the feature works, you need to complete these steps (in order):

### Phase 1: Azure Resources (One-time setup)
- [ ] Create Azure Storage Account for member data
- [ ] Create Table Storage (`CoPMembers` table)
- [ ] Set up email provider (Gmail with App Password OR SendGrid)
- [ ] Note connection strings and credentials

### Phase 2: GitHub Secrets
In your GitHub repo settings, add these secrets:
- [ ] `AZURE_STORAGE_ACCOUNT_CONNECTION_STRING`
- [ ] `SMTP_HOST` (smtp.gmail.com or smtp.sendgrid.net)
- [ ] `SMTP_PORT` (587)
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS` (Gmail App Password or SendGrid API key)
- [ ] `FROM_EMAIL`

### Phase 3: Azure Function Configuration
In Azure Portal → Static Web App → Function App → Configuration:
- [ ] Add all SMTP settings as Application Settings
- [ ] Add Storage Account connection string
- [ ] Mark sensitive values (SMTP_PASS) as "always off"

### Phase 4: Update CoP Lead Info
In `api/joinCommunity/index.ts`, update the `COMMUNITIES` object:
```typescript
const COMMUNITIES: Record<string, { name: string; leadEmail: string; leadName: string }> = {
  // For each active CoP, add the lead's email and name
  'netsec': { 
    name: 'Network & Security', 
    leadEmail: 'pramodh.nagaraja@accenture.com',
    leadName: 'Pramodh Nagaraja'
  },
  // ... add others
}
```

Currently configured:
- ✅ `netsec` — Pramodh Nagaraja
- ✅ `observability` — Pramodh Nagaraja
- ✅ `insurance` — Ramya Nagamalla
- ✅ `sre` — Ramya Nagamalla
- ⚠️ Others marked as TBD (configure when ready)

## How It Works

1. **User Flow:**
   - User fills "Join CoP" form on community page
   - Clicks "Submit Request"
   - Form posts to Azure Function

2. **Backend Flow:**
   - Function validates fields
   - Stores member record in Table Storage (partition: communityId, row: email-timestamp)
   - Sends email to CoP Lead with member details
   - Sends welcome email to member
   - Returns success message

3. **CoP Lead Flow:**
   - Receives email with member details
   - Reviews and reaches out to member
   - (Optional) Marks member as approved in Table Storage
   - Can later be exported/synced to members list

## Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| Azure Function | ✅ Complete | Code written, ready to deploy |
| Frontend Integration | ✅ Complete | React component updated |
| GitHub Actions | ✅ Complete | Workflow updated to build/deploy functions |
| Azure Resources | ⏳ Pending | User must create (see SETUP_AZURE_RESOURCES.md) |
| Email Config | ⏳ Pending | User must configure SMTP provider |
| CoP Lead Info | ⏳ Pending | User must update api/joinCommunity/index.ts |

## Testing Locally

After Phase 1 & 2 setup, test locally:

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Azure Functions
cd api
npm install
npm run build
func start
```

The app will be at `http://localhost:5173` (or similar)
Functions at `http://localhost:7071/api/joinCommunity/{communityId}`

Test with curl:
```bash
curl -X POST http://localhost:7071/api/joinCommunity/netsec \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "Senior Developer",
    "interest": "General",
    "note": "Interested in CCNA track"
  }'
```

## File Structure

```
.
├── api/                              # Azure Functions
│   ├── joinCommunity/
│   │   ├── index.ts                 # Main function logic
│   │   └── function.json            # Bindings config
│   ├── shared/
│   │   ├── storage.ts              # Table Storage operations
│   │   └── email.ts                # Email sending
│   ├── package.json
│   ├── tsconfig.json
│   ├── host.json
│   ├── local.settings.json          # Local dev config
│   └── README.md
├── src/CoPTemplate.tsx              # Updated join form
├── staticwebapp.config.json         # Azure SWA routing
├── SETUP_AZURE_RESOURCES.md         # Step-by-step setup guide
└── IMPLEMENTATION_SUMMARY.md        # This file
```

## Next Steps

1. **Read:** [SETUP_AZURE_RESOURCES.md](SETUP_AZURE_RESOURCES.md) for detailed Azure setup
2. **Configure:** CoP Lead emails in `api/joinCommunity/index.ts`
3. **Test:** Locally following the "Testing Locally" section above
4. **Deploy:** Push to main branch and watch GitHub Actions deploy

## Rollback

If you need to revert to email-based requests:
- The code change in `CoPTemplate.tsx` can be reverted to use `mailto:` links
- Azure resources can be deleted anytime without affecting the frontend
- No breaking changes to existing data or functionality

## Future Enhancements

These are possible next steps:

1. **Admin Dashboard**
   - View pending join requests
   - Approve/reject members
   - Export member list

2. **Auto-sync to Pages**
   - Approved members auto-added to community pages
   - Member directory updated automatically

3. **Slack Integration**
   - Notify CoP Lead in Slack instead of email
   - Slack slash command to approve members

4. **Member Portal**
   - Self-serve approval workflow
   - Certificate tracking
   - Learning progress dashboard

## Support

For issues:
- Check Azure Functions logs: Azure Portal → Static Web App → Function App → LogStream
- Verify environment variables in Azure Portal Configuration
- Check `api/README.md` troubleshooting section
- Review `SETUP_AZURE_RESOURCES.md` for setup issues

Questions? All functions are documented in `api/` directory.
