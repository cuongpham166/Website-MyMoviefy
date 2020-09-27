var express = require("express");
var router  = express.Router();
var genreController = require("../controller/controller.genre"); 

router.get('/:id/movie', genreController.getGenreMovie);
router.get('/:id/tv', genreController.getGenreTV);

module.exports = router;