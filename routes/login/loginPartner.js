const express = require("express");
const router = express.Router()

const localPartner = require("../../config/passportStrategies/localPartner");
const thirdPartyPartner = require("../../config/passportStrategies/thirdPartyPartner");


// Local Strategy for Partner log-in
router.post('/login/partner', localPartner.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "back",
    failureFlash: true,
    successFlash: "Successfully logged in"
}), (req, res) => {

});

// Facebook Login for Partner
router.get("/facebook/partner", thirdPartyPartner.authenticate("login-facebook", {
  scope: ["email","public_profile"]}));
// Facebook login callback
router.get("/facebook/callback", thirdPartyPartner.authenticate("login-facebook", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}), (req,res) => {

});

// KakaoTalk Login for Partner
router.get("/kakao/partner", thirdPartyPartner.authenticate("login-kakao"));

router.get("/kakao/callback", thirdPartyPartner.authenticate("login-kakao", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}));


module.exports = router;
