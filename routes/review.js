const express = require("express");
const router = express.Router({ mergeParams: true }); // to access :id from parent route

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");
const { validateReview } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");
// Index
// -------- Reviews: Create --------
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

// -------- Reviews: Delete (placed BEFORE 404) --------
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview),
);
module.exports = router;
