const mongoose = require("mongoose");

// This is for email Verification only, data will be deleted when ranNumber has expired.
var EmailVerifyCode = mongoose.Schema({
  ranNum : Number,
  numExpires : Date,
  email: String
});

var VerifyCode = module.exports = mongoose.model('VerifyCode', EmailVerifyCode);

module.exports.compareCode = (userInputCode, done) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        done(null, isMatch);
    });
};
