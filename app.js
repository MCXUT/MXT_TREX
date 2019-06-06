const express = require("express");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");

const app = express();
const keys = require("./config/keys");

const registerRoutes = require("./routes/register");

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.engine("html", ejs.renderFile);

// Set bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(flash());

// mongoose.connect("mongodb+srv://mxt:1q2w3e4r!@cluster0-gdoa3.mongodb.net/TREX_Demo?retryWrites=true&w=majority");
// var db = mongoose.connection;

app.get('/', function(req,res){
  res.render("mainpage");
});

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

app.use('/auth', registerRoutes);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
    console.log("Server started on port " + app.get('port'));
});
