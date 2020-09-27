var mongoose = require ('mongoose');
var Log = mongoose.Schema;

var LogSchema = new Log({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
	action:String, //delete,put,post,..
	created:{
		type:Date,
		default:Date.now
	},
	category:String, //movie,tvshow,people,comment,like
	mediaType:String,
	mediaID:String, // movieID,..
	mediaURL:String,
	mediaName:{
		type:String,
		default:''
	},
	message:String //Remove movie (name) from watchlist, Add
});


module.exports = mongoose.model("Log",LogSchema);