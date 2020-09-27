window.addEventListener('load', function() {


var getQuerySelector = function(id){
	return document.querySelector(id);
}

var option = {	
	cellAlign: 'left',
	contain: true,
	pageDots: false,
	freeScroll: true,
	wrapAround: true,
	autoPlay:true
}

var option2 = {	
	cellAlign: 'left',
	contain: true,
	pageDots: false,
	freeScroll: true,
	wrapAround: true,
	autoPlay:true
}


var option3 = {
	cellAlign: 'left',
	contain: true,
	pageDots: false,
	freeScroll: true,
	wrapAround: true,
	prevNextButtons: false,
}


var optionTop = {	
	cellAlign: 'left',
	contain: true,
	freeScroll: true,
	wrapAround: true,
	autoPlay:true,
	prevNextButtons: false,
	pageDots: false,
	selectedAttraction: 0.01,
	friction: 0.15
}



var elemTop = getQuerySelector('.main-carousel-top');


elemTrending = getQuerySelector('.main-carousel-trending'),
elemPopular = getQuerySelector('.main-carousel-popular'),
elemPopular = getQuerySelector('.main-carousel-popular'),
elemOntheair = getQuerySelector('.main-carousel-ontheair'),
elemUpcoming = getQuerySelector('.main-carousel-upcoming'),
elemSimilar = getQuerySelector('.main-carousel-similar'),
elemCrew = getQuerySelector('.main-carousel-crew'),
eleNews = getQuerySelector(".main-carousel-news"),
eleBest = getQuerySelector(".main-carousel-bestmovie"),

elemToprated = getQuerySelector('.main-carousel-toprated'),
flktyToprated = new Flickity(elemToprated,option3),


flktyTop = new Flickity(elemTop,optionTop),

flktyTrending = new Flickity( elemTrending, option3),
flktyPopular = new Flickity( elemPopular, option3),
flktyOntheair = new Flickity( elemOntheair, option3),
flktyUpcoming = new Flickity( elemUpcoming, option3),
flktySimilar = new Flickity(elemSimilar, option3),
flktyCrew = new Flickity(elemCrew, option3),
flktyNews = new Flickity( eleNews, option3);
flktyBest = new Flickity( eleBest, option3);

})