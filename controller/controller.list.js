var List = require ("../models/list");
var movie = require ("../movieapi/movie");
var tv = require("../movieapi/tv")
var axios = require ("axios");

module.exports.getList = (req,res) =>{
	userID = req.body.userID
	List.find({userID:userID},function(err,result){
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	})
}

module.exports.createList = (req,res) =>{
	let listName = req.body.list;
	let userID = req.user._id;
	
	let newList = new List ({
		name:listName,
		created:Date.now(),
		userID:userID,
	})

	newList.save(function(err){
		if(err){
			console.log(err)
		}else{
			console.log("saved")
		}
	});
	res.send(newList)
}

module.exports.addMovieList = (req,res) =>{
	listID = req.body.listID;
	movieID = req.body.movieID;

	axios.get(movie.getDetailUrl(movieID))
	.then((response)=>{
		let movieData = response.data;
		List.findById(listID,function(err,foundList){
			if(err||!foundList){
				console.log(err)
			}else{
				if(foundList.media.length != 0){
					let indexEle = -1;
					for(let i=0;i<foundList.media.length;i++){
						if(foundList.media[i].id == movieID){
							indexEle = i;
							//console.log("indexEle: "+indexEle);
							//console.log("i: "+i);
							break;
						}
						
					}			
					if(indexEle == -1){
						//console.log("not exist")
						let genreArray = [];

						for (let i =0;i<movieData.genres.length;i++){
							genreArray.push(movieData.genres[i].name)
						}

						let name = movieData.title;
						let url = "/movie/"+movieID;
						let img = movieData.poster_path;
						let backdrop = movieData.backdrop_path;
						let type = "movie";
						let id = movieID;
						////////////////
						let overview = movieData.overview;
						let	tagline = movieData.tagline;
						let	vote = movieData.vote_average;
						let	runtime = movieData.runtime;
						let	release = movieData.release_date;
						let	date = Date.now();

						let data = {id,name,url,img,backdrop,type,genreArray,overview,tagline,vote,runtime,release,date}
						foundList.media.push(data);
						foundList.save()
						res.send(foundList);							
					}else{
						//console.log("exist")
						foundList.media.splice(indexEle,1);
						foundList.save();
						res.send(foundList)
					}		
										
				}else{
					//console.log("length == 0")
					let genreArray = [];

					for (let i =0;i<movieData.genres.length;i++){
						genreArray.push(movieData.genres[i].name)
					}

					let name = movieData.title;
					let url = "/movie/"+movieID;
					let img = movieData.poster_path;
					let backdrop = movieData.backdrop_path;
					let type = "movie";
					let id = movieID;

					let overview = movieData.overview;
					let	tagline = movieData.tagline;
					let	vote = movieData.vote_average;
					let	runtime = movieData.runtime;
					let	release = movieData.release_date;
					let	date = Date.now();
	
					let data = {id,name,url,img,backdrop,type,genreArray,overview,tagline,vote,runtime,release,date}
					foundList.media.push(data);
					foundList.save()
					res.send(foundList);					
				}
			}
		})
	})
	.catch((error)=>{
		console.log(error)
	})
}

module.exports.addTVList = (req,res) =>{
	listID = req.body.listID;
	tvID = req.body.tvID;

	axios.get(tv.getDetailUrl(tvID))
	.then((response)=>{
		let tvData = response.data;
		List.findById(listID,function(err,foundList){
			if(err||!foundList){
				console.log(err)
			}else{
				if(foundList.media.length != 0){
					let indexEle = -1;
					for(let i=0;i<foundList.media.length;i++){
						if(foundList.media[i].id == tvID){
							indexEle = i;
							console.log("indexEle: "+indexEle);
							console.log("i: "+i);
							break;
						}
						
					}			
					if(indexEle == -1){
						let genreArray = [];
						for (let i =0;i<tvData.genres.length;i++){
							genreArray.push(tvData.genres[i].name)
						}

						//console.log("not exist")
						let name = tvData.name;
						let url = "/tv/"+tvID;
						let img = tvData.poster_path;
						let backdrop = tvData.backdrop_path;
						let type = "tv";
						let id = tvID;

						let overview = tvData.overview;
						let	tagline = "";
						let	vote = tvData.vote_average;
						let	runtime = "";
						let	release = tvData.first_air_date;
						let	date = Date.now();

						let data = {id,name,url,img,backdrop,type,genreArray,overview,tagline,vote,runtime,release,date}
						foundList.media.push(data);
						foundList.save()
						res.send(foundList);							
					}else{
						//console.log("exist")
						foundList.media.splice(indexEle,1);
						foundList.save();
						res.send(foundList)
					}		
										
				}else{
					//console.log("length == 0")
					let genreArray = [];
					for (let i =0;i<tvData.genres.length;i++){
						genreArray.push(tvData.genres[i].name)
					}

					let name = tvData.name;
					let url = "/tv/"+tvID;
					let img = tvData.poster_path;
					let backdrop = tvData.backdrop_path;
					let score = tvData.vote_average;
					let type = "tv";
					let id = tvID;

					let overview = tvData.overview;
					let	tagline = "";
					let	vote = tvData.vote_average;
					let	runtime = "";
					let	release = tvData.first_air_date;
					let	date = Date.now();

					let data = {id,name,url,img,backdrop,type,genreArray,overview,tagline,vote,runtime,release,date}
					foundList.media.push(data);
					foundList.save()
					res.send(foundList);					
				}
			}
		})
	})
	.catch((error)=>{
		console.log(error)
	})
}