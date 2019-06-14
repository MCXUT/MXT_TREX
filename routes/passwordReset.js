const express = require("express");
const router = express.Router()
// const nodemailer = require("nodemailer");
// const crypto = require("crypto");
// const async = require("async");

const keys = require("../config/keys");
const Client = require("../models/Client");

router.get("/reset/client", function(req,res){
  res.render("password_reset_client");
})

router.get("/reset/partner", function(req,res){
  res.render("password_reset_partner");
})

// router.post("/reset/client", middleware.matchUserEmail, (req,res) => {
//   var userEmail = req.body.email;
//
//   async.waterfall([
//       (done) => {
//           crypto.randomBytes(20, (err, buf) => {
//               var token = buf.toString('hex');
//               done(err, token);
//           });
//       },
//       (token, done) => {
//           User.findOne({email: userEmail}).then((foundUser) => {
//               if(!foundUser) {
//                   req.flash("error_reset", "No account with that email address exists.");
//                   return res.redirect('/');
//               }
//               foundUser.resetPasswordToken = token;
//               foundUser.resetPasswordExpires = Date.now() + 3600000;
//               foundUser.save((err) => {
//                   done(err, token, foundUser);
//               })
//           });
//       },
//       (token, foundUser, done) => {
//           const transporter = nodemailer.createTransport({
//               service: "Gmail",
//               auth: {
//                   user: keys.emailInfo.user,
//                   pass: keys.emailInfo.pass,
//               },
//               tls: {
//                   ciphers: "SSLv3"
//               }
//           });
//           const mailOption = {
//             from : keys.emailInfo.user,
//             to : foundUser.email,
//             subject : "Password Reset Request",
//             text : "Reset Your Password From the Link Below",
//             html: '<p>Password Reset Form</p>' +
//                   '<h3>Click the link below to reset your password</h3>' +
//                   '<a href="http://' + req.headers.host + '/auth/reset/password/' + token + '">reset your password</a>'
//           };
//           transporter.sendMail(mailOption, (err) => {
//               if(err) {
//                   req.flash("error_reset", "Error Occured when sending the email");
//                   return res.redirect("/");
//               }
//               req.flash("success_validate", "Check your email for password reset");
//               res.redirect("/");
//           });
//       }
//   ], (err) => {
//       if(err) next(err);
//       res.redirect("/");
//   });
// });

module.exports = router;
