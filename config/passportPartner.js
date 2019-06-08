const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const NaverStrategy = require("passport-naver").Strategy;
// const KakaoStrategy = require("passport-kakao").Strategy;

const Partner = require("../models/Partner");

const keys = require("./keys");

//Passport-local Strategy
passport.use(
    "local-partnerLogin", new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, (username, password, done) => {
        Partner.getUserByUsername(username, (err, user) => {
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
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Partner.findById(id, (err, user) => {
        done(err, user);
    });
});

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
