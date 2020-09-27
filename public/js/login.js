var getElementId = function(id){
	return document.getElementById(id);
}

var pwdInput = getElementId("form_password"),
	hideBtn  = getElementId("btn_hide");

	


hideBtn.addEventListener("click",function(){
	if(pwdInput.type == "password"){
		pwdInput.type = "text";
		hideBtn.setAttribute("class","");
		hideBtn.setAttribute("class","fas fa-eye-slash");
	}else{
		pwdInput.type = "password";
		hideBtn.setAttribute("class","");
		hideBtn.setAttribute("class","fas fa-eye");
	}
});



