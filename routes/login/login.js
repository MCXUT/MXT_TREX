const express = require("express");
const router = express.Router();

router.get("/login", function(req,res){
    if (req.user) {
        return res.redirect("/");
    } else {
        return res.render("login", { referer: req.headers.referer });
    }
});


router.get("/logout", function(req,res) {
  req.logout();
  res.redirect("back");
});

module.exports = router;
