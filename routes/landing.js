const express = require("express");
const router = express.Router();

const Service = require("../models/Service");
const Question = require("../models/Question");

router.get("/", (req, res) => {
    Service.find({}, (err, allServices) => {
        if(err) throw err;
        Service.findById(allServices[0].id).populate("questionList").exec((err, detailService) => {
            if(err) throw err;
            console.log(detailService);
            return res.render("mainpage", {detailService: detailService});
        });
    });
});

module.exports = router;
