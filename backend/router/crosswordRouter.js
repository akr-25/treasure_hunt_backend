const express = require("express")
const router = express.Router();
const User = require("../models/user")

router.route("/").post(async (req, res) => {
    const uId = res.locals.uId;
    const user = await User.findOne({ uId: uId })
    if (user.crossword === false || user.crossword === null) {
    await User.findOneAndUpdate({ uId: uId }, {
        crosswordScore: {
            submittedCrossword: req.body.submittedCrossword
        },
        crossword: true,
    })
    }
    res.status(200).send("submitted")
});

module.exports = router;
