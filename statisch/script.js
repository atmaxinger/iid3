$(document).ready(function(){
	$(".search-query").keypress(function(e) {
		if (e.keyCode == 13) {
	        openLink('search.html');
	        return false;
	    }
	});
});

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function isLoggedIn() {
	return getParameterByName("loggedin") == 1;
}

function goToLocation(x) {
	window.location = x;
}

function logout() {
	var url = window.location.href.split('?')[0];

	goToLocation(url);
}


function openLink(link) {
	var l = link;
	
	if(isLoggedIn()) {
		l+="?loggedin=1";
	}
	
	goToLocation(l);
}

function setHidden(id, status) {
	if(status == true) {
		document.getElementById(id).style.display = "none";
	}
	else {
		document.getElementById(id).style.display = "inline";
	}
}



function changeNavbar() {
	if(isLoggedIn()) {
		setHidden("logindropdown", true);
		setHidden("navlogout", false);
		setHidden("navportal", false);
	}
	else {
		setHidden("logindropdown", false);
		setHidden("navlogout", true);
		setHidden("navportal", true);
	}
}


function forgot_password() {
}

function load_image(el, path) {
	el.src = path;
}

function open_login()
{
	var url = window.location.href.split('?')[0];
	
	goToLocation(url + "?loggedin=1");
}

function open_signup()
{
	$('#myModal').modal('show');
}

function open_portal()
{
	openLink("portal.html");
}



function product_details_finished() {
	if(isLoggedIn()) {
		setHidden("notify", false);
	} else {
		setHidden("notify", true);
	}
}

