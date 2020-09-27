var favoriteSearchbar = document.getElementById("favorite_searchbar");
var searchFavorite = document.getElementById("search_favorite");
var resetProfile = document.getElementById("reset_profile");

favoriteSearchbar.addEventListener("keyup",function(){
	let searchTxt = favoriteSearchbar.value;
 	axios.get("/userid")
 	.then((response)=>{
 		let userID = response.data;
		axios({
			method:'post',
			url:"/profile/"+userID+"/favorite",
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


loadFavoriteFilterResult = () =>{
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
			url:"/profile/"+userID+"/favorite/filter",
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

searchFavorite.addEventListener("click",function(){
	loadFavoriteFilterResult()
})

resetProfile.addEventListener("click",function(){
	//alert("reset");
	selectButtonOption[0].selected = true;
	radioButton[0].checked = true;
	setStorageItem("filter","default")
	setStorageItem("sort","default")
	loadFavoriteFilterResult()
})

window.addEventListener("load",function(){
	loadFavoriteFilterResult();
})