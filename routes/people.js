var express = require("express");
var router  = express.Router();


router.get('/', function(req, res){
	res.render("people");
});

router.get('/:id', function(req, res){ /*Detailed People Information*/
	res.render("people_detail");
});



module.exports = router;