var express=require("express");
var router=express.Router();
var Campground=require("../models/campgrounds");
var Comment=require("../models/comments");
var middleware=require("../middleware");

//shows comment form
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{campground:foundCampground});
		}
	});	
});

//create a comment on a specific campground
router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
	//lookup campground using ID
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			//create new comment
			//push & save this comment to campground
			//redirect to campground show page
			Comment.create(req.body.comment,function(err,newComment){
				if(err){
					req.flash("error","Something went wrong");
					res.redirect("/campgrounds/"+campground._id)
				}
				else{
					//add username and id to comment
					newComment.author.id= req.user._id;
					newComment.author.username= req.user.username; 
					//save comment
					newComment.save();
					campground.comments.push(newComment);
					campground.save();
					req.flash("success","Comment created!!");
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
	
});

//EDIT Comment Route
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.render("comments/edit",{campground_id: req.params.id,comment:foundComment});
		}
	});
	
});

//UPDATE Comment Route
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		}
		else{
			req.flash("success","Comment updated");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DELETE Comment Route
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}
		else{
			req.flash("success","Deleted!");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


//middleware to check user is login or not



module.exports=router;