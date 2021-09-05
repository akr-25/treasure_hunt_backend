const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../models/user.js')

router.route("/").post(userController.createUsers);
router.route("/users/1828860").get(userController.getAllUsers);
// router.route("/:rollNumber").get(userController.getUser);
router.post("/:uId",(req,res)=>{
    const {uId , password } = req.body;
    console.log(req.body, "logged")
    users.findOne({uId: uId}, (err,user)=>{
        console.log(user, password)
        if(user){
            if(password === user.password) {
                res.send({ message: "Login Succesful", user});
                console.log("dkasdas");
            }
            else {
                res.send({message: "Password incorrect"});
            }
        } else {
            res.send({message: "Roll number did not match"});
        }
    } )
    
})

module.exports = router;
