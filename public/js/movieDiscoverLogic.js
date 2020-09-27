var getElementID = function(id){return document.getElementById(id);},
createEle = document.createElement.bind(document),
sortBtn = getElementID("sort_btn"),
filterBtn = getElementID("filter_btn"),

movieSortSelect = getElementID("movie_sort_select"),
dateFrom = getElementID("date_from"),

panelTitle = document.querySelectorAll(".panel_title"),

sortSection = getElementID("sort_section--main"),
sortIcon = getElementID("sort_icon"),
filterSection = getElementID("filter_section--main"),
filterIcon = getElementID("filter_icon"),

minScore = getElementID("min_score"),
maxScore = getElementID("max_score"),
minScoreValue = getElementID("min_score_value"),
maxScoreValue = getElementID("max_score_value"),

minVote = getElementID("min_vote"),
maxVote = getElementID("max_vote"),
minVoteValue = getElementID("min_vote_value"),
maxVoteValue = getElementID("max_vote_value"),


minRuntime = getElementID("min_runtime"),
maxRuntime = getElementID("max_runtime"),
minRuntimeValue = getElementID("min_runtime_value"),
maxRuntimeValue = getElementID("max_runtime_value"),

dateFrom = getElementID("date_from"),
dateTo = getElementID("date_to"),
sendBtn = getElementID("filterSubBtn"),
clearBtn = getElementID("clearSubBtn"),
genreSelect = getElementID("genre_value"),
discoverGrid = getElementID("discover_grid");




hideSection = (el) => {
	el.style.display = "none"
}

showSection = (el) =>{
	el.style.display = "block"
}

checkDisplayNone = (el) =>{
	if(el.style.display == "none")
		return true;
	return false;
}
removeClass = (el,className) =>{
	el.classList.remove(className);
}

addClass = (el,className) =>{
	el.classList.add(className);
}

getValue = (el) =>{
	let value = el.value;
	return value;
}

setValue = (el,inputValue) =>{
	el.value = inputValue;
}

showValue = (el,value) =>{
	el.innerHTML = value;
}

getItemStorage = (key) => {
	var item = sessionStorage.getItem(key)
	return item;
}

setItemStorage = (key,value) =>{
	sessionStorage.setItem(key,value)
}

removeItemStorage = (key) =>{
	sessionStorage.removeItem(key);
}


saveItemStorage = (key,ele) =>{
	value = getValue(ele);
	if(getItemStorage(key)===null && value != ""){
		setItemStorage(key,value)
	}else if(value == "" || value == 0){
		removeItemStorage(key)
	}else{
		removeItemStorage(key)
		setItemStorage(key,value);
	}
}


renderDiscoverGrid = (data) =>{
	for(let i=0;i<data.length;i++){
		newEle = createEle("a");
		newEle.setAttribute("class","discover_card_wrapper")
		newEle.setAttribute("href","/movie/"+data[i].id)
		newEle.innerHTML = `
			<div class="discover_card">
				<img src="${data[i].poster}" class="discover_img" alt="placeholder">
				<div class="discover_content">
					<h4>${data[i].title}</h4>
					<p>${data[i].overview}</p>
				</div>
			</div>
		`
		discoverGrid.appendChild(newEle)
	}
}

loadDiscoverData = () =>{
	keysArr = Object.keys(sessionStorage)
	valueArr= Object.values(sessionStorage)
	var url;
	for(let i=0;i<keysArr.length;i++){
		url +=keysArr[i];
		url +=valueArr[i]
	}

	if (url != undefined){
		url = url.replace("undefined","")
	}
	
	axios({
		method:'post',
		url:"/discover/movie",
		data:{
			filter:url
		}
	})
	.then(function(response){
		var data = response.data;
		discoverGrid.innerHTML = ""
		renderDiscoverGrid(data)
	})
	.catch(function(error){
		//console.log(error)
	})
}

sortBtn.addEventListener("click",function(){
	if(checkDisplayNone(sortSection)){
		showSection(sortSection)
		removeClass(sortIcon,"fa-arrow-down")
		addClass(sortIcon,"fa-arrow-up")
		panelTitle[0].style.borderBottom = "1px solid #585858";
	}else{
		hideSection(sortSection);
		removeClass(sortIcon,"fa-arrow-up")
		addClass(sortIcon,"fa-arrow-down")
		panelTitle[0].style.borderBottom = "none";
	}
	
})


filterBtn.addEventListener("click",function(){
	if(checkDisplayNone(filterSection)){
		showSection(filterSection)
		removeClass(filterIcon,"fa-arrow-down")
		addClass(filterIcon,"fa-arrow-up")
		panelTitle[1].style.borderBottom = "1px solid #585858";
	}else{
		hideSection(filterSection);
		removeClass(filterIcon,"fa-arrow-up")
		addClass(filterIcon,"fa-arrow-down")
		panelTitle[1].style.borderBottom = "none";
	}	
})



movieSortSelect.addEventListener("change",function(){
	saveItemStorage ("&sort_by=",movieSortSelect)
})

genreSelect.addEventListener("change",function(){
	saveItemStorage("&with_genres=",genreSelect)
})

dateFrom.addEventListener("change",function(){
	saveItemStorage("&release_date.gte=",dateFrom);
})

dateTo.addEventListener("change",function(){
	saveItemStorage("&release_date.lte=",dateTo);
})


minScore.addEventListener("change",function(){
	let value = getValue(minScore)
	showValue (minScoreValue,value);
	saveItemStorage("&vote_average.gte=",minScore);
})

maxScore.addEventListener("change",function(){
	let value = getValue(maxScore);
	showValue (maxScoreValue,value);
	saveItemStorage("&vote_average.lte=",maxScore);
})

minVote.addEventListener("change",function(){
	let value = getValue(minVote)
	showValue (minVoteValue,value);
	saveItemStorage("&vote_count.gte=",minVote);
})

maxVote.addEventListener("change",function(){
	let value = getValue(maxVote);
	showValue (maxVoteValue,value);
	saveItemStorage("&vote_count.lte=",maxVote);
})

minRuntime.addEventListener("change",function(){
	let value = getValue(minRuntime)
	showValue (minRuntimeValue,value);
	saveItemStorage("&with_runtime.gte=",minRuntime);
})

maxRuntime.addEventListener("change",function(){
	let value = getValue(maxRuntime);
	showValue (maxRuntimeValue,value);
	saveItemStorage("&with_runtime.lte=",maxRuntime);
})



clearBtn.addEventListener("click",function(){
	eleArr = [movieSortSelect,dateFrom,dateTo,genreSelect];
	eleArr2 = [minScore,maxScore,minVote,maxVote,minRuntime,maxRuntime] 
	eleArr3 = [minScoreValue,maxScoreValue,minVoteValue,maxVoteValue,minRuntimeValue,maxRuntimeValue]

	eleArr.forEach((ele)=>{
		setValue(ele,"");
	})
	
	eleArr2.forEach((ele)=>{
		setValue(ele,0);
	})

	eleArr3.forEach((ele)=>{
		showValue(ele,0);
	})
	sessionStorage.clear();
})


sendBtn.addEventListener("click",function(){
	if(sessionStorage.length > 0){
		loadDiscoverData()
	}else{
		window.location.reload(true); 
	}
	
})


initFilterValue = () =>{
	let objArr = []
	let eleArr = [movieSortSelect,genreSelect,dateFrom,dateTo,minScore,maxScore,minVote,maxVote,minRuntime,maxRuntime]
	let keyArr = ["&sort_by=","&with_genres=","&release_date.gte=","&release_date.lte=","&vote_average.gte=","&vote_average.lte=","&vote_count.gte=","&vote_count.lte=","&with_runtime.gte=","&with_runtime.lte="]

	for (let i=0;i<eleArr.length;i++){
		let element = eleArr[i]
		let key = keyArr[i];
		let defaultValue

		if (keyArr[i] == "&sort_by=" || keyArr[i] == "&with_genres=" || keyArr[i] == "&release_date.gte=" || keyArr[i] == "&release_date.lte="){
			defaultValue = ""
		}else{
			defaultValue = 0;
		}
		let el = {element,key,defaultValue}
		objArr.push(el);
	}

	for (let j=0;j<objArr.length;j++){
		if (getItemStorage(objArr[j].key)===null){
			setValue(objArr[j].element,objArr[j].defaultValue)
		}else{
			setValue(objArr[j].element,getItemStorage(objArr[j].key))
		}
	}	
}

initShowFilterValue = () =>{
	let objArr = []
	let eleArr = [minScoreValue,maxScoreValue,minVoteValue,maxVoteValue,minRuntimeValue,maxRuntimeValue]
	let keyArr = ["&vote_average.gte=","&vote_average.lte=","&vote_count.gte=","&vote_count.lte=","&with_runtime.gte=","&with_runtime.lte="]

	for (let i=0;i<eleArr.length;i++){
		let element = eleArr[i]
		let key = keyArr[i];
		let defaultValue = 0;
		let el = {element,key,defaultValue}
		objArr.push(el);
	}

	for (let k=0;k<objArr.length;k++){
		if (getItemStorage(objArr[k].key)===null){
			showValue(objArr[k].element,objArr[k].defaultValue)
		}else{
			showValue(objArr[k].element,getItemStorage(objArr[k].key))
		}
	}	
}


window.addEventListener("load",function(){
	hideSection(sortSection);
	hideSection(filterSection);
	loadDiscoverData()
	initFilterValue()
	initShowFilterValue()

})










