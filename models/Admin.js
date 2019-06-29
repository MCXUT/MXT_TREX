const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var AdminSchema = mongoose.Schema({
  email: String,
  pw: String
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.createAdmin = (newUser, done) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(done);
        });
    });
};

module.exports.getClientByUsername = (username, done) => {
    var query = {email: username};
    Client.findOne(query, done);
};

module.exports.comparePassword = (candidatePassword, hash, done) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        done(null, isMatch);
    });
};
