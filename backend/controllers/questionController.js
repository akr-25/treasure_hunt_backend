const mongoose = require("mongoose");
const users = require("../models/user");
const questions = require("../models/question");

exports.getAllQuestions = async function (req, res) {
  try {
    const allQuestions = await questions.find();
    res
      .status(200)
      .json({ status: res.statusCode, message: "OK", data: allQuestions });
  } catch {
    res.status(404).json({ status: "fail", message: err });
  }
};

exports.getQuestion = async function (req, res) {
  await users
    .findOne({ uId: req.params.uId })
    .select({ uId: 1, highestLevelPlayed: 1 })
    .exec(async (error, result) => {
      if (error)
        return res.json({ status: 500, message: "Error", result: error }).end();
      if (result == null)
        return res
          .json({ status: 404, message: "No data found", result: null })
          .end();
      else {
        console.log(result, "success");
        await questions
          .findOne({ level: result.highestLevelPlayed + 1 })
          .select({ level: 1, question: 1, image: 1 })
          .exec(async (error, result) => {
            if (error)
              return res
                .json({ status: 500, message: "Error", result: error })
                .end();
            if (result == null)
              return res
                .json({
                  status: 404,
                  message: "Question not found",
                  result: {
                    isQuestionFount: false,
                  },
                })
                .end();
            return res
              .json({
                status: 200,
                message: "Ok",
                result: {
                  result: result,
                  isQuestionFount: true,
                },
              })

              .end();
          });
      }
    });
};

exports.getQuestionBasedOnLevel = (req, res) => {
  questions
    .findOne({ level: req.params.level })
    .select("-answer -__v")
    .exec((error, result) => {
      if (error)
        return res.json({ status: 500, message: "Error", result: error }).end();
      if (result == null)
        return res
          .json({ status: 404, message: "No data found", result: null })
          .end();
      return res.json({ status: 200, message: "Ok", result: result }).end();
    });
};

exports.createQuestions = async function (req, res) {
  try {
    const newQuestion = await questions.create(req.body);
    res
      .status(200)
      .json({ status: res.statusCode, message: "OK", data: newQuestion });
  } catch {
    res.status(404).json({ status: "fail", message: err });
  }
};
