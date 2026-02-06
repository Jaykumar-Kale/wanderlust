const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync');
const passport = require("passport");
const { route } = require('./user');
const { saveRedirectUrl } = require('../middleware.js');

const userController = require("../controllers/users.js");
//rouutes for user signup, login, logout

router.route("/signup")
    .get( userController.renderSignupForm) //rendering the form
    .post( wrapAsync (userController.signupUser)); //handling the signup logic

router.route("/login")
    .get(userController.renderLoginForm) //rendering the login form
//handling the login logic using passport as middleware in the middle of the
    .post(
    saveRedirectUrl,
    passport.authenticate("local",
    { failureFlash: true, failureRedirect: "/login" }),
   userController.loginUser
);

router.get("/logout", userController.logoutUser);

module.exports = router;
