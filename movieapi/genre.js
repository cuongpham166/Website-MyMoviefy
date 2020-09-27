var axios = require ("axios");

module.exports.getMovie = function(genreID,pageNum){
	return axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+process.env.API+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+pageNum+"&with_genres="+genreID);
}

module.exports.getTV = function(genreID,pageNum){
	return axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+process.env.API+"&language=en-US&sort_by=popularity.desc&page="+pageNum+"&with_genres="+genreID+"&include_null_first_air_dates=false");
}

module.exports.getGenreTV = function(){
	return axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key="+process.env.API+"&language=en-US");
}

module.exports.getGenreMovie = function(){
	return axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+process.env.API);
}