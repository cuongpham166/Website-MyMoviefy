var axios = require ("axios");

module.exports.getTopNewsUrl = function(){
	var url ="http://editorial.rottentomatoes.com/news/"
	return url;
}


module.exports.getMovieNewsUrl = function(){
	var url = "https://movieweb.com/movie-news/";
	return url;
}

module.exports.getTVNewsUrl = function(){
	var url = "https://movieweb.com/tv-news/";
	return url;
}

module.exports.getHeadlinesUrl = function(){
	var url = "https://editorial.rottentomatoes.com/publications/";
	return url;
}

module.exports.getRoundupUrl = function(){
	var url = "https://editorial.rottentomatoes.com/weekly-ketchup/";
	return url;
}

module.exports.getBoxOffice = function(){
	var url = "https://www.boxofficemojo.com/year/world/2020/";
	return url;
}

module.exports.getTopNews = function(){
	return axios.get("http://localhost:3000/news/top")
}

module.exports.getMovieNews = function(){
	return axios.get("http://localhost:3000/news/movie")
}

module.exports.getTVNews = function(){
	return axios.get("http://localhost:3000/news/tv")
}

module.exports.getRoundup = function(){
	return axios.get("http://localhost:3000/news/roundup")
}