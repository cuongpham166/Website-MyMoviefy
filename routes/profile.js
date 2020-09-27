let express = require("express");
let router  = express.Router();
let middleware = require("../middleware/index")
let profileController = require("../controller/controller.profile");

router.get('/:userID', middleware.checkUserExist,profileController.getProfileHomepage);

router.get('/:userID/genre/:mediaType',middleware.checkUserExist,profileController.getAllFavoriteGenres);

router.get("/:userID/favorite",middleware.checkUserExist,profileController.getProfileFavoritePage);
router.post('/:userID/favorite',middleware.checkUserExist,profileController.findProfileFavorite);
router.post("/:userID/favorite/filter",middleware.checkUserExist,profileController.filterProfileFavorite);

router.get('/:userID/watchlist',middleware.checkUserExist,profileController.getProfileWatchlistPage);

router.post("/:userID/watchlist",middleware.checkUserExist,profileController.findProfileWatchlist);
router.post("/:userID/watchlist/filter",middleware.checkUserExist,profileController.filterProfileWatchlist);

router.get("/:userID/list",middleware.checkUserExist,profileController.getProfileList);

module.exports = router;