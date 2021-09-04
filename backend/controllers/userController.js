const mongoose = require("mongoose");
const users = require("../models/user");

exports.getAllUsers = async function (req, res) {
  try {
    const allUsers = await users.find().select(" -__v");
    res.status(200).json({
      status: res.statusCode,
      message: "OK",
      data: allUsers,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error,
    });
  }
};

exports.getUser = async function (req, res) {
  await users
    .findOne({ rollNumber: req.params.rollNumber },(err, user)=>{
      if(user){
        if(user.password === req.body.password){
          res.send({message: "Login Successful", user: user});
        }
        else {
          res.send({message:"Password did not match"});
        }
      } else {
          res.send({message: "Roll Number did not match"});
      }
    })
    .select({
      uId: 1,
      fullName: 1,
      highestLevelPlayed: 1,
      email: 1,
    })
    .exec((error, result) => {
      if (error)
        return res
          .json({
            status: 500,
            message: "Error",
            result: error,
          })
          .end();
      if (result == null)
        return res
          .json({
            status: 404,
            message: "No data found",
            result: null,
          })
          .end();

      return res
        .json({
          status: 200,
          message: "Ok",
          result: result,
        })
        .end();
    });
};

exports.createUsers = async function (req, res) {
  console.log(req)
  try {
    users.findOne({ uId: req.body.uId }).exec(async (error, result) => {
      if (error)
        return res
          .json({
            status: 500,
            message: "Error",
            result: error,
          })
          .end();
      if (result == null) {
        const newUser = await users.create(req.body);
        res.status(200).json({
          status: res.statusCode,
          message: "User sucessfully registered",
          result: newUser,
        });
      } else {
        return res
          .json({
            status: 400,
            message: "User already registered",
            result: null,
          })
          .end();
      }
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error,
    });
  }
};
