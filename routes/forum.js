var express = require("express");
var router  = express.Router();
var forumController = require("../controller/controller.forum");
var middleware = require("../middleware/index")

router.get("/",forumController.getTopic); //Get all topic in forum
router.get("/topic",forumController.getTopic);
router.get("/topic/info",forumController.getDetailForum);
router.get("/topic/new",middleware.isLoggedIn,forumController.getNewTopic); // Get topic form to create
router.get("/topic/:topicID/edit",middleware.checkTopicOwnership,forumController.getEditTopic); // Get topic form to edit
router.post("/topic",middleware.isLoggedIn,forumController.postTopic);

router.get("/topic/:topicID",middleware.isLoggedIn,forumController.getTopicDetail);

router.put("/topic/:topicID",middleware.checkTopicOwnership,forumController.putTopic);
router.delete("/topic/:topicID",middleware.checkTopicOwnership,forumController.deleteTopic);
router.post("/topic/:topicID/like",middleware.isLoggedIn,forumController.postTopicLike);
router.post("/topic/:topicID/follow",middleware.isLoggedIn,forumController.postTopicFollow);

router.get("/topic/:topicID/post",forumController.getTopicPost);

router.get("/topic/:topicID/post/info",forumController.getDetailTopicInfo);
router.get("/topic/:topicID/post/followers",forumController.getFollowersByTopic)

router.get("/topic/:topicID/post/detail",forumController.getTopicPostDetail);

router.post("/topic/:topicID/post",middleware.isLoggedIn,forumController.postTopicPost);



router.get("/topic/all",forumController.getAllTopic);
router.get("/topic/all/follow",middleware.isLoggedIn,forumController.getAllFollowByUser);

/*
router.get("/topic/:topicID",forumController.getDetailTopic);
router.put("/topic/:id",forumController.putTopic);

router.post("/topic/:id/like",forumController.postTopicLike);


router.get("/topic/:id/post",forumController.getTopicPost);
router.post("/topic/:id/post",forumController.postTopicPost);
router.post("/topic/:id/post/:postID/like",forumController.postTopicPostLike);
router.put("/topic/:id/post/:postID/like",forumController.putTopicPostLike);
*/

module.exports = router;