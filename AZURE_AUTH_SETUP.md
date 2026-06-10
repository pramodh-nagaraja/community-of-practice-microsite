# Azure Authentication Setup — Accenture Employees Only

Restrict microsite access to Accenture employees using Azure AD (Microsoft Entra ID).

---

## How It Works

```
User visits microsite
         ↓
Azure Static Web App redirects to Accenture login
         ↓
User signs in with firstname.lastname@accenture.com
         ↓
Azure AD validates and logs them in
         ↓
User can access microsite
```

Non-Accenture users get an "Unauthorized" error.

---

## Prerequisites

- Your Accenture email (firstname.lastname@accenture.com)
- Access to Azure Portal
- Your microsite deployed on Azure Static Web App

---

## Step-by-Step Setup

### Step 1: Find Your Static Web App

1. **Azure Portal** → https://portal.azure.com
2. Search: **"Static Web App"**
3. Click **icy-beach** (your deployed microsite)

### Step 2: Enable Authentication

1. Left sidebar → **Settings** → **Authentication**
2. You'll see:
   - ✓ App Service Authentication (Enabled)
   - Identity provider: **Add** button

3. Click **+ Add** → **Microsoft**

### Step 3: Configure Azure AD (Microsoft Entra)

#### Option A: Use Existing Accenture Azure AD (Recommended)

If Accenture has already created an Azure AD tenant:

1. In the "Add Microsoft account provider" popup:
   - **Name**: Leave as `Microsoft`
   - **Tenant type**: Select **Workforce**
   - **Application ID**: (leave blank, we'll create one)

2. Click **Create** → Azure creates an app registration

#### Option B: Manual App Registration (Advanced)

If you need manual control:

1. Go to **Azure Portal** → Search **"App registrations"**
2. Click **+ New registration**
3. Fill in:
   - **Name**: `COP Microsite - Accenture`
   - **Supported account types**: Select **Accounts in this organizational directory only (Accenture Default Directory - Single tenant)**
   - **Redirect URI**: 
     - Platform: **Web**
     - URL: `https://your-microsite-domain/.auth/login/aad/callback`
     - (Replace `your-microsite-domain` with your actual URL)

4. Click **Register**

5. Copy the **Application (client) ID** and **Directory (tenant) ID**

6. Go to **Certificates & secrets** → **+ New client secret**
   - Value: (Azure generates it)
   - Copy this value

7. Go back to Static Web App → Authentication → Add Microsoft provider
   - Paste the Application ID, Tenant ID, and Client Secret

### Step 4: Configure Allowed Users

1. Back in Static Web App → **Authentication**
2. Click on the **Microsoft** provider you just added
3. Look for **Allowed tenant IDs** or **Restrictions**
4. Set it to allow only Accenture's Azure AD tenant:
   - Add Accenture's Tenant ID: `<your-accenture-tenant-id>`

### Step 5: Set Access Rules

1. Static Web App → **Settings** → **Configuration**
2. Create a file: `staticwebapp.config.json` (if not already created)

Add this configuration:

```json
{
  "auth": {
    "identityProviders": {
      "azureActiveDirectory": {
        "registration": {
          "openIdIssuer": "https://login.microsoftonline.com/<your-tenant-id>/v2.0",
          "clientIdSettingName": "AZURE_CLIENT_ID",
          "clientSecretSettingName": "AZURE_CLIENT_SECRET"
        },
        "login": {
          "loginParameters": ["scope=openid profile email"]
        }
      }
    }
  },
  "routes": [
    {
      "route": "/.auth/login/aad/callback",
      "allowedRoles": ["anonymous"]
    },
    {
      "route": "/*",
      "allowedRoles": ["authenticated"]
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["*.{css,scss,gif,ico,jpg,png,js,svg,woff,woff2}"]
  }
}
```

Replace `<your-tenant-id>` with your Accenture Azure AD tenant ID.

### Step 6: Test Authentication

1. **Wait** for deployment to complete (2-3 minutes)
2. **Open incognito/private browser window**
3. Go to your microsite URL
4. You should be redirected to **Accenture login page**
5. Sign in with your **firstname.lastname@accenture.com** email
6. You should be logged in and see the microsite
7. Try accessing with a non-Accenture email (Gmail, etc.) → Should see "Unauthorized"

---

## Finding Your Accenture Tenant ID

If you need the Accenture Azure AD Tenant ID:

1. **Azure Portal** → Search **"Azure Active Directory"** (or **"Entra ID"**)
2. Go to **Overview**
3. Look for **Tenant ID** — Copy this value
4. Use it in `staticwebapp.config.json` above

---

## Troubleshooting

### "Unauthorized" error for Accenture users

1. Verify they're signing in with `@accenture.com` email
2. Check Accenture's Tenant ID is correct in config
3. Check Azure AD tenant restrictions (ask Accenture IT)

### "Can't find the app" error

1. Verify the Application ID is correct
2. Verify Redirect URI matches your domain exactly
3. Verify the app is registered in Accenture's Azure AD

### "Login redirect loop"

1. Check `staticwebapp.config.json` syntax (valid JSON)
2. Verify Tenant ID format (should be GUID like `550e8400-e29b-41d4-a716-446655440000`)
3. Clear browser cache and try incognito window

### Users can't see the microsite after login

1. Verify the route `"/*"` requires `"authenticated"` role
2. Check `navigationFallback` points to `/index.html`

---

## Advanced: Custom Roles (Optional)

If you want different access levels:

```json
{
  "routes": [
    {
      "route": "/admin/*",
      "allowedRoles": ["admin"]  // Only admins
    },
    {
      "route": "/*",
      "allowedRoles": ["authenticated"]  // All Accenture users
    }
  ]
}
```

Then manually assign roles in Azure AD based on group membership.

---

## Accenture IT Contact Info

If you hit issues, Accenture IT can help with:
- Confirming your Azure AD tenant ID
- Verifying app registration permissions
- Checking if there are additional security policies
- Setting up app roles based on groups

Contact your local Accenture IT support team.

---

## Security Features Enabled

After setup, your microsite has:

✅ **Login Required** — Users must authenticate
✅ **Accenture-only** — Only @accenture.com emails allowed
✅ **Session Management** — Automatic logout after inactivity
✅ **Encrypted Tokens** — Secure authentication tokens
✅ **No password storage** — Leverages Accenture's AD
✅ **Audit logs** — Login attempts logged in Azure

---

## Next Steps

1. Complete setup above
2. Test with your Accenture email ✓
3. Test with non-Accenture email (should fail) ✓
4. Share link with Accenture team members
5. They'll see login page on first visit
6. They sign in once, then access freely

---

## Rollback

If you need to disable authentication:

1. Static Web App → **Authentication**
2. Click the **Microsoft** provider → **Delete**
3. Redeploy (push to GitHub)

Public access is restored.

---

Done! Your microsite is now secure and Accenture-employees-only. 🔐
