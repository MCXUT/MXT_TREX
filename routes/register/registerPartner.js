const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const keys = require("../../config/keys");
const Partner = require("../../models/Partner");


// GET register page for partners
router.get("/register/partner", function(req, res) {
  res.render("register_partner");
});

// POST route for registering partner
router.post("/register/partner", function(req, res) {
  var newPartner = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  if(!(req.body.name && req.body.email && req.body.password && req.body.password2)) {
      req.flash("error", "Some information is missing");
      return res.redirect("/auth/register/partner");
  }

  Partner.getPartnerByUsername(newPartner.email, function(err,user){
    if(err) throw err;
    if(user) {
      req.flash("error", "Email is already taken!");
      return res.redirect("/auth/register/partner");
    } else {
      bcrypt.hash(req.body.password2, 10, function (err, hash){
        if(err) throw err;
        Partner.comparePassword(newPartner.password, hash, function (err, isMatch) {
          if(err) throw err;
          if(!isMatch) {
            req.flash("error", "Passwords do not match");
            return res.redirect("/auth/register/partner");
          } else {
            var user = new Partner({
              name: newPartner.name,
              email: newPartner.email,
              password: newPartner.password
            });
            Partner.createUser(user, (err, createdPartner) => {
              if(err) throw err;
              //Verification.createToken(req, res, createdUser);
              
              // Email Trex about Partner Creation
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
                  subject : "트렉스 파트너 가입",
                  html: '<p>트렉스에 새로운 파트너가 가입하였습니다.</p>' +
                        '<h3>이름: </h3>' + createdPartner.name +
                        '<h3>이메일: </h3>' + createdPartner.email
              };
              transporter.sendMail(mailOption, (err) => {
                  if(err) {
                      console.log(err);
                      return res.redirect("/");
                  }
                  console.log("Email successfully sent to Trex about Partner creation.");
              });
              
              res.redirect("/");
            });
          }
        });
      });
    }
  });
});

module.exports = router;
