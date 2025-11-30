# 🚀 Free Deployment Guide - Aarya Club Application

This guide will help you deploy both frontend and backend for **FREE** using modern cloud platforms.

## 📋 Prerequisites

1. **GitHub Account** (free) - https://github.com
2. **Vercel Account** (free) - https://vercel.com
3. **Railway Account** (free) - https://railway.app

---

## 🎯 Deployment Strategy

- **Frontend**: Vercel (React/TypeScript)
- **Backend**: Railway (Spring Boot)
- **Database**: Railway PostgreSQL (free tier)

---

## 📦 Part 1: Prepare Your Code

### Step 1: Create Environment Configuration Files

#### For Backend:
Create `src/main/resources/application-production.properties` (we'll create this)

#### For Frontend:
Create `.env.production` in `aarya-club-frontend/` folder (we'll create this)

### Step 2: Update CORS Configuration
Your CORS is already configured, but we'll need to update it for production.

---

## 🔧 Part 2: Deploy Backend (Railway)

### Step 1: Sign Up for Railway
1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub (recommended)

### Step 2: Create Database
1. In Railway dashboard, click "New Project"
2. Click "New" → "Database" → "Add PostgreSQL"
3. Wait for database to be created
4. Click on the database service
5. Go to "Variables" tab
6. Copy these values:
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`

### Step 3: Deploy Backend Application
1. In Railway dashboard, click "New" → "GitHub Repo"
2. Select your repository
3. Railway will auto-detect it's a Java/Maven project
4. Click on the service that was created
5. Go to "Settings" → "Generate Domain" (this gives you a public URL)
6. Copy the generated domain (e.g., `your-app.up.railway.app`)

### Step 4: Configure Environment Variables
1. In your backend service, go to "Variables" tab
2. Add these environment variables:

```
SPRING_PROFILES_ACTIVE=production
SPRING_DATASOURCE_URL=jdbc:postgresql://${PGHOST}:${PGPORT}/${PGDATABASE}
SPRING_DATASOURCE_USERNAME=${PGUSER}
SPRING_DATASOURCE_PASSWORD=${PGPASSWORD}
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
SERVER_PORT=${PORT}
```

Note: Railway automatically provides `${PGHOST}`, `${PGPORT}`, etc. from the database service.

### Step 5: Update pom.xml for PostgreSQL
We need to add PostgreSQL dependency (we'll update this in the code).

### Step 6: Update CORS for Production
We'll update SecurityConfig to allow your Vercel frontend URL.

---

## 🎨 Part 3: Deploy Frontend (Vercel)

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Sign up with GitHub (recommended)

### Step 2: Deploy Frontend
1. Click "Add New" → "Project"
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `aarya-club-frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Add Environment Variables
1. In project settings, go to "Environment Variables"
2. Add:
   ```
   REACT_APP_API_URL=https://your-backend-url.up.railway.app/api
   ```
   (Replace with your actual Railway backend URL)

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Vercel will give you a URL like: `your-app.vercel.app`

---

## 🔄 Part 4: Update Backend CORS

After getting your Vercel URL, update the backend CORS configuration to allow your frontend domain.

---

## ✅ Part 5: Final Steps

1. **Test the deployment**: Visit your Vercel URL
2. **Check backend logs**: Railway dashboard → Your service → "Deployments" → View logs
3. **Check database**: Railway dashboard → Database → "Data" tab

---

## 🐛 Troubleshooting

### Backend Issues:
- Check Railway logs for errors
- Verify environment variables are set correctly
- Ensure database connection string is correct

### Frontend Issues:
- Check Vercel build logs
- Verify `REACT_APP_API_URL` is set correctly
- Check browser console for CORS errors

### Database Issues:
- Verify PostgreSQL is running in Railway
- Check connection string format
- Ensure database credentials are correct

---

## 📝 Notes

- **Free Tier Limits**:
  - Railway: $5 free credit/month (usually enough for small apps)
  - Vercel: Unlimited for personal projects
  - Database: Included with Railway

- **Custom Domains**: Both platforms support custom domains (may require paid plans)

---

## 🎉 You're Done!

Your application should now be live and accessible from anywhere!

**Frontend URL**: `https://your-app.vercel.app`
**Backend URL**: `https://your-backend.up.railway.app`

