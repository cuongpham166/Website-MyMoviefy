var axios = require ("axios");
var numeral = require('numeral');
var moment = require('moment');
var tv  = require("../movieapi/tv");
var movie = require ("../movieapi/movie");
var middleware = require("../middleware/index")
var cheerio = require("cheerio");

var User = require ("../models/user");
var Comment = require ("../models/comment");
var Log = require("../models/log");
var Watchlist = require("../models/watchlist");
var Favoritelist = require("../models/favoritelist");

module.exports.getMovie = function(req, res){
	axios.all([movie.getPopular(1),movie.getPopular(2)])
	.then(axios.spread(function(popularmov,popularmov1){
		let popularmovRen		= popularmov.data.results;
		let popularmovRen1		= popularmov1.data.results;

		if(popularmovRen1.length > 0){
			for (var i=0;i<popularmovRen1.length;i++){
				popularmovRen.push(popularmovRen1[i]);
			}	
		}
		res.render("movie/movie",{popularmovData:popularmovRen});
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getListTopRatedMovie = async(req,res) =>{
	try{
		let foundResult = await axios.get(movie.getListTopRatedMovieUrl());
		console.log(foundResult)
		let movieData = foundResult.data.results;
		let movieRes = [];
		movieData.forEach((result)=>{
			if(result.backdrop_path != null){
				movieRes.push(result);
			}
		})
		res.send(movieRes)
	}
	catch(error){
		console.log(error)
	}
}

module.exports.getListPopularMovie = async (req,res) =>{
	try{
		let foundResult = await axios.get(movie.getListPopularMovieUrl());
		let movieData = foundResult.data.results;
		let movieRes = [];
		movieData.forEach((result)=>{
			if(result.backdrop_path != null){
				movieRes.push(result);
			}
		})
		res.send(movieRes)		
	}
	catch(error){
		console.log(error)
	}
}

module.exports.getListTrendingMovie = async (req,res) =>{
	try{
		let foundResult = await axios.get(movie.getListPopularMovieUrl());
		let movieData = foundResult.data.results;
		let movieRes = [];
		movieData.forEach((result)=>{
			if(result.poster_path != null){
				movieRes.push(result);
			}
		})
		res.send(movieRes)		
	}
	catch(error){
		console.log(error)
	}
}

module.exports.getMovieDetail = function(req, res){
		let movieID = req.params.id;
		axios.all([movie.getDetail (movieID),
				   movie.getKeyword (movieID),
				   movie.getReview(movieID),
				   movie.getSimilar(movieID),
				   movie.getCredits(movieID),
				   movie.getMovieReview(movieID),
				   movie.getImdbScore(movieID),
				   movie.getMetaScore(movieID)])

		.then(axios.spread(function(detailmov,keywordmov,reviewmov,similarmov,creditsmov,reviewuser,imdbscore,metascore){
			let detailmovRen 	= detailmov.data;
			let keywordmovRen   = keywordmov.data.keywords;
			let reviewmovRen    = reviewmov.data.results;
			let similarmovRen   = similarmov.data.results;
			let	castsmovRen		= creditsmov.data.cast;
			let crewsmovRen		= creditsmov.data.crew;

			let reviewuserRen   = reviewuser.data;
			let imdbscoreRen    = imdbscore.data;
			let metascoreRen    = metascore.data;

			detailmovRen["keywords"] = keywordmovRen;
			detailmovRen["review"] 	 = reviewmovRen;
			detailmovRen["similar"]  = similarmovRen;
			detailmovRen["cast"]	 = castsmovRen;
			detailmovRen["crew"]	 = crewsmovRen;
			detailmovRen["userReview"] = reviewuserRen;
			detailmovRen["imdb"] = imdbscoreRen;
			detailmovRen["meta"] = metascoreRen;


			res.render("movie/movie_detail",{detailmovData:detailmovRen,numeral:numeral,moment:moment});
		}))
		.catch(function(error){
			console.log(error);
		})
	
}

module.exports.getMovieReview = function(req, res){
	let movieID = req.params.id;
	axios.all([movie.getDetail(movieID),movie.getReview(movieID)])
	.then(axios.spread(function(detailmov,reviewmov){
		let detailmovRen 	= detailmov.data;
		let reviewmovRen    = reviewmov.data.results;
		detailmovRen["review"] 	 = reviewmovRen;
		//console.log(detailmovRen["review"] );
		res.render("movie/movie_review",{detailmovData:detailmovRen});
	}))
	.catch(function(error){
		console.log(error);
	})		
}

module.exports.getMovieCrew = function(req, res){
	let movieID = req.params.id;
	axios.all([movie.getDetail (movieID),movie.getCredits(movieID)])
	.then(axios.spread(function(detailmov,creditsmov){
		let detailmovRen 	= detailmov.data;
		let	castsmovRen		= creditsmov.data.cast;
		let crewsmovRen		= creditsmov.data.crew;

		detailmovRen["cast"]	 = castsmovRen;
		detailmovRen["crew"]	 = crewsmovRen;

		res.render("movie/movie_crew",{detailmovData:detailmovRen});
	}))
	.catch(function(error){
		console.log(error);
	})		
}

module.exports.getMovieTopRated = function(req, res){
	axios.all([movie.getTopRated(1),tv.getTopRated(1)])
	.then(axios.spread(function(topratedmov1,topratedtv1){

		let topratedmov1Ren		= topratedmov1.data.results;
		let topratedtv1Ren		= topratedtv1.data.results;

		res.render("movie/movie_toprated",{topratedmovData:topratedmov1Ren,topratedtvData:topratedtv1Ren});
	}))
	.catch(function(error){
		console.log(error);
	})	
}
module.exports.getNowPlaying = function(req, res){
	axios.all([movie.getNowPlaying(1),movie.getNowPlaying(2)])
	.then(axios.spread(function(nowplayingmov1,nowplayingmov2){

		let nowplayingmov1Ren		= nowplayingmov1.data.results;
		let nowplayingmov2Ren		= nowplayingmov2.data.results;

		if (nowplayingmov2Ren.length > 0){
			for (var i=0;i<nowplayingmov2Ren.length;i++){
				nowplayingmov1Ren.push(nowplayingmov2Ren[i]);
			}
		}

		res.render("movie/movie_nowplaying",{nowplayingmovData:nowplayingmov1Ren});
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getMoviePopular = function(req, res){
	axios.all([movie.getPopular(1),tv.getPopular(1)])
	.then(axios.spread(function(popularmov1,populartv1){

		let popularmov1Ren		= popularmov1.data.results;
		let populartv1Ren		= populartv1.data.results;

		res.render("movie/movie_popular",{popularmovData:popularmov1Ren,populartvData:populartv1Ren});
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getMovieTrending = function(req, res){
	axios.all([movie.getTrending(), tv.getTrending()])
	.then(axios.spread(function(trendingmov,trendingtv){
		let trendingmovRen		= trendingmov.data.results;
		let trendingtvRen	= trendingtv.data.results;

		res.render("movie/movie_trending",{trendingmovData:trendingmovRen,trendingtvData:trendingtvRen});
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getImdb = (req,res) =>{
	let movieID = req.params.id;
	axios.get(movie.getMovieDetailUrl(movieID))
	.then((response)=>{
		var movieData = response.data;
		var imdbID = movieData.imdb_id;
		axios.get(movie.getImdbScoreUrl(imdbID))
		.then((res1)=>{
			if(res1.status===200){
				var $ = cheerio.load(res1.data);
				var imdbScore = new Object();
				var elementValue = $("*[itemprop='ratingValue']").get(0);
				var ratingValue = $(elementValue).text().trim();

				var elementCount = $("*[itemprop='ratingCount']").get(0);
				var ratingCount =  $(elementCount).text().trim();

				if(ratingValue === ""){
					imdbScore["ratingValue"] = "";
					imdbScore["ratingCount"] = "";
					res.send (imdbScore);
				}else{
					imdbScore["ratingValue"] = ratingValue;
					imdbScore["ratingCount"] = ratingCount;
					res.send (imdbScore);
				}			
			}			

		})
		.catch((error1)=>{
			console.log(error1);
		})
	})
	.catch((error)=>{
		console.log(error)
	})

}


module.exports.getMetacritic = (req,res) =>{
	let movieID = req.params.id;
	axios.get(movie.getMovieDetailUrl(movieID))
	.then((response)=>{
		var movieData = response.data;
		var imdbID = movieData.imdb_id;
		axios.get(movie.getMetaScoreUrl(imdbID))
		.then((res1)=>{
			if(res1.status===200){
				var $ = cheerio.load(res1.data);
				var metaScore = new Object();
				var elementValue = $("*[itemprop='ratingValue']").get(0);
				var ratingValue = $(elementValue).text().trim();

				var elementCount = $("*[itemprop='ratingCount']").get(0);
				var ratingCount =  $(elementCount).text().trim();

				if(ratingValue === ""){
					metaScore["ratingValue"] = "";
					metaScore["ratingCount"] = "";
					res.send (metaScore);
				}else{
					metaScore["ratingValue"] = ratingValue;
					metaScore["ratingCount"] = ratingCount;
					res.send (metaScore);
				}			
			}			

		})
		.catch((error1)=>{
			console.log(error1);
		})
	})
	.catch((error)=>{
		console.log(error)
	})	
}


module.exports.getMovieUpcoming = function(req, res){
	axios.all([movie.getUpcoming(1),movie.getUpcoming(2)])
	.then(axios.spread(function(upcomingmov1,upcomingmov2){

		let upcomingmov1Ren		= upcomingmov1.data.results;
		let upcomingmov2Ren		= upcomingmov2.data.results;

		if (upcomingmov2Ren.length > 0){
			for (var i=0;i<upcomingmov2Ren.length;i++){
				upcomingmov1Ren.push(upcomingmov2Ren[i]);
			}
		}

		res.render("movie/movie_upcoming",{upcomingmovData:upcomingmov1Ren});
	}))
	.catch(function(error){
		console.log(error);
	})	
}



module.exports.postMovieFavorite = (req,res) =>{
	let userID = req.user._id;
	let movieID = req.params.id;
	let genreArray = [];
	let mediaURL = "/movie/"+movieID;
	let isExist = false;

	User.findById(userID,(err,foundUser)=>{
		if(err || !foundUser){
			return res.redirect("/movie/"+movieID);
		}else{
			Favoritelist.findOne({user:userID,mediaID:movieID},(error,foundFavorite)=>{
				if(error){
					return res.redirect("/movie/"+movieID);


				}else if(!foundFavorite){
					axios.get(movie.getDetailUrl(movieID))
					.then((response)=>{
						let movieDetailData = response.data;
						for (let i =0;i<movieDetailData.genres.length;i++){
							genreArray.push(movieDetailData.genres[i].name)
						}
						let newFavoritelist = new Favoritelist ({
							user:userID,
							mediaID:movieID,
							mediaName:movieDetailData.title,
							mediaPoster:movieDetailData.poster_path,
							mediaBackdrop:movieDetailData.backdrop_path,
							mediaOverview:movieDetailData.overview,
							mediaTagline:movieDetailData.tagline,
							mediaVoteAverage:movieDetailData.vote_average,
							mediaRuntime:movieDetailData.runtime,
							mediaReleaseDate:movieDetailData.release_date,
							mediaType:"movie",
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
					Favoritelist.findOneAndDelete({user:userID,mediaID:movieID},(err,favoritelist)=>{
						if(err){
							return res.redirect("/movie/"+movieID);
						}else{
							res.send(isExist)
						}
					})
				}
			})
		}
	})
}





module.exports.getMovieFavorite = (req,res) =>{
	let userID = req.user._id;
	let movieID = req.params.id;
	let isExist = true;
	User.findById(userID,(err,foundUser)=>{	
		if(err||!foundUser){
			return res.redirect("/movie/"+movieID);
		}else{
			Favoritelist.findOne({user:userID,mediaID:movieID},(error,foundFavorite)=>{
				if(error){
					return res.redirect("/movie/"+movieID);
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



module.exports.postMovieWatchlist = (req,res) =>{
	let userID = req.user._id;
	let movieID = req.params.id;
	let genreArray = [];
	let mediaURL = "/movie/"+movieID;
	let isExist = false;

	User.findById(userID,(err,foundUser)=>{
		if(err || !foundUser){
			return res.redirect("/movie/"+movieID);
		}else{
			Watchlist.findOne({user:userID,mediaID:movieID},(error,foundWatchlist)=>{
				if(error){
					return res.redirect("/movie/"+movieID);


				}else if(!foundWatchlist){
					axios.get(movie.getDetailUrl(movieID))
					.then((response)=>{
						let movieDetailData = response.data;
						for (let i =0;i<movieDetailData.genres.length;i++){
							genreArray.push(movieDetailData.genres[i].name)
						}
						let newWatchlist = new Watchlist ({
							user:userID,
							mediaID:movieID,
							mediaName:movieDetailData.title,
							mediaPoster:movieDetailData.poster_path,
							mediaBackdrop:movieDetailData.backdrop_path,
							mediaOverview:movieDetailData.overview,
							mediaTagline:movieDetailData.tagline,
							mediaVoteAverage:movieDetailData.vote_average,
							mediaRuntime:movieDetailData.runtime,
							mediaReleaseDate:movieDetailData.release_date,
							mediaType:"movie",
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
					Watchlist.findOneAndDelete({user:userID,mediaID:movieID},(err,watchlist)=>{
						if(err){
							return res.redirect("/movie/"+movieID);
						}else{
							res.send(isExist)
						}
					})
				}
			})
		}
	})
}


module.exports.getMovieWatchlist = (req,res) =>{
	let userID = req.user._id;
	let movieID = req.params.id;
	let isExist = true;
	User.findById(userID,(err,foundUser)=>{	
		if(err||!foundUser){
			return res.redirect("/movie/"+movieID);
		}else{
			Watchlist.findOne({user:userID,mediaID:movieID},(error,foundWatchlist)=>{
				if(error){
					return res.redirect("/movie/"+movieID);
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
	var movieID = req.params.id;
	axios.get(movie.getTrailerVideo(movieID))
		.then(function(response){
			//console.log(response.data.results)
			res.send(response.data.results);
		})
		.catch(function(error){
			console.log(error)
		})
}

module.exports.getCollection=function(req,res){
	var collectionID = req.params.collectID;
	axios.get(movie.getCollectionData(collectionID))
		.then(function(response){
			var detailCollectionData = response.data;
			//console.log(detailCollectionData);
			res.render("movie/movie_collection",{detailCollectionData:detailCollectionData});
			
		})
		.catch(function(error){
			console.log(error)
		})
}

module.exports.postMovieComment = function(req,res){
	var movieID  = req.params.id;
	var userID   = req.user._id;
	var username = req.user.username;
	var commentTxt = req.body.comment;
	var mediaURL = "/movie/"+movieID;

	if(commentTxt != null){
		var newComment = new Comment({
			media_id:movieID,
			media_type:"movie",
			text:commentTxt,
			author:{
				id:userID,
				username:username
			},
			postedAt:Date.now()
		})

		newComment.save(function(err){
			if(err){
				console.log(err)
			}else{
				console.log("comment saved")
			}
		})

		var newLog = new Log({
			user:userID,
			action:"POST",
			created:Date.now(),
			category:"comment",
			mediaType:"movie",
			mediaID:movieID,
			mediaURL:mediaURL,
			message:"Post comment to movie"
		})

		newLog.save(function(err){
			if(err){
				console.log(err);
			}else{
				console.log("Log saved");
			}
		})


		res.send(newComment);
		}
}

module.exports.getMovieComment = function(req,res){
	var movieID = req.params.id;
	Comment.find({media_id:movieID,media_type:"movie"},function(err,foundComment){
		if(err){
			console.log(err)
		}else{
			res.send(foundComment);
		}
	})
}



module.exports.postMovieCommentLike = async (req,res) =>{
	let movieID = req.params.id;
	let commentID = req.params.commentID;
	let userID = req.user._id;
	let mediaURL = "/movie/"+movieID;

	try {
		let foundComment = await Comment.findById(commentID).exec()
		let checkLike = (foundComment.like).includes(userID);
		if (checkLike){
			(foundComment.like).pull(userID);
		}else{
			(foundComment.like).push(userID);
		}

		let saveComment = await foundComment.save();
		res.send(saveComment)

	}
	catch(err){
		console.log(err)
	}
}

/*module.exports.getMovieCommentLike = function(req,res){
	var movieID = req.params.id;
	var commentID = req.params.commentID;
	Comment.find({media_id:movieID,media_type:"movie",_id:commentID})
		.populate('like','username')
		.exec(function(err,comment){
			if(err){
				console.log(err)
			}
			//console.log(comment[0].like)
			var likeArray = comment[0].like;
			var likeUserArray = [];
			//console.log(likeArray);
			for (var i=0;i<likeArray.length;i++){
				likeUserArray.push(likeArray[i].username);
			}
			//res.send(likeUserArray);
			res.send(likeArray);
		})
}*/

module.exports.getMovieCommentLike = async (req,res) =>{
	let movieID = req.params.id;
	let commentID = req.params.commentID;
	try{
		let comment = await Comment.find({media_id:movieID,media_type:"movie",_id:commentID}).populate('like','username').exec();
		let likeArray = comment[0].like;
		let likeUserArray = [];
		for (let i=0;i<likeArray.length;i++){
			likeUserArray.push(likeArray[i].username);
		}
		res.send(likeArray)
	}
	catch(err){
		console.log(err)
	}
}


module.exports.deleteMovieComment = async (req,res) =>{
	let commentID = req.params.commentID;
	let movieID = req.params.id;
	let userID = req.user._id;
	let mediaURL = "/movie/"+movieID;	

	try {
		await Comment.findOneAndDelete({_id:commentID})
	}
	catch(err){
		console.log(err)
	}
}

module.exports.editMovieComment = async (req,res) =>{
	let commentID = req.params.commentID;
	let commentText = req.body.comment;
	let movieID = req.params.id;
	let userID = req.user._id;
	let mediaURL = "/movie/"+movieID;
	try{
		//await Comment.findOneAndUpdate({_id:commentID},{$set:{text:commentText,edited:true}},{new: true})
		await Comment.findOneAndUpdate({_id:commentID},{$set:{text:commentText,edited:true}},{useFindAndModify: false})
	}
	catch(error){
		console.log(error)
	}
}


