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


module.exports.matchUserEmail = (req,res,next) => {
  Client.findOne({email: req.body.email}).then((foundClient) => {
    if(foundClient) {
      return next;
    } else {
      Partner.findOne({email:req.body.email}).then((foundPartner) => {
        if(foundPartner) {
          return next;
        } else {
          req.flash("error_reset", "No user exists with such email");
          return res.redirect("/");
        }
      });
    }
  });
}
