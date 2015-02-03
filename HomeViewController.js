$(function() {
	window.home_view_model = new HomeViewModel();

	ko.applyBindings(home_view_model, $('title')[0]);

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