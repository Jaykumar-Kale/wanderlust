# 🚀 WanderLust MERN Deployment Guide

## FREE Deployment Stack
- **Database:** MongoDB Atlas (Free 512MB)
- **Backend:** Render.com (Free tier)
- **Frontend:** Vercel (Free tier)

---

## 📋 STEP 1: Setup MongoDB Atlas (Cloud Database)

### 1.1 Create Account
1. Go to **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with Google/GitHub (easiest)
3. Choose **FREE M0 Cluster** (512MB - Perfect for portfolio projects)

### 1.2 Create Cluster
1. Click **"Build a Database"**
2. Select **FREE Shared Cluster**
3. Choose **AWS** provider
4. Select closest region (e.g., Mumbai for India)
5. Cluster name: Keep default or name it `wanderlust-cluster`
6. Click **"Create"** (takes 3-5 minutes)

### 1.3 Create Database User
1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
   - Username: `wanderlust_admin`
   - Password: Click **"Autogenerate Secure Password"** → **COPY IT!** ⚠️
4. Database User Privileges: **Read and write to any database**
5. Click **"Add User"**

### 1.4 Whitelist IP Address
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Click **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string: 
   ```
   mongodb+srv://wanderlust_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password (from step 1.3)
6. Add database name: Change `/?retryWrites` to `/wanderlust?retryWrites`

**Final MongoDB URL Example:**
```
mongodb+srv://wanderlust_admin:YourPassword123@cluster0.ab1cd.mongodb.net/wanderlust?retryWrites=true&w=majority
```

---

## 📋 STEP 2: Deploy Backend to Render.com

### 2.1 Push Code to GitHub
1. Go to **https://github.com/new**
2. Create repository: `wanderlust-mern`
3. Keep it **Public** (required for free Render deployment)
4. In VS Code terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - WanderLust MERN project"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wanderlust-mern.git
   git push -u origin main
   ```

### 2.2 Create Render Account
1. Go to **https://render.com/register**
2. Sign up with GitHub (easier deployment)
3. Authorize Render to access your repositories

### 2.3 Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `wanderlust-mern`
3. Configure:
   - **Name:** `wanderlust-backend`
   - **Region:** Choose closest (e.g., Singapore)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** **Free**

4. **Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   MONGODB_URL=mongodb+srv://wanderlust_admin:YourPassword@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
   PORT=5000
   NODE_ENV=production
   CORS_ORIGIN=https://wanderlust-mern.vercel.app
   SESSION_SECRET=your_session_secret_key_here_min_32_chars
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

5. Click **"Create Web Service"**
6. Wait 5-10 minutes for deployment
7. **Copy your backend URL:** `https://wanderlust-backend.onrender.com`

### 2.4 Seed Database (Optional)
Once backend is deployed, run seed script:
1. In Render dashboard, go to your service
2. Click **"Shell"** tab
3. Run: `npm run seed`

---

## 📋 STEP 3: Deploy Frontend to Vercel

### 3.1 Update Frontend API URL
Before deploying, update your frontend to use production backend URL.

Create `frontend/.env.production`:
```
REACT_APP_API_URL=https://wanderlust-backend.onrender.com
```

### 3.2 Create Vercel Account
1. Go to **https://vercel.com/signup**
2. Sign up with GitHub
3. Authorize Vercel

### 3.3 Deploy Frontend
1. Click **"Add New Project"**
2. Import your `wanderlust-mern` repository
3. Configure:
   - **Framework Preset:** `Create React App`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

4. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://wanderlust-backend.onrender.com
   ```

5. Click **"Deploy"**
6. Wait 3-5 minutes
7. **Your frontend URL:** `https://wanderlust-mern.vercel.app`

---

## 📋 STEP 4: Update Backend CORS

After getting Vercel URL, update backend environment variable:

1. Go to Render dashboard → Your backend service
2. Click **"Environment"** tab
3. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   CORS_ORIGIN=https://wanderlust-mern.vercel.app
   ```
4. Click **"Save Changes"** (will auto-redeploy)

---

## ✅ FINAL CHECKLIST

- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] Database user created with password saved
- [ ] Network access set to "Allow from Anywhere"
- [ ] Code pushed to GitHub (public repository)
- [ ] Backend deployed to Render with all environment variables
- [ ] Frontend deployed to Vercel
- [ ] Backend CORS_ORIGIN updated with Vercel URL
- [ ] Database seeded with sample data
- [ ] Test login with: `host_user` / `password123`

---

## 🔗 Your Deployed Links

**Frontend (Share this for interviews):**
```
https://wanderlust-mern.vercel.app
```

**Backend API:**
```
https://wanderlust-backend.onrender.com
```

**Test Credentials:**
- Username: `host_user`
- Password: `password123`

---

## ⚠️ IMPORTANT NOTES

### Free Tier Limitations:
1. **Render.com Free Tier:**
   - Service sleeps after 15 minutes of inactivity
   - First request after sleep takes ~50 seconds to wake up
   - **Solution:** Use [UptimeRobot](https://uptimerobot.com) (free) to ping your backend every 14 minutes

2. **MongoDB Atlas Free Tier:**
   - 512MB storage (enough for 1000+ listings)
   - No credit card required
   - Never expires

3. **Vercel Free Tier:**
   - Unlimited deployments
   - 100GB bandwidth/month
   - Automatic HTTPS

### Interview Preparation:
- **Mention in resume:** "Deployed using MongoDB Atlas, Render, and Vercel"
- **Demo preparation:** Visit your site 2 minutes before interview (wakes up Render)
- **Backup:** Keep this deployment guide handy during interview

---

## 🐛 Troubleshooting

### Backend not connecting to database:
- Check MongoDB Atlas Network Access (should be 0.0.0.0/0)
- Verify MONGODB_URL has correct password (no special characters issues)

### CORS errors:
- Ensure CORS_ORIGIN matches exact Vercel URL (with https://)
- Check Render logs for specific errors

### Frontend showing "Network Error":
- Verify REACT_APP_API_URL in Vercel environment variables
- Wait 50 seconds on first load (Render cold start)

### Images not loading:
- Cloudinary credentials must be set in Render
- Or images fall back to default Unsplash URLs

---

## 📞 Need Help?
- Render Logs: Dashboard → Your Service → Logs tab
- Vercel Logs: Dashboard → Your Project → Deployments → Click deployment → View Function Logs
- MongoDB Logs: Atlas → Cluster → Metrics tab

Good luck with your interviews! 🎉
