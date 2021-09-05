const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sixteenScoreSchema = new Schema({
    moves: Number,
    min: Number,
    sec: Number,
    correctmatches: Number
}, { timestamps: true });

module.exports = sixteenScoreSchema;

//const mastermindScore = mongoose.model('mastermindScore', mastermindScoreSchema);

// module.exports = mastermindScore;