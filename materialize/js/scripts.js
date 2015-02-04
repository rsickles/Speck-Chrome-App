$( document ).ready(function() {
    	setTimeout(
    	function() {
            $('.spinner').hide();
            $('.hoverable').show();
            $('.card-panel').show();
            $('.scanning').hide();
            $(".hoverable").click(function() {
            	$('#modal1').openModal();
        });
    	}, 4000);
    	$("#enterpass").click(function () {
                 $('.hoverable').hide();
            	 $('.card-panel').hide();
            	 toast('Connected To The Network!', 1500)
            	 $('.config').show();
            	 $('#panel').show();
        });
        $("#submitForm").click(function () {
        	    $('#modal2').openModal();
        	    $("#done").click(function () {
        		window.close();
        	});
        });
});
