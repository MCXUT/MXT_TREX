const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// var hasher = require("wordpress-hash-node");

const Admin = require("../../models/Admin");
const middleware = require("../../middlewares/middleware");
const keys = require("../keys");

// Local Strategy
passport.use("local-admin", new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, (username, password, done) => {
  Admin.getAdminByEmail(username, function(err,user) {
    if(err) throw err;
    if(!user) {
      return done(null, false, {message: "Invalid Username. Please try again."});
    }
    Admin.comparePassword(password, user.password, function (err, isMatch){
      if(err) throw err;
      if(!isMatch) {
          return done(null, false, {message: "Invalid Password"});
      } else {
          return done(null, user);
      }
    });
  });
}));

module.exports = passport;
