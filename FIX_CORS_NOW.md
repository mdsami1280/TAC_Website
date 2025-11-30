# 🚨 URGENT: Fix CORS Configuration

## Current Issue
OPTIONS requests are still getting 403 Forbidden. The origin is:
`https://tac-website-git-main-samis-projects-b862e84b.vercel.app`

## ✅ IMMEDIATE FIX - Set CORS_ALLOWED_ORIGINS in Railway

### Step 1: Go to Railway Dashboard
1. Open: https://railway.app
2. Click on your backend service (TAC_Website or similar)
3. Go to **"Variables"** tab

### Step 2: Add/Update CORS_ALLOWED_ORIGINS

**Add this variable:**

**Key:** `CORS_ALLOWED_ORIGINS`

**Value:** `https://tac-website-git-main-samis-projects-b862e84b.vercel.app`

**OR if you have a custom domain, use:**
`https://your-custom-domain.vercel.app`

**OR to allow multiple origins (comma-separated):**
```
https://tac-website-git-main-samis-projects-b862e84b.vercel.app,https://your-custom-domain.vercel.app
```

### Step 3: Wait for Redeploy
- Railway will automatically redeploy (takes 2-5 minutes)
- Watch the "Deployments" tab to see progress

### Step 4: Test Again
- Clear browser cache
- Try registration again
- Should work now!

---

## 🔍 How to Find Your Vercel URL

1. Go to Vercel Dashboard: https://vercel.com
2. Click on your project
3. Go to **"Deployments"** tab
4. Click on the latest deployment
5. Copy the URL (it will be something like `your-app.vercel.app` or `your-app-git-main-xxx.vercel.app`)

---

## ⚠️ Important Notes

1. **No trailing slash** - Don't add `/` at the end
2. **Use https://** - Always include the protocol
3. **Exact match** - The URL must match exactly what's in the browser
4. **Multiple origins** - Separate with commas (no spaces)

---

## 🧪 Test CORS is Working

After setting the variable and redeploying, test with:

```bash
curl -X OPTIONS https://tacwebsite-production.up.railway.app/api/auth/register \
  -H "Origin: https://tac-website-git-main-samis-projects-b862e84b.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Should return **200 OK** with CORS headers!

---

## 📝 Quick Checklist

- [ ] Found your Vercel URL
- [ ] Added `CORS_ALLOWED_ORIGINS` in Railway Variables
- [ ] Value is exactly: `https://tac-website-git-main-samis-projects-b862e84b.vercel.app`
- [ ] Railway redeployed (check Deployments tab)
- [ ] Cleared browser cache
- [ ] Tested registration - should work now!

