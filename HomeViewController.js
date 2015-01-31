$(function() {
	window.home_view_model = new HomeViewModel();

	ko.applyBindings(home_view_model, $('.title')[0]);

	SemanticSetup();
	NavigationSetup();
})

function SemanticSetup() {
	$('.dropdown').dropdown();
}

function NavigationSetup() {
	$('.ui.dropdown.item a').click(function() {
		var assignmentToLoad = $(this).attr('class').split(' ')[1] + '/index2.html';
		$('.assignmentSpace').load(assignmentToLoad);

		home_view_model.pageTitle('COP 4813: Internet Programming: ' + $(this).find('span').val());


		$('.ui.dropdown.item a i:not(".home")').addClass('thin');
		$(this).find('i').removeClass('thin');
	});
}