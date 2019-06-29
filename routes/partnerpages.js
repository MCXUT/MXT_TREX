const express = require("express");
const router = express.Router();

const keys = require("../config/keys");
const Client = require("../models/Client");
const Partner = require("../models/Partner");
const PartnerProfile = require("../models/PartnerProfile");


// GET route for viewing partner profile page
router.get("/partner_profile/:id", function(req, res) {
    Partner.findById(req.params.id, function(err, foundUser) {
        // PartnerProfile.findById(foundUser.partnerProfile, function(err, foundProfile) { ... })
        res.render("partnerprofile", { thisPartner: foundUser });
    });
});


// POST route for save/unsave partner for clients
router.post("/save_current_partner", function(req, res) {
    // Find and update client profile savedPartners
    Client.findById(req.user._id, function(err, foundClient) {
        if (err) {
            console.log(err);
            return res.redirect("/partner_profile/" + req.body.partnerID);
        }
        if (req.body.saveOrDelete == "save") {
            foundClient.savedPartners.push(req.body.partnerID);
        } else {
            for (var i = 0; i < foundClient.savedPartners.length; i++) {
                if (foundClient.savedPartners[i] === req.body.partnerID) {
                    foundClient.savedPartners.splice(i, 1);
                }
            }
        }
        foundClient.save((err) => {
            if (err) {
                console.log(err);
                req.flash("error", "파트너를 저장하는데 실패했습니다. 다시 시도해주세요.")
                return res.redirect("/partner_profile/" + req.body.partnerID);
            }
            console.log("Partner Save Successful for " + foundClient.name);
            return res.redirect("/partner_profile/" + req.body.partnerID);
        });
    });
});


router.get("/find_partner", function(req,res){
  Partner.find({}, function(err, allPartners) {
    if (err) {
      console.log(err);
      req.flash("error", "파트너 목록을 불러오는데 문제가 발생했습니다. 다시 시도해주세요.");
      return res.redirect("/");
    }
    res.render("findpartner", { allPartners : allPartners , googleMapAPI: keys.googleMapAPI.key });
  });
  // res.render("findpartner");
});


router.get("/partner_page", function(req,res){
  res.render("partnerpage");
});

module.exports = router;
