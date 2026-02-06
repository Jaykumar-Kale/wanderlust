const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    url: String,
    filename: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  country: String,
  category: {
    type: String,
    enum: ["Amazing views", "Beachfront", "Cabins", "Camping", "Desert", "Domes", "Farms", "Islands", "Lakes", "Mansions", "Rooms", "Trending", "Arctic", "Boats", "Castles", "Caves", "Golfing", "Houseboats", "Luxury", "Skiing", "Tiny homes"],
    default: "Trending"
  },
  amenities: [String],
  bedrooms: {
    type: Number,
    min: 0,
    default: 1
  },
  bathrooms: {
    type: Number,
    min: 0,
    default: 1
  },
  maxGuests: {
    type: Number,
    required: true,
    min: 1
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  geometry: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: {
      type: [Number],
      default: [77.2090, 28.6139] // Default to Delhi
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index
listingSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model("Listing", listingSchema);
