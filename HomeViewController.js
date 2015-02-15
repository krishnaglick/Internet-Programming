$(function() {
	window.home_view_model = new HomeViewModel();
	window.intervalObjects = {};

	$('.navigationContent').load('NavigationContent.html', function() {
		SemanticSetup();
		NavigationSetup();
		SubscriptionSetup();
		
		ko.applyBindings(home_view_model, $('title')[0]);
		ko.applyBindings(home_view_model, $('.right.menu')[0]);
		ko.applyBindings(home_view_model, $('#errorMessage')[0]);

		$('a.item.home').click();
	});
})

function SemanticSetup() {
	$('.ui.dropdown.item').dropdown();
}

function NavigationSetup() {
	$('.ui.dropdown.item a').click(function() {
		var assignmentToLoad = $(this).data('route');

		cleanUp();

		if(!!ko.dataFor($('.assignmentSpace')[0])) {
			ko.cleanNode($('.assignmentSpace')[0]);
		}

		if(assignmentToLoad != '') {
			$('.assignmentSpace').load(assignmentToLoad);
		}
		else {
			$('.assignmentSpace').html('');
		}

		home_view_model.pageRoute($(this).find('span').text());

		$('.ui.dropdown.item a i:not(".home")').addClass('thin');
		$(this).find('i').removeClass('thin');
	});
}

function cleanUp() {
	if(typeof window.canvas != 'undefined') {
		window.canvas.clear();
	}
	
	$.each(window.intervalObjects, function(index, obj) {
    	if(obj != null) {
    		clearInterval(obj);
    	}
	});
}

function SubscriptionSetup() {
	var that = home_view_model;
	home_view_model.ajaxBodyMessage.subscribe(function() {
		if(that.ajaxBodyMessage() != '') {
			if(that.messageType) {
				$('#errorMessage').addClass('success').removeClass('negative').slideDown();
			}
			else {
				$('#errorMessage').addClass('negative').removeClass('success').slideDown();
			}
		}
		else {
			$('#errorMessage').slideUp();
		}
	});
}