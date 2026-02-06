const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviews");
const { verifyToken, validateReview } = require("../middleware/auth");

// Get all reviews for a listing
router.get("/listing/:id", reviewController.getListingReviews);

// Create review (protected)
router.post("/:id/reviews", verifyToken, validateReview, reviewController.createReview);

// Delete review (protected)
router.delete("/:id/reviews/:reviewId", verifyToken, reviewController.deleteReview);

module.exports = router;
