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
  gfs.collection("profilePics");
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
          bucketName: "profilePics"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

////////////////////////////ROUTES////////////////////////////////////


// POST route for changing profile picture for client
router.post("/user_profile/profilePicUpload_client", upload.single("profilePic"), (req, res) => {
  if (req.file) { // if a new profile picture was posted
    // if the current user is a client
    // Find and update client profile picture
    Client.findById(req.user._id, function(err, foundUser) {
      if (err) {
        console.log(err);
        return res.redirect("/user_profile");
      };
      if (foundUser.pic) {
        gfs.remove({filename: foundUser.pic, root: "profilePics"}, (err, gridStore) => {
          if (err) { throw err; }
        });
      }
      foundUser.pic = req.file.filename;
      foundUser.save((err) => {
        if (err) {
          console.log(err);
          return res.redirect("/user_profile");
        }
        console.log("Client Profile Picture Update Successful");
        return res.redirect("/user_profile");
      });
    });
  } else { // if no new picture is selected
    res.redirect("/user_profile");
  }
});



// POST route for changing profile picture for partner
router.post("/user_profile/profilePicUpload_partner", upload.single("profilePic"), (req, res) => {
  if (req.file) { // if a new profile picture was posted
      // if the current user is a partner
      // Find and update client profile picture
      Partner.findById(req.user._id, function(err, foundUser) {
        if (err) {
          console.log(err);
          return res.redirect("/user_profile");
        };
        if (foundUser.pic) {
          gfs.remove({filename: foundUser.pic, root: "profilePics"}, (err, gridStore) => {
            if (err) { throw err; }
          });
        }
        foundUser.pic = req.file.filename;
        foundUser.save((err) => {
          if (err) {
            console.log(err);
            return res.redirect("/user_profile");
          }
          console.log("Partner Profile Picture Update Successful");
          return res.redirect("/user_profile");
        });
      });
  } else { // if no new picture is selected
    res.redirect("/user_profile");
  }
});



// @route GET /image/:filename
// @desc Display image
router.get("/image/:filename", (req, res) => {
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
router.delete("/user_profile/deleteClientProfilePic", (req, res) => {
  // if the current user is a client
  // Find and delete client profile picture
  Client.findById(req.user._id, function(err, foundUser) {
    if (err) {
      console.log(err);
      return res.redirect("/user_profile");
    };
    if (foundUser.pic) {
      gfs.remove({filename: foundUser.pic, root: "profilePics"}, (err, gridStore) => {
        if (err) { throw err; }
      });
    }
    foundUser.pic = "";
    foundUser.save((err) => {
      if (err) {
        console.log(err);
        return res.redirect("/user_profile");
      }
      console.log("Client Profile Picture Delete Successful");
      return res.redirect("/user_profile");
    });
  });
});



// @route DELETE /user_profile/deletePartnerProfilePic
// @desc Delete the current profile picture of the current partner
router.delete("/user_profile/deletePartnerProfilePic", (req, res) => {
  // if the current user is a partner
  // Find and delete partner profile picture
  Partner.findById(req.user._id, function(err, foundUser) {
    if (err) {
      console.log(err);
      return res.redirect("/user_profile");
    };
    if (foundUser.pic) {
      gfs.remove({filename: foundUser.pic, root: "profilePics"}, (err, gridStore) => {
        if (err) { throw err; }
      });
    }
    foundUser.pic = "";
    foundUser.save((err) => {
      if (err) {
        console.log(err);
        return res.redirect("/user_profile");
      }
      console.log("Partner Profile Picture Delete Successful");
      return res.redirect("/user_profile");
    });
  });
});

module.exports = router;