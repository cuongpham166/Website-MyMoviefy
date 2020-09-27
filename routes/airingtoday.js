var express = require("express");
var router  = express.Router();
var tvController = require("../controller/controller.tv");

router.get("/",tvController.getAiringToday);

module.exports = router;