const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var ClientSchema = mongoose.Schema({
    type: {
        type: String,
        default: "c"
    },
    // 담당자 성함
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
    // 생년월일
    dateOfBirth: {
        type: String
    },
    // 업종
    category: {
        type: String
    },
    // 담당자 직급
    managerPosition: {
        type: String
    },
    // 담당자 전화번호
    managerPhoneNumber: {
        type: String
    },
    // 화사 또는 기관명 
    companyName: {
        type: String
    },
    // 회사 웹사이트
    companyWebsite: {
        type: String
    },
    // 회사 SNS
    companySNS: {
        type: String
    },
    // 회사 소개
    companyDescription: {
        type: String
    },
    // 카카오톡 ID
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
    // 회사 로고
    companyLogo: {
        type: String,
        default: ""
    },
    // isExistingMember: {type: Boolean, default: false},
    // 가입일자
    registeredDate: {
        type: Date,
        default: Date.now()
    }
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
