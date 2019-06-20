const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Client = require("../../models/Client");

//const registerRouter = require("./registerRoute");

// GET register page
router.get("/register", function(req,res) {
  res.render("register");
});

// GET register page for clients
router.get("/register/client", function(req, res) {
  res.render("register_client");
});

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
