var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/users");

//Root Route
router.get("/",function(req,res){
	res.render("landing");
});




//============
//AUTH Routes
//============

//show register form
router.get("/register",function(req,res){
	res.render("register");
});

//signup logic
router.post("/register",function(req,res){
	var newUser=new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			res.redirect("/register");
		}
		else{
			passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome, "+user.username);
			res.redirect("/campgrounds");
			});
		}
	});
});

//show login form
router.get("/login",function(req,res){
	res.render("login");
});

//login logic
router.post("/login",passport.authenticate("local",{    //this is a middleware
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),function(req,res){
});

//logout route
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged you out!!");
	res.redirect("/campgrounds");
});


module.exports = router;
