const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var DeletedAccountSchema = mongoose.Schema({
    deletionDate: {
        type: Date,
        default: Date.now() + (60000*60*24*7) // 7 days
    },
    // Both Client and Partners common types:
    // type / messageNotification / name / email / password / dateOfBirth /
    // kakaoID / naverID / googleID / facebookID / registeredDate
    type: {
        type: String,
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
        type: Date,
        default: Date.now()
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
        type: String,
        default: ""
    },
    // For Partners
    languages: {
        langchoice: [String],
        langproficiency: [String]
    },
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
            lng: Number,
            default: {}
        }
    },
phoneNumber: {
        type: String
    },
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
    ]
}, {minimize: false});

var DeletedAccount = module.exports = mongoose.model('DeletedAccount', DeletedAccountSchema);

module.exports.createDeletedClient = (foundClient, done) => {
    var toBeDeleted = new DeletedAccount({});
    if(foundClient.type) toBeDeleted.type = foundClient.type;
    if(foundClient.messageNotification) toBeDeleted.messageNotification = foundClient.messageNotification;
    if(foundClient.name) toBeDeleted.name = foundClient.name;
    if(foundClient.email) toBeDeleted.email = foundClient.email;
    if(foundClient.password) toBeDeleted.password = foundClient.password;
    if(foundClient.dateOfBirth) toBeDeleted.dateOfBirth = foundClient.dateOfBirth;
    if(foundClient.category) toBeDeleted.category = foundClient.category;
    if(foundClient.savedPartners) toBeDeleted.savedPartners = foundClient.savedPartners;
    if(foundClient.managerPosition) toBeDeleted.managerPosition = foundClient.managerPosition;
    if(foundClient.managerPhoneNumber) toBeDeleted.managerPhoneNumber = foundClient.managerPhoneNumber;
    if(foundClient.companyName) toBeDeleted.companyName = foundClient.companyName;
    if(foundClient.companyAddress) toBeDeleted.companyAddress = foundClient.companyAddress;
    if(foundClient.companyWebsite) toBeDeleted.companyWebsite = foundClient.companyWebsite;
    if(foundClient.companySNS) toBeDeleted.companySNS = foundClient.companySNS;
    if(foundClient.companyDescription) toBeDeleted.companyDescription = foundClient.companyDescription;
    if(foundClient.kakaoID) toBeDeleted.kakaoID = foundClient.kakaoID;
    if(foundClient.facebookID) toBeDeleted.facebookID = foundClient.facebookID;
    if(foundClient.googleID) toBeDeleted.googleID = foundClient.googleID;
    if(foundClient.naverID) toBeDeleted.naverID = foundClient.naverID;
    if(foundClient.companyLogo) toBeDeleted.companyLogo = foundClient.companyLogo;
    if(foundClient.registeredDate) toBeDeleted.registeredDate = foundClient.registeredDate;
    toBeDeleted.save(done);
}

module.exports.createDeletedPartner = (foundPartner, done) => {
    var toBeDeleted = new DeletedAccount({});
    if(foundPartner.type) toBeDeleted.type = foundPartner.type;
    if(foundPartner.messageNotification) toBeDeleted.messageNotification = foundPartner.messageNotification;
    if(foundPartner.name) toBeDeleted.name = foundPartner.name;
    if(foundPartner.email) toBeDeleted.email = foundPartner.email;
    if(foundPartner.password) toBeDeleted.password = foundPartner.password;
    if(foundPartner.dateOfBirth) toBeDeleted.dateOfBirth = foundPartner.dateOfBirth;
    if(foundPartner.languages) toBeDeleted.languages = foundPartner.languages;
    if(foundPartner.address) toBeDeleted.address = foundPartner.address;
    if(foundPartner.phoneNumber) toBeDeleted.phoneNumber = foundPartner.phoneNumber;
    if(foundPartner.kakaoID) toBeDeleted.kakaoID = foundPartner.kakaoID;
    if(foundPartner.facebookID) toBeDeleted.facebookID = foundPartner.facebookID;
    if(foundPartner.googleID) toBeDeleted.googleID = foundPartner.googleID;
    if(foundPartner.naverID) toBeDeleted.naverID = foundPartner.naverID;
    if(foundPartner.profilePic) toBeDeleted.profilePic = foundPartner.profilePic;
    if(foundPartner.coverPhoto) toBeDeleted.coverPhoto = foundPartner.coverPhoto;
    if(foundPartner.partnerProfile) toBeDeleted.partnerProfile = foundPartner.partnerProfile;
    if(foundPartner.registeredDate) toBeDeleted.registeredDate = foundPartner.registeredDate;
    if(foundPartner.ratings) toBeDeleted.ratings = foundPartner.ratings;
    if(foundPartner.payments) toBeDeleted.payments = foundPartner.payments;
    toBeDeleted.save(done);
}
