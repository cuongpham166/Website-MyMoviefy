var express = require("express");
var router  = express.Router();
var listController = require("../controller/controller.list"); 
var middleware = require("../middleware/index")

router.post("/",middleware.isLoggedIn,listController.getList)
router.post("/new",middleware.isLoggedIn,listController.createList)
router.post("/movie",middleware.isLoggedIn,listController.addMovieList)
router.post("/tv",middleware.isLoggedIn,listController.addTVList)


module.exports = router;