TFVB.activateStep1 = function(){
	$(".step1").fadeIn('slow');
}

TFVB.selectCandidate = function(e){
	$(this).parents('li').toggleClass('selected').siblings('li').removeClass('selected');
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
});