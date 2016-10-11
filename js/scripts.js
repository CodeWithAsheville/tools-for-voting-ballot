



var TFVB = {};

TFVB.first_name = false;
TFVB.last_name = false;
TFVB.voter_age = false;
TFVB.voter_registration_api_base = "https://cfa-voting-api-2016.herokuapp.com/api";

TFVB.election_description_sheet = "https://raw.githubusercontent.com/CodeForAsheville/tools-for-voting-ballot/master/election_races.csv";
TFVB.election_lookup_sheet = "1md9fVzlgIGW09mbdPYR8oNj5CEEhHNTcjsNeTzij6YM";
// TFVB.election_lookup_sheet = "https://raw.githubusercontent.com/CodeForAsheville/tools-for-voting-ballot/master/election_lookup.csv";

TFVB.voter_record = false;

TFVB.voter_search_results = false;

TFVB.election_lookup_data = false;

TFVB.election_race_info_data = false;

TFVB.election_race_info_data_processed = {};
TFVB.election_lookup_data_processed = {};


TFVB.display_voter_info_keys = ['id', 'county_id', 'county_desc'];


TFVB.debug = false;
TFVB.setupDebugTools = function(){
	if(TFVB.debug){
		$("#full-name").val("Patrick Conant");
		// $("#first-name").val("Patrick");
		// $("#last-name").val("Conant");

		$("#enter-name").click();		
	}
}

TFVB.processVoterRowClick = function(){
	var active_row = $(this);
	console.log('row click', active_row);

	var active_index = active_row.attr('data-voter-index');

	TFVB.voter_record = TFVB.voter_search_results[active_index];


	$("#single-voter-detail").find('.voter-name').html(TFVB.voter_record.first_name + " " +TFVB.voter_record.last_name);


	// Start the lookup! 

	for(key in TFVB.voter_record){
		row = TFVB.voter_record[key];

		// console.log('check in array', $.inArray(key, TFVB.display_voter_info_keys), key)

		// Temp disable
		if($.inArray(key, TFVB.display_voter_info_keys) > -1){

			$("#single-voter-addditional-info").append("<div class='voter-info-row'><span class='voter-info-key'>" + key.replace("_", " ").toUpperCase() + ":</span>" + " <span class='voter-info-value'>" + row + "</span></div>");
		}
	}

	TFVB.filterVoterElections();
	$(".step2").fadeIn();

}

TFVB.filterVoterElections = function(){

	// nc_house_abbrv
	var voter_nc_house_district = TFVB.voter_record.nc_house_abbrv;
	var voter_us_house_district = TFVB.voter_record.cong_dist_abbrv;
	var voter_nc_senate_district = TFVB.voter_record.nc_senate_abbrv;

	var commissioner_district = TFVB.voter_record.county_commiss_abbrv.replace("COM", "");

	var voter_education_district = TFVB.voter_record.school_dist_abbrv;



	// data-election-name
	// data-election-base-name

	$(".ballot-section[data-election-base-name='US HOUSE OF REPRESENTATIVES']").hide();
	$(".ballot-section[data-election-name='US HOUSE OF REPRESENTATIVES DISTRICT "+voter_us_house_district+"']").show();

	$(".ballot-section[data-election-base-name='NC HOUSE OF REPRESENTATIVES DISTRICT']").hide();
	$(".ballot-section[data-election-name='NC HOUSE OF REPRESENTATIVES DISTRICT "+voter_nc_house_district+"']").show();

	$(".ballot-section[data-election-base-name='BUNCOMBE COUNTY BOARD OF COMMISSIONERS']").hide();

	$(".ballot-section[data-election-name='BUNCOMBE COUNTY BOARD OF COMMISSIONERS DISTRICT "+commissioner_district+"']").show();
	$(".ballot-section[data-election-name='BUNCOMBE COUNTY BOARD OF COMMISSIONERS DISTRICT "+commissioner_district+" UNEXPIRED']").show();
	$(".ballot-section[data-election-name='BUNCOMBE COUNTY BOARD OF COMMISSIONERS CHAIR']").show();


	//nc_senate_abbrv
	$(".ballot-section[data-election-base-name='NC STATE SENATE DISTRICT']").hide();
	$(".ballot-section[data-election-name='NC STATE SENATE DISTRICT "+voter_nc_senate_district+"']").show();

	if(voter_education_district){
		$(".ballot-section[data-election-base-name='BUNCOMBE COUNTY BOARD OF EDUCATION']").show();
	}
	else{
		$(".ballot-section[data-election-base-name='BUNCOMBE COUNTY BOARD OF EDUCATION']").hide();
	}

	// $(".ballot-section[data-election-base-name='BUNCOMBE COUNTY BOARD OF EDUCATION']").hide();
	// $(".ballot-section[data-election-name='BUNCOMBE COUNTY BOARD OF EDUCATION "+voter_education_district+" DISTRICT']").show();
	// $(".ballot-section[data-election-base-name='BUNCOMBE COUNTY BOARD OF EDUCATION AT- LARGE']").show();

// 
};

TFVB.processVoterSearchResults = function(results){
	console.log('results', results);

	TFVB.voter_search_results = results;

	results_div = $("#results");

	results_div.html("");

	if(results.length){
		for(index in results){
			row = results[index];
			results_div.append("<h3>Choose your name from the list below</h3>");

			results_div.append("<div>" + 
									"<div class='voter-row' data-voter-index='"+index+"' style='color: blue; text-decoration: underline; cursor: pointer;'>" + row.first_name + " " + row.last_name + " (Age " + row.birth_age + ")</div>" +
								"</div>"
								);
		}

	}
};

TFVB.getVoterInfo = function(){

	var voter_registration_request_url = TFVB.voter_registration_api_base + "?fname="+TFVB.first_name+"&lname="+TFVB.last_name;
	
	console.log('voter registration call', voter_registration_request_url);

	if(TFVB.voter_age){
		voter_registration_request_url += "&age=" + TFVB.age;
	}

	$.get(voter_registration_request_url, TFVB.processVoterSearchResults);

	// "&age="
	// ?lname=jackson&fname=philip&age=54
};

TFVB.processVoterName = function(){
	$(".step2").hide();

	var full_name = $("#full-name").val();

	var full_name_array = full_name.split(" ");

	// console.log(full_name, full_name_array);
	if(full_name_array.length < 2){
		alert("Please enter your full name");
	}

	TFVB.first_name = full_name_array[0];
	TFVB.last_name = full_name_array[1];

	if($("#voter-age").length){
		TFVB.voter_age = $("#voter-age").val();
	}

	$("#results").html("Loading...");
	$("#single-voter-detail h2").html("");
	$("#single-voter-addditional-info").html("");

	// $("#results").html(TFVB.first_name + ": " + TFVB.last_name);
	TFVB.getVoterInfo();
	return false;
};


TFVB.processElectionLookupData = function(){
	for(index in TFVB.election_lookup_data){
		var row = TFVB.election_lookup_data[index];

		// if(! row.contest_id){
			if(typeof TFVB.election_lookup_data_processed[row["contest_name - original"]] == typeof undefined){
				TFVB.election_lookup_data_processed[row["contest_name - original"]] = [];
			}
			TFVB.election_lookup_data_processed[row["contest_name - original"]].push(row);
		// }
	}
};

TFVB.getPartyFromAbrev = function(input){
	if(input == "DEM"){
		return "democrat";
	}
	else if(input == "REP"){
		return "republican";
	}
	else if(input == "LIB"){
		return "libertarian";
	}
	else{
		return "";
	}
}

TFVB.renderElectionRaces = function(){
	var candiate_template = $(".ballot-section-options").find('li').eq(0).clone();
	$(".ballot-section-options").find('li').remove();

	var ballot_section_template = $(".ballot-section").clone();
	$(".ballot-section").remove();

	for(election_race_name in TFVB.election_lookup_data_processed){
		var election_race = TFVB.election_lookup_data_processed[election_race_name];
		var active_section = ballot_section_template.clone();

		// console.log('race', election_race);
		active_section.attr('data-election-name', election_race_name);
		active_section.attr('data-election-base-name', election_race[0]["contest_name - base"]);

		for(candidate_index in election_race){
			candidate = election_race[candidate_index];
			// console.log('candidate', candidate);

			var active_candidate = candiate_template.clone();
			active_candidate.find('.candidate-name').html(candidate.name_on_ballot).attr('data-candidate-name', candidate.name_on_ballot);
			active_candidate.find('.candidate-party').html(TFVB.getPartyFromAbrev(candidate.party_candidate) );

			var xpress_link = "<a href='http://mountainx.com/?s=" + candidate.name_on_ballot + "'>";
				xpress_link += "Search on Mountain Xpress";
			xpress_link += "</a>";

			var blade_link = "<a href='http://www.ashevilleblade.com/?s=" + candidate.name_on_ballot + "'>";
				blade_link += "Search on Asheville Blade";
			blade_link += "</a>";

			var act_link = "<a href='http://www.citizen-times.com/search/" + candidate.name_on_ballot + "/'>";
				act_link += "Search on Asheville Citizen Times ";
			act_link += "</a>";

			active_candidate.find('.candidate-info p').html("");
			active_candidate.find('.candidate-info p').append(blade_link );
			active_candidate.find('.candidate-info p').append(act_link );
			active_candidate.find('.candidate-info p').append(xpress_link );

			active_candidate.removeClass('selected').addClass(TFVB.getPartyFromAbrev(candidate.party_candidate));
			active_section.find('ul').append(active_candidate);

		}

		active_section.find('h2').html(election_race_name);

		if(typeof TFVB.election_race_info_data_processed[election_race_name] != typeof undefined){
			active_section.find('.ballot-section-info').html(TFVB.election_race_info_data_processed[election_race_name]["Short Description of Office"] + TFVB.election_race_info_data_processed[election_race_name]["Sources"]);
		

		}

		$(".ballot-container").append(active_section);
	}

	// TFVB.renderElectionRaces();
};


TFVB.processElectionInfoData = function(){
	for(index in TFVB.election_race_info_data){
		var row = TFVB.election_race_info_data[index];
		// console.log('patrick', row["contest_name - original"]);
		TFVB.election_race_info_data_processed[row["contest_name - original"]] = row;
	}
};


/// TABLETOP STUFF
TFVB.init = function(){
	Tabletop.init( { key: TFVB.election_lookup_sheet,
	                 callback: TFVB.loadGoogleSpreadsheetData,
	                 simpleSheet: false } );
}

TFVB.loadGoogleSpreadsheetData = function(data, tabletop) {
	// alert("Successfully processed!")
	// console.log(data);
	console.log("Data Loaded");
	TFVB.election_lookup_data = data.Candidates.elements;
	TFVB.election_race_info_data = data.Races.elements;

	// console.log('election lookup data', TFVB.election_lookup_data);

	TFVB.processElectionLookupData();
	TFVB.processElectionInfoData();

	TFVB.renderElectionRaces();
	TFVB.setupDebugTools();
}
// END TABLETOP


// On Load, Get the lookup
window.onload = function() { TFVB.init(); };

// Click handlers
$("#enter-name").click(TFVB.processVoterName);

$(document).on('click', '.voter-row', TFVB.processVoterRowClick);