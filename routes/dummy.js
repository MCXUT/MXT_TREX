const express = require("express");
const Question = require("../models/Question");
const Service = require("../models/Service");
const async = require("async");

const router = express.Router();

router.get("/dummy", (req, res) => {
    Service.find({}, (err, allS) => {
        if(err) throw err;
        Service.findById(allS[0].id).populate("questionList").exec((err, aaa) => {
            res.json({aaa});
        });
    })
});

module.exports = router;
