var axios = require ("axios"),
	cheerio = require("cheerio");
var rank = require ("../movieapi/rank");


module.exports.getImdbRank = function(req,res){
	axios.get(rank.getImdbRankUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var imdbData = [];
			$("table.chart > tbody.lister-list >tr").each(function(i,el){

				var img = $(el)
				.find("td.posterColumn")
				.find("a")
				.find("img")
				.attr("src");

				var name = $(el)
				.find("td.titleColumn")
				.find("a")
				.text();

				var year = $(el)
				.find("td.titleColumn")
				.find("span.secondaryInfo")
				.text()
				.replace(/[()]/g, '');

				var url = "https://www.imdb.com"+$(el)
				.find("td.titleColumn")
				.find("a")
				.attr("href")

				var rating = $(el)
				.find("td.ratingColumn")
				.find("strong")
				.text()
				.trim();

				var tableRow = {name,year,rating,img,url}
				imdbData.push(tableRow);

			})
		}
		
	res.render("rank/imdb",{imdbData:imdbData})

	})
	.catch(function(err){
		console.log(err);
	})
}


module.exports.getImdbTopMovie = function(req,res){
	axios.get(rank.getImdbTopMovieUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var imdbData = [];
			$("table.chart > tbody.lister-list >tr").each(function(i,el){

				var img = $(el)
				.find("td.posterColumn")
				.find("a")
				.find("img")
				.attr("src");

				var name = $(el)
				.find("td.titleColumn")
				.find("a")
				.text();

				var year = $(el)
				.find("td.titleColumn")
				.find("span.secondaryInfo")
				.text()
				.replace(/[()]/g, '');

				var url = "https://www.imdb.com"+$(el)
				.find("td.titleColumn")
				.find("a")
				.attr("href")

				var rating = $(el)
				.find("td.ratingColumn")
				.find("strong")
				.text()
				.trim();

				var tableRow = {name,year,rating,img,url}
				imdbData.push(tableRow);

			})

			//console.log(imdbData);

		}
		
	res.send(imdbData)

	})
	.catch(function(err){
		console.log(err);
	})	
}


module.exports.getImdbLowestMovie = function(req,res){
	axios.get(rank.getImdbLowestMovieUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var imdbData = [];
			$("table.chart > tbody.lister-list >tr").each(function(i,el){

				var img = $(el)
				.find("td.posterColumn")
				.find("a")
				.find("img")
				.attr("src");

				var name = $(el)
				.find("td.titleColumn")
				.find("a")
				.text();

				var year = $(el)
				.find("td.titleColumn")
				.find("span.secondaryInfo")
				.text()
				.replace(/[()]/g, '');

				var url = "https://www.imdb.com"+$(el)
				.find("td.titleColumn")
				.find("a")
				.attr("href")

				var rating = $(el)
				.find("td.ratingColumn")
				.find("strong")
				.text()
				.trim();

				var tableRow = {name,year,rating,img,url}
				imdbData.push(tableRow);

			})

			res.send(imdbData)

		}
		

	})
	.catch(function(err){
		console.log(err);
	})	
}

module.exports.getImdbPopularMovie=function(req,res){
	axios.get(rank.getImdbPopularMovieUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var imdbData = [];
			$("table.chart > tbody.lister-list >tr").each(function(i,el){

				var img = $(el)
				.find("td.posterColumn")
				.find("a")
				.find("img")
				.attr("src");

				var name = $(el)
				.find("td.titleColumn")
				.find("a")
				.text();

				var year = $(el)
				.find("td.titleColumn")
				.find("span.secondaryInfo").first()
				.text()
				.replace(/[()]/g, '');

				var url = "https://www.imdb.com"+$(el)
				.find("td.titleColumn")
				.find("a")
				.attr("href")

				var rating = $(el)
				.find("td.ratingColumn")
				.find("strong")
				.text()
				.trim();

				var tableRow = {name,year,rating,img,url}
				imdbData.push(tableRow);

			})

			res.send(imdbData)

		}
		

	})
	.catch(function(err){
		console.log(err);
	})	
}

module.exports.getImdbTopTv = function(req,res){
	axios.get(rank.getImdbTopTvUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var imdbData = [];
			$("table.chart > tbody.lister-list >tr").each(function(i,el){

				var img = $(el)
				.find("td.posterColumn")
				.find("a")
				.find("img")
				.attr("src");

				var name = $(el)
				.find("td.titleColumn")
				.find("a")
				.text();

				var year = $(el)
				.find("td.titleColumn")
				.find("span.secondaryInfo").first()
				.text()
				.replace(/[()]/g, '');

				var url = "https://www.imdb.com"+$(el)
				.find("td.titleColumn")
				.find("a")
				.attr("href")

				var rating = $(el)
				.find("td.ratingColumn")
				.find("strong")
				.text()
				.trim();

				var tableRow = {name,year,rating,img,url}
				imdbData.push(tableRow);

			})

			res.send(imdbData)

		}
		

	})
	.catch(function(err){
		console.log(err);
	})
}

module.exports.getImdbPopularTv = function(req,res){
	axios.get(rank.getImdbPopularTvUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var imdbData = [];
			$("table.chart > tbody.lister-list >tr").each(function(i,el){

				var img = $(el)
				.find("td.posterColumn")
				.find("a")
				.find("img")
				.attr("src");

				var name = $(el)
				.find("td.titleColumn")
				.find("a")
				.text();

				var year = $(el)
				.find("td.titleColumn")
				.find("span.secondaryInfo").first()
				.text()
				.replace(/[()]/g, '');

				var url = "https://www.imdb.com"+$(el)
				.find("td.titleColumn")
				.find("a")
				.attr("href")

				var rating = $(el)
				.find("td.ratingColumn")
				.find("strong")
				.text()
				.trim();

				var tableRow = {name,year,rating,img,url}
				imdbData.push(tableRow);

			})

			res.send(imdbData)

		}
		

	})
	.catch(function(err){
		console.log(err);
	})
}

module.exports.getRottenTomatoes = (req,res) =>{
	axios.get(rank.getRottenTomatoesChart())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var rottenData = [];
			$("table.table > tbody >tr").each(function(i,el){

				let tds = $(el).find("td");
				let score = $(tds[1]).find("span.tMeterIcon.tiny").find("span.tMeterScore").text();
				let name = $(tds[2]).find("a").text().trim();
				let url = "https://www.rottentomatoes.com"+$(tds[2]).find("a").attr("href")
				let reviews =  $(tds[3]).text().trim();
				let data = {name,score,url,reviews}
				rottenData.push(data);
			})

			res.render("rank/rottentomatoes",{rottenData:rottenData})

		}
		

	})
	.catch(function(err){
		console.log(err);
	})
}

module.exports.getRottenTomatoesByYear = (req,res) =>{
	var year = req.params.year;
	axios.get(rank.getRottenTomatoesChart(year))
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var rottenData = [];
			$("table.table > tbody >tr").each(function(i,el){

				let tds = $(el).find("td");
				let score = $(tds[1]).find("span.tMeterIcon.tiny").find("span.tMeterScore").text();
				let name = $(tds[2]).find("a").text().trim();
				let url = "https://www.rottentomatoes.com"+$(tds[2]).find("a").attr("href")
				let reviews =  $(tds[3]).text().trim();
				let data = {name,score,url,reviews}
				rottenData.push(data);
			})

			res.send(rottenData)

		}
		
	})
	.catch(function(err){
		console.log(err);
	})
}

module.exports.getMetacritic = (req,res) =>{
	axios.get(rank.getMetacriticChart())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var metaData = [];
			$("table.clamp-list > tbody >tr:not(.spacer)").each(function(i,el){
				let tds = $(el).find("td");
				let img = $(tds[0]).find("a").find("img").attr("src");
				let name = $(tds[1]).find("a.title").find("h3").text().trim();
				let url = "https://www.metacritic.com"+$(tds[1]).find("a.title").attr("href");
				let date = $(tds[1]).find("div.clamp-details").find("span:first-child").text();
				let metascore = $(tds[1]).find("div.browse-score-clamp").find("div.clamp-metascore").find("a").find("div").text();
				let userscore = $(tds[1]).find("div.browse-score-clamp").find("div.clamp-userscore").find("a").find("div").text();
				let data = {name,url,img,date,metascore,userscore}
				metaData.push(data)

			})

			res.render("rank/metacritic",{metaData:metaData})

		}
		

	})
	.catch(function(err){
		console.log(err);
	})	
}