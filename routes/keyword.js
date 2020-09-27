var express = require("express");
var router  = express.Router();
var keywordController = require("../controller/controller.keyword"); 

router.get('/:id/movie', keywordController.getKeywordMovie);
router.get('/:id/tv', keywordController.getKeywordTV);

module.exports = router;