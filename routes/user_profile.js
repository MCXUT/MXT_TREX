const express = require("express");
const router = express.Router()

router.get("/user_profile", function(req,res){
  res.render("userprofile");
});

module.exports = router;