var getElementID = document.getElementById.bind(document)
var queryAll = document.querySelectorAll.bind(document);
var createEle = document.createElement.bind(document);

commentBtn  =  getElementID("comment_button");


commentContentContainer = getElementID("comment_content_container");
themoviedbID = getElementID("themoviedbID");
themoviedbIDValue = themoviedbID.textContent;
commentText = getElementID("comment_text");
currentUserID = getElementID("currentUserID");

commentText.addEventListener("keydown",function(event){
	if (event.which == 13 || event.keyCode == 13){
		event.preventDefault();
	}
})

commentBtn.addEventListener("click",function(){
	commentTextValue= commentText.value;
	if(commentTextValue.length > 0){
		axios({
			method:'post',
			url:"/movie/"+themoviedbIDValue+"/comment",
			data:{
				comment:commentTextValue
			}
		})
		.then(function(response){
			//console.log("From Server")
			var data = response.data;
			console.log(data);
			commentContent = createEle("li");
			commentContent.setAttribute("class","comment_content");
			commentContent.setAttribute("id",data._id+"movieComment");
			
			commentContentDiv=createEle("div");
			commentContentDiv.setAttribute("class","comment_title");
			commentContentDiv.setAttribute("id",data._id+"movieCommentTitle")

			commentContentDiv.innerHTML =`
				<span class="comment_author"><h3 class="comment_txt">${data.author.username}</h3></span>
				<span class="comment_time"><h4 class="comment_txt">${moment(data.postedAt).fromNow()}</h4></span>`
			commentContent.appendChild(commentContentDiv);

			commentParagraph = createEle("div");
			commentParagraph.setAttribute("class","comment_paragraph");
			commentParagraph.setAttribute("id",data._id+"commentParagraph");
			commentParagraph.setAttribute("contenteditable","false");
			commentParagraph.setAttribute("spellcheck","false");
			commentParagraph.innerHTML = data.text;
			commentContent.appendChild(commentParagraph);

			commentBtn = createEle("div");
			commentBtn.setAttribute("class","comment_btn");
			commentContent.appendChild(commentBtn);

			commentBtnLeft = createEle("span");
			commentBtnLeft.setAttribute("class","comment_btn--left");
			commentBtn.appendChild(commentBtnLeft);

			btnLike = createEle("a");
			btnLike.setAttribute("href","javascript:void(0)");
			btnLike.setAttribute("class","btn_like tooltip")
			btnLike.setAttribute("onclick","postLike('"+data._id+"')")
			commentBtnLeft.appendChild(btnLike);

			iconLike = createEle("i");
			iconLike.setAttribute("class","fas fa-heart unliked");
			iconLike.setAttribute("id",data._id+"ilike");
			iconLike.style.padding="6px";
			btnLike.appendChild(iconLike);

			spanLike = createEle("span");
			spanLike.setAttribute("class","tooltiptext");
			spanLike.setAttribute("id",data._id+"tooltip");
			spanLike.textContent ="Like";
			btnLike.appendChild(spanLike);

			spanTooltip = createEle("span");
			spanTooltip.setAttribute("class","tooltip");
			commentBtnLeft.appendChild(spanTooltip);

			spanLikeNumber = createEle("span");
			spanLikeNumber.setAttribute("class","like_number");
			spanLikeNumber.setAttribute("id",data._id);
			spanLikeNumber.setAttribute("onmouseover","getLikeList('"+data._id+"')");
			spanLikeNumber.textContent  = " "+data.like.length;
			spanTooltip.appendChild(spanLikeNumber);

			ulTooltip = createEle("ul");
			ulTooltip.setAttribute("class","tooltiptext");
			ulTooltip.setAttribute("id",data._id+"likeListTooltip");
			spanTooltip.appendChild(ulTooltip);


			
			commentBtnRight = createEle("span");
			commentBtnRight.setAttribute("class","comment_btn--right");
			commentBtn.appendChild(commentBtnRight);

			btnEdit = createEle("a");
			btnEdit.setAttribute("href","javascript:void(0)");
			btnEdit.setAttribute("class","btn_edit tooltip");
			btnEdit.style.marginRight ="15px";
			btnEdit.setAttribute("onclick","editMovieComment('"+data._id+"')");
			commentBtnRight.appendChild(btnEdit);

			editIcon = createEle("i");
			editIcon.setAttribute("class","fas fa-pen")
			btnEdit.appendChild(editIcon);

			tooltipEdit = createEle("span");
			tooltipEdit.setAttribute("class","tooltiptext");
			tooltipEdit.innerHTML ="Edit";
			btnEdit.appendChild(tooltipEdit);

			btnSend = createEle("a");
			btnSend.setAttribute("href","javascript:void(0)");
			btnSend.setAttribute("class","btn_send tooltip");
			btnSend.style.marginRight ="15px";
			btnSend.setAttribute("onclick","sendEditMovieComment('"+data._id+"')");
			commentBtnRight.appendChild(btnSend);

			sendIcon = createEle("i");
			sendIcon.setAttribute("class","fas fa-paper-plane")
			btnSend.appendChild(sendIcon);

			tooltipSend = createEle("span");
			tooltipSend.setAttribute("class","tooltiptext");
			tooltipSend.innerHTML ="Send";
			btnSend.appendChild(tooltipSend);

			btnDelete = createEle("a");
			btnDelete.setAttribute("href","javascript:void(0)");
			btnDelete.setAttribute("class","btn_delete tooltip")
			btnDelete.setAttribute("onclick","deleteMovieComment('"+data._id+"')");
			commentBtnRight.appendChild(btnDelete);

			deleteIcon = createEle("i");
			deleteIcon.setAttribute("class","fas fa-trash")
			btnDelete.appendChild(deleteIcon);

			tooltipDelete = createEle("span");
			tooltipDelete.setAttribute("class","tooltiptext");
			tooltipDelete.innerHTML ="Delete";
			btnDelete.appendChild(tooltipDelete);

			commentContentContainer.appendChild(commentContent);



		})
			.catch(function(error){
				console.log(error)
		})
	}
	commentText.value = '';
})



function postLike(value){
	commentID = value;
	likeNumber = getElementID(commentID);	
	likeIcon = getElementID(commentID+"ilike")

	userID = currentUserID.value;
	tooltipText = getElementID(commentID+"tooltip");


	axios({
		method:'post',
		url:"/movie/"+themoviedbIDValue+"/comment/"+commentID+"/like"
	})
	.then(function(response){
		var data = response.data;
		likeNumber.innerHTML = data.like.length;

		var checkUserID = (data.like).includes(userID)
			

		if(userID != null){
			if(checkUserID == true){
				likeIcon.style.color =" #FFC100";
				tooltipText.innerHTML ="Unlike"
			}else{
				likeIcon.style.color="#FFFFFF"
				tooltipText.innerHTML ="Like"
			}
		}

	})
	.catch(function(error){
		console.log(error)
	})
}

function getLikeList(value){
	commentID = value;
	likeListTooltip = getElementID(commentID+"likeListTooltip");
	likeListTooltip.innerHTML = '';
	userID = currentUserID.value;
	axios({
		method:'get',
		url:"/movie/"+themoviedbIDValue+"/comment/"+commentID+"/like"
	})
	.then(function(response){
		var data = response.data;
		if(data.length != 0){
			for (var i=0;i<data.length;i++){
				likeListContent = createEle("li");
				likeListContent.setAttribute("class","likeList_content");
				if(data[i]._id == userID) {
					likeListContent.innerHTML = "You";
				}else{
					likeListContent.innerHTML = data[i].username;
				}			
				likeListTooltip.appendChild(likeListContent);
				//console.log(data[i]);
			}
		}
		
	})


	.catch(function(err){
		console.log(err)
	})


}

function deleteMovieComment(value){
	commentID = value;
	var commentSection = getElementID(commentID+"movieComment");
	commentSection.outerHTML = "";
	axios({
		method:'delete',
		url:"/movie/"+themoviedbIDValue+"/comment/"+commentID
	})
	.then(function(response){
		//console.log(response);	
	})
	.catch(function(error){
		console.log(error)
	})
}

function editMovieComment(value){
	commentID = value;
	var commentParagraph = getElementID(commentID+"commentParagraph");

	if (commentParagraph.isContentEditable == false){
		commentParagraph.contentEditable = true;
		commentParagraph.style.outline="1px #FFC100 solid"
	}else{
		commentParagraph.contentEditable = false;
		commentParagraph.style.outline="0px transparent solid"
	}
}


function sendEditMovieComment(value){
	commentID = value;
	var commentParagraph = getElementID(commentID+"commentParagraph");
	var movieCommentTitle = getElementID(commentID+"movieCommentTitle");
	var commentParagraphValue = commentParagraph.innerHTML;
	var spanEdit = createEle("span");
	var commentContent = getElementID(commentID+"movieComment");

	if (commentContent.classList.contains("edited") == false){
		commentContent.classList.add("edited");
		spanEdit.setAttribute("class","comment_edit");
		commentTxt = createEle("h4");
		commentTxt.setAttribute("class","comment_txt");
		commentTxt.innerHTML ="(edited)";

		spanEdit.appendChild(commentTxt);
		movieCommentTitle.appendChild(spanEdit);
	}
	
	/*spanEdit.setAttribute("class","comment_edit");
	commentTxt = createEle("h4");
	commentTxt.setAttribute("class","comment_txt");
	spanEdit.appendChild(commentTxt);
	commentTxt.innerHTML ="(edited)";
	movieCommentTitle.appendChild(spanEdit);*/



	if(commentParagraph.isContentEditable == true){
		//alert(typeof(commentParagraph.innerHTML));
		axios({
			method:'put',
			url:"/movie/"+themoviedbIDValue+"/comment/"+commentID,
			data:{
				comment:commentParagraphValue
			}
		})
		.then(function(response){

		})
		.catch(function(err){
			console.log(err);
		})
	}
	commentParagraph.contentEditable = false;
	commentParagraph.style.outline="0px transparent solid"
}