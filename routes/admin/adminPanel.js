const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const async = require("async");
const nodemailer = require("nodemailer");
const keys = require("../../config/keys");

const Admin = require("../../models/Admin");
const Client = require("../../models/Client");
const Partner = require("../../models/Partner");
const Message = require("../../models/Message");
const PartnerProfile = require("../../models/PartnerProfile");
//----------To be replaced by service-------
const Payment = require("../../models/Payment");
//------------------------------------------
const localAdmin = require("../../config/passportStrategies/localAdmin");

router.get("/trex-admin/login", function(req,res){
  res.render("trexAdminLogin");
})

router.post("/trex-admin/login", localAdmin.authenticate('local-admin', {
  successRedirect: "/trex-admin?index=1",
  failureRedirect: "back",
  failureFlash: true,
  successFlash: "Successfully logged in"
  }), (req, res) => {

});

router.get("/trex-admin", function(req,res) {
  if(req.user) {
    Admin.findById(req.user.id, (err, foundAdmin) => {
      if(err) {
        console.log(err);
        return res.redirect("/");
      }
      if(!foundAdmin) {
        return res.redirect("/");
      }
      if(foundAdmin) {
        // Rending admin page with handling datas.
        Client.find({}, function(err, clients) {
          Partner.find({}, function(err, partners) {
            Admin.find({}, function(err, admins) {
              Message.find({}, function(err, messages) {
                  PartnerProfile.find({}, function(err, partnerProfiles) {
                      Payment.find({}, function(err, payments) { // To be replaced by service
                          for(var i = 0; i < payments.length; i++) {
                              if(payments[i].dateRequested)
                                payments[i].dateRequestedS = moment(payments[i].dateRequested).format("YYYY-MM-DD::HH:mm");
                              if(payments[i].dateConfirmed)
                                payments[i].dateConfirmedS = moment(payments[i].dateConfirmed).format("YYYY-MM-DD::HH:mm");
                          }
                          for(var i = 0; i < clients.length; i++) {
                              if(clients[i].companyAddress) {
                                var address = clients[i].companyAddress.split(',');
                                clients[i].companyAddress = address[1];
                              } else {
                                continue;
                              }
                          }

                          return res.render("trexAdminpage", {
                            moment: moment,
                            partnerList : partners,
                            clientList: clients,
                            adminList: admins,
                            messageList: messages,
                            profileList: partnerProfiles,
                            paymentList: payments // To be replaced by service
                          });
                      });
                  });
              });
            });
          });
        });
      }
    });
  }
  else {
    return res.redirect("/trex-admin/login");
  }
});

router.get("/editUser/:type/:id", function(req,res) {
  var id = req.params.id;
  var type = req.params.type;
  if(type === "client") {
    Client.findById(id, function(err, foundClient) {
      if(err) {
        console.log(err);
        return res.redirect("/trex-admin?index=2");
      } else {
        return res.render("trexAdminEditUsers", {current : foundClient});
      }
    });
  } else {
    Partner.findById(id, function(err, foundPartner) {
      if(err) {
        console.log(err);
        return res.redirect("/trex-admin?index=3");
      } else {
        return res.render("trexAdminEditUsers", {current : foundPartner});
      }
    })
  }
})

router.post("/confirmmail/:id", function(req, res) {
    async.waterfall([
        (done) => {
            Payment.findById(req.params.id, (err, payConfirm) => {
                if(err) throw err;
                if(!payConfirm) {
                    req.flash("error", "No payment to make confirmation");
                    return res.redirect("/trex-admin#?services_2");
                } else {
                    payConfirm.dateConfirmed = Date.now();
                    payConfirm.save();
                    done(err, payConfirm);
                }
            });
        },
        (payConfirm, done) => {
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: keys.gmailInfo.user,
                    pass: keys.gmailInfo.pass,
                },
                tls: {
                    ciphers: "SSLv3"
                }
            });
            const mailOption = {
              from : keys.gmailInfo.user,
              to : payConfirm.requestedEmail,
              subject : payConfirm.requestedEmail + "님의 정산요청 완료",
              text : payConfirm.requestedEmail + "님께서 요청하신 " + payConfirm.amount + "만큼의 금액을 송부했습니다." +
                        "\n계좌를 확인하여 주십시오",
            };
            transporter.sendMail(mailOption, (err) => {
                if(err) {
                    req.flash("error_reset", "Error Occured when sending the email");
                    return res.redirect("/trex-admin#?services_2");
                }
                req.flash("success_validate", "Check your email for password reset");
                return res.redirect("/trex-admin#?services_2");
            });
        }
    ], (err) => {
        if(err) next(err);
        return res.redirect("/trex-admin#?services_2");
    });
});

// Section for Admins
router.get("/deleteAdmin/:id", function(req,res) {
    console.log("adminID: " + req.params.id);
    Admin.deleteOne({"_id" : req.params.id}, function(err, obj) {
        res.redirect("/trex-admin?index=7");
    });
});

router.post("/addAdmin", function(req, res) {
  if(!req.user) {
    return res.redirect("/");
  } else {
    Admin.findById(req.user._id, (err, foundAdmin) => {
      if(err) {
        console.log(err);
      }
      if(!foundAdmin) {
        console.log("Visitor rejection from admin post");
        return res.redirect("/");
      }
      if(foundAdmin) {
        var newAdmin = {
          name : req.body.name,
          email: req.body.email,
          password: req.body.password
        };
        if(!(req.body.name && req.body.email && req.body.password && req.body.password2)) {
              req.flash("error_signup", "Some information is missing");
              return res.redirect("/trex-admin");
        }
        Admin.getAdminByEmail(newAdmin.email, (err, user) => {
          if(err) throw err;
          if(user) {
            req.flash("error_signup", "Email is already taken");
            return res.redirect("/trex-admin");
          } else {
            bcrypt.hash(req.body.password2, 10, (err,hash) => {
              if(err) throw err;
              Admin.comparePassword(newAdmin.password, hash, (err, isMatch) => {
                if(err) throw err;
                if(!isMatch) {
                  req.flash("error_signup", "Passwords do not match");
                  return res.redirect("/trex-admin");
                } else {
                  var admin = new Admin({
                    email: newAdmin.email,
                    name: newAdmin.name,
                    password: newAdmin.password
                  });
                  Admin.createAdmin(admin, (err, createdAdmin) => {
                    if(err) throw err;
                    res.redirect("/trex-admin?index=7");
                  });
                }
              });
            });
          }
        });
      }
    });
  }
});

module.exports = router;
