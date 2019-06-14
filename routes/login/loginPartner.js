const express = require("express");
const router = express.Router()

const localPartner = require("../../config/passportStrategies/localPartner");
const thirdPartyPartner = require("../../config/passportStrategies/thirdPartyPartner");

// Local Strategy for Partner log-in
router.post('/login/partner', localPartner.authenticate('local-partner', {
    successRedirect: "/",
    failureRedirect: "back",
    failureFlash: true,
    successFlash: "Successfully logged in"
}), (req, res) => {

});

// Facebook Login for Partner
router.get("/facebook/partner", thirdPartyPartner.authenticate("partner-facebook", {
  scope: ["email","public_profile"]}));
// Facebook login callback
router.get("/facebook/callback/partner", thirdPartyPartner.authenticate("partner-facebook", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}), (req,res) => {

});

// KakaoTalk Login for Partner
router.get("/kakao/partner", thirdPartyPartner.authenticate("partner-kakao"));

router.get("/kakao/callback/partner", thirdPartyPartner.authenticate("partner-kakao", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}));

// Google Login for Partner
router.get("/google/partner", thirdPartyPartner.authenticate('partner-google', {
    scope: ['email', 'profile']
}));
router.get("/google/callback/partner", thirdPartyPartner.authenticate('partner-google'), (req, res) => {
    res.redirect("/");
});


module.exports = router;
