var getElementID = function(id){
	return document.getElementById(id);
}

var tvFavorite = getElementID("tv_favorite");
var tvWatchlist = getElementID("tv_watchlist");

var themoviedbID = getElementID("themoviedbID");


var watchlisttvIcon = getElementID("watchlisttv_icon");
var favoritetvIcon = getElementID("favoritetv_icon");

var currentUserID = getElementID("currentUserID");

var themoviedbIDValue = themoviedbID.textContent;
var trailerBtn = getElementID("trailer_btn");

//Modal List
var modal = getElementID("idModal");
var openModalBtn = getElementID("modalBtn");
var closeModalbtn = getElementID("closeModal");
var openModalForm = getElementID("modal_btn--bottom")
var modalFormButtom = getElementID("idModalForm");
var inputTxt = getElementID("idModal_inputtxt");
var inputSub = getElementID("idModal_inputsub");
var themoviedbID = getElementID("themoviedbID");
var modalList = getElementID("idModal_list");
//

if (currentUserID.value != ""){
	function postTVFarvoriteList(){
		userID = currentUserID.value;
		favoritetooltiptvTxt = getElementID("favoritetooltiptv");
		axios.post('/tv/'+themoviedbIDValue+"/favorite")
		.then((response)=>{
			let isExist = response.data;
			if(isExist){
				favoritetooltiptvTxt.innerHTML = "Remove this tv show from your favorite list"
				favoritetvIcon.style.color = "#FFC100"	
			}else{
				favoritetooltiptvTxt.innerHTML = "Add this tv show to your favorite list"
				favoritetvIcon.style.color = "#FFFFE6"
			}
		})
		.catch((error) =>{
			console.log(error)
		})
	}

	function checkTVFarvoriteList(){
		userID = currentUserID.value;
		favoritetooltiptvTxt = getElementID("favoritetooltiptv");
		axios.get('/tv/'+themoviedbIDValue+"/favorite")
		.then((response)=>{
			let isExist = response.data;
			if(isExist){
				favoritetooltiptvTxt.innerHTML = "Remove this tv show from your favorite list"
				favoritetvIcon.style.color = "#FFC100"	
			}else{
				favoritetooltiptvTxt.innerHTML = "Add this tv show to your favorite list"
				favoritetvIcon.style.color = "#FFFFE6"
			}
		})
		.catch((error) =>{
			console.log(error)
		})
	}


	function postTVWatchList(){
		userID = currentUserID.value;
		watchlisttooltiptvTxt = getElementID("watchlisttooltiptv");
		axios.post('/tv/'+themoviedbIDValue+"/watchlist")
		.then((response)=>{
			let isExist = response.data;
			if(isExist){
				watchlisttooltiptvTxt.innerHTML = "Remove this tv show from your watchlist"
				watchlisttvIcon.style.color = "#FFC100"	
			}else{
				watchlisttooltiptvTxt.innerHTML = "Add this tv show to your watchlist"
				watchlisttvIcon.style.color = "#FFFFE6"
			}
		})
		.catch((error) =>{
			console.log(error)
		})
	}

	function checkTVWatchList(){
		userID = currentUserID.value;
		watchlisttooltiptvTxt = getElementID("watchlisttooltiptv");
		axios.get('/tv/'+themoviedbIDValue+"/watchlist")
		.then((response)=>{
			let isExist = response.data;
			if(isExist){
				watchlisttooltiptvTxt.innerHTML = "Remove this tv show from your watchlist"
				watchlisttvIcon.style.color = "#FFC100"	
			}else{
				watchlisttooltiptvTxt.innerHTML = "Add this tv show to your watchlist"
				watchlisttvIcon.style.color = "#FFFFE6"
			}
		})
		.catch((error) =>{
			console.log(error)
		})
	}


	window.onload = function(){
		checkTVFarvoriteList()
		checkTVWatchList()
	}

	tvFavorite.addEventListener("click",function(){
		postTVFarvoriteList();
	})

	tvWatchlist.addEventListener("click",function(){
		postTVWatchList();
	})

}


trailerBtn.addEventListener("click",function(){
	axios.get('/tv/'+themoviedbIDValue+'/trailer')
		.then(function(response){
			//console.log(response.data);
			var trailerResData = response.data;
			var trailerArray = []
			console.log(trailerResData.length);
			for (var i=0;i<trailerResData.length;i++){
				if(trailerResData[i].type == "Trailer" && trailerResData[i].site == "YouTube"){
					trailerArray.push(trailerResData[i])
				}
			}
			if(trailerArray.length != 0){
				document.getElementById("overlayIframe").style.display = "block";
				//var iframeDiv = document.createElement('div');
				var iframeContainer = document.getElementById("IframeContainer")
				var iframe = document.createElement('iframe');
				iframe.setAttribute("class","responsive-iframe")
				iframe.setAttribute("allow","fullscreen")
				//iframeDiv.setAttribute("class","overlay");
				iframe.src = "https://www.youtube.com/embed/"+trailerArray[0].key;
				document.getElementById("overlayIframe").appendChild(iframeContainer);
				iframeContainer.appendChild(iframe);

			}
			
		})
		.catch(function(error){
			console.log(error)
		})
})

function off() {
  document.getElementById("overlayIframe").style.display = "none";
}




function hideModal (){
	modalFormButtom.style.display = "none";
}


hideModal();

openModalBtn.addEventListener("click",function(){ // axios
	axios.get("/userid")
	.then((response)=>{
		let userID = response.data;
		axios({
			method:'post',
			url:"/list",
			data:{
				userID:userID
			}
		})
		.then((res)=>{
			let listData = res.data;
			modalList.innerHTML = ''
			for (let i=0;i<listData.length;i++){
				let listEle = document.createElement ("li");
				listEle.setAttribute("class","modal_content");
				//listEle.setAttribute("value","2");
				listEle.innerHTML = `
					<span class="content_id" style="display:none">${listData[i]._id}</span>
					<span class="content_text">${listData[i].name}</span>
					<span class="contnet_icon"><i class=" addIcon fas fa-plus"></i></span>
				`
				modalList.appendChild(listEle)
			}
			
			let addIcon = document.querySelectorAll(".addIcon");
			let tvID = themoviedbID.innerHTML;


			for (let m=0;m<listData.length;m++){
				for (let n=0;n<listData[m].media.length;n++){
					if(listData[m].media[n].id == tvID){
						addIcon[m].classList.remove("fa-plus");
						addIcon[m].classList.add("fa-check");
					}
				}

			}




			let contentIcon = document.querySelectorAll (".contnet_icon")
			let modalContent = document.querySelectorAll(".modal_content")
			let contentID = document.querySelectorAll(".content_id");
			/*let addIcon = document.querySelectorAll(".addIcon");
			let movieID = themoviedbID.innerHTML;*/

			for (let j=0;j<modalContent.length;j++){
				contentIcon[j].addEventListener("click",function(){
					let listID = contentID[j].innerHTML;
					axios({
						method:'post',
						url:"/list/tv",
						data:{
							listID:listID,
							tvID:tvID
						}
					})
					.then((res1)=>{
						let tvListData = res1.data;
						let indexEle = -1;
						for (let k=0;k<tvListData.media.length;k++){
							if(tvListData.media[k].id == tvID){
								indexEle = k;
								break;	
							}
							
						}	

						if(indexEle == -1){
							//console.log("exist")
							addIcon[j].classList.remove("fa-check");
							addIcon[j].classList.add("fa-plus");
						}else{
							//console.log(" not exist")
							addIcon[j].classList.remove("fa-plus");
							addIcon[j].classList.add("fa-check");
						}

						
					})
					.catch((err1)=>{
						console.log(err1);
					})
				})
			}
			
		})
		.catch((err)=>{
			console.log(err)
		})
	})
	.catch((error)=>{
		console.log(error)
	})
	modal.style.display = "block"
})

closeModalbtn.addEventListener("click",function(){
	modal.style.display = "none"
})

openModalForm.addEventListener("click",function(){
	if(modalFormButtom.style.display == "none"){
		modalFormButtom.style.display = "block"
	}else{
		modalFormButtom.style.display = "none"
	}
	
})

inputSub.addEventListener("click",function(){
	inputValue = inputTxt.value;
	if(inputValue.length >= 5 && inputValue.length <= 50){
		axios({
			method:'post',
			url:"/list/new",
			data:{
				list:inputValue,
			}
		})
		.then(function(response){
			let listData = response.data
			let listEle = document.createElement ("li");
			listEle.setAttribute("class","modal_content");
			listEle.setAttribute("value",listData._id);
			listEle.innerHTML = `
				<span class="content_text">${listData.name}</span>
				<span class="contnet_icon"><i class="addIcon fas fa-plus"></i></span>
			`
			modalList.appendChild(listEle)

			inputTxt.value = ""
			let newListIcon = listEle.querySelector(".contnet_icon");
			let addIcon = listEle.querySelector(".addIcon");
			let tvID = themoviedbID.innerHTML;
			let listID = listData._id;


			newListIcon.addEventListener("click",function(){
				axios({
					method:'post',
					url:"/list/tv",
					data:{
						listID:listID,
						tvID:tvID
					}
				})
				.then((res1)=>{
					let tvListData = res1.data;
					let indexEle = -1;
					for (let k=0;k<tvListData.media.length;k++){
						if(tvListData.media[k].id == tvID){
							indexEle = k;
							break;	
						}
					}	

					if(indexEle == -1){
						addIcon.classList.remove("fa-check");
						addIcon.classList.add("fa-plus");
					}else{
						addIcon.classList.remove("fa-plus");
						addIcon.classList.add("fa-check");
					}
				})
				.catch((err1)=>{
					console.log(err1);
				})
			})
		})
		.catch(function(error){
			console.log(error)
		})


	}else{
		alert("Please lengthen this text to 5 characters or more")
	}
});

window.addEventListener("click",function(event){
  	if (event.target == modal) {
    	modal.style.display = "none";
	}
})