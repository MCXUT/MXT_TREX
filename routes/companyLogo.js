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
  gfs.collection("companyLogos");
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
          bucketName: "companyLogos"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

////////////////////////////ROUTES////////////////////////////////////


// POST route for changing company logo for client
router.post("/user_profile/:tab/companyLogoUpload", upload.single("companyLogo"), (req, res) => {
    console.log("fuck");
  if (req.file) {
    // Find and update client company logo
    Client.findById(req.user._id, function(err, foundUser) {
      if (err) {
        console.log(err);
        return res.redirect("/user_profile/" + req.params.tab);
      };
      // if logo already exists, delete it
      if (foundUser.companyLogo) {
        gfs.remove({filename: foundUser.companyLogo, root: "companyLogos"}, (err, gridStore) => {
          if (err) { throw err; }
        });
      }
      foundUser.companyLogo = req.file.filename;
      foundUser.save((err) => {
        if (err) {
          console.log(err);
          return res.redirect("/user_profile/" + req.params.tab);
        }
        console.log("Client Company Logo Update Successful");
        return res.redirect("/user_profile/" + req.params.tab);
      });
    });
  } else { // if no new picture is selected
    res.redirect("/user_profile/" + req.params.tab);
  }
});


// @route GET /logo/:filename
// @desc Display logo
router.get("/logo/:filename", (req, res) => {
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


// @route DELETE /user_profile/deleteClientProfilePic
// @desc Delete the current profile picture of the current client
router.delete("/user_profile/:tab/deleteCompanyLogo", (req, res) => {
  // if the current user is a client
  // Find and delete client profile picture
  Client.findById(req.user._id, function(err, foundUser) {
    if (err) {
      console.log(err);
      return res.redirect("/user_profile/" + req.params.tab);
    };
    // if a logo exists, delete
    if (foundUser.companyLogo) {
      gfs.remove({filename: foundUser.companyLogo, root: "companyLogos"}, (err, gridStore) => {
        if (err) { throw err; }
      });
    }
    foundUser.companyLogo = "";
    foundUser.save((err) => {
      if (err) {
        console.log(err);
        return res.redirect("/user_profile/" + req.params.tab);
      }
      console.log("Client Company Logo Delete Successful");
      return res.redirect("/user_profile/" + req.params.tab);
    });
  });
});


module.exports = router;
