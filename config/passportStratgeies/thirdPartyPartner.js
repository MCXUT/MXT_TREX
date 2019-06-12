const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
// const NaverStrategy = require("passport-naver").Strategy;

const Partner = require("../../models/Partner");
const keys = require("../keys");

passport.use("login-facebook", new FacebookStrategy({
      clientID: keys.facebookClientInfo.clientID,
      clientSecret: keys.facebookClientInfo.clientSecret,
      callbackURL: keys.facebookClientInfo.callback,
      profileFields: ['id', 'email', 'name', 'photos']
    },
    (accessToken, refreshToken, profile, done) => {
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

passport.use("login-kakao", new KakaoStrategy({
    clientID: "6bfe97b371c7b6bb8e1e1ae0735d6775", // The REST API Key goes here
    callbackURL: "/auth/kakao/callback" // The "redirect path" that we set in the developer setting in Kakao
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Partner.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = thirdPartyClient;
