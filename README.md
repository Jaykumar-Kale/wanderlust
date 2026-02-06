# 🏡 WanderLust - MERN Stack Application

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-16.x-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-13AA52?logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?logo=express)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)

**A full-stack vacation rental marketplace built with modern web technologies**

[Setup Guide](#-quick-start) • [Features](#-features) • [Deployment](#-deployment) • [License](#-license)

</div>

---

## 📌 About

**WanderLust** is a production-ready MERN application that lets users list, discover, and book unique accommodations. It features user authentication, property management, reviews and ratings, search filtering, and a responsive UI—all built with modern JavaScript frameworks.

Built to demonstrate:
- Full-stack MERN architecture
- Secure JWT authentication
- Redux state management
- RESTful API design
- Responsive React frontend
- Cloud deployment practices

---

## ✨ Features

### Authentication & Users
- ✅ User signup/login with password hashing (bcrypt)
- ✅ JWT-based authentication
- ✅ Protected routes and endpoints
- ✅ User profiles with bio and contact info
- ✅ Host/guest role management

### Listings Management
- ✅ Create, read, update, delete (CRUD) listings
- ✅ Rich listing details (location, price, amenities, capacity)
- ✅ Category-based organization
- ✅ Image upload support
- ✅ Geolocation ready

### Reviews & Ratings
- ✅ 5-star rating system
- ✅ User reviews with comments
- ✅ Average rating calculation
- ✅ Review management (edit/delete)

### Search & Filter
- ✅ Search by location
- ✅ Filter by category
- ✅ Price range filtering
- ✅ Advanced query parameters

### UI/UX
- ✅ Responsive Bootstrap design
- ✅ Gradient styling and animations
- ✅ Mobile-friendly interface
- ✅ Error handling and notifications
- ✅ Loading states

---

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** Passport.js + JWT
- **Security:** bcryptjs password hashing
- **Middleware:** CORS, dotenv

### Frontend
- **Library:** React 18
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **HTTP Client:** Axios with interceptors
- **UI Framework:** Bootstrap 5
- **Styling:** CSS3

### Infrastructure
- **Database:** MongoDB Atlas (Cloud)
- **Backend:** Railway
- **Frontend:** Vercel

---

## 📁 Project Structure

```
WanderLust/
├── backend/                    # Express REST API
│   ├── controllers/           # Business logic
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth & validation
│   ├── utils/                # Helper functions
│   ├── app.js               # Express setup
│   ├── package.json         # Dependencies
│   └── .env.example         # Environment template
│
├── frontend/                   # React SPA
│   ├── public/              # Static files
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── redux/          # State management
│   │   ├── services/       # API integration
│   │   ├── App.js          # Main app component
│   │   └── index.js        # React entry point
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment template
│
├── README.md               # This file
├── SETUP.md               # Setup & deployment guide
└── .gitignore            # Git ignore rules
```

---

## 🔧 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account (free tier)
- Git

### Complete Setup (10 minutes)

**Step 1: Clone & Install**
```bash
git clone <repository-url>
cd WanderLust

# Backend
cd backend
npm install

# Frontend (new terminal)
cd frontend
npm install
```

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
