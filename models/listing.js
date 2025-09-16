const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    default:"https://unsplash.com/photos/silhouette-of-a-stag-on-a-grassy-hill-at-sunset-yYhMF7dE4Ro",
    set: (v) =>
      v == ""
        ? "https://unsplash.com/photos/silhouette-of-a-stag-on-a-grassy-hill-at-sunset-yYhMF7dE4Ro"
        : v,required: true,
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
