const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const Client = require("../models/Client");
const Partner = require("../models/Partner");
const Message = require("../models/Message");
const localAdmin = require("../config/passportStrategies/localAdmin");

router.get("/trex-admin/login", function(req,res){
  res.render("trexAdminLogin");
})

router.post("/trex-admin/login", localAdmin.authenticate('local-admin', {
  successRedirect: "/trex-admin",
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
                return res.render("trexAdminpage", {
                  partnerList : partners,
                  clientList: clients,
                  adminList: admins,
                  messageList: messages
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

router.get("/deleteClient/:id", function(req,res) {
    console.log("clientID: " + req.params.id);
    Client.deleteOne({"_id" : req.params.id}, function(err, obj) {
        res.redirect("/trex-admin#?users-clients");
    });
});

router.get("/deletePartner/:id", function(req,res) {
    console.log("partnerID: " + req.params.id);
    Partner.deleteOne({"_id" : req.params.id}, function(err, obj) {
        res.redirect("/trex-admin?index=3");
    });
});

router.get("/deleteAdmin/:id", function(req,res) {
    console.log("adminID: " + req.params.id);
    Admin.deleteOne({"_id" : req.params.id}, function(err, obj) {
        res.redirect("/trex-admin?index=7");
    });
})

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
                    res.redirect("/trex-admin");
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
