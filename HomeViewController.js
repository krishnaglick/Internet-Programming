$(function() {
	window.home_view_model = new HomeViewModel();

	ko.applyBindings(home_view_model, $('title')[0]);

	$('.navigationContent').load('NavigationContent.html', function() {
		SemanticSetup();
		NavigationSetup();

		$('a.item.home').click();
		//$('a.item.assign1').click();
	})
})

function SemanticSetup() {
	$('.dropdown').dropdown();
}

function NavigationSetup() {
	$('.ui.dropdown.item a').click(function() {
		//debugger;
		var assignmentToLoad = $(this).data('route');

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