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
    failureRedirect: "/auth/login"
    // failureFlash: true,
    // successFlash: "Successfully logged in"
}), (req, res) => {

});


// router.post('/login/client',passport.authenticate("local-clientLogin"){
// 
// }, (foundUser, res) => {
// 
// });
// 
// router.post('/login/partner',passport.authenticate("local-partnerLogin"){
// 
// }, (foundUser, res) => {
// 
// });

router.get("/logout", function(req,res) {
  req.logout();
  res.redirect("back");
});

module.exports = router;
