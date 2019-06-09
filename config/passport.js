const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
// const NaverStrategy = require("passport-naver").Strategy;
// const KakaoStrategy = require("passport-kakao").Strategy;

const Client = require("../models/Client");
const Partner = require("../models/Partner");
const keys = require("./keys");
const middleware = require("../middlewares/middleware");

//Passport-local Strategy
passport.use(
    "local-login", new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, (username, password, done) => {
      middleware.searchTypebyEmail(username, (user, type) => {
        if (type === "c") {
          Client.getClientByUsername(username, (err, user) => {
              if(err) throw err;
              if(!user) {
                  return done(null, false, {message: "Invalid Username or Password"});
              }
              if(!user.isVerified) {
                  return done(null, false, {message: "Your email has not been verified yet!"});
              }
              Client.comparePassword(password, user.password, (err, isMatch) => {
                  if(err) throw err;
                  if(!isMatch) {
                      return done(null, false, {message: "Invalid Username or Password"});
                  } else {
                      return done(null, user);
                  }
              });
          });
        }
        else {
          Partner.getPartnerByUsername(username, (err, user) => {
              if(err) throw err;
              if(!user) {
                  return done(null, false, {message: "Invalid Username or Password"});
              }
              if(!user.isVerified) {
                  return done(null, false, {message: "Your email has not been verified yet!"});
              }
              Partner.comparePassword(password, user.password, (err, isMatch) => {
                  if(err) throw err;
                  if(!isMatch) {
                      return done(null, false, {message: "Invalid Username or Password"});
                  } else {
                      return done(null, user);
                  }
              });
          });
        }
      })
    })
);

// function loginByThirdParty(user,foundUser,done) {
//       if(foundUser) {
//           done(null, foundUser);
//       } else {
//           console.log(profile);
//           user.save().then((newUser) => {
//               console.log("new User Created: " + newUser);
//               done(null, newUser);
//           });
//       }
// }

passport.use(
  new FacebookStrategy({
    clientID: keys.facebookClientInfo.clientID,
    clientSecret: keys.facebookClientInfo.clientSecret,
    callbackURL: keys.facebookClientInfo.callback,
    profileFields: ['id', 'email', 'name', 'photos']
  },
  (accessToken, refreshToken, profile, done) => {
    Client.findOne({facebookID: profile.id}).then((foundUser) => {
      if(foundUser) {
        console.log("This is FoundUser"+ foundUser);
        done(null, foundUser);
      } else {
        console.log(profile);
        console.log(profile.emails);
        new Client({
            name: profile.name.givenName + " " + profile.name.familyName,
            email: profile.emails[0].value,
            facebookID: profile.id
        }).save().then((newUser) => {
            console.log("new User Created: " + newUser);
            done(null, newUser);
        });
      }
    });
  }))
    // const user = new Client({
    //   name: profile.name.givenName + " " + profile.name.familyName,
    //   email: profile.emails[0].value,
    //   facebookID: profile.id
    // });
    // User.findOne({facebookID: profile.id}).then((foundUser) =>
    // loginByThirdParty(user,foundUser,done);
//   }
// )
// }

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
