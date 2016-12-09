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

function logout() {
	var url = window.location.href.split('?')[0];

	location(url);
}


function openLink(link) {
	var l = link;
	
	if(isLoggedIn()) {
		l+="?loggedin=1";
	}
	
	location(l);
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
		setHidden("navlogin", true);
		setHidden("navsignup", true);
		setHidden("navlogout", false);
		setHidden("navportal", false);
	}
	else {
		setHidden("navlogin", false);
		setHidden("navsignup", false);
		setHidden("navlogout", true);
		setHidden("navportal", true);
	}
}

function open_login()
{
	var url = window.location.href.split('?')[0];
	
	location(url + "?loggedin=1");
}

function open_signup()
{
	alert("open_signup");
}

function open_portal()
{
	alert("portal");
}



function product_details_finished() {
	if(isLoggedIn()) {
		setHidden("notify", false);
	} else {
		setHidden("notify", true);
	}
}

