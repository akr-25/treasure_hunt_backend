const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  email: {
    type: String,
    unique: true,
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
});

const users = mongoose.model("users", userSchema);
module.exports = users;
