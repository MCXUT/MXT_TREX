const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
// const NaverStrategy = require("passport-naver").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;

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
        new Client({
            name: profile.name.givenName + " " + profile.name.familyName,
            email: profile.emails[0].value,
            facebookID: profile.id,
            pic: "https://graph.facebook.com/" + profile.id + "/picture?height=250&width=250"
        }).save().then((newUser) => {
            console.log("new User Created: " + newUser);
            done(null, newUser);
        });
      }
    });
  }))

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


passport.use("login-kakao", new KakaoStrategy({
    clientID : "6bfe97b371c7b6bb8e1e1ae0735d6775",  // The REST API Key goes here
    callbackURL : "/auth/kakao/callback" // The "redirect path" that we set in the developer setting in Kakao
  },
  function(accessToken, refreshToken, profile, done) {
    // The user info is in profile
    Client.findOne({kakaoID: profile.id}).then((foundUser) => {
      if(foundUser) {
        done(null, foundUser);
      } else {
        // console.log(profile);
        // If the user agrees to share Kakao Account Email
        if(profile._json.kaccount_email) {
          new Client({
            name: profile.displayName,
            email: profile._json.kaccount_email,
            kakaoID: profile.id
          }).save().then((newUser) => {
            console.log("New Client Created: " + newUser);
            done(null, newUser);
          });
        } else {
          // If the user doesn't want to provide their Kakao Account Email
          // Must prompt them to give us an Email
          new Client({
            name: profile.displayName,
            kakaoID: profile.id
          }).save().then((newUser) => {
            console.log("New Client Created: " + newUser);
            done(null, newUser);
          });
        }
      }
    });
  }
));

// passport.use {
//   "facebook", new FacebookStrategy({
//     clientID: keys.facebookClientInfo.clientID,
//     clientSecret: keys.facebookClientInfo.clietnSecret,
//     callbackURL: keys.facebookClientInfo.callbackURL,
//     profileFields: profileFields: ['id', 'email', 'name', 'photos']
//   },
//   function(accessToken, refreshToken, profile, done) {
//     const socialID = profile.id;
//     const nickname = profile.displayName;
//     const profileImageUrl = profile.photos[0].value;
//   }
// )
// }

module.exports = passport;
