var getElementID = document.getElementById.bind(document)
var queryAll = document.querySelectorAll.bind(document);
var createEle = document.createElement.bind(document);

commentBtn  =  getElementID("comment_button");
commentContentContainer = getElementID("comment_content_container");
themoviedbID = getElementID("themoviedbID");
commentText = getElementID("comment_text");
currentUserID = getElementID("currentUserID");

commentContentElement = queryAll(".comment_content");

likeButton = queryAll(".like_button");
deleteButton = queryAll(".delete_button");

likeNumber = queryAll(".like_number");
likeIcon = queryAll(".like_icon");
likeList = queryAll(".like_list");

commentLikeCount = queryAll(".comment_like_count");

likeButtonIcon = queryAll(".like_button_icon")
likeButtonText = queryAll(".like_button_text")
editButton = queryAll(".edit_button")
saveButton = queryAll(".save_button")

commentParagraph = queryAll(".comment_paragraph")
contentSectionBottom = queryAll(".content_section--bottom")

mediaType = getElementID("mediaType").innerHTML;
themoviedbIDValue = themoviedbID.textContent;
userID = currentUserID.value;

if(commentText != null){
	commentText.addEventListener("keydown",function(event){
		if (event.which == 13 || event.keyCode == 13){
			event.preventDefault();
		}
	})	
}

hideSaveButton = () =>{
	for (let i=0;i<saveButton.length;i++){
		saveButton[i].style.display = "none"
	}
}

likeComment = () =>{
	for (let i=0;i<likeButton.length;i++){
		likeButton[i].addEventListener("click",function(){
			let commentID = commentContentElement[i].dataset.commentId
			axios({
				method:'post',
				url:"/"+mediaType+"/"+themoviedbIDValue+"/comment/"+commentID+"/like"
			})

			.then(function(response){
					let  data = response.data;
					console.log(data)
					likeNumber[i].innerHTML = "";
					likeNumber[i].innerHTML = data.like.length
					let checkUserID = (data.like).includes(userID)

				if(userID != null){
					if(checkUserID == true){
						likeButtonIcon[i].style.color =" #FFC100";
						likeButtonText[i].innerHTML = "Unlike"
					}else{
						likeButtonIcon[i].style.color="#FFFFFF";
						likeButtonText[i].innerHTML = "Like";

					}
				}

			})
			.catch(function(error){
				console.log(error)
			})

		})
	}
}

deleteComment = () =>{
	for(let i=0;i<deleteButton.length;i++){
		deleteButton[i].addEventListener("click",function(){
			let commentID = commentContentElement[i].dataset.commentId
			commentContentElement[i].outerHTML = "";
			axios({
				method:'delete',
				url:"/"+mediaType+"/"+themoviedbIDValue+"/comment/"+commentID
			})
			.then(function(response){
				//console.log(response);	
			})
			.catch(function(error){
				console.log(error)
			})
		})
	}
}

showLikeCommentList = ()  =>{
	for (let i=0;i<likeIcon.length;i++){
		//likeList[i].innerHTML = "";

		commentLikeCount[i].addEventListener("mouseleave",function(){
			likeList[i].innerHTML = "";
		})

		commentLikeCount[i].addEventListener("mouseenter",function(){
			let commentID = commentContentElement[i].dataset.commentId
			//likeList[i].innerHTML = "";
			axios({
				method:'get',
				url:"/movie/"+themoviedbIDValue+"/comment/"+commentID+"/like"
			})
			.then((response)=>{
				let data = response.data;
				console.log(data.length)
				//likeList
				if(data.length > 0){
					let listElement = createEle("span");
					listElement.setAttribute("class","likeList_content");
					let result = "";
					for (let j=0;j<data.length;j++){
						if(data[j]._id == userID){
							result+="You" + "<br>"
						}else{
							result += data[j].username + "<br>"
						}
						listElement.innerHTML = result;
						likeList[i].appendChild(listElement);

					}				
				}

			})
			.catch((error)=>{
				console.log(error)
			})
			
		})

	}
}



editComment = () =>{
	for (let i=0;i<editButton.length;i++){
		editButton[i].addEventListener("click",function(){
			let commentID = commentContentElement[i].dataset.commentId
			if (commentParagraph[i].isContentEditable){
				commentParagraph[i].contentEditable = false
				commentParagraph[i].style.outline ="0px transparent solid"
				saveButton[i].style.display ="none"
			}else{
				commentParagraph[i].contentEditable = true
				commentParagraph[i].style.outline ="1px #FFC100 solid"
				saveButton[i].style.display ="block"
				saveButton[i].addEventListener("click",function(){
					//alert(commentParagraph[i].innerHTML)
					let commentParagraphValue = commentParagraph[i].innerHTML
					commentParagraph[i].contentEditable = false
					commentParagraph[i].style.outline ="0px transparent solid"
					saveButton[i].style.display ="none"
					axios({
						method:'put',
						url:"/"+mediaType+"/"+themoviedbIDValue+"/comment/"+commentID,
						data:{
							comment:commentParagraphValue
						}
					})
					.then(function(response){

					})
					.catch(function(err){
						console.log(err);
					})

				})
			}
		})
	}
}

loadLikeComment = () => {
	if(userID != null){
		axios.get("/"+mediaType+"/"+themoviedbIDValue+"/comment")
		.then((response)=>{
			let data = response.data
			for (let i=0;i<commentContentElement.length;i++){
				for (let j=data.length-1;j>=0;j--){
					let commentID = commentContentElement[i].dataset.commentId
					if (data[j]._id == commentID){
						let checkUserID =(data[j].like).includes(userID)
						if(userID !== null){
							if (checkUserID){
								likeButtonIcon[i].style.color =" #FFC100";
								likeButtonText[i].innerHTML = "Unlike"
							}else{
								likeButtonIcon[i].style.color="#FFFFFF";
								likeButtonText[i].innerHTML = "Like"
							}
						}
					}
				}
			}
		})
		.catch((error)=>{
			console.log(error)
		})			
	}
}

checkOwnership = () =>{
	axios({
		method:"get",
		url:"/movie/"+themoviedbIDValue+"/comment"
	})
	.then((response)=>{
		//console.log(response.data)
		let data = response.data;
		for (let i=0;i<data.length;i++){
			for (let j=0;j<commentContentElement.length;j++){
				let commentID = commentContentElement[j].dataset.commentId
				if(commentID === data[i]._id){
					if(userID === data[i].author.id){
						deleteButton[i].style.display = "block"
						editButton[i].style.display = "block"
					}else{
						deleteButton[i].style.display = "none"
						editButton[i].style.display = "none"
					}
				}

			}			
		}

	})
	.catch((error)=>{
		console.log(error)
	})
}


createNewComment = () => {
	if(commentBtn != null){
		commentBtn.addEventListener("click",function(){
			commentTextValue = commentText.value
			if (commentTextValue.length > 0){
				axios({
					method:'post',
					url:"/"+mediaType+"/"+themoviedbIDValue+"/comment",
					data:{
						comment:commentTextValue
					}
				})
				.then((response)=>{
					let data = response.data;
					let commentID = data._id
					createNewCommentContent(data);
					commentContentContainer.insertAdjacentElement('afterbegin', commentContent);
					let saveButton = commentContent.querySelector(".content_section--bottom > .save_button")
					saveButton.style.display ="none"	
					likeNewComment(commentID)
					deleteNewComment(commentID)
					editNewComment(commentID)
					showLikeNewCommentList(commentID)


				})
				.catch((error)=>{
					console.log(error)
				})

			}
			commentText.value = '';

		})
	}	
}

createNewCommentContent = (data) =>{
	commentContent = createEle("li");
	commentContent.setAttribute("class","comment_content");
	commentContent.setAttribute("data-comment-id",data._id);
	commentContent.innerHTML = `
		<div class="content_section--top">
			<h3 class="comment_author">@${data.author.username}</h3>
			<h3 class="comment_date">${moment(data.postedAt).fromNow()}</h3>
		</div>

		<div class="content_section--middle">
			<p class="comment_paragraph" contenteditable="false">${data.text}</p>
			<div class="comment_like_count">
				<i class="fas fa-heart like_icon"></i>
				<h3 class="like_number">${data.like.length}</h3>
				<div class="like_list"></div>
			</div>
		</div>

		<div class="content_section--bottom">
			<div class="like_button">
				<div class="button_container">
					<i class="fas fa-heart fa-fw like_button_icon"></i>
					<h4 class="like_button_text">Like</h4>
				</div>
			</div>
			<div class="edit_button">
				<div class="button_container">
					<i class="fas fa-pen fa-fw edit_button_icon"></i>
					<h4 class="edit_button_text">Edit</h4>
				</div>
			</div>
			<div class="delete_button">
				<div class="button_container">
					<i class="fas fa-trash fa-fw delete_button_icon"></i>
					<h4 class="delete_button_text">Delete</h4>
				</div>
			</div>
			<div class="save_button">
				<div class="button_container">
					<i class="fas fa-save save_button_icon"></i>
					<h4 class="save_button_text">Save</h4>
				</div>
			</div>
		</div>
	`
}


editNewComment = (commentID) => {
	let editButton = commentContent.querySelector(".content_section--bottom > .edit_button")
	let saveButton = commentContent.querySelector(".content_section--bottom > .save_button")
	let commentParagraph = commentContent.querySelector(".content_section--middle > .comment_paragraph")

	editButton.addEventListener("click",function(){
		if (commentParagraph.isContentEditable){
			commentParagraph.contentEditable = false
			commentParagraph.style.outline ="0px transparent solid"
			saveButton.style.display ="none"
		}else{
			commentParagraph.contentEditable = true
			commentParagraph.style.outline ="1px #FFC100 solid"
			saveButton.style.display ="block"
			saveButton.addEventListener("click",function(){
				let commentParagraphValue = commentParagraph.innerHTML
				commentParagraph.contentEditable = false
				commentParagraph.style.outline ="0px transparent solid"
				saveButton.style.display ="none"
				axios({
					method:'put',
					url:"/"+mediaType+"/"+themoviedbIDValue+"/comment/"+commentID,
					data:{
						comment:commentParagraphValue
					}
				})
				.then(function(response){

				})
				.catch(function(err){
					console.log(err);
				})

			})
		}
	})
}

likeNewComment = (commentID) =>{
	let likeButton = commentContent.querySelector(".content_section--bottom > .like_button")
	let likeNumber = commentContent.querySelector(".content_section--middle > .comment_like_count > .like_number")
	let likeButtonIcon = commentContent.querySelector(".content_section--bottom > .like_button > .button_container > .like_button_icon")
	let likeButtonText = commentContent.querySelector(".content_section--bottom > .like_button > .button_container > .like_button_text")
	likeButton.addEventListener("click",function(){
		axios({
			method:'post',
			url:"/"+mediaType+"/"+themoviedbIDValue+"/comment/"+commentID+"/like"
		})
		.then((res)=>{
			let  data = res.data;
			likeNumber.innerHTML = data.like.length
			let checkUserID = (data.like).includes(userID)

			if(userID != null){
				if(checkUserID == true){
					likeButtonIcon.style.color =" #FFC100";
					likeButtonText.innerHTML = "Unlike"
				}else{
					likeButtonIcon.style.color="#FFFFFF";
					likeButtonText.innerHTML = "Like"
				}
			}

		})
		.catch((err)=>{
			console.log(err)
		})
	})
}

deleteNewComment = (commentID) =>{
	let deleteButton = commentContent.querySelector(".content_section--bottom > .delete_button")
	deleteButton.addEventListener("click",function(){
		commentContent.outerHTML = "";
		axios({
			method:'delete',
			url:"/"+mediaType+"/"+themoviedbIDValue+"/comment/"+commentID
		})
		.then(function(res){	
		})
		.catch(function(err){
			console.log(err)
		})						
	})
}
showLikeNewCommentList = (commentID) => {
	let commentLikeCount = commentContent.querySelector(".content_section--middle > .comment_like_count")
	let likeList = commentContent.querySelector(".content_section--middle > .comment_like_count > .like_list")

	commentLikeCount.addEventListener("mouseleave",function(){
		likeList.innerHTML = "";
	})

	commentLikeCount.addEventListener("mouseenter",function(){
		axios({
			method:"get",
			url:"/movie/"+themoviedbIDValue+"/comment/"+commentID+"/like"
		})
		.then((response)=>{
			let data  = response.data
			if(data.length > 0){
					let listElement = createEle("span");
					listElement.setAttribute("class","likeList_content");
					let result = "";
					for (let j=0;j<data.length;j++){
						if(data[j]._id == userID){
							result+="You" + "<br>"
						}else{
							result += data[j].username + "<br>"
						}
						listElement.innerHTML = result;
						likeList.appendChild(listElement);
					}
			}
		})
		.catch((error)=>{
			console.log(error)
		})
	})

}

window.addEventListener("load",function(){
	if(userID !== null){
		loadLikeComment()
		likeComment()
		checkOwnership()
	}
	
	
	createNewComment()
	deleteComment()
	editComment()
	hideSaveButton()
	showLikeCommentList()
})






