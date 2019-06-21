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
    var accountInfo = {
      name: res.locals.currentUser.name,
      type: type,
      birthday: birthday,
      displayBirthday: displayBirthday,
      address: res.locals.currentUser.address,
      phoneNumber: res.locals.currentUser.phoneNumber
    };

    if (type === "Client") {
      res.render("userprofile_client", {accountInfo: accountInfo});
    } else {
      res.render("userprofile_partner", {accountInfo: accountInfo, langinfo: res.locals.currentUser.languages});
    }
  }
});


// POST route for updating client user information
router.post("/user_profile/basicClientInfo", (req, res) => {
  // Changing profile info of a client
  if (!req.body.streetAddress || !req.body.city || !req.body.country || !req.body.postalCode) {
    req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
    return res.redirect("/user_profile");
  }
  var fullAddress = req.body.streetAddress + ", " + req.body.city + ", " + req.body.country + ", " + req.body.postalCode;
  // Get coordinates of the new address
  googleMapsClient.geocode({
    address: fullAddress
  }, function(err, response) {
    if (err) {
      console.log(err);
      req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
      return res.redirect("/user_profile");
    } else {
      // Make sure we are able to get the coordinates of the given address, else throw error
      if (!response.json.results[0]) {
        req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
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
        }
        if (!moment(req.body.birthday).isValid()) {
          req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 생일을 입력했는지 확인해주세요.");
          return res.redirect("/user_profile");
        }
        foundUser.dateOfBirth = new Date(moment(req.body.birthday).format("YYYY-MMMM-DD"));
        foundUser.address.streetAddress = req.body.streetAddress;
        foundUser.address.city = req.body.city;
        foundUser.address.country = req.body.country;
        foundUser.address.postalCode = req.body.postalCode;
        foundUser.address.coordinates = newCoordinates;
        foundUser.phoneNumber = req.body.phoneNumber;
        foundUser.save((err) => {
          if (err) {
            console.log(err);
            return res.redirect("/user_profile");
          }
          console.log("Client Profile Update Successful for " + foundUser.name);
          return res.redirect("/user_profile");
        });

      });
    }
  });
});


// POST route for updating client user information
router.post("/user_profile/basicPartnerInfo", (req, res) => {
  // Changing profile of a partner
  if (!req.body.streetAddress || !req.body.city || !req.body.country || !req.body.postalCode) {
    req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
    return res.redirect("/user_profile");
  }
  var fullAddress = req.body.streetAddress + ", " + req.body.city + ", " + req.body.country + ", " + req.body.postalCode;
  // Get coordinates of the new address
  googleMapsClient.geocode({
    address: fullAddress
  }, function(err, response) {
    if (err) {
      console.log(err);
      req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
      return res.redirect("/user_profile");
    } else {
      // Make sure we are able to get the coordinates of the given address, else throw error
      if (!response.json.results[0]) {
        req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
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
        }
        if (!moment(req.body.birthday).isValid()) {
          req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 생일을 입력했는지 확인해주세요.");
          return res.redirect("/user_profile");
        }
        foundUser.dateOfBirth = new Date(moment(req.body.birthday).format("YYYY-MMMM-DD"));
        foundUser.address.streetAddress = req.body.streetAddress;
        foundUser.address.city = req.body.city;
        foundUser.address.country = req.body.country;
        foundUser.address.postalCode = req.body.postalCode;
        foundUser.address.coordinates = newCoordinates;
        foundUser.phoneNumber = req.body.phoneNumber;
        foundUser.save((err) => {
          if (err) {
            console.log(err);
            return res.redirect("/user_profile");
          }
          console.log("Partner Profile Update Successful for " + foundUser.name);
          return res.redirect("/user_profile");
        });

      });
    }
  });
});



// POST route for changing language profile info for language
router.post("/user_profile/language", (req, res) => {
    // Changing language profile of a partner
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
        console.log("Partner Profile Update Successful (Language) for " + foundUser.name);
        return res.redirect("/user_profile");
      });

    });
});


router.post("/user_profile/security", (req, res) => {
    console.log(req.body);
    res.redirect("/user_profile");
});

module.exports = router;
