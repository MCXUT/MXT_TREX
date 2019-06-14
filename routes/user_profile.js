const express = require("express");
const moment = require("moment");
const router = express.Router();

<<<<<<< HEAD
=======

>>>>>>> 48ffe6501a2700543a3edfb1789fee4c39af317f
const keys = require("../config/keys");
const Client = require("../models/Client");
const Partner = require("../models/Partner");

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
    var birthday = moment(res.locals.currentUser.dateOfBirth).format('YYYY-MM-DD');
    var displayBirthday = moment(birthday).format('MMMM DD, YYYY');
    var userInfo = {
      name: res.locals.currentUser.name,
      type: type,
      birthday: birthday,
      displayBirthday: displayBirthday,
      address: res.locals.currentUser.address,
      phoneNumber: res.locals.currentUser.phoneNumber
    }
    res.render("userprofile", {userInfo: userInfo, langinfo: {
        // langchoice: [],
        // langproficiency: []
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
        // Find and update client profile
        Client.findById(req.user._id, function(err, foundUser) {
          if (err) {
            console.log(err);
            return res.redirect("/user_profile");
          };
          foundUser.dateOfBirth = req.body.birthday;
          foundUser.address = req.body.address;
          foundUser.coordinates = newCoordinates;
          foundUser.phoneNumber = req.body.phoneNumber;
          foundUser.save((err) => {
            if (err) {
              console.log(err);
              return res.redirect("/user_profile");
            }
            console.log("Profile Update Successful");
            return res.redirect("/user_profile");
          });

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
        // Find and update client profile
        Partner.findById(req.user._id, function(err, foundUser) {
          if (err) {
            console.log(err);
            return res.redirect("/user_profile");
          };
          foundUser.dateOfBirth = new Date(moment(req.body.birthday).format("YYYY-MMMM-DD"));
          foundUser.address = req.body.address;
          foundUser.coordinates = newCoordinates;
          foundUser.phoneNumber = req.body.phoneNumber;
          foundUser.save((err) => {
            if (err) {
              console.log(err);
              return res.redirect("/user_profile");
            }
            console.log("Profile Update Successful");
            return res.redirect("/user_profile");
          });

        });
      }
    });
  }

});

router.post("/user_profile/language", (req, res) => {
    var type;
    if (res.locals.currentUser.type === "p") {
      type = "Partner";
    } else {
      type = "Client";
    }
    var newinfo = {
        langchoice: req.body.langchoice,
        langproficiency: req.body.langproficiency
    }
    console.log(newinfo);
    var userInfo = {
      name: res.locals.currentUser.name,
      type: type,
      birthday: res.locals.currentUser.dateOfBirth,
      address: res.locals.currentUser.address,
      phoneNumber: res.locals.currentUser.phoneNumber
    }
    res.render("userprofile", {userInfo: userInfo, langinfo: newinfo});
});

router.post("/user_profile/security", (req, res) => {
    console.log(req.body);
    res.redirect("/user_profile");
});

module.exports = router;
