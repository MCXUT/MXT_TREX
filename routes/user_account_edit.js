const express = require("express"),
      moment = require("moment");

const router = express.Router();

const keys = require("../config/keys");
const Client = require("../models/Client");
const Partner = require("../models/Partner");

const googleMapsClient = require('@google/maps').createClient({
  key: keys.googleMapAPI.key
});


// POST route for updating client user information
router.post("/user_profile/basicClientInfo", (req, res) => {
      // Find and update client profile
      Client.findById(req.user._id, function(err, foundUser) {
        if (err) {
          console.log(err);
          return res.redirect("/user_profile");
        }
        if (!moment(req.body.birthday).isValid()) {
          req.flash("error_account", "정보를 업데이트 할수 없습니다. 올바른 생일을 입력했는지 확인해주세요.");
          return res.redirect("/user_profile");
        }
        foundUser.dateOfBirth = new Date(moment(req.body.birthday).format("YYYY-MMMM-DD"));
        foundUser.category = req.body.category;
        foundUser.managerNamePosition = req.body.managerNamePosition;
        foundUser.managerPhoneNumber = req.body.managerPhoneNumber;
        foundUser.companyWebsite = req.body.companyWebsite;
        foundUser.companySNS = req.body.companySNS;
        foundUser.companyDescription = req.body.companyDescription;
        foundUser.kakaoID = req.body.kakaoID;
        foundUser.save((err) => {
          if (err) {
            console.log(err);
            return res.redirect("/user_profile");
          }
          console.log("Client Profile Update Successful for " + foundUser.name);
          return res.redirect("/user_profile");
        });

      });
});


// POST route for updating client user information
router.post("/user_profile/basicPartnerInfo", (req, res) => {
    // Changing profile of a partner
    // Check that the user has input all the fields
    if (!req.body.streetAddress || !req.body.city || !req.body.country || !req.body.postalCode) {
        req.flash("error_account", "정보를 업데이트 할수 없습니다. 모든 정보를 입력했는지 확인해주세요.");
        return res.redirect("/user_profile");
    }
    
    // Check each field individually if they are valid
    validateAddress(req.body.streetAddress);
    validateAddress(req.body.city);
    validateAddress(req.body.country);
    validateAddress(req.body.postalCode);
    
    var fullAddress = req.body.streetAddress + ", " + req.body.city + ", " + req.body.country + ", " + req.body.postalCode;
      
    // Get coordinates of the new address
    googleMapsClient.geocode({
        address: fullAddress
    }, function(err, response) {
        if (err) {
            console.log(err);
            req.flash("error_account", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
            return res.redirect("/user_profile");
        } else {
            // Make sure we are able to get the coordinates of the given address, else throw error
            if (!response.json.results[0]) {
                req.flash("error_account", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
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
                  req.flash("error_account", "정보를 업데이트 할수 없습니다. 올바른 생일을 입력했는지 확인해주세요.");
                  return res.redirect("/user_profile");
                }
                foundUser.dateOfBirth = new Date(moment(req.body.birthday).format("YYYY-MMMM-DD"));
                foundUser.address.streetAddress = req.body.streetAddress;
                foundUser.address.city = req.body.city;
                foundUser.address.country = req.body.country;
                foundUser.address.postalCode = req.body.postalCode;
                foundUser.address.coordinates = newCoordinates;
                foundUser.phoneNumber = req.body.phoneNumber;
                foundUser.kakaoID = req.body.kakaoID;
                foundUser.save((err) => {
                      if (err) {
                        console.log(err);
                        req.flash("error_account", "정보를 업데이트 할수 없습니다. 다시 시도해 주세요.");
                        return res.redirect("/user_profile");
                      }
                      console.log("Partner Profile Update Successful for " + foundUser.name);
                      return res.redirect("/user_account");
                });

            });
        }
    });
});


router.post("/user_profile/security", (req, res) => {
    console.log(req.body);
    res.redirect("/user_profile");
});




function validateAddress(address) {
    googleMapsClient.geocode({
        address: address
    }, function(err, response) {
        if (err) {
            console.log(err);
            req.flash("error_account", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
            return res.redirect("/user_profile");
        }
        // Make sure we are able to get the coordinates of the given address, else throw error
        if (!response.json.results[0]) {
            req.flash("error_account", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
            return res.redirect("/user_profile");
        }
    });
}

module.exports = router;