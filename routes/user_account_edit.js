const express = require("express"),
      moment = require("moment"),
      bcrypt = require("bcryptjs");

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
          return res.redirect("/user_profile/account_info");
        }
        if (!moment(req.body.birthday).isValid()) {
          req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 생일을 입력했는지 확인해주세요.");
          return res.redirect("/user_profile/account_info");
        }
        foundUser.dateOfBirth = moment(req.body.birthday).format("MMMM DD, YYYY");
        foundUser.category = req.body.category;
        foundUser.managerPosition = req.body.managerPosition;
        foundUser.managerPhoneNumber = req.body.managerPhoneNumber;
        foundUser.companyName = req.body.companyName;
        foundUser.companyAddress = req.body.companyAddress;
        foundUser.companyWebsite = req.body.companyWebsite;
        foundUser.companySNS = req.body.companySNS;
        foundUser.companyDescription = req.body.companyDescription;
        foundUser.kakaoID = req.body.kakaoID;
        foundUser.save((err) => {
          if (err) {
            console.log(err);
            return res.redirect("/user_profile/account_info");
          }
          console.log("Client Account Info Update Successful for " + foundUser.name);
          return res.redirect("/user_profile/account_info");
        });

      });
});


// POST route for updating client user information
router.post("/user_profile/basicPartnerInfo", (req, res) => {
    // Changing profile of a partner
    // Check that the user has input all the fields
    // if ((!req.body.numberAddress && !req.body.streetAddress) || !req.body.city || !req.body.country || !req.body.postalCode) {
    //     req.flash("error", "정보를 업데이트 할수 없습니다. 모든 정보를 입력했는지 확인해주세요.");
    //     return res.redirect("/user_profile/account_info");
    // }

    // Check each field individually if they are valid
    // validateAddress(req.body.numberAddress + " " + req.body.streetAddress);
    // validateAddress(req.body.city);
    // validateAddress(req.body.state);
    // validateAddress(req.body.country);
    if (req.body.postalCode != "") {
        validateAddress(req.body.postalCode);
    }

    var fullAddress = req.body.numberAddress + " " + req.body.streetAddress + ", " + req.body.city + ", " + req.body.country + ", " + req.body.postalCode;

    // Get coordinates of the new address
    googleMapsClient.geocode({
        address: fullAddress
    }, function(err, response) {
        if (err) {
            console.log(err);
            req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
            return res.redirect("/user_profile/account_info");
        } else {
            // Make sure we are able to get the coordinates of the given address, else throw error
            if (!response.json.results[0]) {
                req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
                return res.redirect("/user_profile/account_info");
            }
            var newCoordinates = {
                lat: response.json.results[0].geometry.location.lat,
                lng: response.json.results[0].geometry.location.lng
            }
            // Find and update client profile
            Partner.findById(req.user._id, function(err, foundUser) {
                if (err) {
                  console.log(err);
                  return res.redirect("/user_profile/account_info");
                }
                if (!moment(req.body.birthday).isValid()) {
                  req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 생일을 입력했는지 확인해주세요.");
                  return res.redirect("/user_profile/account_info");
                }
                foundUser.dateOfBirth = moment(req.body.birthday).format("MMMM DD, YYYY");
                foundUser.address.numberAddress = req.body.numberAddress;
                foundUser.address.streetAddress = req.body.streetAddress;
                foundUser.address.detailedAddress = req.body.detailedAddress;
                foundUser.address.city = req.body.city;
                // foundUser.address.state = req.body.state;
                foundUser.address.country = req.body.country;
                foundUser.address.postalCode = req.body.postalCode;
                foundUser.address.coordinates = newCoordinates;
                foundUser.phoneNumber = req.body.phoneNumber;
                foundUser.kakaoID = req.body.kakaoID;
                foundUser.save((err) => {
                      if (err) {
                        console.log(err);
                        req.flash("error", "정보를 업데이트 할수 없습니다. 다시 시도해 주세요.");
                        return res.redirect("/user_profile/account_info");
                      }
                      console.log("Partner Account Info Update Successful for " + foundUser.name);
                      return res.redirect("/user_profile/account_info");
                });

            });
        }
    });
});

router.post("/user_profile/account_info/security_client", (req, res) => {
    if(!(req.body.currentPassword && req.body.newPassword && req.body.newPasswordConfirm)) {
        req.flash("error_password", "Some information is missing");
        return res.redirect("/user_profile/account_info");
    }
    if(!(req.body.newPassword === req.body.newPasswordConfirm)) {
        req.flash("error_password", "The new passwords must match");
        return res.redirect("/user_profile/account_info");
    }

    Client.findById(req.user.id).then((currentUser) => {
        if(!currentUser) {
            req.flash("error_password", "No user is found");
            return res.redirect("/user_profile/account_info");
        }

        Client.comparePassword(req.body.currentPassword, currentUser.password, function(err, isMatch) {
            if(err) throw err;
            if(!isMatch) {
                req.flash("error_password", "Current passwords don't match");
                return res.redirect("/user_profile/account_info");
            } else {
                bcrypt.hash(req.body.newPassword, 10, function(err, hash) {
                    if(err) throw err;
                    currentUser.password = hash;
                    currentUser.save();

                    req.flash("success", "Password successfully changed");
                    return res.redirect("/user_profile/account_info");
                });
            }
        });
    });
});

router.post("/user_profile/account_info/security_partner", (req, res) => {
    if(!(req.body.currentPassword && req.body.newPassword && req.body.newPasswordConfirm)) {
        req.flash("error_password", "Some information is missing");
        return res.redirect("/user_profile/account_info");
    }
    if(!(req.body.newPassword === req.body.newPasswordConfirm)) {
        req.flash("error_password", "The new passwords must match");
        return res.redirect("/user_profile/account_info");
    }

    Partner.findById(req.user.id).then((currentUser) => {
        if(!currentUser) {
            req.flash("error_password", "No user is found");
            return res.redirect("/user_profile/account_info");
        }

        Partner.comparePassword(req.body.currentPassword, currentUser.password, function(err, isMatch) {
            if(err) throw err;
            if(!isMatch) {
                req.flash("error_password", "Current passwords don't match");
                return res.redirect("/user_profile/account_info");
            } else {
                bcrypt.hash(req.body.newPassword, 10, function(err, hash) {
                    if(err) throw err;
                    currentUser.password = hash;
                    currentUser.save();

                    req.flash("success", "Password successfully changed");
                    return res.redirect("/user_profile/account_info");
                });
            }
        });
    });
});




function validateAddress(address) {
    googleMapsClient.geocode({
        address: address
    }, function(err, response) {
        if (err) {
            console.log(err);
            req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
            return res.redirect("/user_profile/account_info");
        }
        // Make sure we are able to get the coordinates of the given address, else throw error
        if (!response.json.results[0]) {
            req.flash("error", "정보를 업데이트 할수 없습니다. 올바른 주소를 입력했는지 확인해주세요.");
            return res.redirect("/user_profile/account_info");
        }
    });
}

module.exports = router;
