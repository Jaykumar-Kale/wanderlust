const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { verifyToken } = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", verifyToken, userController.getCurrentUser);
router.get("/:id", userController.getUserProfile);
router.put("/update/profile", verifyToken, userController.updateProfile);

module.exports = router;
