# 📁 Which Folders to Deploy Where

## 🎯 Quick Answer

### **Railway (Backend)**: 
**Deploy the ROOT folder** (the entire repository)
- Contains: `pom.xml`, `src/`, `railway.json`, etc.
- This is your Spring Boot backend

### **Vercel (Frontend)**: 
**Deploy the `aarya-club-frontend` folder**
- Contains: `package.json`, `src/`, `public/`, etc.
- This is your React frontend

---

## 📂 Folder Structure

```
Test-4/                          ← RAILWAY DEPLOYS THIS (Root folder)
│
├── pom.xml                      ← Backend Maven config
├── railway.json                 ← Railway config
├── src/                         ← Backend Java code
│   └── main/
│       └── java/
│           └── com/aarya/       ← Your Spring Boot app
│
└── aarya-club-frontend/         ← VERCEL DEPLOYS THIS
    ├── package.json             ← Frontend npm config
    ├── vercel.json              ← Vercel config
    ├── src/                     ← Frontend React code
    │   ├── pages/
    │   ├── components/
    │   └── services/
    └── public/                  ← Static assets
```

---

## 🚂 Railway Configuration

**Root Directory**: Leave empty (or set to `/`)
- Railway will detect the root folder automatically
- It looks for `pom.xml` in the root

**Build Command**: `./mvnw clean package -DskipTests`
- Or: `mvn clean package -DskipTests`

**Start Command**: `java -jar target/*.jar`

---

## ▲ Vercel Configuration

**Root Directory**: `aarya-club-frontend`
- ⚠️ **IMPORTANT**: Set this in Vercel project settings!
- This tells Vercel to look inside the `aarya-club-frontend` folder

**Build Command**: `npm run build`
- Runs automatically (Vercel detects React)

**Output Directory**: `build`
- Where React builds the production files

---

## 📝 Step-by-Step Setup

### Railway Setup:
1. Go to Railway → New Project → GitHub Repo
2. Select your repository: `mdsami1280/TAC_Website`
3. **Root Directory**: Leave empty (defaults to `/`)
4. Railway auto-detects it's a Java/Maven project
5. Done! ✅

### Vercel Setup:
1. Go to Vercel → Add New Project → Import Git Repository
2. Select your repository: `mdsami1280/TAC_Website`
3. **Root Directory**: Click "Edit" → Set to `aarya-club-frontend`
4. Framework: Create React App (auto-detected)
5. Build Command: `npm run build` (auto-filled)
6. Output Directory: `build` (auto-filled)
7. Done! ✅

---

## ⚠️ Common Mistakes

### ❌ Wrong: Deploying root folder to Vercel
- Vercel won't find `package.json` in root
- Build will fail

### ❌ Wrong: Deploying `aarya-club-frontend` to Railway
- Railway won't find `pom.xml`
- Backend won't build

### ✅ Correct: 
- Railway = Root folder (has `pom.xml`)
- Vercel = `aarya-club-frontend` folder (has `package.json`)

---

## 🔍 How to Verify

### Railway:
- Check if it finds `pom.xml` in logs
- Should see Maven build process

### Vercel:
- Check if it finds `package.json` in `aarya-club-frontend/`
- Should see npm install and build process

---

## 📸 Visual Guide

```
GitHub Repository: mdsami1280/TAC_Website
│
├── 📦 Root (Railway deploys this)
│   ├── pom.xml
│   ├── src/
│   └── railway.json
│
└── 📁 aarya-club-frontend (Vercel deploys this)
    ├── package.json
    ├── src/
    └── vercel.json
```

---

**Remember**: 
- **Railway** = Entire repository (root)
- **Vercel** = `aarya-club-frontend` subfolder only

