const passport = require("passport");
const nodemailer = require("nodemailer");
const FacebookStrategy = require("passport-facebook").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const NaverStrategy = require("passport-naver").Strategy;

const Partner = require("../../models/Partner");
const keys = require("../keys");

passport.use("partner-facebook", new FacebookStrategy({
      clientID: keys.facebookClientInfo.clientID,
      clientSecret: keys.facebookClientInfo.clientSecret,
      callbackURL: "/auth/facebook/callback/partner",
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
            facebookID: profile.id
          }).save().then((newUser) => {
            console.log("new User Created: " + newUser);
            
            // Email Trex about Partner Creation
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: keys.gmailInfo.user,
                    pass: keys.gmailInfo.pass
                },
                tls: {
                    ciphers: "SSLv3"
                }
            });
            const mailOption = {
                from : keys.gmailInfo.user,
                to : keys.trexEmail.email,
                subject : "트렉스 파트너 가입",
                html: '<p>트렉스에 새로운 파트너가 페이스북을 통해 가입하였습니다.</p>' +
                      '<h3>이름: </h3>' + newUser.name +
                      '<h3>이메일: </h3>' + newUser.email
            };
            transporter.sendMail(mailOption, (err) => {
                if(err) {
                    console.log(err);
                    return res.redirect("/");
                }
                console.log("Email successfully sent to Trex about Partner Facebook creation.");
            });
            
            done(null, newUser);
          });
        }
      });
    }
));

passport.use("partner-kakao", new KakaoStrategy({
  clientID: keys.kakao.clientID, // The REST API Key goes here
  callbackURL: "/auth/kakao/callback/partner" // The "redirect path" that we set in the developer setting in Kakao
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
            
            // Email Trex about Partner Creation
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: keys.gmailInfo.user,
                    pass: keys.gmailInfo.pass
                },
                tls: {
                    ciphers: "SSLv3"
                }
            });
            const mailOption = {
                from : keys.gmailInfo.user,
                to : keys.trexEmail.email,
                subject : "트렉스 파트너 가입",
                html: '<p>트렉스에 새로운 파트너가 카카오를 통해 가입하였습니다.</p>' +
                      '<h3>이름: </h3>' + newUser.name +
                      '<h3>이메일: </h3>' + newUser.email
            };
            transporter.sendMail(mailOption, (err) => {
                if(err) {
                    console.log(err);
                    return res.redirect("/");
                }
                console.log("Email successfully sent to Trex about Partner Kakao creation.");
            });
            
            done(null, newUser);
          });
        }
      }
    });
  }
));

passport.use("partner-google",
    new GoogleStrategy({
        // options for the google strategy
        callbackURL: "/auth/google/callback/partner",
        clientID: keys.googleClientInfo.clientID,
        clientSecret: keys.googleClientInfo.clientSecret
    }, function(accessToken, refreshToken, profile, done) {
        // accessToken: what we receive from Google
        // refreshToken: refreshes the access token
        // profile: information that passport comes back with
        // done: call when we are done with the callback function
        Partner.findOne({googleID: profile.id}).then((foundUser) => {
            if(foundUser) {
                done(null, foundUser);
            } else {
                new Partner({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log("new User Created: " + newUser);
                    
                    // Email Trex about Partner Creation
                    const transporter = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: keys.gmailInfo.user,
                            pass: keys.gmailInfo.pass
                        },
                        tls: {
                            ciphers: "SSLv3"
                        }
                    });
                    const mailOption = {
                        from : keys.gmailInfo.user,
                        to : keys.trexEmail.email,
                        subject : "트렉스 파트너 가입",
                        html: '<p>트렉스에 새로운 파트너가 구글을 통해 가입하였습니다.</p>' +
                              '<h3>이름: </h3>' + newUser.name +
                              '<h3>이메일: </h3>' + newUser.email
                    };
                    transporter.sendMail(mailOption, (err) => {
                        if(err) {
                            console.log(err);
                            return res.redirect("/");
                        }
                        console.log("Email successfully sent to Trex about Partner Google creation.");
                    });
                    
                    done(null, newUser);
                });
            }
        })
    })
);



passport.use("partner-naver", new NaverStrategy({
    clientID: keys.naverClientInfo.clientID,
    clientSecret: keys.naverClientInfo.clientSecret,
    callbackURL: "/auth/naver/callback/partner"
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
          
          // Email Trex about Partner Creation
          const transporter = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                  user: keys.gmailInfo.user,
                  pass: keys.gmailInfo.pass
              },
              tls: {
                  ciphers: "SSLv3"
              }
          });
          const mailOption = {
              from : keys.gmailInfo.user,
              to : keys.trexEmail.email,
              subject : "트렉스 파트너 가입",
              html: '<p>트렉스에 새로운 파트너가 네이버를 통해 가입하였습니다.</p>' +
                    '<h3>이름: </h3>' + newUser.name +
                    '<h3>이메일: </h3>' + newUser.email
          };
          transporter.sendMail(mailOption, (err) => {
              if(err) {
                  console.log(err);
                  return res.redirect("/");
              }
              console.log("Email successfully sent to Trex about Partner Naver creation.");
          });
          
          done(null, newUser);
        });
      }
    });
  }
));

module.exports = passport;
