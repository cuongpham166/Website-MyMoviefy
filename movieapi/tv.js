var axios = require ("axios");

module.exports.getPopular = function(pageNum){
	return axios.get("https://api.themoviedb.org/3/tv/popular?api_key="+process.env.API+"&language=en-US&page="+pageNum);
}


module.exports.getListTopRatedTVUrl = () =>{
	let url = "https://api.themoviedb.org/3/tv/top_rated?api_key="+process.env.API+"&language=en-US&page=1";
	return url;
}

module.exports.getListPopularTVUrl = () =>{
	let url = "https://api.themoviedb.org/3/tv/popular?api_key="+process.env.API+"&language=en-US&page=1";
	return url;
}

module.exports.getListTrendingTVUrl = () =>{
	let url = "https://api.themoviedb.org/3/trending/tv/week?api_key="+process.env.API;
	return url;
}

module.exports.getAiringToday = function(pageNum){
	return axios.get("https://api.themoviedb.org/3/tv/airing_today?api_key="+process.env.API+"&language=en-US&page="+pageNum);
}

module.exports.getOnTheAir = function(pageNum){
	return axios.get("https://api.themoviedb.org/3/tv/on_the_air?api_key="+process.env.API+"&language=en-US&page="+pageNum);
}

module.exports.getTopRated = function(pageNum){
	return axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key="+process.env.API+"&language=en-US&page="+pageNum);
}

module.exports.getTrending = function(){
	return axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key="+process.env.API);
}

module.exports.getDetail = function(tvID){
	return axios.get("https://api.themoviedb.org/3/tv/"+tvID+"?api_key="+process.env.API+"&language=en-US");
}

module.exports.getDiscoverTVDefault = () =>{
	return axios.get ("https://api.themoviedb.org/3/discover/tv?api_key="+process.env.API+"&language=en-US&sort_by=popularity.desc&page=1&include_null_first_air_dates=false");
}

module.exports.getDiscoverTV = (filter) =>{
	var url = "https://api.themoviedb.org/3/discover/tv?api_key="+process.env.API+"&language=en-US"+filter+"&page=1&include_null_first_air_dates=false"
	return url;
}

module.exports.getGenres = ()=>{
	return axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key="+process.env.API+"&language=en-US")
}

module.exports.getKeyword = function(tvID){
	return axios.get ("https://api.themoviedb.org/3/tv/"+tvID+"/keywords?api_key="+process.env.API);
}

module.exports.getCredits = function(tvID){
	return axios.get ("https://api.themoviedb.org/3/tv/"+tvID+"/credits?api_key="+process.env.API+"&language=en-US");
}

module.exports.getReview = function(tvID){
	return axios.get ("https://api.themoviedb.org/3/tv/"+tvID+"/reviews?api_key="+process.env.API+"&language=en-US&page=1");
}

module.exports.getSimilar = function(tvID){
	return axios.get ("https://api.themoviedb.org/3/tv/"+tvID+"/similar?api_key="+process.env.API+"&language=en-US&page=1");
}

module.exports.getSeason = function(tvID){
	return axios.get("https://api.themoviedb.org/3/tv/"+tvID+"?api_key="+process.env.API+"&language=en-US")
}

module.exports.getSeasonDetail = function(tvID,seasonNum){
	return axios.get("https://api.themoviedb.org/3/tv/"+tvID+"/season/"+seasonNum+"?api_key="+process.env.API+"&language=en-US");
}

module.exports.getSeasonCredit = function(tvID, seasonNum){
	return axios.get("https://api.themoviedb.org/3/tv/"+tvID+"/season/"+seasonNum+"/credits?api_key="+process.env.API+"&language=en-US");
}

module.exports.getDetailUrl = function(tvID){
	var url = "https://api.themoviedb.org/3/tv/"+tvID+"?api_key="+process.env.API+"&language=en-US";
	return url;
}


module.exports.getTrailerVideo = function(tvID){
	var url = "https://api.themoviedb.org/3/tv/"+tvID+"/videos?api_key="+process.env.API+"&language=en-US"
	return url;
}