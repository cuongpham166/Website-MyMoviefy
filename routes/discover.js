var express = require("express");
var router  = express.Router();
var dicoverController = require("../controller/controller.discover");

router.get("/",dicoverController.getMovieDiscover);
router.get("/movie",dicoverController.getMovieDiscover);
router.post("/movie",dicoverController.postMovieDiscover);

router.get("/tv",dicoverController.getTvDiscover);
router.post("/tv",dicoverController.postTvDiscover);

module.exports = router;