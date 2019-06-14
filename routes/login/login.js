const express = require("express");
const router = express.Router();

// const passport_config = require("../../config/passport_config");
// const localClient = require("../../config/passportStrategies/localClient");
// const thirdPartyClient = require("../../config/passportStrategies/thirdPartyClient");
// const localPartner = require("../../config/passportStrategies/localPartner");
// const thirdPartyPartner = require("../../config/passportStrategies/thirdPartyPartner");

router.get("/login", function(req,res){
  res.render("login");
});


router.get("/logout", function(req,res) {
  req.logout();
  res.redirect("back");
});

module.exports = router;
