const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var PartnerSchema = mongoose.Schema({
    type: {type: String, default: "p"},
    name: { type: String, required: true},
    email: { type: String, unique: true},//, required: true},
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    dateOfBirth: Date,
    languages: {
        langchoice: [String],
        langproficiency: [String]
    },
    // address: {
    //   unit: String,
    //   street: String,
    //   pc: String,
    //   province: String,
    //   country: String
    // },
    address: {
      streetAddress: {
        type: String,
        default: ""
      },
      city: String,
      country: String,
      postalCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
        default: {}
      }
    },
    // address: {
    //   type: String,
    //   default: ""
    // },
    // coordinates: {
    //   lat: Number,
    //   lng: Number,
    //   default: {}
    // },
    languages: { // only for partners?
      langchoice: [String],
      langproficiency: [String]
    },
    phoneNumber: String,
    kakaoID: String,
    facebookID: String,
    googleID: String,
    naverID: String,
    // pic stores the 'filename' of the profile picture
    pic: String
}, {minimize: false});

var Partner = module.exports = mongoose.model('Partner', PartnerSchema);

module.exports.createUser = (newUser, done) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(done);
        });
    });
};

module.exports.getPartnerByUsername = (username, done) => {
    var query = {email: username};
    Partner.findOne(query, done);
};

module.exports.comparePassword = (candidatePassword, hash, done) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        done(null, isMatch);
    });
};
