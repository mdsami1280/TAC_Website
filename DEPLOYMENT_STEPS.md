# 🚀 Step-by-Step Deployment Instructions

Follow these steps **in order** to deploy your application for free.

---

## 📋 Prerequisites Checklist

- [ ] GitHub account created
- [ ] Code pushed to GitHub repository
- [ ] Vercel account ready (sign up at vercel.com)
- [ ] Railway account ready (sign up at railway.app)

---

## 🔧 STEP 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ready for deployment"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `aarya-club-app`)
   - **DO NOT** initialize with README

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/aarya-club-app.git
   git branch -M main
   git push -u origin main
   ```

---

## 🗄️ STEP 2: Deploy Database (Railway)

1. **Sign in to Railway**: https://railway.app
   - Click "Login" → "Login with GitHub"

2. **Create New Project**:
   - Click "New Project"
   - Select "Empty Project"

3. **Add PostgreSQL Database**:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Wait 1-2 minutes for database to be created

4. **Get Database Credentials**:
   - Click on the PostgreSQL service
   - Go to "Variables" tab
   - You'll see these variables (save them for later):
     - `PGHOST`
     - `PGPORT`
     - `PGDATABASE`
     - `PGUSER`
     - `PGPASSWORD`

---

## ⚙️ STEP 3: Deploy Backend (Railway)

1. **Add Backend Service**:
   - In the same Railway project, click "New" → "GitHub Repo"
   - Select your repository
   - Railway will auto-detect it's a Java project

2. **Configure Build Settings**:
   - Click on your backend service
   - Go to "Settings" tab
   - Under "Build Command", ensure it's: `./mvnw clean package -DskipTests`
   - Under "Start Command", set: `java -jar target/*.jar`

3. **Link Database**:
   - In your backend service, go to "Variables" tab
   - Click "Reference Variable"
   - Select your PostgreSQL service
   - Add these references:
     - `PGHOST` → `${{Postgres.PGHOST}}`
     - `PGPORT` → `${{Postgres.PGPORT}}`
     - `PGDATABASE` → `${{Postgres.PGDATABASE}}`
     - `PGUSER` → `${{Postgres.PGUSER}}`
     - `PGPASSWORD` → `${{Postgres.PGPASSWORD}}`

4. **Add Environment Variables**:
   - Still in "Variables" tab, add these:
     ```
     SPRING_PROFILES_ACTIVE=production
     SPRING_DATASOURCE_URL=jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}
     SPRING_DATASOURCE_USERNAME=${{Postgres.PGUSER}}
     SPRING_DATASOURCE_PASSWORD=${{Postgres.PGPASSWORD}}
     SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
     SPRING_JPA_HIBERNATE_DDL_AUTO=update
     SPRING_JPA_SHOW_SQL=false
     SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
     SERVER_PORT=${{PORT}}
     ```

5. **Generate Public Domain**:
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - Copy the domain (e.g., `your-app-production.up.railway.app`)
   - **SAVE THIS URL** - you'll need it for frontend!

6. **Deploy**:
   - Railway will automatically start building and deploying
   - Go to "Deployments" tab to watch the progress
   - Wait for "Active" status (usually 3-5 minutes)

7. **Test Backend**:
   - Visit: `https://your-backend-url.up.railway.app/api/events`
   - You should see JSON response (may be empty array `[]`)

---

## 🎨 STEP 4: Deploy Frontend (Vercel)

1. **Sign in to Vercel**: https://vercel.com
   - Click "Sign Up" → "Continue with GitHub"

2. **Import Project**:
   - Click "Add New" → "Project"
   - Click "Import Git Repository"
   - Select your repository
   - Click "Import"

3. **Configure Project**:
   - **Root Directory**: Click "Edit" → Set to `aarya-club-frontend`
   - **Framework Preset**: Create React App (auto-detected)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `build` (auto-filled)

4. **Add Environment Variable**:
   - Scroll down to "Environment Variables"
   - Click "Add New"
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.up.railway.app/api`
     (Replace with your actual Railway backend URL from Step 3)
   - Click "Add"

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Vercel will give you a URL like: `your-app.vercel.app`

6. **Test Frontend**:
   - Visit your Vercel URL
   - Open browser console (F12) to check for errors
   - Try navigating to different pages

---

## 🔄 STEP 5: Update Backend CORS

After getting your Vercel URL, update backend CORS:

1. **Go back to Railway**:
   - Open your backend service
   - Go to "Variables" tab

2. **Add CORS Variable**:
   - Click "New Variable"
   - **Key**: `CORS_ALLOWED_ORIGINS`
   - **Value**: `https://your-app.vercel.app`
     (Replace with your actual Vercel URL)
   - Click "Add"

3. **Redeploy**:
   - Railway will automatically redeploy when you add variables
   - Wait for deployment to complete

---

## ✅ STEP 6: Final Testing

1. **Test Full Flow**:
   - Visit your Vercel frontend URL
   - Try to register/login
   - Check if API calls work (open browser DevTools → Network tab)
   - Verify data is being saved/retrieved

2. **Check Logs** (if issues):
   - **Backend**: Railway → Your service → "Deployments" → Click latest → "View Logs"
   - **Frontend**: Vercel → Your project → "Deployments" → Click latest → "View Build Logs"

---

## 🎉 Success!

Your application is now live!

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend-url.up.railway.app`

---

## 🐛 Common Issues & Solutions

### Issue: Backend won't start
**Solution**: 
- Check Railway logs for errors
- Verify all environment variables are set
- Ensure PostgreSQL is running

### Issue: CORS errors in browser
**Solution**:
- Verify `CORS_ALLOWED_ORIGINS` is set correctly in Railway
- Make sure it matches your Vercel URL exactly (including `https://`)
- Redeploy backend after adding CORS variable

### Issue: Frontend can't connect to backend
**Solution**:
- Verify `REACT_APP_API_URL` in Vercel matches your Railway backend URL
- Make sure backend URL includes `/api` at the end
- Redeploy frontend after updating environment variable

### Issue: Database connection errors
**Solution**:
- Check Railway database is running
- Verify database variables are referenced correctly
- Ensure connection string format is correct

---

## 📝 Notes

- **Railway Free Tier**: $5 credit/month (usually enough for small apps)
- **Vercel Free Tier**: Unlimited for personal projects
- **Auto-deployments**: Both platforms auto-deploy on git push
- **Custom domains**: Available on both platforms (may require paid plans)

---

## 🔄 Updating Your App

After making changes:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Auto-deploy**:
   - Railway and Vercel will automatically detect changes
   - They'll rebuild and redeploy automatically
   - Check deployment status in their dashboards

---

**Need Help?** Check the logs in Railway and Vercel dashboards for detailed error messages.

