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

// Set static directory
app.use("/static", express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
  res.render("mainpage");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(3000, function () {
  console.log("server opened");
});
