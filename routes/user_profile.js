const express = require("express");
const router = express.Router()

router.get("/user_profile", (req, res) => {
    var info = {
        gender: "남자",
        area: "몬트리올",
        availability: "타지역 업무 가능",
        job: "직장",
        major: "회계/금융"
    };
    res.render("userprofile", {info: info, langinfo: {
        langchoice: [],
        langproficiency: []
    }});
});

router.post("/user_profile", (req, res) => {
    var newinfo = req.body;
    // console.log(newinfo);
    res.render("userprofile", {info: newinfo, langinfo: {}});
});

router.post("/user_profile/language", (req, res) => {

    var newinfo = {
        langchoice: req.body.langchoice,
        langproficiency: req.body.langproficiency
    }
    console.log(newinfo);

    res.render("userprofile", {info: {}, langinfo: newinfo});
})

module.exports = router;
