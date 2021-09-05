const mongoose = require("mongoose");
const mastermindScoreSchema = require("./mastermind")
const sixteenScoreSchema = require("./sixteen");

const userSchema = new mongoose.Schema({
  // rollNumber:{
  //   type: String,
  //   required:true,
  // },
  password:{
    type: String,
  },
  uId: {
    type: String,
    unique: true,
    required: true,
  },
  highestLevelPlayed: {
    type: Number,
    default: 0,
  },
  // fullName: {
  //   type: String,
  //   required: true,
  // },
  lastAnsweredTime: {
    type: Date,
  },
  answers: [
    {
      level: Number,
      answer: String,
      time: Date,
    },
  ],
  puzzles: [
    {
      level: Number,
      totalScore:  Number,
    }
  ],
  mastermindScore: mastermindScoreSchema,
  sixteenScore: sixteenScoreSchema,
  crosswordScore: {
    submittedCrossword: String
  },
  mysteryroomScore: {
    answer: String
  }
});

const users = mongoose.model("users", userSchema);
module.exports = users;
