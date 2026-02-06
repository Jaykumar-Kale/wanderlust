const Listing = require("../models/listing");

module.exports.index = async (req, res) => {

    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    return res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.image = { url, filename };
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully made a new listing");
    res.redirect("/listings");
  };

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings"); // ✅ stop here
    }

    let OriginalImageUrl = listing.image.url;
    // Adjusting image size for preview
    OriginalImageUrl = OriginalImageUrl.replace("/upload", "/upload/h_250,w_250,c_fill");

    res.render("listings/edit.ejs", { listing, OriginalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    let listing = await Listing.findById(id);
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    // if image is being updated
    if(typeof req.file !== 'undefined'){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
    }

    req.flash("success", "Successfully made a new listing");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully Deleted a listing");
    res.redirect("/listings");
};