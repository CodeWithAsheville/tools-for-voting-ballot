TFVB.historyState = {};
TFVB.selectedCandidates = {};
var og_tag_url = 'https://github.com/CodeForAsheville/tools-for-voting-ballot/?';
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
	
	if(typeof TFVB.loaded_selections == typeof undefined){
		return;
	}

	$('.ballot-section').hide();	

	for(var item in TFVB.loaded_selections){
		// console.log('test123', item);
		// if(TFVB.loaded_selections[item] !== 'null'){
			$(".ballot-section[data-election-name='" + item + "']").fadeIn();
		// }

		if(TFVB.loaded_selections[item] && TFVB.loaded_selections[item] !== 'null'){
			var search_elm = $('[data-election-name="'+item+'"]').find('[data-candidate-name="'+TFVB.loaded_selections[item]+'"]').parents('li').find('a.select-candidate');
			if(search_elm.length){
				search_elm.trigger('click');
			  	TFVB.prePopulateMode = true;
		  	}
		}
		TFVB.populatePrint(TFVB.loaded_selections, item);
	}
}

TFVB.populateCandidates = function(){
	og_tag_url = 'https://codeforasheville.github.io/tools-for-voting-ballot/index.html?';
	TFVB.selectedCandidates = {};
	selections_string = '';

	if(! $('.ballot-section:visible').length){
		return;
	}

	$('.ballot-section:visible').each(function(){
		office = $(this).attr('data-election-name');
		selected_candidate = $(this).find('.selected').find('.candidate-name').text();	

		if(! selected_candidate){
			selected_candidate = "";
		}
		// if(selected_candidate){
			// if (typeof(office) != "undefined" && typeof(selected_candidate) != "undefined"){
				TFVB.selectedCandidates[office] = selected_candidate; 
			// }
		// }
	});

	var count = 0;
	var selections_size = Object.keys(TFVB.selectedCandidates).length;
	
	$('.print-content tbody').empty();
	for(var item in TFVB.selectedCandidates){
		count++;
		selections_string += item + '=' + TFVB.selectedCandidates[item];
		if(count < selections_size){
			selections_string += '&';
		}
		console.log(TFVB.selectedCandidates[item]);
		TFVB.populatePrint(TFVB.selectedCandidates, item);
	}
	window.history.pushState(TFVB.selections_string, "candidate_select", '?' + encodeURI(selections_string));
	og_tag_url += encodeURI(selections_string);

http://manet-8190b033-1.46ae6747.cont.dockerapp.io:32782/?url=https%3A%2F%2Fcodeforasheville.github.io%2Ftools-for-voting-ballot%2Findex.html%3FUS%2520PRESIDENT%3DDonald%2520J.%2520Trump%26US%2520SENATE%3D%26US%2520HOUSE%2520OF%2520REPRESENTATIVES%2520DISTRICT%252010%3D%26NC%2520GOVERNOR%3D%26NC%2520LIEUTENANT%2520GOVERNOR%3D%26NC%2520ATTORNEY%2520GENERAL%3D%26NC%2520AUDITOR%3D%26NC%2520COMMISSIONER%2520OF%2520AGRICULTURE%3D%26NC%2520COMMISSIONER%2520OF%2520INSURANCE%3D%26NC%2520COMMISSIONER%2520OF%2520LABOR%3D%26NC%2520SECRETARY%2520OF%2520STATE%3D%26NC%2520SUPERINTENDENT%2520OF%2520PUBLIC%2520INSTRUCTION%3D%26NC%2520TREASURER%3D%26NC%2520STATE%2520SENATE%2520DISTRICT%252049%3D%26NC%2520HOUSE%2520OF%2520REPRESENTATIVES%2520DISTRICT%2520114%3D%26BUNCOMBE%2520COUNTY%2520BOARD%2520OF%2520COMMISSIONERS%2520CHAIR%3D%26BUNCOMBE%2520COUNTY%2520BOARD%2520OF%2520COMMISSIONERS%2520DISTRICT%25201%3D%26BUNCOMBE%2520COUNTY%2520REGISTER%2520OF%2520DEEDS%3D%26NC%2520SUPREME%2520COURT%2520ASSOCIATE%2520JUSTICE%3D%26NC%2520COURT%2520OF%2520APPEALS%2520JUDGE%2520(STEPHENS)%3D%26NC%2520COURT%2520OF%2520APPEALS%2520JUDGE%2520(GEER)%3D&delay=5000&force=true
http://manet-8190b033-1.46ae6747.cont.dockerapp.io:32782/?delay=8000&force=true&engine=phantomjs&url=https://codeforasheville.github.io/tools-for-voting-ballot/index.html?US%20PRESIDENT=Donald%20J.%20Trump&US%20SENATE=&US%20HOUSE%20OF%20REPRESENTATIVES%20DISTRICT%2010=&NC%20GOVERNOR=&NC%20LIEUTENANT%20GOVERNOR=&NC%20ATTORNEY%20GENERAL=&NC%20AUDITOR=&NC%20COMMISSIONER%20OF%20AGRICULTURE=&NC%20COMMISSIONER%20OF%20INSURANCE=&NC%20COMMISSIONER%20OF%20LABOR=&NC%20SECRETARY%20OF%20STATE=&NC%20SUPERINTENDENT%20OF%20PUBLIC%20INSTRUCTION=&NC%20TREASURER=&NC%20STATE%20SENATE%20DISTRICT%2049=&NC%20HOUSE%20OF%20REPRESENTATIVES%20DISTRICT%20114=&BUNCOMBE%20COUNTY%20BOARD%20OF%20COMMISSIONERS%20CHAIR=&BUNCOMBE%20COUNTY%20BOARD%20OF%20COMMISSIONERS%20DISTRICT%201=&BUNCOMBE%20COUNTY%20REGISTER%20OF%20DEEDS=&NC%20SUPREME%20COURT%20ASSOCIATE%20JUSTICE=&NC%20COURT%20OF%20APPEALS%20JUDGE%20(STEPHENS)=&NC%20COURT%20OF%20APPEALS%20JUDGE%20(GEER)=
	og_tag_url = "http://manet-8190b033-1.46ae6747.cont.dockerapp.io:32782/?url=" + og_tag_url + "&delay=5000&force=true";
	$('meta[property=og\\:url]').attr('content', og_tag_url);
	$('.share-button').attr('href', og_tag_url);

	$('.share-and-print').fadeIn();
}

TFVB.populatePrint = function(object, key){
	console.log('populate print: ' + object[key]);
	// if(object[key] !== 'null'){
		$('.print-content tbody').append('<tr><td>' + key + '</td><td>' + object[key] + '</td></tr>');
	// }
}

TFVB.activateStep1 = function(){
	$(".step1").fadeIn('slow');
	$("#full-name").focus();
	$('.share-and-print').fadeOut();
}
TFVB.activateStep2 = function(){
	$(".step2, .share-and-print").fadeIn('slow');
}

TFVB.backToStep1 = function(){
	$(".step2").fadeOut('fast', function(){
		$('#results, .voter-name, #single-voter-additional-info').empty();
		$(".step1").fadeIn('slow');
		$("#full-name").val('').focus();
		window.history.pushState("test123", "test1234", window.location.pathname);
		$('li.selected').removeClass('selected');
	});
};

TFVB.printMode = function(e){
	window.print();
	e.preventDefault();
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
$(document).on('click', '.back-to-step1', TFVB.backToStep1);
$(document).on('click', '.print-button', TFVB.printMode);

$(document).ready(function(){
	TFVB.loaded_selections = TFVB.decodeURL();
	// TFVB.prePopulate();

	if(TFVB.prePopulateMode ){
		// TFVB.activateStep2();

	}
	else{
		// TFVB.activateStep1();
	}
	$(".share-and-print").stick_in_parent({
		// offset_top: '100%'
	});
	// og_tag_url += encodeURI(TFVB.loaded_selections);

	// og_tag_url = "http://manet-8190b033-1.46ae6747.cont.dockerapp.io:32782/?delay=3000&url=" + og_tag_url;
	// $('meta[property=og\\:url]').attr('content', og_tag_url);
	// $('.share-button').attr('href', og_tag_url);

	// $('.share-and-print').fadeIn();	
});