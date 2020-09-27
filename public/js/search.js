var getElementID = function(id){
  return document.getElementById(id);
}

var createEle = function(element){
  return document.createElement(element);
}

var getQuery = function(query){
  return document.querySelector(query);
}

function search(){
  var inputText = getElementID("inputText");
  var inputValue = inputText.value;
  var resultWrapper = getElementID("result_wrapper");
  var resultTitle =  getElementID("result_title");

  if(inputValue.length == 0){
    resultWrapper.innerHTML = '';
    resultTitle.innerHTML = '';
  }


  var url ="/search/"+inputValue;
  axios.get(url)
    .then(function(response){
      //console.log(response.data); //Array.
      var data = response.data;
      resultWrapper.innerHTML = ''

      if(data.length != 0){
      resultTitle.innerHTML=data.length + " " + "Result(s)"
      for (var i=0;i<data.length;i++){
        var resultData = createEle("li");
          resultWrapper.appendChild(resultData)
          resultData.setAttribute("class","result_data");

          var resultIcon = createEle("i");
          resultData.appendChild(resultIcon);

          var resultLink = createEle("a");
          resultData.appendChild(resultLink);
          resultLink.setAttribute("class","result_link");

          if(data[i].media_type == "movie"){
            resultIcon.setAttribute("class","fas fa-film fa-fw result_icon");
            resultLink.setAttribute("href","/movie/"+data[i].id);
            resultLink.innerHTML = data[i].title;
          }else{
            resultIcon.setAttribute("class","fas fa-tv fa-fw result_icon");
            resultLink.setAttribute("href","/tv/"+data[i].id);
            resultLink.innerHTML = data[i].name;
          }
      }

    }


    })
    .catch(function(error){
      console.log(error);
    })
}