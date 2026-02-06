const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
  },
  phone: {
    type: String,
    default: null
  },
  profileImage: {
    url: String,
    filename: String
  },
  bio: {
    type: String,
    default: ""
  },
  isHost: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose, {
  usernameField: "username"
});

// Method to get profile image or default avatar
userSchema.methods.getProfileImage = function() {
  // If user has uploaded a profile image, return it
  if (this.profileImage && this.profileImage.url) {
    return this.profileImage.url;
  }
  // Otherwise, return a generated avatar based on username
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.username)}&background=fe424d&color=fff&bold=true&size=200`;
};

// Virtual field for profile image
userSchema.virtual('defaultProfileImage').get(function() {
  return this.getProfileImage();
});

module.exports = mongoose.model("User", userSchema);
