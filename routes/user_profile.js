const express = require("express"),
      moment = require("moment");

const router = express.Router();

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
    // res.render("userprofile", {userInfo: {}, langinfo: {}});
  } else {
    var type;
    if (res.locals.currentUser.type === "p") {
      type = "Partner";
    } else {
      type = "Client";
    }
    var birthday;
    var displayBirthday;
    if (res.locals.currentUser.dateOfBirth) {
      birthday = moment(res.locals.currentUser.dateOfBirth).format('YYYY-MM-DD');
      displayBirthday = moment(birthday).format('MMMM DD, YYYY');
    } else {
      birthday = res.locals.currentUser.dateOfBirth;
    }
    var userInfo = {
      name: res.locals.currentUser.name,
      type: type,
      birthday: birthday,
      displayBirthday: displayBirthday,
      address: res.locals.currentUser.address,
      phoneNumber: res.locals.currentUser.phoneNumber
    };
    var langinfo = res.locals.currentUser.languages;
    res.render("userprofile", {userInfo: userInfo, langinfo: langinfo});
  }
});


// POST route for updating user information
router.post("/user_profile/basicInfo", (req, res) => {
  // var newInfo = req.body;
  // console.log(newInfo);

  // Changing profile info of a client
  if (res.locals.currentUser.type === "c") {
    // Get coordinates of the new address
    googleMapsClient.geocode({
      address: req.body.address
    }, function(err, response) {
      if (err) {
        console.log(err);
        req.flash("error", "Couldn't update profile. Please make sure you have put your correct address.");
        return res.redirect("/user_profile");
      } else {
        // Make sure we are able to get the coordinates of the given address, else throw error
        if (!response.json.results[0]) {
          req.flash("error", "Couldn't update profile. Please make sure you have put your correct address.");
          return res.redirect("/user_profile");
        }
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
  } else {// Changing profile of a partner
    // Get coordinates of the new address
    googleMapsClient.geocode({
      address: req.body.address
    }, function(err, response) {
      if (err) {
        console.log(err);
        req.flash("error", "Couldn't update profile. Please make sure you have put your correct address.");
        return res.redirect("/user_profile");
      } else {
        // Make sure we are able to get the coordinates of the given address, else throw error
        if (!response.json.results[0]) {
          req.flash("error", "Couldn't update profile. Please make sure you have put your correct address.");
          return res.redirect("/user_profile");
        }
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


// POST route for changing language profile info for language
router.post("/user_profile/language", (req, res) => {
  // Changing language profile info of a client
  if (res.locals.currentUser.type === "c") {
    var newLanguageInfo = {
      langchoice: req.body.langchoice,
      langproficiency: req.body.langproficiency
    }
    // Find and update client profile
    Client.findById(req.user._id, function(err, foundUser) {
      if (err) {
        console.log(err);
        return res.redirect("/user_profile");
      };
      foundUser.languages = newLanguageInfo;
      foundUser.save((err) => {
        if (err) {
          console.log(err);
          return res.redirect("/user_profile");
        }
        console.log("Profile Update Successful");
        return res.redirect("/user_profile");
      });

    });
  } else {// Changing language profile of a partner
    var newLanguageInfo = {
      langchoice: req.body.langchoice,
      langproficiency: req.body.langproficiency
    }
    // Find and update client profile
    Partner.findById(req.user._id, function(err, foundUser) {
      if (err) {
        console.log(err);
        return res.redirect("/user_profile");
      };
      foundUser.languages = newLanguageInfo;
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


router.post("/user_profile/security", (req, res) => {
    console.log(req.body);
    res.redirect("/user_profile");
});

module.exports = router;
