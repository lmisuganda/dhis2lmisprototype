//GENERIC CROSS-FILE SCRIPTS 

checkIfChrome();


//to generate and configure main menu on top-right corner of all pages. Called from each page individualy. 
function generateMainMenu() {
	var facilityId = getParameterFromURLByName("facility");
	var fileName = getFileNameFromURL();
	var mainMenu = $("#main_menu");
	if (elementExist(mainMenu)) {
		if (!isUndefinedOrNull(facilityId)) {
			$(mainMenu).append('<a href="dashboard.html?facility=' + facilityId + '"><i class="fa fa-home" aria-hidden="true"></i>Facility Dashboard</a>');
		}
		$(mainMenu).append('<a href="index.html"><i class="fa fa-list-ul" aria-hidden="true"></i></i>Facility list</a>');
		
		var helpLink = document.createElement("A");
		$(helpLink).append('<a><i class="fa fa-question-circle" aria-hidden="true"></i>Help</a>');
		$(mainMenu).append(helpLink);
		$(helpLink).on("click", function () {
			if (helpAsideIsOpen()) {
				hideHelpAside();
				adjustArrowPosition();
			} else {
				showHelpAside();
				adjustArrowPosition();
			}
			
		});
	}
}

function checkIfChrome() {
	if(!/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){
		console.log("Not using Chrome, give error-message");
		var element = document.createElement("DIV");
		$(element).css("position", "fixed");
		$(element).css("height", "100vh");
		$(element).css("width", "100vw");
		$(element).css("background-color", "white");
		$(element).css("top", "0");
		$(element).css("left", "0");
		$(element).append("<h1>This application is only supported in Google Chrome. Switch browser and try again</h1>");
		$("body").append(element);
	}
}


//returns parameter from url based on given name (?example=test)
function getParameterFromURLByName(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getFileNameFromURL() {
	var url = window.location.pathname.split('/');
	return (url[url.length-1]);
}

// JQUERY function that returns an object containing all input fields from form as attributes
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
 

function navigateToAddress(address) {
	window.location.href = address;
}

//takes array of variables and check for undefined and null
function isUndefinedOrNull() {
	for (var i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] == 'undefined' || arguments[i] == null) return true;
	}
	return false;
}

function elementExist(element) {
	return $(element).length;
}