const express = require("express");
const router = express.Router()

const localPartner = require("../../config/passportStrategies/localPartner");
const thirdPartyPartner = require("../../config/passportStrategies/thirdPartyPartner");

// Local Strategy for Client log-in
router.post('/login/client', passport.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "back",
    failureFlash: true,
    successFlash: "Successfully logged in"
}), (req, res) => {

});

// Local Strategy for Partner log-in
router.post('/login/partner', passport.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "back",
    failureFlash: true,
    successFlash: "Successfully logged in"
}), (req, res) => {

});

// Facebook Login for Client
router.get("/facebook", passport.authenticate("facebook", {
  scope: ["email","public_profile"]}));
// Facebook login callback
router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}), (req,res) => {

});

// Facebook Login for Partner
router.get("/facebook", passport.authenticate("facebook", {
  scope: ["email","public_profile"]}));
// Facebook login callback
router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}), (req,res) => {

});


router.get("/kakao", passport.authenticate("login-kakao"));

router.get("/kakao/callback", passport.authenticate("login-kakao", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}));


module.exports = router;