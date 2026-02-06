const Review = require("../models/review");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");

module.exports.createReview = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;

  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found"
    });
  }

  // Check if user already reviewed
  const existingReview = await Review.findOne({
    listing: id,
    author: req.user.id
  });

  if (existingReview) {
    return res.status(409).json({
      success: false,
      message: "You have already reviewed this listing"
    });
  }

  const newReview = new Review({
    comment,
    rating,
    author: req.user.id,
    listing: id
  });

  await newReview.save();
  listing.reviews.push(newReview._id);
  await listing.save();

  const populatedReview = await Review.findById(newReview._id)
    .populate("author", "username email");

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    data: populatedReview
  });
});

module.exports.deleteReview = wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found"
    });
  }

  if (review.author.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this review"
    });
  }

  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  res.json({
    success: true,
    message: "Review deleted successfully"
  });
});

module.exports.getListingReviews = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ listing: id })
    .populate("author", "username email profileImage");

  res.json({
    success: true,
    data: reviews
  });
});
