const express = require("express");
const router = express.Router()

const localClient = require("../../config/passportStrategies/localClient");
const thirdPartyClient = require("../../config/passportStrategies/thirdPartyClient");

// Local Strategy for Client log-in
router.post('/login/client', localClient.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "back",
    failureFlash: true,
    successFlash: "Successfully logged in"
}), (req, res) => {

});

// Facebook Login for Client
router.get("/facebook/client", thirdPartyClient.authenticate("login-facebook", {
  scope: ["email","public_profile"]}));
// Facebook login callback
router.get("/facebook/callback", thirdPartyClient.authenticate("login-facebook", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}), (req,res) => {

});

// KakaoTalk Login for Client
router.get("/kakao", thirdPartyClient.authenticate("login-kakao"));

router.get("/kakao/callback", thirdPartyClient.authenticate("login-kakao", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}));

module.exports = router;
