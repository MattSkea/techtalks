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
	}
	/*hide the navigation*/
	toggleContainer(containerToHide);
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
	fnCreateUser();
});

/*INITIALIZE LOGIN*/
$(document).on("click", "#btn-login-user", function () {
	/*fire off the login function*/
	fnLogin();
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
	var windowHtml=$("#"+windowName)[0].outerHTML
	console.log(windowHtml);
	//$(("#"+windowName).html()).appendTo("#appender");
	$("#appender").html(windowHtml);
	$("#"+windowName).addClass("popup");
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
	google.maps.event.trigger(map, 'resize');
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
$(document).ready(function() {
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');
	});
	google.maps.event.trigger(map, 'resize');
});


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
		},
		error: function (jData) {
			console.log("error - trying to create a user");
		}
	});
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
			fnLoginAlert();
		}
		else if (jData.status === "error") {
			console.log("invalid user, login FAIL!");
		}
	});
}
/****************************************************/
/*LOGIN SWEETALERT*/
function fnLoginAlert() {
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