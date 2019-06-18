const express = require("express");
const router = express.Router();

const Client = require("../models/Client");
const Partner = require("../models/Partner");


router.get("/partner_page", function(req,res){
  res.render("partnerpage");
});

router.get("/partner_profile/:id", function(req, res) {
  Partner.findById(req.params.id, function(err, foundUser) {
    res.render("partnerprofile", { thisPartner: foundUser });
  });
});

router.get("/find_partner", function(req,res){
  Partner.find({}, function(err, allPartners) {
    if (err) {
      console.log(err);
      req.flash("error", "파트너 목록을 불러오는데 문제가 발생했습니다. 다시 시도해주세요.");
      return res.redirect("/");
    }
    res.render("findpartner", { allPartners : allPartners });
  });
  // res.render("findpartner");
});

module.exports = router;
