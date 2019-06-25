const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var IndividualMessage = mongoose.Schema({
    content: String,
    author: String, // "c" or "p"
    time: String
});

var IndividualMessage = module.exports = mongoose.model('IndividualMessage', IndividualMessage);