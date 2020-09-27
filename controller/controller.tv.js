var axios = require ("axios");
var numeral = require('numeral');
var tv  = require("../movieapi/tv");
var movie = require ("../movieapi/movie");
var moment = require('moment');


var User = require ("../models/user");
var Watchlist = require("../models/watchlist");
var Favoritelist = require("../models/favoritelist");

module.exports.getAiringToday = function(req, res){
	axios.all([tv.getAiringToday(1),tv.getAiringToday(2)])
	.then(axios.spread(function(airingtodaytv1,airingtodaytv2){

		let airingtodaytv1Ren		= airingtodaytv1.data.results;
		let airingtodaytv2Ren		= airingtodaytv2.data.results;

		if (airingtodaytv2Ren.length > 0){
			for (var i=0;i<airingtodaytv2Ren.length;i++){
				airingtodaytv1Ren.push(airingtodaytv2Ren[i]);
			}
		}

		res.render("tv/tv_airingtoday",{airingtodaytvData:airingtodaytv1Ren});
	}))
	.catch(function(error){
		console.log(error);
	})	
}


module.exports.getListTopRatedTV = async (req,res) =>{
	try{
		let foundResult = await axios.get(tv.getListTopRatedTVUrl());
		let tvData = foundResult.data.results;
		let tvRes = [];
		tvData.forEach((result)=>{
			if(result.backdrop_path != null){
				tvRes.push(result);
			}
		})
		res.send(tvRes)		
	}
	catch(error){
		console.log(error)
	}
}

module.exports.getListPopularTV = async (req,res) =>{
	try{
		let foundResult = await axios.get(tv.getListPopularTVUrl());
		let tvData = foundResult.data.results;
		let tvRes = [];
		tvData.forEach((result)=>{
			if(result.backdrop_path != null){
				tvRes.push(result);
			}
		})
		res.send(tvRes)		
	}
	catch(error){
		console.log(error)
	}
}

module.exports.getListTrendingTV = async (req,res) =>{
	try{
		let foundResult = await axios.get(tv.getListTrendingTVUrl());
		let tvData = foundResult.data.results;
		let tvRes = [];
		tvData.forEach((result)=>{
			if(result.poster_path != null){
				tvRes.push(result);
			}
		})
		res.send(tvRes)		
	}
	catch(error){
		console.log(error)
	}
}

module.exports.getOnTheAir = function(req, res){
	axios.all([tv.getOnTheAir(1),tv.getOnTheAir(2)])
	.then(axios.spread(function(ontheairtv1,ontheairtv2){

		let ontheairtv1Ren		= ontheairtv1.data.results;
		let ontheairtv2Ren		= ontheairtv2.data.results;

		if (ontheairtv2Ren.length > 0){
			for (var i=0;i<ontheairtv2Ren.length;i++){
				ontheairtv1Ren.push(ontheairtv2Ren[i]);
			}
		}

		res.render("tv/tv_ontheair",{ontheairtvData:ontheairtv1Ren});
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getTV = function(req, res){
	axios.all([tv.getPopular(1),tv.getPopular(2)])
	.then(axios.spread(function(populartv1,populartv2){

		let populartv1Ren		= populartv1.data.results;
		let populartv2Ren		= populartv2.data.results;

		if (populartv2Ren.length > 0){
			for (var i=0;i<populartv2Ren.length;i++){
				populartv1Ren.push(populartv2Ren[i]);
			}
		}
		res.render("tv/tv",{populartvData:populartv1Ren});
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getTVDetail = function(req, res){
	let tvID = req.params.id;
	axios.all([tv.getDetail(tvID),
			   tv.getKeyword (tvID),
			   tv.getCredits(tvID),
			   tv.getReview(tvID),
			   tv.getSimilar(tvID)])

	.then(axios.spread(function(detailtv,keywordtv,creditstv,reviewtv,similartv){
		let detailtvRen 	= detailtv.data;
		let keywordtvRen   = keywordtv.data.results;
		let	caststvRen		= creditstv.data.cast;
		let reviewtvRen    = reviewtv.data.results;
		let similartvRen   = similartv.data.results;

		detailtvRen["keywords"] = keywordtvRen;
		detailtvRen["cast"]	 = caststvRen;
		detailtvRen["review"] 	 = reviewtvRen;
		detailtvRen["similar"]  = similartvRen;


		//console.log(keywordtvRen);
		//console.log(detailtvRen);

		res.render("tv/tv_detail",{detailtvData:detailtvRen,numeral:numeral});
	}))
	.catch(function(error){
		console.log(error);
	})
	
}

module.exports.getTVReview = function(req, res){
	let tvID = req.params.id;
	axios.all([tv.getDetail (tvID),tv.getReview (tvID)])
	.then(axios.spread(function(detailtv,reviewtv){
		let detailtvRen 	= detailtv.data;
		let reviewtvRen    = reviewtv.data.results;
		detailtvRen["review"] 	 = reviewtvRen;
		//console.log(detailmovRen["review"] );
		res.render("tv/tv_review",{detailtvData:detailtvRen});
	}))
	.catch(function(error){
		console.log(error);
	})		
}

module.exports.getTVCrew = function(req, res){

	let tvID = req.params.id;
	axios.all([tv.getDetail (tvID),tv.getCredits (tvID)])
	.then(axios.spread(function(detailtv,creditstv){
		let detailtvRen 	= detailtv.data;
		let	caststvRen		= creditstv.data.cast;
		let crewstvRen		= creditstv.data.crew;

		detailtvRen["cast"]	 = caststvRen;
		detailtvRen["crew"]	 = crewstvRen;

		res.render("tv/tv_crew",{detailtvData:detailtvRen});
	}))
	.catch(function(error){
		console.log(error);
	})		
}

module.exports.getTVSeason = function(req, res){
	let tvID = req.params.id;
	axios.get("https://api.themoviedb.org/3/tv/"+tvID+"?api_key="+process.env.API+"&language=en-US")
  	.then(function (detailtv) {
  		let detailtvRen 	= detailtv.data;
    	res.render("tv/tv_seasons",{detailtvData:detailtvRen});
    	//console.log(detailtvRen);
  })
	.catch(function(error){
		console.log(error);
  })
	
}

module.exports.getSeasonDetail = function(req, res){
	let tvID = req.params.id;
	let seasonNum = req.params.id1;

	axios.all([tv.getSeasonDetail(tvID,seasonNum),tv.getSeasonCredit(tvID, seasonNum),tv.getDetail(tvID)])
	.then(axios.spread(function(detailseason,creditseason,detailtv){
		let detailseasonRen 	= detailseason.data;
		let castseasonRen    	= creditseason.data.cast;
		let crewseasonRen    	= creditseason.data.crew;
		let detailtvRen 	= detailtv.data;

		detailseasonRen["cast"]	= castseasonRen;
		detailseasonRen["crew"]	= crewseasonRen;
		
		//console.log(detailseasonRen);

		res.render("tv/tv_seasons_detail",{detailseasonData:detailseasonRen,detailtvData:detailtvRen});
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getTVTopRated = function(req, res){
	axios.all([movie.getTopRated(1),tv.getTopRated(1)])
	.then(axios.spread(function(topratedmov1,topratedtv1){

		let topratedmov1Ren		= topratedmov1.data.results;
		let topratedtv1Ren		= topratedtv1.data.results;

		res.render("tv/tv_toprated",{topratedmovData:topratedmov1Ren,topratedtvData:topratedtv1Ren});
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getTopRated = function(req, res){
	res.redirect("/toprated/movie");	
}

module.exports.getPopular = function(req, res){
	res.redirect("/popular/movie");
}

module.exports.getTVPopular = function(req, res){
	axios.all([movie.getPopular(1),tv.getPopular(1)])
	.then(axios.spread(function(popularmov1,populartv1){

		let popularmov1Ren		= popularmov1.data.results;
		let populartv1Ren		= populartv1.data.results;

		res.render("tv/tv_popular",{popularmovData:popularmov1Ren,populartvData:populartv1Ren});
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getTrending = function(req, res){
	res.redirect("/trending/movie");
}

module.exports.getTVTrending = function(req, res){
	axios.all([movie.getTrending(), tv.getTrending()])
	.then(axios.spread(function(trendingmov,trendingtv){
		let trendingmovRen		= trendingmov.data.results;
		let trendingtvRen	= trendingtv.data.results;

		res.render("tv/tv_trending",{trendingmovData:trendingmovRen,trendingtvData:trendingtvRen});
	}))
	.catch(function(error){
		console.log(error);
	})	
}



module.exports.postTVFavorite = (req,res) =>{
	let userID = req.user._id;
	let tvID = req.params.id;
	let genreArray = [];
	let mediaURL = "/tv/"+tvID;
	let isExist = false;

	User.findById(userID,(err,foundUser)=>{
		if(err || !foundUser){
			return res.redirect("/tv/"+tvID);
		}else{
			Favoritelist.findOne({user:userID,mediaID:tvID},(error,foundFavorite)=>{
				if(error){
					return res.redirect("/tv/"+tvID);


				}else if(!foundFavorite){
					axios.get(tv.getDetailUrl(tvID))
					.then((response)=>{
						let tvDetailData = response.data;
						for (let i =0;i<tvDetailData.genres.length;i++){
							genreArray.push(tvDetailData.genres[i].name)
						}
						let newFavoritelist = new Favoritelist ({
							user:userID,
							mediaID:tvID,
							mediaName:tvDetailData.name,
							mediaPoster:tvDetailData.poster_path,
							mediaOverview:tvDetailData.overview,

							mediaTagline:"",
							mediaVoteAverage:tvDetailData.vote_average,
							mediaRuntime:"",
							mediaReleaseDate:tvDetailData.first_air_date,

							mediaBackdrop:tvDetailData.backdrop_path,
							mediaType:"tv",
							mediaURL:mediaURL,
							mediaGenre:genreArray,
							date:Date.now()
						})
						newFavoritelist.save(function(err){
							if(err){
								console.log(err);
							}
							isExist = true;
							res.send(isExist)
						})						
					})
					.catch((error)=>{
						console.log(error)
					})

					
				}else{
					Favoritelist.findOneAndDelete({user:userID,mediaID:tvID},(err,favoritelist)=>{
						if(err){
							return res.redirect("/tv/"+tvID);
						}else{
							res.send(isExist)
						}
					})
				}
			})
		}
	})
}





module.exports.getTVFavorite = (req,res) =>{
	let userID = req.user._id;
	let tvID = req.params.id;
	let isExist = true;
	User.findById(userID,(err,foundUser)=>{	
		if(err||!foundUser){
			return res.redirect("/tv/"+tvID);
		}else{
			Favoritelist.findOne({user:userID,mediaID:tvID},(error,foundFavorite)=>{
				if(error){
					return res.redirect("/tv/"+tvID);
				}else if(!foundFavorite){
					isExist = false;
					res.send(isExist)
				}else{
					res.send(isExist)
				}
			})
		}

	})	
}


module.exports.postTVWatchlist = (req,res) =>{
	let userID = req.user._id;
	let tvID = req.params.id;
	let genreArray = [];
	let mediaURL = "/tv/"+tvID;
	let isExist = false;

	User.findById(userID,(err,foundUser)=>{
		if(err || !foundUser){
			return res.redirect("/tv/"+tvID);
		}else{
			Watchlist.findOne({user:userID,mediaID:tvID},(error,foundWatchlist)=>{
				if(error){
					return res.redirect("/tv/"+tvID);


				}else if(!foundWatchlist){
					axios.get(tv.getDetailUrl(tvID))
					.then((response)=>{
						let tvDetailData = response.data;
						for (let i =0;i<tvDetailData.genres.length;i++){
							genreArray.push(tvDetailData.genres[i].name)
						}
						let newWatchlist = new Watchlist ({
							user:userID,
							mediaID:tvID,
							mediaName:tvDetailData.name,
							mediaPoster:tvDetailData.poster_path,
							mediaOverview:tvDetailData.overview,

							mediaTagline:"",
							mediaVoteAverage:tvDetailData.vote_average,
							mediaRuntime:"",
							mediaReleaseDate:tvDetailData.first_air_date,

							mediaBackdrop:tvDetailData.backdrop_path,
							mediaType:"tv",
							mediaURL:mediaURL,
							mediaGenre:genreArray,
							date:Date.now()
						})
						newWatchlist.save(function(err){
							if(err){
								console.log(err);
							}
							isExist = true;
							res.send(isExist)
						})						
					})
					.catch((error)=>{
						console.log(error)
					})

					
				}else{
					Watchlist.findOneAndDelete({user:userID,mediaID:tvID},(err,watchlist)=>{
						if(err){
							return res.redirect("/tv/"+tvID);
						}else{
							res.send(isExist)
						}
					})
				}
			})
		}
	})
}





module.exports.getTVWatchlist = (req,res) =>{
	let userID = req.user._id;
	let tvID = req.params.id;
	let isExist = true;
	User.findById(userID,(err,foundUser)=>{	
		if(err||!foundUser){
			return res.redirect("/tv/"+tvID);
		}else{
			Watchlist.findOne({user:userID,mediaID:tvID},(error,foundWatchlist)=>{
				if(error){
					return res.redirect("/tv/"+tvID);
				}else if(!foundWatchlist){
					isExist = false;
					res.send(isExist)
				}else{
					res.send(isExist)
				}
			})
		}

	})	
}


module.exports.getTrailer=function(req,res){
	var tvID = req.params.id;
	axios.get(tv.getTrailerVideo(tvID))
		.then(function(response){
			//console.log(response.data.results)
			res.send(response.data.results);
		})
		.catch(function(error){
			console.log(error)
		})
}