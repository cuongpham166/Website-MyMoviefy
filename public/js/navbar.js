var getElementID = function(id){
  return document.getElementById(id);
}


$(document).ready(function(){
 			$('.menu-toggle').click(function(){
 				$('.menu-toggle').toggleClass('active')
 				$('nav').toggleClass('active')
 			})
 		})

 		function openSearch() {
  			document.getElementById("myOverlay").style.height  = "100%";	
		}

		function closeSearch() {
			var inputText = getElementID("inputText");
  			var inputValue = inputText.value;
 			var resultWrapper = getElementID("result_wrapper");
  			var resultTitle =  getElementID("result_title");

  			inputText.value = "";
  			resultWrapper.innerHTML = '';
    		resultTitle.innerHTML = '';
		  	document.getElementById("myOverlay").style.height  = "0%";
		}

