const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");

module.exports.index = wrapAsync(async (req, res) => {
  const { search, category, minPrice, maxPrice } = req.query;
  
  let filter = {};
  
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }
  
  if (category) {
    filter.category = category;
  }
  
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const listings = await Listing.find(filter)
    .populate("owner", "username email")
    .populate("reviews");

  res.json({
    success: true,
    data: listings
  });
});

module.exports.show = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author", select: "username email" }
    })
    .populate("owner", "username email bio profileImage");

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found"
    });
  }

  res.json({
    success: true,
    data: listing
  });
});

module.exports.create = wrapAsync(async (req, res) => {
  const { title, description, price, location, country, category, amenities, bedrooms, bathrooms, maxGuests } = req.body;

  const newListing = new Listing({
    title,
    description,
    price,
    location,
    country,
    category,
    amenities: Array.isArray(amenities) ? amenities : amenities?.split(",") || [],
    bedrooms,
    bathrooms,
    maxGuests,
    owner: req.user.id,
    image: {
      url: "https://via.placeholder.com/400x300?text=Listing+Image",
      filename: "placeholder"
    }
  });

  await newListing.save();

  res.status(201).json({
    success: true,
    message: "Listing created successfully",
    data: newListing
  });
});

module.exports.update = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found"
    });
  }

  if (listing.owner.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this listing"
    });
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, req.body, { new: true });

  res.json({
    success: true,
    message: "Listing updated successfully",
    data: updatedListing
  });
});

module.exports.destroy = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found"
    });
  }

  if (listing.owner.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this listing"
    });
  }

  await Listing.deleteOne({ _id: id });

  res.json({
    success: true,
    message: "Listing deleted successfully"
  });
});

module.exports.getUserListings = wrapAsync(async (req, res) => {
  const listings = await Listing.find({ owner: req.user.id })
    .populate("owner", "username email")
    .populate("reviews");

  res.json({
    success: true,
    data: listings
  });
});
