const express = require("express");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
mongoose.Promise = global.Promise;
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");


const lcPassport = require("./config/passportStrategies/localClient");
const lpPassport = require("./config/passportStrategies/localPartner");
const tcPassport = require("./config/passportStrategies/thirdPartyClient");
const tpPassport = require("./config/passportStrategies/thirdPartyPartner");

const app = express();
const keys = require("./config/keys");

const clientRegisterRoutes = require("./routes/register/registerClient");
const partnerRegisterRoutes = require("./routes/register/registerPartner");
const loginRoutes = require("./routes/login/login");
const clientLoginRoutes = require("./routes/login/loginClient");
const partnerLoginRoutes = require("./routes/login/loginPartner");
const clientPwResetRoutes = require("./routes/passwordReset/passwordResetClient");
const partnerPwResetRoutes = require("./routes/passwordReset/passwordResetPartner");

const partnerPages = require("./routes/partnerpages");
const userProfile = require("./routes/user_profile");
const servicePages = require("./routes/service");
const taskRoutes = require("./routes/tasks");
const profilePicRoutes = require("./routes/profilePic");

// Connect to mongodb
mongoose.connect("mongodb+srv://" + keys.mongodb2.user + ":" + keys.mongodb2.pass + "@cluster0-vnpud.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true});
const db = mongoose.connection;

// Set view engines
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.engine("html", ejs.renderFile);

// Set bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(methodOverride("_method"));

// session setting
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}));

// passport setting
app.use(lcPassport.initialize());
app.use(lcPassport.session());
app.use(lpPassport.initialize());
app.use(lpPassport.session());
app.use(tcPassport.initialize());
app.use(tcPassport.session());
app.use(tpPassport.initialize());
app.use(tpPassport.session());


app.use(flash());
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.fail = req.flash("fail");
  // res.locals.error_code = req.flash("error_code");
  res.locals.currentUser = req.user;
  // res.locals.email = req.body.email;
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

app.use('/auth', clientRegisterRoutes);
app.use('/auth', partnerRegisterRoutes);
app.use('/auth', loginRoutes);
app.use('/auth', clientLoginRoutes);
app.use('/auth', partnerLoginRoutes);
app.use("/auth", clientPwResetRoutes);
app.use("/auth", partnerPwResetRoutes);
app.use('/', partnerPages);
app.use("/", userProfile);
app.use("/", servicePages);
app.use("/", taskRoutes);
app.use("/", profilePicRoutes);


app.set('port', process.env.PORT || 8080);



app.listen(app.get('port'), () => {
    console.log("Server started on port " + app.get('port'));
});
