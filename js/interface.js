TFVB.historyState = {};
TFVB.selectedCandidates = {};

var selected_candidate;
var office;
var selections_string;
var loaded_selections = {};

TFVB.decodeURL = function(){
  //query given index.html?this=true&that=good;
  var url = location.href.split("?")[1]; // this=true&that=good;
  params = {}; //init param obj
  url = url.split("&"); // ['this=true','that=good']
  for(var i = 0; i<url.length; i++){

    var split_cache = url[i].split("="); // ['this','true'], ...
  	params[decodeURIComponent(split_cache[0])] = decodeURIComponent(split_cache[1]); // {this:true}, ...

  }
  return params; // {this:"true", that:"good"}
}

console.log('loaded selections: ', loaded_selections);

TFVB.prePopulate = function(){
	for(var item in loaded_selections){
		if(loaded_selections[item]){
			$('[data-election-name="'+item+'"]').find('[data-candidate-name="'+loaded_selections[item]+'"]').parents('li').find('a.select-candidate').trigger('click');
		}
	}
	// return TFVB.populateCandidates();
}

TFVB.populateCandidates = function(){
	selections_string = '';

	$('.ballot-section').each(function(){
		office = $(this).attr('data-election-name');
		selected_candidate = $(this).find('.selected').find('.candidate-name').text();		

		if (typeof(office) != "undefined" && typeof(selected_candidate) != "undefined"){
			TFVB.selectedCandidates[office] = selected_candidate; 
		}
	});

	for(var item in TFVB.selectedCandidates){
		selections_string += item + '=' + TFVB.selectedCandidates[item] + '&';
	}
	window.history.replaceState(TFVB.selections_string, "candidate_select", '?' + encodeURI(selections_string));
	loaded_selections = TFVB.decodeURL();
}

TFVB.activateStep1 = function(){
	$(".step1").fadeIn('slow');
}

TFVB.selectCandidate = function(e){
	$(this).parents('li').toggleClass('selected').siblings('li').removeClass('selected');
	TFVB.populateCandidates();
	e.preventDefault();
}

TFVB.learnMoreCandidate = function(e){
	$(this).parents('div').siblings('.candidate-info').slideToggle();
	e.preventDefault();
}

$(document).on('click', '.select-candidate', TFVB.selectCandidate);
$(document).on('click', '.candidate-info-learnmore a', TFVB.learnMoreCandidate);

$(document).ready(function(){
	TFVB.activateStep1();
	loaded_selections = TFVB.decodeURL();
	TFVB.prePopulate();
});