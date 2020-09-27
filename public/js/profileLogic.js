var panelBtn = document.getElementById("panel_btn");
var panelMain = document.querySelector(".panel_main");
var panelIcon = document.getElementById("panel_icon");

var profileCardSection = document.querySelector(".profile_card_section");
var radioButton = document.querySelectorAll(".radio_button");
var selectButton = document.getElementById("selectSort");
var selectButtonOption = document.getElementById("selectSort").options;


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

panelBtn.addEventListener("click",function(){
	if(checkDisplayNone(panelMain)){
		showSection(panelMain)
		panelIcon.classList.remove("fa-arrow-down")
		panelIcon.classList.add("fa-arrow-up")
	}else{
		hideSection(panelMain)
		panelIcon.classList.remove("fa-arrow-up")
		panelIcon.classList.add("fa-arrow-down")
	}
})

loadProfileCardSection = (result) =>{
	profileCardSection.innerHTML = "";
	for (let i=0;i<result.length;i++){
		let profileCard = document.createElement("div"); 
		profileCard.classList.add("profile_card_list")
		profileCard.innerHTML = `
					<div class="card_section--left">
						<img src="https://image.tmdb.org/t/p/w500/${result[i].mediaPoster}">
					</div>
					<div class="card_section--right">
						<div class="profile_card_container">
							<div class="card_header">
								<h1 class="media_name">${result[i].mediaName}</h1>
								<h2 class="media_vote">${result[i].mediaVoteAverage}</h2>
							</div>

							<div class="card_subheader">

							</div>

							<h3 class="media_tagline">${result[i].mediaTagline}</h3>
							<p class="media_overview">${result[i].mediaOverview}</p>
							<a href="${result[i].mediaURL}" target="_blank"  class="media_link">More Detail</a>
							<h2 class="media_added">Added ${moment(result[i].date).fromNow()}</h2>
						</div>
					</div>


		`

		let cardSubheader = profileCard.querySelector(".card_subheader")
		if (result[i].mediaRuntime !== ""){
			let mediaRuntime = document.createElement("h4");
			mediaRuntime.classList.add("media_runtime")
			mediaRuntime.innerHTML =  result[i].mediaRuntime + "" + "min"
			cardSubheader.appendChild(mediaRuntime);
		}

		let mediaGenre = document.createElement("h4");
		mediaGenre.classList.add("media_genre");
		for (let j=0;j<result[i].mediaGenre.length;j++){
			let spanGenre = document.createElement("span");
			spanGenre.innerHTML = result[i].mediaGenre[j]
			mediaGenre.appendChild(spanGenre)
		}
		cardSubheader.appendChild(mediaGenre);

		let mediaReleaseDate = document.createElement("h4");
		mediaReleaseDate.classList.add("media_releasedate")
		mediaReleaseDate.innerHTML = result[i].mediaReleaseDate;
		cardSubheader.appendChild(mediaReleaseDate);


		profileCardSection.appendChild(profileCard)
	}
}

getStorageItem = (item) =>{
	let result = sessionStorage.getItem(item)
	return result;
}

setStorageItem = (item,value) =>{
	sessionStorage.setItem(item,value)
}


removeStorageItem = (item) =>{
	if(getStorageItem(item) !== null){
		sessionStorage.removeItem(item)
	}
}

selectFilter = () =>{
	for (let i=0;i<radioButton.length;i++){
		radioButton[i].addEventListener("change",function(){
			let radioValue = radioButton[i].value;
			if(getStorageItem("filter") === null){
				setStorageItem("filter",radioValue)
			}else{
				removeStorageItem("filter")
				setStorageItem("filter",radioValue)
			}

		})
	}
}

selectSort = () =>{
	selectButton.addEventListener("change",function(){
		let optionValue = selectButton.value;
		if(getStorageItem("sort") === null){
			setStorageItem("sort",optionValue)
		}else{
			removeStorageItem("sort")
			setStorageItem("sort",optionValue)
		}
	})

}

loadSelectFilter = () =>{
	if(getStorageItem("filter") !== null){
		for (let i=0;i<radioButton.length;i++){
			if(radioButton[i].value === getStorageItem("filter")){
				radioButton[i].checked = true
				break;
			}
		}
	}
}

loadSelectSort = () =>{
	if (getStorageItem("sort") !== null){
		for (let i=1;i<selectButtonOption.length;i++){
			if(selectButtonOption[i].value === getStorageItem("sort") ){
				selectButtonOption[i].selected = true
				break;
			}
		}	
	}else{
		selectButtonOption[0].selected = true;
	}
}

window.addEventListener("load",function(){
	hideSection(panelMain);
	selectFilter();
	selectSort();
	loadSelectFilter();
	loadSelectSort();
})