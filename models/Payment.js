const mongoose = require("mongoose");

var paymentSchema = new mongoose.Schema({
    dateRequested: Date,
    dateConfirmed: Date,
    amount: {
        type: Number,
        default: 0.0
    },
    requestedEmail: String,
    associatedPartner: mongoose.Schema.Types.ObjectId   //To be changed
});

var Payment = module.exports = mongoose.model("Payment", paymentSchema);
