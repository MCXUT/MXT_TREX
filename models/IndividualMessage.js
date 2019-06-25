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
    }
});

var IndividualMessage = module.exports = mongoose.model('IndividualMessage', IndividualMessage);