var axios = require ("axios");

module.exports.getSearchData = function(query){
	//return axios.get("https://api.themoviedb.org/3/search/multi?api_key="+process.env.API+"&language=en-US&query="+query+"&page=1&include_adult=false")
	var url =  "https://api.themoviedb.org/3/search/multi?api_key="+process.env.API+"&language=en-US&query="+query+"&page=1&include_adult=false"
	return url;
}

