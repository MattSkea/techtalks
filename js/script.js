/****************************************************/
/********************INITIALIZE**********************/
/****************************************************/

/*TOGGLE MAIN NAVIGATION*/
/*FOR MOBILE - TOGGLE MENU OPEN & CLOSED*/
$(document).on("click", ".toggleNav", function(){
	var container = ".flex-nav ul";

	toggleContainer(container);
});

/*TOGGLE MAIN SEARCH*/
/*TOGGLE SEARCH OPEN & CLOSED*/
$(document).on("click", ".search-icon-button", function(){
	var container = ".search-input-container";
	
	toggleHeaderSeachContainer(container);
});

/*DYNAMIC NAVIGATION*/
$(document).on("click", ".link", function () {
	/*retrieve the attribute on the link that was clicked*/
	var sIdWindowToShow = $(this).attr("data-go-to");
	var sIdPopUpToShow = $(this).attr("data-popup");

	/*retrieve the parent element and see if the parent is article-links(inside main menu)*/
	var sElementParent = $(this).parent().attr("id");
	
	/*get name of header*/
	var containerToHide = ".flex-nav ul";

	if(sIdPopUpToShow!=null){
		fnShowPopUp(sIdPopUpToShow);	
	}

	if(sIdWindowToShow!=null){
		/*hide the current window*/
		fnHideCurrentWindow();

		/*show the selected window*/
		fnShowSelectedWindow(sIdWindowToShow);
		

		/*hide the navigation*/
		toggleContainer(containerToHide);
	}
	/*hide the navigation*/
	// toggleContainer(containerToHide);
});



$(document).on("click", ".buttonClick", function () {
	var sButtonFunction=$(this).attr("data-button");

	if(sButtonFunction=="event-show-map"){
		/* show map on mobile phone */
		toggleContainerFlex(".event-card-map-container");
	}
});

/************** LOGIN - SHOW OVERLAY ****************/
$(document).on("click", "#header-login-link", function(e){
	e.preventDefault();
	showOverlay();   
});

/************** REGISTER - SHOW OVERLAY *************/
$(document).on("click", "#header-register-link", function(e){
	e.preventDefault();
	showOverlay();   
});

/************** CONTACT - SHOW OVERLAY **************/
$(document).on("click", "#header-contact-link", function(e){
	e.preventDefault();
	showOverlay();   
});

/************* BOOK EVENT - SHOW OVERLAY ************/
$(document).on("click", ".bookEvent" , function(e){
	/*GET THE TARGETED EVENT ID TO BOOK TICKETS FOR*/
	var target = $(e.target);
	var targetDataEventToBook = target.data("book");
	var bookEventId = targetDataEventToBook.split("-").pop();
	var showSection = "section-confirm-booking";

	var compare = "section-overlay";
	requestEventBooking();
	// showOverlay();    
	// fnShowSelectedWindow(showSection) ;
});


/****************** HIDE OVERLAY ********************/
$(document).on("click", "#section-overlay" , function(e){
	var target = e.target.id;
	var compare = "section-overlay";

	/*IF THE USER CLICKS OUTSIDE THE FORM, HIDE THE OVERLAY WITH LOGIN*/
	if(target === compare){
		hideOverlay();
	} 
});

/******************CREATE USER **********************/
$(document).on("click", ".register-button", function () {
	fnFormValidation();
});

/*INITIALIZE LOGIN*/
$(document).on("click", "#btn-login-user", function () {
	/*fire off the login function*/
	fnLogin();
});
/*INITIALIZE LOGOUT*/
$(document).on("click", "#header-logout-link", function () {
	fnLogout();
});

/****************************************************/
/*GET ALL EVENTS WHEN THE USER CLICKS ON EVENTS LINK*/
$('[data-go-to="section-admin-events"]').click(function () {

	/*request the properties from the controller*/
	fnGetEvents();
});

/**GET ALL PARTNERS WHEN PARTNERS LINK IS CLICKED**/
$('[data-go-to="section-partners"]').click(function () {
	fnHideCurrentWindow();

	/*SHOW THE PARTNERS CONTAINER*/
	$("#section-partners").css({"display": "block"});
	/*SHOW THE PARTNERS CATAGORIES*/
	$("#section-primary-partners").css({"display": "flex"});
	$("#section-events-partners").css({"display": "flex"});

	fnGetPartners();
	fnGetPrimaryPartners();
	fnGetEventsPartners();
});
$('[data-go-to="section-admin-events"]').click(function () {
	fnHideCurrentWindow();

	$("#section-primary-partners").css({"display": "none"});
	$("#section-events-partners").css({"display": "none"});
	
});


$('[data-go-to="section-users"]').click(function () {

	$("#section-events-partners").css({"display": "none"});
	
});

/************* ADD EVENT - SHOW OVERLAY ************/
$(document).on("click", ".popupAdminSelect" , function(e){
	var sIdPopUpToShow = $(this).attr("data-popup");

	if(sIdPopUpToShow!=null){
		fnShowPopUpAdmin(sIdPopUpToShow);	
		showOverlay();   
	}

});

/******APPENDING NEW IMAGES TO THE DOM*************/
$(document).on('change', '[type="file"]', function () {
	/*setup fileReader to read file */
	var preview = new FileReader();
	/*read contents of blob*/
	preview.readAsDataURL(this.files[0]);

	var self = this;


	preview.onload = function (event) {
		$(self).siblings(".img-preview").attr("src", event.target.result);
		$(self).siblings(".img-preview").css("width", "200px");
		$(self).siblings(".img-preview").css("display", "flex");

		/*extract input file name*/
		var fileName = self.name;
		/*extract file name from temp location*/
		var sFileType = self.value.replace(/.*\\/, "");


		var fileDetails = {
			"fileName": fileName,
			"fileImage": sFileType
		};

	};
});



/****************************************************/
/*******************FUNCTIONS************************/
/****************************************************/

/****************************************************/
/*TOGGLE CONTAINER*/
function toggleContainer(containerName){
	/*get the ul state*/

	var container = containerName;
	var state = $(container).css("display");

	/*compare the ul state*/
	if(state === "none"){
		$(container).slideDown();
	} else if(state === "block"){
		$(container).slideUp();
	}
}

/* show pop up window*/
function fnShowPopUp(windowName){
	//console.log($("#"+windowName).html());
	var windowHtml=$("#"+windowName)[0].outerHTML;
	// console.log(windowHtml);
	//$(("#"+windowName).html()).appendTo("#appender");
	$("#appender").html(windowHtml);
	$("#"+windowName).addClass("popup");
	$("#appender").css("display","flex");
	showOverlay();
}

function fnShowPopUpAdmin(windowName){
	//console.log($("#"+windowName).html());
	var windowHtml=$("#"+windowName)[0].outerHTML;
	// console.log(windowHtml);
	//$(("#"+windowName).html()).appendTo("#appender");
	$("#appender").html('<div id="section-overlay" class="mark">\
	<div id="overlay-message">'+windowHtml+"</div></div>");
	$("#"+windowName).addClass("popupAdmin");
	$("#appender").css("display","flex");
	showOverlay();
}
/****************************************************/
/*TOGGLE CONTAINER FLEX*/
function toggleContainerFlex(containerName){
	/*get the ul state*/

	var container = containerName;
	var state = $(container).css("display");

	/*compare the ul state*/
	if(state === "none"){
		$(container).slideDown(400,"swing", function(){
			$(container).css('display', 'flex');
			window.dispatchEvent(new Event('resize'));
		});
		
	} else if(state === "flex"){
		$(container).slideUp();
	}
}
/****************************************************/
/*TOGGLE SEARCH CONTAINER*/
function toggleHeaderSeachContainer(containerName){
	/*get the ul state*/
	var container = containerName;
	var toggleWidth = $("#search-input-text-pc").width() == 300 ? "0px" : "300px";
	var toggleWidthM = $("#search-input-text-mobile").width() == 300 ? "0px" : "300px";
	if($(".search-input-container").css("display")=="none"){
		$("#search-input-text-pc").animate({ width: toggleWidth });
		$("#search-input-text-mobile").animate({ width: toggleWidthM });
		$(".search-input-container").css("display","block");
	}
	else{
		$("#search-input-text-mobile").animate({ width: toggleWidthM });
		$("#search-input-text-pc").animate({ width: toggleWidth});
		$(".search-input-container").css("display","none");
	}


	
}

/*SHOW SELECTED WINDOW*/
function fnShowSelectedWindow(sIdWindowToShow) {
	console.log(sIdWindowToShow)
	/*show the selected window*/
	$("#" + sIdWindowToShow).css({"display": "flex"});
	if (sIdWindowToShow.indexOf("event") >= 0){
	google.maps.event.trigger(map, 'resize');
	console.log("aosiduosdíáwqdliahsdhaszdasíádziuaszdiía");
	}
}
/*HIDE CURRENT WINDOW*/
function fnHideCurrentWindow() {
	$(".section").hide();
}

/****************************************************/
/******************* OVERLAY ************************/
/****************************************************/
/*****************OPEN OVERLAY***********************/
function showOverlay(){
	/*show the overlay*/
	$("#section-overlay").css({"display": "flex"});
	/*hide 'y'-scroll on the body*/
	$("body").css({"overflow-y": "hidden"});
}
/****************************************************/
/*****************HIDE OVERLAY***********************/
function hideOverlay(){
	/*hide the overlay*/
	$("#section-overlay").hide();
	$("#appender").hide();
	/*hide 'y'-scroll on the body*/
	$("body").css({"overflow-y": "scroll"});
}

function requestEventBooking(){
	swal({
		title: "Confirm booking",
		text: "Submit cooking",
		type: "info",
		showCancelButton: true,
		closeOnConfirm: false,
		confirmButtonColor: "#8bc34a",
		showLoaderOnConfirm: true,
	},
	function(){
		setTimeout(function(){
			swal({
				title:"Booking complete",
				type:"success",
				confirmButtonColor: "#8bc34a"
			});
		}, 2000);
	});
}

function initMap() {
	var uluru = {lat: -25.363, lng: 131.044};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
};


/****************************************************/
/****************REGISTER USER***********************/
/**** - using ajax                               ****/   
/*CREATE USER*/
function fnCreateUser() {
	/*setup ajax post*/
	$.ajax({
		"type": "POST",
		"url": "./services/api-user-create.php",
		"data": $("#form-register").serialize(),
		"cache": false,
		"processData": false,
		success: function (jData) {
			/*update the users table*/
			// fnReadUserRegister();
			console.log(jData);

			swal("SIGNUP", "YOU HAVE SUCCESSFULLY REGISTERED", "success");
			setTimeout(function() {fnShowPopUp("section-login");	}, 10);
		},
		error: function (jData) {
			console.log("error - trying to create a user");
		}
	});
}

/*form validation*/
function fnFormValidation(){
	var borderRed={"border-color": "red", 
							   "border-width":"1px", 
             	   "border-style":"solid"};
  var borderNormal=
  							{"border":""};

	var sUserEmail =$("#txt-register-email").val();
	var sUserName =$("#txt-register-fname").val();
	var sUserNameLast =$("#txt-register-lname").val();
	var sUserMobile =$("#txt-register-mobile").val();
	var sUserPassword =$("#txt-register-password").val();
	var sUserRePassword =$("#txt-register-password-re").val();
	$("#txt-register-email").css(borderNormal);
	$("#txt-register-fname").css(borderNormal);
	$("#txt-register-lname").css(borderNormal);;
	$("#txt-register-mobile").css(borderNormal);
	$("#txt-register-password").css(borderNormal);
	$("#txt-register-password-re").css(borderNormal);
	var iPasswordSize=6;
	var iValidationHelper=0; /// if does not = 0 then there is something wrong
	
	if(sUserEmail==""&&iValidationHelper==0){
			$(".information").remove();
			$("<div class='information'>Please fill all fields</div>").insertAfter("#txt-register-email");
			$("#txt-register-email").css(borderRed);
		
		iValidationHelper++;	
	}
		else if(sUserName==""&&iValidationHelper==0){
			$(".information").remove();
			$("<div class='information'>Please fill all fields</div>").insertAfter("#txt-register-fname");
				$("#txt-register-fname").css(borderRed);
		
		iValidationHelper++;	
	}
		else if(sUserNameLast==""&&iValidationHelper==0){
		
			$(".information").remove();
			$("<div class='information'>Please fill all fields</div>").insertAfter("#txt-register-lname");
				$("#txt-register-lname").css(borderRed);
		
		iValidationHelper++;	
	}
		else if(sUserMobile==""&&iValidationHelper==0){
		
			$(".information").remove();
			$("<div class='information'>Please fill all fields</div>").insertAfter("#txt-register-mobile");
				$("#txt-register-mobile").css(borderRed);
		
		iValidationHelper++;	
	}
	else if(!$.isNumeric(sUserMobile)&&iValidationHelper==0){
		$(".information").remove();
			$("<div class='information'>Should be a number without +</div>").insertAfter("#txt-register-mobile");
				$("#txt-register-mobile").css(borderRed);
				iValidationHelper++;	


	}
		else if(sUserPassword==""&&iValidationHelper==0){
		
			$(".information").remove();
			$("<div class='information'>Please fill all fields</div>").insertAfter("#txt-register-password");
				$("#txt-register-password").css(borderRed);
		
		iValidationHelper++;	
	}
		else	if(sUserRePassword==""&&iValidationHelper==0){
		
			$(".information").remove();
			$("<div class='information'>Please fill all fields</div>").insertAfter("#txt-register-password-re");
				$("#txt-register-password-re").css(borderRed);
		
		iValidationHelper++;	
	}
else{
	$(".information").remove();

}

	if(iValidationHelper==0)
	{
		$(".information").remove();
		if(sUserPassword.length<=iPasswordSize){
			$(".information").remove();
			$("<div class='information'>Improve your Password</div>").insertAfter("#txt-register-password");
			$("#txt-register-password").css(borderRed);
			iValidationHelper++;
		 }
		if(sUserEmail.indexOf("@") == -1)
		{
			$(".information").remove();
			$("<div class='information'>Email is not valid</div>").insertAfter("#txt-register-email");
					$("#txt-register-email").css(borderRed);
			iValidationHelper++;
		}
	}
	if(iValidationHelper==0){
		if(sUserPassword!=sUserRePassword)
		{
		$(".validationInfo").text("Password does not match");
		$(".information").remove();
			$("<div class='information'>Password does not match</div>").insertAfter("#txt-register-password");
			$("#txt-register-password").css(borderRed);
			$("#txt-register-password-re").css(borderRed);
		}
		if(sUserPassword==sUserRePassword)
		{

		fnCreateUser(); // if all good create user
		}
	
	}


	
}
/****************************************************/
/****************LOGIN USER**************************/
/**** - using ajax                               ****/ 
function fnLogin() {
	console.log("CLICK");
	/*setup ajax url*/
	var sUrl = "./services/api-login.php?";

	var sUrlData = $("#form-login").serialize();

	sUrl += sUrlData;

	console.log("Url: " + sUrl);

	/* setup ajax post to login the user*/
	$.get(sUrl, function (sJData) {
		console.log("sJData: " + sJData);
		var jData = JSON.parse(sJData);
		console.log(jData);
		/*check the response status*/
		if (jData.status === "ok") {
			console.log("Valid user, login OK!)");
			fnLoginAlert(jData);
		}
		else if (jData.status === "error") {
			console.log("invalid user, login FAIL!");
		}
	});
}
/****************************************************/
/*LOGIN SWEETALERT*/
function fnLoginAlert(jData) {
	swal({
		"title": "LOGIN SUCCESS",
		"text": "Have a nice day.",
		"type": "success",
		"confirmButtonText": "Continue",
		"confirmButtonColor": "#42A5F5"
	},
	function () {
		/*reload the page after login*/
		location.reload();

		/*on success go to properties page*/
		/*handled by php on properties.php*/
	});
}
/*WRITE THE USER DATA TO LOCAL STORAGE*/
function fnCreateUserLocalStorage(sjData) {
	/*write the data to local storage*/
	localStorage.user = sjData;
}
/*SHOW LOGIN ERROR MESSAGE FUNCTION*/
function fnShowLoginErrorMessage() {
	var sLoginErrorMessage = "Error loggin in, please try again!";

	// fnAppendErrorMessage(sLoginErrorMessage);
}
/*HIDE LOGIN ERROR MESSAGE FUNCTION*/
function fnHideLoginErrorMessage() {
	/*GET THE NOTIFICATION TO HIDE*/
	var tLoginNotification = $("#form-login .notification-error");

	// fnHideErrorMessage(tLoginNotification);
}
/****************************************************/
function fnShowLoginInputErrors() {
	/*GET THE BORDER TO SHOW*/
	var eBorderToShow = $("#form-login input");

	// fnShowInputErrors(eBorderToShow);
}
function fnHideLoginInputErrors() {
	/*GET THE BORDER TO SHOW*/
	var eBorderToHide = $("#form-login input");

	// fnHideInputErrors(eBorderToHide);
}

/****************************************************/
/*LOGOUT FUNCTION*/
function fnLogout() {
	/*setup ajax url*/
	var sUrl = "./services/api-logout.php?";
	/*setup ajax post to logout the user*/
	$.get(sUrl, function (sJData) {
	}).done(function () {
		/*reload the page after logout to refresh the session state*/
		setTimeout(function () {
			// fnClearLocalStorage();
			window.location.href = "index.php";
		}, 600);
	});
}
/****************************************************/

/****************************************************/
/*user CRUD*/
/*READ USERS*/
function fnGetUsers() {
	/*setup ajax url*/
	var sUrl = "services/api-user-read.php";
	/*connect to the server and get all the users*/
	$.getJSON(sUrl, function (jData) {
		var iUserCountNew = jData.length;

		/*setup variable - checking if new items have been added*/
		var checkUpdate = fnCheckUpdates(iUserCountOld, iUserCountNew);

		/*get the json status*/
		var sStatus = jData.status;
		var sError = "error";

		/*make sure the client is reveiving data*/
		if (sStatus !== sError) {
			if (checkUpdate == true) {
				/*setup the old user count to = the new user count*/
				iUserCountOld = iUserCountNew;

				/*revers the jData being received*/
				jData.reverse();

				/*user table row blueprint*/
				var sUserBlueprint = '\
				<div class="aside-user-content user-row">\
				<div class="lbl-user-id">{{id}}</div>\
				<div class="lbl-user-email">{{email}}</div>\
				<div class="lbl-user-fname">{{fName}}</div>\
				<div class="lbl-user-lname">{{lName}}</div>\
				<div class="lbl-user-mobile">{{mobile}}</div>\
				<div class="lbl-user-password">{{password}}</div>\
				<div class="lbl-user-type" data-the-icon="{{the-icon-id}}">\
				<span class="fa {{the-icon}} fa-fw"></span>\
				<div class="lbl-user-type-txt">{{the-icon-role}}</div>\
				</div>\
				<div class="btn-user-edit lbl-user-edit users-icons fa fa-edit fa-fw" data-go-to="section-register"></div>\
				<div class="btn-user-delete lbl-user-delete users-icons fa fa-trash fa-fw"></div>\
				</div>';

				/*empty all the rows below the navigation in the table*/
				$(".article-user-rows").empty();

				/*iterate over the data recieved from the server*/
				for (var i = 0; i < jData.length; i++) {
					/*create a blueprint of the template that can be used as rows for the table*/
					var sUserTemplate = sUserBlueprint;

					/*get the information from each item*/
					var sUserTemplateId = jData[i].id;
					var sUserTemplateEmail = jData[i].email;
					var sUserTemplateFname = jData[i].fname;
					var sUserTemplateLname = jData[i].lname;
					var sUserTemplateMobile = jData[i].mobile;
					var sUserTemplatePassword = jData[i].password;
					var sUserTemplateUserid = jData[i].userType.id;
					var sUserTemplateUserRole = jData[i].userType.role;
					var sUserTemplateUserIcon = jData[i].userType.icon;

					/*replace the placeholders in the template with the data recieved from the server*/
					sUserTemplate = sUserTemplate.replace("{{id}}", sUserTemplateId);
					sUserTemplate = sUserTemplate.replace("{{email}}", sUserTemplateEmail);
					sUserTemplate = sUserTemplate.replace("{{fName}}", sUserTemplateFname);
					sUserTemplate = sUserTemplate.replace("{{lName}}", sUserTemplateLname);
					sUserTemplate = sUserTemplate.replace("{{mobile}}", sUserTemplateMobile);
					sUserTemplate = sUserTemplate.replace("{{password}}", sUserTemplatePassword);
					sUserTemplate = sUserTemplate.replace("{{the-icon-id}}", sUserTemplateUserid);
					sUserTemplate = sUserTemplate.replace("{{the-icon}}", sUserTemplateUserIcon);
					sUserTemplate = sUserTemplate.replace("{{the-icon-role}}", sUserTemplateUserRole);

					/*append the new row to the cleared table*/
					$(".article-user-rows").append(sUserTemplate);
				}

			}
		}
	}).done(function (jData) {
		/*start interval to get users rows*/
		fnStartUpdatingUsers();


		/*check if the system has to lock itself*/
//        fnGetSystemLock()


}).error(function () {
	console.log("error - trying to create a user");
});

};
/****************************************************/

/*EVEMT CRUD*/
/*READ EVENT*/
function fnGetEvents() {
	/*setup ajax url*/
	var sUrl = "services/api-events-read.php";
	/*connect to the server and get all the events*/
	$.getJSON(sUrl, function (jData) {

		/*get the json status*/
		var sStatus = jData.status;
		var sError = "error";

		/*events table row blueprint*/
		var sEventsBlueprint = '<div class="aside-event-content event-row dynamic-rows">\
		<div class="lbl-event-id">{{id}}</div>\
		<div class="lbl-event-image">{{image}}</div>\
		<div class="lbl-event-name">{{name}}</div>\
		<div class="lbl-event-location">{{location}}</div>\
		<div class="lbl-event-st">{{st}}</div>\
		<div class="lbl-event-et">{{et}}</div>\
		<div class="lbl-event-ta">{{ta}}</div>\
		<div class="lbl-event-mc">{{mc}}</div>\
		<div class="lbl-event-type" data-popup="section-event-edit">\
		<div class="btn-event-view lbl-event-edit events-icons fa fa-eye fa-fw" data-go-to="section-event-view"></div>\
		</div>\
		<div class="btn-event-edit lbl-event-edit events-icons fa fa-edit fa-fw" data-popup="section-event-edit"></div>\
		<div class="btn-event-delete lbl-event-delete events-icons fa fa-trash fa-fw"></div>\
		</div>';

		/*empty all the rows below the navigation in the table*/
		$(".article-event-rows").empty();

		/*iterate over the data recieved from the server*/
		for (var i = 0; i < jData.length; i++) {
			/*create a blueprint of the template that can be used as rows for the table*/
			var sEventTemplate = sEventsBlueprint;

			/*get the information from each item*/
			var sEventTemplateTesid = jData[i].tesid;
			var sEventemplateLid = jData[i].lid;
			var sEventTemplateTename = jData[i].tename;
			var sEventTemplateTedesc = jData[i].tedescription;
			var sEventTemplateAddr = jData[i].address;
			var sEventTemplateST = jData[i].eventst;
			var sEventTemplateET = jData[i].eventet;
			var sEventTemplateTA = jData[i].totalattending;
			var sEventTemplateMaxAttending = jData[i].attendlimit;
			var sEventTemplateIL = jData[i].ilabel;
			var sEventTemplateIalt = jData[i].ialt;

			/*replace the placeholders in the template with the data recieved from the server*/
			sEventTemplate = sEventTemplate.replace("{{id}}", sEventTemplateTesid);
			sEventTemplate = sEventTemplate.replace("{{image}}", sEventTemplateIL);
			sEventTemplate = sEventTemplate.replace("{{name}}", sEventTemplateTename);
			sEventTemplate = sEventTemplate.replace("{{location}}", sEventTemplateAddr);
			sEventTemplate = sEventTemplate.replace("{{st}}", sEventTemplateST);
			sEventTemplate = sEventTemplate.replace("{{et}}", sEventTemplateET);
			sEventTemplate = sEventTemplate.replace("{{ta}}", sEventTemplateTA);
			sEventTemplate = sEventTemplate.replace("{{mc}}", sEventTemplateMaxAttending);

			/*append the new row to the cleared table*/
			$(".article-event-rows").append(sEventTemplate);

		}
	});
};
/****************************************************/

/****************************************************/
/*PRIMARY CRUD*/
/*READ PARTNER */
function fnGetPartners() {
	/*setup ajax url*/
	var sUrl = "services/api-partners-read.php";
	/*connect to the server and get all the events*/
	$.getJSON(sUrl, function (jData) {

		var sPartnersBlueprint = '\
		<div class="aside-partners-content user-row dynamic-rows">\
		<div class="lbl-partner-id">{{id}}</div>\
		<div class="lbl-partners-image"><img src="./img/content/{{image}}""></div>\
		<div class="lbl-partners-name">{{name}}</div>\
		<div class="lbl-event-partner-url"><a href="{{url1}}" target="_blank" >{{url2}}</a></div>\
		<div class="btn-partner-view lbl-partner-edit icons fa fa-eye fa-fw" data-go-to="section-partner-view"></div>\
		<div class="btn-partner-edit lbl-partner-edit icons fa fa-edit fa-fw" data-popup="section-partner-edit"></div>\
		<div class="btn-partner-delete lbl-partner-delete icons fa fa-trash fa-fw"></div>\
		</div>';


		/*empty all the rows below the navigation in the table*/
		$("#dynamic-partners-rows").empty();

		/*iterate over the data recieved from the server*/
		for (var i = 0; i < jData.length; i++) {
			var sPartnerTemplate = sPartnersBlueprint;

			/*get the information from each item*/
			var sPartneremplatePPid = jData[i].id;
			var sPartnerTemplatePname = jData[i].pname;
			var sPartnerTemplatePUrl = jData[i].url;
			var sPartnerTemplateImgLbl = jData[i].ilabel;
			var sPartnerTemplateImgAlt = jData[i].ialt;

			/*replace the placeholders in the template with the data recieved from the server*/
			sPartnerTemplate = sPartnerTemplate.replace("{{id}}", sPartneremplatePPid);
			sPartnerTemplate = sPartnerTemplate.replace("{{image}}", sPartnerTemplateImgLbl);
			sPartnerTemplate = sPartnerTemplate.replace("{{name}}", sPartnerTemplatePname);
			sPartnerTemplate = sPartnerTemplate.replace("{{url1}}", sPartnerTemplatePUrl);
			sPartnerTemplate = sPartnerTemplate.replace("{{url2}}", sPartnerTemplatePUrl);

			/*append the new row to the cleared table*/
			$("#dynamic-partners-rows").append(sPartnerTemplate);

		}
	});
};

/*PRIMARY PARTNER CRUD*/
/*READ PRIMARY PARTNER */
function fnGetPrimaryPartners() {
	/*setup ajax url*/
	var sUrl = "services/api-partners-primary-read.php";
	/*connect to the server and get all the events*/
	$.getJSON(sUrl, function (jData) {

		var sPartnersBlueprint = '\
		<div class="aside-primary-partners-content user-row dynamic-rows">\
		<div class="lbl-partner-id">{{id}}</div>\
		<div class="lbl-primary-partners-image"><img src="./img/content/{{image}}""></div>\
		<div class="lbl-primary-partners-name">{{name}}</div>\
		<div class="lbl-event-partner-url"><a href="{{url1}}" target="_blank" >{{url2}}</a></div>\
		<div class="btn-primary-partner-view lbl-primary-partner-edit primary-icons fa fa-eye fa-fw" data-go-to="section-partner-view"></div>\
		<div class="btn-primary-partner-edit lbl-primary-partner-edit primary-icons fa fa-edit fa-fw" data-popup="section-partner-edit"></div>\
		<div class="btn-primary-partner-delete lbl-primary-partner-delete primary-icons fa fa-trash fa-fw"></div>\
		</div>';


		/*empty all the rows below the navigation in the table*/
		$("#dynamic-primary-partners-rows").empty();

		/*iterate over the data recieved from the server*/
		for (var i = 0; i < jData.length; i++) {
			var sPartnerTemplate = sPartnersBlueprint;

			/*get the information from each item*/
			var sPartneremplatePPid = jData[i].id;
			var sPartnerTemplatePname = jData[i].pname;
			var sPartnerTemplatePUrl = jData[i].url;
			var sPartnerTemplateImgLbl = jData[i].ilabel;
			var sPartnerTemplateImgAlt = jData[i].ialt;

			/*replace the placeholders in the template with the data recieved from the server*/
			sPartnerTemplate = sPartnerTemplate.replace("{{id}}", sPartneremplatePPid);
			sPartnerTemplate = sPartnerTemplate.replace("{{image}}", sPartnerTemplateImgLbl);
			sPartnerTemplate = sPartnerTemplate.replace("{{name}}", sPartnerTemplatePname);
			sPartnerTemplate = sPartnerTemplate.replace("{{url1}}", sPartnerTemplatePUrl);
			sPartnerTemplate = sPartnerTemplate.replace("{{url2}}", sPartnerTemplatePUrl);

			/*append the new row to the cleared table*/
			$("#dynamic-primary-partners-rows").append(sPartnerTemplate);

		}
	});
};
function fnGetEventsPartners() {
	/*setup ajax url*/
	var sUrl = "services/api-partners-events-read.php";
	/*connect to the server and get all the events*/
	$.getJSON(sUrl, function (jData) {

		var sPartnersBlueprint = '\
		<div class="aside-event-partner-content user-row dynamic-rows">\
		<div class="lbl-user-id">{{id}}</div>\
		<div class="lbl-event-partner-image"><img src="./img/content/{{image}}"></div>\
		<div class="lbl-event-partner-name">{{name}}</div>\
		<div class="lbl-event-partner-event-name"> {{ename}}</div>\
		<div class="lbl-event-partner-url"><a href="{{url1}}" target="_blank" >{{url2}}</a></div>\
		<div class="btn-event-view lbl-event-edit events-icons fa fa-eye fa-fw" data-go-to="section-partner-view"></div>\
		<div class="btn-event-edit lbl-event-edit events-icons fa fa-edit fa-fw" data-popup="section-partner-edit"></div>\
		<div class="btn-event-delete lbl-event-delete events-icons fa fa-trash fa-fw"></div>\
		</div>';


		/*empty all the rows below the navigation in the table*/
		$("#dynamic-event-partner-rows").empty();

		/*iterate over the data recieved from the server*/
		for (var i = 0; i < jData.length; i++) {
			var sPartnerTemplate = sPartnersBlueprint;

			/*get the information from each item*/
			var sPartneremplatePPid = jData[i].id;
			var sPartnerTemplatePname = jData[i].pname;
			var sPartnerTemplateEname = jData[i].tename;
			var sPartnerTemplatePUrl = jData[i].url;
			var sPartnerTemplateImgLbl = jData[i].ilabel;
			var sPartnerTemplateImgAlt = jData[i].ialt;

			/*replace the placeholders in the template with the data recieved from the server*/
			sPartnerTemplate = sPartnerTemplate.replace("{{id}}", sPartneremplatePPid);
			sPartnerTemplate = sPartnerTemplate.replace("{{image}}", sPartnerTemplateImgLbl);
			sPartnerTemplate = sPartnerTemplate.replace("{{name}}", sPartnerTemplatePname);
			sPartnerTemplate = sPartnerTemplate.replace("{{ename}}", sPartnerTemplateEname);
			sPartnerTemplate = sPartnerTemplate.replace("{{url1}}", sPartnerTemplatePUrl);
			sPartnerTemplate = sPartnerTemplate.replace("{{url2}}", sPartnerTemplatePUrl);

			/*append the new row to the cleared table*/
			$("#dynamic-event-partner-rows").append(sPartnerTemplate);

		}
	});
};
