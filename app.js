const express = require("express");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");

const keys = require("./config/keys");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.engine("html", ejs.renderFile);

app.get('/', function(req,res){
  res.render("mainpage.html")
});

app.listen(3000, function () {
  console.log("server opened");
});
