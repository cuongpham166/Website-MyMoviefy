var homepageList = document.querySelectorAll(".homepage_list");

var mainTrending = document.querySelector(".main-carousel-trending");

var mainPopular = document.querySelector(".main-carousel-popular");

var mainSection = document.querySelectorAll(".homepage_section");

var option3 = {
	cellAlign: 'left',
	contain: true,
	pageDots: false,
	freeScroll: true,
	wrapAround: true,
	prevNextButtons: false,
}

/*var mainToprated = document.querySelector(".main-carousel-toprated");
var flkty = new Flickity (".main-carousel-toprated",option3)
var isFlickity = true;*/



createClickEvent = () =>{
    for (let i=0;i<homepageList.length;i++){
        let listContent = homepageList[i].querySelectorAll(".list_content");
        for (let j=0;j<listContent.length;j++){
            listContent[j].addEventListener("click",function(){
                let listContentValue = listContent[j].dataset.listContent
                if(listContentValue === "movie"){
                    listContent[0].style.backgroundColor = "#FFC100"
                    listContent[0].style.color = "#141414"
                    listContent[1].style.backgroundColor = "#000000"
                    listContent[1].style.color = "#FFFFFF"
                }else{
                    listContent[1].style.backgroundColor = "#FFC100"
                    listContent[1].style.color = "#141414"
                    listContent[0].style.backgroundColor = "#000000"
                    listContent[0].style.color = "#FFFFFF"             
                }



                createUrl (i,listContentValue);
            })
        }
    }
}

/*listContent = homepageList[0].querySelectorAll(".list_content");
listContent[0].addEventListener("click",function(){
    mainToprated.outerHTML = ""
})*/



/*listContent[0].addEventListener("click",function(){
    if ( isFlickity ) {
        flkty.destroy();
        flkty = new Flickity('.main-carousel-toprated',option3);
    } else {
        flkty = new Flickity('.main-carousel-toprated',option3);
    }
      isFlickity = !isFlickity;   
})*/



createUrl = (index,mediaType) =>{
    let linkType;
    if(index === 0){
        linkType = "toprated"
        getDataFromServer (linkType,mediaType);
    }else if(index === 1){
        linkType = "trending"
        getDataFromServer (linkType,mediaType);
    }else{
        linkType = "popular";
        getDataFromServer (linkType,mediaType);
    }
}

getDataFromServer = async (linkType,media) =>{
    let mediaType = media
    try{
        let foundResult = await axios.get("/"+mediaType+"/"+linkType);
        let data = foundResult.data;
        //console.log(data);
        if(mediaType === "movie"){
            renderDiv (data,linkType,mediaType)
        }else{
            renderDiv (data,linkType,mediaType)
        }
    }
    catch(error){
        console.log(error)
    }

}

renderDiv = (dataRes,link,mediaType) =>{
    let data = dataRes
    let linkType = link
    if(linkType === "toprated"){

        mainToprated = document.querySelector(".main-carousel-toprated");
        flkty = new Flickity (".main-carousel-toprated",option3)
        mainToprated.outerHTML = ""

        newSection = document.createElement ("div");
        newSection.classList.add("main-carousel-toprated");

        mainSection[0].insertBefore(newSection, mainSection[0].children[2]);



        for (let i=0;i<data.length;i++){
            let newCell = document.createElement ("div");
            newCell.classList.add("carousel-cell");
            if(mediaType === "movie"){
                newCell.innerHTML = `
                <a href="/movie/${data[i].id}">
                    <div class="toprated_card">
                        <img src="https://image.tmdb.org/t/p/w500/${data[i].backdrop_path}" class="toprated_img" alt="placeholder">
                        <div class="card_section--bottom">
                            <h4 class="toprated_card_title">${data[i].title}</h4>
                            <h4 class="toprated_card_score"><i class="fas fa-star"></i>${data[i].vote_average}</h4> 
                        </div>
                    </div>
                </a>
                `
            }else{ // tv
                //
                newCell.innerHTML = `
                <a href="/tv/${data[i].id}">
                    <div class="toprated_card">
                        <img src="https://image.tmdb.org/t/p/w500/${data[i].backdrop_path}" class="toprated_img" alt="placeholder">
                        <div class="card_section--bottom">
                            <h4 class="toprated_card_title">${data[i].name}</h4>
                            <h4 class="toprated_card_score"><i class="fas fa-star"></i>${data[i].vote_average}</h4> 
                        </div>
                    </div>
                </a>
                `
            }
            newSection.appendChild(newCell)
  
            
        }


        flkty.destroy();
        flkty = new Flickity('.main-carousel-toprated',option3);






        /*if ( isFlickity ) {
            flkty.destroy();
            flkty = new Flickity('.main-carousel-toprated',option3);
        } else {
            flkty = new Flickity('.main-carousel-toprated',option3);
        }
        isFlickity = !isFlickity; */
       



       
    }else if(linkType === "trending"){

    }else{ //popular

    }
}

createClickEvent()