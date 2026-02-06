const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided. Please login first."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again."
    });
  }
};

const validateListing = (req, res, next) => {
  const { title, description, price, location, maxGuests } = req.body;

  if (!title || !description || !price || !location || !maxGuests) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields"
    });
  }

  if (price < 0 || maxGuests < 1) {
    return res.status(400).json({
      success: false,
      message: "Price and maxGuests must be positive numbers"
    });
  }

  next();
};

const validateReview = (req, res, next) => {
  const { comment, rating } = req.body;

  if (!comment || !rating) {
    return res.status(400).json({
      success: false,
      message: "Comment and rating are required"
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5"
    });
  }

  next();
};

module.exports = {
  verifyToken,
  validateListing,
  validateReview
};
