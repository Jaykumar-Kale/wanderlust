# 🚀 Setup & Deployment Guide

Complete guide for setting up WanderLust locally and deploying to production.

---

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [MongoDB Atlas Configuration](#mongodb-atlas-configuration)
3. [Running the Application](#running-the-application)
4. [Deployment to Production](#deployment-to-production)
5. [Environment Variables Reference](#environment-variables-reference)
6. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** v7+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **MongoDB Atlas** account (free) ([Sign up](https://www.mongodb.com/cloud/atlas))

### Installation Steps

#### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd WanderLust
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

You should see packages like:
- express
- mongoose
- passport
- jsonwebtoken
- bcryptjs
- cors
- dotenv

#### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

You should see packages like:
- react
- react-redux
- react-router-dom
- axios
- bootstrap
- @reduxjs/toolkit

---

## MongoDB Atlas Configuration

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" (or Sign In if you have an account)
3. Create a new account with Google or email

### Step 2: Create a Cluster

1. After login, click **"+ Create"** to create a new project
2. Name it: `WanderLust`
3. Click **"Create Project"**
4. Click **"Create a Deployment"**
5. Choose **M0 Cluster** (Free tier)
6. Select region near you
7. Click **"Create Cluster"** (wait 2-3 minutes)

### Step 3: Create Database User

1. In Atlas, click **"Database Access"** (left menu)
2. Click **"+ Add New Database User"**
3. Username: `wanderlust_user`
4. Auto-generate password (or create strong one like `WanderLust@123`)
5. Database User Privileges: **Read and write to any database**
6. Click **"Add User"**

**Save this username and password!**

### Step 4: Whitelist IP Address

1. Click **"Network Access"** (left menu)
2. Click **"+ Add IP Address"**
3. For local development: Use `0.0.0.0/0` (allows any IP)
4. For production: Add your Railway app's IP only
5. Click **"Confirm"**

### Step 5: Get Connection String

1. Click **"Clusters"** (left menu)
2. Click **"Connect"** on your cluster
3. Click **"Connect your application"**
4. Choose **Node.js** driver
5. Copy the connection string

It looks like:
```
mongodb+srv://wanderlust_user:password@cluster0.mongodb.net/wanderlust?retryWrites=true&w=majority
```

Replace `<password>` with your actual database user password!

---

## Running the Application

### Configuration

#### Backend Setup

Create `backend/.env`:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add:

```
MONGODB_URL=mongodb+srv://wanderlust_user:YOUR_PASSWORD@cluster0.mongodb.net/wanderlust?retryWrites=true&w=majority
JWT_SECRET=YourVeryStrongSecretKeyMin32CharactersLong123456
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Important:** 
- Replace `YOUR_PASSWORD` with actual database password
- Keep `JWT_SECRET` strong and private (32+ characters minimum)

#### Frontend Setup

Create `frontend/.env`:

```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env` and add:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Start Development Servers

**Terminal 1: Backend**
```bash
cd backend
npm start
```

Expected output:
```
✅ MongoDB Connected to wanderlust
🚀 Server running on port 5000
```

**Terminal 2: Frontend** (new terminal)
```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!

You can now view wanderlust in the browser.

  Local:            http://localhost:3000
```

Browser should auto-open to http://localhost:3000

---

## Deployment to Production

### Deploy Backend to Railway ⚙️

#### 1. Sign Up to Railway

1. Go to [Railway.app](https://railway.app/)
2. Click **"Login"** → **"Sign up with GitHub"**
3. Authorize Railway to access your GitHub
4. Create new account

#### 2. Create New Project

1. Click **"+ New Project"**
2. Click **"Deploy from GitHub repo"**
3. Select your WanderLust repository
4. Click **"Deploy Now"**

#### 3. Configure Environment Variables

Railway will auto-detect `backend/package.json`

1. Click on the **Node.js service**
2. Go to **"Variables"** tab
3. Add these variables:

```
MONGODB_URL=mongodb+srv://wanderlust_user:YOUR_PASSWORD@cluster0.mongodb.net/wanderlust?retryWrites=true&w=majority
JWT_SECRET=YourVeryStrongSecretKeyMin32CharactersLong123456
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-frontend-url.vercel.app
```

Replace:
- `YOUR_PASSWORD` with database password
- `your-vercel-frontend-url` with your Vercel frontend URL

#### 4. Get Backend URL

1. In Railway dashboard, look for **Public URL**
2. It looks like: `https://wanderlust-prod-railway-app.up.railway.app`
3. Copy this—you'll need it for frontend deployment

---

### Deploy Frontend to Vercel 🚀

#### 1. Sign Up to Vercel

1. Go to [Vercel.com](https://vercel.com/)
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub
4. Create account

#### 2. Import Project

1. Click **"Add New"** → **"Project"**
2. From the import page, select your WanderLust repo
3. Click **"Import"**

#### 3. Configure Environment Variables

1. In **Environment Variables** section, add:

```
REACT_APP_API_URL=https://your-railway-backend-url/api
```

Replace with your actual Railway backend URL from previous step

#### 4. Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (2-5 minutes)
3. Your frontend URL is ready (e.g., `wanderlust-frontend.vercel.app`)

#### 5. Update Backend CORS

Go back to Railway dashboard:

1. In **Variables**, update:
```
CORS_ORIGIN=https://your-vercel-url.vercel.app
```

2. Redeploy (click **"Redeploy"**) so changes take effect

---

## Environment Variables Reference

### Backend Variables

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `MONGODB_URL` | ✅ | `mongodb+srv://...` | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Min 32 chars | Secret key for JWT tokens |
| `PORT` | ⚠️ | `5000` | Server port (for local dev) |
| `NODE_ENV` | ⚠️ | `development` | `development` or `production` |
| `CORS_ORIGIN` | ✅ | `http://localhost:3000` | Frontend URL for CORS |

### Frontend Variables

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `REACT_APP_API_URL` | ✅ | `http://localhost:5000/api` | Backend API URL |

---

## Troubleshooting

### Issue: MongoDB Connection Error

**Error:** `MongooseError: Cannot connect to MongoDB`

**Solutions:**
1. Check MONGODB_URL is correct in `.env`
2. Verify password is correct (special chars encoded)
3. Whitelist IP in MongoDB Atlas
4. Is cluster running? Check Atlas dashboard

### Issue: Port 5000 Already in Use

**Error:** `Error: listen EADDRINUSE :::5000`

**Solutions:**
```bash
# Option 1: Change PORT in backend/.env to 5001
PORT=5001

# Option 2: Kill process on port 5000
# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: Frontend Can't Connect to Backend

**Error:** Network error when creating listing or logging in

**Solutions:**
1. Is backend running? (check http://localhost:5000 in browser)
2. Check `REACT_APP_API_URL` in `frontend/.env`
3. Check `CORS_ORIGIN` in `backend/.env` matches frontend URL
4. Different ports? URL must match exactly

### Issue: npm install Fails

**Error:** `npm ERR! code ...`

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Not found" Page on Frontend

**After deployment to Vercel**

**Solution:**
1. Go to Vercel **Settings** → **Git**
2. Set **Root Directory** to `frontend`
3. Set **Build Command** to `npm run build`
4. Set **Output Directory** to `build`
5. Redeploy

### Issue: 401 Unauthorized on Protected Routes

**Error:** Can't create listings or access protected features

**Solutions:**
1. Are you logged in? Try signup/login first
2. Check JWT token in browser localStorage
3. Is backend running? Check console errors
4. Verify `JWT_SECRET` is same on backend and during testing

---

## Testing Checklist

After local setup, test these features:

- [ ] Homepage loads without errors
- [ ] Can sign up with new account
- [ ] Can log in with credentials
- [ ] Can view profile page
- [ ] Can create a new listing
- [ ] Can view all listings
- [ ] Can search listings by location
- [ ] Can filter by category/price
- [ ] Can view listing details
- [ ] Can leave a review/rating
- [ ] Can edit your own listing
- [ ] Can delete your own listing
- [ ] Can view reviews on listings
- [ ] Can log out
- [ ] Responsive design on mobile (Chrome DevTools)

---

## Production Checklist

Before going live:

- [ ] MongoDB Atlas cluster created and running
- [ ] Backend deployed to Railway with all env variables
- [ ] Frontend deployed to Vercel with API URL
- [ ] CORS_ORIGIN updated in Railway to match Vercel URL
- [ ] Test all features on production URLs
- [ ] Enable HTTPS on Railway (usually automatic)
- [ ] Update any hardcoded localhost URLs
- [ ] Setup error logging (optional)
- [ ] Test on mobile devices
- [ ] Share live URL and add to portfolio

---

## Getting Help

### Common Questions

**Q: Can I use MongoDB Compass with MongoDB Atlas?**
A: Yes! In MongoDB Compass, click "New Connection", paste your connection string, and connect.

**Q: Is MongoDB Atlas free?**
A: Yes! M0 Cluster has 512MB storage, perfect for development.

**Q: Can I change the JWT_SECRET later?**
A: Only if no users exist. Otherwise users will be logged out.

**Q: How do I see backend logs on Railway?**
A: In Railway dashboard, click your service → "Deployments" → select deployment → "Logs"

**Q: How do I update the code after deploying?**
A: Just push code to GitHub! Railway and Vercel auto-redeploy on push.

---

## Next Steps

1. ✅ Setup locally and test all features
2. ✅ Create MongoDB Atlas cluster  
3. ✅ Deploy backend to Railway
4. ✅ Deploy frontend to Vercel
5. ✅ Add project to your portfolio
6. ✅ Share the live URL

---

<div align="center">

**Need help?** Check the main [README.md](./README.md)

Made with ❤️ for developers

</div>
