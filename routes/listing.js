const express = require('express');
const router = express.Router();
const wrapAync = require("../utils/wrapAsync.js"); // keeping your util name
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");


const multer = require('multer');
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

// requiring the controller
const listingController = require("../controllers/listing.js");
//compact version using route
router.route("/")
  //Index
  .get(wrapAync(listingController.index))
  //create
    .post(
      isLoggedIn,
      upload.single('listing[image]') ,
      validateListing,
      wrapAync(listingController.createListing)
  );
  
// New
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .put(       //Update
    isLoggedIn,
    isOwner,
    upload.single('listing[image]') ,
    validateListing,
    wrapAync(listingController.updateListing)
  )
  .delete(   //Destroy
    isLoggedIn,
    isOwner,
    wrapAync(listingController.destroyListing)
  )
  .get(      //Show
    wrapAync(listingController.showListing)
  );


// Edit
router.get(
  "/:id/edit", isLoggedIn,
  wrapAync(listingController.renderEditForm)
);
module.exports = router;