const express = require("express"),
      moment = require("moment");
const router = express.Router();
const async = require("async");

const Service = require("../models/Service");
const Question = require("../models/Question");
const Task = require("../models/Task");

router.get("/", (req, res) => {
    var allInfos = [];
    Service.find({}, (err, allServices) => {
        if(err) throw err;
        async.each(allServices, function(service, done) {
            Service.findById(service.id).populate("questionList").exec((err, detailService) => {
                if(err) throw err;
                if(detailService.questionList) {
                    allInfos.push(detailService);
                } else {
                    Service.findByIdAndRemove(service.id).then(function(deleted) {
                        console.log(deleted);
                    });
                }
                done();
            });
        }, function(err) {
            if(err) throw err;
            return res.render("mainpage", {detailService: allInfos});
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
