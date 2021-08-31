const express = require("express");
const mongoose = require("mongoose");
const users = require("../models/user");
const questions = require("../models/question");
const { default: validator } = require("validator");

exports.checkAnswer = async (req, res) => {
  const uId = req.params.uId;
  const qsId = req.params.qsId;
  const answer = req.body.answer;
  const date = new Date();

  if (uId == null || qsId == null) {
    return res
      .json({
        status: 400,
        message: "Uid and Question Id is required",
        result: null,
      })
      .end();
  } else {
    questions.findById(qsId).exec((error, result) => {
      if (result == null)
        res
          .json({
            status: 400,
            message: "Couldn't find the question ",
            result: null,
          })
          .end();
      else {
        if (
          validator.equals(
            validator.trim(result.answer).toLocaleLowerCase(),
            validator.trim(answer).toLocaleLowerCase()
          )
        ) {
          users.findOneAndUpdate(
            { uId: uId },
            {
              highestLevelPlayed: result.level,
              lastAnsweredTime: date,
              $push: {
                answers: {
                  level: result.level,
                  answer: result.answer,
                  time: date,
                },
              },
            },
            { useFindAndModify: false },

            (err, updateResult) => {
              if (err)
                return res
                  .json({
                    status: 500,
                    message: "Server Error",
                    result: error,
                  })
                  .end();
              else
                res.status(200).json({
                  status: res.statusCode,
                  message: "Correct answer",
                  result: {
                    message: `User Completed level ${result.level}`,
                    isAnswerCorrect: true,
                  },
                });
            }
          );
        } else {
          res.json({
            status: 400,
            message: "Wrong answer",
            result: {
              message: "Please check your answer",
              isAnswerCorrect: false,
            },
          });
        }
      }
    });
  }
};
