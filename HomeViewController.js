$(function() {
	window.home_view_model = new HomeViewModel();

	ko.applyBindings(home_view_model, $('title')[0]);

	window.intervalObjects = {};

	$('.navigationContent').load('NavigationContent.html', function() {
		SemanticSetup();
		NavigationSetup();

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