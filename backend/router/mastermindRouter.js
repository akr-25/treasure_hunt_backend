const express = require("express")
const router = express.Router();
const User = require("../models/user")

router.route("/").post( async (req, res) => {
    const uId = res.locals.uId;
    console.log(uId);
    const user = await User.findOne({ uId: uId })
    if (user.mastermind === false || user.mastermind === null) {
    await User.findOneAndUpdate({uId:uId}, {
        mastermindScore: {
            score: req.body.mastermind_solver
        },
        mastermind = true
    })
    }
    res.status(200).send("submitted")
}); 

module.exports = router;
