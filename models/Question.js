const mongoose = require("mongoose");

var questionSchema = mongoose.Schema({
    type: String,
    questionName: String,
    options: [String],
    seed: String,
    identifier: String
});

var Question = module.exports = mongoose.model("Question", questionSchema);
