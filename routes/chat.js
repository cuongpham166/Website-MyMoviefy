var express = require("express");
var router  = express.Router();
var chatController = require("../controller/controller.chat");

router.get("/",chatController.getChat);
router.post("/",chatController.postChat);

module.exports = router;