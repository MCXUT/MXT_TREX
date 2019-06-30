const express = require("express"),
      moment = require("moment");

const router = express.Router();

const keys = require("../config/keys");
const Client = require("../models/Client");
const Partner = require("../models/Partner");
const PartnerProfile = require("../models/PartnerProfile");
const Message = require("../models/Message");

const googleMapsClient = require('@google/maps').createClient({
  key: keys.googleMapAPI.key
});



// GET route for user_profile home route
router.get("/user_profile", (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  } else {
    if (req.user.type === "c") {
        return res.redirect("/user_profile/task_request_info");
    } else {
        return res.redirect("/user_profile/partnerProfile");
    }
  }
});



// GET route for viewing partner profile info
// 프로필 관리 (파트너)
router.get("/user_profile/partnerProfile", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
      if (req.user.type === "c") {
          res.redirect("/user_profile");
      } else {
          res.render("userprofile_partner_profile");
    }
  }
});


// GET route for viewing client task request info
// 견적 요청 관리 (클라이언트)
router.get("/user_profile/task_request_info", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
      if (req.user.type === "p") {
          res.redirect("/user_profile");
      } else {
          res.render("userprofile_client_taskRequestInfo");
    }
  }
});


// GET route for viewing partner task reservation info
// 업무 예약 관리 (파트너)
router.get("/user_profile/tasks", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
      if (req.user.type === "c") {
          res.redirect("/user_profile");
      } else {
          res.render("userprofile_partner_task");
    }
  }
});


// GET route for viewing client applicants info
// 지원자 보기 (클라이언트)
router.get("/user_profile/applicants_info", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
      if (req.user.type === "p") {
          res.redirect("/user_profile");
      } else {
          res.render("userprofile_client_applicantsInfo");
    }
  }
});


// GET route for viewing partner schedule info
// 일정 관리 (파트너)
router.get("/user_profile/schedule", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    if (req.user.type === "c") {
        res.redirect("/user_profile");
    } else {
        res.render("userprofile_partner_schedule");
    }
  }
});




// GET route for viewing user profile messages
// 메세지 (파트너, 클라이언트)
router.get("/user_profile/messages", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    var type;
    if (req.user.type === "p") {
      type = "Partner";
    } else {
      type = "Client";
    }

    if (type === "Client") {
        // var partnerPic = [];
        Message.find({client: req.user.id}, function(err, foundMessages) {
            Partner.find({}, function(err, partnerList) {
                if (err) {
                    console.log(err);
                    return res.redirect("/user_profile");
                }
                for (var i = 0; i < foundMessages.length; i++) {
                    for (var j = 0; j < partnerList.length; j++) {
                        if (partnerList[j].id == foundMessages[i].partner) {
                            // partnerPic.push(partnerList[j].profilePic);
                            // j = partnerList.length;
                            foundMessages[i].pic = partnerList[j].profilePic;
                        }
                    }
                }
                return res.render("userprofile_client_message", {messages: foundMessages});
            });
            
        });
    } else {
        // var clientPic = [];
        Message.find({partner: req.user.id}, function(err, foundMessages) {
            Client.find({}, function(err, clientList) {
                if (err) {
                    console.log(err);
                    return res.redirect("/user_profile");
                }
                for (var i = 0; i < foundMessages.length; i++) {
                    for (var j = 0; j < clientList.length; j++) {
                        if (clientList[j].id == foundMessages[i].client) {
                            // clientPic.push(clientList[j].companyLogo);
                            // j = clientList.length;
                            foundMessages[i].pic = clientList[j].companyLogo;
                        }
                    }
                }
                return res.render("userprofile_partner_message", {messages: foundMessages});
            });
        });
    }
  }
});



// GET route for viewing user profile payment info
// 정산 계좌 등록 (파트너)
router.get("/user_profile/payment_info", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    res.render("userprofile_partner_paymentInfo");
  }
});



// GET route for viewing client saved partners
// 저장된 파트너 (클라이언트)
router.get("/user_profile/saved_partners", (req, res) => {
    if (!req.user) {
        res.redirect("/");
    } else {
        if (req.user.type === "p") {
            res.redirect("/user_profile");
        } else {
            var savedPartners = [];
            Partner.find({}, function(err, foundPartners) {
                if (err) {
                    console.log(err);
                    return res.redirect("/user_profile/saved_partners");
                }
                for (var i = 0; i < foundPartners.length; i++) {
                    for (var j = 0; j < req.user.savedPartners.length; j++) {
                        if (foundPartners[i].id == req.user.savedPartners[j]) {
                            savedPartners.push(foundPartners[i]);
                        }
                    }
                }
                res.render("userprofile_client_savedPartners", { savedPartners: savedPartners });
                
            });
        }
    }
});




// GET route for viewing user profile account info
// 계정 관리 (파트너, 클라이언트)
router.get("/user_profile/account_info", (req, res) => {
    if (!req.user) {
        res.redirect("/");
    } else {
        var type;
        if (req.user.type === "p") {
            type = "Partner";
        } else {
            type = "Client";
        }
        var birthday;
        var displayBirthday;
        if (req.user.dateOfBirth) {
            displayBirthday = req.user.dateOfBirth;
            birthday = moment(req.user.dateOfBirth).format('MM/DD/YYYY');
            // displayBirthday = moment(birthday).format('MMMM DD, YYYY');
        } else {
            birthday = req.user.dateOfBirth;
        }
    
        if (type === "Client") {
            var accountInfo = {
                birthday: birthday,
                displayBirthday: displayBirthday,
                category: req.user.category,
                managerPosition: req.user.managerPosition,
                managerPhoneNumber: req.user.managerPhoneNumber,
                companyName: req.user.companyName,
                companyAddress: req.user.companyAddress,
                companyWebsite: req.user.companyWebsite,
                companySNS: req.user.companySNS,
                companyDescription: req.user.companyDescription,
                kakaoID: req.user.kakaoID
            };
            res.render("userprofile_client_accountInfo", {accountInfo: accountInfo, googleMapAPI: keys.googleMapAPI.key});
        } else {
            var accountInfo = {
                name: req.user.name,
                type: type,
                birthday: birthday,
                displayBirthday: displayBirthday,
                address: req.user.address,
                phoneNumber: req.user.phoneNumber,
                kakaoID: req.user.kakaoID
            };
            res.render("userprofile_partner_accountInfo", {accountInfo: accountInfo, googleMapAPI: keys.googleMapAPI.key});
        }
    }
});




// 파트너 프로필 수정
router.get("/user_profile/edit_partner_resume", function(req, res) {
    if (!req.user) {
      res.redirect("/");
    } else {
        // create new profile if it is the first time for the partner
        if (req.user.partnerProfile === "") {
            return res.render("create_partner_profile");
        } else {
            PartnerProfile.findById(req.user.partnerProfile, function(err, foundProfile) {
                if (err) {
                  console.log(err);
                  return res.redirect("/user_profile");
                };
                res.render("edit_partner_resume", { profileInfo: foundProfile });
            });
        }
    }
});


// Create a profile for partner
// 파트너 프로필 생성
router.post("/create_new_profile", function(req, res) {
    if (req.body.type == "freelancer") {
        var newProfile = new PartnerProfile({
            type: "freelancer",
            gender: "M"
        });
        newProfile.save((err, createdProfile) => {
            if(err) {
                console.log(err);
                req.flash("error_profile", "프로필을 생성하는데 실패했습니다. 다시 시도 해주세요.");
                return res.redirect("/user_profile");
            }
            // Save the profile id in the current partner db
            Partner.findById(req.user._id, function(err, foundUser) {
                if (err) {
                    console.log(err);
                    return res.redirect("/user_profile");
                }
                foundUser.partnerProfile = createdProfile._id;
                foundUser.save((err) => {
                      if (err) {
                          console.log(err);
                          return res.redirect("/user_profile");
                      }
                      console.log("Partner Freelancer Profile Creation Successful for " + foundUser.name);
                      return res.redirect("/edit_partner_resume");
                });
            });
        });
    } else if (req.body.type == "agency") {
        var newProfile = new PartnerProfile({
            type: "agency",
            gender: "N/A"
        });
        newProfile.save((err, createdProfile) => {
            if(err) {
                console.log(err);
                req.flash("error_profile", "프로필을 생성하는데 실패했습니다. 다시 시도 해주세요.");
                return res.redirect("/user_profile");
            }
            // Save the profile id in the current partner db
            Partner.findById(req.user._id, function(err, foundUser) {
                if (err) {
                    console.log(err);
                    return res.redirect("/user_profile");
                }
                foundUser.partnerProfile = createdProfile._id;
                foundUser.save((err) => {
                      if (err) {
                          console.log(err);
                          return res.redirect("/user_profile");
                      }
                      console.log("Partner Agency Profile Creation Successful for " + foundUser.name);
                      return res.redirect("/edit_partner_resume");
                });
            });
        });
    } else {
        req.flash("error_profile", "프로필을 생성하는데 실패했습니다. 다시 시도 해주세요.");
        return res.redirect("/user_profile");
    }
});


// 파트너 프로필 전환 (프리랜서 <-> 에이전시)
router.post("/convert_partnerProfile_type", function(req, res) {
    if (req.user.type === "p") {
        PartnerProfile.findById(req.user.partnerProfile, function(err, foundProfile) {
            if (err) {
                console.log(err);
                return res.redirect("/user_profile");
            }
            // if the current profile is a freelancer, change to agency
            if (foundProfile.type === "freelancer") {
                foundProfile.type = "agency";
                foundProfile.gender = "N/A";
                foundProfile.lastEditedDate = Date.now()
            } else {
                foundProfile.type = "freelancer";
                foundProfile.gender = "M";
                foundProfile.lastEditedDate = Date.now()
            }
            ///////// 사업자 등록증 삭제도 해야함!!! ////////
            foundProfile.save((err) => {
                  if (err) {
                      console.log(err);
                      req.flash("error_profile", "파트너 프로필을 저장하는데 문제가 발생 했습니다. 다시 시도해주세요.");
                      return res.redirect("/user_profile");
                  }
                  console.log("Partner Profile Convert Successful for " + req.user.name);
                  return res.redirect("/edit_partner_resume");
            });
        });
    } else {
        req.flash("error_profile", "클라이언트는 파트너 프로필을 생성 할수 없습니다.");
        return res.redirect("/user_profile");
    }
});



module.exports = router;