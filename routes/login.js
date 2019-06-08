const express = require("express");
const router = express.Router()

const keys = require("../config/keys");
const passportClient = require("../config/passportClient");
const passportPartner = require("../config/passportPartner");
const passport = require("../config/passport");

const Client = require("../models/Client");
const Partner = require("../models/Client");

router.get("/login", function(req,res){
  res.render("login");
})



router.post('/login', passport.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    // failureFlash: true,
    // successFlash: "Successfully logged in"
}), (req, res) => {

});

module.exports = router;
