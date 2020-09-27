var movie = require ("../movieapi/movie");
var tv = require ("../movieapi/tv");
var axios = require("axios")

module.exports.getMovieDiscover = (req,res) =>{
	axios.all([movie.getDiscoverMovieDefault(),movie.getGenres()])
	.then(axios.spread(function(movieRes,genresRes){
		let movieData = movieRes.data.results;
		let genresData = genresRes.data.genres;
		res.render("discover/movie",{movie:movieData,genres:genresData})
	}))
	.catch(function(error){
		console.log(error)
	})
}


module.exports.getTvDiscover =(req,res) =>{
	axios.all([tv.getDiscoverTVDefault(),tv.getGenres()])
	.then(axios.spread(function(tvRes,genresRes){
		let tvData = tvRes.data.results;
		let genresData = genresRes.data.genres;
		res.render("discover/tv",{tv:tvData,genres:genresData})
	}))
	.catch(function(error){
		console.log(error)
	})
}



module.exports.postMovieDiscover = (req,res) =>{
	var filter = req.body.filter;
	axios.get(movie.getDiscoverMovie(filter))
	.then((response)=>{
		var data = response.data.results;
		var resultArr = [];
		for (let i=0;i<data.length;i++){
			if(data[i].poster_path != null){
				data[i].poster = "https://image.tmdb.org/t/p/w500/"+data[i].poster_path;
				resultArr.push(data[i])
			}
		}
		res.send(resultArr);
	})
	.catch((error)=>{
		console.log(error)
	})
}

module.exports.postTvDiscover = (req,res) =>{
	var filter = req.body.filter;
	axios.get(tv.getDiscoverTV(filter))
	.then((response)=>{
		var data = response.data.results;
		var resultArr = [];
		for (let i=0;i<data.length;i++){
			if(data[i].poster_path != null){
				data[i].poster = "https://image.tmdb.org/t/p/w500/"+data[i].poster_path;
				resultArr.push(data[i])
			}
		}
		res.send(resultArr);
	})
	.catch((error)=>{
		console.log(error)
	})
}