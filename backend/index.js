const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const InitiateMongoServer = require("./db");

InitiateMongoServer();

// const checkIfAuthenticated = require("./authenticateToken");
const rootRouter = require("./router/rootRouter");
const healthRouter = require("./router/healthRouter");
const questionRouter = require("./router/questionRouter");
const userRouter = require("./router/userRouter");
const answerRouter = require("./router/asnwerRouter");
const leaderBoardRouter = require("./router/leaderBoard");

const answer=["answer1", "answer2", "answer3", "answer4"]

const app = express();
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
app.use(morgan("common"));

app.use("/home", (req,res) => {
  res.render("signin.ejs")
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
