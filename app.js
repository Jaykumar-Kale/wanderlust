if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
//require routes
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsmate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in Mongo Session Store : ", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure:true, //only works on https
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //1 week from now
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.session());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate())); //authenticate method is added by passport-local-mongoose

passport.serializeUser(User.serializeUser()); //serializeUser method is added by passport-local-mongoose
passport.deserializeUser(User.deserializeUser()); //deserializeUser method is added by passport-local-mongoose

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeuser = new User({
//     email: "abc@gmail.com",
//     username: "demouser",
//   });
//   const newUser = await User.register(fakeuser, "helloworld"); //register method is added by passport-local-mongoose
//   res.send(newUser);
// });

//use routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// ------------------- Routes -----------------------

// ---------- Catch-all 404 (keep last before error handler) ----------
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found !!"));
});

// ---------- Error handler ----------
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  if (!err.message) err.message = "Something went wrong!!!";
  res.status(statusCode).render("error.ejs", { err });
});

// ---------- Server ----------
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
