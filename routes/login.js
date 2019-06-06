const express = require("express");
const router = express.Router()

const keys = require("../config/keys");
const passport = require("../config/passport");

router.get('/login', function(req,res){
  res.render("login");
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: "back",
    failureRedirect: "back",
    failureFlash: true,
    successFlash: "Successfully logged in"
}), (req, res) => {

});

module.exports = router;
