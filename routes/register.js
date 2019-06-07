const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// const Verification = require("./createToken");
const Client = require("../models/Client");
const Partner = require("../models/Partner");

//const registerRouter = require("./registerRoute");

// GET register page
router.get("/register", function(req,res) {
  res.render("register");
});

// GET register page for clients
router.get("/register/client", function(req, res) {
  res.render("register_client");
});

// GET register page for partners
router.get("/register/partner", function(req, res) {
  res.render("register_partner");
});

// router.post("/register/:type", function(req, res) {
  // if(req.params.type === "client")
  // {
  //   var newUser = new Client ({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  //   registerRouter.registerRoute(req,res,newUser);
  // }
//   else {
//     var newUser = new Partner ({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });
//     registerRouter.registerRoute(req,res,newUser);
//   }
// });

// POST route for registering client
router.post("/register/client", function(req, res) {
  var newClient = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  if(!(req.body.name && req.body.email && req.body.password && req.body.password2)) {
      // req.flash("error_signup", "Some information is missing");
      return res.redirect("/");
  }

  Client.getClientByUsername(newClient.email, function(err,user){
    if(err) throw err;
    if(user) {
      // req.flash("error_signup", "Email is already taken!");
      return res.redirect("/");
    } else {
      bcrypt.hash(req.body.password2, 10, function (err, hash){
        if(err) throw err;
        Client.comparePassword(newClient.password, hash, function (err, isMatch) {
          if(err) throw err;
          if(!isMatch) {
            // req.flash("error_signup", "Passwords do not match");
            return res.redirect("/");
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


// POST route for registering partner
router.post("/register/partner", function(req, res) {
  var newPartner = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  if(!(req.body.name && req.body.email && req.body.password && req.body.password2)) {
      // req.flash("error_signup", "Some information is missing");
      return res.redirect("/");
  }

  Partner.getPartnerByUsername(newPartner.email, function(err,user){
    if(err) throw err;
    if(user) {
      // req.flash("error_signup", "Email is already taken!");
      return res.redirect("/");
    } else {
      bcrypt.hash(req.body.password2, 10, function (err, hash){
        if(err) throw err;
        Partner.comparePassword(newPartner.password, hash, function (err, isMatch) {
          if(err) throw err;
          if(!isMatch) {
            // req.flash("error_signup", "Passwords do not match");
            return res.redirect("/");
          } else {
            var user = new Partner({
              name: newPartner.name,
              email: newPartner.email,
              password: newPartner.password
            });
            Partner.createUser(user, (err, createdPartner) => {
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
