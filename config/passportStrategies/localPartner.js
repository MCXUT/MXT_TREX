const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Partner = require("../../models/Partner");
const keys = require("../keys");

// Local Strategy
passport.use("local-partner", new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, (username, password, done) => {
  Partner.getPartnerByUsername(username, function(err,user) {
    if(err) throw err;
    if(!user) {
      return done(null, false, {message: "Invalid Username"});
    }
    if(!user.isVerified) {
      return done(null, false, {message: "Your email has not been verified yet"});
    }
    Partner.comparePassword(password, user.password, function (err, isMatch){
      if(err) throw err;
      if(!isMatch) {
          return done(null, false, {message: "Invalid Password"});
      } else {
          return done(null, user);
      }
    });
  });
}));


// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
//     Partner.findById(id, (err, user) => {
//         done(err, user);
//     });
// });

module.exports = passport;
