const express = require("express");
const router = express.Router()

router.get("/partner_page", function(req,res){
  res.render("partnerpage");
});

router.get("/partner_profile", function(req, res) {
  res.render("partnerprofile");
});

router.get("/find_partner", function(req,res){
  res.render("findpartner");
});

module.exports = router;
