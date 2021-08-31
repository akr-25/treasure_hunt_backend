const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  level: Number,
  question: String,
  image: String,
  answer: String,
});

const questions = mongoose.model("questions", questionSchema);
module.exports = questions;
