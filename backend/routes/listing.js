const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listing");
const { verifyToken, validateListing } = require("../middleware/auth");

// Public routes
router.get("/", listingController.index);
router.get("/:id", listingController.show);

// Protected routes
router.post("/", verifyToken, validateListing, listingController.create);
router.put("/:id", verifyToken, validateListing, listingController.update);
router.delete("/:id", verifyToken, listingController.destroy);
router.get("/user/my-listings", verifyToken, listingController.getUserListings);

module.exports = router;
