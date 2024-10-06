const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");
const User = require("../models/User");

// Configuration for multer file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Create Listing API
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files); 
    try {
        // Take information from the form
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        } = req.body;

        // Validate required fields
        if (!creator || !category || !type || !streetAddress || !city || !province || !country || !price) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Handle listing photos
        const listingPhotos = req.files;
        if (!listingPhotos || listingPhotos.length === 0) {
            return res.status(400).send("No file uploaded.");
        }
        const listingPhotoPaths = listingPhotos.map((file) => file.path);

        // Create a new listing
        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        });

        // Save the new listing
        await newListing.save();

        res.status(200).json(newListing);

    } catch (err) {
        res.status(500).json({ message: "Failed to create listing.", error: err.message });
        console.log(err);
    }
});

// Get listings
router.get("/", async (req, res) => {
    const qCategory = req.query.category;
    try {
        let listings;
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator");
        } else {
            listings = await Listing.find().populate("creator");
        }

        res.status(200).json(listings);

    } catch (err) {
        res.status(500).json({ message: "Failed to fetch listings.", error: err.message });
        console.log(err);
    }
});

module.exports = router;
