const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Client = require("../../models/Client");
const keys = require("../keys");

// Local Strategy
passport.use("local-client", new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, (username, password, done) => {
  Client.getClientByUsername(username, function(err,user) {
    if(err) throw err;
    if(!user) {
      return done(null, false, {message: "Invalid Username"});
    }
    if(!user.isVerified) {
      return done(null, false, {message: "Your email has not been verified yet"});
    }
    Client.comparePassword(password, user.password, function (err, isMatch){
      if(err) throw err;
      if(!isMatch) {
          return done(null, false, {message: "Invalid Password"});
      } else {
          return done(null, user);
      }
    });
  });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Client.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = localClient;
