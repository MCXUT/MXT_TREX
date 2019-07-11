const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const async = require("async");
const nodemailer = require("nodemailer");
const keys = require("../config/keys");

const Admin = require("../models/Admin");
const Client = require("../models/Client");
const DeletedAccount = require("../models/DeletedAccount");
const Partner = require("../models/Partner");
const Message = require("../models/Message");
const PartnerProfile = require("../models/PartnerProfile");
//----------To be replaced by service-------
const Payment = require("../models/Payment");
//------------------------------------------
const localAdmin = require("../config/passportStrategies/localAdmin");

// 파트너 프로필 수락 여부 변경 (패널에서)
router.get("/trex-admin/verifyProfile/:id", function(req, res) {
    if (req.user.type == "a") {
        if (req.user.type == "a") {
            PartnerProfile.findById(req.params.id, function(err, foundProfile) {
                if (err) {
                    console.log(err);
                    return res.redirect("/trex-admin?index=5");
                }
                if (foundProfile.isVerified) {
                    foundProfile.isVerified = false;
                } else {
                    foundProfile.isVerified = true;
                }
                foundProfile.save((err) => {
                    if (err) {
                        console.log(err);
                        return res.redirect("/trex-admin?index=5");
                    }
                    console.log("Partner Profile verified/unverified for " + foundProfile.partner.name);
                    return res.redirect("/trex-admin?index=5");
                });
            });
        } else {
            return res.redirect("/trex-admin/login");
        }
    } else {
        return res.redirect("/trex-admin/login");
    }
    
});

// 파트너 프로필 수락 여부 변경 (상세 페이지에서)
router.get("/trex-admin/editProfile/verifyProfile/:id", function(req, res) {
    if (req.user) {
        if (req.user.type == "a") {
            PartnerProfile.findById(req.params.id, function(err, foundProfile) {
                if (err) {
                    console.log(err);
                    return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                }
                if (foundProfile.isVerified) {
                    foundProfile.isVerified = false;
                } else {
                    foundProfile.isVerified = true;
                }
                foundProfile.save((err) => {
                    if (err) {
                        console.log(err);
                        return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                    }
                    console.log("Partner Profile verified/unverified for " + foundProfile.partner.name);
                    return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                });
            });
        } else {
            return res.redirect("/trex-admin/login");
        }
    } else {
        return res.redirect("/trex-admin/login");
    }
});

// 파트너 인터뷰 여부 변경 (페널에서)
router.get("/trex-admin/isInterviewed/:id", function(req, res) {
    if (req.user) {
        if (req.user.type == "a") {
            PartnerProfile.findById(req.params.id, function(err, foundProfile) {
                if (err) {
                    console.log(err);
                    return res.redirect("/trex-admin?index=5");
                }
                if (foundProfile.isInterviewed) {
                    foundProfile.isInterviewed = false;
                } else {
                    foundProfile.isInterviewed = true;
                }
                foundProfile.save((err) => {
                    if (err) {
                        console.log(err);
                        return res.redirect("/trex-admin?index=5");
                    }
                    console.log("Partner Profile isInterviewed changed for " + foundProfile.partner.name);
                    return res.redirect("/trex-admin?index=5");
                });
            });
        } else {
            return res.redirect("/trex-admin/login");
        }
    } else {
        return res.redirect("/trex-admin/login");
    }
});

// 파트너 인터뷰 여부 변경 (상세 페이지에서)
router.get("/trex-admin/editProfile/isInterviewed/:id", function(req, res) {
    if (req.user) {
        if (req.user.type == "a") {
            PartnerProfile.findById(req.params.id, function(err, foundProfile) {
                if (err) {
                    console.log(err);
                    return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                }
                if (foundProfile.isInterviewed) {
                    foundProfile.isInterviewed = false;
                } else {
                    foundProfile.isInterviewed = true;
                }
                foundProfile.save((err) => {
                    if (err) {
                        console.log(err);
                        return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                    }
                    console.log("Partner Profile isInterviewed changed for " + foundProfile.partner.name);
                    return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                });
            });
        } else {
            return res.redirect("/trex-admin/login");
        }
    } else {
        return res.redirect("/trex-admin/login");
    }
});

// 파트너 프로필 수정 상세페이지
router.get("/trex-admin/editProfile/:id", function(req, res) {
    if (req.user) {
        if (req.user.type == "a") {
            PartnerProfile.findById(req.params.id, function(err, foundProfile) {
                if (err) {
                    console.log(err);
                    return res.redirect("/trex-admin?index=5");
                }
                res.render("trexAdminEditProfile", { thisProfile : foundProfile });
            });
        } else {
          return res.redirect("/trex-admin/login");
        }
    } else {
      return res.redirect("/trex-admin/login");
    }
});

// 파트너 프로필 한줄 소개 변경
router.post("/trex-admin/editProfile/editOneLineIntro/:id", function(req, res) {
    if (req.user) {
        if (req.user.type == "a") {
            PartnerProfile.findById(req.params.id, function(err, foundProfile) {
                if (err) {
                    console.log(err);
                    return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                }
                foundProfile.oneLineIntro = req.body.oneLineIntro;
                foundProfile.save((err) => {
                    if (err) {
                        console.log(err);
                        return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                    }
                    console.log("Partner Profile One Line Intro Edit successful by admin for partner " + foundProfile.partner.name);
                    return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                });
            });
        } else {
          return res.redirect("/trex-admin/login");
        }
    } else {
      return res.redirect("/trex-admin/login");
    }
});

// 파트너 프로필 자기 소개 변경
router.post("/trex-admin/editProfile/editAboutMe/:id", function(req, res) {
    if (req.user) {
        if (req.user.type == "a") {
            PartnerProfile.findById(req.params.id, function(err, foundProfile) {
                if (err) {
                    console.log(err);
                    return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                }
                foundProfile.aboutMe = req.body.aboutMe;
                foundProfile.save((err) => {
                    if (err) {
                        console.log(err);
                        return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                    }
                    console.log("Partner Profile About Me Edit successful by admin for partner " + foundProfile.partner.name);
                    return res.redirect("/trex-admin/editProfile/" + foundProfile.id);
                });
            });
        } else {
          return res.redirect("/trex-admin/login");
        }
    } else {
      return res.redirect("/trex-admin/login");
    }
});

// 파트너 프로필 삭제
router.get("/trex-admin/deleteProfile/:id", function(req, res) {
    if (req.user) {
        if (req.user.type == "a") {
            console.log("Profile ID: " + req.params.id);
            PartnerProfile.findById(req.params.id, function(err, foundProfile) {
                if (err) {
                    console.log(err);
                    return res.redirect("/trex-admin?index=5");
                }
                Partner.findById(foundProfile.partner.id, function(err, foundPartner) {
                    if (err) {
                        console.log(err);
                        return res.redirect("/trex-admin?index=5");
                    }
                    foundProfile.remove((err) => {
                        foundPartner.partnerProfile = "";
                        foundPartner.save((err) => {
                            res.redirect("/trex-admin?index=5");
                        });
                    });
                });
            });
        } else {
          return res.redirect("/trex-admin/login");
        }
    } else {
      return res.redirect("/trex-admin/login");
    }
    // PartnerProfile.deleteOne({"_id" : req.params.id}, function(err, result) {
    //     res.redirect("/trex-admin?index=5");
    // });
});


module.exports = router;
