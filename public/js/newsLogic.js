var getElementID = document.getElementById.bind(document)

var movieNewsCard = document.querySelectorAll(".news_movie_card");
var tvNewsCard = document.querySelectorAll(".news_tv_card");
var headlinesCard = document.querySelectorAll(".headlines_card")

var expandMovie = getElementID("expand_movie_news")
var expandTV = getElementID("expand_tv_news");
var expandHeadlines = getElementID("expand_headlines")


function hideMovieNews (){
	for (var i=movieNewsCard.length;i>1;i--){
		if(movieNewsCard[i] != undefined){
			movieNewsCard[i].style.display = "none"
			movieNewsCard[i].classList.add("hidden")
		}
	}
}

function expandMovieNews (){
	for (var i=movieNewsCard.length;i>1;i--){
		if(movieNewsCard[i] != undefined){
			movieNewsCard[i].style.display = "block"
			movieNewsCard[i].classList.remove("hidden")
		}

	}
}

function hideTVNews (){
	for (var i=tvNewsCard.length;i>1;i--){
		if(tvNewsCard[i] != undefined){
			tvNewsCard[i].style.display = "none"
			tvNewsCard[i].classList.add("hidden")
		}
	}
}

function expandTVNews (){
	for (var i=tvNewsCard.length;i>1;i--){
		if(tvNewsCard[i] != undefined){
			tvNewsCard[i].style.display = "block"
			tvNewsCard[i].classList.remove("hidden")
		}

	}
}


function hideHeadlinesNews (){
	for (var i=headlinesCard.length;i>5;i--){
		if(headlinesCard[i] != undefined){
			headlinesCard[i].style.display = "none"
			headlinesCard[i].classList.add("hidden")
		}
	}
}

function expandHeadlinesNews (){
	for (var i=headlinesCard.length;i>5;i--){
		if(headlinesCard[i] != undefined){
			headlinesCard[i].style.display = "block"
			headlinesCard[i].classList.remove("hidden")
		}

	}
}

hideMovieNews()
hideTVNews()
hideHeadlinesNews()

if(expandMovie != undefined){
	expandMovie.addEventListener("click",function(){
		if(expandMovie.classList.contains("hide")){
			expandMovieNews()
			expandMovie.classList.remove("hide")
			expandMovie.innerHTML = "Show Less"
		}else{
			hideMovieNews()
			expandMovie.classList.add("hide")
			expandMovie.innerHTML = "Show More"
		}
	})	
}

if(expandTV != undefined){
	expandTV.addEventListener("click",function(){
		if(expandTV.classList.contains("hide")){
			expandTVNews()
			expandTV.classList.remove("hide")
			expandTV.innerHTML = "Show Less"
		}else{
			hideTVNews()
			expandTV.classList.add("hide")
			expandTV.innerHTML = "Show More"
		}
	})
}

if(expandHeadlines != undefined){
	expandHeadlines.addEventListener("click",function(){
		if(expandHeadlines.classList.contains("hide")){
			expandHeadlinesNews()
			expandHeadlines.classList.remove("hide")
			expandHeadlines.innerHTML = "Show Less"
		}else{
			hideHeadlinesNews()
			expandHeadlines.classList.add("hide")
			expandHeadlines.innerHTML = "Show More"
		}
	})
}


