const express = require("express"),
      mongoose = require("mongoose"),
      multer = require("multer"),//For storing pictures in db
      GridFsStorage = require("multer-gridfs-storage"),
      Grid = require("gridfs-stream"),
      path = require("path"),
      crypto = require("crypto"),
      mongodb = require("mongodb");
const app = express();
const router = express.Router();

const keys = require("../config/keys");
const Client = require("../models/Client");
const Partner = require("../models/Partner");


// Create mongo connection
// const mongoURI = "mongodb+srv://" + keys.mongodb.user + ":" + keys.mongodb.pass + "@cluster0-vnpud.mongodb.net/test?retryWrites=true&w=majority";
const mongoURI = "mongodb+srv://" + keys.mongodb2.user + ":" + keys.mongodb2.pass + "@cluster0-jdwe1.mongodb.net/test?retryWrites=true&w=majority"
// const mongoURI = "mongodb+srv://mxt:1q2w3e4r!@cluster0-gdoa3.mongodb.net/test?retryWrites=true";
// const mongoURI = "mongodb://localhost/imageupload";
mongoose.connect(mongoURI, {useNewUrlParser: true});
const db = mongoose.connection;
// const db = mongoose.createConnection(mongoURI, {useNewUrlParser: true});

// Init gfs
let gfs;

db.once('open', () => {
    // Initialize stream
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection("coverPhotos");
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "coverPhotos"
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

////////////////////////////ROUTES////////////////////////////////////



// POST route for changing cover photo for partner
router.post("/user_profile/:tab/coverPhotoUpload_partner", upload.single("coverPhoto"), (req, res) => {
    if (req.file) { // if a new cover photo was posted
        // if the current user is a partner
        // Find and update client cover photo
        Partner.findById(req.user._id, function(err, foundUser) {
            if (err) {
                console.log(err);
                return res.redirect("/user_profile");
            };
            // If user already has a cover photo, delete it first
            if (foundUser.coverPhoto) {
                gfs.remove({filename: foundUser.coverPhoto, root: "coverPhotos"}, (err, gridStore) => {
                    if (err) { throw err; }
                });
            }
            foundUser.coverPhoto = req.file.filename;
            foundUser.save((err) => {
                if (err) {
                    console.log(err);
                    return res.redirect("/user_profile");
                }
                console.log("Partner Cover Photo Update Successful");
                return res.redirect("/user_profile/" + req.params.tab);
            });
        });
    } else { // if no new picture is selected
        res.redirect("/user_profile");
    }
});



// @route GET /coverPhoto/:filename
// @desc Display cover photo
router.get("/coverPhoto/:filename", (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        // Check if file
        if (!file || file.length ==0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
});




// @route DELETE /user_profile/deletePartnerCoverPhoto
// @desc Delete the current cover photo of the current partner
router.delete("/user_profile/:tab/deletePartnerCoverPhoto", (req, res) => {
    // Find and delete partner cover photo
    Partner.findById(req.user._id, function(err, foundUser) {
        if (err) {
            console.log(err);
            return res.redirect("/user_profile");
        };
        if (foundUser.coverPhoto) {
            gfs.remove({filename: foundUser.coverPhoto, root: "coverPhotos"}, (err, gridStore) => {
                if (err) {
                    console.log(err);
                    return res.redirect("/user_profile");
                }
            });
        }
        foundUser.coverPhoto = "";
        foundUser.save((err) => {
            if (err) {
                console.log(err);
                return res.redirect("/user_profile");
            }
            console.log("Partner Cover Photo Delete Successful");
            return res.redirect("/user_profile/" + req.params.tab);
        });
    });
});

module.exports = router;
