$(function() {
	window.meeqs_view_model = new MEEQSViewModel();

	meeqs_view_model.loadRestaurants().complete(function() {
		$('.ui.dropdown').dropdown();

		$('#clearButton').click(meeqs_view_model.resetDropdowns);
		$('#meeqsTabs .item').tab();
		ko.applyBindings(meeqs_view_model, $('.assignmentSpace')[0]);

		meeqs_view_model.resetDropdowns();
	});
	meeqs_view_model.loadRestaurantTypes();
	meeqs_view_model.loadRestaurantEthnicities();

	home_view_model.loggedIn.subscribe(function() {
		if(home_view_model.loggedIn()) {
			this.clearForm();
		}
	}, meeqs_view_model);
});