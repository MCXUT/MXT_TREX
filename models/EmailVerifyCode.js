const mongoose = require("mongoose");

// This is for email Verification only, data will be deleted when ranNumber has expired.
var EmailVerifyCode = mongoose.Schema({
  ranNum : {
      type: Number
  },
  numExpires : {
      type: Date
  },
  email: {
      type: String
  }
});

module.exports = mongoose.model('VerifyCode', EmailVerifyCode);
