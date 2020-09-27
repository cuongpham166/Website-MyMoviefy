var express = require("express");
var router  = express.Router();
var passport = require("passport");
var middleware = require("../middleware/index")
var indexController = require("../controller/controller.index");
var authController = require("../controller/controller.auth");

router.get("/",indexController.index);

router.get("/userid",middleware.isLoggedIn,indexController.getUserID);
router.get("/userinfo",middleware.isLoggedIn,indexController.getUserInfo);

router.get("/login",authController.getLogin);
router.post("/login",passport.authenticate('local',{
	successRedirect:'/',
	failureRedirect:'/login',
	failureFlash: true,
	successFlash:'Welcome back! It´s really great to see you again'
}));

router.get('/auth/facebook',passport.authenticate('facebook', { scope: [ 'email' ] }));
	

router.get("/auth/facebook/callback",
	passport.authenticate('facebook',{failureRedirect:'/login'}),
	function(req,res){
		res.redirect('/');
	});

router.get("/auth/google",
	passport.authenticate('google',{scope:[
	    'https://www.googleapis.com/auth/plus.login',
	    'https://www.googleapis.com/auth/plus.profile.emails.read'
	]}
));

router.get("/auth/goolge/callback",
	passport.authenticate('google',{failureRedirect:'/login'}),
	function(req,res){
		res.redirect('/');
});

router.get("/auth/twitter",
	passport.authenticate('twitter'),
	function(req,res){});

router.get('/auth/twitter/callback',
	passport.authenticate('twitter',{failureRedirect:'/login'}),
	function(req,res){
		res.redirect('/');
});


router.get("/register",authController.getRegister);
router.post("/register",authController.postRegister);

router.get("/logout",authController.getLogout);

router.get("/forgot",authController.getForgot);
router.post("/forgot",authController.postForgot);

router.get("/reset/:token",authController.getReset);
router.post("/reset/:token",authController.postReset);

module.exports = router;
