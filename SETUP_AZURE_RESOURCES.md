# Azure Resources Setup for CoP Join Requests

This guide walks through setting up the Azure resources needed for the auto-join and email notification feature.

## Prerequisites
- Azure subscription
- Azure CLI installed
- GitHub account (for secret management)

## 1. Create Storage Account

```bash
# Set variables
RESOURCE_GROUP="qbe-cop-microsite"
STORAGE_ACCOUNT="qbecopmembers"  # Must be unique globally, lowercase
LOCATION="eastus"

# Create resource group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create storage account
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS

# Get connection string
STORAGE_CONNECTION_STRING=$(az storage account show-connection-string \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --query connectionString -o tsv)

echo "Storage Connection String: $STORAGE_CONNECTION_STRING"
```

## 2. Create Table Storage

```bash
# Create the CoPMembers table
az storage table create \
  --name CoPMembers \
  --account-name $STORAGE_ACCOUNT
```

## 3. Configure Email (SendGrid or Gmail)

### Option A: Gmail (Simple, for testing)
1. Enable 2-factor authentication on your Gmail account
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. Save the 16-character password

### Option B: SendGrid (Production recommended)
1. Create a free SendGrid account at https://sendgrid.com/
2. Create an API key with Mail Send permission
3. Save the API key

## 4. Configure GitHub Secrets

In your GitHub repository, add the following secrets:

```
AZURE_STORAGE_ACCOUNT_CONNECTION_STRING = <your_storage_connection_string>
SMTP_HOST = smtp.gmail.com                    # or smtp.sendgrid.net for SendGrid
SMTP_PORT = 587
SMTP_USER = <your-email@gmail.com>           # or "apikey" for SendGrid
SMTP_PASS = <your-app-password>              # or SendGrid API key
FROM_EMAIL = <sender-email@gmail.com>
```

## 5. Set Azure Function Configuration

These secrets should be available to your Azure Functions at runtime. In Azure Portal:

1. Go to your Static Web App resource
2. Under **Settings** → **Linked resources**, link your Storage Account and Function App
3. In your Function App → **Configuration**, add Application Settings:
   - `STORAGE_ACCOUNT` = Connection string from GitHub secret
   - `SMTP_HOST` = From GitHub secret
   - `SMTP_PORT` = From GitHub secret
   - `SMTP_USER` = From GitHub secret
   - `SMTP_PASS` = From GitHub secret (mark as secure)
   - `FROM_EMAIL` = From GitHub secret

## 6. Update Community CoP Lead Information

In `api/joinCommunity/index.ts`, update the `COMMUNITIES` object with the correct CoP Lead emails and names for each community.

Example:
```typescript
insurance: { 
  name: "Insurance", 
  leadEmail: "ramya.nagamalla@accenture.com", 
  leadName: "Ramya Nagamalla" 
}
```

## 7. Local Development Setup

1. Copy `api/local.settings.json.example` to `api/local.settings.json`
2. Add your Azure Storage connection string and SMTP credentials
3. Install Azure Functions Core Tools if needed:
   ```bash
   # macOS
   brew tap azure/azure
   brew install azure-functions-core-tools@4
   
   # Windows
   choco install azure-functions-core-tools
   ```

4. Run locally:
   ```bash
   # In one terminal
   npm run dev
   
   # In another terminal
   cd api
   npm install
   npm run build
   func start
   ```

## Troubleshooting

### Function not receiving emails
- Check SMTP credentials in Application Settings
- Verify FROM_EMAIL is authorized to send (especially for Gmail)
- Check Azure Functions logs in Azure Portal

### Storage connection issues
- Verify Storage Account connection string format
- Check that CoPMembers table exists
- Ensure Storage Account is accessible from Function App

### API returning 500 errors
- Check Function App logs: **Development Tools** → **App Service Editor** → **LogStream**
- Verify all required environment variables are set
- Check that Storage Account firewall allows access from Function App

## Security Notes

- Never commit credentials to Git
- Use Azure Key Vault for storing sensitive values in production
- Rotate SMTP passwords and API keys regularly
- Review and limit storage account access using Azure firewall rules
