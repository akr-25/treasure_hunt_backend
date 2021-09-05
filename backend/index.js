const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const InitiateMongoServer = require("./db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require("body-parser");
const findOrCreate = require('mongoose-findorcreate');
const mongoose = require("mongoose")

InitiateMongoServer();
const userSchema = require("./models/userSchema")
// const checkIfAuthenticated = require("./authenticateToken");
const mysteryroomRouter = require("./router/mysteryroomRouter");
const rootRouter = require("./router/rootRouter");
const questionRouter = require("./router/questionRouter");
const healthRouter = require("./router/healthRouter");
const userRouter = require("./router/userRouter");
const answerRouter = require("./router/asnwerRouter");
const leaderBoardRouter = require("./router/leaderBoard");
const mastermindRoute = require("./router/mastermindRouter")
const sixteenRouter = require("./router/sixteenRouter")
const crosswordRouter = require("./router/crosswordRouter")
const { isLoggedin } = require("./middlewares/auth");

// module.exports.answers =["answer1", "answer2", "answer3", "answer4"]
const app = express();

app.use("*", (req, res, next) => {
  console.log(req.body)
  next()
})

app.use(morgan("common"));

app.use(cors())
var allowedOrigins = [
  "http://localhost:3000/home",
  "http://localhost:3000/"
  // ORIGIN_URLs
];

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())
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

app.use("/signin", (req, res) => {
  res.render("signin.ejs")
})
app.use("/home", (req, res) => {
  res.render("home.ejs")
})
// app.use("/signin", (req, res) => {
//   res.render()
// })
app.use("/game1", isLoggedin, (req, res) => {
  res.render("game1.ejs")
})
app.use("/game2", isLoggedin, (req, res) => {
  res.render("game2.ejs")
})
app.use("/game3", isLoggedin, (req, res) => {
  res.render("game3.ejs")
})
app.use("/game4", isLoggedin, (req, res) => {
  res.render("game4.ejs")
})
app.use("/sixteen", isLoggedin, (req, res) => {
  res.render("sixteen.ejs")
})
app.use("/mastermind", isLoggedin, (req, res) => {
  res.render("mastermind.ejs")
})
app.use("/mysteryroom", isLoggedin, (req, res) => {
  res.render("mysteryroom.ejs")
})
app.use("/crossword", isLoggedin, (req, res) => {
  res.render("crossword.ejs")
})
app.use("/final", isLoggedin, (req, res) => {
  res.render("final.ejs")
})




app.use("/api/health", isLoggedin, healthRouter);
app.use("/api/questions", isLoggedin, questionRouter);
app.use("/api/answer", isLoggedin, answerRouter);
app.use("/api/users", isLoggedin, userRouter);
app.use("/api/leaderboard", isLoggedin, leaderBoardRouter);
app.use("/api/mastermind", isLoggedin, mastermindRoute)
app.use("/api/sixteen", isLoggedin, sixteenRouter)
app.use("/api/crossword", isLoggedin, crosswordRouter)
app.use("/api/mysteryroom", isLoggedin, mysteryroomRouter)
app.use("/api/*", rootRouter);

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
