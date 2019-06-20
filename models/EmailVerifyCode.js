const mongoose = require("mongoose");

// This is for email Verification only, data will be deleted when ranNumber has expired.
var EmailVerifyCode = mongoose.Schema({
  ranNum : Number,
  numExpires : Date,
  email: String
});

var VerifyCode = module.exports = mongoose.model('VerifyCode', EmailVerifyCode);

// module.exports.compareCode = (userEmail, userInputCode) => {
//     VerifyCode.findOne({
//       email: userEmail,
//       numExpires: {$gt: Date.now()}
//     }).then((foundData) => {
//       if(!foundData) {
//         req.flash("error", "Code has been expired.");
//         return done(false);
//       } else {
//         var code = foundData.ranNum;
//         if(userInputCode === code) {
//           VerifyCode.findByIdAndRemove(foundData._id, (err) => {
//             if(err) {
//               req.flash("error", "Unknown Error Occurred");
//               return res.redirect("/");
//             }
//           });
//           return done(true);
//         }
//         else {
//           return done(false);
//         }
//       }
//     })
// };
