var express = require("express");
var router  = express.Router();
var searchController = require("../controller/controller.search");

router.get('/:query', searchController.getSearch);


module.exports = router;