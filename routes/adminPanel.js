const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const Client = require("../models/Client");
const Partner = require("../models/Partner");
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
              return res.render("trexAdminpage", {
                partnerList : partners,
                clientList: clients,
                adminList: admins
              });
            });
          });
        });
        // Client.find({}).toArray(function(err, clients) {
        //   Partner.find({}).toArray(function(err, partners){
        //     Admin.find({}).toArray(function(err, admins){
        //       return res.render("trexAdminpage", {
        //         partnerList : partners,
        //         clientList: clients,
        //         adminList: admins
        //       });
        //     });
        //   });
        // });
      }
    });
  }
  else {
    return res.redirect("/trex-admin/login");
  }
});

// Test Ver.
// router.post("/addAdmin", function(req,res) {
//   var newAdmin = {
//     name : req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   };
//   if(!(req.body.name && req.body.email && req.body.password && req.body.password2)) {
//         req.flash("error_signup", "Some information is missing");
//         return res.redirect("/trex-admin");
//   }
//   Admin.getAdminByEmail(newAdmin.email, (err, user) => {
//     if(err) throw err;
//     if(user) {
//       req.flash("error_signup", "Email is already taken");
//       return res.redirect("/trex-admin");
//     } else {
//       bcrypt.hash(req.body.password2, 10, (err,hash) => {
//         if(err) throw err;
//         Admin.comparePassword(newAdmin.password, hash, (err, isMatch) => {
//           if(err) throw err;
//           if(!isMatch) {
//             req.flash("error_signup", "Passwords do not match");
//             return res.redirect("/trex-admin");
//           } else {
//             var admin = new Admin({
//               email: newAdmin.email,
//               name: newAdmin.name,
//               password: newAdmin.password
//             });
//             Admin.createAdmin(admin, (err, createdAdmin) => {
//               if(err) throw err;
//               res.redirect("/trex-admin");
//             });
//           }
//         });
//       });
//     }
//   });
// })

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
