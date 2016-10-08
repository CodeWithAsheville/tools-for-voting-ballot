TFVB.selectCandidate = function(e){
	$(this).parents('li').addClass('selected').siblings('li').removeClass('selected');
	e.preventDefault();
}

TFVB.learnMoreCandidate = function(e){
	$(this).parents('div').siblings('.candidate-info').slideToggle();
	e.preventDefault();
}

$('.select-candidate').click(TFVB.selectCandidate);
$('.candidate-info-learnmore a').click(TFVB.learnMoreCandidate);