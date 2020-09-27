var getElementID = document.getElementById.bind(document)
var createEle = document.createElement.bind(document);

selectImdbChart = () =>{
	imdbTbody = getElementID("imdb_tbody");
	imdbTable = getElementID("imdb_table_data");
	imdbTitle = getElementID("imdb_title");
	mySelectImdb = getElementID("select_imdb")

	tempDiv = createEle("div");

	let mySelectImdbValue = mySelectImdb.value;
	let url ="/rank/imdb"+mySelectImdbValue; 
	axios.get(url)
	.then(function(response){
		let imdbData = response.data;
			for(let i=0;i<imdbData.length;i++){
				newRow = createEle("tr");
				newRow.setAttribute("class","imdb_row");
				newRow.innerHTML = `
					<td class="imdb_cell">${i+1}</td>
					<td class="imdb_cell">
					<img src="${imdbData[i].img}" alt="placeholder"></td>
					<td class="imdb_cell">
						<a href="${imdbData[i].url}" class="boxoffice_link">${imdbData[i].name}</a>
					</td>
					<td class="imdb_cell">${imdbData[i].year}</td>
					<td class="imdb_cell">${imdbData[i].rating}</td>
				`
				//imdbTbody.appendChild(newRow);
				tempDiv.appendChild(newRow)
			}

		if(url == "/rank/imdb/movie/lowest-rated"){
			imdbTitle.innerHTML = "Lowest Rated Movies"
		}else if(url == "/rank/imdb/movie/top-rated"){
			imdbTitle.innerHTML = "Top Rated Movies"
		}else if(url == "/rank/imdb/movie/popular"){
			imdbTitle.innerHTML = "Most Popular Movies"
		}else if(url == "/rank/imdb/tv/top-rated"){
			imdbTitle.innerHTML = "Top Rated TV Shows"
		}else if (url == "/rank/imdb/tv/popular"){
			imdbTitle.innerHTML = "Most Popular TV Shows"
		}else{
			imdbTitle.innerHTML = ""
		}
		imdbTbody.innerHTML = ''
		imdbTbody.innerHTML = tempDiv.innerHTML
		
	})
	.catch(function(error){
		console.log(error)
	})
}

function changeRottenYear(){
	year = getElementID("mySelect").value;
	rottenTbody = getElementID("rotten_tbody");

	axios.get("/rank/rotten-tomatoes/"+year)
	.then(function(response){
		rottenData = response.data;
		rottenTbody.innerHTML = ""
		for(var i=0;i<rottenData.length;i++){
			newRow = createEle("tr");
			newRow.innerHTML = `
				<td class="rotten_cell">${i+1}</td>
				<td class="rotten_cell"><a href="${rottenData[i].url}" target="_blank" class="rotten_link">${rottenData[i].name}</a></td>
				<td class="rotten_cell">${rottenData[i].score}</td>
				<td class="rotten_cell">${rottenData[i].reviews}</td>
			`
			rottenTbody.appendChild(newRow)
		}

	})
	.catch(function(err){
		console.log(err);
	})	
}