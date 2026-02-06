const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

module.exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists"
      });
    }

    // Create user
    let newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    const token = generateToken(registeredUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: registeredUser._id,
        username: registeredUser.username,
        email: registeredUser.email
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Registration failed"
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
    }

    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const isPasswordValid = await user.authenticate(password);
    if (!isPasswordValid[0]) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Login failed"
    });
  }
};

module.exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-hash -salt");
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-hash -salt");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { bio, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { bio, phone },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
