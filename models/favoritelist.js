var mongoose = require ('mongoose');
var Favoritelist = mongoose.Schema;

var FavoritelistSchema = new Favoritelist ({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
	mediaID:String,
	mediaName:String,
	mediaPoster:String,
	mediaBackdrop:String,
	mediaType:String, //movie,tv show
	mediaURL:String,
	mediaOverview:String,
	mediaTagline:String,
	mediaVoteAverage:String,
	mediaRuntime:String,
	mediaReleaseDate:String,
	mediaGenre:{
		type:Array,
		"default":[]
	},
	date:{
		type:Date,
		default:Date.now
	}
});

module.exports = mongoose.model("Favoritelist",FavoritelistSchema);