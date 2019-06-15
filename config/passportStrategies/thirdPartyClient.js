const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const NaverStrategy = require("passport-naver").Strategy;

const Client = require("../../models/Client");
const keys = require("../keys");

passport.use("client-facebook", new FacebookStrategy({
      clientID: keys.facebookClientInfo.clientID,
      clientSecret: keys.facebookClientInfo.clientSecret,
      callbackURL: keys.facebookClientInfo.callback + "/client",
      profileFields: ['id', 'email', 'name', 'photos']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Client: accessToken");
      Client.findOne({
        facebookID: profile.id
      }).then((foundUser) => {
        if (foundUser) {
          console.log("This is FoundUser" + foundUser);
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
    }
));

passport.use("client-kakao", new KakaoStrategy({
    clientID: keys.kakao.clientID, // The REST API Key goes here
    callbackURL: keys.kakao.callback + "/client" // The "redirect path" that we set in the developer setting in Kakao
  },
  function(accessToken, refreshToken, profile, done) {
    // The user info is in profile
    Client.findOne({
      kakaoID: profile.id
    }).then((foundUser) => {
      if (foundUser) {
        done(null, foundUser);
      } else {
        // If the user agrees to share Kakao Account Email
        if (profile._json.kaccount_email) {
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

passport.use("client-google", new GoogleStrategy({
  clientID: keys.googleClientInfo.clientID,
  clientSecret: keys.googleClientInfo.clientSecret,
  callbackURL: keys.googleClientInfo.callback + "/client"
}, function(accessToken, refreshToken, profile, done) {
  Client.findOne({
    googleID: profile.id
  }).then((foundUser)=> {
    if(foundUser) {
      done(null, foundUser);
    } else {
      new Client({
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

passport.use("client-naver", new NaverStrategy({
    clientID: keys.naverClientInfo.clientID,
    clientSecret: keys.naverClientInfo.clientSecret,
    callbackURL: keys.naverClientInfo.callback + "/client"
    },
  function(accessToken, refreshToken, profile, done) {
    Client.findOne({
      naverID: profile.id
    }).then((foundUser)=> {
      if(foundUser) {
        done(null, foundUser)
      } else {
        new Client({
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
