# Azure Portal Setup Checklist

Print this out or use it to track your progress. Follow **SETUP_AZURE_PORTAL_STEPS.md** for detailed instructions on each step.

---

## Phase 1: Azure Resources Setup

### Storage Account
- [ ] Create Storage Account named `qbecopmembers`
- [ ] Note down the **Connection String**
  - Connection String: `_________________________________`
- [ ] Create Table Storage named `CoPMembers`

### Email Setup (Choose ONE)

#### Gmail Option
- [ ] Enable 2-Factor Authentication on Gmail
- [ ] Create App Password in Gmail
  - App Password: `_________________________________`
- [ ] Save these values:
  - SMTP_HOST: `smtp.gmail.com`
  - SMTP_PORT: `587`
  - SMTP_USER: `_________________________________`
  - SMTP_PASS: `_________________________________`
  - FROM_EMAIL: `_________________________________`

#### SendGrid Option
- [ ] Create SendGrid Account
- [ ] Create API Key in SendGrid
  - API Key: `_________________________________`
- [ ] Save these values:
  - SMTP_HOST: `smtp.sendgrid.net`
  - SMTP_PORT: `587`
  - SMTP_USER: `apikey`
  - SMTP_PASS: `_________________________________`
  - FROM_EMAIL: `_________________________________`

---

## Phase 2: GitHub Secrets Setup

Go to: GitHub Repo → Settings → Secrets and variables → Actions

Add these 6 secrets:

- [ ] `AZURE_STORAGE_ACCOUNT_CONNECTION_STRING`
  - Value: (Connection String from Storage Account)

- [ ] `SMTP_HOST`
  - Value: (smtp.gmail.com or smtp.sendgrid.net)

- [ ] `SMTP_PORT`
  - Value: `587`

- [ ] `SMTP_USER`
  - Value: (Your email or apikey)

- [ ] `SMTP_PASS`
  - Value: (App password or SendGrid API key)

- [ ] `FROM_EMAIL`
  - Value: (Sender email address)

---

## Phase 3: Azure Function App Setup

### Create Function App (if needed)
- [ ] Create new Function App in Azure Portal
- [ ] Name: `cop-microsite-functions`
- [ ] Runtime: Node.js 20 LTS

### Add Application Settings
Go to: Function App → Settings → Configuration

Add these 6 settings:

- [ ] `STORAGE_ACCOUNT`
  - Value: (Connection String from Storage Account)

- [ ] `SMTP_HOST`
  - Value: (smtp.gmail.com or smtp.sendgrid.net)

- [ ] `SMTP_PORT`
  - Value: `587`

- [ ] `SMTP_USER`
  - Value: (Your email or apikey)

- [ ] `SMTP_PASS` (Mark as sensitive)
  - Value: (App password or SendGrid API key)

- [ ] `FROM_EMAIL`
  - Value: (Sender email address)

- [ ] Click **Save** at top

### Link to Static Web App (Optional)
- [ ] Go to Static Web App → Linked resources
- [ ] Link the Function App from above

---

## Phase 4: Update Code

Go to: GitHub Repo → `api/joinCommunity/index.ts` → Edit

Find the `COMMUNITIES` object and update:

- [ ] `'netsec'` — Pramodh Nagaraja
  ```
  leadEmail: 'pramodh.nagaraja@accenture.com'
  leadName: 'Pramodh Nagaraja'
  ```

- [ ] `'observability'` — Pramodh Nagaraja
  ```
  leadEmail: 'pramodh.nagaraja@accenture.com'
  leadName: 'Pramodh Nagaraja'
  ```

- [ ] `'insurance'` — Ramya Nagamalla
  ```
  leadEmail: 'ramya.nagamalla@accenture.com'
  leadName: 'Ramya Nagamalla'
  ```

- [ ] `'sre'` — Ramya Nagamalla
  ```
  leadEmail: 'ramya.nagamalla@accenture.com'
  leadName: 'Ramya Nagamalla'
  ```

- [ ] `'cloud'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] `'data-ai'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] `'database'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] `'guidewire'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] `'integration'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] `'microsoft'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] `'middleware'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] `'service-mgmt'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] `'testing'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] `'workday'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] `'ai-genwizard'` — UPDATE (currently TBD)
  ```
  leadEmail: '_________________________________'
  leadName: '_________________________________'
  ```

- [ ] Commit changes with message: "Update CoP Lead emails for join requests"

---

## Phase 5: Testing

Wait ~2 minutes for deployment to complete, then:

- [ ] Go to microsite (your deployed URL)
- [ ] Click on **Network & Security** community page
- [ ] Scroll to "Join the Community" section
- [ ] Fill out the form:
  - Name: `Test User`
  - Email: Your test email
  - Role: `Tester`
  - Interest: Any option
- [ ] Click **Submit Request**
- [ ] See green success message ✅

Check emails:

- [ ] Check **your inbox** for welcome email from FROM_EMAIL
- [ ] Check **Pramodh's inbox** for CoP Lead notification
- [ ] Check **Junk/Spam** if not found

---

## Troubleshooting Checklist

If something doesn't work, go through this:

- [ ] All 6 GitHub Secrets are added (check exact names)
- [ ] All 6 Function App Settings are added (check exact names)
- [ ] Values in Function App Settings match GitHub Secrets
- [ ] Storage Account connection string is valid (from Step 1)
- [ ] `CoPMembers` table exists in Storage Account
- [ ] SMTP credentials are correct:
  - [ ] Gmail: Using App Password (not regular password)
  - [ ] SendGrid: Using correct API key
- [ ] CoP Lead emails are updated in `api/joinCommunity/index.ts`
- [ ] Deployment completed (check GitHub Actions → workflow status)
- [ ] Checked Function App LogStream for errors

---

## Quick Reference

| What | Where | Value |
|-----|-------|-------|
| Storage Connection String | Azure Portal → Storage Account → Access keys | Long string starting with `DefaultEndpoints...` |
| Gmail App Password | myaccount.google.com → Security → App passwords | 16-character password |
| SendGrid API Key | sendgrid.com Dashboard → API Keys | Long alphanumeric string |
| CoP Lead Info | GitHub → api/joinCommunity/index.ts → COMMUNITIES object | Name and email address |
| Function App Logs | Azure Portal → Function App → Development tools → LogStream | Check for errors |

---

## Done! 🎉

All setup complete when all checkboxes are marked. Your system is ready to:
- ✅ Accept community join requests
- ✅ Store member data in Azure Table Storage
- ✅ Email CoP Leads with new member details
- ✅ Send welcome emails to members

Users can now join communities through the web form!
