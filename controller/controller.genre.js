var axios = require ("axios");
var genre = require("../movieapi/genre");

module.exports.getGenreMovie = function(req, res){
	let genreID = req.params.id;
	let genreName;
	axios.all([genre.getMovie (genreID,1),genre.getGenreMovie(),genre.getMovie  (genreID,2)])
	.then(axios.spread(function(genremov,genrelist,genremov1){
		let genremovRen		= genremov.data.results;
		let genremovRen1	= genremov1.data.results;
		let genrelistRen 	= genrelist.data.genres;

		for (var i=0;i<genrelistRen.length;i++){
			if (genrelistRen[i].id == genreID){
				genreName = genrelistRen[i].name;
			}
		}

		if(genremovRen1.length > 0){
			for (var i=0;i<genremovRen1.length;i++){
				genremovRen.push(genremov1.data.results[i]);
			}	
		}


		res.render("movie/movie_genre",{genremovData:genremovRen,genreName:genreName});
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getGenreTV = function(req, res){
	let genreID = req.params.id;
	let genreName;
	axios.all([genre.getTV (genreID,1),genre.getGenreTV()])
	.then(axios.spread(function(genretv,genrelist,genretv1){
		let genretvRen		= genretv.data.results;
		let genrelistRen 	= genrelist.data.genres;

		//console.log(genretvRen);

		for (var i=0;i<genrelistRen.length;i++){
			if (genrelistRen[i].id == genreID){
				genreName = genrelistRen[i].name;
			}
		}


		res.render("tv/tv_genre",{genretvData:genretvRen,genreName:genreName});
	}))
	.catch(function(error){
		console.log(error);
	})	
}