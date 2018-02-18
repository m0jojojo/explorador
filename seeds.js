var mongoose=require("mongoose");
var Campground=require("./models/campgrounds.js")
var Comment=require("./models/comments.js");

var data=[
	{
		name: "Stevens Pass,USA",
		image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d1156d3e4dfafbc71a9f293939f3243&auto=format&fit=crop&w=1095&q=80",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Mt.Rails,California",
		image: "https://images.unsplash.com/photo-1482376292551-03dfcb8c0c74?ixlib=rb-0.3.5&s=f9536f6bd27c3094e53594c41a68d489&auto=format&fit=crop&w=1051&q=80",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Alvord Desert, United States",
		image: "https://images.unsplash.com/photo-1468956398224-6d6f66e22c35?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d2e4d45d037053be722233b79bd0510&auto=format&fit=crop&w=1055&q=80",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
];

function seedDB(){
	//remove all campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!!")

		//add new campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,newCampground){
				if(err){
					console.log(err);
				}
				else{
					console.log("Campground Created");
					//create a comment
					Comment.create({
						text:"This place is great, but i wish there was Internet",
						author: "Homer"
					},function(err,comment){
						if(err){
							console.log(err);
						}
						else{
							newCampground.comments.push(comment);
							newCampground.save();
							console.log("created a comment");
						}
					});
				}
			});
		}); 
	});
}


module.exports=seedDB;