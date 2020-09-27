var express = require("express");
var router  = express.Router();
var tvController = require("../controller/controller.tv");
var movieController = require("../controller/controller.movie");

router.get('/', tvController.getTopRated);
router.get('/movie', movieController.getMovieTopRated);
router.get('/tv',tvController.getTVTopRated);

module.exports = router;