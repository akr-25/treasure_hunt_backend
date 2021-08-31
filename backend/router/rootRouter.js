const express = require("express");
const rootController = require("./../controllers/rootController");

const router = express.Router();

router.route("/").get(rootController.getRoot);

module.exports = router;
