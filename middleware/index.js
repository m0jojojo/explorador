//all the middleware goes here
var middlewareObj= {};

middlewareObj.checkCommentOwnership=function(req,res,next){
	//checking if user is logged in
	if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				res.redirect("back");
			}
			else{
				//does user owns the comment?
				//we can't do "===" because foundComment's id is mongoose id and it's a object not a string
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error","Permission denied!");
					res.redirect("back");
				}	
			}
		});
	}
	else{
		req.flash("error","You must be logged in!");
		res.redirect("back");
	}	
}

middlewareObj.checkCampgroundOwnership=function(req,res,next){
	//checking if user is logged in
	if(req.isAuthenticated()){
			Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				req.flash("error","Campground not found!");
				res.redirect("back");
			}
			else{
				//does user owns the campground
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error","Permission denied!");
					res.redirect("back");
				}	
			}
		});
	}
	else{
		req.flash("error","You must be logged in!");
		res.redirect("back");
	}	
}

middlewareObj.isLoggedIn= function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You must be logged in!");
	res.redirect("/login");
}


module.exports =middlewareObj;