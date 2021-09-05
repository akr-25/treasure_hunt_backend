const express = require("express")
const router = express.Router();
const User = require("../models/user")


router.post("/", async (req, res) => {
    const uId = res.locals.uId;
    await User.findOneAndUpdate({uId:uId} , {
        sixteenScore:{
            moves: req.body.submitBtn,
            min: req.body.hidInputOne,
            sec: req.body.hidInputTwo,
            correctmatches: req.body.hidInputThree
        }
    })
    res.redirect("/game3");
});


module.exports = router;
