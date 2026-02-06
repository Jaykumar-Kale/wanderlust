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

module.exports = mongoose.model("User", userSchema);
