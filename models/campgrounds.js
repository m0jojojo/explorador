var mongoose=require("mongoose");
//Schema Setup
var campgroundSchema= new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}	
	]
});

 
//Exporting model
module.exports=mongoose.model("Campground",campgroundSchema);