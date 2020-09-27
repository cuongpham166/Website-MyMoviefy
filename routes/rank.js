var express = require("express");
var router  = express.Router();
var rankController = require("../controller/controller.rank"); 

router.get("/imdb",rankController.getImdbRank);
router.get('/imdb/movie/top-rated', rankController.getImdbTopMovie);
router.get('/imdb/movie/popular',rankController.getImdbPopularMovie);
router.get("/imdb/movie/lowest-rated",rankController.getImdbLowestMovie);
router.get("/imdb/tv/top-rated",rankController.getImdbTopTv)
router.get("/imdb/tv/popular",rankController.getImdbPopularTv)

router.get("/rotten-tomatoes",rankController.getRottenTomatoes);
router.get("/rotten-tomatoes/:year",rankController.getRottenTomatoesByYear);

router.get("/metacritic",rankController.getMetacritic);

module.exports = router;