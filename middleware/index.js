let Comment = require ("../models/comment");
let Topic = require ("../models/topic");
let User = require ("../models/user");
let List = require("../models/list")

module.exports.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");

}

module.exports.checkUserExist = async (req,res,next)=>{
	if(req.isAuthenticated()){
		try{
			let foundUser = await User.findById(req.params.userID).exec()
			if(foundUser._id.equals(req.user._id) && foundUser._id.equals(req.params.userID)){
				next();
			}else{
				req.flash("error","User Error");
				res.redirect("back")				
			}
		}
		catch(error){
			req.flash("error","User not found");
			res.redirect("back")
		}
	}else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
	}
}

module.exports.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.commentID,function(err,foundComment){
			if(err || !foundComment){
				req.flash("error","Comment not found");
				res.redirect("back");
			}else{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		})
	}else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


module.exports.checkTopicOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Topic.findById(req.params.topicID,function(err,foundTopic){
			if(err|| !foundTopic){
				req.flash("error","Topic not found");
				res.redirect("back");
			}else{
				if(foundTopic.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");					
				}
			}
		})
	}else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");		
	}
}


/*module.exports.checkListOwnership = (req,res,next) =>{
	if(req.isAuthenticated()){
		List.findById(req.params.)
	}
}*/