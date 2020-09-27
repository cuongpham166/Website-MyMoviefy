var express = require("express");
var router  = express.Router();
var movieController = require("../controller/controller.movie");
var middleware = require("../middleware/index")

router.get('/', movieController.getMoviePopular);

router.get("/toprated",movieController.getListTopRatedMovie);
router.get("/popular",movieController.getListPopularMovie);
router.get("/trending",movieController.getListTrendingMovie);


router.get('/:id', movieController.getMovieDetail);
router.get('/:id/review', movieController.getMovieReview);
router.get('/:id/crew', movieController.getMovieCrew);
router.get('/:id/trailer', movieController.getTrailer);
router.get('/:id/imdb',movieController.getImdb);
router.get('/:id/metacritic',movieController.getMetacritic);

router.get("/:id/collection/:collectID",movieController.getCollection);


router.post('/:id/favorite',middleware.isLoggedIn,movieController.postMovieFavorite)
router.get ('/:id/favorite',middleware.isLoggedIn,movieController.getMovieFavorite)

router.post('/:id/watchlist',middleware.isLoggedIn,movieController.postMovieWatchlist)
router.get('/:id/watchlist',middleware.isLoggedIn,movieController.getMovieWatchlist)

router.post('/:id/comment',middleware.isLoggedIn,movieController.postMovieComment)
router.get('/:id/comment',movieController.getMovieComment);

router.post('/:id/comment/:commentID/like',middleware.isLoggedIn,movieController.postMovieCommentLike)

router.get('/:id/comment/:commentID/like',movieController.getMovieCommentLike)

router.delete('/:id/comment/:commentID',middleware.checkCommentOwnership,movieController.deleteMovieComment)
router.put('/:id/comment/:commentID',middleware.checkCommentOwnership,movieController.editMovieComment)

module.exports = router;