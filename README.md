<div align="center">
  <h1>🏡 WanderLust</h1>
  <p><strong>Your Gateway to Unique Stays Around the World</strong></p>
  
  ![Node.js](https://img.shields.io/badge/Node.js-16.x-green?logo=node.js)
  ![Express.js](https://img.shields.io/badge/Express.js-4.x-blue?logo=express)
  ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  
</div>

---

## 📖 About The Project

**WanderLust** is a full-stack web application inspired by Airbnb, designed to revolutionize the way travelers discover and book unique accommodations worldwide. This platform empowers users to explore diverse stays, manage their own property listings, and connect with a global community of hosts and travelers.

Built as a comprehensive showcase of modern full-stack development practices, WanderLust demonstrates proficiency in RESTful API design, database management, user authentication, and responsive UI/UX implementation.

### 🎯 Project Goals

- Create an intuitive, user-friendly platform for property rentals
- Implement secure authentication and authorization
- Develop a scalable architecture for future enhancements
- Demonstrate best practices in full-stack web development

---

## ✨ Features

### Core Functionality

- 🔐 **User Authentication & Authorization**
  - Secure signup and login with password hashing (bcrypt)
  - Session management with Passport.js
  - Protected routes and role-based access control

- 🏠 **Property Management**
  - Create, read, update, and delete (CRUD) operations for listings
  - Image upload and cloud storage integration (Cloudinary)
  - Rich property descriptions with amenities and details
  - Location mapping with interactive maps

- 🔍 **Advanced Search & Filtering**
  - Search by location, price range, and amenities
  - Filter properties by availability and ratings
  - Real-time search suggestions

- ⭐ **Reviews & Ratings System**
  - Submit and manage property reviews
  - Star-based rating system
  - Review authentication and validation
  - Average rating calculation

- 📱 **Responsive Design**
  - Mobile-first approach
  - Cross-browser compatibility
  - Optimized for all screen sizes

### Upcoming Features

- 💳 Payment Integration (Stripe/Razorpay)
- 🔑 OAuth 2.0 Social Login (Google, Facebook)
- 📧 Email notifications for bookings
- 💬 Real-time chat between hosts and guests
- 📊 Host dashboard with analytics

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js (v16+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Passport.js, express-session
- **Validation:** Joi for schema validation
- **Security:** Helmet, express-mongo-sanitize

### Frontend
- **Template Engine:** EJS (Embedded JavaScript)
- **Styling:** Bootstrap 5, Custom CSS
- **JavaScript:** Vanilla JS for client-side interactions
- **Maps:** Mapbox GL JS for location visualization

### Cloud Services
- **Image Storage:** Cloudinary
- **Database Hosting:** MongoDB Atlas (recommended)

### Development Tools
- **Version Control:** Git & GitHub
- **Package Manager:** npm
- **Code Quality:** ESLint (optional)

---

## 📁 Project Structure

```
WanderLust/
├── controllers/          # Route controllers (business logic)
│   ├── listing.js
│   ├── reviews.js
│   └── users.js
├── models/              # Mongoose models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/              # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/               # EJS templates
│   ├── listings/
│   ├── users/
│   ├── includes/
│   └── layouts/
├── public/              # Static files (CSS, JS, images)
│   ├── css/
│   └── js/
├── utils/               # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
├── init/                # Database initialization
│   ├── data.js
│   └── index.js
├── middleware.js        # Custom middleware
├── schema.js            # Joi validation schemas
├── cloudConfig.js       # Cloudinary configuration
├── app.js               # Main application file
└── package.json         # Project dependencies
```

---

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16.x or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jaykumar-Kale/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add the following:
   ```env
   # Database
   MONGODB_URL=mongodb://localhost:27017/wanderlust
   # or use MongoDB Atlas
   # MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/wanderlust
   
   # Cloudinary Configuration
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   
   # Session Secret
   SECRET=your_super_secret_key_here
   
   # Mapbox Token (for maps)
   MAP_TOKEN=your_mapbox_access_token
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. **Seed the database** (optional)
   ```bash
   node init/index.js
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

---

## 🔧 Configuration

### MongoDB Setup

**Option 1: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/wanderlust`

**Option 2: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string
- Add it to your `.env` file

### Cloudinary Setup

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add them to your `.env` file

### Mapbox Setup

1. Sign up at [Mapbox](https://www.mapbox.com/)
2. Create an access token
3. Add it to your `.env` file

---

## 📸 Screenshots

> Add screenshots of your application here to showcase the UI/UX

*(Coming soon)*

---

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. Create an account on [Render](https://render.com/) or [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Add environment variables
4. Deploy!

### Database (MongoDB Atlas)

- Already cloud-hosted if using MongoDB Atlas
- Ensure IP whitelist includes deployment platform IPs

---

## 🔐 Security Features

- Password hashing using bcrypt
- MongoDB injection prevention with express-mongo-sanitize
- XSS protection with Helmet.js
- CSRF protection with csurf
- Session security with secure cookies
- Input validation and sanitization with Joi

---

## 🗺️ Roadmap

| Feature                | Status       | Priority |
|------------------------|--------------|----------|
| User Authentication    | ✅ Complete  | High     |
| Property CRUD          | ✅ Complete  | High     |
| Reviews & Ratings      | ✅ Complete  | High     |
| Search & Filters       | ✅ Complete  | Medium   |
| Image Upload           | ✅ Complete  | High     |
| Interactive Maps       | ✅ Complete  | Medium   |
| Payment Integration    | 🔲 Planned   | High     |
| OAuth Login            | 🔲 Planned   | Medium   |
| Real-time Chat         | 🔲 Planned   | Low      |
| Email Notifications    | 🔲 Planned   | Medium   |
| Host Dashboard         | 🔲 Planned   | Medium   |
| Mobile App             | 🔲 Future    | Low      |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👨‍💻 Author

**Jaykumar Kale**

- GitHub: [@Jaykumar-Kale](https://github.com/Jaykumar-Kale)
- LinkedIn: [Connect with me](https://linkedin.com/in/your-profile)
- Email: jaykumarkale.pict@gmail.com

---

## 🙏 Acknowledgments

- Inspired by [Airbnb](https://www.airbnb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Cloudinary](https://cloudinary.com/)
- [Mapbox](https://www.mapbox.com/)

---

## 📞 Support

If you like this project, please ⭐ star this repository and share it with others!

For support, email your.email@example.com or open an issue in the repository.

---

<div align="center">
  <p>Made with ❤️ by Jaykumar Kale</p>
  <p>© 2026 WanderLust. All rights reserved.</p>
</div>
