# System Architecture — CoP Join Requests

Visual overview of how the auto-join system works.

---

## High-Level Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. User visits microsite → Clicks community page (e.g., "Insurance")  │
│  2. Scrolls to "Join the Community" form                                │
│  3. Fills: Name, Email, Role, Interest, Message (optional)            │
│  4. Clicks "Submit Request"                                            │
│                                                                         │
└────────────────────────────┬────────────────────────────────────────────┘
                             │ HTTP POST
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│         AZURE FUNCTIONS (Backend Processing)                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Function: joinCommunity/{communityId}                                 │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐      │
│  │ 1. VALIDATE                                                 │      │
│  │    - Check all required fields present                      │      │
│  │    - Check communityId exists in COMMUNITIES               │      │
│  │    - Check CoP Lead email is configured                    │      │
│  └─────────────────────────────────────────────────────────────┘      │
│                             │                                          │
│  ┌─────────────────────────────────────────────────────────────┐      │
│  │ 2. STORE MEMBER                                             │      │
│  │    - Create record in Azure Table Storage (CoPMembers)     │      │
│  │    - PartitionKey: communityId (e.g., "insurance")         │      │
│  │    - RowKey: email-timestamp (unique per member)           │      │
│  │    - Data: name, email, role, interest, note, timestamp    │      │
│  └─────────────────────────────────────────────────────────────┘      │
│                             │                                          │
│  ┌─────────────────────────────────────────────────────────────┐      │
│  │ 3. SEND EMAILS                                              │      │
│  │    a. To CoP Lead (notification about new member)          │      │
│  │    b. To Member (welcome & confirmation)                   │      │
│  └─────────────────────────────────────────────────────────────┘      │
│                             │                                          │
│  ┌─────────────────────────────────────────────────────────────┐      │
│  │ 4. RETURN RESPONSE                                          │      │
│  │    - Success: "Thank you, we'll be in touch"               │      │
│  │    - Error: Description of what went wrong                 │      │
│  └─────────────────────────────────────────────────────────────┘      │
│                                                                         │
└────────────────────────────┬────────────────────────────────────────────┘
                             │ Return JSON
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   FRONTEND (User Feedback)                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ✅ Success: Green message appears, form clears                       │
│  ❌ Error: Red message shows what went wrong                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### Frontend (React)
```
src/CoPTemplate.tsx (TJoin component)
├── Form inputs: name, email, role, interest, note
├── Submit handler:
│   └── POST to /api/joinCommunity/{communityId}
└── Response display:
    ├── Loading spinner while submitting
    ├── Success message (green) on success
    └── Error message (red) on failure
```

### Azure Function
```
api/joinCommunity/index.ts
├── Input validation
├── Call storage.ts to store member
├── Call email.ts to notify CoP Lead
├── Call email.ts to welcome member
└── Return response
```

### Shared Utilities
```
api/shared/storage.ts
├── addMemberToTable()
│   └── Stores to CoPMembers table
└── getMembersForCommunity()
    └── Retrieves all members for a community

api/shared/email.ts
├── sendJoinNotificationToLead()
│   └── HTML email to CoP Lead with member details
└── sendWelcomeEmailToMember()
    └── HTML email to member with confirmation
```

---

## Data Flow

### Request Journey
```
Client Form Submit
         ↓
    Browser fetch()
         ↓
    POST /api/joinCommunity/insurance
         ↓
    Azure Functions receives request
         ↓
    Validation checks
         ↓
    Stores in Table Storage ← READ connection string from env
         ↓
    Sends email ← READ SMTP config from env
         ↓
    Returns JSON response
         ↓
    Browser displays result
         ↓
    User sees success/error message
```

---

## Environment Variables

These are read from **Azure Function App Settings** at runtime:

```
STORAGE_ACCOUNT = "DefaultEndpointsProtocol=https;..."
                  └─ Connection string to Azure Storage Account
                  
SMTP_HOST = "smtp.gmail.com" (or smtp.sendgrid.net)
            └─ Email server to use

SMTP_PORT = "587"
            └─ Port for email server

SMTP_USER = "sender@gmail.com" (or "apikey" for SendGrid)
            └─ Authentication username

SMTP_PASS = "16-char-app-password"
            └─ Authentication password (marked sensitive)

FROM_EMAIL = "sender@gmail.com"
             └─ Email address that sends notifications
```

---

## Data Storage Structure

### Azure Table Storage: CoPMembers

```
Table: CoPMembers
├─ Partition Key: communityId
│  └─ Value examples: "netsec", "insurance", "sre"
│
└─ Row Key: {email}-{timestamp}
   └─ Value examples: "john@accenture.com-1706234567890"

Columns (Properties):
├─ name: "Jane Doe"
├─ email: "jane@accenture.com"
├─ role: "Senior Developer"
├─ interest: "Certifications"
├─ note: "Interested in CCNA pathway"
├─ joinedAt: "2024-01-26T10:30:00.000Z"
├─ approved: false (boolean)
├─ PartitionKey: "insurance"
└─ RowKey: "jane@accenture.com-1706234567890"
```

### Accessing Data

Via Azure Portal:
```
Azure Portal 
  → Storage Account 
    → Tables 
      → CoPMembers 
        → View all records
```

Via Code (future):
```typescript
// Get all members for a community
const members = await getMembersForCommunity("insurance")

// All members from all communities
SELECT * FROM CoPMembers

// Members for one community who are approved
SELECT * FROM CoPMembers 
WHERE PartitionKey = 'insurance' AND approved = true
```

---

## Email Flow

### Email 1: To CoP Lead

```
From: FROM_EMAIL (e.g., pramodh.nagaraja@gmail.com)
To:   Lead email (e.g., ramya.nagamalla@accenture.com)
Subject: New Join Request: Insurance CoP — Jane Doe

Body:
┌─────────────────────────────────────────┐
│ New Join Request for Insurance CoP      │
│                                         │
│ Member Details:                         │
│ • Name: Jane Doe                        │
│ • Email: jane@accenture.com             │
│ • Role/Title: Senior Developer          │
│ • Area of Interest: Certifications      │
│ • Message: Interested in AINS pathway   │
│                                         │
│ Please review and reach out to onboard. │
└─────────────────────────────────────────┘
```

### Email 2: To Member

```
From: FROM_EMAIL (e.g., pramodh.nagaraja@gmail.com)
To:   jane@accenture.com
Subject: Welcome to the Insurance Community of Practice!

Body:
┌─────────────────────────────────────────┐
│ Welcome to the Insurance CoP!           │
│                                         │
│ Hi Jane,                                │
│                                         │
│ Thank you for requesting to join. Your  │
│ request has been received and is being  │
│ reviewed by our CoP Lead.               │
│                                         │
│ Ramya Nagamalla will reach out shortly. │
│                                         │
│ Questions? Contact Ramya at:            │
│ ramya.nagamalla@accenture.com           │
│                                         │
│ Welcome aboard!                         │
│ – Accenture QBE Account                 │
└─────────────────────────────────────────┘
```

---

## Deployment Architecture

### Local Development
```
User's Machine
├─ npm run dev (Frontend on localhost:5173)
└─ func start (Azure Functions on localhost:7071)
   └─ local.settings.json provides environment variables
```

### Production (Deployed)
```
GitHub Repository
    ↓ push to main branch
    ↓
GitHub Actions Workflow
├─ Install dependencies
├─ Build frontend (Vite)
├─ Build Azure Functions (TypeScript → JavaScript)
└─ Deploy to Azure Static Web App
   ├─ Frontend → Static Web App
   └─ Functions → Function App (auto-linked)

Azure Infrastructure
├─ Static Web App (microsite)
│  └─ Serves from docs/
├─ Function App
│  └─ Runs functions from api/dist/
├─ Storage Account
│  └─ Stores member data in CoPMembers table
└─ (Optional) Linked resources
   └─ For better integration
```

---

## Security Considerations

### ✅ What's Secure
- Azure Function endpoint is **anonymous** (anyone can call it)
- SMTP credentials stored in Function App **secure settings**
- GitHub Secrets never exposed in code
- Storage Account key stored securely
- Form data **not logged** except to Table Storage

### ⚠️ What to Monitor
- Member requests stored unencrypted in Table Storage
- SMTP password should be rotated periodically
- FROM_EMAIL domain should be verified (SPF/DKIM)
- Consider Rate Limiting (not yet implemented)
- Access to Table Storage should be restricted to Function App

### 🔐 Future Enhancements
- Add authentication to join form
- Encrypt sensitive data in Table Storage
- Implement rate limiting (prevent spam)
- Add CAPTCHA to form
- Audit logging for all requests

---

## Scaling Considerations

### Current Capacity
- **Table Storage**: Can handle unlimited members
- **Azure Functions**: Free tier supports ~1M requests/month
- **SendGrid**: Free tier supports ~100 emails/day
- **Gmail**: Limited to regular rate limits (app passwords)

### If You Scale Up
- Upgrade Function App to paid tier (higher concurrency)
- Upgrade SendGrid plan (more emails per day)
- Add Application Insights for monitoring
- Consider database (Cosmos DB) instead of Table Storage

---

## Troubleshooting Diagram

```
User clicks "Submit Request"
         ↓
    [Error?] ─────→ Check browser console for error message
         │          └─ Usually "invalid community ID" or network error
         ├─→ No error ──→ Message sent to Azure Function
                            ↓
                       [Function error?] ───→ Check Function App LogStream
                            │                 └─ Look for SMTP/Storage errors
                            ├─→ No error ──→ Check emails
                                               ├─ Did you get welcome email?
                                               │  └─ Check Junk folder
                                               └─ Did CoP Lead get notification?
                                                  └─ Check their Junk folder
```

---

## Files Overview

```
Microsite/
├── Frontend
│   ├── src/CoPTemplate.tsx          ← Updated join form
│   └── src/data/communities.ts      ← Community metadata
│
├── Azure Functions (Backend)
│   ├── api/
│   │   ├── joinCommunity/
│   │   │   ├── index.ts             ← Main function logic
│   │   │   └── function.json        ← Binding config
│   │   ├── shared/
│   │   │   ├── storage.ts           ← Table Storage operations
│   │   │   └── email.ts             ← Email sending
│   │   ├── package.json             ← Dependencies
│   │   ├── tsconfig.json
│   │   ├── host.json                ← Azure Functions config
│   │   └── local.settings.json      ← Local env vars
│
├── Deployment
│   ├── .github/workflows/
│   │   └── azure-static-web-apps-*.yml ← CI/CD pipeline
│   ├── staticwebapp.config.json     ← SWA routing rules
│   └── package.json                 ← Frontend dependencies
│
└── Documentation
    ├── QUICK_START.md               ← 5-phase setup (15 min)
    ├── SETUP_AZURE_PORTAL_STEPS.md  ← Detailed visual guide
    ├── SETUP_CHECKLIST.md           ← Printable checklist
    ├── SETUP_AZURE_RESOURCES.md     ← CLI option (alternative)
    ├── IMPLEMENTATION_SUMMARY.md    ← Overview & status
    └── ARCHITECTURE.md              ← This file
```

---

## Questions?

- **How do I test locally?** → See `api/README.md`
- **I don't have Azure yet** → Start with free tier at `azure.microsoft.com`
- **Can I use different email provider?** → Update SMTP_HOST and SMTP_PORT
- **How do I export members?** → Azure Portal → Storage Account → Tables → CoPMembers → Download CSV
- **Can I auto-approve members?** → Future enhancement (set `approved: true` in code)
