const mongoose = require("mongoose");
const mastermindScoreSchema = require("./mastermind")

const userSchema = new mongoose.Schema({
    // rollNumber:{
    //   type: String,
    //   required:true,
    // },
    password: {
        type: String,
    },
    username: {
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
            totalScore: Number,
        }
    ],
    // mastermindScore: mastermindScoreSchema
});

module.exports = userSchema;
