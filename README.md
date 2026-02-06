# 🏠 WanderLust - Vacation Rental Marketplace

<div align="center">

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-13AA52?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

**A modern, full-stack MERN application for discovering and listing vacation rentals**

🔗 **[Live Demo](https://wanderlust-mern.vercel.app)** | 📖 **[Deployment Guide](./DEPLOYMENT_GUIDE.md)**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment) • [API Documentation](#-api-endpoints)

</div>

---

## 🎯 Overview

WanderLust is a production-ready vacation rental marketplace inspired by Airbnb, built entirely with the MERN stack. It demonstrates modern web development practices including JWT authentication, Redux state management, RESTful API design, and responsive UI components.

**Perfect for portfolio demonstrations showcasing:**
- Complete full-stack architecture (separate frontend/backend)
- Secure authentication with JWT & bcrypt
- Advanced state management with Redux Toolkit
- RESTful API with proper error handling
- Modern React patterns (hooks, context, protected routes)
- Professional code organization and structure

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with bcrypt password hashing
- JWT-based stateless authentication
- Protected routes on both frontend and backend
- Persistent login state with localStorage
- Role-based access (host/guest)

### 🏡 Listing Management
- Full CRUD operations for property listings
- Rich property details (title, description, location, price, amenities)
- Category organization (Trending, Beach, Arctic, Iconic Cities, etc.)
- Dynamic pricing display with Indian Rupee (₹) formatting
- Owner-only edit/delete permissions

### ⭐ Reviews & Ratings
- 5-star rating system with visual star display (★★★★★)
- User-generated reviews with comments
- Average rating calculation per listing
- Review count display on listing cards
- Delete own reviews functionality

### 🔍 Search & Filter
- Search listings by location
- Filter by category badges
- Responsive search bar in navbar
- Real-time filtering on frontend

### 🎨 Modern UI/UX
- Clean Airbnb-inspired design with red accent (#fe424d)
- Plus Jakarta Sans custom typography
- Responsive Bootstrap 5 grid system
- Smooth hover effects and transitions
- Mobile-friendly navigation
- Flash messages for user feedback
- Loading states and error handling

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database for data storage |
| **Mongoose** | ODM for MongoDB schema modeling |
| **JWT** | Stateless authentication tokens |
| **bcryptjs** | Password hashing and salting |
| **Passport.js** | Authentication middleware |
| **CORS** | Cross-origin resource sharing |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library with modern hooks |
| **Redux Toolkit** | Centralized state management |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client with interceptors |
| **Bootstrap 5** | Responsive CSS framework |
| **Custom CSS** | Airbnb-style design system |

### Development Tools
- **nodemon** - Backend auto-reload
- **react-scripts** - Frontend build tooling
- **Git** - Version control

---

## 📁 Project Structure

```
WanderLust/
│
├── backend/                    # Express.js REST API
│   ├── controllers/           # Request handlers (users, listings, reviews)
│   ├── models/                # Mongoose schemas (User, Listing, Review)
│   ├── routes/                # API route definitions
│   ├── middleware/            # Auth verification & validation
│   ├── app.js                 # Express server configuration
│   ├── package.json           # Backend dependencies
│   └── .env.example           # Environment variables template
│
├── frontend/                   # React SPA
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── pages/            # Route pages (Home, Login, Profile, etc.)
│   │   ├── components/       # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── redux/            # Redux slices (auth, listings)
│   │   ├── services/         # API service layer (Axios)
│   │   ├── App.js            # Root component with routing
│   │   ├── App.css           # Global styles (Airbnb-inspired)
│   │   └── index.js          # React entry point
│   ├── package.json          # Frontend dependencies
│   ├── .env.example          # Environment variables template
│   └── .eslintignore         # Disable ESLint for development
│
├── .gitignore                 # Git ignore patterns
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16.x or higher
- **npm** 7.x or higher
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for cloning

### Installation (5 minutes)

**1. Clone the repository:**
```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
```

**2. Backend Setup:**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env`:
```env
MONGO_URL=mongodb://localhost:27017/wanderlust
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/wanderlust
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

**3. Frontend Setup:**
```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env
```

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
DISABLE_ESLINT_PLUGIN=true
```

**4. Start Development Servers:**

Backend (Terminal 1):
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

Frontend (Terminal 2):
```bash
cd frontend
npm start
# React app runs on http://localhost:3000
```

**5. Open Browser:**
Navigate to `http://localhost:3000` and start exploring!

---

## 📡 API Endpoints

### Authentication
```
POST   /api/users/register      Register new user
POST   /api/users/login         Login user (returns JWT)
GET    /api/users/me            Get current user (protected)
GET    /api/users/:id           Get user profile
PUT    /api/users/:id           Update user profile (protected)
```

### Listings
```
GET    /api/listings            Get all listings
GET    /api/listings/:id        Get single listing
POST   /api/listings            Create listing (protected)
PUT    /api/listings/:id        Update listing (protected, owner only)
DELETE /api/listings/:id        Delete listing (protected, owner only)
GET    /api/listings/user/:id   Get user's listings
```

### Reviews
```
POST   /api/listings/:id/reviews           Create review (protected)
DELETE /api/listings/:id/reviews/:reviewId  Delete review (protected, author only)
GET    /api/listings/:id/reviews           Get listing reviews
```

---

## 🌐 Deployment

This project is deployed on **FREE** hosting platforms:

- **Frontend:** [Vercel](https://vercel.com) - `https://wanderlust-mern.vercel.app`
- **Backend:** [Render.com](https://render.com) - `https://wanderlust-backend.onrender.com`
- **Database:** [MongoDB Atlas](https://mongodb.com/cloud/atlas) - Free M0 Cluster (512MB)

### Quick Deploy

**Option 1: Full Deployment Guide (Recommended)**
Follow the complete step-by-step guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Option 2: Quick Deploy**
1. **Database:** Create MongoDB Atlas cluster and get connection string
2. **Backend:** 
   ```bash
   # Push to GitHub (must be public for free tier)
   git push origin main
   
   # Deploy on Render.com
   # - Connect GitHub repo
   # - Root directory: backend
   # - Build: npm install
   # - Start: npm start
   # - Add environment variables (see .env.example)
   ```

3. **Frontend:**
   ```bash
   # Deploy on Vercel
   # - Import GitHub repo
   # - Root directory: frontend
   # - Framework: Create React App
   # - Add REACT_APP_API_URL environment variable
   ```

### Environment Variables

**Backend (Render):**
```
MONGODB_URL=mongodb+srv://...
JWT_SECRET=your_32_char_secret
CORS_ORIGIN=https://your-frontend.vercel.app
PORT=5000
NODE_ENV=production
```

**Frontend (Vercel):**
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

### ⚠️ Important Notes
- **Render Free Tier:** Service sleeps after 15 min inactivity (50s cold start)
- **Solution:** Use [UptimeRobot](https://uptimerobot.com) to ping every 14 minutes
- **MongoDB Atlas:** 512MB free forever, no credit card required

---

## 🔒 Security Features

- **Password Security:** bcrypt hashing with salt rounds
- **JWT Authentication:** Stateless token-based auth with expiration
- **Protected Routes:** Frontend route guards and backend middleware
- **CORS Configuration:** Controlled cross-origin requests
- **Input Validation:** Mongoose schema validation
- **Error Handling:** Centralized error middleware
- **Environment Variables:** Sensitive data stored in .env files

---

## 🎨 Design System

**Color Palette:**
- Primary Red: `#fe424d` (Airbnb signature)
- Dark Text: `#222222`
- Light Gray: `#ebebeb`
- Star Gold: `#ffc107`

**Typography:**
- Font Family: Plus Jakarta Sans (Google Fonts)
- Weights: 300, 400, 500, 600, 700

**Components:**
- Listing cards with 350px image height
- 5-star rating display (★★★★☆)
- Category badges positioned on images
- Price display with ₹ symbol
- Red accent buttons with hover effects

---

## 🚢 Deployment

### Backend (Railway)
1. Create account on [Railway](https://railway.app)
2. Connect GitHub repository
3. Add environment variables (MONGO_URL, JWT_SECRET)
4. Deploy from `backend/` directory

### Frontend (Vercel)
1. Create account on [Vercel](https://vercel.com)
2. Import GitHub repository
3. Set root directory to `frontend/`
4. Add environment variable: `REACT_APP_API_URL=<your-railway-backend-url>`
5. Deploy

### Database (MongoDB Atlas)
1. Create free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
3. Copy connection string to MONGO_URL

---

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

## 🙏 Acknowledgments

- Design inspiration from Airbnb
- Built as a learning project for MERN stack development
- Thanks to the open-source community for amazing tools

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ using MERN Stack

</div>

**Step 2: Configure Environment**

Backend (`backend/.env`):
```
MONGODB_URL=mongodb+srv://user:password@cluster.mongodb.net/wanderlust
JWT_SECRET=your_secret_key_min_32_characters
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Frontend (`frontend/.env`):
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Step 3: Start Development Servers**

Terminal 1 - Backend:
```bash
cd backend
npm start
# Server running on http://localhost:5000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

✅ **Done!** App is running at http://localhost:3000

---

## 🧪 Test the Application

1. **Sign up** at `/signup`
2. **Create a listing** at `/listings/new`
3. **Browse listings** at `/`
4. **Search** by location
5. **Filter** by category or price
6. **Leave reviews** on listings
7. **Manage** your listings at `/my-listings`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Create account |
| POST | `/users/login` | User login |
| GET | `/users/me` | Get current user (protected) |

### Listings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/listings` | Get all listings |
| GET | `/listings/:id` | Get listing details |
| POST | `/listings` | Create listing (protected) |
| PUT | `/listings/:id` | Update listing (protected) |
| DELETE | `/listings/:id` | Delete listing (protected) |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reviews/listing/:id` | Get reviews |
| POST | `/reviews/:id/reviews` | Add review (protected) |
| DELETE | `/reviews/:id/reviews/:reviewId` | Delete review (protected) |

---

## 🌐 Deployment

### Backend → Railway

```bash
npm install -g @railway/cli
cd backend
railway init
railway variable add MONGODB_URL=<your-url>
railway variable add JWT_SECRET=<your-key>
railway up
```

### Frontend → Vercel

```bash
npm install -g vercel
cd frontend
vercel
```

### Database → MongoDB Atlas

1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IPs (0.0.0.0/0 for development)
4. Copy connection string to .env

**See [SETUP.md](./SETUP.md) for detailed deployment instructions.**

---

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Protected API endpoints
- ✅ Protected React routes
- ✅ CORS configuration
- ✅ Input validation on backend
- ✅ Error handling & sanitization
- ✅ Environment variables for secrets

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Verify MONGODB_URL in .env |
| Port 5000 already in use | Change PORT in .env or kill process |
| Frontend can't reach API | Check REACT_APP_API_URL in frontend .env |
| npm install fails | Delete node_modules and package-lock.json, retry |
| CORS errors | Verify CORS_ORIGIN in backend .env matches frontend URL |

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

**[↑ back to top](#-wanderlust---mern-stack-application)**

⭐ Star this repo if you found it helpful!

Made with ❤️ for the web development community

</div>
