var express=require("express");
var router=express.Router();
var Campground=require("../models/campgrounds");
var Comment=require("../models/comments");
var middleware=require("../middleware");

//INDEX-Displays all campgrounds
router.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log("Error!");
		}
		else{
			res.render("campgrounds/index",{campgrounds:allcampgrounds,currentUser: req.user});
		}
	});
	
});


//NEW-Displays Form to add new campgrounds in DB
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});


//CREATE-Add new campground to DB
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	var name= req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var author={
		id: req.user._id,
		username: req.user.username
	};
	var price=req.body.price;
	///getting data from FORM
	var newCampground={
		name: name,
		image: image,
		price:price,
		description:description,
		author:author
	};

	//create a new campground and save to database
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log("Error");
		}
		else{
			req.flash("success","New Campground Created");
			res.redirect("/campgrounds");
		}
	});
	
});

//SHOW-displays information about specific campground
router.get("/campgrounds/:id",function(req,res){
	//find campground with id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log("Error");
		}
		else{
			res.render("campgrounds/show",{campground:foundCampground});
		}
	});
});

//Edit Campground Route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		//ejs, by default looks for the template in views dir while rendering
		res.render("campgrounds/edit",{campground:foundCampground});
	});
});
	
	

//Update campground Route
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find and update the correct background
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			//redirect to updated campground show page
			req.flash("success","Update Successful!");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});	
});


//Destroy Campgrounds Route 

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find and delete correct campground
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			req.flash("success","Deleted!");
			res.redirect("/campgrounds");
		} 
	});
});






module.exports=router;