const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const async = require("async");
const nodemailer = require("nodemailer");

const Client = require("../../models/Client");
const keys = require("../../config/keys");
const EmailVerifyCode = require("../../models/EmailVerifyCode");

//const registerRouter = require("./registerRoute");

// GET register page
router.get("/register", function(req,res) {
  res.render("register");
});

// GET register page for clients
router.get("/register/client", function(req, res) {
  res.render("register_client");
});

// router.post("/register/partner/emailVerify", function(req,res) {
//   // Post 받고 이메일 전송 (4 - digits)
//   var userEmail = req.body.email;
//
//   async.waterfall([
//     (done) => {
//       var randomNum = Math.floor(1000 + Math.random() * 9000);
//       done(randomNum)
//     },
//     (randomNum, done) => {
//       var tmpCode = new EmailVerifyCode({
//         ranNum: randomNum,
//         numExpires: Date.now() + 300000; //5 mins
//       });
//       tmpCode.save((err) => {
//         done(err, tmpCode);
//       });
//     },
//     (tmpCode, done) => {
//       const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//           user: keys.gmailInfo.user,
//           pass: keys.gmailInfo.pass
//         },
//         tls: {
//           ciphers: "SSLv3"
//         }
//       });
//       const mailOption = {
//         from : keys.gmailInfo.user,
//         to : userEmail,
//         subject : "Email Verify Code",
//         text : "Code : ",
//         html: '<p>Email Verify Code</p>' +
//               '<h3>Code: </h3>' + tmpCode.ranNum
//       };
//       transporter.sendMail(mailOption, (err) => {
//           if(err) {
//               req.flash("error_reset", "Error Occured when sending the email");
//               return res.redirect("/");
//           }
//           req.flash("success_validate", "Check your email for email verify code");
//           res.redirect("/");
//       });
//     }
//   ])
// });

// POST route for registering client
router.post("/register/client", function(req, res) {
  var newClient = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };


  if(!(req.body.name && req.body.email && req.body.password && req.body.password2)) {
      req.flash("error", "Some information is missing");
      return res.redirect("/auth/register/client");
  }

  Client.getClientByUsername(newClient.email, function(err,user){
    if(err) throw err;
    if(user) {
      req.flash("error", "Email is already taken!");
      return res.redirect("/auth/register/client");
    } else {
      bcrypt.hash(req.body.password2, 10, function (err, hash){
        if(err) throw err;
        Client.comparePassword(newClient.password, hash, function (err, isMatch) {
          if(err) throw err;
          if(!isMatch) {
            req.flash("error", "Passwords do not match");
            return res.redirect("/auth/register/client");
          } else {
            var user = new Client({
              name: newClient.name,
              email: newClient.email,
              password: newClient.password
            });
            Client.createUser(user, (err, createdClient) => {
              if(err) throw err;
              //Verification.createToken(req, res, createdUser);
              res.redirect("/");
            });
          }
        });
      });
    }
  });
});

module.exports = router;
