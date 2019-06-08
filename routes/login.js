const express = require("express");
const router = express.Router()

const keys = require("../config/keys");
const passportClient = require("../config/passportClient");
const passportPartner = require("../config/passportPartner");
const Client = require("../models/Client");
const Partner = require("../models/Client");

router.get("/login", function(req,res){
  res.render("login");
})



router.post('/login/client',passport.authenticate("local-clientLogin"){

}, (foundUser, res) => {

});

router.post('/login/partner',passport.authenticate("local-partnerLogin"){

}, (foundUser, res) => {

});

module.exports = router;
