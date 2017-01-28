
var facilityId = getParameterFromURLByName("facility");
var cycleId = getParameterFromURLByName("cycle");
var formId = getParameterFromURLByName("form");
if (isUndefinedOrNull(facilityId, cycleId, formId)) navigateToAddress("index.html");

var facility = LS.getFacilityById(facilityId);
var form = getFormById(getCycleById(facility, cycleId), formId);
if (isUndefinedOrNull(facility, form)) navigateToAddress("index.html");

//if edit not allowed (based on completion and approval status, user rights): navigate to form summary
if (!editIsAllowed(form, "temp")) {
	$("body").hide();
	navigateToAddress("form_summary.html?facility=" + facilityId + "&cycle=" + cycleId + "&form=" + formId)	
}

setProgramTitleHeader(getName(form)); 
generateSectionsList();

//event-listener onclick list elements (sections)
$("li").on("click", function() {
	if ($(this).hasClass("completed_section") || $(this).hasClass("current_section")) {
		var sectionId = $(this).attr("id");
		window.location.href = "data_entry.html?facility=" + facilityId + "&cycle=" + cycleId + "&form=" + formId + "&section=" + sectionId;
	}
});


function generateSectionsList() {
	var sectionsListElement = $("#sections_list");
	var sections = getSections(form);
	currentSectionNotSet = true;
	
	for (i = 0; i < sections.length; i++) {
		var elem = getNewListElement(sections[i]);
		sectionsListElement.append(elem);
		if (!isCompleted(sections[i]) && currentSectionNotSet) {
			setToCurrentSection(elem);
			currentSectionNotSet = false;
		}
	}
	var elem = getLastListElement("Look over and complete form")
	sectionsListElement.append(elem);
	if (currentSectionNotSet) setToCurrentSection(elem);
}

//generates a new LI-element containing given name
function getNewListElement(section) {
	name = getName(section);

	var hiddenListSection = document.createElement("SECTION");
	$(hiddenListSection).addClass("hidden_list_section");
	$(hiddenListSection).append(getSectionStartButton(section));
	
	var listElement = document.createElement("LI");
	
	if (isCompleted(section)) { //If sections is already completed. Add styling
		$(listElement).addClass("completed_section"); 
	}
	$(listElement).append(name, hiddenListSection); //add content to list element
	$(listElement).attr("id", getId(section));
	
	return listElement;
}

function getLastListElement(name) {

	var listElement = document.createElement("LI");
	var hiddenListSection = document.createElement("SECTION");
	$(hiddenListSection).addClass("hidden_list_section");
	
	var startEntryButton = document.createElement("A");
	$(startEntryButton).text("Click here to look over and complete form");
	$(startEntryButton).attr("href", "form_summary.html?facility=" + facilityId + "&cycle=" + cycleId + "&form=" + formId);
	
	$(hiddenListSection).append(startEntryButton);
	$(listElement).attr("id", "show_summary_button");
	$(listElement).append(name, hiddenListSection); //add content to list element
	return listElement;
}

function getSectionStartButton(section) {
	var name = getName(section);
	var startEntryButton = document.createElement("A");
	$(startEntryButton).text("Click to here start data entry");
	return startEntryButton;
}

function setToCurrentSection(section) {
	$(section).toggleClass("current_section");
	$(section).find(".hidden_list_section").css("display", "block");
	setArrowPosition(section);
}

//Set position of arrow in UI to position of current section. 
function setArrowPosition(section) {
	$("#arrow_icon").css("display", "block");
	var lemTop = $(section).position().top;
	var lemLeft = $(section).position().left;
	$("#arrow_icon").animate({
		top: (lemTop - 8),
		left: (lemLeft - $("#arrow_icon").width())
	}, 250, function() {
		// Animation complete.
	}); 
	//$("#arrow_icon").css({ top: (lemTop - 8) });
	//$("#arrow_icon").css({ left: (lemLeft - $("#arrow_icon").width()) });
}

function setProgramTitleHeader(text) {
	$("#program_title_header").text(text);
}

