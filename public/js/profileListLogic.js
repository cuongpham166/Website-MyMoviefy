listsBtn = document.querySelectorAll(".lists_btn");
listsIcon = document.querySelectorAll(".lists_icon");
listsCardMain = document.querySelectorAll(".lists_card_main");
listsCard = document.querySelectorAll(".lists_card");
listsCardFooter = document.querySelectorAll(".lists_card_footer");

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

for (let i=0;i<listsBtn.length;i++){
	listsBtn[i].addEventListener("click",function(){
		if(checkDisplayNone(listsCardMain[i])){
			showSection(listsCardMain[i])
			listsIcon[i].classList.remove("fa-arrow-down")
			listsIcon[i].classList.add("fa-arrow-up")
			listsCardFooter[i].style.marginBottom = "30px";
			listsCardFooter[i].style.backgroundColor = "#2B2B27"
		}else{
			hideSection(listsCardMain[i])
			listsIcon[i].classList.remove("fa-arrow-up")
			listsIcon[i].classList.add("fa-arrow-down")
			listsCardFooter[i].style.marginBottom = "0px";
			listsCardFooter[i].style.backgroundColor = "#141414"
		}
	})
}