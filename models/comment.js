var mongoose = require('mongoose');
var Comment = mongoose.Schema;

var CommentSchema = new Comment({
	media_id:{
		type:String,
		require:true
	},
	media_type:String,
	text:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	like:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
	],
	postedAt:{
		type:Date,
		default:Date.now
	},
	edited:{
		type:Boolean,
		default: false

	}
});


module.exports = mongoose.model("Comment",CommentSchema);