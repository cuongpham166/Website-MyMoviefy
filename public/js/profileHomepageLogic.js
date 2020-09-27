var favoriteMovieChart = document.getElementById("favorite_movie_genre_chart").getContext('2d');
var favoriteTvChart = document.getElementById("favorite_tv_genre_chart").getContext('2d');
var chartLayoutOption = {
		padding: {
	        left: 0,
	        right: 0,
	        top: 20,
	        bottom: 0
	   	}
   	}

var chartOption = {
		aspectRatio: 2,
		legend:{
	    	labels:{
	    		fontColor:"	#FFFFFF",
	    		fontFamily:"sans-serif"
	    	},
			align:"start",
			verticalAlign:"middle",
	    	position:"right"
	    },
		layout: chartLayoutOption
		
		

	} 

var chartDefaultData = {
	    datasets: [{
	        data: [1],
	        backgroundColor:"#585858",
	        borderWidth: 0
	    }]	
	}

randomColor = () =>{
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";	
}

getAllFavoriteGenres = async (mediaType) =>{
	try{
		let userRes = await axios.get("/userid")
		let userID = userRes.data
		//console.log(userID)

		let movieGenreRes = await axios.get("/profile/"+userID+"/genre/movie")
		movieGenre = movieGenreRes.data
		renderMovieGenreChart(movieGenre)
		let tvGenreRes = await await axios.get("/profile/"+userID+"/genre/tv")
		tvGenre = tvGenreRes.data
		console.log(tvGenre)
		renderTvGenreChart(tvGenre)
	}	
	catch(error){
		console.log(error);
	}
}

renderMovieGenreChart = (movieGenre) =>{
	let arrayLength = movieGenre.data.length;
	let backgroundColour = createBackgroundColor(arrayLength)
	let chartData =  {
	    datasets: [{
	        data: movieGenre.data,
	        backgroundColor:backgroundColour,
	        borderWidth: 0
	    }],
	    labels:movieGenre.label	    
	}

	let chartDefaultOption = {
			aspectRatio: 2,
			legend:{
				display:false
		    },
		    title: {
	            display: true,
	            text: 'You have not saved any movie',
	            position:"bottom",
	            padding:20
	        },
		    tooltips:{
		    	enabled:false
		    },
		    layout: chartLayoutOption	
	}

	if(arrayLength > 1){
		let favoriteMovieGenreChart = new Chart(favoriteMovieChart, {
		    type: 'doughnut',
		    data: chartData,
		    options:chartOption,
		});		
	}else{
		let favoriteMovieGenreChart = new Chart(favoriteMovieChart, {
		    type: 'doughnut',
		    data: chartDefaultData,
		    options:chartDefaultOption,
		});			
	}

}

renderTvGenreChart = (tvGenre) =>{
	let arrayLength = tvGenre.data.length;
	let backgroundColour = createBackgroundColor(arrayLength)
	let chartData =  {
	    datasets: [{
	        data: tvGenre.data,
	        backgroundColor:backgroundColour,
	        borderWidth: 0
	    }],
	    labels:tvGenre.label	    
	}

	let chartDefaultOption = {
			aspectRatio: 2,
			legend:{
				display:false
		    },
		    title: {
	            display: true,
	            text: 'You have not saved any tv shows',
	            position:"bottom",
	            padding:20
	        },
		    tooltips:{
		    	enabled:false
		    },
		    layout: chartLayoutOption	
	}

	if(arrayLength > 1){
		let favoriteTvGenreChart = new Chart(favoriteTvChart, {
		    type: 'doughnut',
		    data: chartData,
		    options:chartOption,
		});			
	}else{
		let favoriteTvGenreChart = new Chart(favoriteTvChart, {
		    type: 'doughnut',
		    data: chartDefaultData,
		    options:chartDefaultOption,
		});			
	}

}

createBackgroundColor = (arrayLength) =>{
	let backgroundColour = []
	for (let i=0;i<arrayLength;i++){
		let tmpColor = randomColor()
		if(!backgroundColour.includes(tmpColor)){
			backgroundColour.push(randomColor())
		}
	}
	return backgroundColour	
}

getAllFavoriteGenres()