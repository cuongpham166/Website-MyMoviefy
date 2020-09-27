var express = require("express");
var router  = express.Router();
var movieController = require("../controller/controller.movie");

router.get('/', movieController.getNowPlaying);


module.exports = router;