const express = require("express");
const router = express.Router();

const keys = require("../config/keys");

const googleMapsClient = require('@google/maps').createClient({
  key: keys.googleMapAPI.key
});


// GET route for viewing user profile
router.get("/user_profile", (req, res) => {
  if (!res.locals.currentUser) {
    res.redirect("/");
  } else {
    var type;
    if (res.locals.currentUser.type === "p") {
      type = "Partner";
    } else {
      type = "Client";
    }
    var userInfo = {
      name: res.locals.currentUser.name,
      type: type,
      birthday: res.locals.currentUser.dateOfBirth,
      address: res.locals.currentUser.address,
      phoneNumber: res.locals.currentUser.phoneNumber
    }
    res.render("userprofile", {userInfo: userInfo, langinfo: {
        langchoice: [],
        langproficiency: []
    }});
  }
});


// POST route for updating user information
router.post("/user_profile", (req, res) => {
  // var newInfo = req.body;
  // console.log(newInfo);
  
  // Changing profile info of a client
  if (res.locals.currentUser.type === "c") {
    // Get coordinates of the new address
    googleMapsClient.geocode({
      address: req.body.address
    }, function(err, response) {
      if (!err) {
        var newCoordinates = {
          lat: response.json.results[0].geometry.location.lat,
          lng: response.json.results[0].geometry.location.lng
        }
        // Update zipcode and its coordinates
        Client.findOneAndUpdate({ _id: res.locals.currentUser._id }, { $set: { dateOfBirth: req.body.birthday, address : req.body.address , coordinates: newCoordinates, phoneNumber: req.body.phoneNumber } }, function(err, board) {
          if (err) {
            console.log(err);
            res.redirect("/user_profile");
          };
          console.log("Profile Update Successful");
          res.redirect("/user_profile");
        });
      }
    });
  } else {// Changing profile of a partner
    // Get coordinates of the new address
    googleMapsClient.geocode({
      address: req.body.address
    }, function(err, response) {
      if (!err) {
        var newCoordinates = {
          lat: response.json.results[0].geometry.location.lat,
          lng: response.json.results[0].geometry.location.lng
        }
        console.log(newCoordinates);
        console.log(res.locals.currentUser._id);
        // Update zipcode and its coordinates
        Partner.findOneAndUpdate({ _id: res.locals.currentUser._id }, { $set: { birthday: req.body.birthday, address : req.body.address , coordinates: newCoordinates, phoneNumber: req.body.phoneNumber } }, function(err, board) {
          if (err) {
            console.log(err);
            res.redirect("/user_profile");
          };
          console.log("Profile Update Successful");
          res.redirect("/user_profile");
        });
      }
    });
  }
  
  // res.redirect("/user_profile");
});

router.post("/user_profile/language", (req, res) => {

    var newinfo = {
        langchoice: req.body.langchoice,
        langproficiency: req.body.langproficiency
    }
    console.log(newinfo);

    res.render("userprofile", {info: {}, langinfo: newinfo});
})

module.exports = router;
