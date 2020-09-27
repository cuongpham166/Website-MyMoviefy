var express = require("express");
var router  = express.Router();
var newsController = require("../controller/controller.news");
router.get("/",newsController.getNews);
router.get("/top",newsController.getTopNews);
router.get("/movie",newsController.getMovieNews);
router.get("/tv",newsController.getTVNews);
router.get("/headlines",newsController.getHeadlines);
router.get("/roundup",newsController.getRoundup);
router.get("/weekly-roundup",newsController.getWeeklyRoundup);
router.get("/box-office",newsController.getBoxOffice);

module.exports = router;