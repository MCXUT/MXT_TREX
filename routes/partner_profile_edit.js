const express = require("express"),
      moment = require("moment");

const router = express.Router();

const keys = require("../config/keys");
const Client = require("../models/Client");
const Partner = require("../models/Partner");

const googleMapsClient = require('@google/maps').createClient({
  key: keys.googleMapAPI.key
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




module.exports = router;