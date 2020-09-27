var axios = require ("axios");
var keyword = require("../movieapi/keyword");

module.exports.getKeywordMovie = function(req, res){
	let keywordID = req.params.id;
	let keywordName;

	axios.all([keyword.getMovie(keywordID,1),keyword.getMovie (keywordID,2),keyword.getKeywordName(keywordID)])
		.then (axios.spread(function(keywordmov,keywordmov2,keywordname){
			let keywordmovRen 	= keywordmov.data.results;
			let keywordmovRen2 	= keywordmov2.data.results;
			let keywordnameRen 	= keywordname.data;

			if (keywordmovRen2.length > 0){
				for (let i=0;i<keywordmovRen2.length;i++){
					keywordmovRen.push(keywordmovRen2[i]);
				}
			}
			//console.log(keywordmovRen.length);
			res.render("movie/movie_keyword",{keywordmovData:keywordmovRen,keywordnameData:keywordnameRen});
		}))
		.catch(function(error){
			console.log(error);
		})	
	
}

module.exports.getKeywordTV = function(req, res){
	let keywordID = req.params.id;
	let keywordName;
	axios.all([keyword.getTV (keywordID,1),keyword.getKeywordName(keywordID)])
		.then (axios.spread(function(keywordtv,keywordname){
			let keywordtvRen 	= keywordtv.data.results;
			let keywordnameRen 	= keywordname.data;

			res.render("tv/tv_keyword",{keywordtvData:keywordtvRen,keywordnameData:keywordnameRen});
		}))
		.catch(function(error){
			console.log(error);
		})
}