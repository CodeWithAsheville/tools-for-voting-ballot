TFVB.historyState = {};
TFVB.selectedCandidates = {};

var selected_candidate;
var office;
var selections_string;
TFVB.loaded_selections = {};

TFVB.prePopulateMode = false;

TFVB.decodeURL = function(){
  //query given index.html?this=true&that=good;

  if(location.href.indexOf("?") == -1){
  	return;
  }

  var url = location.href.split("?")[1]; // this=true&that=good;

  if(! url){
  	return;
  }

  params = {}; //init param obj
  url = url.split("&"); // ['this=true','that=good']
  for(var i = 0; i<url.length; i++){

    var split_cache = url[i].split("="); // ['this','true'], ...
  	params[decodeURIComponent(split_cache[0])] = decodeURIComponent(split_cache[1]); // {this:true}, ...

  }
  return params; // {this:"true", that:"good"}
}

// console.log('loaded selections: ', TFVB.loaded_selections);

TFVB.prePopulate = function(){
console.log('loaded selections: ', TFVB.loaded_selections);
	for(var item in TFVB.loaded_selections){
		if(TFVB.loaded_selections[item]){
			var search_elm = $('[data-election-name="'+item+'"]').find('[data-candidate-name="'+TFVB.loaded_selections[item]+'"]').parents('li').find('a.select-candidate');

			if(search_elm.length){
				search_elm.trigger('click');
			  	TFVB.prePopulateMode = true;
			  }


		}
	}
}

TFVB.populateCandidates = function(){
	TFVB.selectedCandidates = {};
	selections_string = '';

	$('.ballot-section').each(function(){
		office = $(this).attr('data-election-name');
		selected_candidate = $(this).find('.selected').find('.candidate-name').text();	

		if(selected_candidate){
			if (typeof(office) != "undefined" && typeof(selected_candidate) != "undefined"){
				TFVB.selectedCandidates[office] = selected_candidate; 
			}
		}
	});

	var count = 0;
	var selections_size = Object.keys(TFVB.selectedCandidates).length;
	
	for(var item in TFVB.selectedCandidates){
		count++;
		selections_string += item + '=' + TFVB.selectedCandidates[item];
		console.log(count, selections_size);
		if(count < selections_size){
			selections_string += '&';
		}
	}
	window.history.pushState(TFVB.selections_string, "candidate_select", '?' + encodeURI(selections_string));
}

TFVB.activateStep1 = function(){
	$(".step1").fadeIn('slow');
	$("#full-name").focus();

}
TFVB.activateStep2 = function(){
	$(".step2").fadeIn('slow');
}

TFVB.backToStep1 = function(){
	$(".step2").fadeOut('fast', function(){
		$(".step1").fadeIn('slow');
		$("#full-name").focus();
		window.history.pushState("test123", "test1234", window.location.pathname);
		$('li.selected').removeClass('selected');
	});
};


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
$(document).on('click', '.back-to-step1', TFVB.backToStep1);

$(document).ready(function(){
	TFVB.loaded_selections = TFVB.decodeURL();
	// TFVB.prePopulate();

	if(TFVB.prePopulateMode ){
		// TFVB.activateStep2();

	}
	else{
		// TFVB.activateStep1();
	}
});