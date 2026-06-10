# Quick Auth Setup — 10 Minutes

Fast track to secure your microsite with Accenture login.

---

## What You Need

- Your Azure subscription
- Your Accenture email
- Your microsite deployed on Azure Static Web App

---

## 5 Quick Steps

### Step 1: Open Static Web App (2 min)

1. **Azure Portal** → Search **"Static Web App"**
2. Click **icy-beach** (your microsite)
3. Left sidebar → **Settings** → **Authentication**

### Step 2: Add Microsoft Auth (3 min)

1. Click **+ Add** → Select **Microsoft**
2. Window pops up:
   - **Application ID**: Leave blank (auto-create)
   - Click **Create**

Azure creates the connection automatically ✓

### Step 3: Update Config File (2 min)

Edit or create `staticwebapp.config.json` in your repo root:

```json
{
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
    "rewrite": "/index.html"
  }
}
```

### Step 4: Push to GitHub (1 min)

```bash
git add staticwebapp.config.json
git commit -m "Enable Accenture authentication"
git push origin main
```

### Step 5: Test (2 min)

1. Wait 2 minutes for deployment
2. Open microsite in **incognito window**
3. You should see **Accenture login page**
4. Sign in with your **firstname.lastname@accenture.com**
5. ✅ You're in!

---

## Done! 🔐

Your microsite now requires Accenture login.

**For detailed setup** → See [AZURE_AUTH_SETUP.md](./AZURE_AUTH_SETUP.md)

**Troubleshooting** → See [AZURE_AUTH_SETUP.md#troubleshooting](./AZURE_AUTH_SETUP.md#troubleshooting)
