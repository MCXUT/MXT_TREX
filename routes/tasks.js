const express = require("express");
const router = express.Router();

const keys = require("../config/keys");

//////// 업무 관련 routes /////////

router.get("/seetask", (req, res) => {
  res.render("seetask");
});

router.get("/city_list", (req, res) => {
  res.render("citylist");
});

router.get("/find_task", (req, res) => {
  res.render("findtask", { googleMapAPI: keys.googleMapAPI.key });
});

module.exports = router;
