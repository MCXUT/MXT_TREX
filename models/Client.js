const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var ClientSchema = mongoose.Schema({
    type: {type: String, default: "c"},
    name: { type: String, required: true},
    email: { type: String, unique: true},//, required: true},
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    dateOfBirth: String,
    // address: {
    //   unit: String,
    //   street: String,
    //   pc: String,
    //   province: String,
    //   country: String
    // },
    address: {
      type: String,
      default: ""
    },
    coordinates: {
      lat: Number,
      lng: Number,
      default: {}
    },
    phoneNumber: String,
    kakaoID: String,
    facebookID: String,
    googleID: String,
    naverID: String,
    // pic stores the 'filename' of the profile picture
    pic: String
}, {minimize: false});

var Client = module.exports = mongoose.model('Client', ClientSchema);

module.exports.createUser = (newUser, done) => {
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
