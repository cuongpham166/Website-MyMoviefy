var mongoose = require ('mongoose');
var Topic = mongoose.Schema;

var TopicSchema = new Topic({
	title:String,
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
	like:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default:[]
        }
	],
	subforum:String,
	categorie:String,
	post:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", 
            default:[]

        },

	]
})

module.exports = mongoose.model("Topic",TopicSchema);