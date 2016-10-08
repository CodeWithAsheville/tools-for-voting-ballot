



var TFVB = {};

TFVB.first_name = false;
TFVB.last_name = false;
TFVB.voter_age = false;
TFVB.voter_registration_api_base = "https://cfa-voting-api-2016.herokuapp.com/api";

TFVB.election_description_sheet = "https://docs.google.com/spreadsheets/d/1md9fVzlgIGW09mbdPYR8oNj5CEEhHNTcjsNeTzij6YM/pub?gid=1421236301&single=true&output=csv";
// TFVB.election_lookup_sheet = "https://docs.google.com/spreadsheets/d/1md9fVzlgIGW09mbdPYR8oNj5CEEhHNTcjsNeTzij6YM/pub?gid=20236216&single=true&output=csv";
TFVB.election_lookup_sheet = "election_lookup.csv";

TFVB.voter_record = false;

TFVB.voter_search_results = false;

TFVB.election_lookup_data = false;

TFVB.processVoterInfoResults = function(results){

	console.log('results', results);

	if(results.length){
		for(key in results[0]){
			row = results[0][key];
			$("#results").append(key + ": " + row + "<br />");
		}
	}
};

TFVB.processVoterRowClick = function(){
	var active_row = $(this);
	console.log('row click', active_row);

	var active_index = active_row.attr('data-voter-index');

	TFVB.voter_record = TFVB.voter_search_results[active_index];


	$("#single-voter-detail").find('.voter-name').html(TFVB.voter_record.first_name + " " +TFVB.voter_record.last_name);


	// Start the lookup! 

	for(key in TFVB.voter_record){
		row = TFVB.voter_record[key];
		$("#single-voter-addditional-info").append(key + ": " + row + "<br />");
	}

}

TFVB.processVoterSearchResults = function(results){
	console.log('results', results);

	TFVB.voter_search_results = results;

	results_div = $("#results");

	results_div.html("");

	if(results.length){
		for(index in results){
			row = results[index];

			results_div.append("<div>" + 
									"<div class='voter-row' data-voter-index='"+index+"' style='color: blue; text-decoration: underline; cursor: pointer;'>" + row.first_name + " " + row.last_name + " (" + row.birth_age + ")</div>" +
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
	TFVB.first_name = $("#first-name").val();
	TFVB.last_name = $("#last-name").val();

	if($("#voter-age").length){
		TFVB.voter_age = $("#voter-age").val();
	}

	$("#results").html(TFVB.first_name + ": " + TFVB.last_name);
	TFVB.getVoterInfo();
};

TFVB.election_lookup_data_processed = {};

TFVB.processElectionLookupData = function(){
	for(index in TFVB.election_lookup_data){
		var row = TFVB.election_lookup_data[index];

		if(! row.contest_id){
			TFVB.election_lookup_data_processed.push(row);
		}
	}
};

TFVB.loadElectionLookupData = function(){
	$.get(TFVB.election_lookup_sheet, function(csv_data){
		var temp = Papa.parse(csv_data, { header: true });
		TFVB.election_lookup_data = temp.data;

		console.log('election lookup data', TFVB.election_lookup_data);
	});
};

// On Load, Get the lookup
TFVB.loadElectionLookupData();

// Click handlers
$("#enter-name").click(TFVB.processVoterName);

$(document).on('click', '.voter-row', TFVB.processVoterRowClick);