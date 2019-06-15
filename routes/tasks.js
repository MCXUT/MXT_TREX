const express = require("express");
const router = express.Router();

//////// 업무 관련 routes /////////

router.get("/seetask", (req, res) => {
  res.render("seetask");
});

router.get("/city_list", (req, res) => {
  res.render("city");
});


module.exports = router;
