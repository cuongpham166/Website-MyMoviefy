var mongoose = require ('mongoose');
var Watchlist = mongoose.Schema;

var WatchlistSchema = new Watchlist ({
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

module.exports = mongoose.model("Watchlist",WatchlistSchema);