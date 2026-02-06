# 🌱 Database Seeding Guide

## Quick Start - Seed the Database

The WanderLust project includes sample data to help you quickly see the application in action with realistic listings, users, and reviews.

### Run the Seed Script

```bash
cd backend
npm run seed
```

This will:
- ✅ Clear existing data (fresh start)
- ✅ Create 2 sample users (1 host, 1 traveler)
- ✅ Create 10 realistic property listings with different categories
- ✅ Create 3 sample reviews with ratings
- ✅ Display login credentials in terminal

### Sample Data Created

**Users:**
- **Host User** (can create/edit listings)
  - Username: `host_user`
  - Password: `password123`
  - Email: `host@wanderlust.com`

- **Traveler User** (can browse and review)
  - Username: `traveler_user`
  - Password: `password123`
  - Email: `traveler@wanderlust.com`

**Listings (10 total):**
1. 🏖️ Beachfront Paradise Villa (Goa, ₹15,000/night)
2. ❄️ Arctic Aurora Cabin (Norway, ₹12,000/night)
3. 🏰 Iconic Bell Tower Suite (Prague, ₹8,500/night)
4. 🏛️ Luxury Mountain Mansion (Manali, ₹18,000/night)
5. 🌄 Riverside Cabin with Amazing Views (Rishikesh, ₹6,500/night)
6. 🌴 Traditional Island Farm House (Maldives, ₹4,500/night)
7. 🏯 Lakeside Castle Manor (Switzerland, ₹16,000/night)
8. 🏜️ Desert Dome Luxury Glamping (Jaisalmer, ₹7,500/night)
9. ⛷️ Cozy Ski Lodge Cabin (Zermatt, ₹13,000/night)
10. 🏠 Tiny Minimalist House (Portland, ₹3,500/night)

**Reviews:**
- 3 reviews with ratings (4-5 stars) on first 3 listings

---

## Viewing Data in MongoDB Compass

1. Open **MongoDB Compass**
2. Connect to: `mongodb://localhost:27017`
3. Select database: `wanderlust`
4. Browse collections:
   - **users** - See created users
   - **listings** - Browse all 10 properties
   - **reviews** - See ratings and comments

---

## Running the Application with Seed Data

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Open:** `http://localhost:3000`

---

## Testing with Seed Data

### As Host (host_user):
1. Login with host credentials
2. View your 10 listings in "My Listings"
3. Edit or delete any listing
4. See reviews from travelers

### As Traveler (traveler_user):
1. Login with traveler credentials
2. Browse all listings
3. View reviews and ratings
4. Add new reviews (future enhancement)

---

## Resetting Data

If you want to start fresh:
```bash
npm run seed
```

This clears all data and repopulates with fresh sample data.

---

## Customizing Seed Data

Edit `backend/init/data.js` to:
- Add more listings
- Change prices and locations
- Modify amenities
- Add different categories

Then run `npm run seed` to apply changes.

---

## Notes

- All sample data is **fictional** and for demonstration only
- Images are from Unsplash (free stock photos)
- Coordinates are approximate for mapping features
- Passwords are intentionally simple for testing - change in production!
