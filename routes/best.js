var express = require("express");
var router  = express.Router();
var bestController = require("../controller/controller.best");

router.get("/:service",bestController.getBestMovie);

module.exports = router;