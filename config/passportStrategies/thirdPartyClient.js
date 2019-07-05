const passport = require("passport");
const nodemailer = require("nodemailer");
const FacebookStrategy = require("passport-facebook").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const NaverStrategy = require("passport-naver").Strategy;

const Client = require("../../models/Client");
const keys = require("../keys");

passport.use("client-facebook", new FacebookStrategy({
      clientID: keys.facebookClientInfo.clientID,
      clientSecret: keys.facebookClientInfo.clientSecret,
      callbackURL: "/auth/facebook/callback/client",
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
            
            // Email Trex about Client Creation
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
                subject : "트렉스 클라이언트 가입",
                html: '<p>트렉스에 새로운 클라이언트가 페이스북을 통해 가입하였습니다.</p>' +
                      '<h3>이름: </h3>' + newUser.name +
                      '<h3>이메일: </h3>' + newUser.email
            };
            transporter.sendMail(mailOption, (err) => {
                if(err) {
                    console.log(err);
                    return res.redirect("/");
                }
                console.log("Email successfully sent to Trex about Client Facebook creation.");
            });
            
            done(null, newUser);
          });
        }
      });
    }
));

passport.use("client-kakao", new KakaoStrategy({
    clientID: keys.kakao.clientID, // The REST API Key goes here
    callbackURL: "/auth/kakao/callback/client" // The "redirect path" that we set in the developer setting in Kakao
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
            
            // Email Trex about Client Creation
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
                subject : "트렉스 클라이언트 가입",
                html: '<p>트렉스에 새로운 클라이언트가 카카오를 통해 가입하였습니다.</p>' +
                      '<h3>이름: </h3>' + newUser.name +
                      '<h3>이메일: </h3>' + newUser.email
            };
            transporter.sendMail(mailOption, (err) => {
                if(err) {
                    console.log(err);
                    return res.redirect("/");
                }
                console.log("Email successfully sent to Trex about Client Kakao creation.");
            });
            
            done(null, newUser);
          });
        }
      }
    });
  }
));


passport.use("client-google",
    new GoogleStrategy({
        // options for the google strategy
        callbackURL: "/auth/google/callback/client",
        clientID: keys.googleClientInfo.clientID,
        clientSecret: keys.googleClientInfo.clientSecret
    }, function(accessToken, refreshToken, profile, done) {
        // accessToken: what we receive from Google
        // refreshToken: refreshes the access token
        // profile: information that passport comes back with
        // done: call when we are done with the callback function
        Client.findOne({googleID: profile.id}).then((foundUser) => {
            if(foundUser) {
                done(null, foundUser);
            } else {
                new Client({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log("new User Created: " + newUser);
                    
                    // Email Trex about Client Creation
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
                        subject : "트렉스 클라이언트 가입",
                        html: '<p>트렉스에 새로운 클라이언트가 구글을 통해 가입하였습니다.</p>' +
                              '<h3>이름: </h3>' + newUser.name +
                              '<h3>이메일: </h3>' + newUser.email
                    };
                    transporter.sendMail(mailOption, (err) => {
                        if(err) {
                            console.log(err);
                            return res.redirect("/");
                        }
                        console.log("Email successfully sent to Trex about Client Google creation.");
                    });
                    
                    done(null, newUser);
                });
            }
        })
    })
);

passport.use("client-naver", new NaverStrategy({
    clientID: keys.naverClientInfo.clientID,
    clientSecret: keys.naverClientInfo.clientSecret,
    callbackURL: "/auth/naver/callback/client"
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
          
          // Email Trex about Client Creation
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
              subject : "트렉스 클라이언트 가입",
              html: '<p>트렉스에 새로운 클라이언트가 네이버를 통해 가입하였습니다.</p>' +
                    '<h3>이름: </h3>' + newUser.name +
                    '<h3>이메일: </h3>' + newUser.email
          };
          transporter.sendMail(mailOption, (err) => {
              if(err) {
                  console.log(err);
                  return res.redirect("/");
              }
              console.log("Email successfully sent to Trex about Client Naver creation.");
          });
          
          done(null, newUser);
        });
      }
    });
  }
));

module.exports = passport;
