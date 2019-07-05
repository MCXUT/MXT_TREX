const mongoose = require("mongoose");

var paymentSchema = new mongoose.Schema({
    dateRequested: Date,
    dateReceived: Date,
    amount: {
        type: Number,
        default: 0.0
    },
    associatedPartner: mongoose.Schema.Types.ObjectId   //To be changed
});

var Payment = module.exports = mongoose.model("Payment", paymentSchema);
