const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports.registerRoute = function(req,res,newUser) {

  if(!(req.body.name && req.body.email && req.body.password && req.body.password2)) {
    // req.flash("error_signup", "Some information is missing");
    return res.redirect("/");
  }
  User.getUserByUsername(newUser.email, function(err,user){
      if(err) throw err;
      if(user) {
        // req.flash("error_signup", "Email is already taken!");
        return res.redirect("/");
      } else {
        bcrypt.hash(req.body.password2, 10, function (err, hash){
          if(err) throw err;
          User.comparePassword(newUser.password, hash, function (err, isMatch) {
            if(err) throw err;
            if(!isMatch) {
              // req.flash("error_signup", "Passwords do not match");
              return res.redirect("/");
            } else {
              var user = new User({
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                clientOrPartner: req.params.type
              });
              User.createUser(user, (err, createdUser) => {
                if(err) throw err;
                //Verification.createToken(req, res, createdUser);
                res.redirect("/");
              });
            }
          });
        });
      }
  });
}
