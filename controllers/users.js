const User = require("../models/user.js");
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}; 
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.signupUser = async (req, res) => {
    
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password); //register method is added by passport-local-mongoose

        console.log(registeredUser);
        req.login(registeredUser, (err) => { //login method is added by passport
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};
module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye! You have logged out successfully.");
        res.redirect("/listings");
    });
};
