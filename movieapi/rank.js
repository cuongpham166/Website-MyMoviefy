var axios = require ("axios");

module.exports.getImdbRankUrl = function(){
	var url = "https://www.imdb.com/chart/top?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=4da9d9a5-d299-43f2-9c53-f0efa18182cd&pf_rd_r=AXYXN4QHFG89DKJ3SVXG&pf_rd_s=right-4&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_ql_3"
	return url;
}

module.exports.getImdbTopMovieUrl = function(){
	var url = "https://www.imdb.com/chart/top?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=4da9d9a5-d299-43f2-9c53-f0efa18182cd&pf_rd_r=AXYXN4QHFG89DKJ3SVXG&pf_rd_s=right-4&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_ql_3"
	return url;
}

module.exports.getImdbLowestMovieUrl = function(){
	var url = "https://www.imdb.com/chart/bottom?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=4da9d9a5-d299-43f2-9c53-f0efa18182cd&pf_rd_r=07H8G9ZZJV6RBGED8ZK1&pf_rd_s=right-4&pf_rd_t=15506&pf_rd_i=bottom&ref_=chtbtm_ql_8"
	return url;
}

module.exports.getImdbPopularMovieUrl = function(){
	var url = "https://www.imdb.com/chart/moviemeter?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=4da9d9a5-d299-43f2-9c53-f0efa18182cd&pf_rd_r=RTPS227P3G504A8480R3&pf_rd_s=right-4&pf_rd_t=15506&pf_rd_i=bottom&ref_=chtbtm_ql_2";
	return url;
}

module.exports.getImdbTopTvUrl = function(){
	var url = "https://www.imdb.com/chart/toptv?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=4da9d9a5-d299-43f2-9c53-f0efa18182cd&pf_rd_r=R0JFC229XYCMD2F49ZD8&pf_rd_s=right-4&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_ql_6";
	return url;
}

module.exports.getImdbPopularTvUrl = function(){
	var url = "https://www.imdb.com/chart/tvmeter?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=4da9d9a5-d299-43f2-9c53-f0efa18182cd&pf_rd_r=D8ZENMDK4CS8BJRSNZWQ&pf_rd_s=right-4&pf_rd_t=15506&pf_rd_i=toptv&ref_=chttvtp_ql_5";
	return url;
}

module.exports.getRottenTomatoesChart = (year=2020) =>{
	var url ="https://www.rottentomatoes.com/top/bestofrt/?year="+year;
	return url;
}

module.exports.getMetacriticChart = () =>{
	var url = "https://www.metacritic.com/browse/movies/score/metascore/all/filtered?sort=desc"
	return url;
}