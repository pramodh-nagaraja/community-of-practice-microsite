# Quick Start — CoP Join Requests in 15 Minutes

**TL;DR** — Setup auto-join with email notifications in 5 quick phases.

---

## 📋 What You Need

- Azure subscription (free tier OK)
- GitHub account
- Gmail or SendGrid account (for email)

---

## ⏱️ Phase 1: Azure Storage (3 min)

**Goal:** Create a place to store member data

1. Open **Azure Portal** → https://portal.azure.com
2. Search **"Storage accounts"** → Click **+ Create**
3. Fill in:
   - Name: `qbecopmembers` (use your own unique name)
   - Region: Pick closest to you
   - Everything else: Keep defaults
4. Click **Create** → Wait for completion
5. When done, go to **Access keys** → **Copy** the Connection String
   - **Save this!** You'll need it 3 times

6. Click **Tables** (left sidebar) → **+ Table**
   - Name: `CoPMembers`
   - Click **OK**

✅ Done!

---

## 📧 Phase 2: Email Setup (2 min)

### **Option A: Gmail**
1. Go to **myaccount.google.com** → **Security**
2. Click **2-Step Verification** (if not enabled, set it up first)
3. Back in Security, find **App passwords**
4. Select: App = **Mail**, Device = **Windows** (or your device)
5. Click **Generate** → Google shows 16-char password
6. **Copy and save it**

**Values to save:**
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = 16-char-app-password-here
FROM_EMAIL = your-email@gmail.com
```

### **Option B: SendGrid** (easier for production)
1. Go to **sendgrid.com** → Sign up (free)
2. Dashboard → **Settings** → **API Keys**
3. Click **Create API Key** → Name it `CoP Microsite` → Check ✓ **Mail Send**
4. Click **Create & View** → **Copy the key**

**Values to save:**
```
SMTP_HOST = smtp.sendgrid.net
SMTP_PORT = 587
SMTP_USER = apikey
SMTP_PASS = your-sendgrid-api-key
FROM_EMAIL = your-email@gmail.com
```

✅ Done!

---

## 🔐 Phase 3: GitHub Secrets (2 min)

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** × 6 times

Add these exactly:

| Name | Value |
|------|-------|
| `AZURE_STORAGE_ACCOUNT_CONNECTION_STRING` | Connection String from Phase 1 |
| `SMTP_HOST` | `smtp.gmail.com` or `smtp.sendgrid.net` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your email or `apikey` |
| `SMTP_PASS` | App password or SendGrid key |
| `FROM_EMAIL` | Your email address |

✅ Done! (GitHub will auto-redeploy now)

---

## ⚙️ Phase 4: Azure Function Settings (3 min)

1. Azure Portal → Search **"Function App"** → Click yours (or create: `cop-microsite-functions`)
2. Left sidebar → **Settings** → **Configuration**
3. Click **+ New application setting** × 6 times

Add same values as GitHub Secrets (copy from Phase 3):

| Name | Value | Sensitive? |
|------|-------|-----------|
| `STORAGE_ACCOUNT` | Connection String | No |
| `SMTP_HOST` | `smtp.gmail.com` or `smtp.sendgrid.net` | No |
| `SMTP_PORT` | `587` | No |
| `SMTP_USER` | Your email or `apikey` | No |
| `SMTP_PASS` | App password or SendGrid key | **YES** ✓ |
| `FROM_EMAIL` | Your email | No |

4. Click **Save** at top → Confirm

✅ Done!

---

## 📝 Phase 5: Update CoP Leaders (3 min)

1. GitHub → Navigate to **`api/joinCommunity/index.ts`**
2. Click ✏️ **Edit**
3. Find the `COMMUNITIES` object (line ~6)
4. Update the ones marked `TBD`. For example:

```typescript
// Already correct:
'netsec': { name: 'Network & Security', leadEmail: 'pramodh.nagaraja@accenture.com', leadName: 'Pramodh Nagaraja' },
'insurance': { name: 'Insurance', leadEmail: 'ramya.nagamalla@accenture.com', leadName: 'Ramya Nagamalla' },
'sre': { name: 'SRE / Automation', leadEmail: 'ramya.nagamalla@accenture.com', leadName: 'Ramya Nagamalla' },

// Update these (replace TBD):
'cloud': { name: 'Cloud', leadEmail: 'first.last@accenture.com', leadName: 'First Last' },
// ... etc for others
```

5. Scroll down → **Commit changes**
6. Message: `Update CoP Lead emails for join requests`
7. Click **Commit changes**

✅ Done! (Deployment starts automatically)

---

## 🧪 Test It (2 min)

Wait 2-3 minutes for deployment, then:

1. Go to your **deployed microsite**
2. Click **Network & Security** community
3. Scroll to **"Join the Community"** form
4. Fill it out:
   - Name: `Test User`
   - Email: Your test email
   - Role: `Tester`
   - Interest: Any option
5. Click **Submit Request**

**Check:**
- ✅ Green success message appears
- ✅ Check your **email inbox** for welcome email
- ✅ Check **Pramodh's inbox** for CoP Lead notification (or whoever you set)

---

## 🎉 You're Done!

Your system now:
- ✅ Accepts join requests from web form
- ✅ Stores members in Azure Table Storage
- ✅ Emails CoP Lead automatically
- ✅ Emails member with confirmation

---

## If Something's Wrong

**"Submit Request" shows red error:**
1. Check GitHub Secrets (Settings → Secrets)
2. Check Function App Settings (Configuration)
3. Make sure values match exactly (no extra spaces)

**Didn't receive emails:**
1. Check Junk/Spam folder
2. For Gmail: Did you use the 16-char **App Password** (not regular password)?
3. For SendGrid: Did you use the API key (not regular password)?
4. Check Function App **LogStream** for error messages

**More help:**
- Read **SETUP_AZURE_PORTAL_STEPS.md** for detailed walkthrough
- Use **SETUP_CHECKLIST.md** to track progress

---

## Next Steps (Optional)

- [ ] Invite CoP Leads to test
- [ ] Monitor emails coming in
- [ ] Export member data from Azure Table Storage anytime
- [ ] Share microsite link with team

Done! 🚀
