$(function() {
	window.meeqs_view_model = new MEEQSViewModel();

	ko.applyBindings(meeqs_view_model, $('.assignmentSpace')[0]);

	meeqs_view_model.loadRestaurants().complete(function() {
		$('#restaurants.dropdown').dropdown();
		$('#clearButton').click(function() {
			$('#restaurants.dropdown').dropdown('restore defaults');
		});
		$('.menu .item').tab();
	});
});