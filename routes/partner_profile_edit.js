const express = require("express"),
      moment = require("moment"),
      nodemailer = require("nodemailer");

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


// 파트너 프로필 수정 페이지 GET
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
router.post("/user_profile/create_new_profile", function(req, res) {
    if (req.body.type == "freelancer") {
        var newProfile = new PartnerProfile({
            type: "freelancer",
            partner: {
                name: req.user.name,
                email: req.user.email,
                id: req.user.id
            },
            registeredDate: moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"),
            lastEditedDate: moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a")
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
                      
                      // Email Trex about Partner Profile Creation
                      const transporter = nodemailer.createTransport({
                          service: "Gmail",
                          auth: {
                              user: keys.gmailInfo.user,
                              pass: keys.gmailInfo.pass
                          },
                          tls: {
                              ciphers: "SSLv3"
                          }
                      });
                      const mailOption = {
                          from : keys.gmailInfo.user,
                          to : keys.trexEmail.email,
                          subject : "트렉스 파트너 프리랜서 프로필 생성",
                          html: '<p>트렉스 파트너 ' + req.user.name + '님이 새로운 파트너 프리랜서 프로필을 등록하였습니다.</p>' +
                                '<h3>이름: </h3>' + req.user.name +
                                '<h3>이메일: </h3>' + req.user.email +
                                '<br><br><br>아래 링크를 통해 확인하세요. 아직은 게시가 안된 프로필입니다.<br>' + 
                                'http://localhost:8080/partner_profile/' + req.user.id
                      };
                      transporter.sendMail(mailOption, (err) => {
                          if(err) {
                              console.log(err);
                              return res.redirect("/");
                          }
                          console.log("Email successfully sent to Trex about Partner Profile creation.");
                      });
                      
                      return res.redirect("/user_profile/edit_partner_resume");
                });
            });
        });
    } else if (req.body.type == "agency") {
        var newProfile = new PartnerProfile({
            type: "agency",
            partner: {
                name: req.user.name,
                email: req.user.email,
                id: req.user.id
            },
            registeredDate: moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"),
            lastEditedDate: moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a")
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
                      
                      // Email Trex about Partner Profile Creation
                      const transporter = nodemailer.createTransport({
                          service: "Gmail",
                          auth: {
                              user: keys.gmailInfo.user,
                              pass: keys.gmailInfo.pass
                          },
                          tls: {
                              ciphers: "SSLv3"
                          }
                      });
                      const mailOption = {
                          from : keys.gmailInfo.user,
                          to : keys.trexEmail.email,
                          subject : "트렉스 파트너 에이전시 프로필 생성",
                          html: '<p>트렉스 파트너 ' + req.user.name + '님이 새로운 파트너 에이전시 프로필을 등록하였습니다.</p>' +
                                '<h3>이름: </h3>' + req.user.name +
                                '<h3>이메일: </h3>' + req.user.email +
                                '<br><br><br>아래 링크를 통해 확인하세요. 아직은 게시가 안된 프로필입니다.<br>' + 
                                'http://localhost:8080/partner_profile/' + req.user.id
                      };
                      transporter.sendMail(mailOption, (err) => {
                          if(err) {
                              console.log(err);
                              return res.redirect("/");
                          }
                          console.log("Email successfully sent to Trex about Partner Profile creation.");
                      });
                      
                      return res.redirect("/user_profile/edit_partner_resume");
                });
            });
        });
    } else {
        req.flash("error_profile", "프로필을 생성하는데 실패했습니다. 다시 시도 해주세요.");
        return res.redirect("/user_profile");
    }
});



// Edit partner profile
// 파트너 프로필 수정
router.post("/user_profile/edit_partner_resume", function(req, res) {
    console.log(req.body.oneLineIntro);
    console.log(req.body.region);
    console.log(req.body.otherRegion);
    console.log(req.body.aboutMe);
    PartnerProfile.findById(req.user.partnerProfile, function(err, foundProfile) {
        if (err) {
            console.log(err);
            return res.redirect("/user_profile");
        }
        
        foundProfile.oneLineIntro = req.body.oneLineIntro;
        foundProfile.region = req.body.region;
        if (req.body.avail == "able") {
            foundProfile.otherRegion = req.body.otherRegion;
        } else {
            foundProfile.otherRegion = [];
        }
        
        // for (var i = 0; i < req.body.otherRegion.length; i++) {
        //     foundProfile.otherRegion.push(otherRegions[i]);
        // }
        foundProfile.aboutMe = req.body.aboutMe;
        foundProfile.lastEditedDate = moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a");
        
        foundProfile.save((err) => {
              if (err) {
                console.log(err);
                req.flash("error", "프로필을 업데이트 할수 없습니다. 다시 시도해 주세요.");
                return res.redirect("/user_profile");
              }
              console.log("Partner Profile Update Successful for " + req.user.name);
              return res.redirect("/user_profile");
        });
    });
});



// Edit partner profile unavailable dates
// 불가능 날짜 수정
router.post("/user_profile/edit_unavailable_dates", function(req, res) {
    console.log(req.body.unavailability);
    // console.log(typeof req.body.unavailability);
    // console.log(req.body.unavailability.split(','));
    // console.log(typeof req.body.unavailability.split(','));
    // console.log(moment(req.body.unavailability.split(',')[0]).format('MM/DD/YYYY'));
    // var d = req.body.unavailability.split(',');
    // for (var i = 0; i < d.length; i++) {
    //     d[i] = new Date(d[i]);
    // }
    // console.log(d);
    // var x = new Date(req.body.unavailability.split(','))
    // console.log(x);
    // return res.redirect("/user_profile/schedule");
    PartnerProfile.findById(req.user.partnerProfile, function(err, foundProfile) {
        if (err) {
            console.log(err);
            return res.redirect("/user_profile/schedule");
        }
        
        // var dates = req.body.unavailability.split(',');
        // for (var i = 0; i < dates.length; i++) {
        //     dates[i] = new Date(dates[i]);
        // }
        
        foundProfile.unavailableDates = req.body.unavailability.split(',');
        foundProfile.lastEditedDate = moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a");
        
        foundProfile.save((err) => {
              if (err) {
                console.log(err);
                req.flash("error", "프로필을 업데이트 할수 없습니다. 다시 시도해 주세요.");
                return res.redirect("/user_profile/schedule");
              }
              console.log("Partner Profile Unavailable Date Update Successful for " + req.user.name);
              return res.redirect("/user_profile/schedule");
        });
    });
});



// 파트너 프로필 전환 (프리랜서 <-> 에이전시)
// router.post("/user_profile/convert_partnerProfile_type", function(req, res) {
//     if (req.user.type === "p") {
//         PartnerProfile.findById(req.user.partnerProfile, function(err, foundProfile) {
//             if (err) {
//                 console.log(err);
//                 return res.redirect("/user_profile");
//             }
//             // if the current profile is a freelancer, change to agency
//             if (foundProfile.type === "freelancer") {
//                 foundProfile.type = "agency";
//                 foundProfile.gender = "N/A";
//                 foundProfile.lastEditedDate = Date.now()
//             } else {
//                 foundProfile.type = "freelancer";
//                 foundProfile.gender = "M";
//                 foundProfile.lastEditedDate = Date.now()
//             }
//             ///////// 사업자 등록증 삭제도 해야함!!! ////////
//             foundProfile.save((err) => {
//                   if (err) {
//                       console.log(err);
//                       req.flash("error_profile", "파트너 프로필을 저장하는데 문제가 발생 했습니다. 다시 시도해주세요.");
//                       return res.redirect("/user_profile");
//                   }
//                   console.log("Partner Profile Convert Successful for " + req.user.name);
//                   return res.redirect("/user_profile/edit_partner_resume");
//             });
//         });
//     } else {
//         req.flash("error_profile", "클라이언트는 파트너 프로필을 생성 할수 없습니다.");
//         return res.redirect("/user_profile");
//     }
// });




// // POST route for changing language profile info for language
// router.post("/user_profile/language", (req, res) => {
//     // Changing language profile of a partner
//     var newLanguageInfo = {
//       langchoice: req.body.langchoice,
//       langproficiency: req.body.langproficiency
//     }
//     // Find and update client profile
//     Partner.findById(req.user._id, function(err, foundUser) {
//       if (err) {
//         console.log(err);
//         return res.redirect("/user_profile");
//       };
//       foundUser.languages = newLanguageInfo;
//       foundUser.save((err) => {
//         if (err) {
//           console.log(err);
//           return res.redirect("/user_profile");
//         }
//         console.log("Partner Profile Update Successful (Language) for " + foundUser.name);
//         return res.redirect("/user_profile");
//       });
// 
//     });
// });




module.exports = router;