var axios = require ("axios");

module.exports.getUpcoming = function(pageNum){
	return axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key="+process.env.API+"&language=en-US&page="+pageNum);
}

module.exports.getPopular = function(pageNum){
	return axios.get("https://api.themoviedb.org/3/movie/popular?api_key="+process.env.API+"&language=en-US&page="+pageNum);
}


module.exports.getListTopRatedMovieUrl = () =>{
	let url = "https://api.themoviedb.org/3/movie/top_rated?api_key="+process.env.API+"&language=en-US&page=1";
	return url;
}

module.exports.getListPopularMovieUrl = () =>{
	let url = "https://api.themoviedb.org/3/movie/popular?api_key="+process.env.API+"&language=en-US&page=1";
	return url;
}

module.exports.getListTrendingMovieUrl = () =>{
	let url = "https://api.themoviedb.org/3/trending/movie/week?api_key="+process.env.API;
	return url;
}


module.exports.getGenres = function(){
	return axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+process.env.API);
}

module.exports.getDiscoverMovieDefault = () =>{
	return axios.get ("https://api.themoviedb.org/3/discover/movie?api_key="+process.env.API+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1");
}

module.exports.getDiscoverMovie = (filter) =>{
	var url = "https://api.themoviedb.org/3/discover/movie?api_key="+process.env.API+"&language=en-US"+filter+"&include_adult=false"
	return url;
}
module.exports.getDetail = function(movieID){
	return axios.get("https://api.themoviedb.org/3/movie/"+movieID+"?api_key="+process.env.API+"&language=en-US");
}

module.exports.getDetailUrl = function(movieID){
	var url = "https://api.themoviedb.org/3/movie/"+movieID+"?api_key="+process.env.API+"&language=en-US";
	return url;
}

module.exports.getKeyword = function(movieID){
	return axios.get ("https://api.themoviedb.org/3/movie/"+movieID+"/keywords?api_key="+process.env.API);
}

module.exports.getReview = function(movieID){
	return axios.get ("https://api.themoviedb.org/3/movie/"+movieID+"/reviews?api_key="+process.env.API+"&language=en-US&page=1");
}

module.exports.getSimilar = function(movieID){
	return axios.get ("https://api.themoviedb.org/3/movie/"+movieID+"/similar?api_key="+process.env.API+"&language=en-US&page=1");
}

module.exports.getCredits = function(movieID){
	return axios.get ("https://api.themoviedb.org/3/movie/"+movieID+"/credits?api_key="+process.env.API);
}

module.exports.getNowPlaying = function(pageNum){
	return axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key="+process.env.API+"&language=en-US&page="+pageNum);
}

module.exports.getTopRated = function(pageNum){
	return axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key="+process.env.API+"&language=en-US&page="+pageNum);
}

module.exports.getTrending = function(){
	return axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key="+process.env.API);
}

module.exports.getTrailerVideo = function(movieID){
	var url = "https://api.themoviedb.org/3/movie/"+movieID+"/videos?api_key="+process.env.API+"&language=en-US"
	return url;
}

module.exports.getCollectionData = function(collectionID){
	var url ="https://api.themoviedb.org/3/collection/"+collectionID+"?api_key="+process.env.API+"&language=en-US"
	return url;
}

module.exports.getMovieReview = function(movieID){
	return axios.get("http://localhost:3000/movie/"+movieID+"/comment");
}


module.exports.getMovieDetailUrl = (movieID) =>{
	var url = "https://api.themoviedb.org/3/movie/"+movieID+"?api_key="+process.env.API+"&language=en-US"
	return url;
}

module.exports.getImdbScoreUrl = (imdbID) =>{
	var url = "https://www.imdb.com/title/"+imdbID+"/?ref_=ttcrv_crv_tt";
	return url;
}

module.exports.getMetaScoreUrl = (imdbID) =>{
	var url = "https://www.imdb.com/title/"+imdbID+"/criticreviews?ref_=tt_ov_rt";
	return url;
}

module.exports.getImdbScore = (movieID) => {
	return axios.get("http://localhost:3000/movie/"+movieID+"/imdb");
}


module.exports.getMetaScore = (movieID) =>{
	return axios.get("http://localhost:3000/movie/"+movieID+"/metacritic");
}

module.exports.getNetflixUrl = () =>{
	var url = "https://www.metacritic.com/browse/movies/score/metascore/all/filtered/netflix?sort=desc";
	return url;
}

module.exports.getPrimeUrl = () =>{
	var url = "https://www.metacritic.com/browse/movies/score/metascore/all/filtered/piv?view=detailed";
	return url;
}

module.exports.getItunesUrl = () =>{
	var url = "https://www.metacritic.com/browse/movies/score/metascore/all/filtered/itunes";
	return url;
}

module.exports.getHuluUrl = () =>{
	var url = "https://www.metacritic.com/browse/movies/score/metascore/all/filtered/hulu";
	return url;
}