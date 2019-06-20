const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// var hasher = require("wordpress-hash-node");

const Client = require("../../models/Client");
const Partner = require("../../models/Partner");
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
    if(!user.isVerified) {
      return done(null, false, {message: "Your email has not been verified yet"});
    }

    //Test for wordpress hasher
    // if(user.isExistingMember) {
    //   console.log("This user is Existing member");
    //   console.log(hasher.HashPassword(password));
    //   if(hasher.CheckPassword(password, user.password)) {return done(null,user);}
    //   else {return done(null,false, {message: "Invalid Password"});}
    // }

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
    } else {
      Partner.findById(id, (err, user) => {
          done(err, user);
      });
    }
  });
});

module.exports = passport;
