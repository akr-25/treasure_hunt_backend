const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  rollNumber:{
    type: String,
    required:true,
  },
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
  fullName: {
    type: String,
    required: true,
  },
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
  ]
  
});

const users = mongoose.model("users", userSchema);
module.exports = users;
