const express = require("express");
const router = express.Router();

const keys = require("../config/keys");
const Client = require("../models/Client");
const Partner = require("../models/Partner");
const PartnerProfile = require("../models/PartnerProfile");
const Rating = require("../models/Rating");
const Service = require("../models/Service");
const Question = require("../models/Question");
const Task = require("../models/Task");
const async = require("async");

router.get("/partner_page", function(req, res) {
    Task.find({}, (err, allTasks) => {
        if (err) {
            console.log(err);
            req.flash("error", "업무 목록을 불러오는데 문제가 발생했습니다. 다시 시도해주세요.");
            return res.redirect("/");
        }

        res.render("partnerpage", { allTasks: allTasks });
    });
});

// GET route for viewing partner profile page
router.get("/partner_profile/:id", function(req, res) {
    Partner.findById(req.params.id).populate("ratings").exec(function(err, foundPartner) {
        PartnerProfile.findById(foundPartner.partnerProfile, function(err, foundProfile) {
            var avgRating = 0;
            var allInfos = [];
            var allService = [];
            var gg;

            async.each(foundPartner.ratings, function(rating, done) {
                avgRating += rating.star;
                Rating.findById(rating.id).populate("byUser").exec(function(err, info) {
                    if(info.byUser) {
                        allInfos.push(info);
                    } else { // Case where the rated user is deleted
                        Rating.findByIdAndRemove(info.id).then(function(deleted) {
                            console.log(deleted);
                        });
                    }
                    done();
                });
            }, function(err) {
                if(err) throw err;
                else {
                    avgRating /= foundPartner.ratings.length;
                    avgRating = (Math.round(avgRating * 10) / 10).toFixed(1);
                    if(avgRating == "NaN") avgRating = 0.0;
                    if (foundProfile && foundProfile.isVerified) {
                        Service.find({}, (err, allServices) => {
                            if(err) throw err;
                            async.each(allServices, (service, done) => {
                                Service.findById(service.id).populate("questionList").exec(function (err, detailService) {
                                    if(err) throw err;
                                    if(detailService.questionList.length > 0) {
                                        allService.push(detailService);
                                    } else {
                                        Service.findByIdAndRemove(service.id).then((deleted) => {
                                            console.log(deleted);
                                        });
                                    }
                                    done();
                                });
                            }, function (err) {
                                if(err) throw err;
                                return res.render("partnerprofile", {
                                    detailService: allService,
                                    thisPartner: foundPartner,
                                    averageRating: avgRating,
                                    reviews: allInfos,
                                    thisProfile: foundProfile
                                });
                            });
                        });
                    } else {
                        Service.find({}, (err, allServices) => {
                            if(err) throw err;
                            async.each(allServices, (service, done) => {
                                Service.findById(service.id).populate("questionList").exec((err, detailService) => {
                                    if(err) throw err;
                                    if(detailService.questionList.length > 0) {
                                        allService.push(gg);
                                    } else {
                                        Service.findByIdAndRemove(service.id).then((deleted) => {
                                            console.log(deleted);
                                        });
                                    }
                                    done();
                                });
                            }, function (err) {
                                if(err) throw err;
                                return res.render("partnerprofile", {
                                    detailService: allService,
                                    thisPartner: foundPartner,
                                    averageRating: avgRating,
                                    reviews: allInfos,
                                    thisProfile: ""
                                });
                            });
                        });
                    }
                }
            });
        });//PartnerProfile.findById
    });//Partner.findById
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
        PartnerProfile.find({}, function(err, allProfiles) {
            if (err) {
                console.log(err);
                req.flash("error", "프로필 목록을 불러오는데 문제가 발생했습니다. 다시 시도해주세요.");
                return res.redirect("/");
            }
            var partnerProfiles = [];
            for (var i = 0; i < allPartners.length; i++) {
                if (allPartners[i].partnerProfile) {
                    for (var j = 0; j < allProfiles.length; j++) {
                        if (allPartners[i].partnerProfile == allProfiles[j].id) {
                            partnerProfiles[i] = allProfiles[j];
                        }
                    }
                } else {
                    partnerProfiles[i] = "";
                }

            }
            res.render("findpartner", { allPartners : allPartners , googleMapAPI: keys.googleMapAPI.key, allProfiles: partnerProfiles });
        });

    });
});


module.exports = router;
