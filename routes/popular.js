var express = require("express");
var router  = express.Router();
var tvController = require("../controller/controller.tv");
var movieController = require("../controller/controller.movie");

router.get('/', tvController.getPopular);
router.get('/movie', movieController.getMoviePopular);
router.get('/tv', tvController.getTVPopular);

module.exports = router;