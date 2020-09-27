var axios = require ("axios");

module.exports.getMovie = function(keywordID,pageNum){
	return axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+process.env.API+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+pageNum+"&with_keywords="+keywordID);
}

module.exports.getTV = function(keywordID,pageNum){
	return axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+process.env.API+"&language=en-US&sort_by=popularity.desc&page="+pageNum+"&include_null_first_air_dates=false&with_keywords="+keywordID);
}

module.exports.getKeywordName = function(keywordID){
	return axios.get("https://api.themoviedb.org/3/keyword/"+keywordID+"?api_key="+process.env.API);
}