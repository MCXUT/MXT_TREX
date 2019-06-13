const express = require("express");
const router = express.Router()

const keys = require("../config/keys");
const passport = require("../config/passport");
const Client = require("../models/Client");
const Partner = require("../models/Client");

router.get("/reset", function(req,res){
  res.render("password_reset");
})

module.exports = router;
