const express = require("express");
const router = express.Router();

const keys = require("../config/keys");
const Task = require("../models/Task");


//////// 업무 관련 routes /////////

router.get("/seetask", (req, res) => {
    res.render("seetask");
});

router.get("/city_list", (req, res) => {
    res.render("citylist");
});

router.get("/find_task", (req, res) => {
    if (!req.user) {
        return res.render("login", { referer: req.headers.referer });
    } else if (req.user.type !== "p") {
        return res.redirect("/");
    } else {
        Task.find({}, (err, allTasks) => {
            if (err) {
                console.log(err);
                req.flash("error", "업무 목록을 불러오는데 문제가 발생했습니다. 다시 시도해주세요.");
                return res.redirect("/");
            }
            
            res.render("findtask", { googleMapAPI: keys.googleMapAPI.key , allTasks: allTasks });
        });
    }
});

module.exports = router;
