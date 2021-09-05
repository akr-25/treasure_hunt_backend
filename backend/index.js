const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const InitiateMongoServer = require("./db");

const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require("body-parser");
const findOrCreate = require('mongoose-findorcreate');
const mongoose = require("mongoose")

InitiateMongoServer();
const userSchema = require("./models/userSchema")
// const checkIfAuthenticated = require("./authenticateToken");
const rootRouter = require("./router/rootRouter");
const healthRouter = require("./router/healthRouter");
const questionRouter = require("./router/questionRouter");
const userRouter = require("./router/userRouter");
const answerRouter = require("./router/asnwerRouter");
const leaderBoardRouter = require("./router/leaderBoard");

// module.exports.answers =["answer1", "answer2", "answer3", "answer4"]
const app = express();
app.use(morgan("common"));

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//   secret: "Our little secret.",
//   resave: false,
//   saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());


// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// app.post("/apilogin", function (req, res) {

//   const user = new User({
//     username: req.body.username,
//     password: req.body.password
//   });

//   req.login(user, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         return res.redirect("/");
//       });
//     }
//   });

// });

// app.post("/apisignup", function (req, res) {

//   User.register({ username: req.body.uId }, req.body.password, function (err, user) {
//     console.log(user)
//     if (err && !user) {
//       console.log(err);
//       res.redirect("/apisignup");
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         return res.redirect("/game1");
//       });
//     }
//   });

// });

// app.get("/apilogin", (req, res) => {
//   res.redirect("/home")
// })

// app.get("/apisignup", (req, res) => {
//   res.redirect("/home")
// })



app.use(cors())
var allowedOrigins = [
  "http://localhost:3000/home",
  "http://localhost:3000/"
  // ORIGIN_URLs
];
app.use(express.json());
// app.use(
//   cors(
//     {
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   }
//   )
// );
app.use(express.static('public'))

app.use("/signin", (req,res) => {
  res.render("signin.ejs")
})
app.use("/home", (req, res) => {
  res.render("home.ejs")
})
// app.use("/signin", (req, res) => {
//   res.render()
// })
app.use("/game1", (req, res) => {
  res.render("game1.ejs")
})
app.use("/game2", (req, res) => {
  res.render("game2.ejs")
})
app.use("/game3", (req, res) => {
  res.render("game3.ejs")
})
app.use("/game4", (req, res) => {
  res.render("game4.ejs")
})
app.use("/sixteen", (req, res) => {
  res.render("sixteen.ejs")
})
app.use("/mastermind", (req, res) => {
  res.render("mastermind.ejs")
})
app.use("/mysteryroom", (req, res) => {
  res.render("mysteryroom.ejs")
})
app.use("/crossword", (req, res) => {
  res.render("crossword.ejs")
})


app.use("/api/health", healthRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answer",  answerRouter);
app.use("/api/users", userRouter);
app.use("/api/leaderboard", leaderBoardRouter);
app.use("/api/*", rootRouter);

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
