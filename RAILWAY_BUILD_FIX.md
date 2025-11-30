# 🔧 Railway Build Fix Guide

## Problem
Railway build is failing during the image build process.

## Solutions

### Solution 1: Update Railway Settings (Recommended)

1. **Go to Railway Dashboard**:
   - Open your backend service
   - Click "Settings" tab

2. **Update Build Command**:
   - Find "Build Command" field
   - Set it to: `chmod +x ./mvnw && ./mvnw clean package -DskipTests`
   - Or if mvnw doesn't work: `mvn clean package -DskipTests`

3. **Update Start Command**:
   - Find "Start Command" field
   - Set it to: `java -jar target/*.jar`

4. **Set Java Version** (if available):
   - Look for "Java Version" or "Environment" settings
   - Set to Java 17

5. **Redeploy**:
   - Go to "Deployments" tab
   - Click "Redeploy" or push a new commit

---

### Solution 2: Check Build Logs

1. **View Build Logs**:
   - Go to Railway → Your Service → "Deployments"
   - Click on the failed deployment
   - Click "View Logs"
   - Look for error messages

2. **Common Errors**:
   - **"mvnw: Permission denied"** → Use Solution 1 (chmod command)
   - **"Java not found"** → Railway should auto-detect, but check settings
   - **"Maven not found"** → Use the build command with mvnw
   - **"Build timeout"** → Your build might be taking too long

---

### Solution 3: Use Maven Directly (If mvnw fails)

If the Maven wrapper doesn't work, Railway should have Maven installed.

**Update Build Command to**:
```
mvn clean package -DskipTests
```

---

### Solution 4: Check File Permissions

The `mvnw` file might not be executable. The updated `railway.json` includes:
```
chmod +x ./mvnw
```

This makes the Maven wrapper executable.

---

### Solution 5: Verify Project Structure

Make sure Railway is looking at the **root folder** (not a subfolder):
- Root folder should contain `pom.xml`
- Root folder should contain `src/` directory
- Root folder should contain `mvnw` or `mvnw.cmd`

**In Railway Settings**:
- **Root Directory**: Leave empty (defaults to `/`)

---

## Quick Fix Steps

1. ✅ **Updated `railway.json`** - Added build command with chmod
2. ✅ **Created `nixpacks.toml`** - Explicit build configuration
3. ⚠️ **In Railway Dashboard**:
   - Go to Settings → Build Command
   - Set: `chmod +x ./mvnw && ./mvnw clean package -DskipTests`
   - Set: Start Command: `java -jar target/*.jar`
4. 🔄 **Redeploy** the service

---

## Alternative: Use Dockerfile (If Nixpacks fails)

If Nixpacks continues to fail, we can create a Dockerfile. Let me know if you need this.

---

## Still Having Issues?

1. **Check the exact error** in Railway build logs
2. **Share the error message** and I can help fix it
3. **Verify**:
   - `pom.xml` exists in root
   - `mvnw` file exists in root
   - Java 17 is specified in pom.xml (✅ already done)

---

## Files Updated

- ✅ `railway.json` - Added build command
- ✅ `nixpacks.toml` - Created explicit build config

**Next Step**: Update Railway settings and redeploy!

