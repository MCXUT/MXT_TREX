const mongoose = require("mongoose");

var paymentSchema = new mongoose.Schema({
    dateRequested: Date,
    dateReceived: Date,
    amount: {
        type: Number,
        default: 0.0
    }
});

var Payment = module.exports = mongoose.model("Payment", paymentSchema);
