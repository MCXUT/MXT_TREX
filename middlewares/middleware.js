const Client = require("../models/Client");
const Partner = require("../models/Partner");

module.exports.searchTypebyEmail = (email, callback) => {
  Client.findOne({email: email}, function(err,user){
    if (user) {
      return callback("c");
    } else {
      Partner.findOne({email: email}, function(err,user){
        if (user) {
          return callback("p");
        } else {
          return callback("n");
        }
      });
    }
  });
}

module.exports.searchTypeById = (id, callback) => {
  Client.findOne({_id: id}, function(err,user){
    if (user) {
      return callback(user.id,"c");
    }
  });
  Partner.findOne({_id: id}, function(err,user){
    if (user) {
      return callback(user.id,"p");
    }
  });
}
