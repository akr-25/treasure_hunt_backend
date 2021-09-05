const express = require("express")
const router = express.Router();
const User = require("../models/user")

router.route("/").post(async (req, res) => {
    const uId = res.locals.uId;
    await User.findOneAndUpdate({ uId: uId }, {
        mysteryroomScore: {
            answer: req.body.JSONanswer
        }
    })
    res.status(200).send("submitted")
});

module.exports = router;
