const express = require("express");
const answerController = require("../controllers/answerController");
const router = express.Router();

router.route("/:qsId/:uId").post(answerController.checkAnswer);

module.exports = router;
