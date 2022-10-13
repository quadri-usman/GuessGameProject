var express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  flash = require("connect-flash"),
  User = require("./models/user"),
  Message = require("./models/contact"),
  bodyParser = require("body-parser"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
const connectDB = require("./servers");
connectDB();

var app = express();
// var port = 1980;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(flash());
app.use(
  require("express-session")({
    secret: "Welcome",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.welcome = req.flash("welcome");
  next();
});

// ===============
// ROUTES
// ===============

app.get("/", function (req, res) {
  res.render("home", { currentUser: req.user });
  // res.send("<h1>You are Welcome!!!</h1><h2>You are Welcome!!!</h2>")
});
app.get("/game", isLoggedIn, (req, res) => {
  res.render("game");
});
app.get("/register", function (req, res) {
  res.render("SignUp");
});
app.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        req.flash("error", "Username already exists");
        return res.render("SignUp");
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("welcome", "Welcome " + req.body.username);
        res.redirect("/");
      });
    }
  );
});
app.get("/login", function (req, res) {
  res.render("Login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "You login successfully");
  }
);
app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    req.flash("success", "You logged out, please login in again");
    res.redirect("/login");
  });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First");
  res.redirect("/login");
}
app.get("/contacts", isLoggedIn, function (req, res) {
  res.render("contacts");
});
app.post("/contacts", (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) {
      sendStatus(500);
      console.log(err);
    } else
      req.flash(
        "success",
        "Hi " + req.body.names + ", Thanks for contacting us"
      );
    res.redirect("secret");
  });
});
app.get("/secret", (req, res) => {
  res.render("secret");
});
app.get("*", function (req, res) {
  res.send("Page not found");
  // res.send("<h1>You are Welcome!!!</h1><h2>You are Welcome!!!</h2>")
});

app.listen("9000", () => {
  console.log("Server on 9000");
});
// app.listen(port, function(){
//     console.log("Server is running at http://127.0.0.1:%s", port)
// });
