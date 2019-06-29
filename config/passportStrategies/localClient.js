const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// var hasher = require("wordpress-hash-node");

const Client = require("../../models/Client");
const Partner = require("../../models/Partner");
const Admin = require("../../models/Admin");
const middleware = require("../../middlewares/middleware");
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
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
  middleware.searchTypeById(id,(user,type) => {
    if(type === "c"){
      Client.findById(id, (err, user) => {
          done(err, user);
      });
    } else if(type === "p") {
      Partner.findById(id, (err, user) => {
          done(err, user);
      });
    } else {
      Admin.findById(id, (err, user) => {
        done(err, user);
      })
    }
  });
});

module.exports = passport;
