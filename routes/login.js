const express = require("express");
const router = express.Router()

const keys = require("../config/keys");
const passport = require("../config/passport");
const Client = require("../models/Client");
const Partner = require("../models/Client");

router.get("/login", function(req,res){
  res.render("login");
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "back",
    failureFlash: true,
    successFlash: "Successfully logged in"
}), (req, res) => {

});

// Facebook Login
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


router.get("/logout", function(req,res) {
  req.logout();
  res.redirect("back");
});

module.exports = router;
