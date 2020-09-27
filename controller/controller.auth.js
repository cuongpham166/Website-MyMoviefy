var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var moment = require('moment');

module.exports.getLogin = function(req,res){
	res.render("auth/login")
}

module.exports.getRegister = function(req,res){
	res.render("auth/register")
}

module.exports.postRegister = function(req,res){
  var dateNow = Date.now();
  var date = moment(dateNow).format('L');
	var newUser = new User({
		username:req.body.username,
		email:req.body.email,
    created:Date.now(),
    date:date
	});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
      req.flash("error", err.message);
			return res.render("auth/register");
		}
		passport.authenticate("local")(req,res,function(){
      req.flash("success", "Welcome to Moviefy " +" "+user.username);
			res.redirect("/");
		});
	});
}

module.exports.getLogout = function(req,res){
	req.logout();
  /*req.flash("success", "You have been successfully logged out! Goodbye");*/
	res.redirect("/");
}

module.exports.getForgot = function(req,res){
	res.render("auth/forgot")
}

module.exports.postForgot = function(req,res,next){
	async.waterfall([
		function(done){
			crypto.randomBytes(20,function(err,buf){
				var token = buf.toString('hex');
				done(err,token);
			});
		},
		function(token,done){
			User.findOne({email:req.body.email},function(err,user){
				if(!user){
					req.flash('error','No account with that email address exists.');
					return res.redirect("/forgot");
				}

				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now()+3600000;//1 hour

				user.save(function(err){
					done(err,token,user);
				});
			});
		},
		function(token,user,done){
			var smtpTransport = nodemailer.createTransport({
				service:'Yandex',
				auth:{
					user:'cuongpham166@yandex.com',
					pass:process.env.YANDEXPWD
				}
			});
			var mailOptions = {
				to:user.email,
				from:'"Moviefy Account" <cuongpham166@yandex.com>',
				subject:'Request to reset your Moviefy Account password',
				text: 'Hello'+'  '+user.username+'\n\n'+
			'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          	'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          	'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          	'If you did not request this, please ignore this email and your password will remain unchanged.\n\n'+
          	'If you don’t use this link within 1 hour, it will expire\n'
      		};
      		smtpTransport.sendMail(mailOptions,function(err){
      			req.flash('success','Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.');
      			done(err,'done');
      		});
		}
		],function(err){
			if(err) return next(err);
			res.redirect('/forgot');
		});
}

module.exports.getReset = function(req,res){
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('auth/reset', {token: req.params.token});
  });
}

module.exports.postReset = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Yandex', 
        auth: {
          user: 'cuongpham166@yandex.com',
          pass: process.env.YANDEXPWD
        }
      });
      var mailOptions = {
        to: user.email,
        from: '"Moviefy Account" <cuongpham166@yandex.com>',
        subject: 'Your Moviefy Account password has been changed',
        text: 'Hello'+'  '+user.username+'\n\n'+
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
}