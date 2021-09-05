const express = require("express")
const router = express.Router();
const User = require("../models/user")


router.post("/", async (req, res) => {
    const uId = res.locals.uId;
    const user = await User.findOne({ uId: uId })
    if (user.sixteen === false || user.sixteen === null) {
        await User.findOneAndUpdate({ uId: uId }, {
            sixteenScore: {
                moves: req.body.submitBtn,
                min: req.body.hidInputOne,
                sec: req.body.hidInputTwo,
                correctmatches: req.body.hidInputThree
            },
            sixteen: true
        })
    }
    res.redirect("/game3");
});


module.exports = router;
