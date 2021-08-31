const express = require("express");
const questionController = require("../controllers/questionController");
const router = express.Router();

router
  .route("/")
  .get(questionController.getAllQuestions)
  .post(questionController.createQuestions);

router.route("/:uId").get(questionController.getQuestion);
router.route("/qs/:level").get(questionController.getQuestionBasedOnLevel);

module.exports = router;
