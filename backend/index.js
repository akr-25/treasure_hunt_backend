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

const app = express();

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

app.use(morgan("common"));


app.use("/health", healthRouter);
app.use("/questions", questionRouter);
app.use("/answer",  answerRouter);
app.use("/users", userRouter);
app.use("/leaderboard", leaderBoardRouter);
app.use("/*", rootRouter);

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
