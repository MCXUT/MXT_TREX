const express = require("express"),
      moment = require("moment");
const router = express.Router();

const Service = require("../models/Service");
const Question = require("../models/Question");
const Task = require("../models/Task");

router.get("/", (req, res) => {
    Service.find({}, (err, allServices) => {
        if(err) throw err;
        Service.findById(allServices[0].id).populate("questionList").exec((err, detailService) => {
            if(err) throw err;
            return res.render("mainpage", {detailService: detailService});
        });
    });
});

router.post("/task_request", (req, res) => {
    req.body.numrequired = parseInt(req.body.numrequired.split("")[0]);
    console.log(typeof req.body.numrequired);
    var newTask = new Task(req.body);
    newTask.save((err) => {
        if(err) throw err;
        else {
            return res.redirect("/");
        }
    });
});

module.exports = router;
