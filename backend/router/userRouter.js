const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../models/user.js')
const {createToken} = require("../middlewares/auth");

// router.route("/").post(userController.createUsers);
router.route("/users/1828860").get(userController.getAllUsers);
router.route("/:rollNumber").get(userController.getUser);
router.post("/:uId",(req,res)=>{
    console.log(req.body, req.params, "logged")
    const {uId , password } = req.body;
    users.findOne({uId: uId}, (err,user)=>{
        console.log(user, password)
        if(user){
            if(password === user.password) {
                const token = createToken(user._id, 10*60*60);
                res.cookie("user_acc", token, {maxAge: 10*60*60*1000});
                res.redirect("/game1");
            }
            else {
                res.send({message: "Password incorrect"});
            }
        } else {
            res.send({message: "Roll number did not match"});
        }
    } )
    
})

// router.post("/xyz", (req , res)=>{
//     console.log(req.body)
//     res.send(req.body);
// })

module.exports = router;
