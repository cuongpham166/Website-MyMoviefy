var User = require ("../models/user");
//var Log = require("../models/log");
var Watchlist = require("../models/watchlist");
var Favoritelist = require("../models/favoritelist");
var List = require("../models/list");

var moment = require('moment');
var profileSta = {};

escapeRegex = (text) =>{
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

flatten = (arr) =>{
	return [].concat(...arr);
}

getUserInformation = async (userID) =>{
	try{
		let userInfo = []
		let formattedDate
		let foundUser = await User.find({_id:userID}).exec()
		userInfo.push({"name":foundUser[0].username})
		userInfo.push({"joined":foundUser[0].created})
		return userInfo
	}
	catch(error){
		console.log(error)
	}
}

getTotalNumber = async (userID,media) =>{
	try{
		let arrays = []
		let foundFavorite = await Favoritelist.find({user:userID,mediaType:media}).exec()
		foundFavorite.forEach(result=>{
			arrays.push(result.mediaID)
		})

		let foundWatchlist = await Watchlist.find({user:userID,mediaType:media}).exec()
		foundWatchlist.forEach(result=>{
			arrays.push(result.mediaID)
		})

		let tempArray = flatten(arrays)
		let mediaArray = [...new Set(tempArray)]
		let totalNumber = mediaArray.length;
		return totalNumber;
	}
	catch(error){
		console.log(error)
	}
}

getListTotalNumber = async (userID) =>{
	try{
		let foundList = await List.find({userID:userID}).exec()
		let totalNumber = foundList.length;
		return totalNumber;
	}
	catch(error){
		console.log(error)
	}
}

/*getAllFavoriteGenres = async (userID,media) =>{
	try{
		let duplicatedArray = []

		let favoriteGenre = {}

		let foundFavoriteGenre = await Favoritelist.find({user:userID,mediaType:media}).exec() //media:"movie" or "tv"
		foundFavoriteGenre.forEach(favoriteResult=>{
			(favoriteResult.mediaGenre).forEach(genre=>{
				duplicatedArray.push(genre);
			})
		})

		let tempArray = flatten(duplicatedArray)
		let uniqueArray = [...new Set(tempArray)]

		duplicatedArray.sort()
		uniqueArray.sort()

		let countArray = []

		for (let i=0;i<uniqueArray.length;i++){
			let name = uniqueArray[i]
			let count = 0;
			for(let j=0;j<duplicatedArray.length;j++){
				if(uniqueArray[i] === duplicatedArray[j]){
					count++
				}
			}
			countArray.push(parseInt(count))
		}
		favoriteGenre["label"] = uniqueArray
		favoriteGenre["data"] = countArray
		//console.log(duplicatedArray)
		return favoriteGenre
	}
	catch(error){
		console.log(error)
	}
}*/

module.exports.getAllFavoriteGenres = async (req,res) =>{
	let userID = req.params.userID
	let mediaType = req.params.mediaType
	try{
		let duplicatedArray = []

		let favoriteGenre = {}

		let foundFavoriteGenre = await Favoritelist.find({user:userID,mediaType:mediaType}).exec() //media:"movie" or "tv"
		foundFavoriteGenre.forEach(favoriteResult=>{
			(favoriteResult.mediaGenre).forEach(genre=>{
				duplicatedArray.push(genre);
			})
		})

		let foundWatchlistGenre = await Watchlist.find({user:userID,mediaType:mediaType}).exec()
		foundWatchlistGenre.forEach(favoriteResult=>{
			(favoriteResult.mediaGenre).forEach(genre=>{
				duplicatedArray.push(genre)
			})
		})

		let foundList = await List.find({userID:userID}).exec()
		foundList.forEach(listResult =>{
			listResult.media.forEach(listGenre =>{
				if(listGenre.type === mediaType){
					listGenre.genreArray.forEach(genre=>{
						duplicatedArray.push(genre);
					})
				}
			})
		})


		let tempArray = flatten(duplicatedArray)
		let uniqueArray = [...new Set(tempArray)]

		duplicatedArray.sort()
		uniqueArray.sort()

		let countArray = []

		for (let i=0;i<uniqueArray.length;i++){
			let name = uniqueArray[i]
			let count = 0;
			for(let j=0;j<duplicatedArray.length;j++){
				if(uniqueArray[i] === duplicatedArray[j]){
					count++
				}
			}
			countArray.push(parseInt(count))
		}
		favoriteGenre["label"] = uniqueArray
		favoriteGenre["data"] = countArray
		//console.log(duplicatedArray)
		res.send(favoriteGenre) 
	}
	catch(error){
		console.log(error)
	}	
}

module.exports.getProfileHomepage = async (req,res) =>{
	let userID = req.params.userID
	let totalMovieNumber
	let totalTvNumber
	let updatedTime = Date.now()
	let userData = {}
	userData["updated"] = updatedTime
	try{
		totalMovieNumber = await getTotalNumber(userID,"movie");
		userData["movie_total"] = totalMovieNumber

		totalTvNumber = await getTotalNumber(userID,"tv");
		userData["tv_total"] = totalTvNumber

		userInfo = await getUserInformation(userID);
		userData["user"] = userInfo

		totalListNumber = await getListTotalNumber(userID);
		userData["list_total"] = totalListNumber


		res.render("profile/index",{userData:userData,moment:moment})
	}

	catch(error){
		console.log(error)
	}	
}

module.exports.getProfileFavoritePage = async (req,res)=>{
	let userID = req.params.userID;
	try{
		let foundFavoriteMovie = await Favoritelist.find({user:userID}).sort({date: 'desc'}).exec();
		//console.log(foundFavoriteMovie);
		let arrays = []
		for(let i=0;i<foundFavoriteMovie.length;i++){
			arrays.push(foundFavoriteMovie[i].mediaGenre)
		}
		let tempArray = flatten(arrays);
		let genreArray = [...new Set(tempArray)]

		res.render("profile/favorite",{favoriteMovie:foundFavoriteMovie,moment:moment,genreArray:genreArray});
	}
	catch(error){
		//return 'error occured';
		console.log(error)
	}
	
}

module.exports.findProfileFavorite = async (req,res) =>{
	let searchValue = req.body.searchTxt;
	let userID = req.params.userID;
	if (searchValue != null){
		const regex = new RegExp(escapeRegex(searchValue), 'gi');
		try{
			let foundFavoriteMovie = await Favoritelist.find({user:userID,mediaName:regex}).sort({date: 'desc'}).exec();
			res.send(foundFavoriteMovie);
		}
		catch(error){
			console.log(error)
		}

	}else{
		try{
			let foundFavoriteMovie = await Favoritelist.find({user:userID}).sort({date: 'desc'}).exec();
			res.send(foundFavoriteMovie);
		}
		catch(error){
			//return 'error occured';
			console.log(error)
		}
	}
}

module.exports.filterProfileFavorite = async (req,res) =>{
	let userID = req.params.userID;
	let sort = req.body.sort;
	let filter = req.body.filter;
	let tempString = sort.split(".")
	let sortValue = parseInt(tempString[1]);
	let foundResult;
	let mySort;
	let myFilter;

	try{
		if(sort === "default" && filter === "default"){
			foundResult = await Favoritelist.find({user:userID}).sort({date: 'desc'}).exec();
		}
		else if (filter === "default"){
			if(tempString[0] === "title"){
				mySort = {mediaName: sortValue}
			}else if (tempString[0] === "media_type"){
				mySort = {mediaType: sortValue}
			}
			else{
				mySort = {date:sortValue}
			}
			foundResult = await Favoritelist.find({user:userID}).sort(mySort).exec();
		}
		else if (sort === "default"){
			foundResult = await Favoritelist.find({user:userID,mediaGenre:filter}).sort({date: 'desc'}).exec();	
		}else{
			myFilter = {user:userID,mediaGenre:filter}
			if(tempString[0] === "title"){
				mySort = {mediaName: sortValue}
			}else if (tempString[0] === "media_type"){
				mySort = {mediaType: sortValue}
			}
			else{
				mySort = {date:sortValue}
			}
			foundResult = await Favoritelist.find(myFilter).sort(mySort).exec();
		}
		res.send(foundResult)
	}
	catch(error){
		console.log(error)
	}


}


module.exports.getProfileWatchlistPage = async (req,res) =>{
	let userID = req.params.userID;
	try{
		let foundWatchlistMovie = await Watchlist.find({user:userID}).sort({date: 'desc'}).exec();
		let arrays = []
		for(let i=0;i<foundWatchlistMovie.length;i++){
			arrays.push(foundWatchlistMovie[i].mediaGenre)
		}
		let tempArray = flatten(arrays);
		let genreArray = [...new Set(tempArray)]

		res.render("profile/watchlist",{watchlistMovie:foundWatchlistMovie,moment:moment,genreArray:genreArray});
	}
	catch(error){
		console.log(error)
	}
}


module.exports.findProfileWatchlist = async (req,res) =>{
	let searchValue = req.body.searchTxt;
	let userID = req.params.userID;
	if (searchValue != null){
		const regex = new RegExp(escapeRegex(searchValue), 'gi');
		try{
			let foundWatchlistMovie = await Watchlist.find({user:userID,mediaName:regex}).sort({date: 'desc'}).exec();
			res.send(foundWatchlistMovie);
		}
		catch(error){
			console.log(error)
		}

	}else{
		try{
			let foundWatchlistMovie = await Watchlist.find({user:userID}).sort({date: 'desc'}).exec();
			res.send(foundWatchlistMovie);
		}
		catch(error){
			//return 'error occured';
			console.log(error)
		}
	}
}

module.exports.filterProfileWatchlist = async (req,res) =>{
	let userID = req.params.userID;
	let sort = req.body.sort;
	let filter = req.body.filter;
	let tempString = sort.split(".")
	let sortValue = parseInt(tempString[1]);
	let foundResult;
	let mySort;
	let myFilter;

	try{
		if(sort === "default" && filter === "default"){
			foundResult = await Watchlist.find({user:userID}).sort({date: 'desc'}).exec();
		}
		else if (filter === "default"){
			if(tempString[0] === "title"){
				mySort = {mediaName: sortValue}
			}else if (tempString[0] === "media_type"){
				mySort = {mediaType: sortValue}
			}
			else{
				mySort = {date:sortValue}
			}
			foundResult = await Watchlist.find({user:userID}).sort(mySort).exec();
		}
		else if (sort === "default"){
			foundResult = await Watchlist.find({user:userID,mediaGenre:filter}).sort({date: 'desc'}).exec();	
		}else{
			myFilter = {user:userID,mediaGenre:filter}
			if(tempString[0] === "title"){
				mySort = {mediaName: sortValue}
			}else if (tempString[0] === "media_type"){
				mySort = {mediaType: sortValue}
			}
			else{
				mySort = {date:sortValue}
			}
			foundResult = await Watchlist.find(myFilter).sort(mySort).exec();
		}
		res.send(foundResult)
	}
	catch(error){
		console.log(error)
	}


}

module.exports.getProfileList = async (req,res) =>{
	let userID = req.params.userID;
	try{
		let foundLists = await List.find({userID:userID}).sort({name: 'desc'}).exec();
		console.log(foundLists)
		res.render("profile/list",{myLists:foundLists,moment:moment});

	}
	catch(error){
		console.log(error)
	}
}