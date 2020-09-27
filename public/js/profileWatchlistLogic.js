var watchlistSearchbar = document.getElementById("watchlist_searchbar");
var searchWatchlist = document.getElementById("search_watchlist");
var resetProfile = document.getElementById("reset_profile");

watchlistSearchbar.addEventListener("keyup",function(){
	let searchTxt = watchlistSearchbar.value;
 	axios.get("/userid")
 	.then((response)=>{
 		let userID = response.data;
		axios({
			method:'post',
			url:"/profile/"+userID+"/watchlist",
			data:{
				searchTxt:searchTxt
			}
		})
		.then((res)=>{
			//console.log(res.data)
			let result = res.data;
			loadProfileCardSection(result)
		})
		.catch((err)=>{

		})
 	})
 	.catch((error)=>{
 		console.log(error)
 	})
})


loadWatchlistFilterResult = () =>{
	let sortValue ; 
	let filterValue ;

	if(getStorageItem("filter") === null){
		filterValue = "default"
	}else{
		filterValue = getStorageItem("filter")
	}

	if(getStorageItem("sort") === null){
		sortValue = "default"
	}else{
		sortValue = getStorageItem("sort")
	}

	axios.get("/userid")
	.then((response)=>{
 		let userID = response.data;
		axios({
			method:'post',
			url:"/profile/"+userID+"/watchlist/filter",
			data:{
				sort:sortValue,
				filter:filterValue
			}
		})
		.then((res)=>{
			//console.log(res.data)
			let result = res.data
			loadProfileCardSection(result)
		})
		.catch((err)=>{

		})
	})
	.catch((error)=>{
		console.log(error)
	})	
}

searchWatchlist.addEventListener("click",function(){
	loadWatchlistFilterResult()
})


resetProfile.addEventListener("click",function(){
	//alert("reset");
	selectButtonOption[0].selected = true;
	radioButton[0].checked = true;
	setStorageItem("filter","default")
	setStorageItem("sort","default")
	loadWatchlistFilterResult()
})


window.addEventListener("load",function(){
	loadWatchlistFilterResult();
})