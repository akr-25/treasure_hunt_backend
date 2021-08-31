const express = require("express");
const leaderBoardController = require("../controllers/leaderController");

const router = express.Router();

router.route("/").get(leaderBoardController.getLeaderBoard);

module.exports = router;
