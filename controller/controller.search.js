var axios = require ("axios");
var search = require ("../movieapi/search");


module.exports.getSearch=function(req,res){
	let queryInput =req.params.query;
	axios.get(search.getSearchData(queryInput))
		.then(function(response){
			//console.log(response.data)
			dataRes = response.data.results
			dataArr = []

			for(let i=0;i<dataRes.length;i++){
				if (dataRes[i].media_type == "tv" || dataRes[i].media_type == "movie"){
					dataArr.push(dataRes[i])
				}
			}
			res.send(dataArr);
		})
		.catch(function(error){
			console.log(error)
		})
}