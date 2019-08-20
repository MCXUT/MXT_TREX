const mongoose = require("mongoose");

var serviceSchema = mongoose.Schema({
    serviceCategory: String,
    serviceName: [String],
    questionList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    unit: [String]
});

var Service = module.exports = mongoose.model("Service", serviceSchema);
