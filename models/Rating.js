const mongoose = require("mongoose");

var rateSchema = new mongoose.Schema({
    star: Number,
    comment: String,
    date: String,
    byUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client' //To be changed to Client later
    }
});

var Rating = module.exports = mongoose.model("Rating", rateSchema);
