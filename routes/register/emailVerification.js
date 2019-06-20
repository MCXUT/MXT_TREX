const express = require("express");
const router = express.Router();
const async = require("async");
const nodemailer = require("nodemailer");

const keys = require("../../config/keys");
const EmailVerifyCode = require("../../models/EmailVerifyCode");

// Post email verify code sender for partner
router.post("/register/partner/emailVerify", function(req,res) {
  // Post 받고 이메일 전송 (4 - digits)
  var userEmail = req.body.email;

  async.waterfall([
    (done) => {
      var randomNum = Math.floor(1000 + Math.random() * 9000);
      done(null, randomNum)
    },
    (randomNum, done) => {
      EmailVerifyCode.findOneAndRemove({email: userEmail}).then((deletedCode) => {
          console.log(deletedCode);
      });
      var tmpCode = new EmailVerifyCode({
        ranNum: randomNum,
        numExpires: Date.now() + 300000, //5 mins
        email: userEmail
      });

      tmpCode.save((err) => {
        done(err, tmpCode);
      });
    },
    (tmpCode, done) => {
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
        to : userEmail,
        subject : "Email Verify Code",
        text : "Code : ",
        html: '<p>Email Verify Code</p>' +
              '<h3>Code: </h3>' + tmpCode.ranNum
      };
      transporter.sendMail(mailOption, (err) => {
          if(err) {
              req.flash("error", "Error Occured when sending the email");
              return res.redirect("/");
          }
          req.flash("success", "Check your email for email verify code");
      });
    }
  ], (err) => {
    if(err) {return res.redirect("/auth/register/partner");}
    return res.status(204).send();
  });
});


// Post email verify code sender for client
router.post("/register/client/emailVerify", function(req,res) {
  // Post 받고 이메일 전송 (4 - digits)
  var userEmail = req.body.email;

  async.waterfall([
    (done) => {
      var randomNum = Math.floor(1000 + Math.random() * 9000);
      done(null, randomNum)
    },
    (randomNum, done) => {
      EmailVerifyCode.findOneAndRemove({email: userEmail}).then((deletedCode) => {
          console.log(deletedCode);
      });
      var tmpCode = new EmailVerifyCode({
        ranNum: randomNum,
        numExpires: Date.now() + 300000, //5 mins
        email: userEmail
      });

      tmpCode.save((err) => {
        done(err, tmpCode);
      });
    },
    (tmpCode, done) => {
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
        to : userEmail,
        subject : "Email Verify Code",
        text : "Code : ",
        html: '<p>Email Verify Code</p>' +
              '<h3>Code: </h3>' + tmpCode.ranNum
      };
      transporter.sendMail(mailOption, (err) => {
          if(err) {
              req.flash("error", "Error Occured when sending the email");
              return res.redirect("/");
          }
          req.flash("success", "Check your email for email verify code");
      });
    }
  ], (err) => {
    if(err) {return res.redirect("/auth/register/client");}
    return res.status(204).send();
  });
});


router.post("/register/validate/code", (req,res) => {
  var userEmail = req.body.email;
  var userInput = req.body.code;
  console.log(req.body)
  console.log("UserEmail: " + userEmail);
  console.log("UserInput: " + userInput);
  EmailVerifyCode.findOne({email: userEmail, numExpires: {$gt: Date.now()}}).then((foundData) => {
    if(!foundData){
        req.flash("fail", {
            email: req.body.email,
            name: "req.body.name",
            password: "req.body.password",
            message: "Code has been expired"});
      return res.redirect("back");
    }
    else {
      var code = foundData.ranNum;
      console.log("code: " + code);
      if(code == userInput) {
        console.log("Code is matched");
        EmailVerifyCode.findByIdAndRemove(foundData._id, (err) => {
          if(err) {
            req.flash("error_db", "Unknown Error Occurred");
            return res.redirect("/");
          }
        })
        req.flash("success", "Code is matched");
        return res.status(204).send();
      }
      else {
        console.log("Code error");
        req.flash("fail", {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            message: "The code does not match"});
        return res.redirect("back");
      }
    }
  });
});

module.exports = router;
