const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/").post(userController.createUsers);
router.route("/users/1828860").get(userController.getAllUsers);
router.route("/:uid").get(userController.getUser);

module.exports = router;
