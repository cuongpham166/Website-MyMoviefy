var mongoose = require ('mongoose');
var List = mongoose.Schema;

var ListSchema = new List ({
	name:String,
	userID:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"		
	},
	created:{
		type:Date,
		default:Date.now		
	},
	media:{
		type:Array,
		default:[]
	}
})

module.exports = mongoose.model("List",ListSchema)