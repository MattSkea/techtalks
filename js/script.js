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

	/*retrieve the parent element and see if the parent is article-links(inside main menu)*/
	var sElementParent = $(this).parent().attr("id");
	
	/*get name of header*/
	var containerToHide = ".flex-nav ul";

	/*hide the current window*/
	fnHideCurrentWindow();

	/*show the selected window*/
	fnShowSelectedWindow(sIdWindowToShow);
	
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
	var state = $(container).css("display");

	/*compare the ul state*/
	if(state === "none"){
		$(container).slideDown();
	} else if(state === "block"){
		$(container).slideUp();
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