const express = require("express"),
      moment = require("moment");

const router = express.Router();

const keys = require("../config/keys");
const Client = require("../models/Client");
const Partner = require("../models/Partner");
const PartnerProfile = require("../models/PartnerProfile");
const Message = require("../models/Message");
const Rating = require("../models/Rating");

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
          if (req.user.partnerProfile) {
              PartnerProfile.findById(req.user.partnerProfile, (err, foundProfile) => {
                  if (err) {
                      console.log(err);
                      return res.redirect("/user_profile");
                  }
                  return res.render("userprofile_partner_profile", { partnerProfile: foundProfile });
              });
          } else {
              return res.render("userprofile_partner_profile", { partnerProfile: false });
          }
          
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
          Partner.find({}, (err, allPartners) => {
             if(err) {
                 throw err;
             } else {
                 res.render("userprofile_partner_task", {allPartners: allPartners});
             }
          });
    }
  }
});

//별점 포스트
router.post("/user_profile/tasks/rating/:id", (req, res) => {
    req.body.star = parseInt(req.body.star);
    Partner.findById(req.params.id, (err, currentPartner) => {
        if(err) throw err;
        if(!currentPartner) {
            return res.json({error: "No such partner was found"});
        } else {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth();
            var yyyy = today.getFullYear();
            if(dd < 10) {
                dd = '0' + dd;
            }
            if(mm < 10) {
                mm = '0' + mm;
            }
            today = yyyy + "." + mm + "." + dd;

            Rating.create(req.body, (err, newRating) => {
                if(err) throw err;
                else {
                    newRating.byUser = req.user.id;
                    newRating.date = today;
                    newRating.save();

                    currentPartner.ratings.push(newRating);
                    currentPartner.save();
                    res.redirect("/user_profile/tasks");
                }
            });
        }
    });
});

router.post("/user_profile/tasks/:id", (req, res) => {
    console.log(req.params.id);
    return res.redirect("back");
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
        PartnerProfile.findById(req.user.partnerProfile, function(err, foundProfile) {
            if (err) {
                console.log(err);
                return res.redirect("/user_profile");
            }
            var unavailability = [];
            for (var i = 0; i < foundProfile.unavailableDates.length; i++) {
                unavailability[i] = moment.utc(foundProfile.unavailableDates[i]).format('YYYY-MM-DD');
            }
            res.render("userprofile_partner_schedule", { unavailableDates: unavailability });
        });
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
      Partner.find({}).then((allPartners) => {
          res.render("userprofile_partner_paymentInfo", {allPartners: allPartners});
      });
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




module.exports = router;
