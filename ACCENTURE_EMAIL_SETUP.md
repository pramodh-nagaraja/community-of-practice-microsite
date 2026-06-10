# Accenture Email Setup for CoP Join Requests

Configure your Accenture email (Outlook/Exchange) to send join notifications.

---

## Option 1: Accenture Email (Recommended - You Control It)

### Prerequisites
- Your Accenture email: `firstname.lastname@accenture.com`
- Your Accenture password
- Multi-factor authentication (MFA) enabled? See Step 2 below

### Step 1: Determine Your SMTP Settings

Accenture uses Office 365 (Exchange Online). Your settings are:

```
SMTP_HOST = smtp.office365.com
SMTP_PORT = 587
SMTP_USER = firstname.lastname@accenture.com
SMTP_PASS = Your Accenture password (or app password if MFA enabled)
FROM_EMAIL = firstname.lastname@accenture.com
```

### Step 2: If You Have MFA Enabled (Recommended Security)

If your Accenture account requires MFA (most do now):

1. Go to **https://account.microsoft.com/account/security-info**
2. Sign in with your Accenture email
3. Click **Security info** (left sidebar)
4. Scroll down to **App passwords** (near the bottom)
   - If you don't see it, check: Settings → Privacy & security → App passwords
5. Click **Create a new app password**
6. Select:
   - **App**: Select "Other (custom name)" and type `CoP Microsite`
   - **Device**: Select your device type
7. Click **Next** → Microsoft shows 16-character password
8. **Copy and save it** (you'll use this instead of your regular password)

```
SMTP_PASS = 16-character-app-password (NOT your regular password)
```

### Step 3: Note These Values

Save these for later:

```
SMTP_HOST = smtp.office365.com
SMTP_PORT = 587
SMTP_USER = firstname.lastname@accenture.com
SMTP_PASS = your-password-or-app-password
FROM_EMAIL = firstname.lastname@accenture.com
```

---

## Option 2: Shared Mailbox (If Your Team Has One)

If Accenture has set up a shared mailbox for CoP communications:

```
SMTP_HOST = smtp.office365.com
SMTP_PORT = 587
SMTP_USER = cop-shared@accenture.com
SMTP_PASS = (ask your admin for credentials)
FROM_EMAIL = cop-shared@accenture.com
```

---

## ⚠️ Important: Accenture Firewall/Policies

Accenture may have security policies that block external SMTP. If you encounter issues:

### Issue 1: "Authentication failed"
- Verify you're using an **app password** (if MFA enabled), not your regular password
- Check your Accenture password hasn't changed recently
- Verify email isn't blocked by Accenture IT policies

### Issue 2: "Connection timeout" or "Can't connect to server"
- Your corporate network may block SMTP port 587
- Try contacting **Accenture IT Support** to whitelist the Azure Function IP
- Alternative: Ask your Accenture IT team to configure Exchange relay rules

### Issue 3: "SMTP server requires authentication"
- Make sure you're entering the **full email address** as SMTP_USER
- Not just "firstname.lastname", but the full `firstname.lastname@accenture.com`

---

## Next Steps

1. **Copy these values:**
   ```
   SMTP_HOST = smtp.office365.com
   SMTP_PORT = 587
   SMTP_USER = firstname.lastname@accenture.com
   SMTP_PASS = [your password or app password]
   FROM_EMAIL = firstname.lastname@accenture.com
   ```

2. **Add to GitHub Secrets** (next phase)
   - Go to GitHub → Settings → Secrets → Actions
   - Add these 6 secrets (same as QUICK_START Phase 3)

3. **Test in local development** (optional)
   - Update `api/local.settings.json` with these values
   - Run `func start` and test the join form locally
   - Check if emails send successfully

4. **Continue with QUICK_START Phase 3** (GitHub Secrets)

---

## Troubleshooting Accenture Email

### Test SMTP Connection Locally (Optional)

If you want to verify SMTP works before adding to Azure:

**On Windows (PowerShell):**
```powershell
# Test SMTP connection
$SMTPClient = New-Object Net.Mail.SmtpClient("smtp.office365.com", 587)
$SMTPClient.EnableSsl = $true
$SMTPClient.Credentials = New-Object System.Net.NetworkCredential("firstname.lastname@accenture.com", "your-password")
try {
    $SMTPClient.Send("from@accenture.com", "to@accenture.com", "Test Subject", "Test Body")
    Write-Host "✓ SMTP connection successful!"
} catch {
    Write-Host "✗ SMTP failed: $_"
}
```

**On Mac/Linux (using telnet or nc):**
```bash
telnet smtp.office365.com 587
# You should see: "220 SMTP.office365.com"
```

### Common Accenture Email Issues

| Problem | Solution |
|---------|----------|
| "Invalid credentials" | Use app password if MFA enabled, not your regular password |
| "Account locked" | Check if your Accenture account is locked; contact your admin |
| "Connection refused" | Accenture IT may be blocking port 587; contact Accenture IT |
| "Can't send mail" | Check if your mailbox has send-as restrictions; contact Accenture IT |
| "SSL/TLS error" | Make sure SMTP_PORT is 587 (not 25 or 465) and EnableSsl is true |

---

## Accenture IT Contact

If you hit issues with Accenture email, you may need to contact your Accenture IT Support. When you contact them, provide:

- **Issue**: "Need to send emails from an Azure Function using SMTP"
- **Server**: smtp.office365.com
- **Port**: 587
- **User**: firstname.lastname@accenture.com
- **Purpose**: Community of Practice automated notifications

Ask them to:
1. Confirm SMTP access is allowed from Azure
2. Verify your mailbox has send-as permissions
3. Whitelist the Azure Function IP (if needed)

---

## Done! ✅

You now have Accenture email configured. 

**Next:** Go to [QUICK_START.md](./QUICK_START.md) **Phase 3** to add GitHub Secrets, then Phase 4-5 to complete setup.
