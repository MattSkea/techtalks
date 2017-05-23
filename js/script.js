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
		toggleContainer(".event-card-map-container");
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
}
/*HIDE CURRENT WINDOW*/
function fnHideCurrentWindow() {
	$(".section").hide();
}
