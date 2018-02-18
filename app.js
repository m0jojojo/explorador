var express             =require("express"),
    app                 =express(),
 	bodyParser          =require("body-parser"),
 	flash               =require("connect-flash"),
 	mongoose            =require("mongoose"),
 	passport            =require("passport"),
 	methodOverride      =require("method-override")
 	localStrategy       =require("passport-local"),
 	User                =require("./models/users.js"),
 	Comment             =require("./models/comments.js"),
 	Campground          =require("./models/campgrounds.js"),
 	seedDB              =require("./seeds.js");

//requiring routes
var commentRoutes =require("./routes/comments"),
	campgroundRoutes=require("./routes/campgrounds"),
	indexRoutes=require("./routes/index");

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/yelp_camp"); 
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(flash());
app.use(methodOverride("_method"));

//seeding the database
//seedDB();

//Passport Config.
app.use(require("express-session")({
	secret: "Gonna be a good Developer someday",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passing variables to all templates
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
//Creating a local server!
app.listen(6900,function(){
	console.log("Explorador running on port:6900"); 
});