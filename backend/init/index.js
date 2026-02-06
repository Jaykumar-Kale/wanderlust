const mongoose = require("mongoose");
const User = require("../models/user");
const Listing = require("../models/listing");
const Review = require("../models/review");
const sampleListings = require("./data");
require("dotenv").config({ path: "../.env" });

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/wanderlust";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

const initDB = async () => {
  try {
    // Clear existing data
    await Listing.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create sample users
    const hostUser = new User({
      username: "host_user",
      email: "host@wanderlust.com",
      isHost: true,
      phone: "+91 98765 43210",
      bio: "Experienced host welcoming travelers from around the world!"
    });

    const normalUser = new User({
      username: "traveler_user",
      email: "traveler@wanderlust.com",
      isHost: false,
      phone: "+91 98765 43211",
      bio: "Love exploring new places and cultures"
    });

    // Register users with passport-local-mongoose
    await User.register(hostUser, "password123");
    await User.register(normalUser, "password123");
    console.log("👨‍💼 Created 2 sample users");

    // Get the host user for listings
    const owner = await User.findOne({ username: "host_user" });

    // Add listings
    const listingsWithOwner = sampleListings.map((listing) => ({
      ...listing,
      owner: owner._id
    }));

    const createdListings = await Listing.insertMany(listingsWithOwner);
    console.log(`🏠 Created ${createdListings.length} sample listings`);

    // Create some sample reviews
    const reviews = [
      new Review({
        comment: "Absolutely amazing! The views were breathtaking!",
        rating: 5,
        author: await User.findOne({ username: "traveler_user" }),
        listing: createdListings[0]._id
      }),
      new Review({
        comment: "Great location and comfortable amenities.",
        rating: 4,
        author: await User.findOne({ username: "traveler_user" }),
        listing: createdListings[1]._id
      }),
      new Review({
        comment: "Perfect for a family vacation!",
        rating: 5,
        author: await User.findOne({ username: "traveler_user" }),
        listing: createdListings[2]._id
      })
    ];

    const savedReviews = [];
    for (let review of reviews) {
      await review.save();
      savedReviews.push(review);
    }
    console.log(`⭐ Created ${savedReviews.length} sample reviews`);

    // Add reviews to first 3 listings
    for (let i = 0; i < 3 && i < createdListings.length; i++) {
      createdListings[i].reviews.push(savedReviews[i]);
      await createdListings[i].save();
    }

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📝 Login Credentials:");
    console.log("   Host User:");
    console.log("   - Username: host_user");
    console.log("   - Password: password123");
    console.log("\n   Traveler User:");
    console.log("   - Username: traveler_user");
    console.log("   - Password: password123");
    console.log("\nOpen MongoDB Compass to view the data!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

initDB();
