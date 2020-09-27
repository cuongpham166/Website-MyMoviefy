var mongoose = require('mongoose');
var User = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new User ({
	username: {
		type:String,
		unique:true,
		require:true
	},
	password:String,
	created:Date,
	date:String,
	email:{
		type:String,
		require:true
	},
	oauthID:Number,
	resetPasswordToken:String,
	resetPasswordExpires:Date,
	favorite:{
		movie:[String],
		tvshow:[String]
	},
	watchlist:{
		movie:[String],
		tvshow:[String]
	},
	topic:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Topic",
			default:[]
		}
	]

});

UserSchema.plugin(passportLocalMongoose);

//export userschema
module.exports = mongoose.model("User",UserSchema);