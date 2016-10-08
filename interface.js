TFVB.selectCandidate = function(e){
	$(this).parents('li').addClass('selected').siblings('li').removeClass('selected');
	e.preventDefault();
}

TFVB.learnMoreCandidate = function(e){
	$(this).parents('div').next('.candidate-info').slideToggle();
	e.preventDefault();
}

$('.select-candidate').click(TFVB.selectCandidate);
$('.candidate-info-learnmore').click(TFVB.learnMoreCandidate);