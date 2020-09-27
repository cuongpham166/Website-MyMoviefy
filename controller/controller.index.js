var express = require("express");
var axios = require ("axios");
var movie = require("../movieapi/movie");
var tv = require("../movieapi/tv");
var news = require("../movieapi/news")
var genre = require("../movieapi/genre");
var passport = require("passport");
var User = require ("../models/user");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports.index=function(req,res){
	axios.all([tv.getOnTheAir(),
				   movie.getUpcoming(),
				   movie.getTrending(),
				   tv.getTrending(),
				   movie.getPopular(),
				   tv.getPopular(),
				   movie.getTopRated(1),
				   tv.getTopRated(1),
				   news.getTopNews()])
			
			.then(axios.spread(function(ontheair,upcom,trendmov,trendtv,popmov,poptv,topratedmov,topratedtv,topnews){
				
				let ontheairRes 	= ontheair.data.results,
					upcomRes    	= upcom.data.results,
					trendmovRes 	= trendmov.data.results,
					trendtvRes  	= trendtv.data.results,
					popmovRes		= popmov.data.results,
					poptvRes   		= poptv.data.results,
					topratedmovRes	= topratedmov.data.results;
					topratedtvRes	= topratedtv.data.results;
					topnewsRes      = topnews.data

					//console.log(topnewsRes);
 
				let	ontheairRen		 = [],
					upcomRen		 = [],
					trendmovRen		 = [],
					topSectionRen	 = [],
					popmovRen		 = [],
					topratedmovRen	 = [];

				for (let i=0;i<topratedmovRes.length;i++){
					if(topratedmovRes[i].poster_path != null && topratedmovRes[i].backdrop_path != null){
						topratedmovRen.push(topratedmovRes[i])
					}
				}	

				for (let i=0;i<ontheairRes.length;i++){
					if(ontheairRes[i].poster_path != null){
						ontheairRen.push(ontheairRes[i])
					}
				}

				for (let i=0;i<upcomRes.length;i++){
					if(upcomRes[i].poster_path != null){
						upcomRen.push(upcomRes[i])
					}
				}

				for (let i=0;i<trendmovRes.length;i++){
					if(trendmovRes[i].poster_path != null){
						trendmovRen.push(trendmovRes[i])
					}
				}

				for (let i=0;i<popmovRes.length;i++){
					if(popmovRes[i].poster_path != null && popmovRes[i].backdrop_path != null && popmovRes[i].id != 495764){
						popmovRen.push(popmovRes[i])
					}
				}

				for (let k=0;k<upcomRes.length;k++){
					if (upcomRes[k].backdrop_path != null){
						topSectionRen.push(upcomRes[k]);
					}
				}
				

				res.render("index/home",{
					ontheairData:ontheairRen,
					upcomData:upcomRen,
					trendmovData:trendmovRen,
					topSectionData:topSectionRen,
					popmovData:popmovRen,
					topratedmovData:topratedmovRen,
					newsData:topnewsRes
				});

			}))
			.catch(function(error){
				console.log(error);
			})
	}	



module.exports.getUserID = function(req,res){
		var currentUserID = req.user._id;
		res.send(currentUserID);

}

module.exports.getUserInfo = async (req,res)=>{
	let currentUserID = req.user._id;
	try{
		let foundUser = await User.findById(currentUserID)
		let userData = {username:foundUser.username,id:foundUser._id}
		res.send(userData);
	}
	catch(error){
		return error;
	}
}

