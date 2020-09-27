var mongoose = require ('mongoose');
var Post = mongoose.Schema;

var PostSchema = new Post({
	text:String,
	date:{
		type:Date,
		default:Date.now
	},	
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String		
	},
	topic:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"		
	}
})

module.exports = mongoose.model("Post",PostSchema);