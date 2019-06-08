const Client = require("../models/Client");
const Partner = require("../models/Client");

module.exports.searchType(email, callback) {
  Client.findOne({email: email}, function(err,user){
    if (user) {
      return callback(user,"c");
    }
  });
  Partner.findOne({email: email}, function(err,user){
    if (user) {
      return callback(user,"p");
    }
  });
}
