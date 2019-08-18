const mongoose = require("mongoose");

var taskSchema = mongoose.Schema({
    servkind: String,
    location: String,
    // daterange: Date,
    startdate: String,
    enddate: String,
    taskfield: [String],
    numrequired: Number,
    related: [String],
    details: String,
    estimate: Number
});

var Task = module.exports = mongoose.model("Task", taskSchema);
