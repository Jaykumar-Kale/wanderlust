const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  // ✅ updated to support an object with filename and url
  image: {
    url: String,
    filename: String,
  },

  price: Number,
  location: String,
  country: String,

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
      
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing.reviews.length) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
      
});
  

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
