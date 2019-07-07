const mongoose = require("mongoose");

var DeletedAccountSchema = mongoose.Schema({
    deletionDate: {
        type: Date,
        default: Date.now() + (60000 * 60 * 24 * 7) // 7 days
    },
    // Both Client and Partners' common types:
    // type / messageNotification / name / email / password / dateOfBirth /
    // kakaoID / naverID / googleID / facebookID / registeredDate
    type: {
        type: String
    },
    messageNotification: {
        type: Boolean
    },
    name: {
        type: String
    },
    email: {
        type: String
    }, //, required: true},
    password: {
        type: String
    },
    // 생년월일
    dateOfBirth: {
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
    registeredDate: {
        type: Date
    },
    // For Clients
    category: {
        type: String
    },
    savedPartners: {
        type: [String]
    },
    managerPosition: {
        type: String
    },
    managerPhoneNumber: {
        type: String
    },
    companyName: {
        type: String
    },
    companyAddress: {
        type: String
    },
    companyWebsite: {
        type: String
    },
    companySNS: {
        type: String
    },
    companyDescription: {
        type: String
    },
    companyLogo: {
        type: String
    },
    //PartnerSchema
    languages: {
        langchoice: [String],
        langproficiency: [String]
    },
    address: {
        numberAddress: {
            type: String
        },
        streetAddress: {
            type: String
        },
        detailedAddress: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        postalCode: {
            type: String
        },
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    phoneNumber: {
        type: String
    },
    profilePic: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    partnerProfile: {
        type: String
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating"
    }],
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    }]
}, {
    minimize: false
});

var DeletedAccount = module.exports = mongoose.model('DeletedAccount', DeletedAccountSchema);

module.exports.createDeletedAccount = (foundUser, done) => {
    var toBeDeleted = new DeletedAccount({});
    if (foundUser.type) toBeDeleted.type = foundUser.type;
    if (foundUser.messageNotification) toBeDeleted.messageNotification = foundUser.messageNotification;
    if (foundUser.name) toBeDeleted.name = foundUser.name;
    if (foundUser.email) toBeDeleted.email = foundUser.email;
    if (foundUser.password) toBeDeleted.password = foundUser.password;
    if (foundUser.dateOfBirth) toBeDeleted.dateOfBirth = foundUser.dateOfBirth;
    if (foundUser.kakaoID) toBeDeleted.kakaoID = foundUser.kakaoID;
    if (foundUser.facebookID) toBeDeleted.facebookID = foundUser.facebookID;
    if (foundUser.googleID) toBeDeleted.googleID = foundUser.googleID;
    if (foundUser.naverID) toBeDeleted.naverID = foundUser.naverID;
    if (foundUser.registeredDate) toBeDeleted.registeredDate = foundUser.registeredDate;
    //Clients
    if (foundUser.category) toBeDeleted.category = foundUser.category;
    if (foundUser.savedPartners) toBeDeleted.savedPartners = foundUser.savedPartners;
    if (foundUser.managerPosition) toBeDeleted.managerPosition = foundUser.managerPosition;
    if (foundUser.managerPhoneNumber) toBeDeleted.managerPhoneNumber = foundUser.managerPhoneNumber;
    if (foundUser.companyName) toBeDeleted.companyName = foundUser.companyName;
    if (foundUser.companyAddress) toBeDeleted.companyAddress = foundUser.companyAddress;
    if (foundUser.companyWebsite) toBeDeleted.companyWebsite = foundUser.companyWebsite;
    if (foundUser.companySNS) toBeDeleted.companySNS = foundUser.companySNS;
    if (foundUser.companyDescription) toBeDeleted.companyDescription = foundUser.companyDescription;
    if (foundUser.companyLogo) toBeDeleted.companyLogo = foundUser.companyLogo;
    //Partners
    if (foundUser.languages) toBeDeleted.languages = foundUser.languages;
    if (foundUser.address) toBeDeleted.address = foundUser.address;
    if (foundUser.phoneNumber) toBeDeleted.phoneNumber = foundUser.phoneNumber;
    if (foundUser.profilePic) toBeDeleted.profilePic = foundUser.profilePic;
    if (foundUser.coverPhoto) toBeDeleted.coverPhoto = foundUser.coverPhoto;
    if (foundUser.partnerProfile) toBeDeleted.partnerProfile = foundUser.partnerProfile;
    if (foundUser.ratings) toBeDeleted.ratings = foundUser.ratings;
    if (foundUser.payments) toBeDeleted.payments = foundUser.payments;
    toBeDeleted.save(done);
}
