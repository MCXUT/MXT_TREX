const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var UserSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, unique: true, required: true},
    isVerified: {type: Boolean, default: false},
    password: String,
    clientOrPartner: { type: String, required: true },
    dateOfBirth: Date,
    address: {
      unit: String,
      street: String,
      pc: String,
      province: String,
      country: String
    },
    phoneNumber: Number,
    kId: String,
    //pic:
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, done) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(done);
        });
    });
};

module.exports.getUserByUsername = (username, done) => {
    var query = {email: username};
    User.findOne(query, done);
};

module.exports.comparePassword = (candidatePassword, hash, done) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        done(null, isMatch);
    });
};
