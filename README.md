# <div align="center"> WanderLust - Vacation Rental Marketplace </div>

<div align="center">

**A modern, full-stack MERN application for discovering and listing vacation rentals**

**[Live Demo](https://wanderlust-1.vercel.app/)** | **[API Backend](https://wanderlust-xlno.onrender.com)** | **[Deployment Guide](./DEPLOYMENT_GUIDE.md)**

**Test Credentials:** `host_user` / `password123`

</div>

---

## Overview

WanderLust is a production-ready vacation rental marketplace inspired by Airbnb, built entirely with the MERN stack. It demonstrates modern web development practices including JWT authentication, Redux state management, RESTful API design, and responsive UI components.

**Perfect for portfolio demonstrations showcasing:**
- Complete full-stack architecture (separate frontend/backend)
- Secure authentication with JWT & bcrypt
- Advanced state management with Redux Toolkit
- RESTful API with proper error handling
- Modern React patterns (hooks, context, protected routes)
- Professional code organization and structure

---

## Features

### Authentication & Authorization
- User registration and login with bcrypt password hashing
- JWT-based stateless authentication
- Protected routes on both frontend and backend
- Persistent login state with localStorage
- Role-based access (host/guest)

### Listing Management
- Full CRUD operations for property listings
- Rich property details (title, description, location, price, amenities)
- Category organization (Trending, Beach, Arctic, Iconic Cities, etc.)
- Dynamic pricing display with Indian Rupee (₹) formatting
- Owner-only edit/delete permissions

### Reviews & Ratings
- 5-star rating system with visual star display (★★★★★)
- User-generated reviews with comments
- Average rating calculation per listing
- Review count display on listing cards
- Delete own reviews functionality

### Search & Filter
- Search listings by location
- Filter by category badges
- Responsive search bar in navbar
- Real-time filtering on frontend

### Modern UI/UX
- Clean Airbnb-inspired design with red accent (#fe424d)
- Plus Jakarta Sans custom typography
- Responsive Bootstrap 5 grid system
- Smooth hover effects and transitions
- Mobile-friendly navigation
- Flash messages for user feedback
- Loading states and error handling

---

## Tech Stack

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

## Project Structure

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

## Getting Started

### Prerequisites
- **Node.js** 16.x or higher
- **npm** 7.x or higher
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for cloning

### Installation (5 minutes)

**1. Clone the repository:**
```bash
git clone https://github.com/Jaykumar-Kale/wanderlust.git
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

## API Endpoints

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

## Deployment

This project is deployed on **FREE** hosting platforms:

- **Frontend:** [Vercel](https://vercel.com) - [https://wanderlust-1.vercel.app/](https://wanderlust-1.vercel.app/)
- **Backend:** [Render.com](https://render.com) - [https://wanderlust-xlno.onrender.com](https://wanderlust-xlno.onrender.com)
- **Database:** [MongoDB Atlas](https://mongodb.com/cloud/atlas) - Free M0 Cluster (512MB)

---

## Security Features

- **Password Security:** bcrypt hashing with salt rounds
- **JWT Authentication:** Stateless token-based auth with expiration
- **Protected Routes:** Frontend route guards and backend middleware
- **CORS Configuration:** Controlled cross-origin requests
- **Input Validation:** Mongoose schema validation
- **Error Handling:** Centralized error middleware
- **Environment Variables:** Sensitive data stored in .env files

---

## Design System

**Color Palette:**-inspired)
- Dark Text: `#222222`
- Star Gold: `#ffc107`

**Typography:**
- Font Family: Plus Jakarta Sans (Google Fonts)

**UI Features:**
- 5-star rating display (★★★★☆)
- Category badges on listing cards
- Price display with ₹ (Indian Rupee)
- Responsive design with Bootstrap 5

---
