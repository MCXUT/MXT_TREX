const express = require("express");
const router = express.Router()
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const async = require("async");

const keys = require("../../config/keys");
const Partner = require("../../models/Partner");

router.get("/reset/partner", function(req,res){
  res.render("password_reset_partner");
})

router.post("/reset/partner", (req,res) => {
  var userEmail = req.body.email;

  async.waterfall([
      (done) => {
          crypto.randomBytes(20, (err, buf) => {
              var token = buf.toString('hex');
              done(err, token);
          });
      },
      (token, done) => {
          Partner.findOne({email: userEmail}).then((foundUser) => {
              if(!foundUser) {
                  req.flash("error_reset", "No account with that email address exists.");
                  return res.redirect('/');
              }
              foundUser.resetPasswordToken = token;
              foundUser.resetPasswordExpires = Date.now() + 600000; //10 mins
              foundUser.save((err) => {
                  done(err, token, foundUser);
              });
          });
      },
      (token, foundUser, done) => {
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
            to : foundUser.email,
            subject : "Password Reset Request",
            text : "Reset Your Password From the Link Below",
            html: '<p>Password Reset Form</p>' +
                  '<h3>Click the link below to reset your password</h3>' +
                  '<a href="http://' + req.headers.host + '/auth/reset/partner/passwordReset/' + token + '">reset your password</a>'
          };
          transporter.sendMail(mailOption, (err) => {
              if(err) {
                  req.flash("error_reset", "Error Occured when sending the email");
                  return res.redirect("/");
              }
              req.flash("success_validate", "Check your email for password reset");
              res.redirect("/");
          });
      }
  ], (err) => {
      if(err) next(err);
      res.redirect("/");
  });
});

router.get("/reset/partner/passwordReset/:token", (req,res) => {
  Partner.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {$gt: Date.now()},
  }).then((foundUser) => {
    if(!foundUser) {
      req.flash("error_reset", "Password Reset Token has been expired.");
      return res.redirect("/");
    }
    res.render("resetPartner", {token: req.params.token});
  });
});

router.post("/reset/partner/passwordReset/:token", (req,res) => {
  const passReset = req.body.newpassword;
  const passResetCr = req.body.newpasswordconfirm;

  async.waterfall([
    (done) => {
      Partner.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {$gt: Date.now()}
      }).then((foundUser) => {
        if(!foundUser) {
          req.flash("error_reset", "Password Reset Token is invalid or has expired");
          return res.redirect("/");
        }
        if(passReset === passResetCr) {
          console.log(foundUser);
          bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(passReset, salt, (err,hash) => {
              var passwordRefresh = {$set: {
                password: hash,
                resetPasswordToken: undefined,
                resetPasswordExpires: undefined
              }};
              Partner.findByIdAndUpdate(foundUser._id, passwordRefresh, (err) => {
                if(err) {
                  req.flash("error_reset", "Unknown Error Occurred");
                  return res.redirect("/");
                }
              });
              req.flash("success_validate", "Your password has been successfully reset");
              return res.redirect("/");
            });
          });
        } else {
          req.flash("error_reset", "Passwords do not match");
          return res.redirect("back");
        }
      });
    }
  ])
});

module.exports = router;
