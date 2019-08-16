const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var PartnerSchema = mongoose.Schema({
    type: {
        type: String,
        default: "p"
    },
    messageNotification: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },//, required: true},
    password: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    dateOfBirth: {
        type: String
    },
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
        numberAddress: {
            type: String,
            default: ""
        },
        streetAddress: {
            type: String,
            default: ""
        },
        detailedAddress: {
            type: String,
            default: ""
        },
        city: {
            type: String
        },
        // state: {
        //     type: String
        // },
        country: {
            type: String
        },
        postalCode: {
            type: String
        },
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
    phoneNumber: {
        type: String
    },
    kakaoID: {
        type: String
    },
    facebookID: {
        type: String
    },
    googleID: {
        type: String
    },
    naverID: {
        type: String
    },
    // pic stores the 'filename' of the profile picture
    profilePic: {
        type: String,
        default: ""
    },
    coverPhoto: {
        type: String,
        default: ""
    },
    partnerProfile: {
        type: String,
        default: ""
    },
    // partnerProfile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "PartnerProfile"
    // },
    // 가입일자
    registeredDate: {
        type: Date,
        default: Date.now()
    },
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rating"
        }
    ],
    payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        }
    ],
    deletedAccount: {
        isDeleted: {
            type: Boolean,
            default: false
        },
        expiredDate: {
            type: Date
        }
    }
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

module.exports.deletePartner = function(id) {
    var update = {
        isDeleted : true,
        // 1 min = 60000
        expiredDate: Date.now() + (60000 * 60 * 24 * 7) // + 7 days
    }
    Partner.findOneAndUpdate({_id: id}, {$set: {deletedAccount: update}}, (err, doc) => {
        if(err) {
            throw err;
        } else {
            console.log(doc);
        }
    });
};

module.exports.undeletePartner = function(id) {
    var update = {
        isDeleted : false,
        expiredDate : undefined
    }
    Partner.findOneAndUpdate({_id: id}, {$set: {deletedAccount: update}}, (err, doc) => {
        if(err) {
            throw err;
        } else {
            console.log(doc);
        }
    })
}
