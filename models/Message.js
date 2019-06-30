const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var IndividualMessage = mongoose.Schema({
    content: {
        type: String
    },
    author: {
        type: String // "c" or "p"
    },
    time: {
        type: String
    },
    date: {
        type: String
    }
});

var MessageSchema = mongoose.Schema({
    client: {
        type: String
    },
    clientName: {
        type: String
    },
    partner: {
        type: String
    },
    partnerName: {
        type: String
    },
    pic: {
        type: String
    },
    clientNotification: {
        type: Boolean,
        default: false
    },
    partnerNotification: {
        type: Boolean,
        default: false
    },
    detail: [IndividualMessage]
}, {minimize: false});

var Message = module.exports = mongoose.model('Message', MessageSchema);