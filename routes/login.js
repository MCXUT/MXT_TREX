const express = require("express");
const router = express.Router()

const keys = require("../config/keys");
const passportClient = require("../config/passportClient");
const passportPartner = require("../config/passportPartner");

router.get("/login", function(req,res){
  res.render("login");
})

router.post('/login', passportClient.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "back"
    // failureFlash: true,
    // successFlash: "Successfully logged in"
}),passportPartner.authenticate('local-partnerLogin', {
  successRedirect: "/",
  failureRedirect: "back"
}),(req, res) => {
});

module.exports = router;
