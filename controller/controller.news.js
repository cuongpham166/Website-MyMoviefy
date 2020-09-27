var axios = require ("axios"),
	cheerio = require("cheerio");
var news = require ("../movieapi/news");

module.exports.getTopNews = function(req,res){
	axios.get(news.getTopNewsUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);
			let newsUrl = [];
			let newsImg = [];
			let newsTitle = [];
			let newsDate = [];

			$("div.col-sm-8.newsItem.col-full-xs").each(function(i,el){
				var url = $(el)
				.find("a")
				.attr("href");

				var img = $(el)
				.find("a")
				.find("div.editorialColumnPic")
				.find("img")
				.attr("src");

				var title = $(el)
				.find("a")
				.find("div.panel.bannerCaption")
				.find("div.panel-body")
				.find("p.noSpacing.title")
				.text();

				var date = $(el)
				.find("a")
				.find("div.panel.bannerCaption")
				.find("div.panel-body")
				.find("p.noSpacing.publication-date")
				.text();


				newsUrl.push(url)
				newsImg.push(img);
				newsTitle.push(title);
				newsDate.push(date);

			})
			
			var topNews = [];
			for(var i=0;i<newsUrl.length;i++){
				topNews[i]={
					title:newsTitle[i],
					img:newsImg[i],
					url:newsUrl[i],
					date:newsDate[i]
				}
			}
		}
		res.send(topNews)
	})
	.catch(function(err){
		console.log(err);
	})

}

module.exports.getMovieNews = function(req,res){
	axios.get(news.getMovieNewsUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);
			let newsTitle = [];
			let newsText = [];
			let newsUrl = [];
			let newsAuthor = [];
			let newsAuthorUrl = [];

			$("article").slice(1).each(function(i,el){
				var title = $(el)
				.find("div.news-item-text")
				.find("h3.news-item-title")
				.find("a")
				.text();

				var text = $(el)
				.find("div.news-item-text")
				.find("p.news-item-summary")
				.text();

				var url = $(el)
				.find("a")
				.attr("href");

				var author = $(el)
				.find("div.news-item-text")
				.find("a.news-item-author")
				.text();

				var authorUrl = $(el)
				.find("div.news-item-text")
				.find("a.news-item-author")
				.attr("href");

				newsTitle.push(title)
				newsText.push(text)
				newsUrl.push("https://movieweb.com"+url);
				newsAuthor.push(author);
				newsAuthorUrl.push("https://movieweb.com"+authorUrl);
			})

			var movieNews = [];
			var length = newsTitle.length;
				for(var i=0;i<length;i++){
					movieNews[i]={
						title:newsTitle[i],
						text:newsText[i],
						url:newsUrl[i],
						author:newsAuthor[i],
						authorUrl:newsAuthorUrl[i]
					}

				}
		}
		res.send(movieNews);

	})
	.catch(function(err){
		console.log(err);
	})	
}

module.exports.getTVNews = function(req,res){
	axios.get(news.getTVNewsUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);
			let newsTitle = [];
			let newsText = [];
			let newsUrl = [];
			let newsAuthor = [];
			let newsAuthorUrl = [];

			$("article").slice(1).each(function(i,el){
				var title = $(el)
				.find("div.news-item-text")
				.find("h3.news-item-title")
				.find("a")
				.text();

				var text = $(el)
				.find("div.news-item-text")
				.find("p.news-item-summary")
				.text();

				var url = $(el)
				.find("a")
				.attr("href");

				var author = $(el)
				.find("div.news-item-text")
				.find("a.news-item-author")
				.text();

				var authorUrl = $(el)
				.find("div.news-item-text")
				.find("a.news-item-author")
				.attr("href");

				newsTitle.push(title)
				newsText.push(text)
				newsUrl.push("https://movieweb.com"+url);
				newsAuthor.push(author);
				newsAuthorUrl.push("https://movieweb.com"+authorUrl);
			})

			var tvNews = [];
			var length = newsTitle.length;
				for(var i=0;i<length;i++){
					tvNews[i]={
						title:newsTitle[i],
						text:newsText[i],
						url:newsUrl[i],
						author:newsAuthor[i],
						authorUrl:newsAuthorUrl[i]
					}

				}
		}
		res.send(tvNews);

	})
	.catch(function(err){
		console.log(err);
	})	
}

module.exports.getNews = function(req,res){
	axios.all([news.getTopNews(),news.getMovieNews(),news.getTVNews()])
	.then(axios.spread(function(topnews,movienews,tvnews){
		let topNews		= topnews.data;
		let movieNews		= movienews.data;
		let tvNews = tvnews.data;

		res.render("news/news",{topNews:topNews,movieNews:movieNews,tvNews:tvNews})
	}))
	.catch(function(error){
		console.log(error);
	})	
}

module.exports.getHeadlines = function(req,res){
	axios.get(news.getHeadlinesUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			let newsWebsiteUrl = [];
			let newsWebsiteName = [];
			let newsTitle = [];
			let newsUrl = [];
			let newsDate = [];

			$("div.publication-row").each(function(i,el){
				var websiteUrl = $(el)
				.find("a.unstyled.bold")
				.attr("href");

				var websiteName = $(el)
				.find("a.unstyled.bold")
				.text();

				var title = $(el)
				.find("h3.noSpacing.nomargin")
				.find("a")
				.text();

				var url = $(el)
				.find("h3.noSpacing.nomargin")
				.find("a")
				.attr("href");				

				var date = $(el)
				.find("div.subtle.small")
				.text();

				newsWebsiteUrl.push("https://www.rottentomatoes.com"+websiteUrl);
				newsWebsiteName.push(websiteName)
				newsTitle.push(title)
				newsUrl.push(url);
				newsDate.push(date);

				
			})
			
			var newsHeadlines = [];
			for(var i=0;i<newsUrl.length;i++){
				newsHeadlines[i]={
					websiteUrl:newsWebsiteUrl[i],
					websiteName:newsWebsiteName[i],
					title:newsTitle[i],
					url:newsUrl[i],
					date:newsDate[i]
				}
			}

		}
		res.render("news/headlines",{newsHeadlines:newsHeadlines});

	})
	.catch(function(err){
		console.log(err);
	})
}

module.exports.getRoundup = function(req,res){
	axios.get(news.getRoundupUrl())
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			let newsTitle = [];
			let newsUrl = [];
			let newsDate = [];
			let newsImg = [];

			$("div.col-sm-8.newsItem.col-full-xs").each(function(i,el){
				var url = $(el)
				.find("a.unstyled.articleLink")
				.attr("href");

				var img = $(el)
				.find("a.unstyled.articleLink")
				.find("div.editorialColumnPic")
				.find("img")
				.attr("src");
				
				var title = $(el)
				.find("a.unstyled.articleLink")
				.find("div.panel.bannerCaption")
				.find("div.panel-body")
				.find("p.noSpacing.title")
				.text()


				var date = $(el)
				.find("a.unstyled.articleLink")
				.find("div.panel.bannerCaption")
				.find("div.panel-body")
				.find("p.noSpacing.publication-date")
				.text()

				newsUrl.push(url);
				newsImg.push(img);
				newsTitle.push(title);
				newsDate.push(date);

				
			})
			
			var roundupData = [];
			for(var i=0;i<newsUrl.length;i++){
				roundupData[i]={
					title:newsTitle[i],
					url:newsUrl[i],
					date:newsDate[i],
					img:newsImg[i]
				}
			}
		}
		
	res.send(roundupData);

	})
	.catch(function(err){
		console.log(err);
	})
}


module.exports.getWeeklyRoundup = function(req,res){
	axios.all([news.getRoundup(),news.getMovieNews(),news.getTVNews()])
	.then(axios.spread(function(roundup,movienews,tvnews){
		let weeklyRoundup		= roundup.data;
		let movieNews		= movienews.data;
		let tvNews = tvnews.data;

		res.render("news/roundup",{weeklyRoundup:weeklyRoundup,movieNews:movieNews,tvNews:tvNews})
	}))
	.catch(function(error){
		console.log(error);
	})	
}


module.exports.getBoxOffice = function(req,res){
	axios.get(news.getBoxOffice()) //Worldwide Box Office
	.then(function(response){
		if(response.status === 200){
			var html = response.data;
			var $ = cheerio.load(html);

			var boxofficeData = [];
			var scrapedData = [];

			$("#table > div > table> tbody > tr").each(function(i,el){
				const tds = $(el).find("td");
				const rank = i;
				const name = $(tds[1]).text();
				const worldwide = $(tds[2]).text();
				const domestic = $(tds[3]).text();
				const percent1 =  $(tds[4]).text();
				const foreign = $(tds[5]).text();
				const percent2 = $(tds[6]).text();
				const url = "https://www.boxofficemojo.com"+$(tds[1]).find("a").attr("href");
				const tableRow = {rank,name,url,worldwide,domestic,percent1,foreign,percent2};
				scrapedData.push(tableRow);
				//console.log(url);
			})
			
			scrapedData.shift();
			boxofficeData = scrapedData;
		}
		res.render("news/boxoffice",{boxofficeData:boxofficeData})

	})
	.catch(function(err){
		console.log(err);
	})
	
}