var getElementId = function(id){
	return document.getElementById(id);
}

var pwdInput = getElementId("form_password"),
	confirmInput = getElementId("form_confirm"),
	hideBtn1  = getElementId("btn_hide_pwd"),
	hideBtn2 = getElementId("btn_hide_confirm");

	


hideBtn1.addEventListener("click",function(){
	if(pwdInput.type == "password"){
		pwdInput.type = "text";
		hideBtn1.setAttribute("class","");
		hideBtn1.setAttribute("class","fas fa-eye-slash");
	}else{
		pwdInput.type = "password";
		hideBtn1.setAttribute("class","");
		hideBtn1.setAttribute("class","fas fa-eye");
	}
});

hideBtn2.addEventListener("click",function(){
	if(confirmInput.type == "password"){
		confirmInput.type = "text";
		hideBtn2.setAttribute("class","");
		hideBtn2.setAttribute("class","fas fa-eye-slash");
	}else{
		confirmInput.type = "password";
		hideBtn2.setAttribute("class","");
		hideBtn2.setAttribute("class","fas fa-eye");
	}
});