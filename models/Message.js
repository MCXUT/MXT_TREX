const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var IndividualMessage = mongoose.Schema({
    content: String,
    author: String, // "c" or "p"
    time: String
});

var MessageSchema = mongoose.Schema({
    client: String,
    clientName: String,
    clientPic: String,
    partner: String,
    partnerName: String,
    partnerPic: String,
    detail: [IndividualMessage]
}, {minimize: false});

var Message = module.exports = mongoose.model('Message', MessageSchema);