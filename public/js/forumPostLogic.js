var threadElement = document.querySelector(".thread_element");
var threadID = threadElement.dataset.threadId;
(function(){
    let channelName = "post_"+threadID;
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    let serverUrl = "/",
        comments = [],
        pusher = new Pusher('793fa2e17e9343059f1a', {
            cluster: 'eu',
            encrypted:true
        });
        channel = pusher.subscribe(channelName);
})();


var postInput = document.getElementById("post_input");
var postSendButton = document.getElementById("post_button");
var categorieEle = document.querySelectorAll(".thread_categorie");
var postList = document.querySelector(".post_list");
var numberComment = document.querySelector(".comment_thread_subtxt");


var likeButton = document.querySelector(".like_thread_button");
var likeIcon = document.querySelector(".like_thread_icon");
var likeText = document.querySelector(".like_thread_text");

var followText = document.querySelector(".follow_thread_text");
var followIcon = document.querySelector(".follow_thread_icon");

var totalFollowerNumber = document.querySelector(".total_follower_number");
var totalLikeNumber = document.querySelector(".total_like_number")
var totalCommentsNumber = document.querySelector(".total_comments_number");
var lastCommentDate = document.querySelector(".last_comment_date");
var lastCommentAuthor = document.querySelector(".last_comment_author");


var panelButton = document.querySelectorAll(".statistic_panel_button");
var statisticList = document.querySelectorAll(".statistic_list")

var forumCommentNumber = document.querySelector(".total_forum_comment_number");
var forumLikeNumber = document.querySelector(".total_forum_like_number");

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
            likeButton.addEventListener("click",function(){
                postLikeTopic (threadID)
            })
		}
	}
	catch(error){
		return error
	}
}

updateLikeIcon = async (data) =>{
    try{
        let userID = await getUserID()
        let checkUserID = data.like.includes(userID)
        if(checkUserID){
            likeIcon.style.color ="#FFC100"
        }else{
            likeIcon.style.color ="#585858"
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
        updateLikeIcon(data)
	}
	catch(error){
		return error
	}
}

updateLikeNumber = (data) =>{
    likeText.innerHTML = data.like.length;
    totalLikeNumber.innerHTML = data.like.length;
    updateLikeIcon (data);
}


loadikeTopic = async () =>{
	try{
		let userID = await getUserID()
		if(userID != null){	
            let foundTopic = await axios.get("/forum/topic/"+threadID+"/post/detail")
            let data = foundTopic.data;
            let checkUserID = data.like.includes(userID)
            if(checkUserID){
                likeIcon.style.color ="#FFC100"
            }else{
                likeIcon.style.color ="#585858"
            }

		}
	}
	catch(error){
		return error
	}
}

followTopic = async () =>{
	let userID;
	try{
		let userID = await getUserID()
		if (userID != null){
			followIcon.addEventListener("click",function(){
                postFollowTopic (threadID)						
			})
			
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
        let response2 = await axios.get("/forum/topic/"+threadID+"/post/followers")
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

updateFollowState = (data) =>{
    loadFollowTopic(data);
}

updateFollowerNumber = (data) =>{
    totalFollowerNumber.innerHTML = data;
}

loadFollowTopic = (data) =>{
	let checkTopicID = data.topic.includes(threadID)
	if(checkTopicID){
		followIcon.style.color ="#FFC100"
		followText.innerHTML = "Unfollow"				
	}else{
		followIcon.style.color ="#585858"
		followText.innerHTML = "Follow"	
	}
	
}



postSendButton.addEventListener("click",function(){
    let newPost = {
        "comment":postInput.value
    }
    addnewComment (newPost)  
    postInput.value = "";  
})

addnewComment = async (newPost) =>{
    try{
        let response = await axios.post("/forum/topic/"+threadID+"/post",newPost)
        //console.log(response.status)
    }
    catch(error){
        console.error(error)
    }
}


newCommentReceived = (data) =>{
    let newPostData = data.post;
    let numberPost = newPostData.length;

    let newPost = document.createElement("li");
    newPost.classList.add("post_element");
    newPost.classList.add("new_post_element");
    newPost.innerHTML = `
        <div class="post_container">
        <div class="post_section--top">
            <h4 class="post_author">@${newPostData[newPostData.length-1].author.username}</h4>
            <h4 class="post_date">${moment(newPostData[newPostData.length-1].date).fromNow()}</h4>
        </div>
        <div class="post_section--main">
            <p>${newPostData[newPostData.length-1].text}</p>
        </div>
        <div class="post_section--bottom"></div>
        </div>
    `
    totalCommentsNumber.innerHTML = numberPost
    lastCommentDate.innerHTML = moment(newPostData[newPostData.length-1].date).fromNow()
    lastCommentAuthor.innerHTML = newPostData[newPostData.length-1].author.username

    postList.prepend(newPost)
    if (numberPost < 2){
        numberComment.innerHTML = `${numberPost} Comment`
    }else{
        numberComment.innerHTML = `${numberPost} Comments`
    }
}

updateForumInfo = (data) =>{
    forumCommentNumber.innerHTML = data.total_comment
    forumLikeNumber.innerHTML = data.total_like
}

channel.bind("new_post_forum",newCommentReceived);
channel.bind("update_like_number_in_detail_post",updateLikeNumber)
channel.bind("update_follow_in_detail_post",updateFollowState);
channel.bind("update_follower_number_in_detail_post",updateFollowerNumber);
channel.bind("update_forum_info_in_detail_post",updateForumInfo);

likeTopic()
loadikeTopic()
followTopic()
loadAllFollowTopic()