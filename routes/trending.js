var express = require("express");
var router  = express.Router();
var tvController = require("../controller/controller.tv");
var movieController = require("../controller/controller.movie");

router.get('/', tvController.getTrending);
router.get('/movie',movieController.getMovieTrending);
router.get('/tv',tvController.getTVTrending);

module.exports = router;