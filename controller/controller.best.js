var movie = require ("../movieapi/movie");
var axios = require("axios")
var cheerio = require("cheerio")

module.exports.getBestMovie = (req,res) =>{
	let url;
	let title;
	let service = req.params.service;

	if(service == "hulu"){
		url = movie.getHuluUrl()
		title = "Hulu"
	}else if(service == "prime"){
		url = movie.getPrimeUrl()
		title = "Amazon Prime"
	}else if(service == "netflix"){
		url = movie.getNetflixUrl()
		title="Netflix"
	}else if (service == "itunes"){
		url = movie.getItunesUrl()
		title="iTunes"
	}else{
		url = movie.getNetflixUrl()
		title="Netflix"
	}

	axios.get(url)
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var bestData = [];
			$("table.clamp-list > tbody >tr:not(.spacer)").each(function(i,el){
				let tds = $(el).find("td");
				let img = $(tds[0]).find("a").find("img").attr("src");
				
				let name = $(tds[1]).find("a.title").find("h3").text().trim();
				let url = "https://www.metacritic.com"+$(tds[1]).find("a.title").attr("href");
				let date = $(tds[1]).find("div.clamp-details").find("span:first-child").text();
				let metascore = $(tds[1]).find("div.browse-score-clamp").find("div.clamp-metascore").find("a").find("div").text();
				let userscore = $(tds[1]).find("div.browse-score-clamp").find("div.clamp-userscore").find("a").find("div").text();
				let data = {name,url,img,date,metascore,userscore}
				bestData.push(data)

			})
			res.render("best/movie",{bestData:bestData,title:title})

		}
		

	})
	.catch(function(err){
		console.log(err);
	})

}