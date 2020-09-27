var moment = require('moment');
var User = require ("../models/user");
var Log = require("../models/log");
var Topic = require("../models/topic");
var Post = require("../models/post");
var Pusher = require('pusher'),
	pusher = new Pusher({
		appId:process.env.pusher_app_id,
		key:process.env.pusher_key,
		secret:process.env.pusher_secret,
		cluster:process.env.pusher_cluster,
		encrypted:true
	});

module.exports.getTopic = async (req,res) =>{
	try{
		let topicData = await getDetailInfoForum()
		let foundTopic = await Topic.find({}).sort({date: 'desc'}).populate('post')
		res.render("forum/forum",{topic:foundTopic,moment:moment,topicData:topicData});		
	}
	catch(error){
		console.log(error);
		res.redirect("back");
	}

}

module.exports.getTopicDetail = async (req,res) =>{
	let topicID = req.params.topicID;
	try{
		let foundTopic = await Topic.find({_id:topicID}).populate('post');
		res.send(foundTopic);
	}
	catch(error){
		return error
	}
}

module.exports.getNewTopic = (req,res) =>{
	res.render("forum/new");
}


module.exports.getEditTopic = async (req,res) =>{
	try{
		let foundTopic = await Topic.findById(req.params.topicID)
		res.render("forum/edit",{topic:foundTopic});
	}
	catch(err){
		console.log(err);
		res.render("back");
	}
	

}

module.exports.getAllTopic = async (req,res) =>{
	try{
		let foundTopic = await Topic.find({}).sort({date: 'desc'}).populate('post')
		res.send(foundTopic);		
	}
	catch(error){
		console.log(error);
		res.redirect("back");
	}

}

module.exports.getAllFollowByUser = async (req,res) =>{
	let currentUserID = req.user._id;
	try{
		let foundUser = await User.findById(currentUserID).exec()
		res.send(foundUser)
	}
	catch(error){
		return error
	}
}

module.exports.postTopic =  async (req,res) => {
	let currentUserID = req.user._id;
	let username = req.user.username;
	let name = req.body.topic.name;
	let subforum = req.body.topic.subforum;
	let categorie = req.body.topic.categorie;

	try {
		var newTopic = new Topic({
			title:name,
			date:Date.now(),
			author:{
				id:currentUserID,
				username:username
			},
			subforum:subforum,
			categorie:categorie
		})

		let saveTopic = await newTopic.save()
		res.redirect("/forum/topic");
	}
	catch(error){
		console.log(error)
	}

}

module.exports.putTopic = async (req,res) =>{
	var topicID = req.params.topicID;
	var currentUserID = req.user._id;
	var name = req.body.topic.name;
	var subforum = req.body.topic.subforum;
	var categorie = req.body.topic.categorie;	

	try {
		let updateTopic = await Topic.findOneAndUpdate({_id:topicID},{$set:{title:name,date:Date.now(),subforum:subforum,categorie:categorie}},{new: true}).exec();
		res.redirect("/forum/topic")							
	}
	catch(err){
		console.log(err);
	}
}

module.exports.deleteTopic = async (req,res) =>{
	var topicID = req.params.topicID;
	try{
		let foundUser = await User.find({})
		for (var i=0;i<foundUser.length;i++){
			var checkTopic = (foundUser[i].topic).includes(topicID);
			if(checkTopic){
				(foundUser[i].topic).pull(topicID)
				foundUser[i].save();				
			}
			await Post.deleteMany({topic:topicID}).exec();
			await Topic.findOneAndDelete({_id:topicID}).exec();
		}
	}
	catch(err){
		console.log(err)
	}
}



module.exports.postTopicLike = async (req,res) =>{
	var topicID = req.params.topicID;
	var currentUserID = req.user._id;
	let channelName = "post_"+topicID;
	try{
		let foundTopic = await Topic.findById(topicID)
		var checkLike = (foundTopic.like).includes(currentUserID);
		if(checkLike){
			(foundTopic.like).pull(currentUserID);
		}else{
			(foundTopic.like).push(currentUserID);
		}

		let saveTopic = await foundTopic.save();
		let topicData = await getDetailInfoForum()
		res.send(foundTopic);
		pusher.trigger(channelName,"update_like_number_in_detail_post",foundTopic);
		pusher.trigger(channelName,"update_forum_info_in_detail_post",topicData);
	}	
	catch(error){
		console.log(error)
	}
	

}

module.exports.postTopicFollow = async (req,res) =>{
	let topicID = req.params.topicID;
	let currentUserID = req.user._id;
	let channelName = "post_"+topicID;
	try{
		let foundUser = await User.findById(currentUserID)
		var checkTopic = (foundUser.topic).includes(topicID);
		if(checkTopic){
			(foundUser.topic).pull(topicID);
		}else{
			(foundUser.topic).push(topicID);
		}	

		let saveUser = await foundUser.save();
		res.send(foundUser);
		pusher.trigger(channelName,"update_follow_in_detail_post",foundUser);	
	}
	catch(error){
		console.log(error)
	}
		
}

getTotalFollower = async (topicID) =>{
	let totalFollower;
	try{
		foundUser = await User.find({topic:topicID}).exec()
		totalFollower = foundUser.length;
		return totalFollower;
	}
	catch(error){
		console.log(error)
	}
}


module.exports.getTopicPost = async (req,res) =>{
	try{
		let topicID = req.params.topicID;
		let topicData = await getDetailInfoForum()
		let totalFollower = await getTotalFollower(topicID);
		let foundTopic = await Topic.findById(topicID).populate('post').exec();
		res.render("forum/topic",{topic:foundTopic,totalFollower:totalFollower,moment:moment,topicData:topicData});		
	}
	catch(error){
		console.log(error)
	}

}

module.exports.getTopicPostDetail = async (req,res) =>{
	try{
		let topicID = req.params.topicID;
		let foundTopic = await Topic.findById(topicID).populate('post').exec();
		res.send(foundTopic);		
	}
	catch(error){
		console.log(error)
	}	
}


module.exports.postTopicPost = async (req,res) =>{
	let currentUserID = req.user._id;
	let username = req.user.username;
	let topicID = req.params.topicID;
	let text = req.body.comment;
	let date = Date.now();
	let channelName = "post_"+topicID;

	try{
		
		let foundTopic = await Topic.findById(topicID)
		let foundPost = await Post.create({text:text,date:date,topic:topicID});
		foundPost.author.id = currentUserID;
		foundPost.author.username = username;

		let savePost = await foundPost.save();

		foundTopic.post.push(foundPost._id);

		let saveTopic = await foundTopic.save();
		let topic = await Topic.findById(topicID).populate('post').exec();
		let topicData = await getDetailInfoForum()
		res.send({post:foundPost,topic:topic})
		pusher.trigger(channelName,"new_post_forum",topic);

		pusher.trigger(channelName,"update_forum_info_in_detail_post",topicData);
	}
	catch(err){
		console.log(err)
	}
}

module.exports.getDetailTopicInfo = (req,res) =>{

}

module.exports.getFollowersByTopic = async (req,res) =>{
	let topicID = req.params.topicID;	
	try{
		let totalFollower = await getTotalFollower (topicID);
		let channelName = "post_"+topicID;
		pusher.trigger(channelName,"update_follower_number_in_detail_post",totalFollower);	
	}	
	catch(error){
		console.log(error)
	}

}

getTotalMember = async (req,res) =>{
	let totalUser;
	try{
		let foundUser = await User.find({}).exec()
		totalUser = foundUser.length;
		return totalUser;
	}
	catch(error){
		console.log(error)
	}
}

getTotalLike = async (req,res) =>{
	let totalLike= 0;
	try{
		let foundTopic = await Topic.find({}).exec()
		foundTopic.forEach(topic=>{
			totalLike+=(topic.like).length
		})
		return totalLike;
	}
	catch(error){
		console.log(eror)
	}	
}

getTotalComment = async (req,res) =>{
	let totalComment = 0;
	try{
		let foundTopic = await Topic.find({}).exec()
		foundTopic.forEach(topic=>{
			totalComment+=(topic.post).length
		})
		return totalComment;
	}
	catch(error){
		console.log(eror)
	}
}

getAllTopicInfo = async (req,res) =>{
	let foundTopic;
	try{
		foundTopic = await Topic.find({}).exec()
		return foundTopic
	}
	catch(error){
		console.log(error)
	}
}

getDetailInfoForum = async (req,res) =>{
	let data = {}
	try{
		data["total_member"] = await getTotalMember()
		data["total_comment"] = await getTotalComment()
		data["total_like"] = await getTotalLike()
		data["topic"] = await getAllTopicInfo()
		return data;
	}
	catch(error){
		console.log(error)
	}	
}

module.exports.getDetailForum = async (req,res) =>{
	let data = {}
	try{
		data["total_member"] = await getTotalMember()
		data["total_comment"] = await getTotalComment()
		data["total_like"] = await getTotalLike()
		data["topic"] = await getAllTopicInfo()

		res.send(data)
	}
	catch(error){
		console.log(error)
	}
}