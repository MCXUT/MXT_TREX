const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const NaverStrategy = require("passport-naver").Strategy;

const Partner = require("../../models/Partner");
const keys = require("../keys");

passport.use("partner-facebook", new FacebookStrategy({
      clientID: keys.facebookClientInfo.clientID,
      clientSecret: keys.facebookClientInfo.clientSecret,
      callbackURL: keys.facebookClientInfo.callback + "/partner",
      profileFields: ['id', 'email', 'name', 'photos']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Partner: accessToken");
      Partner.findOne({
        facebookID: profile.id
      }).then((foundUser) => {
        if (foundUser) {
          console.log("This is FoundUser" + foundUser);
          done(null, foundUser);
        } else {
          new Partner({
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
    }
));

passport.use("partner-kakao", new KakaoStrategy({
  clientID: keys.kakao.clientID, // The REST API Key goes here
  callbackURL: keys.kakao.callback + "/partner" // The "redirect path" that we set in the developer setting in Kakao
  },
  function(accessToken, refreshToken, profile, done) {
    // The user info is in profile
    Partner.findOne({
      kakaoID: profile.id
    }).then((foundUser) => {
      if (foundUser) {
        done(null, foundUser);
      } else {
        // If the user agrees to share Kakao Account Email
        if (profile._json.kaccount_email) {
          new Partner({
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
          new Partner({
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

passport.use("partner-google", new GoogleStrategy({
  clientID: keys.googleClientInfo.clientID,
  clientSecret: keys.googleClientInfo.clientSecret,
  callbackURL: keys.googleClientInfo.callback + "/partner"
}, function(accessToken, refreshToken, profile, done) {
  Partner.findOne({
    googleID: profile.id
  }).then((foundUser)=> {
    if(foundUser) {
      done(null, foundUser);
    } else {
      new Partner({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleID: profile.id
      }).save().then((newUser) => {
        console.log("new User Created: " + newUser);
        done(null, newUser);
      });
    }
  });
  }
));

passport.use("partner-naver", new NaverStrategy({
    clientID: keys.naverClientInfo.clientID,
    clientSecret: keys.naverClientInfo.clientSecret,
    callbackURL: keys.naverClientInfo.callback + "/partner"
    },
  function(accessToken, refreshToken, profile, done) {
    Partner.findOne({
      naverID: profile.id
    }).then((foundUser)=> {
      if(foundUser) {
        done(null, foundUser)
      } else {
        new Partner({
          name: profile.displayName,
          email: profile.emails[0].value,
          naverID: profile.id
        }).save().then((newUser) => {
          console.log("new User Created: " + newUser);
          done(null, newUser);
        });
      }
    });
  }
));

module.exports = passport;
