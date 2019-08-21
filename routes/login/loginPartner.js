const express = require("express");
const router = express.Router()

const localPartner = require("../../config/passportStrategies/localPartner");
const thirdPartyPartner = require("../../config/passportStrategies/thirdPartyPartner");

// Local Strategy for Partner log-in
router.post('/login/partner', localPartner.authenticate('local-partner', {
    failureRedirect: "back",
    failureFlash: true,
    successFlash: "Successfully logged in"
}), (req, res) => {
    if (req.body.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== "/login")) {
        return res.redirect(req.body.referer);
    } else {
        res.redirect("/");
    }
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

// Naver Login for Partner
router.get("/naver/partner", thirdPartyPartner.authenticate('partner-naver'));

router.get("/naver/callback/partner", thirdPartyPartner.authenticate('partner-naver', {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}));


module.exports = router;
