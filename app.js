var express = require ("express"),
	app = express(),
	path = require('path'),
	bodyParser = require("body-parser"),
	axios = require ("axios"),
	moment = require('moment'),
	lozad = require('lozad'),
	passport         = require("passport"),
	mongoose         = require("mongoose"),
	methodOverride   = require("method-override"),
	LocalStrategy    = require ("passport-local"),
	User             =require("./models/user"),
	numeral = require('numeral'),
	session = require('express-session'),
	flash = require('connect-flash'),
	dotenv = require('dotenv').config(),
	config = require('./auth/oauth.js'),
	port = process.env.PORT || 8000,
	
	FacebookStrategy = require('passport-facebook').Strategy,
	GoogleStrategy = require('passport-google-oauth2').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy;

var indexRoutes = require("./routes/index"),
	nowplayingRoutes = require("./routes/nowplaying"),
	topratedRoutes = require("./routes/toprated"),
	popularRoutes = require("./routes/popular"),
	movieRoutes = require("./routes/movie"),
	tvRoutes = require("./routes/tv"),
//	peopleRoutes = require("./routes/people"),
	keywordRoutes = require("./routes/keyword"),
	genreRoutes = require("./routes/genre"),
	upcomingRoutes = require("./routes/upcoming"),
	ontheairRoutes= require("./routes/ontheair"),
	airingtodayRoutes= require("./routes/airingtoday"),
	trendingRoutes= require("./routes/trending"),
	searchRoutes= require("./routes/search"),
	newsRoutes = require("./routes/news"),
	rankRoutes = require("./routes/rank"),
	forumRoutes = require("./routes/forum"),
	listRoutes = require("./routes/list"),
	discoverRoutes = require("./routes/discover"),
	bestRoutes = require("./routes/best"),
	profileRoutes = require("./routes/profile");

var Pusher = require('pusher'),
	pusher = new Pusher({
		appId:process.env.pusher_app_id,
		key:process.env.pusher_key,
		secret:process.env.pusher_secret,
		cluster:process.env.pusher_cluster,
		encrypted:true
	});

mongoose.connect('mongodb://localhost/moviefy',{
	userNewUrlParser:true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(__dirname + "/public"));
app.use(express.json({limit:'1mb'}))

app.use(methodOverride("_method"));
app.locals.moment = require('moment');

app.use(session({
	secret:process.env.SECRET,
	resave:false,
	saveUnitialized:false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new FacebookStrategy({
	clientID:config.facebook.clientID,
	clientSecret:config.facebook.clientSecret,
	callbackURL:config.facebook.callbackURL, 
	profileFields: ['id', 'displayName','emails']
	},
	function(accessToken,refreshToken,profile,done){
		User.findOne({oauthID:profile.id},function(err,user){
			if(err){
				console.log(err);
			}
			if(!err && user !==null){
				done(null,user);
			}else{
				var dateNow = Date.now();
  				var date = moment(dateNow).format('L');
				user = new User({
					username:profile.displayName,
					created:Date.now(),
					oauthID: profile.id,
					//email:profile.emails[0].value,
					email:'facebook@exmaple.com',
					date:date
				});
				user.save(function(err){
					if(err){
						console.log(err);
					}else{
						console.log("saving user");
						done(null,user);
					}
				});
			}
		});
	}
));

passport.use(new GoogleStrategy({
	clientID:config.google.clientID,
	clientSecret:config.google.clientSecret,
	callbackURL:config.google.callbackURL,
	passReqToCallback:true
	},
	function(request,accessToken,refreshToken,profile,done){
		User.findOne({oauthID:profile.id},function(err,user){
			if(err){
				console.log(err);
			}if(!err && user !== null){
				done(null,user);
			}else{
				var dateNow = Date.now();
				var date = moment(dateNow).format('L');
				user = new User({
					username:profile.displayName,
					created:Date.now(),
					oauthID:profile.id,
					date:date,

				});
				user.save(function(err){
					if(err){
						console.log(err);
					}else{
						console.log("saving user");
						done(null,user);
					}
				})
			}
		})
	}
));


passport.use(new TwitterStrategy({
	consumerKey: config.twitter.consumerKey,
	consumerSecret:config.twitter.consumerSecret,
	callbackURL:config.twitter.callbackURL,
	},
	function(accessToken,refreshToken,profile,done){
		User.findOne({oauthID:profile.id},function(err,user){
			if(err){
				console.log(err);
			}
			if(!err && user !==null){
				done(null,user);
			}else{
				var dateNow = Date.now();
				var email = 'twitter@exmaple.com'
				var date = moment(dateNow).format('L');
				user = new User({
					username:profile.username,
					created:Date.now(),
					oauthID:profile.id,
					date:date,
					email:email
				});				
				user.save(function(err){
					if(err){
						console.log(err);
					}else{
						console.log("saving user");
						done(null,user);
					}
				})
			}
		})
	}
))



app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})


app.use("/",indexRoutes);
app.use("/nowplaying",nowplayingRoutes);
app.use("/toprated",topratedRoutes);
app.use("/popular",popularRoutes);
app.use("/movie",movieRoutes);
app.use("/tv",tvRoutes);
//app.use("/people",peopleRoutes);
app.use("/keyword",keywordRoutes);
app.use("/genre",genreRoutes);
app.use("/upcoming",upcomingRoutes);
app.use("/ontheair",ontheairRoutes);
app.use("/airingtoday",airingtodayRoutes);
app.use("/trending",trendingRoutes);
app.use("/search",searchRoutes)
app.use("/news",newsRoutes);
app.use("/rank",rankRoutes);
app.use("/forum",forumRoutes);
app.use("/list",listRoutes);
app.use("/discover",discoverRoutes);
app.use("/best",bestRoutes);
app.use("/profile",profileRoutes);

app.get('*',function(req,res){ /* at the last of all routes */
    res.render("index/404");
});

app.listen(port, function(){
    console.log("Server has started");
});
