const express = require("express");
const router = express.Router();

//////// 고객센터 관련 routes /////////

router.get("/faq", (req, res) => {
    res.redirect("client_faq");
});

router.get("/client_faq", (req, res) => {
    res.render("clientfaq");
});

router.get("/partner_faq", (req, res) => {
    res.render("partnerfaq");
});

router.get("/refund", (req, res) => {
    res.render("refund");
});

module.exports = router;
