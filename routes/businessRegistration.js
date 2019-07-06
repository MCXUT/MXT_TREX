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
const PartnerProfile = require("../models/PartnerProfile");


// Create mongo connection
const mongoURI = "mongodb+srv://" + keys.mongodb2.user + ":" + keys.mongodb2.pass + "@cluster0-jdwe1.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoURI, {useNewUrlParser: true});
const db = mongoose.connection;

// Init gfs
let gfs;

db.once('open', () => {
    // Initialize stream
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection("businessRegistrations");
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
          bucketName: "businessRegistrations"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

////////////////////////////ROUTES////////////////////////////////////


// POST route for uploading business registration for agency
router.post("/user_profile/businessRegistrationUpload", upload.array("businessRegistration"), (req, res) => {
    if (req.files) {
        PartnerProfile.findById(req.user.partnerProfile, function(err, foundProfile) {
            if (err) {
                console.log(err);
                return res.redirect("/user_profile");
            };
            for(var i = 0; i < req.files.length; i++) {
                foundProfile.businessRegistration.push(req.files[i].filename);
            }
            foundProfile.save((err) => {
                if (err) {
                    console.log(err);
                    return res.redirect("/user_profile");
                }
                console.log("Business Registration Upload Successful");
                return res.redirect("/user_profile");
            });
        });
    } else {
        res.redirect("/user_profile");
    }
});



// @route GET /businessRegistration/:filename
// @desc Display businessRegistration
router.get("/businessRegistration/:filename", (req, res) => {
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



// @route DELETE /user_profile/deleteBusinessRegistration/:filename
// @desc Delete the particular business registration of the current partner
router.delete("/user_profile/deleteBusinessRegistration/:filename", (req, res) => {
    PartnerProfile.update(
        { _id: req.user.partnerProfile },
        { $pull: { businessRegistration :  req.params.filename  } }, function(err, result) {
            if (err) {
                console.log(err);
                return res.redirect("/user_profile");
            };
            
            gfs.remove({filename: req.params.filename, root: "businessRegistrations"}, (err, gridStore) => {
                if (err) {
                    console.log(err);
                    return res.redirect("/user_profile");
                }
                console.log("Business Registration Delete Successful");
                return res.redirect("/user_profile");
            });
        });
});

module.exports = router;
