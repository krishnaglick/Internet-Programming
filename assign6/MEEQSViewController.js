$(function() {
	window.meeqs_view_model = new MEEQSViewModel();

	ko.applyBindings(meeqs_view_model, $('.assignmentSpace')[0]);

	meeqs_view_model.loadRestaurants();
});