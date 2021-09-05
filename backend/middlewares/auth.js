const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/user")

const createToken = function (_id, maxAge) {
    return jwt.sign({ _id }, "alcher login verifier", { expiresIn: maxAge });
};

const isLoggedin = function (req, res, next) {
    console.log(req.cookies)
    let token = req.cookies.user_acc;
    if (token) {
        jwt.verify(token, "alcher login verifier", async (err, decodedToken) => {
            if (err) {
                console.error(err);
                res.send("<script>alert('Please Login');  location.assign('/');</script>");
            } else {
                const user = await User.findById(decodedToken._id);
                res.locals.uId = user.uId;
                next();
            }
        });
    } else {
        res.send("<script>alert('Please Login');  location.assign('/');</script>");
        next();
    }
};

module.exports = {isLoggedin, createToken}