



var TFVB = {};

TFVB.first_name = false;
TFVB.last_name = false;
TFVB.processVoterName = function(){};

$("#enter-name").submit(TFVB.processVoterName);

$("#first-name").change(function(){
	alert('go', $(this).val() );
});