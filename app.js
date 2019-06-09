const express = require("express");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
mongoose.Promise = global.Promise;
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");


const passport = require("./config/passport");
const app = express();
const keys = require("./config/keys");

const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const partnerPages = require("./routes/partnerpages");

// Connect to mongodb
mongoose.connect("mongodb+srv://" + keys.mongodb.user + ":" + keys.mongodb.pass + "@cluster0-vnpud.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true});
const db = mongoose.connection;

// Set view engines
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.engine("html", ejs.renderFile);

// Set bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


// session setting
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}));

// passport setting
app.use(passport.initialize());
app.use(passport.session());


// app.use(flash());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;

    next();
});


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

// app.get("/login", (req, res) => {
//   res.render("login");
// });

app.use('/auth', registerRoutes);
app.use('/auth', loginRoutes);
app.use('/', partnerPages);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
    console.log("Server started on port " + app.get('port'));
});
