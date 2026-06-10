# Azure Portal Setup — Step-by-Step Visual Guide

Complete guide for setting up CoP Join Requests using **Azure Portal only** (no CLI).

---

## Step 1: Create Storage Account

### 1.1 Navigate to Storage Accounts
1. Open **Azure Portal** → https://portal.azure.com
2. In the search bar (top), search for **"Storage accounts"**
3. Click **Storage accounts** (under Services)

### 1.2 Create New Storage Account
1. Click **+ Create** button
2. Fill in the form:
   - **Subscription**: Select your Azure subscription
   - **Resource group**: 
     - Select existing or click **Create new**
     - Name: `qbe-cop-microsite`
   - **Storage account name**: `qbecopmembers` (must be unique, lowercase, no hyphens)
   - **Region**: Select your region (e.g., **East US**)
   - **Performance**: **Standard**
   - **Redundancy**: **Locally-redundant storage (LRS)**

3. Click **Review** → **Create**
4. Wait for deployment to complete (2-3 minutes)

### 1.3 Get Connection String
1. When deployment is done, click **Go to resource**
2. On the left sidebar, go to **Settings** → **Access keys**
3. Under "Storage account name", you'll see "Connection string"
4. Click the **Copy** icon next to the connection string
5. **Save this** — you'll need it for GitHub Secrets

---

## Step 2: Create Table Storage

### 2.1 Create Table
1. You're still in the Storage Account (from Step 1.3)
2. On the left sidebar, click **Data storage** → **Tables**
3. Click **+ Table** button
4. Enter table name: `CoPMembers`
5. Click **OK**

✅ Your table is now created and ready to receive member data.

---

## Step 3: Set Up Email (Choose One)

### Option A: Gmail (Simple, for testing)

#### 3A.1 Create App Password
1. Go to **myaccount.google.com** (your personal Gmail account)
2. Click **Security** (left sidebar)
3. Scroll down to **App passwords**
   - If you don't see it, you need to enable 2-Factor Authentication first:
     - Click **2-Step Verification**
     - Follow the prompts to set up 2FA
4. Return to **App passwords**
5. Select:
   - **App**: Mail
   - **Device**: Windows Computer (or your device)
6. Click **Generate**
7. Google shows a 16-character password — **Copy it** and save it

#### 3A.2 Note Your Gmail Info
- **SMTP_HOST**: `smtp.gmail.com`
- **SMTP_PORT**: `587`
- **SMTP_USER**: Your Gmail address (e.g., `your-email@gmail.com`)
- **SMTP_PASS**: The 16-character app password from above
- **FROM_EMAIL**: Your Gmail address

---

### Option B: SendGrid (Better for production)

#### 3B.1 Create SendGrid Account
1. Go to **sendgrid.com**
2. Click **Sign up** (free tier available)
3. Complete registration

#### 3B.2 Create API Key
1. Log in to SendGrid Dashboard
2. Left sidebar → **Settings** → **API Keys**
3. Click **Create API Key**
4. Name: `CoP Microsite`
5. Permissions: Select **Mail Send**
6. Click **Create & View**
7. **Copy the API key** and save it

#### 3B.3 Note Your SendGrid Info
- **SMTP_HOST**: `smtp.sendgrid.net`
- **SMTP_PORT**: `587`
- **SMTP_USER**: `apikey` (literal text)
- **SMTP_PASS**: Your SendGrid API key
- **FROM_EMAIL**: Any verified sender email in SendGrid (or your SendGrid account email)

---

## Step 4: Add GitHub Secrets

### 4.1 Go to GitHub Repository
1. Go to your GitHub repo: **Microsite**
2. Click **Settings** tab (top right)
3. Left sidebar → **Secrets and variables** → **Actions**

### 4.2 Add Secrets
Click **New repository secret** and add these one by one:

#### Secret 1: Storage Account
- **Name**: `AZURE_STORAGE_ACCOUNT_CONNECTION_STRING`
- **Value**: The connection string you copied in Step 1.3
- Click **Add secret**

#### Secret 2: SMTP Host
- **Name**: `SMTP_HOST`
- **Value**: `smtp.gmail.com` (or `smtp.sendgrid.net` for SendGrid)
- Click **Add secret**

#### Secret 3: SMTP Port
- **Name**: `SMTP_PORT`
- **Value**: `587`
- Click **Add secret**

#### Secret 4: SMTP User
- **Name**: `SMTP_USER`
- **Value**: Your Gmail address OR `apikey` (if SendGrid)
- Click **Add secret**

#### Secret 5: SMTP Password
- **Name**: `SMTP_PASS`
- **Value**: 16-char Gmail app password OR SendGrid API key
- Click **Add secret**

#### Secret 6: From Email
- **Name**: `FROM_EMAIL`
- **Value**: Your sender email address
- Click **Add secret**

You should now have 6 secrets added. ✅

---

## Step 5: Add Secrets to Azure Function App

### 5.1 Find Your Function App
1. Azure Portal → Search for **"Function App"** in search bar
2. Click on your Function App (or create one if needed)
   - If creating: 
     - Name: `cop-microsite-functions`
     - Runtime stack: **Node.js**
     - Version: **20 LTS**
     - Region: Same as storage account

### 5.2 Add Application Settings
1. In the Function App, left sidebar → **Settings** → **Configuration**
2. Click **+ New application setting** for each:

#### Setting 1: Storage Connection
- **Name**: `STORAGE_ACCOUNT`
- **Value**: Paste the connection string from Step 1.3
- Click **OK**

#### Setting 2: SMTP Host
- **Name**: `SMTP_HOST`
- **Value**: `smtp.gmail.com` (or SendGrid)
- Click **OK**

#### Setting 3: SMTP Port
- **Name**: `SMTP_PORT`
- **Value**: `587`
- Click **OK**

#### Setting 4: SMTP User
- **Name**: `SMTP_USER`
- **Value**: Your email (Gmail or `apikey` for SendGrid)
- Click **OK**

#### Setting 5: SMTP Password
- **Name**: `SMTP_PASS`
- **Value**: App password or SendGrid API key
- **Check "Deployment slot setting"** to mark as sensitive
- Click **OK**

#### Setting 6: From Email
- **Name**: `FROM_EMAIL`
- **Value**: Your sender email address
- Click **OK**

3. At the top, click **Save** → Confirm by clicking **Continue**

---

## Step 6: Configure Azure Static Web App

### 6.1 Find Your Static Web App
1. Azure Portal → Search **"Static Web App"**
2. Click on **icy-beach** (your existing SWA)

### 6.2 Link Function App (Optional but recommended)
1. Left sidebar → **Linked resources**
2. Click **+ Link a resource**
3. Select:
   - **Resource type**: Function App
   - **Subscription**: Your subscription
   - **Resource**: The Function App from Step 5.1
4. Click **Link**

### 6.3 Verify Settings are Available
1. In the Static Web App, left sidebar → **Configuration** (or **Environment variables**)
2. You should see the application settings you added in Step 5.2
3. They're automatically available to your Functions

---

## Step 7: Update CoP Lead Information

### 7.1 Edit the Functions Code
1. Go back to your GitHub repo: **Microsite**
2. Navigate to: `api/joinCommunity/index.ts`
3. Click the **pencil icon** to edit
4. Find the `COMMUNITIES` object (around line 6)
5. Update each CoP with the actual Lead email and name:

```typescript
const COMMUNITIES: Record<string, { name: string; leadEmail: string; leadName: string }> = {
  'netsec': { 
    name: 'Network & Security', 
    leadEmail: 'pramodh.nagaraja@accenture.com',  // Already set
    leadName: 'Pramodh Nagaraja'
  },
  'insurance': { 
    name: 'Insurance', 
    leadEmail: 'ramya.nagamalla@accenture.com',  // Already set
    leadName: 'Ramya Nagamalla'
  },
  'sre': { 
    name: 'SRE / Automation', 
    leadEmail: 'ramya.nagamalla@accenture.com',  // Already set
    leadName: 'Ramya Nagamalla'
  },
  // ⬇️ Update the ones that say "TBD" below ⬇️
  'cloud': { 
    name: 'Cloud', 
    leadEmail: 'person@accenture.com',  // Change TBD
    leadName: 'Person Name'             // Change TBD
  },
  // ... continue for others
}
```

6. Scroll to bottom, click **Commit changes**
7. Add a commit message: "Update CoP Lead emails for join requests"
8. Click **Commit changes**

This triggers a new deployment automatically! ✅

---

## Step 8: Test It Works

### 8.1 Test the Join Form
1. Go to your microsite (deployment will take ~2 minutes)
2. Click on any community page (e.g., Network & Security)
3. Scroll to **"Join the Community"** section
4. Fill out the form:
   - Name: `Test User`
   - Email: Your test email
   - Role: `Test Role`
   - Interest: Any option
   - Message: (optional)
5. Click **Submit Request**

### 8.2 Check for Success
You should see a **green success message**: "Thank you for your request..."

### 8.3 Verify Emails
1. Check your **email inbox** (the one you filled in Step 3)
2. You should receive an email from the FROM_EMAIL address
3. CoP Lead should also receive an email notifying them

---

## Troubleshooting

### "Submit Request" shows error
**Check these in order:**

1. **GitHub Secrets** (Step 4)
   - Go to GitHub → Settings → Secrets
   - Verify all 6 secrets are there
   - Verify no typos in secret names

2. **Function App Settings** (Step 5)
   - Azure Portal → Function App → Configuration
   - Verify all 6 settings are there
   - Verify values match GitHub Secrets exactly

3. **Storage Account** (Step 1)
   - Azure Portal → Storage Account → Tables
   - Verify `CoPMembers` table exists

4. **Function App Logs**
   - Azure Portal → Function App → **Development tools** → **App Service Editor** → **LogStream**
   - Scroll through logs after clicking Submit
   - Look for error messages

### "No email received"
1. Check **Junk/Spam folder** in email
2. Verify **FROM_EMAIL** is correct
3. For Gmail: Verify app password (not regular password) was used
4. For SendGrid: Verify API key is correct
5. Check Function App LogStream for SMTP errors

### "Invalid community ID" error
1. The community ID in the URL must match exactly
   - Example: Network & Security page has ID `netsec`
   - Check the URL: `#/netsec` for the ID
2. Verify that community ID is in the `COMMUNITIES` object in Step 7

---

## Next Steps

- ✅ All setup complete!
- Test the form (Step 8)
- Share the link with team members
- Monitor emails coming to CoP Leads
- (Optional) Set up an admin dashboard to view all requests

---

## FAQ

**Q: Can I test locally first?**
A: Yes! Read `api/README.md` for local testing with `func start`

**Q: What if I use a different email provider?**
A: Edit `SMTP_HOST` and `SMTP_PORT` to match your provider (see their documentation)

**Q: Can I change who gets notified?**
A: Yes! Update the emails in Step 7 (`api/joinCommunity/index.ts`)

**Q: Where is member data stored?**
A: Azure Table Storage → `CoPMembers` table (created in Step 2)

**Q: Can I export member data?**
A: Yes! Azure Portal → Storage Account → Tables → CoPMembers → Download as CSV
