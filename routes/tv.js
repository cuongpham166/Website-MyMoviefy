var express = require("express");
var router  = express.Router();
var tvController = require("../controller/controller.tv");
var middleware = require("../middleware/index")

router.get('/', tvController.getTVPopular);

router.get("/toprated",tvController.getListTopRatedTV);
router.get("/popular",tvController.getListPopularTV);
router.get("/trending",tvController.getListTrendingTV);

router.get('/:id', tvController.getTVDetail);
router.get('/:id/review', tvController.getTVReview);
router.get('/:id/crew', tvController.getTVCrew);
router.get('/:id/seasons', tvController.getTVSeason);
router.get('/:id/trailer', tvController.getTrailer);
router.get('/:id/seasons/:id1', tvController.getSeasonDetail);

router.post('/:id/favorite',middleware.isLoggedIn,tvController.postTVFavorite)
router.get ('/:id/favorite',middleware.isLoggedIn,tvController.getTVFavorite)

router.post('/:id/watchlist',middleware.isLoggedIn,tvController.postTVWatchlist)
router.get('/:id/watchlist',middleware.isLoggedIn,tvController.getTVWatchlist)

module.exports = router;