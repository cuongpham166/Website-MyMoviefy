var getElementID = function(id){
	return document.getElementById(id);
}
var createEle = document.createElement.bind(document);
var subforumSelectID = getElementID("subforumSelectID");
var categorieSelectID = getElementID("categorieSelectID");
var threadTitle = getElementID("threadTitleID");
var categorieEle = document.querySelectorAll(".thread_categorie");
var postInput = getElementID("post_input");
var postButton = getElementID("post_button");
var threadID = getElementID("thread_id");
var postList = getElementID("postListID");
var commentNumber = getElementID("comment_number");
//alert(threadID.innerHTML);

var movieCatList = ["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family",
"Fantasy","History","Music","Mystery","Romance","Science Fiction","TV Movie","Thriller","War","Western"] //18

var tvCatList = ["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family",
"Kids","Mystery","News","Reality","Sci-Fi","Fantasy","Soap","Talk","War", "Politics","Western"] //19

var colorList = ["#EB2188","#080A52","#FF7533","#FF0000","#FFC100","#005600","#bf1859","#ef6748","#3758bb","#e32185",
"#61120b","#cb6c4d","#7c2a53","#3a2735","#576ebd","#419674","#4e5890","#3a5045","#32c2ca","#261a03","#8f50c3","#b55042",
"#290543","#746a8f","#ed2d05"];

var mySet = new Set ([...movieCatList,...tvCatList]);
var mergedArr = Array.from(mySet) //25

for(var i=0;i<categorieEle.length;i++){
	for (var j=0;j<mergedArr.length;j++){
		if(categorieEle[i].innerHTML == mergedArr[j]){
			categorieEle[i].style.backgroundColor = colorList[mergedArr.indexOf(mergedArr[j])]
		}
	}
}

var threadList = document.querySelector(".thread_list")
var threadElement = document.querySelectorAll(".thread_element")
var likeThreadButton = document.querySelectorAll(".like_thread_button")
var likeThreadIcon = document.querySelectorAll(".like_thread_icon")
var likeThreadText = document.querySelectorAll(".like_thread_text")

var followThreadButton = document.querySelectorAll(".follow_thread_button");
var followThreadIcon = document.querySelectorAll(".follow_thread_icon");
var followThreadText = document.querySelectorAll(".follow_thread_text");


var deleteThreadButton = document.querySelectorAll(".delete_thread_button");

var panelButton = document.querySelectorAll(".statistic_panel_button");
var statisticList = document.querySelectorAll(".statistic_list")


for(let i=0;i<panelButton.length;i++){
    panelButton[i].addEventListener("click",function(){
        if(statisticList[i].style.display == "none"){
            panelButton[i].classList.remove("fa-arrow-down")
            panelButton[i].classList.add("fa-arrow-up")
            statisticList[i].style.display = "block"
        }else{
            panelButton[i].classList.remove("fa-arrow-up")
            panelButton[i].classList.add("fa-arrow-down")
            statisticList[i].style.display = "none"            
        }
    })
}

getUserID = async () => {
	let userID ;
	try{
		let foundResult = await axios.get("/userid")
		userID = foundResult.data;
		return userID
	}
	catch(error){
		return error
	}
}

likeTopic = async () =>{
	let userID
	try{
		userID = await getUserID ()
		if (userID != null){
			for (let i=0;i<likeThreadButton.length;i++){
				likeThreadButton[i].addEventListener("click",function(){
					let threadID = threadElement[i].dataset.threadId
					postLikeTopic (threadID)
				})
			}
		}
	}
	catch(error){
		return error
	}
}

postLikeTopic = async (threadID)=>{
	try{
		let userID = await getUserID()
		let response = await axios.post("/forum/topic/"+threadID+"/like")
		let data = response.data;
		for (let i=0;i<threadElement.length;i++){
			let idThread = threadElement[i].dataset.threadId;
			if(idThread === data._id){
				likeThreadText[i].innerHTML = data.like.length;
				let checkUserID = data.like.includes(userID)
				if(checkUserID){
					likeThreadIcon[i].style.color ="#FFC100"
				}else{
					likeThreadIcon[i].style.color ="#585858"
				}
			}
		} 
	}
	catch(error){
		return error
	}
}

loadAllLikeTopic = async () =>{
	try{
		let userID = await getUserID()
		if(userID != null){	
			let foundTopics = await axios.get("/forum/topic/all")
			let data = foundTopics.data
			for (let i=0;i<threadElement.length;i++){
				let idThread = threadElement[i].dataset.threadId;
					for (let j=0;j<data.length;j++){
						if(idThread === data[j]._id){
							let checkUserID = data[j].like.includes(userID)
							if(checkUserID){
								likeThreadIcon[i].style.color ="#FFC100"
							}else{
								likeThreadIcon[i].style.color ="#585858"
							}	
						}	
					}		
			}
		}
	}
	catch(error){
		return error
	}
}

loadAllLikeTopic()
likeTopic()

followTopic = async () =>{
	let userID;
	try{
		let userID = await getUserID()
		if (userID != null){
			for (let i=0;i<followThreadButton.length;i++){
				followThreadButton[i].addEventListener("click",function(){
					let threadID = threadElement[i].dataset.threadId
					postFollowTopic (threadID)					
				})
			}
		}
	}
	catch(error){
		return error
	}
}

postFollowTopic = async (threadID) =>{
	try{
		let userID = await getUserID()
		let response = await axios.post("/forum/topic/"+threadID+"/follow")
		let data = response.data
		loadFollowTopic(data);
	}	
	catch(error){
		return error
	}
}

loadAllFollowTopic = async () =>{
	try{
		let userID = await getUserID()
		if(userID != null){	
			let foundUser = await axios.get("/forum/topic/all/follow")
			let data =  foundUser.data;
			loadFollowTopic(data);
		}
	}
	catch(error){
		return error
	}
}

loadFollowTopic = (data) =>{
	for (let i=0;i<threadElement.length;i++){
		let idThread = threadElement[i].dataset.threadId;
		let checkTopicID = data.topic.includes(idThread)
		if(checkTopicID){
			followThreadIcon[i].style.color ="#FFC100"
			followThreadText[i].innerHTML = "Unfollow"				
		}else{
			followThreadIcon[i].style.color ="#585858"
			followThreadText[i].innerHTML = "Follow"	
		}
	}
}


loadAllFollowTopic()
followTopic()

deleteTopics = async () =>{
	let userID = await getUserID();
	if(userID != null){
		for (let i=0;i<deleteThreadButton.length;i++){
			deleteThreadButton[i].addEventListener("click",function(){
				let idThread = threadElement[i].dataset.threadId;
				deleteTopic(idThread,userID,i);
			})
		}
	}
}

deleteTopic = async (threadID,userID,index) =>{
	try{
		let foundTopic = await axios.get("/forum/topic/"+threadID)
		let data = foundTopic.data[0];
		if(threadID === data._id && userID === data.author.id){
			console.log(index)
			console.log(threadElement[index])
			console.log(threadList)
			
			//let deletedTopic = await axios.delete("/forum/topic/"+threadID);
			threadElement[index].outerHTML = "";
		}
	}
	catch(error){
		return error
	}
}

deleteTopics()

/*function deleteTopic (value){
	var topicID = value;
	var topicElement = getElementID(value+"threadElement");
	topicElement.outerHTML = "";
	axios({
		method:'delete',
		url:"/forum/topic/"+topicID
	})
	.then(function(response){
		console.log(response.status);	
	})
	.catch(function(error){
		console.log(error)
	})
}*/





if(threadTitle != undefined){
	if (threadTitle.innerHTML == "Create New Topic"){
	createMovieCatSelect();
	}else{
		if(subforumSelectID.value == "mfy/tvshow"){
			appendTVCatSelect();
		}else{
			appendMovieCatSelect();
		}
	}
}

if (postInput !=null){
postInput.addEventListener("keydown",function(event){
	if (event.which == 13 || event.keyCode == 13){
		event.preventDefault();
	}
})
}


if (postButton !=null){
	postButton.addEventListener("click",sendPost);

}







function sendPost(){
	var threadid = threadID.innerHTML
	var text = postInput.value;
	if(postInput.value != ""){
		postInput.value = "";
		axios({
			method:'post',
			url:"/forum/topic/"+threadid+"/post",
			data:{
				text:text
			}
		})
		.then(function(response){
			var data = response.data.post;
			var dataTopic = response.data.topic;
			appendPostList(data);
			changeCommentNumber(dataTopic);
		})
		.catch(function(error){
			console.log(error)
		})
	}
	
}

function changeCommentNumber (dataInput){
	var data = dataInput;
	commentNumber.innerHTML = data.post.length +" "+"Comments";
}


function appendPostList (dataInput){
	var data = dataInput;
	postCommentEle = createEle("li")
	postCommentEle.setAttribute("class","post_element")

	postContainer = createEle("div")
	postContainer.setAttribute("class","post_container");
	postContainer.innerHTML = `
		<div class="post_section--top">
			<h4 class="post_author">@${data.author.username}</h4>
			<h4 class="post_date">${moment(data.date).fromNow()}</h4>
		</div>
		<div class="post_section--main">
			<p>${data.text}</p>
		</div>
		<div class="post_section--bottom"></div>	
	`
	postCommentEle.appendChild(postContainer);
	postList.appendChild(postCommentEle);
}

function createMovieCatSelect(){
		var categorieSelect = createEle("select");
		categorieSelect.setAttribute("class","thread_select");
		categorieSelect.setAttribute("id","categorieSelectID");
		categorieSelect.setAttribute("name","topic[categorie]");	
		for (var i=0;i<movieCatList.length;i++){
			var option = createEle("option");
			option.setAttribute("value",movieCatList[i]);
			option.innerHTML=movieCatList[i];
			categorieSelect.appendChild(option);
		}	
		categorieSelectID.innerHTML = categorieSelect.innerHTML

}

function createTVCatSelect(){
	var categorieSelect = createEle("select");
	categorieSelect.setAttribute("class","thread_select");
	categorieSelect.setAttribute("id","categorieSelectID");
	categorieSelect.setAttribute("name","topic[categorie]");

	for (var i=0;i<tvCatList.length;i++){
		var option = createEle("option");
		option.setAttribute("value",tvCatList[i]);
		option.innerHTML=tvCatList[i];
		categorieSelect.appendChild(option);
	}

	categorieSelectID.innerHTML = categorieSelect.innerHTML;

}


function appendTVCatSelect(){
	var categorieSelectIDValue = categorieSelectID.value;
	for (var i=0;i<tvCatList.length;i++){
		if(tvCatList[i] !== categorieSelectIDValue ){
			var option = createEle("option");
			option.setAttribute("value",tvCatList[i]);
			option.innerHTML=tvCatList[i];
			categorieSelectID.appendChild(option)
		}

	}
}

function appendMovieCatSelect(){
	var categorieSelectIDValue = categorieSelectID.value;
	for (var i=0;i<movieCatList.length;i++){
		if(movieCatList[i] !== categorieSelectIDValue ){
			var option = createEle("option");
			option.setAttribute("value",movieCatList[i]);
			option.innerHTML=movieCatList[i];
			categorieSelectID.appendChild(option)
		}

	}

}

function chooseSubforum(){
	if(subforumSelectID.value == "mfy/tvshow"){
		createTVCatSelect();

	}else{
		createMovieCatSelect();
	}

}

