const mongoose = require("mongoose");

// This is for email Verification only, data will be deleted when ranNumber has expired.
var EmailVerifyCode = mongoose.Schema({
  ranNum : Number,
  numExpires : Date,
  email: String
});

module.exports = mongoose.model('VerifyCode', EmailVerifyCode);
